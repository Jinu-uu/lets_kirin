import styled from "styled-components";
import { useState, useEffect } from "react";
import { WidthBlock, Wrapper } from "../styles/styled";
import { uploadS3 } from "../utils/upload";
import { apiGetTimeTable, apiUploadFile } from "../apis";
import useLogin from "../hooks/useLogin";
function Timetable() {
    useLogin();
    const token = sessionStorage.getItem('token');
    const [visible, setVisible] = useState(true);
    const [fileData, setFileData] = useState({
        file: null,
    });
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
        setFileData({ file: file });
    };
    const handleSubmit = async () => {
        if (!fileData.file) {
            alert("파일이 아직 선택되지 않았습니다.");
            return;
        }

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
                <input type="file" accept=".xlsx, .xls" onChange={handleChange} />
                <button onClick={handleSubmit}>제출하기</button>
            </FileWidthBlock>
            <TimeTableWidthBlock isVisible={visible}>
                {timetable.length === 0 ? (
                    <p>시간표 데이터가 없습니다.</p>
                ) : (
                    <ul>
                        {timetable.map(course => (
                            <li key={course.courseId}>
                                {course.courseName} - {course.courseStartTime} - {course.courseEndTime} - {course.courseRoom} - {course.professor} - {course.courseDays.join(', ')}
                            </li>
                        ))}
                    </ul>
                )}
            </TimeTableWidthBlock>
        </Wrapper>
    )
}
export default Timetable;
const FileWidthBlock = styled(WidthBlock)`
    display: ${props => (props.isVisible ? 'flex' : 'none')};
    justify-content: center;
    align-items: center;
    gap: 20px;
    button{
        width: 200px;
        height: 50px;
        background-color: black;
        border: 2px solid black;
        border-radius: 16px;
        font-size: 0.8rem;
        color: white;
    }
`
const TimeTableWidthBlock = styled(WidthBlock)`
    display: ${props => (props.isVisible ? 'none' : 'flex')};
    font-size: 0.8rem;
    color: black;
`

