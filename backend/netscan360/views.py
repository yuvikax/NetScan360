import nmap
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Scan, HostsDiscovered, ServicesDiscovered
from .serializers import ScanSerializer, NmapOutputSerializer, HostsDiscoveredSerializer, ServicesDiscoveredSerializer

class ScanViewSet(viewsets.ModelViewSet):
    queryset = Scan.objects.all()
    serializer_class = ScanSerializer

    def create(self, request, *args, **kwargs):
        selected_scan_type = request.data.get('typescan', '')
        target = request.data.get('target', '')

        if not target:
            return Response({"error": "Target is required."}, status=status.HTTP_400_BAD_REQUEST)

        scan = Scan(
            typescan=selected_scan_type,
            command='',
            target=target,
            status='running'
        )
        scan.save()

        nm = nmap.PortScanner()

        if selected_scan_type == 'Ping scan':
            command = '-sn'
        elif selected_scan_type == 'Intense scan':
            command = '-T4 -A -v -O'
        elif selected_scan_type == 'Intense scan plus UDP':
            command = '-sS -sU -T4 -A -v -O'
        elif selected_scan_type == 'Quick scan':
            command = '-T4 -F -O'
        else:
            command = request.data.get('command', '')
            if '-O' not in command:
                command += ' -O'

        arguments = command.replace("nmap ", "").strip()
        scan.command = command
        scan.save()

        try:
            scan_data = nm.scan(hosts=target, arguments=arguments)
            scan.result = str(scan_data)
            scan.status = 'completed'
        except Exception as e:
            scan.result = f"Failed to perform scan: {str(e)}"
            scan.status = 'failed'

        scan.save()

        for host, result in scan_data.get('scan', {}).items():
            os_version = ', '.join(os['name'] for os in result.get('osmatch', [])) if 'osmatch' in result else None
            host_entry = HostsDiscovered(
                scan=scan,
                target_ip=host,
                os_version=os_version
            )
            host_entry.save()

            for protocol in ['tcp', 'udp']:
                if protocol in result:
                    for port, port_data in result[protocol].items():
                        service_entry = ServicesDiscovered(
                            host=host_entry,
                            port=port,
                            state=port_data['state'],
                            service=port_data.get('name', 'unknown')
                        )
                        service_entry.save()

        serializer = self.get_serializer(scan)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        scan = self.get_object()
        serializer = self.get_serializer(scan)
        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        queryset = Scan.objects.all()[0]
        id = "top"
        data = {
            "tgt": queryset.target,
            "command": queryset.command,
            "id": id
        }
        queryset.delete()
        return Response(data)

class NmapOutputViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Scan.objects.all()
    serializer_class = NmapOutputSerializer

class HostsDiscoveredViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HostsDiscovered.objects.all()
    serializer_class = HostsDiscoveredSerializer

class ServicesDiscoveredViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ServicesDiscovered.objects.all()
    serializer_class = ServicesDiscoveredSerializer