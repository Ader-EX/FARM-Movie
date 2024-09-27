from typing import List, Optional
from fastapi import HTTPException,status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from moviesmanager import models, util
from moviesmanager import schemas
import logging

def add_movies(db: Session, filename: str, name: str,
               studio_id: Optional[int] = None,
               series_id: Optional[int] = None,
               series_number: Optional[int] = None,
               actor_ids: Optional[List[int]] = None,
               category_ids: Optional[List[int]] = None,
               processed: Optional[bool] = False) -> Optional[models.Movie]:
    
    # Create a new Movie instance
    movie = models.Movie(
        filename=filename,
        name=name,
        studio_id=studio_id,
        series_id=series_id,
        series_number=series_number,
        processed=processed
    )


    if actor_ids:
        movie.actors = db.query(models.Actor).filter(models.Actor.id.in_(actor_ids)).all()


    if category_ids:
        movie.categories = db.query(models.Category).filter(models.Category.id.in_(category_ids)).all()

    try:

        db.add(movie)
        db.commit()
        db.refresh(movie)  
        logging.debug(f"Movie added: {movie}")
    except IntegrityError as e:
        db.rollback()
        logging.error(f"Integrity error when adding movie: {e}")
        return None

    # Move the file using util.migrate_file
    util.migrate_file(movie)

    return movie

from sqlalchemy.orm import joinedload

def get_movie(db: Session, id: int) -> models.Movie:
    movie = db.query(models.Movie) \
        .options(joinedload(models.Movie.studio), joinedload(models.Movie.series)) \
        .filter(models.Movie.id == id) \
        .first()

    # Log the series and studio relationships to verify if they are loaded
    print(f"Loaded Series: {movie.series}")
    print(f"Loaded Studio: {movie.studio}")
    
    return movie
def get_category(db : Session, category_id : int)-> models.Category:
    return db.query(models.Category).filter(models.Category.id == category_id).first()

def get_all_studios(db : Session)-> List[models.Studio]:
    return db.query(models.Studio).order_by(models.Studio.id).all()

def get_all_series(db : Session)-> List[models.Serie]:
    return db.query(models.Serie).all()

def get_all_movies(db : Session) -> List[models.Movie]:
    return db.query(models.Movie).outerjoin(models.Studio).outerjoin(models.Serie).order_by(models.Movie.processed,models.Studio.name,models.Serie.name,models.Movie.name).all()

def get_all_actors(db:Session):
    return db.query(models.Actor).order_by(
        models.Actor.name, 
    ).all()
def add_actor(db : Session, data : str) -> models.Actor:
   
    new_actor = models.Actor(name = data)
    if new_actor is None :
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
    try:
        db.add(new_actor)
        db.commit()
        db.refresh(new_actor)  
    except IntegrityError as e:
        db.rollback()
        
        return None

    return new_actor


def update_movie(db: Session, id: int, data: schemas.MovieUpdateSchema) -> models.Movie:
    movie = get_movie(db, id)
   
    if movie is None:
        print(f"Movie with id {id} not found.")
        return None
    
    # Print the incoming data
    print("Received data:")
    print(f"Name: {data.name}")
    print(f"Studio ID: {data.studio_id}")
    print(f"Series ID: {data.series_id}")
    print(f"Series Number: {data.series_num}")

    # Print the current movie data for comparison
    print("Current movie data:")
    print(f"Name: {movie.name}")
    print(f"Studio ID: {movie.studio_id}")
    print(f"Series ID: {movie.series_id}")
    print(f"Series Number: {movie.series_number}")
    
    # Check if any data is different before updating
    if (data.name == movie.name and 
        data.studio_id == movie.studio_id and 
        data.series_id == movie.series_id and 
        data.series_num == movie.series_number):
        print("No changes detected, returning existing movie.")
        return movie
    
    # Update the movie data
    movie.name = data.name
    movie.studio_id = data.studio_id
    movie.series_number = data.series_num
    movie.series_id = data.series_id

    # Update processed flag
    if not movie.processed:
        movie.processed = True

    try:
        # Add and commit the changes to the database
        db.add(movie)
        db.commit()
        db.refresh(movie)
        print("Movie updated successfully.")
        print(movie)
    except IntegrityError as e:
        db.rollback()
        print(f"Error during database update: {e}")
        return None

    return movie

def add_movie_category(db : Session,movie_id : int, category_id : int ) -> models.Movie:
    movie = get_movie(db, movie_id)
    category = get_category(db, category_id)
    if movie is None or category is None:
        return None
    movie.categories.append(category)
    db.commit()
    db.refresh(movie)
    return movie
    

