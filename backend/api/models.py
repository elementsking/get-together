from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser
from django.db import models


def get_sentinel_user():
    return get_user_model().objects.get_or_create(username='deleted')[0]


class Message(models.Model):
    from_user = models.ForeignKey('api.GetTogetherUser', on_delete=models.SET(get_sentinel_user))
    to_users = models.ManyToManyField('api.GetTogetherUser', related_name='recipients')
    date_sent = models.DateTimeField(auto_now_add=True)
    date_received = models.DateTimeField(blank=True, null=True)
    content = models.CharField(max_length=300)
    pinned = models.BooleanField(default=False)


class GetTogetherUser(AbstractUser):
    messages = models.ManyToManyField(Message, blank=True)


class Group(models.Model):
    name = models.CharField(primary_key=True, max_length=20)
    members = models.ManyToManyField(get_user_model(), through='Membership')


class Membership(models.Model):
    person = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    date_joined = models.DateField(auto_now_add=True)

    class Meta:
        unique_together = ['person', 'group']


from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
