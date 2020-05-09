import chat.routing
import re
from channels.db import database_sync_to_async
from channels.routing import ProtocolTypeRouter, URLRouter
from rest_framework_simplejwt.authentication import JWTAuthentication


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
        token = None
        for x in str(cookies).split(';'):
            if 'X-Authentication' in str(x):
                token = re.sub('[\']', '', x.split('=')[1])
                print(token)
        assert (token, 'No token received!')
        jwt_auth = JWTAuthentication()
        validated_token = jwt_auth.get_validated_token(token)
        user = jwt_auth.get_user(validated_token)
        # user = GetTogetherUser.objects.get(pk=token.user.pk)

        # Return the inner application directly and let it run everything else
        return self.inner(dict(scope, user=user))


application = ProtocolTypeRouter({
    'websocket': QueryAuthMiddleware(
        URLRouter(
            chat.routing.websocket_urlpatterns
        )
    ),

})


