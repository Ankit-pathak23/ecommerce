from django.db import models
from base.models import Order

class Transaction(models.Model):
    payment_id = models.CharField(max_length=200, verbose_name="Payment ID")
    order_id = models.CharField(max_length=200, verbose_name="Order ID")
    signature = models.CharField(max_length=500, verbose_name="Signature", blank=True, null=True)
    amount = models.IntegerField(verbose_name="Amount")
    created_at = models.DateTimeField(auto_now_add=True)
    # order=models.OneToOneField(Order,on_delete=models.CASCADE,null=True, blank=True)
    def __str__(self):
        return str(self.id)
