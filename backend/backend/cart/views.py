from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from .models import Cart

# Create your views here.

class CartAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication]
    
    def post(self, request, id, quantity):
        if Cart.objects.filter(user=request.user, itemID=id).exists():
            product_cart = Cart.objects.get(user=request.user, itemID=id)
            if quantity != 0:
                product_cart.quantity = quantity
                product_cart.save()
                return Response({'message': 'Item updated successfully.'}, status=200)
            else:
                product_cart.delete()
                return Response({'message': 'Item deleted successfully'}, status=200)
            
        Cart.objects.create(user=request.user, itemID=id, quantity=quantity)
        return Response({'message': 'Item added successfully'}, status=201)
