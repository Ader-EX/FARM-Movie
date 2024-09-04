from fastapi import FastAPI

from models import Base

from database import engine

app = FastAPI()


Base.metadata.create_all(bind=engine)

@app.get("/")
async def main_enpoint():
    return {"message": "Hello World"}




