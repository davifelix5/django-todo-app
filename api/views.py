from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer


@api_view(['GET'])
def apiOverview(request):

    api_urls = {
        'Create': '/create-task/',
        'List': '/list-tasks/',
        'Detail view': '/show-task/<int:pk>/',
        'Update': '/update-task/<int:pk>/',
        'Delete view': '/delete-task/<int:pk>/',
    }

    return Response(api_urls)


@api_view(['GET'])
def task_list(request):
    tasks = Task.objects.all().order_by('-id')
    # The parameter 'many' allows the API to return a list of objects
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def task_detail(request, pk):
    task = get_object_or_404(Task, id=pk)
    serializer = TaskSerializer(task, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def task_create(request):
    serializer = TaskSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return Response(serializer.data)


@api_view(['PUT'])
def task_update(request, pk):
    task = get_object_or_404(Task, id=pk)
    serializer = TaskSerializer(instance=task, data=request.data)

    if serializer.is_valid():
        serializer.save()
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return Response(serializer.data)


@api_view(['DELETE'])
def task_delete(request, pk):
    task = get_object_or_404(Task, id=pk)
    serialized_task = TaskSerializer(task)
    task.delete()

    return Response(serialized_task.data)
