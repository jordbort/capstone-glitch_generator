from django.shortcuts import render
from .models import *

from django.shortcuts import redirect
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

# Create your views here.


class Home(TemplateView):
    template_name = 'post_index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
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
class PostCreate(CreateView):
    template_name = 'post_create.html'
    model = Post
    fields = ['description']

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super(PostCreate, self).form_valid(form)

    def get_success_url(self):
        print(self.kwargs)
        return reverse('post_detail', kwargs={'pk': self.object.pk})

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
        # print('current_user:', current_user)
        # print('current_user.id:', current_user.id)
        # print('context["auth_profile"]:', context["auth_profile"])
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
            return redirect("post_index")
        else:
            context = {"form": form}
            return render(request, "registration/register.html", context)
