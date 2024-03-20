from enum import unique
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

class MyUserManager(BaseUserManager):
    def create_user(self, name, email, password=None, age=None, phone=None, user_type=None, is_admin=False):
        if not name:
            raise ValueError('Users must have a name')
        
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            name=name,
            email=email,
            password=password,
            age=age,
            phone=phone,
            user_type=user_type,
            is_admin=is_admin
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, name, email, password):
        user = self.create_user(
            name=name,
            email=email,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    USER_TYPE_CHOICES = (
        ('donor', 'donor'),
        ('receiver', 'receiver'),
    )

    ACCOUNT_STATE_CHOICES = (
        ('initial', 'Initial'),
        ('completed', 'Completed'),
    )

    name = models.CharField(max_length=255, unique=True, null=False)
    email = models.EmailField(max_length=255, unique=True, null=False)
    password = models.CharField(max_length=255, null=False)
    country = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)
    region = models.CharField(max_length=255, null=True, blank=True)
    age = models.IntegerField(null=True, blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    user_type = models.CharField(max_length=255, choices=USER_TYPE_CHOICES, null=False)
    account_state = models.CharField(max_length=255, choices=ACCOUNT_STATE_CHOICES, default='initial')
    is_admin = models.BooleanField(default=False)

    objects = MyUserManager()

    USERNAME_FIELD = 'name'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.name

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin



# Donor profile attributes
class Donor(models.Model):
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

    DONATE_BLOOD_CHOICES = [
        ('once', 'Once'),
        ('regular', 'Regular'),
        ('never', 'Never'),
        ('unknown', 'Unknown'),
    ]

    YES_NO_UNKNOWN_CHOICES = [
        ('yes', 'Yes'),
        ('no', 'No'),
        ('unknown', 'Unknown'),
    ]

    YES_NO_CHOICES = [
        ('yes', 'Yes'),
        ('no', 'No'),
        ('unknown', 'Unknown'),
    ]

    HIB_CHOICES = [
        ('A', 'A'),
        ('B', 'B'),
        ('C', 'C'),
        ('none', 'None'),
        ('unknown', 'Unknown'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, null=False)
    blood_type = models.CharField(max_length=7, choices=BLOOD_TYPE_CHOICES, null=False, default='unknown')
    weight = models.PositiveIntegerField(null=False, default=0)
    donate_blood = models.CharField(max_length=7, choices=DONATE_BLOOD_CHOICES, null=False, default='unknown')
    anemic = models.CharField(max_length=7, choices=YES_NO_UNKNOWN_CHOICES, null=False, default='unknown')
    last_donation = models.DateField(null=True, blank=True)
    operation = models.CharField(max_length=7, choices=YES_NO_CHOICES, null=False, default='unknown')
    infectious = models.CharField(max_length=7, choices=YES_NO_CHOICES, null=False, default='unknown')
    infectious_details = models.TextField(null=True, blank=True)
    hib = models.CharField(max_length=7, choices=HIB_CHOICES, null=False, default='unknown')
    heart = models.CharField(max_length=7, choices=YES_NO_CHOICES, null=False, default='unknown')
    pregnant = models.CharField(max_length=7, choices=YES_NO_CHOICES, null=False, default='unknown')
    diabetic = models.CharField(max_length=7, choices=YES_NO_CHOICES, null=False, default='unknown')
    pp = models.CharField(max_length=7, choices=YES_NO_CHOICES, null=False, default='unknown')

    def __str__(self):
        return self.user.name

# Reciever details for both Medical Professional and Patients or their family
class Receiver(models.Model):
    PROFESSION_CHOICES = [
        ('doctor', 'Doctor'),
        ('nurse', 'Nurse'),
        ('lab', 'Lab'),
        ('pharmacist', 'Pharmacist'),
        ('administration', 'Administration'),
        ('unknown', 'Unknown'),
    ]

    WORKPLACE_TYPE_CHOICES = [
        ('hospital_private', 'Hospital Private'),
        ('hospital_public', 'Hospital Public'),
        ('private_clinic', 'Private Clinic'),
        ('public_clinic', 'Public Clinic'),
        ('unknown', 'Unknown'),
    ]

    DONATE_BLOOD_CHOICES = [
        ('once', 'Once'),
        ('regular', 'Regular'),
        ('never', 'Never'),
        ('unknown', 'Unknown'),
    ]

    YES_NO_UNKNOWN_CHOICES = [
        ('yes', 'Yes'),
        ('no', 'No'),
        ('unknown', 'Unknown'),
    ]

    YES_NO_TEMP_CHOICES = [
        ('yes', 'Yes'),
        ('no', 'No'),
        ('temp', 'Temporary'),
        ('unknown', 'Unknown'),
    ]

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

    ROLE_CHOICES = [
        ('patient', 'Patient'),
        ('prof', 'Professional'),
    ]

    
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=False)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, null=False, default='unknown')
    
    # Medical Professional Fields
    profession = models.CharField(max_length=15, choices=PROFESSION_CHOICES, null=True, blank=True)
    workplace_type = models.CharField(max_length=16, choices=WORKPLACE_TYPE_CHOICES, null=True, blank=True)
    workplace_name = models.TextField(null=True, blank=True)
    workplace_address = models.TextField(null=True, blank=True)
    donate_blood = models.CharField(max_length=7, choices=DONATE_BLOOD_CHOICES, null=True, blank=True)
    rare_blood_num = models.PositiveIntegerField(null=True, blank=True)
    rare_blood_measure = models.CharField(max_length=20, null=True, blank=True)
    
    # Patient or Family Fields
    allergic = models.CharField(max_length=7, choices=YES_NO_UNKNOWN_CHOICES, null=True, blank=True)
    allergic_details = models.TextField(null=True, blank=True)
    blood_type = models.CharField(max_length=7, choices=BLOOD_TYPE_CHOICES, null=True, blank=True)
    permanent_cond = models.CharField(max_length=7, choices=YES_NO_TEMP_CHOICES, null=True, blank=True)
    add_info = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.user.name