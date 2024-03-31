from django.shortcuts import render, redirect, get_object_or_404
from .models import *
from .utils import generate_qr_code
from django.urls import reverse
from django.template.loader import render_to_string
from django.conf import settings
from django.core.mail import EmailMessage

def register(request):
    if request.method == 'POST':
        user_name = request.POST.get('name')
        user_email = request.POST.get('email')
        user_school = request.POST.get('school')
        user_languages = request.POST.get('languages')
        user_year = request.POST.get('year')
        user_team = request.POST.get('team')
        user_course = request.POST.get('course')

        participant, created = Participant.objects.get_or_create(
            name = user_name,
            email = user_email,
            team = user_team,
            course = user_course,
            school = user_school,
            language = user_languages,
            year = user_year
        )

        if created:
            ticket_id = uuid.uuid4().int & (1 << 31) - 1  # Generating a unique ticket ID
            ticket = Ticket.objects.create(participant=participant, ticket_id=ticket_id)
            generate_qr_code(ticket_id)

            qr_code_url = request.build_absolute_uri(reverse('scan_qr', kwargs={'ticket_id': ticket_id}))

            email_content = render_to_string('email.html', { 
                'name': participant.name,
                'email': participant.email,
                'team': participant.team,
                "course": participant.course,
                "school": participant.school,
                "language": participant.language,
                "year": participant.year,
                'qr_code_url': qr_code_url,
                'ref_code': participant.ref_code
            })

            try:
                email = EmailMessage(
                    'Registration Details',
                    email_content,
                    settings.DEFAULT_FROM_EMAIL,
                    [participant.email]
                )
                email.content_subtype = 'html'
                email.send()
            except Exception as e:
                print(f"Error sending email: {e}")

            return redirect(reverse('success', kwargs={'ticket_id': ticket_id}))
    
    return render(request, 'register.html')

def success(request, ticket_id):
    ticket = get_object_or_404(Ticket, ticket_id=ticket_id)
    return render(request, 'success.html', {'ticket': ticket})

def scan_qr(request, ticket_id):
    ticket = get_object_or_404(Ticket, ticket_id=ticket_id)
    if not ticket.used:
        ticket.used = True
        ticket.save()
        return render(request, 'success.html', {'participant': ticket.participant})
    else:
        return render(request, 'already_scanned.html')

def superuser_check(user):
    return user.is_superuser

def generate_ticket(request, ticket_id):
    ticket = get_object_or_404(Ticket, id=ticket_id)
    generate_qr_code(ticket_id)
    return render(request, 'ticket.html', {'ticket': ticket})

def landing_page(request):
    return render(request, 'main.html')

def community_view(request):
    return render(request, 'community.html')

def login_view(request):
    return render(request, 'login.html')

def dashboard_view(request):
    return render(request, 'dashboard.html')