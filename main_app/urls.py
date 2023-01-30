from django.urls import path
from . import views

urlpatterns = [
    path('', views.Home.as_view(), name='post_index'),
    path('about/', views.About.as_view(), name='about'),
    path('post/create/', views.PostCreate.as_view(), name='post_create'),
    path('accounts/register/', views.Register.as_view(), name='register'),
]
