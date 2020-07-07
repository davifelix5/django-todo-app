from django.urls import path
from . import views


urlpatterns = [
    path('', views.apiOverview, name="base-url"),
    path('list-tasks/', views.task_list, name="task-list"),
    path('show-task/<int:pk>', views.task_detail, name="task-show"),
    path('create-task/', views.task_create, name="task-create"),
    path('update-task/<int:pk>', views.task_update, name="task-update"),
    path('delete-task/<int:pk>', views.task_delete, name="task-delete"),
]
