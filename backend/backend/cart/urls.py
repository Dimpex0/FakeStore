from django.urls import path
from .views import CartAPIView, GetCartAPIView


urlpatterns = [
    path('', GetCartAPIView.as_view()),
    path('add/<int:id>/<int:quantity>/', CartAPIView.as_view()),
]