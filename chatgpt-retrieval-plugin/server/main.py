import os
from typing import Optional
import uvicorn
from fastapi import FastAPI, File, Form, HTTPException, Depends, Body, UploadFile
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from loguru import logger

from models.api import (
    DeleteRequest,
    DeleteResponse,
    QueryRequest,
    QueryResponse,
    UpsertRequest,
    UpsertResponse,
)
from datastore.factory import get_datastore
from services.file import get_document_from_file

from models.models import DocumentMetadata, Source


app = FastAPI()

PORT = 3001

origins = [
    "*"
]

bearer_scheme = HTTPBearer()
BEARER_TOKEN = os.environ.get("BEARER_TOKEN")
assert BEARER_TOKEN is not None

def validate_token(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    if credentials.scheme != "Bearer" or credentials.credentials != BEARER_TOKEN:
        raise HTTPException(status_code=401, detail="Invalid or missing token")
    return credentials

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/.well-known", StaticFiles(directory=".well-known"), name="static")

# Create a sub-application, in order to access just the query endpoint in an OpenAPI schema, found at http://0.0.0.0:8000/sub/openapi.json when the app is running locally
sub_app = FastAPI(
    title="Retrieval Plugin API",
    description="A retrieval API for querying and filtering documents based on natural language queries and metadata",
    version="1.0.0",
    servers=[{"url": "http://15.164.146.106"}],
)
app.mount("/sub", sub_app)

import urllib.parse
import os

@app.get("/cardBenefits/summary/{cardName}/{benefitId}")
async def read_file(cardName: str, benefitId: str):

    # 폴더의 절대 경로를 구성
    folder_path = os.path.abspath("/app/cards/" + urllib.parse.quote(cardName))
    print(folder_path)

    # 폴더가 존재하는지 확인
    if not os.path.exists(folder_path) or not os.path.isdir(folder_path):
        raise HTTPException(status_code=404, detail="card not found")

    # 폴더 내의 summary.txt 파일을 읽음
    file_path = os.path.join(folder_path, benefitId + "_summary.txt")
    if os.path.isfile(file_path):
        with open(file_path, 'r', encoding='utf-8') as file:
            return file.read()

    else:
        # raise HTTPException(status_code=404, detail="summary not found")
        return ""


@app.get("/cardBenefits/{cardName}/{benefitId}")
async def read_file(cardName: str, benefitId: str):

    # 폴더의 절대 경로를 구성
    folder_path = os.path.abspath("/app/cards/" + urllib.parse.quote(cardName))

    # 폴더가 존재하는지 확인
    if not os.path.exists(folder_path) or not os.path.isdir(folder_path):
        raise HTTPException(status_code=404, detail="card not found")

    # 폴더 내의 idx.txt 파일을 읽음
    file_path = os.path.join(folder_path, benefitId + ".txt")
    if os.path.isfile(file_path):
        with open(file_path, 'r', encoding='utf-8') as file:
            file_contents = file.read()

        return file_contents

    else:
        raise HTTPException(status_code=404, detail="benefit not found")


from pydantic import BaseModel

class CardBenefits(BaseModel):
    cardName: str
    benefitId: str
    content: str

@app.post("/cardBenefits/summary", status_code=201)
async def write_file(benefit: CardBenefits):

    # 폴더의 절대 경로를 구성
    folder_path = os.path.abspath("/app/cards/" + urllib.parse.quote(benefit.cardName))

    # 폴더가 존재하는지 확인
    if not os.path.exists(folder_path) or not os.path.isdir(folder_path):
        os.makedirs(folder_path)

    # summary.txt 파일 작성
    file_path = os.path.join(folder_path, benefit.benefitId + "_summary.txt")

    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(benefit.content)

    return {"status": "success"}

@app.post(
    "/upsert-file",
    response_model=UpsertResponse,
)
async def upsert_file(
        file: UploadFile = File(...),
        metadata: Optional[str] = Form(None),
):
    try:
        metadata_obj = (
            DocumentMetadata.parse_raw(metadata)
            if metadata
            else DocumentMetadata(source=Source.file)
        )
    except:
        metadata_obj = DocumentMetadata(source=Source.file)

    document = await get_document_from_file(file, metadata_obj)

    try:
        ids = await datastore.upsert([document])
        return UpsertResponse(ids=ids)
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail=f"str({e})")


@app.post(
    "/upsert",
    response_model=UpsertResponse,
)
async def upsert(
        request: UpsertRequest = Body(...),
):
    try:
        ids = await datastore.upsert(request.documents)
        return UpsertResponse(ids=ids)
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail="Internal Service Error")


@app.post("/query", response_model=QueryResponse)
async def query_main(request: QueryRequest = Body(...)):
    try:
        results = await datastore.query(
            request.queries,
        )
        return QueryResponse(results=results)
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail="Internal Service Error")


@app.delete(
    "/delete",
    response_model=DeleteResponse,
)
async def delete(
        request: DeleteRequest = Body(...),
):
    if not (request.ids or request.filter or request.delete_all):
        raise HTTPException(
            status_code=400,
            detail="One of ids, filter, or delete_all is required",
        )
    try:
        success = await datastore.delete(
            ids=request.ids,
            filter=request.filter,
            delete_all=request.delete_all,
        )
        return DeleteResponse(success=success)
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail="Internal Service Error")

@app.on_event("startup")
async def startup():
    global datastore
    datastore = await get_datastore()


def start():
    uvicorn.run("server.main:app", host="15.164.146.106", port=3001, reload=True)
