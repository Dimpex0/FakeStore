from django.db import models
from django.contrib.auth import get_user_model

UserModel = get_user_model()

# Create your models here.

class Cart(models.Model):
    user = models.ForeignKey(
        UserModel,
        on_delete=models.CASCADE,
        null=False,
        blank=False,
    )
    itemID = models.PositiveIntegerField()
    quantity = models.PositiveIntegerField()
    
    def __str__(self):
        return self.user.email