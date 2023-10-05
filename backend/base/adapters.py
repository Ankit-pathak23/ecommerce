# adapters.py
from allauth.account.adapter import DefaultAccountAdapter

class CustomAccountAdapter(DefaultAccountAdapter):
    def clean_username(self, username):
        # Do nothing to bypass username validation
        return username
