from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class CardForm(FlaskForm):
  question = StringField('question', validators=[DataRequired()])
  answer = StringField('answer', validators=[DataRequired()])
  # mastery will go here (eventually)
  deck_id = IntegerField('deck_id', validators=[DataRequired()])
