from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from rest_framework import status

from django.core.validators import validate_email
from django.core.exceptions import ValidationError


from save_lives.settings import EMAIL_HOST_USER

@csrf_exempt
@require_POST
def contact_form_submission(request):
    # Get the form data
    name = request.POST.get('name')
    email = request.POST.get('email')
    message = request.POST.get('message')

    # Check if the form data is valid
    if name is None or email is None or message is None:
        return JsonResponse({'error': 'Missing fields'}, status=status.HTTP_400_BAD_REQUEST)

    # Check if the form data is valid
    if not name or not email or not message:
        return JsonResponse({'error': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)

    # Send the email
    try:
        validate_email(email)

        # Customize the email subject and body as needed
        subject = 'Contact Form Submission'
        email_body = f"Name: {name}\nEmail: {email}\nMessage: {message}"

        send_mail(subject, email_body, f'{EMAIL_HOST_USER}', ['eldeeb757575@gmail.com'])

        return JsonResponse({'message': 'Form submitted successfully!'})

    except ValidationError:
        return JsonResponse({'error': 'Invalid email'}, status=status.HTTP_400_BAD_REQUEST)
