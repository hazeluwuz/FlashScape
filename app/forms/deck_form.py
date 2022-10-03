from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError

def validate_name(form, field):
    if len(field.data) < 5:
        raise ValidationError('Name must be at least 5 characters long.')
    elif len(field.data) > 50:
        raise ValidationError('Name must be less than 50 characters long.')

class DeckForm(FlaskForm):
  name = StringField('name', validators=[DataRequired(), validate_name])
  class_id = IntegerField('class_id', validators=[DataRequired()])
