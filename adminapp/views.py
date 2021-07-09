from django.http.response import HttpResponse
from adminapp.forms import AdminForm, ArteForm
from django.shortcuts import redirect, render
from .models import Administrador
from core.models import Arte, Artista, Categoria

# Create your views here.


def home(request):
    arte = Arte.objects.all()
    artista = Artista.objects.all()
    categoria = Categoria.objects.all()
    context = {'artes': arte, 'artista': artista, 'categorias': categoria}
    if(request.method == 'POST'):
        formulario = ArteForm(request.POST)
        if(formulario.is_valid):
            formulario.save()
            return redirect('admin-home')
        else:
            return HttpResponse('GG')
    return render(request, 'adminapp/home.html', context)


def auth(request):
    context = {'formulario': AdminForm}
    if(request.method == 'POST'):
        formulario = AdminForm(request.POST)
        if(formulario.is_valid):
            user_name = request.POST['user_name']
            user_pass = request.POST['user_pass']
            if(Administrador.objects.filter(nombreUsuario=user_name, contrasena=user_pass).count() == 1):
                return redirect('admin-home')
            else:
                return HttpResponse('El profe sigue valiendo pico')
    return render(request, 'adminapp/admin-auth.html', context)
