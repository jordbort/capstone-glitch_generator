from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Post(models.Model):
    description = models.TextField()
    image_url = models.CharField(max_length=255)
    # tags = ?
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.description

    class Meta:
        # try '-created_at' for reverse chronological order
        ordering = ['-created_at']


class Profile(models.Model):
    social_link = models.CharField(max_length=255, null=True, blank=True)
    # highlight_color = models.CharField(max_length=7, default='#FFFFFF')
    created_at = models.DateTimeField(auto_now_add=True)
    # timezone = ? (default=UTC)
    # light/dark mode preference ?
    # image_url = models.ImageField(default='default.jpg', upload_to='profile_pics')
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username
