from django.urls import path
# from base.views import product_views as views
from base.views import product_views as views


urlpatterns=[

    path('',views.getproducts,name='products'),
    path('searchitem/', views.listsearchview,name='search'),
    path('<str:pk>/',views.getproduct,name='product'),
    

]