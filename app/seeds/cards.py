from app.models import db, Card


# Adds a demo user, you can add other users here if you want
def seed_cards():
    card1 = Card(
        question="Which planet spins on a nearly horizontal axis, as opposed to all the others which spin on a vertical axis?",
        answer="Uranus",
        deck_id=1,
    )
    card2 = Card(
        question="What is the name of the process of splitting atomic nuclei?",
        answer="Fission",
        deck_id=1,
    )
    card3 = Card(
        question="What mineral is known as the softest mineral?",
        answer="Talc",
        deck_id=1,
    )

    card4 = Card(
        question="How many calories must you burn to lose one pound?",
        answer="3500",
        deck_id=2,
    )

    card5 = Card(
        question="A free radical is an atom or molecule that has an odd number of what?",
        answer="Electrons",
        deck_id=2,
    )

    card6 = Card(
        question="What does splitting a laser light into two beams through a silver mirror make?",
        answer="Hologram",
        deck_id=2,
    )

    card7 = Card(
        question="What is another term for a badminton bird?",
        answer="Shuttlecock",
        deck_id=3,
    )

    card8 = Card(
        question='What firm made the B25 Micro Computer?',
        answer="Radio Shack",
        deck_id=3,
    )

    card9 = Card(
      question='To whom was the first .com internet domain registered?',
      answer='Symbolics.com',
      deck_id=3,
    )

    db.session.add(card1)
    db.session.add(card2)
    db.session.add(card3)
    db.session.add(card4)
    db.session.add(card5)
    db.session.add(card6)
    db.session.add(card7)
    db.session.add(card8)
    db.session.add(card9)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_cards():
    db.session.execute("TRUNCATE decks RESTART IDENTITY CASCADE;")
    db.session.commit()
