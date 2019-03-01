from django.conf.urls import url
from django.urls import path, include,re_path,reverse
# from lincoln_app.views import HomeView
from . import views

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('', views.index),
    # path('', views.post),
    # path('', HomeView.as_view()),
    # url(r'^$', views.as_view(), name='home'),

]
