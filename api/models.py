from django.db import models


class Task(models.Model):
    title = models.CharField(max_length=255, null=False)
    completed = models.BooleanField(default=False, null=False)

    def __str__(self):
        return self.title
