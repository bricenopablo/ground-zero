from django.contrib import admin
from .models import Categoria, Arte, Artista, Imagen

# Register your models here.
admin.site.register(Artista)
admin.site.register(Categoria)
admin.site.register(Arte)
admin.site.register(Imagen)