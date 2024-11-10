import styled from "styled-components";
import { useState, useEffect } from "react";
import { FlexBox, WidthBlock, Wrapper } from "../styles/styled";
import { uploadS3 } from "../utils/upload";
import { apiGetTimeTable, apiUploadFile } from "../apis";
import useLogin from "../hooks/useLogin";
import arrow from "../images/arrow-right-solid.svg";
import add from "../images/Add_Time.svg";
function Timetable() {
    //useLogin();
    const token = sessionStorage.getItem('token');
    const [visible, setVisible] = useState(false);
    const [fileData, setFileData] = useState({ file: null });
    // 선택된 항목의 인덱스를 상태로 저장
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [timetable, setTimetable] = useState([
        {
            "semesters": [
                {
                    "semester": "1",  // 만들어진 시간표 순서
                    "courses": [
                        {
                            "courseName": "컴퓨터 네트워크",  // 과목 이름
                            "professor_name": "양효식",  // 교수 이름
                            "schedule": [
                                {
                                    "day": "월요일",   // 요일
                                    "time": "1500 ~ 1630",   // 시작 시간
                                    "location": "센B209" // 강의실
                                },
                                {
                                    "day": "수요일",
                                    "time": "1500 ~ 1630",
                                    "location": "센B209" // 강의실
                                }
                            ]
                        },
                    ]
                },
                {
                    "semester": "2",
                    "courses": [
                        {
                            "courseName": "데이터베이스",
                            "professor_name": "김철수",
                            "schedule": [
                                {
                                    "day": "화요일",
                                    "time": "1100 ~ 1230",
                                    "location": "센B210"
                                }
                            ]
                        }
                    ]
                },
                {
                    "semester": "3"
                }
                ,
                {
                    "semester": "4"
                }
                ,
                {
                    "semester": "5"
                }
                ,
                {
                    "semester": "6"
                }
                ,
                {
                    "semester": "7"
                }
                ,
                {
                    "semester": "8"
                },
                {
                    "semester": "9"
                },
                {
                    "semester": "10"
                }
            ]
        }
    ]);
    const handleClick = (index) => {
        setSelectedIndex(index); // 클릭한 항목의 인덱스를 상태에 저장
    };
    const fetchTimetable = async () => {
        try {
            const response = await apiGetTimeTable(); // 비동기 호출
            console.log(response); // 응답 확인
            const data = response.data;
            setTimetable(data.courses);
        } catch (error) {
            console.error('Error fetching timetable:', error); // 오류 처리
        }
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileData(file); // 파일 데이터를 상태에 저장
            handleSubmit(file); // 파일 선택과 동시에 서버에 업로드
        }
    };
    const handleSubmit = async () => {
        try {
            await apiUploadFile(fileData.file, token); // 비동기 호출
            setVisible(false);
            await fetchTimetable(); // 시간표 데이터 새로 고침
        } catch (error) {
            console.log('Error uploading file:', error); // 오류 처리
        }
    };

    /*uploadS3(fileData.file)
        .then((url) => {
            console.log('File uploaded successfully:', url);
            setVisible(false);
            fetchTimetable();
        })
        .catch((error) => {
            console.error('Error uploading file:', error);
        });*/

    return (
        <Wrapper>
            <FileWidthBlock isVisible={visible}>
                <h1>NOT FOUND 404 <br />너의 수업은?</h1>
                <h2>We still don't have any information about you...<br />파일 업로드 부탁드립니다...🙏</h2>
                <input type="file" accept=".xlsx, .xls" onChange={handleChange} style={{ display: "none" }} id="file-upload" />
                <label htmlFor="file-upload">
                    <FileButton>
                        <p>Add File </p>
                        &nbsp;
                        <img src={arrow} />
                    </FileButton>
                </label>
            </FileWidthBlock>
            <TimeTableWidthBlock isVisible={visible}>
                <TimeList>
                    <User>
                        <p>20학번 이기탁</p>
                        <img src={add} />
                    </User>
                    <ListBlock>
                        {timetable[0].semesters.map((semester, index) => (
                            <List key={index} className={selectedIndex === index ? 'select' : 'wait'} onClick={() => handleClick(index)} >
                                Let's Kirin 추천 {semester.semester}
                            </List>
                        ))}
                    </ListBlock>
                </TimeList>
                <TableBlock></TableBlock>
            </TimeTableWidthBlock>
        </Wrapper>
    )
}
export default Timetable;
const FileWidthBlock = styled(FlexBox)`
    display: ${props => (props.isVisible ? 'flex' : 'none')};
    flex-direction: column;
    width: 100vw;
    height: 82vh;
    justify-content: center;
    align-items: center;
    gap: 20px;
    color: black; 
    text-align: center;
    h1{
        font-weight: 900;
        font-size: 6rem;
    }
    h2{
        font-weight: 700;
        font-size: 1rem;
    }
`
const FileButton = styled(FlexBox)`
    width: 12%;
    height: 5%;
    min-width: 160px;
    min-height: 40px;
    cursor: pointer;
    background-color: #404040;
    border-radius: 20px;
    color: white;
    justify-content: center;
    align-items: center;
    p{
        font-size: 0.8rem;
    }
    img{
        width: 0.8rem;
        height: auto;
    }
    @media screen and (max-width: 1000px){
        p{
            font-size: 12px;
        }
        img{
            width: 12px;
            height: auto;
        }
    }
    @media screen and (min-width: 1600px){
        p{
            font-size: 16px;
        }
        img{
            width: 16px;
            height: auto;
        }
    }
`
const TimeTableWidthBlock = styled(FlexBox)`
    display: ${props => (props.isVisible ? 'none' : 'flex')};
    width: 100vw;
    height: 82vh;
    justify-content: center;
    align-items: center;
    gap: 5%;
`
const TimeList = styled(FlexBox)`
    width: 16%;
    height: 85%;
    gap: 2%;
    flex-direction: column;
    font-family: sans-serif;
    overflow-y: hidden;
`
const TableBlock = styled(FlexBox)`
    width: 70%;
    height: 85%;
    border: 2px solid black;
    position: relative;
`
const User = styled(FlexBox)`
    width: 100%;
    height: 6%;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    p{
        color: #404040;
        font-size: 0.8rem;
        font-weight: 700;
        margin-left: 30%;
    }
    img{
        width: 2rem;
        height: auto;
        cursor: pointer;
        transition: transform 0.5s ease; 
        &:hover{
            transform: scale(1.15);
        }
    }
`
const ListBlock = styled(FlexBox)`
    width: 100%;
    height: 90%;
    flex-direction: column;
    align-items:center;
    gap: 4%;
    overflow-y:auto;
    padding: 10px;
    box-sizing: border-box; /* padding이 요소의 전체 크기에 포함되도록 설정 */
    overscroll-behavior: none; /* 스크롤이 전체화면으로 넘어가는거 방지 */
`
const List = styled(FlexBox)`
    width: 95%;
    height: 9%;
    border: 1px solid black;
    border-radius: 32px;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.5s ease, background-color 0.5s ease; 
    &.select{
        color: white;
        background-color: black;
        border: 1px solid white;
    }
    &.wait{
        color: black;
        background-color: white;
        border: 1px solid black;
    }
    &:hover{
        transform: scale(1.05);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); 
    }
`