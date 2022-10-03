from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError

def validate_name(form, field):
    if len(field.data) < 5:
        raise ValidationError('Name must be at least 5 characters long')
    elif len(field.data) > 50:
        raise ValidationError('Name must be less than 50 characters long')

def validate_description(form, field):
    if field.data and len(field.data) > 255:
        raise ValidationError('Description must be less than 255 characters long')

def validate_purpose(form, field):
    if field.data and len(field.data) > 255:
        raise ValidationError('Purpose must be less than 255 characters long')

class ClassForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), validate_name])
    description = StringField('description', validators=[validate_description])
    purpose = StringField('purpose', validators=[validate_purpose])
