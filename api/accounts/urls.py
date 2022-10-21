from .views import RegisterAPI, LoginAPI
from knox import views as knox_views
from django.urls import path

urlpatterns = [
    path('api/signup/', RegisterAPI.as_view(), name='signup'),
    path('api/signin/', LoginAPI.as_view(), name='signin'),
    path('api/Logout', knox_views.LogoutView.as_view(), name='logout'),
]