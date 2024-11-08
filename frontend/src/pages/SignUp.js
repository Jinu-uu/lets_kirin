import { WidthBlock, Wrapper, FlexBox } from "../styles/styled";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/kirinlogo.png";
import signuplogo from "../images/runningkirin.png";
import arrow from "../images/arrow-right-solid.svg";
import github from "../images/github-solid-black.svg";
import { apiSignUp } from "../apis";

function SignUp() {
    const navigate = useNavigate();
    const [signUpData, setSignUpData] = useState({
        id: '',
        pw: '',
        confirmpw: '',
        name: '',
        year: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignUpData(prev => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (signUpData.id === '' || signUpData.pw === '' || signUpData.confirmpw === '' || signUpData.name === '' || signUpData.year === '') {
            alert("모든 값을 입력해주세요!");
            return;
        }
        if (signUpData.pw !== signUpData.confirmpw) {
            alert("비밀번호와 비밀번호 확인이 서로 다릅니다!");
            return;
        }
        if (Number(signUpData.year) < 2000 || Number(signUpData.year) > 2024) {
            alert("입학연도가 설정 범위와 다릅니다!");
            return;
        }

        try {
            await apiSignUp(signUpData); // 비동기 호출
            alert("회원가입 성공");
            navigate("/login");
        } catch (error) {
            alert(error.message || '회원가입 실패'); // 오류 메시지 출력
        }
    };

    return (
        <WidthBlock>
            <SignUpContainer>
                <SignUpLogo onClick={() => { navigate("/"); }}>
                    <img src={logo} />
                    <p>Let's<br />Kirin</p>
                </SignUpLogo>
                <SignUpSection>
                    <SignUpFont>
                        <img src={signuplogo} />
                        <p>Sign Up</p>
                    </SignUpFont>
                    <SignUpPart1>
                        <InputBox placeholder="ID" name="id" value={signUpData.id} type="text" onChange={handleChange} bottom={"0px"} radius={"8px 8px 0px 0px"} />
                        <InputBox placeholder="PW" name="pw" value={signUpData.pw} type="password" onChange={handleChange} />
                        <InputBox placeholder="Confirm PW" name="confirmpw" value={signUpData.confirmpw} type="password" onChange={handleChange} top={"0px"} radius={"0px 0px 8px 8px"} />
                    </SignUpPart1>
                    <SignUpPart2>
                        <InputBox2 placeholder="Name" name="name" value={signUpData.name} type="text" onChange={handleChange} bottom={"0px"} radius={"8px 8px 0px 0px"} />
                        <InputBox2 placeholder="Which year did you enter university? [2000~2024]" name="year" value={signUpData.year} type="text" onChange={handleChange} maxLength={4} radius={"0px 0px 8px 8px"} />
                    </SignUpPart2>
                    <SubmitBtn onClick={handleSubmit}>
                        <p>Let's go and use the Let's Kirin service</p>
                        &nbsp;
                        <img src={arrow} />
                    </SubmitBtn>
                </SignUpSection>
                <GithubImg src={github} onClick={() => { navigate("/"); }} />
            </SignUpContainer>
        </WidthBlock>
    )
}
export default SignUp;
const SignUpContainer = styled(FlexBox)`
    width: 33%;
    height: 100%;
    min-width: 480px;
    padding-top: 2%;
    flex-direction: column;
    align-items: center;
    p{
        color: #000;
        font-weight: bold;
    }
    gap: 2%;
`
const SignUpLogo = styled(FlexBox)`
    cursor: pointer;
    width: 30%;
    height: 10%;
    min-width: 160px;
    min-height: 64px;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 10%;
    img{
        width: 50%;
        height: auto;
    }
    p{
        font-size: 24px;
    }
`
const SignUpSection = styled(FlexBox)`
    width: 100%;
    height: 75%;
    min-height: 500px;
    padding-top: 10%;
    gap: 5%;
    border: 2px solid #404040;
    border-radius: 16px;
    align-items: center;
    flex-direction: column;
`
const SignUpFont = styled(FlexBox)`
    width: 100%;
    height: 10%;
    min-height: 50px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 2%;
    img{
        height:55%;
        width: auto;
    }
    p{
        font-size:14px;
    }
`
const SignUpPart1 = styled(FlexBox)`
    width: 70%;
    height: 27%;
    min-height: 150px;
    justify-content: center;
    flex-direction: column;
`
const InputBox = styled.input`
    width: 100%;
    height: 33%;
    border: 1px solid #404040;
    border-top :${({ top }) => `${top}`};
    border-bottom :${({ bottom }) => `${bottom}`};
    border-left :${({ left }) => `${left}`};
    border-right :${({ right }) => `${right}`};
    border-radius: ${({ radius }) => `${radius}`};
    padding-left:8%;
    font-size: 12px;
    font-weight:700;
    color:#404040;
    &::placeholder{
       font-size:12px;
    }
`
const SignUpPart2 = styled(SignUpPart1)`
    margin-top: 5%;
    height: 18%;
    min-height: 100px;
`
const InputBox2 = styled(InputBox)`
    height: 50%;
`
const SubmitBtn = styled.button`
    width: 70%;
    height: 7%;
    min-height: 35px;
    margin-top: 5%;
    background-color: #404040;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    p{
        color: #FFF;
        font-size: 12px;
    }
    img{
        height: 13px;
        width: auto;
    }
`
const GithubImg = styled.img`
    margin-top: 6%;
    width: 30px;
    height: auto;
    cursor: pointer;
`