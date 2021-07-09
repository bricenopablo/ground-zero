from django.urls import path
from .views import del_arte, home, auth, insertar_arte, arte

urlpatterns = [
    path('home/', home, name='admin-home'),
    path('', auth, name='admin-auth'),
    path('arte/agregar', insertar_arte, name='admin-add-arte'),
    path('arte/<id>/', arte, name='admin-mod-arte'),
    path('arte/<id>/borrar/', del_arte, name='admin-del-arte'),
]
