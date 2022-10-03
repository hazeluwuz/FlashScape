from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Card, db
from app.forms import CardForm
from .auth_routes import validation_errors_to_error_messages

card_routes = Blueprint("cards", __name__)

@card_routes.route("/")
def cards():
    cards = Card.query.all()
    return {card.id: card.to_dict() for card in cards}


@card_routes.route("/", methods=["POST"])
@login_required
def create_card():
    form = CardForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        card = Card(
            question=form.data["question"],
            answer=form.data["answer"],
            # mastery eventually
            deck_id=form.data["deck_id"],
        )
        db.session.add(card)
        db.session.commit()
        return card.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@card_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_card(id):
    card = Card.query.get(id)
    form = CardForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        card.question = ' '.join(form.data['question'].split())
        card.answer = ' '.join(form.data["answer"].split())
        card.deck_id = form.data["deck_id"]
        db.session.commit()
        return card.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@card_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_card(id):
    card = Card.query.get(id)
    db.session.delete(card)
    db.session.commit()
    return card.to_dict()
