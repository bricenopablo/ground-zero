from django.urls import path
from .views import home, auth

urlpatterns = [
    path('home', home, name='admin-home'),
    path('login', auth, name='admin-auth'),
]
