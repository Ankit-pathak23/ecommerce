# Generated by Django 4.2.4 on 2023-08-28 12:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_customuser_imagegoogle'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='imagegoogle',
        ),
    ]