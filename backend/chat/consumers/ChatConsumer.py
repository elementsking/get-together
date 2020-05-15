# chat/consumers.py
import json

from api.models import GetTogetherUser as User, Message, Group, Membership
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        user = self.scope['user']

        group = Group.objects.get(
            id=self.room_name,
        )

        membership, created = Membership.objects.get_or_create(person_id=user.id, group=group)

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        user = self.scope["user"]

        # group = Group.objects.get(
        #     name=self.room_name,
        # )
        # membership = Membership(person_id=user.id, group=group)
        # membership.delete()
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data=None, bytes_data=None):
        room_name = self.scope['url_route']['kwargs']['room_name']
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        msg_obj = Message(content=message)
        msg_obj.save()

        # Save it as a post on the group for later retrieval
        group = Group.objects.get(id=room_name)
        group.posts.add(msg_obj)
        group.save()

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'group': room_name,
                'user': self.scope['user'].id
            }
        )

    # Receive message from room group
    def chat_message(self, event):
        """
        Whenever a chat gets a message, it should repeat it on to all other members of the group
        :param event:
        :return:
        """
        message = event['message']

        user = User.objects.get(id=event['user'])
        msg_obj = Message(content=message)
        msg_obj.save()
        user.messages.add(msg_obj)
        user.save()

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': message
        }))
