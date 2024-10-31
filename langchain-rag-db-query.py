from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.utilities import SQLDatabase
from langchain.chains import SQLDatabaseChain

import os

# OpenAI API 키 설정
os.environ["OPENAI_API_KEY"] = "your-api-key-here"

# 1. PDF 로딩 및 텍스트 분할
loader = PyPDFLoader("path/to/your/document.pdf")
documents = loader.load()
text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
texts = text_splitter.split_documents(documents)

# 2. 벡터 저장소 생성
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(texts, embeddings)

# 3. RAG 체인 설정
retriever = vectorstore.as_retriever()
rag_chain = RetrievalQA.from_chain_type(
    llm=OpenAI(),
    chain_type="stuff",
    retriever=retriever,
    return_source_documents=True
)

# 4. 데이터베이스 연결 설정
db = SQLDatabase.from_uri("your-database-uri")
db_chain = SQLDatabaseChain.from_llm(OpenAI(), db)

# 5. 최종 응답 생성을 위한 프롬프트 템플릿
final_prompt = PromptTemplate(
    input_variables=["rag_answer", "db_answer", "question"],
    template="Question: {question}\n\nInformation from documents: {rag_answer}\n\nInformation from database: {db_answer}\n\nPlease provide a comprehensive answer based on both sources of information."
)

final_chain = LLMChain(llm=OpenAI(), prompt=final_prompt)

# 6. 메인 함수
def answer_question(question):
    # RAG를 사용한 답변
    rag_result = rag_chain({"query": question})
    rag_answer = rag_result['result']
    
    # 데이터베이스 쿼리 결과
    db_result = db_chain.run(question)
    
    # 최종 응답 생성
    final_answer = final_chain.run(rag_answer=rag_answer, db_answer=db_result, question=question)
    
    return final_answer

# 사용 예시
user_question = input("웹사이트 정보에 대해 무엇이 궁금하신가요? ")
answer = answer_question(user_question)
print(answer)
