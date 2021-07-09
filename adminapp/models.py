from django.db import models


class Administrador(models.Model):
    idAdmin = models.AutoField(
        primary_key=True, verbose_name="Id de administrador")
    email = models.CharField(max_length=250, verbose_name="Correo electronico")
    nombreUsuario = models.CharField(
        max_length=50, verbose_name="Nombre de usuario")
    contrasena = models.CharField(max_length=50, verbose_name="Contraseña")

    def __str__(self):
        return self.nombreUsuario
