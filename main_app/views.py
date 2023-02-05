from django.shortcuts import render, redirect
from .models import *

from django.urls import reverse
from django.views import View
from django.views.generic.base import TemplateView
from django.views.generic.edit import UpdateView, DeleteView
from django.views.generic.detail import DetailView
from django.contrib.auth import login
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
# from django.contrib.auth.models import User

# import pytz
# import datetime as dt
import boto3
import botocore
import os
# import uuid

# Create your views here.


class Home(TemplateView):
    template_name = 'post_index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['change_to_profile_timezone'] = 'America/New_York'
        context['posts'] = Post.objects.all()
        context['profiles'] = Profile.objects.all()
        current_user = self.request.user
        if current_user.is_authenticated:
            context['auth_profile'] = Profile.objects.get(
                user_id=current_user.id)
        return context


class About(TemplateView):
    template_name = 'about.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        current_user = self.request.user
        if current_user.is_authenticated:
            context['auth_profile'] = Profile.objects.get(
                user_id=current_user.id)
        return context


def image_upload(request):
    if request.method == 'POST':
        image_file = request.FILES.get('image_url', None)
        if image_file:
            s3 = boto3.client('s3')
            try:
                bucket = os.getenv('S3_BUCKET')
                region = os.getenv('S3_REGION_CODE')
                s3.upload_fileobj(image_file, bucket, image_file.name)
                s3_url = f'https://{bucket}.s3.{region}.amazonaws.com/{image_file.name}'
                return redirect(f'/post/new?url={s3_url}')
            except botocore.exceptions.ClientError as error:
                print(error)
                return redirect('post_index')
        else:
            print('Error: No image file found')
            return redirect('post_index')
    else:
        print('NOT a POST request')
        return render(request, 'post_index.html')


@method_decorator(login_required, name='dispatch')
class NewImage(TemplateView):
    template_name = 'image_maker.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        current_user = self.request.user
        if current_user.is_authenticated:
            context['auth_profile'] = Profile.objects.get(
                user_id=current_user.id)
        return context


@method_decorator(login_required, name='dispatch')
class PostCreate(View):

    def get(self, request):
        url = request.GET.get("url")
        context = {'post_image_url': url}
        current_user = request.user
        if current_user.is_authenticated:
            context['auth_profile'] = Profile.objects.get(
                user_id=current_user.id)
        return render(request, 'post_create.html', context)

    def post(self, request):
        user = request.user
        post_image_url = request.POST.get('image_url')
        post_description = request.POST.get('description')
        print('user:', user)
        print('user.id:', user.id)
        print('image_url:', post_image_url)
        print('description:', post_description)
        new_post = Post(user_id=user.id, image_url=post_image_url,
                        description=post_description)
        new_post.save()
        print(new_post.id)
        return redirect('post_index')

    def add_image(request, user):
        return redirect('post_index')

    def form_valid(self, form):
        print('>> form valid is running')
        form.instance.user = self.request.user
        return super(PostCreate, self).form_valid(form)

    def get_success_url(self):
        print(self.kwargs)
        return reverse('post_index')


@method_decorator(login_required, name='dispatch')
class PostDetail(DetailView):
    model = Post
    template_name = 'post_detail.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['change_to_profile_timezone'] = 'America/New_York'
        # print(len(pytz.common_timezones))
        context['profiles'] = Profile.objects.all()
        current_user = self.request.user
        if current_user.is_authenticated:
            context['auth_profile'] = Profile.objects.get(
                user_id=current_user.id)
        return context


@method_decorator(login_required, name='dispatch')
class PostUpdate(UpdateView):
    model = Post
    fields = ['description']
    template_name = "post_edit.html"

    def get_success_url(self):
        return reverse('post_detail', kwargs={'pk': self.object.pk})

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        current_user = self.request.user
        if current_user.is_authenticated:
            context['auth_profile'] = Profile.objects.get(
                user_id=current_user.id)
        return context


@method_decorator(login_required, name='dispatch')
class PostDelete(DeleteView):
    model = Post
    template_name = 'post_delete_confirm.html'
    success_url = '/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        current_user = self.request.user
        if current_user.is_authenticated:
            context['auth_profile'] = Profile.objects.get(
                user_id=current_user.id)
        return context


@method_decorator(login_required, name='dispatch')
class ProfileDetail(DetailView):
    model = Profile
    template_name = 'profile_detail.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        current_user = self.request.user
        if current_user.is_authenticated:
            context['auth_profile'] = Profile.objects.get(
                user_id=current_user.id)
        return context


@method_decorator(login_required, name='dispatch')
class ProfileUpdate(UpdateView):
    model = Profile
    fields = ['social_link']
    template_name = "profile_edit.html"

    def get_success_url(self):
        return reverse('profile_detail', kwargs={'pk': self.object.pk})

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        current_user = self.request.user
        if current_user.is_authenticated:
            context['auth_profile'] = Profile.objects.get(
                user_id=current_user.id)
        return context


@method_decorator(login_required, name='dispatch')
class ProfileDelete(DeleteView):
    model = Profile
    template_name = 'profile_delete_confirm.html'
    success_url = '/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        current_user = self.request.user
        if current_user.is_authenticated:
            context['auth_profile'] = Profile.objects.get(
                user_id=current_user.id)
        return context


class Register(View):
    def get(self, request):
        form = UserCreationForm()
        context = {"form": form}
        return render(request, "registration/register.html", context)

    def post(self, request):
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            Profile(user_id=user.id).save()
            login(request, user)
            current_user = self.request.user
            new_profile = Profile.objects.get(user_id=current_user.id)
            print('*** current_user.id:', current_user.id)
            print('*** new_profile.id:', new_profile.id)
            return redirect('profile_detail', new_profile.id)
        else:
            context = {"form": form}
            return render(request, "registration/register.html", context)
