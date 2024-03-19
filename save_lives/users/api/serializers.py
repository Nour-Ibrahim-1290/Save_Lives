from rest_framework import serializers
from ..models import User, Donor, Receiver

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password', 'age', 'phone', 'user_type']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class DonorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donor
        fields = '__all__'

class ReceiverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receiver
        fields = '__all__'
