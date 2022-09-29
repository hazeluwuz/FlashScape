from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')
def valid_first_name(form,field):
    if len(field.data) < 5:
        raise ValidationError("First name must be at least 5 characters long")
    elif len(field.data) > 50:
        raise ValidationError("First name must be less than 50 characters long")

def valid_last_name(form,field):
    if len(field.data) < 5:
        raise ValidationError("Last name must be at least 5 characters long")
    elif len(field.data) > 50:
        raise ValidationError("Last name must be less than 50 characters long")

def valid_password(form,field):
    if len(field.data) < 6:
        raise ValidationError("Password must be at least 6 characters long")
    elif len(field.data) > 50:
        raise ValidationError("Password must be less than 50 characters long")

class SignUpForm(FlaskForm):
    first_name = StringField('firstName', validators=[DataRequired(), valid_first_name])
    last_name = StringField('lastName', validators=[DataRequired(), valid_last_name])
    email = StringField('email', validators=[DataRequired(), user_exists, Email("Invalid Email Address")])
    password = StringField('password', validators=[DataRequired(), valid_password])
