"""empty message

Revision ID: b32bd17002de
Revises: 8df6636607bc
Create Date: 2022-09-07 18:18:44.322737

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b32bd17002de'
down_revision = '8df6636607bc'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('assunto_usuario_id_fkey', 'assunto', type_='foreignkey')
    op.create_foreign_key(None, 'assunto', 'usuario', ['usuario_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'assunto', type_='foreignkey')
    op.create_foreign_key('assunto_usuario_id_fkey', 'assunto', 'grupo', ['usuario_id'], ['id'])
    # ### end Alembic commands ###