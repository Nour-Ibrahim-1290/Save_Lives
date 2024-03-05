from django.test import SimpleTestCase, override_settings
from rest_framework import status
from rest_framework.test import APIClient

@override_settings(EMAIL_BACKEND='django.core.mail.backends.console.EmailBackend', EMAIL_HOST_USER = 'localhost', EMAIL_PORT = 1025)
class ContactSubmitAPITest(SimpleTestCase):
    def test_contact_submit_api(self):
        client = APIClient()
        response = client.post('/contact/submit/', {
            'name': 'John Doe',
            'email': 'johndoe@example.com',
            'message': 'This is a test message'
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), {'message': 'Form submitted successfully!'})

    def test_contact_submit_api_invalid_data(self):
        client = APIClient()
        response = client.post('/contact/submit/', {
            'name': '',
            'email': 'johndoe@example.com',
            'message': 'This is a test message'
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.json(), {'error': 'Invalid data'})

    def test_contact_submit_api_missing_fields(self):
        client = APIClient()
        response = client.post('/contact/submit/', {
            'name': 'John Doe',
            'email': 'johndoe@example.com',
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.json(), {'error': 'Missing fields'})

    def test_contact_submit_api_false_email(self):
        client = APIClient()
        response = client.post('/contact/submit/', {
            'name': 'John Doe',
            'email': 'johndoe#asd.com',
            'message': 'This is a test message'
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.json(), {'error': 'Invalid email'})