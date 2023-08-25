from django.shortcuts import render
from base.models import Product

from base.serializer import ProductSerializer
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from rest_framework import status

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
def search_products(request):
    search_query = request.query_params.get('search', '')

    if not search_query or search_query == '' :
        getproduct()
    else:
        products = Product.objects.filter(name=search_query)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)