from .db import db, add_prefix_for_prod, SCHEMA, environment

class Card(db.Model):
  __tablename__ = "cards"
  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  question = db.Column(db.String(500), nullable=False)
  answer = db.Column(db.String(500), nullable=False)
  mastery = db.Column(db.Integer, nullable=True, default=0)
  deck_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("decks.id")), nullable=False)

  deck_parent = db.relationship("Deck", back_populates="cards")

  def to_dict(self):
    return {
      "id": self.id,
      "question": self.question,
      "answer": self.answer,
      "mastery": self.mastery,
      "deck_id": self.deck_id,
    }
