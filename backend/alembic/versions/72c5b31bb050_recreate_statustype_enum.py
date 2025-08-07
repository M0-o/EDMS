"""recreate statustype enum

Revision ID: 72c5b31bb050
Revises: b18e84fa38c7
Create Date: 2025-08-06 13:42:17.094633

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '72c5b31bb050'
down_revision: Union[str, Sequence[str], None] = 'b18e84fa38c7'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("ALTER TYPE statustype RENAME TO statustype_old;")
    op.execute("""
      CREATE TYPE statustype AS ENUM (
        'en attente',
        'envoyé à la présidence',
        'arrivé à la présidence',
        'envoyé à l''établissement',
        'arrivé à l''établissement',
        'correction requise',
        'renvoyé après correction',
        'signé par le président',
        'prêt',
        'délivré'
      );
    """)

    # 3) switch the column over (casting existing text to the new enum)
    op.execute("""
      ALTER TABLE diploma_statuses
      ALTER COLUMN status
      TYPE statustype
      USING status::text::statustype;
    """)

    # 4) drop the old enum type
    op.execute("DROP TYPE statustype_old;")


def downgrade():
    # reverse: recreate the old enum  (without “en attente”)
    op.execute("""
      CREATE TYPE statustype_old AS ENUM (
        'envoyé à la présidence',
        'arrivé à la présidence',
        'envoyé à l''établissement',
        'arrivé à l''établissement',
        'correction requise',
        'renvoyé après correction',
        'signé par le président',
        'prêt',
        'délivré'
      );
    """)
    op.execute("""
      ALTER TABLE diploma_statuses
      ALTER COLUMN status
      TYPE statustype_old
      USING status::text::statustype_old;
    """)
    op.execute("DROP TYPE statustype;")
    op.execute("ALTER TYPE statustype_old RENAME TO statustype;")
