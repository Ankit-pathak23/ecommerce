# Generated by Django 4.2.4 on 2023-08-08 09:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0008_sizeavailable'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='L',
        ),
        migrations.RemoveField(
            model_name='product',
            name='M',
        ),
        migrations.RemoveField(
            model_name='product',
            name='S',
        ),
        migrations.RemoveField(
            model_name='product',
            name='XL',
        ),
        migrations.RemoveField(
            model_name='product',
            name='XS',
        ),
        migrations.RemoveField(
            model_name='product',
            name='XXL',
        ),
        migrations.RemoveField(
            model_name='product',
            name='XXS',
        ),
        migrations.RemoveField(
            model_name='product',
            name='XXXL',
        ),
    ]