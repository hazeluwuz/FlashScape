from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired,ValidationError

def validate_question(form,field):
    if len(field.data) < 5:
        raise ValidationError("Question must be at least 5 characters long")
    elif len(field.data) > 500:
        raise ValidationError("Question must be less than 500 characters long")

def validate_answer(form,field):
    if len(field.data) < 5:
        raise ValidationError("Answer must be at least 5 characters long")
    elif len(field.data) > 500:
        raise ValidationError("Answer must be less than 500 characters long")

class CardForm(FlaskForm):
  question = StringField('question', validators=[DataRequired(), validate_question])
  answer = StringField('answer', validators=[DataRequired()])
  # mastery will go here (eventually)
  deck_id = IntegerField('deck_id', validators=[DataRequired()])
