from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from sqlalchemy.exc import OperationalError
import time

DATABASE_URL = os.getenv("DATABASE_URL")
print(DATABASE_URL)
max_tries = 15
wait_seconds = 10

for i in range(max_tries):
    try:
        engine = create_engine(DATABASE_URL)
        # Try to connect
        with engine.connect() as connection:
            print("Database connection successful!")
            break
    except OperationalError as e:
        print(f"Database connection failed (attempt {i+1}/{max_tries}): {e}")
        time.sleep(wait_seconds)
else:
    print("Could not connect to the database after several attempts. Exiting.")
    exit(1)

# Continue with the rest of your db.py setup
from sqlalchemy.orm import sessionmaker, declarative_base

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()