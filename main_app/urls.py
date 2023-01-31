from django.urls import path
from . import views

urlpatterns = [
    path('', views.Home.as_view(), name='post_index'),
    path('about/', views.About.as_view(), name='about'),
    path('post/create/', views.PostCreate.as_view(), name='post_create'),
    path('profile/<int:pk>/', views.ProfileDetail.as_view(), name='profile_detail'),
    path('accounts/register/', views.Register.as_view(), name='register'),
]
