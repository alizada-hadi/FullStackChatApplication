from accounts.models import User
from rest_framework.exceptions import AuthenticationFailed
from urllib.parse import parse_qs
from channels.db import database_sync_to_async
from django.conf import settings
from jwt import decode as jwt_decode
from django.contrib.auth.models import AnonymousUser


@database_sync_to_async
def get_user(user_id):
    try:
        user = User.objects.get(id=user_id)
        return user
    except User.DoesNotExist:
        return AnonymousUser


class TokenAuthMiddleware:
    def __init__(self, app):
        self.app = app
    
    async def __call__(self, scope, receive, send):
        query_params = parse_qs(scope["query_string"].decode())
        token = query_params["token"][0]
        decoded_data = jwt_decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        scope["token"] = token
        scope["user"] = await get_user(decoded_data["user_id"])
        return await self.app(scope, receive, send)


