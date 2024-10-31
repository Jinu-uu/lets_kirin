from fastapi import FastAPI
from pydantic import BaseModel
import openai
from langchain.prompts import FewShotPromptTemplate
from langchain.chains import LLMChain
from langchain_community.llms import OpenAI

from langchain.chains.question_answering import load_qa_chain
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.embeddings.openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_community.retrievers import VectorStoreRetriever
import sqlite3

from dotenv import load_dotenv

load_dotenv()

# FastAPI 앱 생성
app = FastAPI()

# SQLite DB 연결
conn = sqlite3.connect('courses.db')
cursor = conn.cursor()

# Chain-of-Thought 및 Few-shot Learning 설정
few_shot_examples = [
    {
        "question": "과일을 추천해줘.",
        "thought": "과일은 건강한 선택이야. 예를 들어, 사과와 바나나를 추천할 수 있어.",
        "answer": "사과와 바나나가 좋습니다."
    },
    {
        "question": "야채를 추천해줘.",
        "thought": "야채는 비타민과 미네랄이 풍부해. 시금치와 브로콜리를 추천할 수 있어.",
        "answer": "시금치와 브로콜리가 좋습니다."
    },
    {
        "question": "단백질이 풍부한 음식을 추천해줘.",
        "thought": "단백질은 근육 형성에 중요해. 닭고기와 두부를 추천할 수 있어.",
        "answer": "닭고기와 두부가 좋습니다."
    }
]

# Few-shot prompt template 설정
prompt_template = FewShotPromptTemplate(
    examples=few_shot_examples,
    prefix="여기 몇 가지 음식 추천 예시가 있습니다:",
    suffix="질문: {question}\n생각: {thought}\n답변:",
    example_prompt="Question: {question}\nThought: {thought}\nAnswer: {answer}",
    input_variables=["question", "thought"]
)

# PDF에서 음식 정보 추출
loader = PyPDFLoader("recommend_food.pdf")
documents = loader.load()

# PDF에서 정보를 검색하는 VectorStore 및 Retriever 설정
embeddings = OpenAIEmbeddings()
vector_store = Chroma.from_documents(documents, embeddings)
retriever = VectorStoreRetriever(vector_store=vector_store)

# Chain 구성
llm = OpenAI(model_name="gpt-4")  # 또는 "text-davinci-003" 등 사용 가능
qa_chain = load_qa_chain(llm, chain_type="stuff", retriever=retriever)

class QuestionRequest(BaseModel):
    question: str

# FastAPI 경로 설정
@app.post("/recommend_food")
async def recommend_food(request: QuestionRequest):
    question = request.question
    
    # Chain-of-Thought 추론
    thought = "음식을 추천할 때는 건강과 영양소를 고려해야 해."
    
    # LLM을 사용하여 Chain-of-Thought 방식으로 음식 추천
    chain = LLMChain(llm=llm, prompt=prompt_template)
    response = chain.run(question=question, thought=thought)
    
    # RAG를 사용해 음식 관련 정보를 PDF에서 검색
    rag_result = qa_chain.run(question)
    
    # SQLite3 데이터베이스에서 추천한 음식이 있는지 확인하고 칼로리 반환
    cursor.execute("SELECT calorie FROM food WHERE food_name=?", (response,))
    result = cursor.fetchone()
    
    if result:
        calorie_info = f"{response}은(는) {result[0]} 칼로리입니다."
    else:
        calorie_info = f"{response}에 대한 칼로리 정보를 찾을 수 없습니다."
    
    # 최종 응답 반환
    return {"recommended_food": response, "calorie_info": calorie_info, "additional_info": rag_result}

# FastAPI 서버 실행 명령
# 이 코드는 별도의 실행 스크립트에서 실행해야 합니다.
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)
