from flask.cli import AppGroup
from .users import seed_users, undo_users
from .classes import seed_classes, undo_classes
from .decks import seed_decks, undo_decks
from .cards import seed_cards, undo_cards
from app.models.db import db, environment, SCHEMA
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding, truncate all tables prefixed with schema name
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.classes RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.decks RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.cards RESTART IDENTITY CASCADE;")
        db.session.commit()
    seed_users()
    seed_classes()
    seed_decks()
    seed_cards()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_cards()
    undo_decks()
    undo_classes()
    undo_users()
    # Add other undo functions here
