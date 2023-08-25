# Generated by Django 4.2.4 on 2023-08-08 05:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_avilablesize'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='L',
            field=models.IntegerField(blank=True, default=0),
        ),
        migrations.AddField(
            model_name='product',
            name='M',
            field=models.IntegerField(blank=True, default=0),
        ),
        migrations.AddField(
            model_name='product',
            name='S',
            field=models.IntegerField(blank=True, default=0),
        ),
        migrations.AddField(
            model_name='product',
            name='XL',
            field=models.IntegerField(blank=True, default=0),
        ),
        migrations.AddField(
            model_name='product',
            name='XS',
            field=models.IntegerField(blank=True, default=0),
        ),
        migrations.AddField(
            model_name='product',
            name='XXS',
            field=models.IntegerField(blank=True, default=0),
        ),
        migrations.AddField(
            model_name='product',
            name='xxL',
            field=models.IntegerField(blank=True, default=0),
        ),
        migrations.AddField(
            model_name='product',
            name='xxxL',
            field=models.IntegerField(blank=True, default=0),
        ),
        migrations.DeleteModel(
            name='AvilableSize',
        ),
    ]