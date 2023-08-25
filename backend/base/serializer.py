from rest_framework import serializers
from .models import Product,OrderItem,ShippingAddress,Order,SizeAvailable,SizeAvailable,CustomUser as User
from rest_framework_simplejwt.tokens import RefreshToken


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
   
    ShippingAddress=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ('id','username','email','name','isAdmin','ShippingAddress','phone','image','isverified')


    
    def get_name(self,obj):
        name =obj.first_name
        if name == '':
            name = obj.email
        return name
    def get_isAdmin(self,obj):
        return obj.is_staff
    def get_ShippingAddress(self,obj):
        addresses = ShippingAddress.objects.filter(User=obj)
    
        serializer = ShippingAddressSerializer(addresses, many=True)  # Correct for multiple addresses
        return serializer.data
        



class UserSerializerWithToken(UserSerializer):
    token=serializers.SerializerMethodField(read_only=True)
   
    class Meta:
         model=User
         fields=('id','username','email','name','isAdmin','token')
    def get_token(self,obj):
        token=RefreshToken.for_user(obj)
        return str(token.access_token)
    
    

class SizeAvailableSerializer(serializers.ModelSerializer):
    class Meta:
        model = SizeAvailable
        fields = ('size','quantity')

class ProductSerializer(serializers.ModelSerializer):
    sizesAvailable = serializers.SerializerMethodField( read_only=True)
    class Meta:
        model = Product
        fields = '__all__'

    def get_sizesAvailable(self,obj):
       size=SizeAvailable.objects.filter(product=obj)
       serializers=SizeAvailableSerializer(size,many=True)
       return serializers.data

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model=ShippingAddress
        fields = ('__all__')

class OrderItemSerializer (serializers.ModelSerializer):
    class Meta:
        model=OrderItem
        fields = '__all__'

class OrderSerializer (serializers.ModelSerializer):
    orderItems =serializers.SerializerMethodField(read_only=True)
    shippingAddress =serializers.SerializerMethodField(read_only=True)
    user=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=Order
        fields = '__all__'


    def get_orderItems(self,obj):
        item=obj.orderitem_set.all()
        serializers=OrderItemSerializer(item,many=True)
        return serializers.data
    
    def get_shippingAddress(self,obj):
        try:
            address= ShippingAddressSerializer(obj.shippingAddress,many=False).data
        except:
            address=False
        return address

    def get_user(self,obj):
        user=obj.user
        serializers=UserSerializer(user,many=False)
        return serializers.data