"""empty message

Revision ID: 6cc7251848cd
Revises: 855be51033e8
Create Date: 2022-09-17 16:12:05.975775

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6cc7251848cd'
down_revision = '855be51033e8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('fala', sa.Column('fala_mae_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'fala', 'fala', ['fala_mae_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'fala', type_='foreignkey')
    op.drop_column('fala', 'fala_mae_id')
    # ### end Alembic commands ###
