from typing import List
from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline

app = FastAPI()

classifier = pipeline("sentiment-analysis")


class Article(BaseModel):
    source_id: int
    title: str
    news_link: str
    published_at: str | None = None


@app.post("/sentiment")
def analyze_sentiment(articles: List[Article]):

    if not articles:
        return []

    titles = [article.title for article in articles]

    results = classifier(titles)

    response = []

    for article, result in zip(articles, results):

        response.append({
            "source_id": article.source_id,
            "title": article.title,
            "news_link": article.news_link,
            "published_at": article.published_at,
            "sentiment": result["label"]
        })

    return response