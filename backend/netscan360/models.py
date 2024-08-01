from django.db import models
from .validators import validate_ip

class Scan(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('running', 'Running'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    ]
    typescan = models.CharField(max_length=100)
    command = models.CharField(max_length=255)
    target = models.CharField(max_length=100, blank=True, null=True, validators=[validate_ip])
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    result = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.typescan} - {self.target}"

class HostsDiscovered(models.Model):
    scan = models.ForeignKey(Scan, on_delete=models.CASCADE, related_name='hosts')
    target_ip = models.CharField(max_length=100, validators=[validate_ip])
    os_version = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.target_ip

class ServicesDiscovered(models.Model):
    host = models.ForeignKey(HostsDiscovered, on_delete=models.CASCADE, related_name='services')
    port = models.IntegerField()
    state = models.CharField(max_length=50)
    service = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.host.target_ip} - {self.port}"