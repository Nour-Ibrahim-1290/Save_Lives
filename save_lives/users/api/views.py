from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


from ..models import User
from .utils import generate_tokens



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
