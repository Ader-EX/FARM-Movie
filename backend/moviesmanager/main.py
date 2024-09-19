from typing import List
from fastapi import Depends, FastAPI, HTTPException,status
import os
from os.path import splitext
from moviesmanager import crud, schemas
from moviesmanager.util import list_files
from sqlalchemy.orm import Session 

from .models import Base
from .config import get_config
from .database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"http://(?:127\.0\.0\.1|localhost):5173",  # Fix typo and regex
    allow_credentials=True,  # If you need to support credentials (e.g., cookies)
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"]  # Allow all headers
)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


config = get_config()
print(config)
config["imports"] = "./db/imports"
@app.get("/")
async def main_enpoint():
    return {"message": "Hello World"}

import logging


@app.get("/get_movies", response_model=List[schemas.MovieFile])
async def get_movies(db : Session = Depends(get_db)):
     movies  = crud.get_all_movies(db)
     
     return movies  



# Configure logging
logging.basicConfig(level=logging.DEBUG)

@app.post("/import_movies", response_model=List[schemas.Movie])
async def import_movies(db: Session = Depends(get_db)):
    try:
        print(f"Current working directory: {os.getcwd()}")
        print(f"Imports directory: {config['imports']}")
        
        files = list_files(config["imports"])
        logging.debug(f"Files found: {files}")
    except Exception as e:
        logging.error(f"Error reading files: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={"error": str(e)})
    
    movies = []
    for file in files:
        try:
            name, _ = splitext(file)
            logging.debug(f"Processing file: {file}, movie name: {name}")
            movie = crud.add_movies(db, file, name)
            if movie is not None:
                movies.append(movie)
        except Exception as e:
            logging.error(f"Error adding movie: {file} - {str(e)}")
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={"error": str(e)})
    
    logging.debug(f"Movies processed: {movies}")
    return movies


@app.post("/add_actors", response_model=schemas.Actor, )
async def add_actor(data : schemas.MovieProperty,db : Session = Depends(get_db) ):
    actor = crud.add_actor(db, data.name)
    if actor is None: raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail={"error": "Data must not be null / data already in database."})
    return actor
