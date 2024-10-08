from typing import List, Optional
from pydantic import BaseModel

class MovieData(BaseModel):
    id : int
    name : str

    class Config:
        orm_mode = True

class Actor(MovieData):
    pass

class Category(MovieData):
    pass

class Series(MovieData):
    pass

class Studio(MovieData):
   pass

class MovieBase(BaseModel):
    id : int
    filename : str
    class Config:
        orm_mode = True

class MovieFile(MovieBase):
    pass

class Movie(MovieBase):
    name : Optional[str] = None
    actors : Optional[List[Actor]] = None
    categories : Optional[List[Category]] = None
    series : Optional[Series] = None
    series_number : Optional[int] = None
    studio : Optional[Studio] = None
    
    class Config:
        orm_mode = True


class MovieProperty(BaseModel):
    name : str

class ActorProperty(BaseModel):
    id : int
    name : str
    class Config:
        orm_mode = True

class MovieUpdateSchema(BaseModel):
    name : Optional[str] = None
    series_id : Optional[int] = None
    series_num : Optional[int] = None
    studio_id : Optional[int] = None
    class Config:
        orm_mode = True


