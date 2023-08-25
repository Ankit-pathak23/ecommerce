from django.shortcuts import render
from django.http import JsonResponse
from base.models import Product,Order,ShippingAddress,OrderItem,SizeAvailable
from base.serializer import ProductSerializer,OrderSerializer
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from rest_framework import status

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    print(request)
    user =request.user
    
    data = request.data
    
    print(data)
    address=ShippingAddress.objects.get(id=data['index'])
    print(address)
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
            isPaid=data['isPaid'],
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