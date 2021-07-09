from django.db import models
from datetime import datetime

# Create your models here.


class Categoria(models.Model):
    idCategoria = models.AutoField(
        primary_key=True, verbose_name="Id de Categoria")
    nombreCategoria = models.CharField(
        max_length=50, verbose_name="Nombre de la Categoria")

    def __str__(self):
        return self.nombreCategoria


class Artista(models.Model):
    idArtista = models.AutoField(
        primary_key=True, verbose_name="Id de Artista")
    pNombre = models.CharField(
        max_length=50, verbose_name="Primer nombre del artista")
    sNombre = models.CharField(
        max_length=50, verbose_name="Segundo nombre del artista", null=True)
    apPaterno = models.CharField(
        max_length=50, verbose_name="Apellido paterno del artista")
    apMaterno = models.CharField(
        max_length=50, verbose_name="Apellido materno del artista", null=True)
    email = models.CharField(max_length=255, verbose_name="Email del artista")
    clave = models.CharField(
        max_length=255, verbose_name="Contraseña del artista")

    def get_full_name(self):
        return f"{self.pNombre} {self.sNombre} {self.apPaterno} {self.apMaterno}"

    def natural_key(self):
        return self.get_full_name()

    def __str__(self):
        return self.get_full_name()


class Arte(models.Model):
    idArte = models.AutoField(primary_key=True, verbose_name="Id de Arte")
    nombreArte = models.CharField(
        max_length=50, verbose_name="Nombre del arte")
    descripcionArte = models.TextField(verbose_name="Descripcion de el arte")
    destacado = models.BooleanField(
        default=False, verbose_name="El arte es destacado o no")
    precio = models.IntegerField(default=0, verbose_name="Precio del arte")
    fechaSubida = models.DateField(
        default=datetime.now, verbose_name="Fecha de subida del arte")
    idCategoria = models.ForeignKey(
        Categoria, on_delete=models.CASCADE, verbose_name="Categoría")
    idArtista = models.ForeignKey(
        Artista, on_delete=models.CASCADE, verbose_name="Artista")

    def get_first_image(self):
        return Imagen.objects.filter(idArte=self.idArte).first()

    def __str__(self):
        return f"{self.nombreArte} | {self.idArtista}"


class Imagen(models.Model):
    idImagen = models.AutoField(
        primary_key=True, verbose_name="Id de Imagen")
    imagen = models.ImageField(upload_to='artes/', verbose_name="Imagen")
    idArte = models.ForeignKey(
        Arte, on_delete=models.CASCADE, verbose_name="Arte")

    def __str__(self):
        return f"{self.idImagen} | {self.idArte}"
