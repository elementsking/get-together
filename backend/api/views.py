import os

from api.models import Group, Membership
from django.conf import settings
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.views.generic import View
from rest_framework import permissions, status
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import UserSerializer, UserSerializerWithToken, GroupSerializer


class ReactAppView(View):
    """
    Serves the compiled frontend entry point (only works if you have run `yarn run build`).
    """

    def get(self, request):
        """ GET React view. """
        try:
            with open(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')) as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            return HttpResponseRedirect(f"{settings.REACT_APP_URL[0]}")


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    print(request.user)
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GroupViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class MessageViewSet(viewsets.ViewSet):

    def list(self, request):
        queryset = request.user.messages.all()


class MembershipViewSet(viewsets.ViewSet):

    def list(self, request):
        queryset = Membership.messages.filter(user=request.user)
