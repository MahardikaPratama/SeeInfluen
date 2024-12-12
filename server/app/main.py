from fastapi import FastAPI, HTTPException
import logging
# from app.routers import trend, sentiment, recommendation, revenue, ranking, benchmark, dashboard
from app.config import db  

# Initialize the FastAPI app
app = FastAPI()

# Set up logging configuration
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Check if the database connection is established
if db is None:
    logger.critical("Database connection failed. Exiting the application.")
    raise HTTPException(status_code=500, detail="Database connection failed")

# Include the routers for different features
# app.include_router(trend.router, prefix="/trend", tags=["trend"])
# app.include_router(sentiment.router, prefix="/sentiment", tags=["sentiment"])
# app.include_router(recommendation.router, prefix="/recommendation", tags=["recommendation"])
# app.include_router(revenue.router, prefix="/revenue", tags=["revenue"])
# app.include_router(ranking.router, prefix="/ranking", tags=["ranking"])
# app.include_router(benchmark.router, prefix="/benchmark", tags=["benchmark"])
# app.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])

# Add a basic root endpoint to check if the app is running
@app.get("/")
async def root():
    logger.info("Root endpoint hit.")
    return {"message": "Welcome to the Social Media Monitoring API!"}

# Add more routes, middlewares, or event handlers as needed
