from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser

class Message(models.Model):
    date_sent = models.DateField(auto_now_add=True)
    date_received = models.DateField()
    content = models.CharField(max_length=300)
    pinned = models.BooleanField(default=False)


class GetTogetherUser(AbstractUser):
    messages = models.ForeignKey(Message, on_delete=models.CASCADE, blank=True, null=True)


class Group(models.Model):
    name = models.CharField(max_length=20)
    members = models.ManyToManyField(get_user_model(), through='Membership')


class Membership(models.Model):
    person = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    date_joined = models.DateField(auto_now_add=True)

