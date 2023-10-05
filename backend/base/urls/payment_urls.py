from django.urls import path

from base.views import payment_view as views

urlpatterns = [
    path('pay/', views.start_payment, name="payment"),
    path('payment/success/',views.handle_payment_success, name="payment_success")
]
