from django.db import migrations
from django.contrib.auth import get_user_model

def migrate_users(apps, schema_editor):
    User = get_user_model()
    CustomUser = apps.get_model('base', 'CustomUser')  # Update 'base' with your app name

    for user in User.objects.all():
        custom_user = CustomUser(
            id=user.id,
            username=user.username,
            email=user.email,
            first_name=user.first_name,
            last_name=user.last_name,
            # Copy other fields from User model to CustomUser model
            phone='',  # Set appropriate value
            image='',  # Set appropriate value
        )
        custom_user.save()

class Migration(migrations.Migration):

    dependencies = [
        # ...
    ]

    operations = [
        migrations.RunPython(migrate_users),
    ]
