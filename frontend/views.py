from django.shortcuts import render

def list_tasks(request):
    return render(request, 'list.html')
