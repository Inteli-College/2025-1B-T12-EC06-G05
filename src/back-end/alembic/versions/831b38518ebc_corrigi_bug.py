"""corrigi bug

Revision ID: 831b38518ebc
Revises: 73b4d169badd
Create Date: 2025-05-28 17:41:41.250189

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '831b38518ebc'
down_revision: Union[str, None] = '73b4d169badd'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
