from django.shortcuts import render, get_object_or_404
from .models import Arte, Imagen

# Create your views here.
def home(request):
  arte = Arte.objects.all()
  destacados = Arte.objects.filter(destacado=True)
  contexto = {
    "artes": arte,
    "destacados": destacados
  }
  return render(request, 'core/home.html', contexto)

def login(request):
  return render(request, 'core/login.html')

def register(request):
  return render(request, 'core/register.html')