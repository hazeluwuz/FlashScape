from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Deck, db
from app.forms import DeckForm
from .auth_routes import validation_errors_to_error_messages

deck_routes = Blueprint("decks", __name__)


# Get all decks
@deck_routes.route("/")
def decks():
    decks = Deck.query.all()
    return {deck.id: deck.to_dict() for deck in decks}


# Get a single deck
@deck_routes.route("/<int:id>")
def deck(id):
    deck = Deck.query.get(id)
    return deck.to_dict()

#Get current user's decks
@deck_routes.route("/user")
@login_required
def user_decks():
    decks = Deck.query.filter(Deck.owner_id == current_user.id).all()
    return {deck.id: deck.to_dict() for deck in decks}

# Create a new deck
@deck_routes.route("/", methods=["POST"])
@login_required
def create_deck():
    form = DeckForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        deck = Deck(
            name=form.data['name'],
            class_id=form.data['class_id'],
        )
        db.session.add(deck)
        db.session.commit()
        return deck.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# Edit a deck
@deck_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_deck(id):
    form = DeckForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        deck = Deck.query.get(id)
        if deck.class_parent.owner_id == current_user.id:
          deck.name = form.data['name']
          db.session.commit()
          return deck.to_dict()
        return {'errors': 'Unauthorized'}, 401
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# Delete a deck
@deck_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_deck(id):
    deck = Deck.query.get(id)
    if deck.class_parent.owner_id == current_user.id:
      db.session.delete(deck)
      db.session.commit()
      return {'message': 'Successfully Deleted'}
    return {'errors': 'Unauthorized'}, 401
