from django.conf.urls import url
from rest_framework.authtoken import views as drf_views
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

from .views import GroupViewSet, MembershipViewSet
from .views import current_user, UserList

router = DefaultRouter()
router.register(r'groups', GroupViewSet, basename='group')
router.register(r'membership', MembershipViewSet, basename='membership')

urlpatterns = [
                  url(r'token/refresh/$', TokenRefreshView.as_view(), name='token_refresh'),
                  url(r'token/verify/$', TokenVerifyView.as_view(), name='token_verify'),
                  url(r'token/$', TokenObtainPairView.as_view(), name='token_obtain_pair'),
                  url(r'^auth/$', drf_views.obtain_auth_token, name='auth'),
                  url(r'current_user/$', current_user),
                  url(r'users/$', UserList.as_view()),
              ] + router.urls
