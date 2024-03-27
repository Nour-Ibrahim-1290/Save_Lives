from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status


from users.models import Donor, User, Receiver
from users.api.serializers import UserSerializer, ReceiverSerializer

from ...models import Ask
from ..serializers import AskSerializer

from rest_framework.response import Response


class AlertsDonor(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        if not user.user_type == 'donor':
            # User is not a donor instance
            return Response({'error': 'User is not a donor'}, status=status.HTTP_401_UNAUTHORIZED)

        donor_id = Donor.objects.get(user=user).id
        ask_obj = Ask.objects.filter(donor_id=donor_id)
        related_asks = AskSerializer(ask_obj, many=True)

        related_asks_data = []
        for ask in related_asks.data:
            receiver_id = ask.get('receiver')
            receiver = Receiver.objects.get(id=receiver_id)
            receiver_technical_data = ReceiverSerializer(receiver).data
            receiver_user = User.objects.get(id=receiver_technical_data.get('user'))
            receiver_personal_data = UserSerializer(receiver_user, ).data

            # Remove ids from response
            receiver_technical_data.pop('id')
            receiver_technical_data.pop('user')

            ask['technical_data'] = receiver_technical_data
            ask['personal_data'] = receiver_personal_data
            related_asks_data.append(ask)

            # Remove ids from response
            ask.pop('receiver')
            ask.pop('donor')
            ask.pop('id')

        return Response(related_asks_data, status=status.HTTP_200_OK)
