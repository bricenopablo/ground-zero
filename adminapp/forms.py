from core.models import Arte
from django.forms import ModelForm
from .models import Administrador


class AdminForm (ModelForm):
    class Meta:
        model = Administrador
        fields = ['nombreUsuario', 'contrasena']


class ArteForm (ModelForm):
    class Meta:
        model = Arte
        fields = ['idArtista', 'nombreArte', 'precio',
                  'idCategoria', 'descripcionArte']
