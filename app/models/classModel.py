from .db import db

class Class(db.Model):
  __tablename__ = 'classes'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)
  owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  # TODO:
  #  - Add relationship to Decks once implemented
  owner = db.relationship('User', back_populates='classes')
  decks = db.relationship('Deck', back_populates='class_parent')

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'owner_id': self.owner_id,
    }
