from pydantic import BaseModel, Field
from database import Base

from sqlalchemy import Column , Boolean, ForeignKey,Integer,String,Table
from sqlalchemy.orm import relationship

movie_actors = Table(
    "movie_actors",
    Base.metadata,
    Column("movie_id", Integer, ForeignKey("movies.id"),  primary_key=True),
    Column("actor_id", Integer, ForeignKey("actors.id"), primary_key=True)

)

movie_categories = Table(
    "movie_categories",
    Base.metadata,
    Column("movie_id", Integer, ForeignKey("movies.id"),  primary_key=True),
    Column("category_id", Integer, ForeignKey("categories.id"), primary_key=True)

)

class Actor(Base):
    __tablename__ = 'actors'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255),nullable=False,unique=True)
    movies = relationship("Movie", secondary=movie_actors, back_populates="actors" , order_by="Movie.name")


class Category(Base):
    __tablename__ = 'categories'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255),nullable=False, unique=True)
    movie = relationship("Movie", secondary=movie_categories, back_populates="categories", order_by="Movie.name")

class Movie(Base):
    __tablename__ = 'movies'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255),nullable=False, unique=True)
    filename = Column(String(255),nullable=False, unique=True)
    series_id = Column(Integer,ForeignKey('serie.id'),nullable=True)
    series_number = Column(Integer,nullable=True)
    studio_id = Column(Integer, ForeignKey('studio.id'),nullable=True)
    processed = Column(Boolean,default=False,nullable=False)
    actors = relationship("Actor", secondary=movie_actors, back_populates="movies", order_by="Actor.name")
    categories = relationship("Category", secondary=movie_categories, back_populates="movies", order_by="Category.name")
    
    # one to one relationship
    series = relationship("Serie",back_populates="movies", uselist=False)

    studio = relationship("Studio",back_populates="movies", uselist=False)






    

class Serie(Base):
    __tablename__ = 'serie'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255),nullable=False, unique=True)

    # one to many relationship
    movies = relationship("Movie", back_populates="serie", order_by="Movie.name")
    


class Studio(Base):
    __tablename__ = 'studio'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255),nullable=False, unique=True)
    movies = relationship("Movie", back_populates="studio", order_by="Movie.name")
    




