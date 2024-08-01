# app urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ScanViewSet, NmapOutputViewSet, HostsOutputViewSet, OsOutputViewSet

router = DefaultRouter()
router.register(r'scans', ScanViewSet)
router.register(r'nmap_output', NmapOutputViewSet, basename='nmap_output')
router.register(r'hosts_output', HostsOutputViewSet, basename='hosts_output')
router.register(r'os_output', OsOutputViewSet, basename='os_output')

urlpatterns = [
    path('api/', include(router.urls)),
]
