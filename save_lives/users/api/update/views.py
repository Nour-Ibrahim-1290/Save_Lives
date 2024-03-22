from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from ..serializers import UserSerializer, DonorSerializer, ReceiverSerializer
from ...models import Donor, Receiver



class UpdateView(APIView):
    """Update User Profile."""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """Update a user profile."""
        user = request.user
        
        user_serializer = UserSerializer(user, data=request.data, partial=True)

        if user_serializer.is_valid():
            user_serializer.save()
            return Response(user_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateDonorView(APIView):
    """Update Donor Profile."""
    def post(self, request):
        """Update a donor profile."""
        user = request.user
        
        try:
            donor = Donor.objects.get(user=user)
        except Donor.DoesNotExist:
            return Response({"error": "User is not a donor"}, status=status.HTTP_401_UNAUTHORIZED)

        donor_serializer = DonorSerializer(donor, data=request.data, partial=True)

        if donor_serializer.is_valid():
            donor_serializer.save()
            return Response(donor_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(donor_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateReceiverView(APIView):
    """Update Receiver Profile."""
    def post(self, request):
        """Update a receiver profile."""
        user = request.user
        
        try:
            receiver = Receiver.objects.get(user=user)
        except Receiver.DoesNotExist:
            return Response({"error": "User is not a receiver"}, status=status.HTTP_401_UNAUTHORIZED)

        receiver_serializer = ReceiverSerializer(receiver, data=request.data, partial=True)

        if receiver_serializer.is_valid():
            receiver_serializer.save()
            return Response(receiver_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(receiver_serializer.errors, status=status.HTTP_400_BAD_REQUEST)