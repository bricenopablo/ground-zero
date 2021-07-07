from rest_framework import serializers
from .models import Arte

class ArteSerializer(serializers.ModelSerializer):
  imagen = serializers.CharField(source='get_first_image.imagen.url')
  artista = serializers.CharField(source='idArtista.get_full_name')
  class Meta:
      model = Arte
      fields = ['idArte', 'nombreArte', 'artista', 'imagen']