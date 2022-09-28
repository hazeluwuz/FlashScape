from .db import db

class Card(db.Model):
  __tablename__ = "cards"

  id = db.Column(db.Integer, primary_key=True)
  question = db.Column(db.String(500), nullable=False)
  answer = db.Column(db.String(500), nullable=False)
  # mastery will go here (eventually)
  deck_id = db.Column(db.Integer, db.ForeignKey("decks.id"), nullable=False)

  deck_parent = db.relationship("Deck", back_populates="cards")

  def to_dict(self):
    return {
      "id": self.id,
      "question": self.question,
      "answer": self.answer,
      "deck_id": self.deck_id,
    }
