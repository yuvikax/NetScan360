# validators.py
import re
from django.core.exceptions import ValidationError

def validate_ip(value):
    ip_regex = re.compile(r'^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$')
    if not ip_regex.match(value):
        raise ValidationError(f'{value} is not a valid IP address')
