from django.shortcuts import render
from django.http import JsonResponse
from base.models import Product,Order,ShippingAddress,OrderItem,SizeAvailable,CustomUser as User
from base.serializer import ProductSerializer,OrderSerializer,UserSerializer
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.serializers import ValidationError
from razorpay import Client
import logging
from django.conf import settings



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    
    user =request.user
    
    data = request.data
    
    
    address=ShippingAddress.objects.get(id=data['index'])

    orderItems = data['orderItems']
    # print(data['order'])

    if orderItems and len(orderItems) == 0:
        return Response({'detail' : 'No Order Item' }, Status = status.HTTP_400_BAD_REQUEST)
    else :
        # Create a order
        order=Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            address=address,
            totalPrice=data['totalprice'],
            
        )
        # Create shipping Address
        
        

        # Create order and set order to orderItem relationship
        for i in orderItems:
            product=Product.objects.get(id=i['product'])
            size=SizeAvailable.objects.get(product=product , size=i['size'])
            item=OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty_'],
                price=i['price'],
                image=product.image.url,
            )

        # update the stock
        size.quantity -= item.qty
        size.save()
    serializer=OrderSerializer(order,many=False)
    return Response(serializer.data)

@api_view(['POST', 'PUT'])
# @permission_classes([IsAuthenticated])
def Payment(request):
    data=request.data
   
    try:
        order=Order.objects.get(razorpay_order_id=data['order_id'])
        
        client = Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
        add=client.utility.verify_payment_signature({
            "razorpay_payment_id":data['payment_id'],
            "razorpay_order_id":data['order_id'],
            "razorpay_signature":data['signature']
        }
        )
        print(add)
        order.razorpay_payment_id = data['payment_id']
        order.razorpay_payment_signature = data['signature']
         
        order.save()
        serializer=OrderSerializer(order,many=False)
        return Response(serializer.data)
    except Exception as e:
        
        return Response({'detail' : 'Payment not successfull'},status=status.HTTP_400_BAD_REQUEST)
    

    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request,pk):
    user = request.user
    try:
        order =Order.objects.get(id=pk)
        if user.is_staff or order.user == user:
            serializer=OrderSerializer(order,many=False)
            return Response(serializer.data)
        else:
            Response ({'detail' : 'Not authorized to view this order'},
                  status= status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail' : 'Ordrer does not exists'},status=status.HTTP_400_BAD_REQUEST)
    

