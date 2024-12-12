import os
import logging
from dotenv import load_dotenv
import pymongo
from pymongo.errors import ConnectionFailure  # Correct exception for connection failures

# Load environment variables from .env file
load_dotenv()

# MongoDB connection parameters
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
DB_NAME = os.getenv("DB_NAME", "seeInfluen_db")

# Set up logging configuration
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Function to establish MongoDB connection
def connect_db():
    try:
        # Attempt to connect to MongoDB
        client = pymongo.MongoClient(MONGO_URI)
        # Access the database
        db = client[DB_NAME]
        
        # Check if the connection is successful by running a simple command
        client.admin.command('ping')
        
        logger.info(f"Successfully connected to MongoDB database: {DB_NAME}")
        return db  # Return the database instance
    except ConnectionFailure as e:  # Catch ConnectionFailure for pymongo connection errors
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
    # Optionally, raise an exception or exit the application
    # sys.exit(1)  # Uncomment this line to exit the application on failure
