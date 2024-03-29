"""empty message

Revision ID: 5d8fcbda1172
Revises: f7aa2aa2669b
Create Date: 2022-10-19 15:25:40.550264

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5d8fcbda1172'
down_revision = 'f7aa2aa2669b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('fala', sa.Column('classe_relacao_id', sa.Integer(), nullable=True))
    op.drop_constraint('fala_relacao_id_fkey', 'fala', type_='foreignkey')
    op.create_foreign_key(None, 'fala', 'classe_relacao', ['classe_relacao_id'], ['id'], onupdate='CASCADE', ondelete='SET NULL')
    op.drop_column('fala', 'relacao_id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('fala', sa.Column('relacao_id', sa.INTEGER(), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'fala', type_='foreignkey')
    op.create_foreign_key('fala_relacao_id_fkey', 'fala', 'relacao', ['relacao_id'], ['id'], onupdate='CASCADE', ondelete='CASCADE')
    op.drop_column('fala', 'classe_relacao_id')
    # ### end Alembic commands ###
