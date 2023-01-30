from django.shortcuts import render
from .models import *

from django.shortcuts import redirect
from django.urls import reverse
from django.views import View
from django.views.generic.base import TemplateView
from django.views.generic.edit import CreateView, UpdateView, DeleteView
# from django.views.generic.detail import DetailView
from django.contrib.auth import login
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

# Create your views here.


class Home(TemplateView):
    template_name = 'post_index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # context["playlists"] = Playlist.objects.all() <-- not "playlist" lol
        return context


class About(TemplateView):
    template_name = 'about.html'


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


class Register(View):
    def get(self, request):
        form = UserCreationForm()
        context = {"form": form}
        return render(request, "registration/register.html", context)

    def post(self, request):
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect("post_index")
        else:
            context = {"form": form}
            return render(request, "registration/register.html", context)
