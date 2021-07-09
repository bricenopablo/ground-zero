from django import forms
from core.models import Arte, Imagen
from django.forms import ModelForm, fields
from .models import Administrador


class AdminForm (ModelForm):
    contrasena = forms.CharField(widget=forms.PasswordInput)
    class Meta:
        model = Administrador
        fields = ['nombreUsuario', 'contrasena']


class ArteForm (ModelForm):
    class Meta:
        model = Arte
        fields = '__all__'

class ImagenForm (ModelForm):
    class Meta:
        model = Imagen
        fields = ['imagen']