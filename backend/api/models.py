import uuid

from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser
from django.db import models


def get_sentinel_user():
    return get_user_model().objects.get_or_create(username='deleted')[0]


class Message(models.Model):
    # from_user = models.ForeignKey('api.GetTogetherUser', on_delete=models.SET(get_sentinel_user))
    # to_users = models.ManyToManyField('api.GetTogetherUser', related_name='recipients')
    date_sent = models.DateTimeField(auto_now_add=True)
    date_received = models.DateTimeField(blank=True, null=True)
    content = models.CharField(max_length=300)
    pinned = models.BooleanField(default=False)


class GetTogetherUser(AbstractUser):
    messages = models.ManyToManyField(Message, blank=True)


class Group(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=20)
    members = models.ManyToManyField(get_user_model(), through='Membership')
    events = models.ForeignKey('api.Event', blank=True, null=True, on_delete=models.SET_NULL)
    posts = models.ManyToManyField('api.Message')


class Event(models.Model):
    date_added = models.DateTimeField(auto_now_add=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    description = models.CharField(max_length=300)
    attendees = models.ForeignKey('api.GetTogetherUser', on_delete=models.SET(get_sentinel_user))
    active = models.BooleanField(default=True)
    posts = models.ManyToManyField('api.Message')


class Membership(models.Model):
    person = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    date_joined = models.DateField(auto_now_add=True)

    class Meta:
        unique_together = ['person', 'group']
