from django.conf.urls import url
from rest_framework.authtoken import views as drf_views
from .views import current_user, UserList

urlpatterns = [
    url(r'^auth/$', drf_views.obtain_auth_token, name='auth'),
    url('current_user/', current_user),
    url('users/', UserList.as_view())
]
