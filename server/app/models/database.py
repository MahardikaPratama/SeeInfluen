import pymongo
from pymongo.errors import ConnectionFailure
from app.config import MONGO_URI, DB_NAME, logger

def connect_db():
    try:
        # Attempt to connect to MongoDB
        client = pymongo.MongoClient(MONGO_URI)
        db = client[DB_NAME]

        # Check if the connection is successful by running a simple command
        client.admin.command('ping')
        logger.info(f"Successfully connected to MongoDB database: {DB_NAME}")
        return db  # Return the database instance
    except ConnectionFailure as e:
        logger.error(f"Error connecting to MongoDB: {e}")
        return None
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return None

# Establish the connection and assign the database to a variable
db = connect_db()

# If the connection fails, you might want to raise an exception or handle the failure gracefully.
if db is None:
    logger.critical("Failed to connect to the database. Exiting the application.")
    import sys
    sys.exit(1)
