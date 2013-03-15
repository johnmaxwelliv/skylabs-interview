from django.db import models

# NOTE: All currency amounts are represented as positive integers in cents.

class User(models.Model):
    name = models.CharField()

class Gift(models.Model):
    name = models.CharField()
    price = models.PositiveIntegerField()
    requestor = models.ForeignKey(User)

class Contribution(models.Model):
    amount = models.PositiveIntegerField()
    user = models.ForeignKey(User)
    gift = models.ForeignKey(Gift)
