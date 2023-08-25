from django.urls import path
from base.views import user_views as views


urlpatterns=[
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.registerUser, name='register'),
    path('profile/',views.getUserProfile,name='user-profile'),
    path('profile/update/',views.updateUserProfile,name='user-profile-update'),
    path('createshippingaddress/' ,views.createShippingAddress,name='create-shipping-address'),
    path('verifyuser/' ,views.verifyuser,name='verify_user'),
    path('resendotp/' ,views.resendOTP,name='verify_user'),
    path('forgotpassword/', views.forgot_password, name='forgot-password'),
    path('reset-password/', views.reset_password, name='reset-password'),
    path('',views.getUsers,name='users'),
    

]