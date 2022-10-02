"""added purpose/description column to class s table

Revision ID: 72de621fb404
Revises: 929a24d6d81c
Create Date: 2022-10-02 18:18:20.668283

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '72de621fb404'
down_revision = '929a24d6d81c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('classes', sa.Column('description', sa.String(length=255), nullable=True))
    op.add_column('classes', sa.Column('purpose', sa.String(length=255), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('classes', 'purpose')
    op.drop_column('classes', 'description')
    # ### end Alembic commands ###
