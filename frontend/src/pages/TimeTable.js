import styled from "styled-components";
import { useState, useEffect } from "react";
import { FlexBox, WidthBlock, Wrapper } from "../styles/styled";
import { uploadS3 } from "../utils/upload";
import { apiGetTimeTable, apiUploadFile } from "../apis";
import useLogin from "../hooks/useLogin";
import arrow from "../images/arrow-right-solid.svg";
function Timetable() {
    //useLogin();
    const token = sessionStorage.getItem('token');
    const [visible, setVisible] = useState(true);
    const [fileData, setFileData] = useState({ file: null });
    const [timetable, setTimetable] = useState([]);
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
                {timetable.length === 0 ? (
                    <p>시간표 데이터가 없습니다.</p>
                ) : (
                    <ul>
                        {timetable.map(course => (
                            <li key={course.courseId}>
                                {course.courseName} - {course.courseStartTime} - {course.courseEndTime} - {course.courseRoom} - {course.professor} - {course.courseDays.join(', ')} <br />
                                추천 이유 : {course.describe}
                            </li>
                        ))}
                    </ul>
                )}
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
const TimeTableWidthBlock = styled(WidthBlock)`
    display: ${props => (props.isVisible ? 'none' : 'flex')};
    font-size: 0.8rem;
    color: black;
`

