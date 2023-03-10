from django.urls import path
from . import views

urlpatterns = [
    path('', views.Home.as_view(), name='post_index'),
    path('about/', views.About.as_view(), name='about'),
    path('create/', views.NewImage.as_view(), name='image_maker'),
    path('create/upload/', views.image_upload, name='image_upload'),
    path('post/new/', views.PostCreate.as_view(), name='post_create'),
    path('post/<int:pk>/', views.PostDetail.as_view(), name='post_detail'),
    path('post/<int:pk>/edit', views.PostUpdate.as_view(), name='post_edit'),
    path('post/<int:pk>/delete', views.PostDelete.as_view(), name='post_delete'),
    path('profile/<int:pk>/', views.ProfileDetail.as_view(), name='profile_detail'),
    path('profile/<int:pk>/edit', views.ProfileUpdate.as_view(), name='profile_edit'),
    # path('profile/<int:pk>/delete', views.ProfileDelete.as_view(), name='profile_delete'),
    path('accounts/register/', views.Register.as_view(), name='register'),
]
