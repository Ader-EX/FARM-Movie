from sqlalchemy import Column, Boolean, ForeignKey, Integer, String, Table
from sqlalchemy.orm import relationship
from .database import Base

# Association table for many-to-many relationships between Movie and Actor
movie_actors = Table(
    "movie_actors",
    Base.metadata,
    Column("movie_id", Integer, ForeignKey("movies.id"), primary_key=True),
    Column("actor_id", Integer, ForeignKey("actors.id"), primary_key=True)
)

# Association table for many-to-many relationships between Movie and Category
movie_categories = Table(
    "movie_categories",
    Base.metadata,
    Column("movie_id", Integer, ForeignKey("movies.id"), primary_key=True),
    Column("category_id", Integer, ForeignKey("categories.id"), primary_key=True)
)

class Actor(Base):
    __tablename__ = 'actors'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, unique=True)
    
    # Relationship with Movie
    movies = relationship("Movie", secondary=movie_actors, back_populates="actors", order_by="Movie.name")

class Category(Base):
    __tablename__ = 'categories'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, unique=True)
    
    # Correct the relationship here to match the many-to-many nature
    movies = relationship("Movie", secondary=movie_categories, back_populates="categories", order_by="Movie.name")

class Movie(Base):
    __tablename__ = 'movies'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, unique=True)
    filename = Column(String(255), nullable=False, unique=True)
    series_id = Column(Integer, ForeignKey('serie.id'), nullable=True)
    series_number = Column(Integer, nullable=True)
    studio_id = Column(Integer, ForeignKey('studio.id'), nullable=True)
    processed = Column(Boolean, default=False, nullable=False)
    
    # Relationships with Actor and Category (many-to-many)
    actors = relationship("Actor", secondary=movie_actors, back_populates="movies", order_by="Actor.name")
    categories = relationship("Category", secondary=movie_categories, back_populates="movies", order_by="Category.name")
    
    # One-to-one relationship with Series and Studio
    series = relationship("Serie", back_populates="movies", uselist=False)
    studio = relationship("Studio", back_populates="movies", uselist=False)

class Serie(Base):
    __tablename__ = 'serie'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, unique=True)
    
    # One-to-many relationship with Movie
    movies = relationship("Movie", back_populates="series", order_by="Movie.name")

class Studio(Base):
    __tablename__ = 'studio'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, unique=True)
    
    # One-to-many relationship with Movie
    movies = relationship("Movie", back_populates="studio", order_by="Movie.name")
