from django.shortcuts import render
from base.models import Product

from base.serializer import ProductSerializer
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser,AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q

@api_view(['GET'])
def getproducts(request):
    products = Product.objects.all()
    serailizer = ProductSerializer(products,many=True)
    return Response(serailizer.data)

@api_view(['GET'])
def getproduct(request,pk):
    try:
        product = Product.objects.prefetch_related('sizeavailable_set').get(id=pk)
        serializer = ProductSerializer(product)
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)
    




@api_view(['GET'])
@permission_classes([AllowAny])
def listsearchview(request):
    query = request.query_params.get('query', '')

    if len(query) > 78:
        products = Product.objects.none()
    else:
        productsTitle = Product.objects.filter(name__icontains=query)
        productsDescription = Product.objects.filter(description__icontains=query)
        products = productsTitle.union(productsDescription)
    
    if products.count() == 0:
        return Response({'detail': 'No Item found of the given search'}, status=status.HTTP_400_BAD_REQUEST)

    serializer = ProductSerializer(products, many=True)
    
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def filter_products(request):
    color = request.query_params.get('color')
    category = request.query_params.get('category')
    size = request.query_params.get('size')

    products = Product.objects.all()

    if color:
        products = products.filter(color__iexact=color)

    if category:
        products = products.filter(category__iexact=category)

    if size:
        products = products.filter(sizeavailable__size__iexact=size)

    serializer = ProductSerializer(products, many=True)
    
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addProduct(request):
    user= request.user
    data=request.data

    product=Product.objects.create(
        user=user,
        name=data["name"],
        image1=data["image1"],
        image2=data["image2"],
        image3=data["image3"],
        image4=data["image4"],
        brand=data["brand"],
        category=data["category"],
        description=data["description"],
        rating=data['rating'],
        price=data["price"],

    )

    
    SizeAvailable=SizeAvailable.objects.create(
        product=product
    )
    