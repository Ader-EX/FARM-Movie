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
    allow_origins=["http://localhost:5173"],  # Allow specific origin
    allow_credentials=True,  # If you need to support credentials (e.g., cookies)
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
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

@app.get("/get_actors", response_model=List[schemas.ActorProperty])
async def get_actors(db : Session = Depends(get_db)):
    actors = crud.get_all_actors(db)
    return actors




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


@app.post("/add_actors", response_model=schemas.Actor )
async def add_actor(data : schemas.MovieProperty,db : Session = Depends(get_db) ):
    actor = crud.add_actor(db, data.name)
    if actor is None: raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail={"error": "Data must not be null / data already in database."})
    return actor

@app.get("/movies/{id}",response_model=schemas.Movie )
async def get_movie(id: int,db : Session = Depends(get_db)):
    movies = crud.get_movie(db,id)
    if movies is None: raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail={"error": "Movie not found ,{id} doesnt exist."})
    return movies
    

@app.put("/movie/{id}", response_model= schemas.Movie)
async def update_movie_data(id: int,data : schemas.MovieUpdateSchema,db : Session = Depends(get_db)):
    movie = crud.update_movie(db,id,data)
    if movie is None: raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail={"error": "Movie not found ,{id} doesnt exist."})
    return movie

@app.post("/movie/add_category/", response_model=schemas.Movie)
async def add_movie_category(movie_id: int,category_id : int, db : Session = Depends(get_db)):
    movie = crud.add_movie_category(db,movie_id,category_id)
    if movie is None: raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail={"error": "Category not found ,{movie_id} doesnt exist."})
    return movie


@app.get("/categories", response_model=schemas.Category)
async def get_all_categories(db : Session = Depends(get_db)):
    categories = crud.get_category(db)
    return categories

@app.get("/actors", response_model=schemas.Actor)
async def get_all_actors(db : Session = Depends(get_db)):
    actors = crud.get_all_actors(db)
    return actors

@app.get("/studios", response_model=List[schemas.Studio])
async def get_all_studios(db : Session = Depends(get_db)):
    studios = crud.get_all_studios(db)
    return studios

@app.get("/series", response_model=List[schemas.Series])
async def get_all_series(db : Session = Depends(get_db)):
    series = crud.get_all_series(db)
    return series