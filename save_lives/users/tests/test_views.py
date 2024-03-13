from django.contrib.auth import authenticate
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status

from ..models import User


class AuthenticationTests(TestCase):
    databases = '__all__'

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            name='testuser',
            password='testpassword',
            age=20,
            phone='1234567890',
            user_type='donor'
        )

    def test_user_can_register(self):
        response = self.client.post('/users/register/', {
            'name': 'testuser2',
            'password': 'testpassword',
            'age': 20,
            'phone': '1234567890',
            'user_type': 'donor'
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_user_can_login(self):
        response = self.client.post('/users/login/', {
            'name': 'testuser',
            'password': 'testpassword'
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_cannot_login_with_invalid_credentials(self):
        response = self.client.post('/users/login/', {
            'name': 'testuser',
            'password': 'wrongpassword'
        })
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
