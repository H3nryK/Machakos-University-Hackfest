from django.urls import path
from .views import *

urlpatterns = [
    path('', landing_page, name='main'),
    path('register/', register, name='register'),
    path('success/<int:ticket_id>/', success, name='success'),
    path('scan/<int:ticket_id>/', scan_qr, name='scan_qr'),
    path('admin/login/', login_view, name='login'),
    path('admin/dashboard/', dashboard_view, name='dashboard'),
    path('community/', community_view, name='community'),
]
