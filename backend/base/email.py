from django.core.mail import send_mail
import random
from django.conf import settings
# from django.contrib.auth.models import User
from .models import CustomUser

def send_otp_via_email(email):
    subject= 'Your account verification email'
    otp=random.randint(1000,9999)
    message = f'Your otp is {otp}'
    email_from=settings.EMAIL_HOST_USER
    try:
        send_mail(subject,message,email_from,[email])
        user_obj=CustomUser.objects.get(email=email)
        user_obj.otp=otp
        user_obj.save()
        return True
    except Exception as e:
        print('Email sending error',e)
        return False