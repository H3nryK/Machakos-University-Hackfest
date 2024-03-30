from django.contrib import admin
from .models import Participant, Ticket, CommunityPost

admin.site.register(Participant)
admin.site.register(Ticket)
admin.site.register(CommunityPost)