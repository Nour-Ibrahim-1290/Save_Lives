from django.db import models
from django.dispatch import receiver

from users.models import Receiver, Donor

# Create your models here.
class Ask(models.Model):
    BLOOD_TYPE_CHOICES = [
    ('O-', 'O-'),
    ('O+', 'O+'),
    ('A+', 'A+'),
    ('A-', 'A-'),
    ('B+', 'B+'),
    ('B-', 'B-'),
    ('AB+', 'AB+'),
    ('AB-', 'AB-'),
    ('unknown', 'Unknown'),
]

    receiver = models.ForeignKey(Receiver, on_delete=models.CASCADE)
    donor = models.ForeignKey(Donor, on_delete=models.CASCADE)
    needed_blood_type = models.CharField(max_length=7, choices=BLOOD_TYPE_CHOICES, null=False, default='unknown')
    proposed_blood_type = models.CharField(max_length=7, choices=BLOOD_TYPE_CHOICES, null=False, default='unknown')
    donor_approval = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.receiver.name} asks from {self.donor.name} \
            {self.needed_blood_type} type, donor approval: {self.donor_approval}'