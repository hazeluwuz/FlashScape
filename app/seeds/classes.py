from app.models import db, Class


# Adds a demo user, you can add other users here if you want
def seed_classes():
    class1 = Class(
        name='Class 1', owner_id=1)
    class2 = Class(
        name='Class 2', owner_id=1)
    class3 = Class(
        name='Class 3', owner_id=1)

    db.session.add(class1)
    db.session.add(class2)
    db.session.add(class3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_classes():
    db.session.execute('TRUNCATE classes RESTART IDENTITY CASCADE;')
    db.session.commit()
