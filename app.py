from fastapi import FastAPI
from pydantic import BaseModel
from langchain.chat_models import ChatOpenAI
from langchain import PromptTemplate, LLMChain
from langchain.chains import SimpleSequentialChain
from dotenv import load_dotenv

load_dotenv()

# FastAPI 앱 생성
app = FastAPI()

# OpenAI API 설정 (API 키 설정)

# 요청 Body 모델 정의
class Question(BaseModel):
    question: str

# Chain-of-Thought을 위한 PromptTemplate 설정 (6번 예시 사용)
few_shot_examples = """
Example 1:
Q: 나는 저녁에 뭐 먹을까? 
A: 나는 보통 저녁에 간단한 음식을 먹고 싶어해. 김치찌개나 비빔밥 같은 한국 음식을 추천해.

Example 2:
Q: 날씨가 더운데 어떤 음식을 먹을까?
A: 더운 날씨에는 시원한 음식을 먹으면 좋지. 냉면이나 샐러드 같은 음식은 어때?

Example 3:
Q: 오늘 기분이 안 좋아, 무슨 음식을 먹어야 기분이 나아질까?
A: 기분이 안 좋을 때는 달콤한 디저트나 초콜릿이 도움이 될 수 있어. 혹은 네가 좋아하는 음식을 먹는 것도 방법이야.

Example 4:
Q: 피곤한데 뭘 먹으면 에너지를 얻을 수 있을까?
A: 피곤할 때는 단백질이 풍부한 음식을 먹으면 좋아. 치킨, 견과류, 단백질 쉐이크 같은 게 도움이 돼.

Example 5:
Q: 비오는 날엔 무슨 음식을 먹으면 좋을까?
A: 비오는 날에는 따뜻한 국물 음식이 어울려. 예를 들어 감자탕이나 된장찌개    같은 걸 추천해.

Example 6:
Q: 아침에 뭘 먹으면 좋을까?
A: 아침엔 가볍고 영양가 있는 음식을 먹는 게 좋아. 샐러드나 오트밀, 혹은 삶은 달걀 같은 게 좋은 선택이야.
"""

# Prompt 템플릿 작성 (Few-Shot Learning + Chain-of-Thought)
prompt_template = PromptTemplate(
    input_variables=["question"],
    template=few_shot_examples + "\nQ: {question}\nA: Let's think step by step."
)

# OpenAI 모델 설정
llm = ChatOpenAI(model="gpt-3.5-turbo")

# Chain-of-Thought 적용한 LLMChain 생성
llm_chain = LLMChain(llm=llm, prompt=prompt_template)

# FastAPI 라우팅 - 질문에 대한 답변 반환
@app.post("/ask/")
async def ask_question(question: Question):
    # 질문을 통해 Chain-of-Thought 방식으로 답변 생성
    answer = llm_chain.run(question=question.question)
    return {"question": question.question, "answer": answer}

# 서버 실행 명령 (터미널에서 실행)
# uvicorn 파일명:app --reload
