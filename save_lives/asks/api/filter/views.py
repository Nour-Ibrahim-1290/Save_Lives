from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status


from users.models import Donor, User
from users.api.serializers import DonorSerializer, UserSerializer

from rest_framework.response import Response




class Filter(APIView):
    permission_classes = (IsAuthenticated,)

    type_match = {
    'A+':  ['A+', 'A-', 'O+', 'O-'],
    'A-':  ['A-', 'O-'],
    'B+':  ['B+', 'B-', 'O+', 'O-'],
    'B-':  ['B-', 'O-'],
    'AB+': ['AB+', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-'],
    'AB-': ['AB-', 'A-', 'B-', 'O-'],
    'O+':  ['O+', 'O-'],
    'O-':  ['O-']
}
    def post(self, request):
        user = request.user
        if not user.user_type == 'receiver':
            # User is not a receiver instance
            return Response({'error': 'User is not a receiver'}, status=status.HTTP_401_UNAUTHORIZED)
        
        blood_type = request.data.get('blood_type')

        # Search for donors with available matching blood type
        donors = Donor.objects.filter(blood_type__in=self.type_match[blood_type])
        if not donors:
            return Response({'error': 'No donors available'}, status=status.HTTP_404_NOT_FOUND)
        
        donor_serializer = DonorSerializer(donors, many=True)
        donor_data = donor_serializer.data

        response_data = {}

        # loop on every donor available and append its users info to it
        for i, donor in enumerate(donor_data):
            user_id = donor['user']
            user = User.objects.get(id=user_id)  # Fetch the User object using the foreign key value
            user_data = UserSerializer(user).data
            response_data[i] = {
                'user': user_data,
                'donor': donor
            }

        return Response(response_data, status=status.HTTP_200_OK)