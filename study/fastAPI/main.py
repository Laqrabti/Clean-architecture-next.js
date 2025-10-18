from fastapi import FastAPI

app = FastAPI(title="My Test API")

@app.get("/")
def read_root():
    return {"message": "hassan"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "query": q}
