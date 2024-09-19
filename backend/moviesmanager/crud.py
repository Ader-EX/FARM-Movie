from typing import List, Optional
from fastapi import HTTPException,status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from moviesmanager import models, util
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


def get_all_movies(db : Session) -> List[models.Movie]:
    return db.query(models.Movie).outerjoin(models.Studio).outerjoin(models.Serie).order_by(models.Movie.processed,models.Studio.name,models.Serie.name,models.Movie.name).all()

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
