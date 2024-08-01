from rest_framework import serializers
from .models import Scan, HostsDiscovered, ServicesDiscovered

class ServicesDiscoveredSerializer(serializers.ModelSerializer):
    scan = serializers.PrimaryKeyRelatedField(source='host.scan.id', read_only=True)
    host_id = serializers.PrimaryKeyRelatedField(source='host.id', read_only=True)

    class Meta:
        model = ServicesDiscovered
        fields = ['id', 'port', 'state', 'service', 'host_id', 'scan']

class HostsDiscoveredSerializer(serializers.ModelSerializer):
    services = ServicesDiscoveredSerializer(many=True, read_only=True)

    class Meta:
        model = HostsDiscovered
        fields = ['id', 'target_ip', 'os_version', 'scan', 'services']

class ScanSerializer(serializers.ModelSerializer):
    # hosts = HostsDiscoveredSerializer(many=True, read_only=True)

    class Meta:
        model = Scan
        fields = ['id', 'typescan', 'command', 'target', 'status', 'created_at']

class NmapOutputSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scan
        fields = ['id', 'result', 'created_at']
