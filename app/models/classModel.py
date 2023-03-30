from .db import db

class Class(db.Model):
  __tablename__ = 'classes'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)
  description = db.Column(db.String(255), nullable=True)
  purpose = db.Column(db.String(255), nullable=True, default='General Learning/Other')
  owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

  owner = db.relationship('User', back_populates='classes')
  decks = db.relationship('Deck', back_populates='class_parent', cascade='all, delete-orphan')

  def get_mastery_avg(self):
    # If there are no decks, return 0
    if len(self.decks) == 0:
      return 0

    # Get the average mastery score for each deck
    deck_avgs = [deck.get_mastery_avg() for deck in self.decks if len(deck.cards) > 0]

    # Return the average mastery score of all decks
    return sum(deck_avgs) / len(deck_avgs) if len(deck_avgs) > 0 else 0

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'description': self.description,
      'purpose': self.purpose,
      'owner_id': self.owner_id,
      'deck_ids': [deck.id for deck in self.decks],
      "mastery": self.get_mastery_avg(),
    }
