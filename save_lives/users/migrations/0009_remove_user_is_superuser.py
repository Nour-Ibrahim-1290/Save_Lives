# Generated by Django 5.0.2 on 2024-03-22 03:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0008_user_is_superuser'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='is_superuser',
        ),
    ]
