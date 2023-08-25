from django.db import models
# from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import AbstractUser, Group, Permission
from .manager import UserManager

# Create your models here.




class CustomUser(AbstractUser):
    username=None
    phone=models.CharField(max_length=30,null=True,blank=True,unique=True)
    image=models.ImageField(upload_to='picture/%y/%m/%d/',max_length=255,blank=True)
    email=models.EmailField(unique=True)
    isverified=models.BooleanField(default=False)
    otp=models.CharField(max_length=4,null=True,blank=True)
    USERNAME_FIELD='email'
    REQUIRED_FIELDS=[]
    objects=UserManager()



class Product(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField( null=True, blank=True)
    image2=models.ImageField( null=True, blank=True)
    image3=models.ImageField( null=True, blank=True)
    image4=models.ImageField( null=True, blank=True)
    brand =models.CharField(max_length=200, null=True, blank=True)
    category =models.CharField(max_length=200, null=True, blank=True)
    description =models.TextField(null=True, blank=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True,blank=True,default=0)
    price =models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.AutoField(primary_key=True,editable=False)

    def __str__(self):
        return self.name

class SizeAvailable(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    size = models.CharField(max_length=20)
    quantity = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.product.name} - {self.size} ({self.quantity} available)"

class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True)
    name =  models.CharField(max_length=200, null=True, blank=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    comment = models.TextField(null=True, blank=True)
    id = models.AutoField(primary_key=True,editable=False)


    def __str__(self):
        return str(self.rating)
    

class ShippingAddress(models.Model):
    User = models.ForeignKey(CustomUser,on_delete=models.CASCADE,null=True, blank=True)
    name=models.CharField(max_length=200,null=True,blank=True)
    phone=models.CharField(max_length=200,null=True,blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    postalCode = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)
    id = models.AutoField(primary_key=True,editable=False)

    def __str__(self):
        return str(self.address)
    




class Order(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    totalPrice =models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True,blank=True )
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True,blank=True )
    createdAt = models.DateTimeField(auto_now_add=True )
    address=models.ForeignKey(ShippingAddress, on_delete=models.SET_NULL,null=True)
    id = models.AutoField(primary_key=True,editable=False)
    
    
    def __str__(self):
        return str(self.createdAt)
    
class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    qty =  models.IntegerField(null=True,blank=True,default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    image =  models.CharField(max_length=200, null=True, blank=True)
    id = models.AutoField(primary_key=True,editable=False)

    def __str__(self):
        return str(self.name)
    



