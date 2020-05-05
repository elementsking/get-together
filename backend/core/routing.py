import chat.routing
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.db import close_old_connections
from api.models import User
from rest_framework.authtoken.models import Token
from channels.db import database_sync_to_async
from asgiref.sync import sync_to_async
import re
import string

@database_sync_to_async
def get_token(token):
    return

def connect(token):
    return get_token(token)

class QueryAuthMiddleware:
    """
    Ties into the DRF Token system
    """

    def __init__(self, inner):
        # Store the ASGI application we were passed
        self.inner = inner

    def __call__(self, scope):

        cookies = [x[1] for x in scope['headers'] if 'cookie' in str(x[0])][0]
        token = ''
        for x in str(cookies).split(';'):
            if 'X-Authentication' in str(x):
                token = re.sub('[{}]'.format(string.punctuation), '', x.split('=')[1])
        token = Token.objects.get(key=token)
        user = User.objects.get(pk=token.user.pk)

        # Return the inner application directly and let it run everything else
        return self.inner(dict(scope, user=user))


application = ProtocolTypeRouter({
    'websocket': QueryAuthMiddleware(
        URLRouter(
            chat.routing.websocket_urlpatterns
        )
    ),

})


