from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from asks.models import Ask
from users.models import Donor, Receiver


class SendRequest(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        # Authorize the user as a receiver
        user = request.user
        if not user.user_type == 'receiver':
            return Response({'error': 'User is not a receiver'}, status=status.HTTP_401_UNAUTHORIZED)
        
        # Get the data
        try:
            donor_id = request.data['donor_id']
            needed_blood_type = request.data['needed_blood_type']
            proposed_blood_type = request.data['proposed_blood_type']
        except KeyError:
            return Response({'error': 'Invalid request data'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            donor = Donor.objects.get(id=donor_id)
        except Donor.DoesNotExist:
            return Response({'error': 'Donor not found'}, status=status.HTTP_404_NOT_FOUND)

        try:
            receiver = Receiver.objects.get(user=user)
        except Receiver.DoesNotExist:
            return Response({'error': 'Receiver not found'}, status=status.HTTP_404_NOT_FOUND)

        # Make an Ask request
        ask = Ask.objects.create(
            receiver=receiver,
            donor=donor,
            needed_blood_type=needed_blood_type,
            proposed_blood_type=proposed_blood_type
        )
        ask.save()

        return Response({'message': 'Donataion request sent'}, status=status.HTTP_201_CREATED)