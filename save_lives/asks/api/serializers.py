from rest_framework import serializers
from ..models import Ask

class AskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ask
        fields = '__all__'
