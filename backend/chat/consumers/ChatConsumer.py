# chat/consumers.py
import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from api.models import GetTogetherUser as User, Message, Group, Membership
from channels.auth import login

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        user = self.scope['user']

        group, created = Group.objects.get_or_create(
            name=self.room_group_name,
        )
        group.members.add(user)
        membership = Membership(person_id=user.id, group=group)
        membership.save()

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'user': self.scope['user'].id
            }
        )

    # Receive message from room group
    def chat_message(self, event):
        message = event['message']

        user = User.objects.get(id=event['user'])

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': message
        }))
