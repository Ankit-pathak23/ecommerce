# Generated by Django 4.2 on 2023-06-14 10:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("razorpay_backend", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="transaction",
            name="signature",
            field=models.CharField(
                blank=True, max_length=500, null=True, verbose_name="Signature"
            ),
        ),
    ]
