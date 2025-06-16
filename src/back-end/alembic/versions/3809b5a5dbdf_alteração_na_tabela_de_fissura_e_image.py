"""alteração na tabela de fissura e image

Revision ID: 3809b5a5dbdf
Revises: babed6af6deb
Create Date: 2025-06-03 17:40:47.463597

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '3809b5a5dbdf'
down_revision: Union[str, None] = 'babed6af6deb'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
