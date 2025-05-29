"""retira audit

Revision ID: 73b4d169badd
Revises: d0e630350e8a
Create Date: 2025-05-28 17:36:52.460422

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '73b4d169badd'
down_revision: Union[str, None] = 'd0e630350e8a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
