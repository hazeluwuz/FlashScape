from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Class, db
from app.forms import ClassForm
from .auth_routes import validation_errors_to_error_messages

class_routes = Blueprint("classes", __name__)


# Get all Classes
@class_routes.route("/")
def classes():
    classes = Class.query.all()
    return {c.id: c.to_dict() for c in classes}


# Get a Class by id
@class_routes.route("/<int:id>")
@login_required
def class_by_id(id):
    c = Class.query.get(id)
    return c.to_dict()


# Get all Classes for a User
@class_routes.route("/current")
@login_required
def classes_by_user():
    classes = Class.query.filter(Class.owner_id == current_user.id).all()
    return {c.id: c.to_dict() for c in classes}


# Create a new Class
@class_routes.route("/", methods=["POST"])
@login_required
def create_class():
    form = ClassForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        c = Class(
            name=form.data["name"],
            owner_id=current_user.id,
        )
        db.session.add(c)
        db.session.commit()
        return c.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


# Update a Class
@class_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_class(id):
    form = ClassForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    data = request.get_json()
    if form.validate_on_submit():
        c = Class.query.get(id)
        c.name = form.data["name"]
        if 'description' in data:
            c.description = ' '.join(data['description'].split())
        if 'purpose' in data:
            c.purpose = ' '.join(data['purpose'].split())
        db.session.commit()
        return c.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


# Delete a Class
@class_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_class(id):
    c = Class.query.get(id)
    if c.owner_id == current_user.id:
        db.session.delete(c)
        db.session.commit()
        return {'message': 'Successfully Deleted'}
    else:
        return {'errors': 'Unauthorized'}, 401
