from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

class MyUserManager(BaseUserManager):
    def create_user(self, name, password=None, age=None, phone=None, user_type=None):
        if not name:
            raise ValueError('Users must have a name')

        user = self.model(
            name=name,
            age=age,
            phone=phone,
            user_type=user_type,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, name, password):
        user = self.create_user(
            name,
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
    age = models.IntegerField(null=True, blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    user_type = models.CharField(max_length=255, choices=USER_TYPE_CHOICES, null=False)
    account_state = models.CharField(max_length=255, choices=ACCOUNT_STATE_CHOICES, default='initial')

    objects = MyUserManager()

    USERNAME_FIELD = 'name'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.name

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin





class Donor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # add any additional fields for Donor here

class Receiver(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # add any additional fields for Receiver here