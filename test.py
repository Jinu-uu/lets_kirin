from langchain import OpenAI
from langchain.sql_database import SQLDatabase
from langchain_experimental.sql import SQLDatabaseChain

import sqlite3

from dotenv import load_dotenv

load_dotenv()

# 데이터베이스 연결
db = sqlite3.connect('./courses.db')

# LangChain에 사용할 SQL 데이터베이스 설정
sql_db = SQLDatabase(db)

# OpenAI를 사용해 Language 모델 인스턴스 생성 (API 키 필요)
llm = OpenAI(temperature=0)

# SQLDatabaseChain 생성
db_chain = SQLDatabaseChain(llm=llm, database=sql_db)

# 사용자의 질의
user_input = "어떤 시간표가 좋을까?"

# SQL 쿼리를 실행해 음식 추천
response = db_chain.run(user_input)
print(response)
