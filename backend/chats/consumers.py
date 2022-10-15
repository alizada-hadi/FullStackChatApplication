from channels.generic.websocket import JsonWebsocketConsumer
from accounts.models import User
from chats.models import Conversation, Message
from asgiref.sync import async_to_sync
from .serializers import MessageSerializer


class ChatConsumer(JsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(args, **kwargs)
        self.user = None
        self.conversation_name = None
        self.room_name = None

    def connect(self):
        print("connected")
        self.room_name = "home"
        self.user = self.scope["user"]
        if not self.user.is_authenticated:
            return
        self.accept()
        self.conversation_name = f"{self.scope['url_route']['kwargs']['conversation_name']}"
        self.conversation, created = Conversation.objects.get_or_create(name=self.conversation_name)
        
        async_to_sync(self.channel_layer.group_add)(
            str(self.conversation_name), 
            self.channel_name,
        )
        message = self.conversation.messages.all().order_by("-timestamp")[0:50]
        self.send_json(
            {
                "type": "last_50_messages",
                "messages": MessageSerializer(message, many=True).data,
            }
        )

    def disconnect(self, code):
        print("Disconnected!")
        return super().disconnect(code)

    def get_recevier(self):
        usernames = self.conversation_name.split("__")
        
        for username in usernames:
            if username != self.user.username:
                return User.objects.get(username=username)

    def receive_json(self, content, **kwargs):
        message_type = content['type']
        if message_type == "chat_message":
            message = Message.objects.create(
                from_user = self.user, 
                to_user = self.get_recevier(), 
                content=content["message"], 
                conversation=self.conversation
            )
            async_to_sync(self.channel_layer.group_send)(
                str(self.conversation_name),
                {
                    "type": "chat_message_echo",
                    "name": self.user.username,
                    "message": MessageSerializer(message).data,
                },
            )
        if message_type == 'greeting':
            self.send_json({
                "type" : "greeting", 
                "message" : "How are you? ",
            })
        return super().receive_json(content, **kwargs)

    def chat_message_echo(self, event):
        print(event)
        self.send_json(event)