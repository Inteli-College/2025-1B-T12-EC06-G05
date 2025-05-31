"""user e expedition

Revision ID: c76fcbb1d675
Revises: 831b38518ebc
Create Date: 2025-05-29 23:26:50.907738

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'c76fcbb1d675'
down_revision: Union[str, None] = '831b38518ebc'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
