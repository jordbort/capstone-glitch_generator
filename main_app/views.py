from django.shortcuts import render, redirect
from .models import *

from django.urls import reverse
from django.views import View
from django.views.generic.base import TemplateView
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.views.generic.detail import DetailView
from django.contrib.auth import login
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
# from django.contrib.auth.models import User

# import pytz
# import datetime as dt
import boto3
from decouple import config
import uuid

# Create your views here.


class Home(TemplateView):
    template_name = 'post_index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['change_to_profile_timezone'] = 'America/New_York'
        context['posts'] = Post.objects.all()
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


@method_decorator(login_required, name='dispatch')
class NewPostImage(TemplateView):
    template_name = 'image_maker.html'


# @method_decorator(login_required, name='dispatch')
# class PostCreate(CreateView):
#     template_name = 'post_create.html'
#     model = Post
#     fields = []

#     # def add_image(request, user):
#     #     return redirect('post_index')

#     def form_valid(self, form):
#         print('>> form valid is running')
#         form.instance.user = self.request.user
#         # print(form)
#         image_file = self.request.FILES.get('image_url', None)
#         print('>>>', image_file)
#         print(self.request.FILES.get('image_url'))
#         # return redirect('post_create')
#         if image_file:
#             s3 = boto3.client('s3')
#             key = uuid.uuid4().hex[:6] + \
#                 image_file.name[image_file.name.rfind('.'):]
#             try:
#                 bucket = config('S3_BUCKET')
#                 s3.upload_fileobj(image_file, bucket, key)
#                 form.instance.image_url = f"{config('S3_BUCKET')}{bucket}/{key}"
#                 # Post.objects.create(image_url=img_url, user_id=user.id)
#                 return super(PostCreate, self).form_valid(form)
#             except:
#                 print('An error occurred uploading file to S3')
#                 return redirect('post_create')
#         return redirect('post_create')

#     def get_success_url(self):
#         print(self.kwargs)
#         return reverse('post_detail', kwargs={'pk': self.object.pk})

#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         current_user = self.request.user
#         if current_user.is_authenticated:
#             context['auth_profile'] = Profile.objects.get(
#                 user_id=current_user.id)
#         return context


@method_decorator(login_required, name='dispatch')
class PostDetail(DetailView):
    model = Post
    template_name = 'post_detail.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['change_to_profile_timezone'] = 'America/New_York'
        # print(len(pytz.common_timezones))
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

    # def get(self, request):
    #     form = UserCreationForm()
    #     context = {"form": form}
    # return render(request, "registration/register.html", context)

    def get_success_url(self):
        return reverse('profile_detail', kwargs={'pk': self.object.pk})

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # form = UserCreationForm()
        # context['form'] = form
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
            # return redirect("post_index")
            current_user = self.request.user
            new_profile = Profile.objects.get(user_id=current_user.id)
            print('*** current_user.id:', current_user.id)
            print('*** new_profile.id:', new_profile.id)
            return redirect('profile_detail', new_profile.id)
        else:
            context = {"form": form}
            return render(request, "registration/register.html", context)
