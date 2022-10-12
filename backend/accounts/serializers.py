from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User


class UserSerializer(serializers.ModelSerializer):
    isAdmin = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = [
            'id', 
            'email',
            'username',
            'first_name', 
            'last_name', 
            'date_joined',
            'avatar',
            'is_active',
            'isAdmin'
        ]
    def get_isAdmin(self, obj):
        return obj.is_staff


class UserSerializerWithToken(serializers.ModelSerializer):
    isAdmin = serializers.SerializerMethodField(read_only=True)
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = [
            'id', 
            'email',
            'username',
            'first_name', 
            'last_name', 
            'date_joined',
            'avatar',
            'isAdmin',
            'is_active',
            'token'
        ]
    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)