from django.db.models.signals import pre_save,post_save
from django.contrib.auth.models import User


def updateUser(sender,instance,**kwargs):
    user = instance
    if User.email  != '':
        user.username =user.email

pre_save.connect(updateUser, sender=User)

def save_profile(sender, instance, **kwargs):
    instance.profile.save()

post_save.connect(save_profile, sender=User)
