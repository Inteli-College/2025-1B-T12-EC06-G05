"""Ajuste nas foreign key models

Revision ID: 3e6cae52e4dc
Revises: b51db86cb01e
Create Date: 2025-05-27 20:40:24.345620

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '3e6cae52e4dc'
down_revision: Union[str, None] = 'b51db86cb01e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_foreign_key(
        'fk_fissure_image',   # nome da constraint
        'fissure',            # tabela que recebe a FK
        'image',              # tabela referenciada
        ['id_image'],         # coluna local
        ['id']                # coluna referenciada
    )
    pass


def downgrade() -> None:
    op.drop_constraint(
        'fk_fissure_image',
        'fissure',
        type_='foreignkey'
    )
    pass
