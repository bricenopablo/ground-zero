# Generated by Django 3.2.4 on 2021-07-06 19:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_auto_20210706_1526'),
    ]

    operations = [
        migrations.AlterField(
            model_name='imagen',
            name='imagen',
            field=models.ImageField(upload_to='artes_img', verbose_name='Imagen'),
        ),
    ]
