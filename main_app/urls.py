from django.urls import path
from . import views

urlpatterns = [
    path('', views.Home.as_view(), name='post_index'),
    path('about/', views.About.as_view(), name='about'),
    path('post/create/', views.PostCreate.as_view(), name='post_create'),
    path('post/<int:pk>/', views.PostDetail.as_view(), name='post_detail'),
    path('post/<int:pk>/', views.PostUpdate.as_view(), name='post_update'),
    path('post/<int:pk>/', views.PostDelete.as_view(), name='post_delete'),
    path('profile/<int:pk>/', views.ProfileDetail.as_view(), name='profile_detail'),
    path('profile/<int:pk>/', views.ProfileUpdate.as_view(), name='profile_update'),
    path('profile/<int:pk>/', views.ProfileDelete.as_view(), name='profile_delete'),
    path('accounts/register/', views.Register.as_view(), name='register'),
]
