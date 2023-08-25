from django.urls import path
# from base.views import product_views as views
from base.views import product_views as views


urlpatterns=[

    path('',views.getproducts,name='products'),
    path('<str:pk>/',views.getproduct,name='product'),
    path('api/products/search/', views.search_products),

]