# Generated by Django 4.2.4 on 2023-08-08 09:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0009_remove_product_l_remove_product_m_remove_product_s_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sizeavailable',
            name='quantity',
            field=models.PositiveIntegerField(default=0),
        ),
    ]