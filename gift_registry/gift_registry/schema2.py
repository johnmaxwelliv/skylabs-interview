from django.db import models

# NOTE: All currency amounts are represented as positive integers in cents.

class User(models.Model):
    name = models.CharField()
    total_contributions = models.PositiveIntegerField(default=0)

class Gift(models.Model):
    name = models.CharField()
    price = models.PositiveIntegerField()
    total_contributed = models.PositiveIntegerField()
    requestor = models.ForeignKey(User)
    fulfilled = models.BooleanField(default=False)

class Contribution(models.Model):
    amount = models.PositiveIntegerField()
    user = models.ForeignKey(User)
    gift = models.ForeignKey(Gift)
