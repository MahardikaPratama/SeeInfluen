import motor.motor_asyncio
from app.config import MONGO_URI, DB_NAME, logger
import asyncio

# Fungsi untuk koneksi ke MongoDB menggunakan Motor (asynchronous)
async def connect_db():
    try:
        # Attempt to connect to MongoDB using Motor (async client)
        client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
        db = client[DB_NAME]

        # Check if the connection is successful by running a simple command
        # This will also ensure the connection is established
        await client.admin.command('ping')
        logger.info(f"Successfully connected to MongoDB database: {DB_NAME}")
        return db  # Return the database instance
    except Exception as e:
        logger.error(f"Error connecting to MongoDB: {e}")
        return None

# Untuk koneksi dan mendapatkan database, kita akan menggunakan async
async def get_db():
    db = await connect_db()
    if db is None:
        logger.critical("Failed to connect to the database. Exiting the application.")
        import sys
        sys.exit(1)  # Menghentikan aplikasi jika koneksi gagal
    return db

# Event untuk FastAPI, jika Anda ingin menggunakannya dalam aplikasi
async def init_db():
    db = await get_db()
    return db

# Jika diperlukan untuk menutup koneksi saat shutdown, Anda dapat menambahkannya
async def close_db(db):
    db.client.close()
    logger.info("MongoDB connection closed.")
