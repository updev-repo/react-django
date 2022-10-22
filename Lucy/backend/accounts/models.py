from email.policy import default
from enum import unique
from pickle import LIST
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
    PermissionManager,
)


class UserManager(BaseUserManager):
    def create_user(self, email, name, phoneNumber, password=None, password2="None"):
        if not email:
            raise ValueError("Users must have an email address")

        email = self.normalize_email(email)
        user = self.model(email=email, name=name, phoneNumber=phoneNumber)

        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, name, phoneNumber, password=None):

        user = self.create_user(
            email,
            password=password,
            name=name,
            phoneNumber=phoneNumber,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    phoneNumber = models.CharField(max_length=255)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS: ["name", "phoneNumber"]

    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name

    def __str__(self):
        return self.email
