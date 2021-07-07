from django.urls import path
from .views import home, login, register, arte

urlpatterns = [
  path('', home, name='home'),
  path('login/', login, name='login'),
  path('register/', register, name='register'),
  path('arte/<id>', arte, name='arte')
]

