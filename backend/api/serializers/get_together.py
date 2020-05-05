from rest_framework import serializers
from rest_framework_jwt.settings import api_settings

from api.models import GetTogetherUser, Group, Membership, Message


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'

class MembershipSerializer(serializers.ModelSerializer):

    class Meta:
        model = Membership
        fields = '__all__'
