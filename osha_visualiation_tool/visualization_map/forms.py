from django.forms import ModelForm
from django import forms
from lincoln_app.models import Testing,Photos

# Create the form class.
class NameForm(ModelForm):
    class Meta:
        model = Testing
        fields = ['person_name']

# class NameForm(ModelForm):
#     class Meta:
#         model = Photos
#         fields = ['caption','image','latitude','longitude']

# class NameForm(forms.Form):
#     post = forms.CharField()
    # post = forms.CharField(widget=forms.TextInput(
    #     attrs={
    #         'class': 'form-control',
    #         'placeholder': 'Write a post...'
    #     }
    # ))
    
    # class Meta:
    #     model = Testing
    #     fields = ('person_name',)

# Create the form class.
# class ArticleForm(ModelForm):
#     class Meta:
#         model = models.Article
# class NameForm(forms.Form):
#     fname = forms.CharField()

#     class Meta:
#       model = Testing
#       fields = ('person_name',)
# class NameForm(forms.Form):
#     post = forms.CharField(widget=forms.TextInput(
#         attrs={
#             'class': 'form-control',
#             'placeholder': 'Write a post...'
#         }
#     ))
#     class Meta:
#         model = Testing
#         fields = ('person_name',)


class photoForms(forms.Form):
    ids = forms.CharField()
    caption = forms.CharField( max_length=128)
    image = forms.CharField(max_length=128)
    latitude = forms.FloatField()
    longitude = forms.FloatField()

    class Meta:
        managed = False
        db_table = 'photos'