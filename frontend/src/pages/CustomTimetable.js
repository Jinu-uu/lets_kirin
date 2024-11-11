import { useNavigate } from "react-router-dom";
import { WidthBlock, Wrapper, FlexBox } from "../styles/styled";
import styled from "styled-components";
import close from "../images/Close.svg";
import arrow from "../images/arrow-right-solid.svg";
import { useState } from "react";
function CustomTimetable() {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    return (
        <FormBackground>
            <FormBlock>
                <BackButton><img src={close} onClick={() => navigate(-1)} /></BackButton>
                <CustomHeader><h1>시간표 구성하기</h1></CustomHeader>
                <FormHearder><h1>수업 우선순위 (최대 4개)</h1></FormHearder>
                <FormContent>

                </FormContent>
                <FormHearder><h1>공강 시간 (최대 4개)</h1></FormHearder>
                <FormContent>

                </FormContent>
                <FormRest>
                    <Dayoff>
                        <h1>공강 날짜</h1>
                        <day>
                            <label class="radio-label"><p>월요일</p><input type="radio" name="day" value="월요일" /><span class="custom-radio"></span></label>
                            <label class="radio-label"><p>화요일</p><input type="radio" name="day" value="화요일" /><span class="custom-radio"></span></label>
                            <label class="radio-label"><p>수요일</p><input type="radio" name="day" value="수요일" /><span class="custom-radio"></span></label>
                            <label class="radio-label"><p>목요일</p><input type="radio" name="day" value="목요일" /><span class="custom-radio"></span></label>
                            <label class="radio-label"><p>금요일</p><input type="radio" name="day" value="금요일" /><span class="custom-radio"></span></label>
                        </day>
                    </Dayoff>
                    <Credits>
                        <h1>학점 <span>(12 ~ 21)</span></h1>
                        <input />
                    </Credits>
                    <Submit>
                        <button onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
                        >{isHovered ? (<><img src={arrow} style={{ width: '1.2rem', height: '1.2rem' }} /></>) : (<>생성하기<img src={arrow} /></>)}
                        </button>
                    </Submit>
                </FormRest>
            </FormBlock>
        </FormBackground>
    )
}
export default CustomTimetable;
const FormBackground = styled(WidthBlock)`
    background-color: rgba(0,0,0,0.3);
    justify-content: center;
`
const FormBlock = styled(FlexBox)`
    width: 90%;
    height: 90%;
    gap: 2%;
    background-color: #FFF;
    border-radius: 1rem;
    padding: 2%;
    flex-direction: column;
    align-items:center;
    color: black;
    font-weight: 700;
`
const BackButton = styled(FlexBox)`
    width: 100%;
    height: 4%;
    justify-content: flex-end;
    img{
        width: 1rem;
        height: auto;
        cursor: pointer;
    }
`
const CustomHeader = styled(FlexBox)`
    width: 92%;
    height: 6%;
    border-bottom: 2px solid #D2D2D2;
    align-items: center;
    h1{
        font-size: 1rem;
    }
`
const FormHearder = styled(FlexBox)`
    width: 90%;
    height: 6%;
    align-items: center;
    h1{
        font-size: 0.8rem;
    }
`
const FormContent = styled(FlexBox)`
    width: 90%;
    height: 26%;
    border: 1px solid black;
    justify-content: center;
`
const FormRest = styled(FlexBox)`
    width: 95%;
    height: 10%;
    margin-left: 5%;
    margin-top: 1%;
`
const Dayoff = styled(FlexBox)`
    width: 70%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    h1{
        width: 100%;
        height: 30%;
        font-size: 0.8rem;
    }
    day{
        width: 100%;
        height: 70%;
        padding-left: 5%;
        padding-right: 5%;
        display: flex;
        gap: 5%;
        label{
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 20%;
            height: 100%;
            padding-right: 5%;
            p{
                font-size: 0.7rem;
                font-weight: 500;
            }
            input[type="radio"]{
                display: none;
            }
            .custom-radio{
                width: 1rem;
                height: 1rem;
                border: 1px solid #bebebe;
                background: #f4f4f4;
                cursor: pointer;
                transition: background-color 0.5s ease, transform 0.5s ease, box-shadow 0.5s ease;
                &:hover{
                    transform:translateY(-0.3rem);
                }
            }
            input[type="radio"]:checked + .custom-radio {
                transform: translateY(0.2rem);
                transform: scale(1.15);
                box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);;
            }
            input[type="radio"]:checked + .custom-radio::after {
                content: ""; 
                position: absolute;
                width: 0.2rem; /* 체크 표시의 너비 */
                height: 0.5rem; /* 체크 표시의 높이 */
                border: solid black; 
                border-width: 0 0.12rem 0.12rem 0; /* 체크 표시 형태 */
                transform: rotate(45deg); /* 체크 표시 회전 */
                top: 40%; 
                left: 50%; 
                transform: translate(-50%, -50%) rotate(45deg); /* 중앙 정렬 및 회전 */
            }
        }
    }
`
const Credits = styled(FlexBox)`
    width: 15%;
    height: 80%;
    flex-direction: column;
    justify-content: space-between;
    h1{
        font-size: 0.8rem;
    }
    span{
        font-size: 0.65rem;
    }
    input{
        width: 6rem;
        height: 1.2rem;
        font-size: 0.6rem;
        margin-left: 10%;
        font-weight: 500;
        text-align: center;
        border-radius: 0.25rem;
        border: 1px solid #BEBEBE;
        background: #F4F4F4;
        transition: box-shadow 0.5s ease;
        &:hover{
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4); /* 아래로 그림자 추가 */
        }
        &:focus{
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4); /* 아래로 그림자 추가 */
        }
    }
`
const Submit = styled(FlexBox)`
    width: 15%;
    height: 100%;
    justify-content: end;
    align-items: end;
    button{
        width: 8rem;
        height: 2rem;
        color: white;
        font-size: 0.7rem;
        border-radius: 0.5rem;
        background-color: #404040;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;
        transition: transform 0.5s ease, box-shadow 0.5s ease;
        img{
            width: 0.7rem;
            height: auto;
        }
        &:hover{
            transform: scale(1.05);
            box-shadow: 0px 5px 10px rgba(0,0,0,0.4);
        }
    }
`