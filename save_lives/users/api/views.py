from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from ..models import User, Donor, Receiver
from .serializers import UserSerializer, DonorSerializer, ReceiverSerializer


from django.contrib.auth.hashers import check_password
from django.shortcuts import redirect


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
    response_data = {
        'username': UserSerializer(user).data['name'],
        'token': token_data
    }

    return response_data



# Modified User View
class RegisterView(APIView):
    """Registration Process."""
    def post(self, request):
        """Create a new user."""

        user_serializer = UserSerializer(data=request.data)

        if user_serializer.is_valid():
            user = user_serializer.save()

            if user.user_type == 'donor':
                donor_data = {**request.data, "user": user.id}  # Add user id to the request data
                donor_serializer = DonorSerializer(data=donor_data)
                if donor_serializer.is_valid():
                    donor_serializer.save()
                    response_data = generate_tokens(user)
                    return Response(response_data, status=status.HTTP_201_CREATED)
                else:
                    user.delete()  # Delete the user if donor data is invalid
                    return Response(donor_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            elif user.user_type == 'receiver':
                receiver_data = {**request.data, "user": user.id}  # Add user id to the request data
                receiver_serializer = ReceiverSerializer(data=receiver_data)
                if receiver_serializer.is_valid():
                    receiver_serializer.save()
                    response_data = generate_tokens(user)
                    return Response(response_data, status=status.HTTP_201_CREATED)
                else:
                    user.delete()  # Delete the user if receiver data is invalid
                    return Response(receiver_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class RegisterView(APIView):
#     """Registerations Process."""
#     def post(self, request):
#         """Create a new user."""

#         serializer = UserSerializer(data=request.data)

#         if serializer.is_valid():
#             user = serializer.save()
#             request.session['user'] = user.id
#             request.session.save()
#             print(user.id)

#             if user.user_type == 'donor':
#                 return redirect('donor_register')
            
#             if user.user_type == 'receiver':
#                 return redirect('receiver_register')
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegisterDonorView(APIView):
    """Donor Registrations Process."""
    def post(self, request):
        # Retrieve the user from the session
        user_id = request.session['user']
        user = User.objects.get(id=user_id)

        # Continue the registration process for the donor
        data = request.data.copy()
        data['user'] = user_id
        serializer = DonorSerializer(data=data)

        return self._register_user(serializer, user, request)

    def _register_user(self, serializer, user, request):
        """Register a user."""
        if serializer.is_valid():
            serializer.save(user=user)
            response_data = generate_tokens(user)
            del request.session['user']
            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            del request.session['user']
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegisterReceiverView(APIView):
    """Donor Registrations Process."""
    def post(self, request):
        # Retrieve the user from the session
        user_id = request.session['user']
        user = User.objects.get(id=user_id)

        # Continue the registration process for the receiver
        data = request.data.copy()
        data['user'] = user_id
        serializer = ReceiverSerializer(data=data)

        return self._register_user(serializer, user, request)

    def _register_user(self, serializer, user, request):
        """Register a user."""
        if serializer.is_valid():
            serializer.save(user=user)
            response_data = generate_tokens(user)
            del request.session['user']
            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            del request.session['user']
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    """Login Process."""
    def post(self, request):
        """Log in a user."""
        email = request.data['email']
        password = request.data['password']

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'Invalid Username'}, status=status.HTTP_401_UNAUTHORIZED)
        
        if user.check_password(password):
            response_data = generate_tokens(user)
            return Response(response_data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid Password'}, status=status.HTTP_401_UNAUTHORIZED)
