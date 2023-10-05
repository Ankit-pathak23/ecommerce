from django.shortcuts import render
from django.http import JsonResponse
from base.models import CustomUser as User,Order
from rest_framework.authentication import TokenAuthentication
from base.serializer import ProductSerializer,UserSerializer,UserSerializerWithToken,ShippingAddressSerializer,OrderSerializer
from rest_framework.decorators import api_view,permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser,AllowAny
from rest_framework.response import Response
from typing import Any, Dict, Optional, Type, TypeVar
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from base.models import ShippingAddress
from django.contrib.auth.hashers import make_password
from rest_framework import status
from base.email import send_otp_via_email
import requests

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer=UserSerializerWithToken(self.user).data

        for k,v in serializer.items():
            data[k]=v

        return data
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer     



@api_view(['POST'])
def registerUser(request):
    data=request.data
    print(data)

    try:
        user=User.objects.create(
            first_name=data['name'],
            email=data['email'],
            image=data['image'],
            phone=data['phone'],
            username=data['email'],
            password=make_password(data['password'])
            
        )
        send_otp_via_email(email=data['email'])

        serializer=UserSerializerWithToken(user,many=False)
        
        return Response(serializer.data)
    except:
        message={'detail':'User with this email already exists'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)
    
    
@api_view(['POST'])
def googleregister(request):
    data=request.data
    print(data)

    try:
        user=User.objects.get(email=data['email'])
        user.isVerified=True

        serializer=UserSerializerWithToken(user,many=False)
        print(serializer.data)
        return Response(serializer.data)
    except:
        try:
            user=User.objects.create(
            first_name=data['name'],
            email=data['email'],
            imagegoogle=data['image'],
            username=data['email'],
            isverified=True,
            password=make_password(data['email'])
            )

            serializer=UserSerializerWithToken(user,many=False)
           
            return Response(serializer.data)

        except:
            message={'detail':'User with this email already exists'}
            return Response(message,status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def resendOTP(request):
    data = request.data

    try:
        user = User.objects.get(email=data['email'])
        if user.isverified:
            message = {'detail': 'User is already verified'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

        if send_otp_via_email(email=user.email):
            return Response({'detail': 'New OTP has been sent successfully'})
        else:
            return Response({'detail': 'Failed to resend OTP'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except User.DoesNotExist:
        message = {'detail': 'User not found'}
        return Response(message, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        message = {'detail': str(e)}
        return Response(message, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def verifyuser(request):
    data = request.data

    try:
        email = data['email']
        otp = data['otp']
        
        user = User.objects.filter(email=email).first()

        if not user:
            message = {'detail': 'Invalid user'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

        if user.otp != otp:
            message = {'detail': 'Invalid OTP'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
        
        # OTP matches, set isverified to True
        user.isverified = True
        user.save()

        serializer = UserSerializerWithToken(user, many=False)
        
        return Response(serializer.data)
    except:
        message = {'detail': 'An error occurred'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def forgot_password(request):
    if request.method == 'POST':
        email = request.data.get('email')
        try:
            user = User.objects.get(email=email)
            send_otp_via_email(email)  # Use the send_otp_via_email function from email.py
            return Response({'message': 'OTP sent successfully.'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'User with this email does not exist.'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def reset_password(request):
    if request.method == 'POST':
        email = request.data['email']
        otp = request.data['otp']
        print(email + otp)
        new_password = request.data.get('password')
        print(new_password)
        
        try:
            user = User.objects.get(email=email)
            print(user.otp)
            if(user.otp == otp):
                user.set_password(new_password)
                user.otp = None
                user.save()
                return Response({'message': 'Password reset successfully.'}, status=status.HTTP_200_OK)
            else: 
                return Response({'error': 'Invalid OTP or email.'}, status=status.HTTP_400_BAD_REQUEST)

        except User.DoesNotExist:
            return Response({'error': 'Invalid OTP or email.'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serailizer = UserSerializerWithToken(user,many=False)
    
    data=request.data
    user.first_name=data['name']
    
    user.email=data['email']
    user.phone = data['phone']
    if data['password'] != '':
        user.password=make_password(data['password'])
    
    user.save()

    return Response(serailizer.data)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serailizer = UserSerializer(user,many=False)
    return Response(serailizer.data)
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    Users =  User.objects.all()
    serailizer = UserSerializer(Users,many=True)
    return Response(serailizer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createShippingAddress(request):
    data = request.data
    
    user = request.user
  

    try:
        address = ShippingAddress.objects.create(
            User=user,
            name=data['name'],
            phone=data['phone'],
            address=data['address'],
            city=data['city'],
            postalCode=data['postalCode'],
            country=data['country']
        )

        serializer = ShippingAddressSerializer(address)

        return Response(serializer.data)
    except:
        message = {'detail': 'Failed to create shipping address'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])  # Allow unauthenticated access
def google_login(request):
    # Get user details from the request (assuming JSON data)
    access_token = request.data.get('access_token')
    email = request.data.get('email')
    # Other user details you might need

    # Verify the Google access token (using Google API or other libraries)
    # If verification is successful:
    # Check if the user already exists in the database
    try:
        user = User.objects.get(username=email)
        seralizer=user
        # Update the user's information if needed
        # ...
    except User.DoesNotExist:
        # Create a new user with the provided details
        user = User.objects.create_user(username=email, email=email)
        # ...
    
    # Perform any additional authentication/logic if needed

    # Return a response to the frontend
    return Response({'message': 'Google login successful', 'user_id': user.id})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_orders(request):
    try:
        # Check if the logged-in user is the same as the requested user_id
        user = request.user

        # Retrieve the user's orders
        orders = Order.objects.filter(user=user)

        if orders.exists():
            # Serialize the orders
            serializer = OrderSerializer(orders, many=True)
            return Response(serializer.data)
        else:
            # No orders found for the user
            return Response({'detail': 'No orders found for this user.'}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        # Handle any other unexpected exceptions or errors
        print(e)
        return Response({'detail': 'An error occurred while processing your request.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
