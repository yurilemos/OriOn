"""empty message

Revision ID: ea4ea72bfc9e
Revises: 1f67e79b7187
Create Date: 2022-10-27 19:51:20.156815

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ea4ea72bfc9e'
down_revision = '1f67e79b7187'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('classe_relacao', sa.Column('estilo', sa.String(length=20), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('classe_relacao', 'estilo')
    # ### end Alembic commands ###
