from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from .models import Cart

# Create your views here.

class GetCartAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication]
    
    def get(self, request):
        user = request.user
        user_cart = Cart.objects.filter(user=user)
        if user_cart.exists():
            user_cart_list = [{"id":item.itemID, 'quantity': item.quantity} for item in user_cart]
            return Response({'cart': user_cart_list}, status=200)
        else:
            return Response({'message': 'Cart is empty'}, status=404)

class CartAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication]
    
    def post(self, request, id, quantity):
        if Cart.objects.filter(user=request.user, itemID=id).exists():
            product_cart = Cart.objects.get(user=request.user, itemID=id)
            if quantity != 0:
                product_cart.quantity = product_cart.quantity + quantity
                product_cart.save()
                return Response({'message': 'Item updated successfully.'}, status=200)
            else:
                product_cart.delete()
                return Response({'message': 'Item deleted successfully'}, status=200)
            
        Cart.objects.create(user=request.user, itemID=id, quantity=quantity)
        return Response({'message': 'Item added successfully'}, status=201)
