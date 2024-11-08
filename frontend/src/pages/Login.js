import { WidthBlock, Wrapper, FlexBox } from "../styles/styled";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/kirinlogo.png";
import signuplogo from "../images/runningkirin.png";
import arrow from "../images/arrow-right-solid-gray.svg";
import github from "../images/github-solid-black.svg";
import { apiLogin } from "../apis";
function Login() {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        id: '',
        pw: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiLogin(loginData); // 비동기 호출
            sessionStorage.setItem('token', response.data.accessToken);
            navigate('/timetable');
        } catch (error) {
            alert(error.message || '로그인 실패'); // 오류 메시지 출력
        }
    };

    return (
        <Wrapper>
            <WidthBlock>
                <LoginContainer>
                    <LoginLogo onClick={() => { navigate("/"); }}>
                        <img src={logo} alt="레츠기린 로고" />
                        <p>Let's<br />Kirin</p>
                    </LoginLogo>
                    <LoginSection>
                        <LoginFont><p>Log In (ID / PW)</p></LoginFont>
                        <LoginID placeholder="ID" type="text" name="id" value={loginData.id} onChange={handleChange} />
                        <LoginPW placeholder="PW" type="password" name="pw" value={loginData.pw} onChange={handleChange} />
                        <LoginBtn onClick={handleSubmit}>Log In</LoginBtn>
                        <ORSection>
                            <ORLine />
                            OR
                            <ORLine />
                        </ORSection>
                        <SignUp onClick={() => { navigate("/signup"); }}>
                            <img src={signuplogo} alt="로그인 로고" />
                            <p>
                                Sign Up
                                <img src={arrow} alt="화살표" />
                            </p>
                        </SignUp>
                    </LoginSection>
                    <GithubImg src={github} alt="깃허브" onClick={() => { navigate("/"); }} />
                </LoginContainer>
            </WidthBlock>
        </Wrapper>
    )
}

export default Login;

const LoginContainer = styled(FlexBox)`
    width: 33%;
    height: 100%;
    min-width: 480px;
    padding-top: 4%;
    flex-direction: column;
    align-items: center;
    p{
        color: #000;
        font-weight: bold;
    }
`
const LoginLogo = styled(FlexBox)`
    cursor: pointer;
    width: 30%;
    height: 20%;
    min-width: 160px;
    min-height: 100px;
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
const LoginSection = styled(FlexBox)`
    width: 100%;
    height: 50%;
    min-height: 360px;
    border: 2px solid #404040;
    border-radius: 16px;
    align-items: center;
    flex-direction: column;
`
const LoginFont = styled(FlexBox)`
    margin-top: 6%;
    width: 50%;
    height: 15%;
    min-height: 80px;
    justify-content: center;
    align-items: center;
    p{
        font-size: 16px;
    }
`
const LoginID = styled.input`
    display: flex;
    width: 70%;
    height: 12%;
    min-height: 40px;
    border-radius: 16px 16px 0px 0px;
    border: 1px solid #404040;
    border-bottom:0px;
    padding-left:5%;
    font-size: 12px;
    font-weight:700;
    color:#404040;
    &::placeholder{
        font-size: 12px;
    }
`
const LoginPW = styled.input`
    display: flex;
    width: 70%;
    height: 12%;
    min-height: 40px;
    border-radius: 0px 0px 16px 16px;
    border: 1px solid #404040;
    padding-left:5%;
    font-size: 12px;
    font-weight:700;
    color:#404040;
    &::placeholder{
        font-size: 12px;
    }
    `
const LoginBtn = styled.button`
    margin-top: 4%;
    text-align:flex;
    width: 70%;
    height: 8.5%;
    min-height: 30px;
    background-color: #404040;
    font-size: 12px;
    font-weight: bold;
    color: #fff;
    border-radius: 12px;
`
const ORSection = styled(FlexBox)`
    width: 80%;
    height: 10%;
    min-height: 30px;
    margin-top: 2%;
    align-items: center;
    justify-content:space-between;
    font-size: 12px;
    color: #404040;
    font-weight: 700;
`
const ORLine = styled(FlexBox)`
    width: 45%;
    height: 1.5px;
    background: #404040;
`
const SignUp = styled(FlexBox)`
    width: 70%;
    height: 10%;
    min-height: 30px;
    cursor: pointer;
    border-radius: 12px;
    border: 1px solid #404040;
    align-items: center;
    justify-content: space-between;
    margin-top: 2%;
    padding-left: 5%;
    padding-right: 25%;
    p{
        width:40%;
        height:100%;
        display:flex;
        align-items:center;
        font-size: 14px;
        color: #404040;
        font-weight: bold;
        gap:5%;
        img{
            height: 14px;
            width:auto;
        }
    }
    img{
        height: 80%;
        width: auto;
    }
`
const GithubImg = styled.img`
    margin-top: 35%;
    width: 30px;
    height: auto;
    cursor: pointer;
`