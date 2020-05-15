from api.models import Group, Membership
from rest_framework import serializers
from rest_framework.validators import UniqueValidator


class GroupSerializer(serializers.ModelSerializer):
    name = serializers.CharField(
        validators=[UniqueValidator(queryset=Group.objects.all())])

    def validate_name(self, value):
        if ' ' in value:
            raise serializers.ValidationError('This app cannot handle group names containing spaces')
        return value

    class Meta:
        model = Group
        fields = ['name', 'members']


class MembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = '__all__'
