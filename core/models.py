from django.db import models

# Create your models here.
class Categoria(models.Model):
  idCategoria = models.IntegerField(primary_key=True,verbose_name="Id de Categoria")
  nombreCategoria = models.CharField(max_length=50,verbose_name="Nombre de la Categoria")
  def __str__(self):
      return self.nombreCategoria

class Artista(models.Model):
  idArtista = models.IntegerField(primary_key=True, verbose_name="Id de Artista")
  pNombre = models.CharField(max_length=50, verbose_name="Primer nombre del artista")
  sNombre = models.CharField(max_length=50, verbose_name="Segundo nombre del artista", null=True)
  apPaterno = models.CharField(max_length=50, verbose_name="Apellido paterno del artista")
  apMaterno = models.CharField(max_length=50, verbose_name="Apellido materno del artista", null=True)
  email = models.CharField(max_length=255, verbose_name="Email del artista")
  clave = models.CharField(max_length=255, verbose_name="Contraseña del artista")
  def __str__(self):
      return self.nombreArtista

class Arte(models.Model):
  idArte = models.IntegerField(primary_key=True, verbose_name="Id de Arte")
  nombreArte = models.CharField(max_length=50, verbose_name="Nombre del arte")
  descripcionArte = models.CharField(max_length=255, verbose_name="Descripcion de el arte")
  historiaArte = models.CharField(max_length=255, verbose_name="Historia sobre el arte")
  tecnicaUsada = models.CharField(max_length=60, verbose_name="Tecnica usada en el arte")
  destacado = models.BooleanField(default=False, verbose_name="El arte es destacado o no")
  precio = models.IntegerField(verbose_name="Precio del arte")
  idArtista = models.ForeignKey(Artista, on_delete=models.CASCADE)
  def __str__(self):
    return self.nombreArte
      
class Imagen(models.Model):
  idImagen = models.IntegerField(primary_key=True, verbose_name="Id de Imagen")
  url = models.CharField(max_length=255, verbose_name="URL de la imagen")
  idArte = models.ForeignKey(Arte, on_delete=models.CASCADE);