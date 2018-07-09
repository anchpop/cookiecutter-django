from django.urls import path, re_path

from . import views

app_name = '{{cookiecutter.project_slug}}'
urlpatterns = [
    path('', views.Index.as_view(), name='index'),
    re_path(r'.*', views.Index.as_view()),
]
