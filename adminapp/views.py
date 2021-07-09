from django.contrib import messages
from django.forms.models import modelformset_factory
from django.http.response import HttpResponse
from adminapp.forms import AdminForm, ArteForm, ImagenForm
from django.shortcuts import redirect, render
from .models import Administrador
from core.models import Arte, Artista, Categoria, Imagen

ImageFormSet = modelformset_factory(Imagen, form=ImagenForm, extra=1)
formset = ImageFormSet(queryset= Imagen.objects.none())

# Create your views here.
def home(request, id):
    admin = Administrador.objects.get(idAdmin=id)
    arte = Arte.objects.all()
    artista = Artista.objects.all()
    categoria = Categoria.objects.all()

    context = {
        'artes': arte,
        'artista': artista,
        'categorias': categoria,
        'formulario': ArteForm,
        'formset': formset,
        'admin': admin
    }
    return render(request, 'adminapp/home.html', context)

def insertar_arte(request):
    if(request.method == 'POST'):
        formulario = ArteForm(request.POST)
        formset = ImageFormSet(request.POST, request.FILES, queryset=Imagen.objects.none())

        if(formulario.is_valid() and formset.is_valid()):
            art_form = formulario.save(commit=False)
            art_form.save()

            for form in formset.cleaned_data:
                imagen = form['imagen']
                pic = Imagen(idArte=art_form, imagen=imagen)
                pic.save()
            messages.success(request, 'Arte ingresado')
        else:
            print(formulario.errors, formset.errors)
    else:
        formulario = ArteForm()
        formset = ImageFormSet(queryset= Imagen.objects.none())
    return redirect('admin-home')

def auth(request):
    mensaje = {
        'error': ''
    }
    if(request.method == 'POST'):
        formulario = AdminForm(request.POST)
        if(formulario.is_valid()):
            user_name = request.POST['nombreUsuario']
            user_pass = request.POST['contrasena']
            admin = Administrador.objects.filter(nombreUsuario=user_name, contrasena=user_pass)
            if(admin.count() == 1):
                return redirect('admin-home', admin.first().idAdmin)
            else:
                mensaje['error'] = 'Credenciales incorrectas'
        else:
            print(formulario.errors)
    else:
        formulario = AdminForm()
    
    context = {
        'formulario': formulario,
        'mensaje': mensaje
    }

    return render(request, 'adminapp/admin-auth.html', context)

def arte(request, id):
    arte = Arte.objects.get(idArte=id)
    form = ArteForm(instance=arte)

    if (request.method == 'POST'):
        form = ArteForm(data=request.POST, instance=arte)
        if (form.is_valid()):
            form.save()
            return redirect('admin-home')
        else:
            print(form.errors)
    else:
        form = ArteForm(instance=arte)

    context = {
        "arte": arte,
        "arteForm": form
    }

    return render(request, 'adminapp/editar.html', context)

def del_arte(request, id):
    arte = Arte.objects.get(idArte=id)
    arte.delete()

    return redirect('admin-home')