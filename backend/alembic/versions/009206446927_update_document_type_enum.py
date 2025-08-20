"""update_document_type_enum

Revision ID: 009206446927
Revises: b35e908d5a38
Create Date: 2025-08-20 18:02:02.510563

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '009206446927'
down_revision: Union[str, Sequence[str], None] = 'b35e908d5a38'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

old_enum_values = ['id_card', 'previous_diploma', 'new_diploma', 'transcript', 'other']
new_enum_values = ['new_diploma', 'carte_identite', 'baccalaureat', 'diplome_bac2', 'diplome_bac3', 'releve_notes']


def upgrade() -> None:
    # Create a mapping for existing data
    data_mapping = {
        'id_card': 'carte_identite',
        'previous_diploma': 'diplome_bac3',  # Default mapping, adjust as needed
        'new_diploma': 'new_diploma',
        'transcript': 'releve_notes',
        'other': 'new_diploma'  # Default mapping, adjust as needed
    }
    
    # Step 1: Add a temporary column
    op.add_column('documents', sa.Column('type_temp', sa.String(50), nullable=True))
    
    # Step 2: Migrate existing data using the mapping
    connection = op.get_bind()
    for old_value, new_value in data_mapping.items():
        connection.execute(
            sa.text("UPDATE documents SET type_temp = :new_value WHERE type = :old_value"),
            {"new_value": new_value, "old_value": old_value}
        )
    
    # Step 3: Drop the old column
    op.drop_column('documents', 'type')
    
    # Step 4: Create new enum type
    new_enum = postgresql.ENUM(*new_enum_values, name='documenttypeenum')
    new_enum.create(connection)
    
    # Step 5: Add the new column with the new enum
    op.add_column('documents', sa.Column('type', new_enum, nullable=True))
    
    # Step 6: Copy data from temp column to new column
    connection.execute(
        sa.text("UPDATE documents SET type = type_temp::documenttypeenum")
    )
    
    # Step 7: Make the new column NOT NULL
    op.alter_column('documents', 'type', nullable=False)
    
    # Step 8: Drop the temporary column
    op.drop_column('documents', 'type_temp')
    
    # Step 9: Drop the old enum type (if it exists and is not used elsewhere)
    try:
        connection.execute(sa.text("DROP TYPE IF EXISTS documenttypeenum_old CASCADE"))
    except:
        pass

def downgrade() -> None:
    # Reverse mapping for downgrade
    reverse_mapping = {
        'carte_identite': 'id_card',
        'diplome_bac3': 'previous_diploma',
        'diplome_bac2': 'previous_diploma',
        'new_diploma': 'new_diploma',
        'releve_notes': 'transcript',
        'baccalaureat': 'other'
    }
    
    connection = op.get_bind()
    
    # Step 1: Add temporary column
    op.add_column('documents', sa.Column('type_temp', sa.String(50), nullable=True))
    
    # Step 2: Migrate data back
    for new_value, old_value in reverse_mapping.items():
        connection.execute(
            sa.text("UPDATE documents SET type_temp = :old_value WHERE type = :new_value"),
            {"old_value": old_value, "new_value": new_value}
        )
    
    # Step 3: Drop current column
    op.drop_column('documents', 'type')
    
    # Step 4: Create old enum type
    old_enum = postgresql.ENUM(*old_enum_values, name='documenttypeenum')
    old_enum.create(connection)
    
    # Step 5: Add old column back
    op.add_column('documents', sa.Column('type', old_enum, nullable=True))
    
    # Step 6: Copy data back
    connection.execute(
        sa.text("UPDATE documents SET type = type_temp::documenttypeenum")
    )
    
    # Step 7: Make column NOT NULL
    op.alter_column('documents', 'type', nullable=False)
    
    # Step 8: Drop temp column
    op.drop_column('documents', 'type_temp')


