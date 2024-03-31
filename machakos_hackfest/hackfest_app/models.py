# models.py
from django.db import models
from django.utils import timezone
import uuid
import hashlib

class Participant(models.Model):
    name = models.CharField(max_length=50)
    ref_code = models.CharField(unique=True, max_length=10)
    email = models.EmailField(unique=True)
    team = models.CharField(max_length=50)
    course = models.CharField(max_length=50)
    school = models.CharField(max_length=50)
    language = models.CharField(max_length=50)
    year = models.PositiveIntegerField()
    timestamp = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.ref_code:
            random_uuid = uuid.uuid4()
            hash_str = hashlib.sha256(str(random_uuid).encode('utf-8')).hexdigest()[:5]
            self.ref_code = f"MksU{hash_str}"
        super().save(*args, **kwargs)

class Ticket(models.Model):
    participant = models.ForeignKey(Participant, on_delete= models.CASCADE)
    ticket_id = models.PositiveIntegerField(unique=True)
    used = models.BooleanField(default=False)

    def __str__(self):
        return f"Ticket ID: {self.ticket_id} - Participant: {self.participant.name}"
    
class CommunityPost(models.Model):
    name = models.CharField(max_length=255, null=True)
    content = models.TextField()

    def __str__(self):
        return self.name