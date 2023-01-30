from django.db import models

# Create your models here.


class Post(models.Model):
    description = models.TextField()
    image_url = models.CharField(max_length=255)
    # tags = ?
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.description

    class Meta:
        # try '-created_at' for reverse chronological order
        ordering = ['created_at']


class Profile(models.Model):
    social_link = models.CharField(max_length=255)
    # highlight_color = models.CharField(max_length=7, default='#FFFFFF')
    created_at = models.DateTimeField(auto_now_add=True)

    # def __str__(self):
        # return self.user