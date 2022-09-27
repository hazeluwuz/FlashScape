from .db import db

class Class(db.Model):
  __tablename__ = 'classes'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)
  owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

  owner = db.relationship('User', back_populates='classes')
  decks = db.relationship('Deck', back_populates='class_parent', cascade='all, delete-orphan')

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'owner_id': self.owner_id,
      'deck_ids': [deck.id for deck in self.decks]
    }
