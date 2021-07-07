from rest_framework.response import Response
from django.shortcuts import render
from django.db.models import Q
from .models import Arte, Imagen
from django.core import serializers
import json
from .serializers import ArteSerializer
from django.http import HttpResponse

# Create your views here.
def home(request):
  arte = Arte.objects.all()
  destacados = Arte.objects.filter(destacado=True)

  if 'search' in request.GET:
    busqueda = request.GET['search']
    arte = arte.filter(Q(nombreArte__icontains=busqueda) | 
                      Q(idArtista__pNombre__icontains = busqueda) |
                      Q(idArtista__sNombre__icontains = busqueda) |
                      Q(idArtista__apPaterno__icontains = busqueda) |
                      Q(idArtista__apMaterno__icontains = busqueda) |
                      Q(idCategoria__nombreCategoria = busqueda)
                      )
    arte_json = ArteSerializer(arte, many=True)
    return HttpResponse(json.dumps(arte_json.data))

  contexto = {
    "artes": arte,
    "destacados": destacados,
  }
  return render(request, 'core/home.html', contexto)

def login(request):
  return render(request, 'core/login.html')

def register(request):
  return render(request, 'core/register.html')

def arte(request, id):
  arte = Arte.objects.get(arteId=id)
  contexto = {
    "arte": arte
  }
  return render(request, 'core/arte.html', contexto)