# Generated by Django 3.2.4 on 2021-07-06 19:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0007_alter_imagen_imagen'),
    ]

    operations = [
        migrations.AlterField(
            model_name='imagen',
            name='imagen',
            field=models.ImageField(upload_to='artes_img/', verbose_name='Imagen'),
        ),
    ]
