from django.urls import path
from .views import *

urlpatterns = [
    path('', landing_page, name='landing'),
    path('register/', register, name='register'),
    path('admin/login/', login_view, name='login'),
    path('admin/dashboard/', dashboard_view, name='dashboard'),
    path('community/', community_view, name='community'),
]
