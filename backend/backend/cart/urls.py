from django.urls import path
from .views import CartAPIView


urlpatterns = [
    path('add/<int:id>/<int:quantity>/', CartAPIView.as_view())
]