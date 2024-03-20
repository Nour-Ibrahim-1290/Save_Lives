from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

from ..models import User, Donor, Receiver
from .serializers import UserSerializer, DonorSerializer, ReceiverSerializer


from django.contrib.auth.hashers import check_password
from django.shortcuts import redirect, get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q





# class UserDetailView(APIView):
#     def get(self, request, user_id):
#         print("Inside Get Request Function View")
#         user = get_object_or_404(User, id=user_id)
#         print(user)
#         if user.user_type == 'donor':
#             user_detail = Donor.objects.filter(user=user).first()
#             serializer = DonorSerializer(user_detail)
#         elif user.user_type == 'receiver':
#             user_detail = Receiver.objects.filter(user=user).first()
#             serializer = ReceiverSerializer(user_detail)
#         else:
#             return Response({'error': 'Invalid user type'}, status=status.HTTP_400_BAD_REQUEST)

#         if user_detail is None:
#             return Response({'error': 'User detail not found'}, status=status.HTTP_404_NOT_FOUND)
#         print(user_detail)
#         return Response(serializer.data, status=status.HTTP_200_OK)

def generate_tokens(user):
    """
    Generate JWT tokens for a user.

    Args:
        user: User instance.
    
    Returns:
        response_data (dict): A dictionary containing user data and JWT tokens.
    """
    refresh = RefreshToken.for_user(user)
    
    token_data = {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

     # Query the Donor or Receiver model based on the user type
    user_data = UserSerializer(user).data
    if user.user_type == 'donor':
        donor = Donor.objects.filter(user=user).first()
        if donor:
            user_data.update(DonorSerializer(donor).data)
    elif user.user_type == 'receiver':
        receiver = Receiver.objects.filter(user=user).first()
        if receiver:
            receiver_data = ReceiverSerializer(receiver).data
            filtered_data = {k: v for k, v in receiver_data.items() if v is not None}
            user_data.update(filtered_data)

    response_data = {
        'username': user_data['name'],
        'user_type': user_data['user_type'],
        'userdata': user_data,  # include the user data in the response
        'token': token_data
    }

    return response_data

class LoginView(APIView):
    """Login Process."""
    def post(self, request):
        """Log in a user."""
        email = request.data['email']
        password = request.data['password']

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'Invalid Email'}, status=status.HTTP_401_UNAUTHORIZED)
        
        if user.check_password(password):
            response_data = generate_tokens(user)
            return Response(response_data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid Password'}, status=status.HTTP_401_UNAUTHORIZED)