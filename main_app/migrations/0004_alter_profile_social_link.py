# Generated by Django 4.1.5 on 2023-01-30 21:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0003_alter_profile_social_link'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='social_link',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]