# Generated by Django 4.1.6 on 2023-02-04 21:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0007_alter_post_image_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='description',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='image_url',
            field=models.CharField(default='this should not appear', max_length=255),
            preserve_default=False,
        ),
    ]
