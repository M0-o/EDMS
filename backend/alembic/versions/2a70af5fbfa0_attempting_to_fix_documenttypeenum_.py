"""attempting to fix documenttypeenum conflict

Revision ID: 2a70af5fbfa0
Revises: 009206446927
Create Date: 2025-08-20 19:04:55.520576

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '2a70af5fbfa0'
down_revision: Union[str, Sequence[str], None] = '009206446927'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    connection = op.get_bind()
    
    # Step 1: Add temporary string column to hold the data
    op.add_column('documents', sa.Column('type_backup', sa.String(50), nullable=True))
    
    # Step 2: Copy all existing data to backup column as strings
    connection.execute(sa.text("UPDATE documents SET type_backup = type::text"))
    
    # Step 3: Drop the old type column completely (this removes the constraint)
    op.drop_column('documents', 'type')
    
    # Step 4: Drop the old enum type completely - FORCE IT
    try:
        connection.execute(sa.text("DROP TYPE IF EXISTS documenttypeenum CASCADE"))
    except Exception as e:
        print(f"Error dropping old enum (continuing anyway): {e}")
    
    # Step 5: Create the new enum type with exact values we want
    new_enum = postgresql.ENUM(
        'new_diploma', 
        'carte_identite', 
        'baccalaureat', 
        'diplome_bac2', 
        'diplome_bac3', 
        'releve_notes',
        name='documenttypeenum'
    )
    new_enum.create(connection)
    
    # Step 6: Add new type column with the new enum
    op.add_column('documents', sa.Column('type', new_enum, nullable=True))
    
    # Step 7: Migrate data with explicit mapping
    connection.execute(sa.text("UPDATE documents SET type = 'carte_identite' WHERE type_backup = 'id_card'"))
    connection.execute(sa.text("UPDATE documents SET type = 'diplome_bac3' WHERE type_backup = 'previous_diploma'"))
    connection.execute(sa.text("UPDATE documents SET type = 'new_diploma' WHERE type_backup = 'new_diploma'"))
    connection.execute(sa.text("UPDATE documents SET type = 'releve_notes' WHERE type_backup = 'transcript'"))
    connection.execute(sa.text("UPDATE documents SET type = 'new_diploma' WHERE type_backup = 'other'"))
    
    # Step 8: Handle any unmapped values (set them to new_diploma)
    connection.execute(sa.text("UPDATE documents SET type = 'new_diploma' WHERE type IS NULL"))
    
    # Step 9: Make the type column NOT NULL
    op.alter_column('documents', 'type', nullable=False)
    
    # Step 10: Drop the backup column
    op.drop_column('documents', 'type_backup')
    
    print("✅ Successfully updated DocumentTypeEnum to new values!")

def downgrade() -> None:
    connection = op.get_bind()
    
    # Create backup column
    op.add_column('documents', sa.Column('type_backup', sa.String(50), nullable=True))
    
    # Copy data to backup
    connection.execute(sa.text("UPDATE documents SET type_backup = type::text"))
    
    # Drop new type column
    op.drop_column('documents', 'type')
    
    # Drop new enum
    try:
        connection.execute(sa.text("DROP TYPE IF EXISTS documenttypeenum CASCADE"))
    except Exception as e:
        print(f"Error dropping new enum: {e}")
    
    # Create old enum
    old_enum = postgresql.ENUM(
        'id_card', 
        'previous_diploma', 
        'new_diploma', 
        'transcript', 
        'other',
        name='documenttypeenum'
    )
    old_enum.create(connection)
    
    # Add old type column
    op.add_column('documents', sa.Column('type', old_enum, nullable=True))
    
    # Migrate data back
    connection.execute(sa.text("UPDATE documents SET type = 'id_card' WHERE type_backup = 'carte_identite'"))
    connection.execute(sa.text("UPDATE documents SET type = 'previous_diploma' WHERE type_backup = 'diplome_bac3'"))
    connection.execute(sa.text("UPDATE documents SET type = 'previous_diploma' WHERE type_backup = 'diplome_bac2'"))
    connection.execute(sa.text("UPDATE documents SET type = 'new_diploma' WHERE type_backup = 'new_diploma'"))
    connection.execute(sa.text("UPDATE documents SET type = 'transcript' WHERE type_backup = 'releve_notes'"))
    connection.execute(sa.text("UPDATE documents SET type = 'other' WHERE type_backup = 'baccalaureat'"))
    
    # Handle unmapped values
    connection.execute(sa.text("UPDATE documents SET type = 'other' WHERE type IS NULL"))
    
    # Make NOT NULL
    op.alter_column('documents', 'type', nullable=False)
    
    # Drop backup
    op.drop_column('documents', 'type_backup')