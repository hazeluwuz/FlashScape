from .db import db

class Deck(db.Model):
  __tablename__ = "decks"

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50), nullable=False)
  class_id = db.Column(db.Integer, db.ForeignKey("classes.id"), nullable=False)

  class_parent = db.relationship("Class", back_populates="decks")

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
      "class_id": self.class_id,
    }
