from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer, DonorSerializer, ReceiverSerializer
from ..models import Donor, Receiver


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