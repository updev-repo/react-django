from django.urls import path
from .views import UserLoginView, UserProfileView, UserCreateView

urlpatterns = [
    path("create/", UserCreateView.as_view(), name="create"),
    path("login/", UserLoginView.as_view(), name="login"),
    path("profile/", UserProfileView.as_view(), name="profile"),
]
