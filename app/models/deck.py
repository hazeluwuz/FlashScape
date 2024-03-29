from .db import db, add_prefix_for_prod, SCHEMA, environment

class Deck(db.Model):
  __tablename__ = "decks"
  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50), nullable=False)
  class_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("classes.id")), nullable=False)

  class_parent = db.relationship("Class", back_populates="decks")
  cards = db.relationship("Card", back_populates="deck_parent", cascade="all, delete-orphan")

  def get_mastery_avg(self):
    if len(self.cards) == 0:
      return 0
    return sum([card.mastery for card in self.cards]) / (len(self.cards) * 5) * 100

  def to_dict(self):

    return {
      "id": self.id,
      "name": self.name,
      "class_id": self.class_id,
      "card_ids": [card.id for card in self.cards],
      "mastery": self.get_mastery_avg(),
    }
