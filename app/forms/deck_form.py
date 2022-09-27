from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError

class DeckForm(FlaskForm):
  name = StringField('name', validators=[DataRequired()])
  class_id = IntegerField('class_id', validators=[DataRequired()])
