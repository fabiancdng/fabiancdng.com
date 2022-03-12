from fastapi import FastAPI

VERSION_NUMBER = "0.1.0"

app = FastAPI()

@app.get("/")
async def root():
    return {
        "message": "Hello World!",
        "version": VERSION_NUMBER
    }