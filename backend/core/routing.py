from django.urls import path
from chats.consumers import ChatConsumer

websocket_urlpatterns = [
    path("", ChatConsumer.as_asgi())
]