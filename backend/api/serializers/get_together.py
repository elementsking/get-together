from api.models import Group, Membership, Message
from api.serializers import UserSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'


class GroupSerializer(serializers.ModelSerializer):
    name = serializers.CharField(
        validators=[UniqueValidator(queryset=Group.objects.all())])
    posts = MessageSerializer(many=True, read_only=True)
    members = UserSerializer(many=True, read_only=True)

    def validate_name(self, value):
        if ' ' in value:
            raise serializers.ValidationError('This app cannot handle group names containing spaces')
        return value

    class Meta:
        model = Group
        fields = ['id', 'name', 'members', 'posts']


class MembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = '__all__'
