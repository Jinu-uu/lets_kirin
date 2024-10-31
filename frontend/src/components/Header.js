import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import kirinlogo from "../images/kirinlogo.png";
import { FlexBox } from "../styles/styled";
function Header() {
    const navigate = useNavigate();
    return (
        <HeaderBox>
            <LeftBox>
                <h1>시간표</h1>
                <h1>사용법</h1>
            </LeftBox>
            <LogoBox>
                <img src={kirinlogo} alt="로고" onClick={() => { navigate("/"); }} />
                <h1>Let's Kirin</h1>
            </LogoBox>
            <RightBox>
                <h1>마이페이지</h1>
                <h1>로그아웃</h1>
            </RightBox>
        </HeaderBox>
    )
}
export default Header;

const HeaderBox = styled(FlexBox)`
    width: 100%;
    height: 18%;
    padding-left: 100px;
    padding-right: 100px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-family: sans-serif;
`
const LeftBox = styled(FlexBox)`
    width: 15%;
    height: 35%;
    background-color: black;
    border-radius: 32px;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    h1{
        width: 50%;
        font-size: 0.6rem;
        font-weight: 700;
        color: white;
    }
`
const RightBox = styled(FlexBox)`
    width: 15%;
    height: 35%;
    background-color: black;
    border-radius: 32px;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    h1{
        width: 50%;
        font-size: 0.6rem;
        font-weight: 700;
        color: white;
    }
`
const LogoBox = styled(FlexBox)`
    width: 10%;
    height: 40%;
    justify-content: center;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    img{
        width: 45%;
        height: auto;
    }
    h1{
        font-size: 1.2rem;
        font-weight: bold;
        color: black;
    }
`