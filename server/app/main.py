from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models.database import db  # Import database instance
from app.config import logger  # Import logger
from app.routers import dashboard, ranking, trend, adsense, benchmarking

# Initialize FastAPI app
app = FastAPI(title="Social Media Monitoring API", version="1.0.0")

# Configure CORS
origins = [
    "http://localhost:5173", "https://see-influen.vercel.app/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # List of allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Include routers
app.include_router(trend.router, prefix="/trends", tags=["Trends"])
# app.include_router(sentiment.router, prefix="/sentiments", tags=["Sentiments"])
# app.include_router(recommendations.router, prefix="/recommendations", tags=["Recommendations"])
app.include_router(adsense.router, prefix="/adsense", tags=["Adsense"])
app.include_router(ranking.router, prefix="/rankings", tags=["Rankings"])
app.include_router(benchmarking.router, prefix="/benchmarking", tags=["Benchmarking"])
app.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])

# Health check endpoint
@app.get("/", tags=["Health Check"])
async def health_check():
    if db:  # Check if database connection exists
        logger.info("Health check passed")
        return {"status": "ok", "message": "API is running and connected to the database"}
    else:
        logger.critical("Database connection failed")
        return {"status": "error", "message": "Database connection failed"}

# Start the application with Uvicorn (if running directly)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
