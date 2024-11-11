import styled from "styled-components";
import { FlexBox, WidthBlock } from "../styles/styled";

import { IoIosInformationCircleOutline } from "react-icons/io";
import { GrDocumentUser } from "react-icons/gr";
import { CiCircleCheck, CiWarning } from "react-icons/ci";


function MyPage() {
    const userInfo = {
        "이름": "임우진",
        "학번": "20011787",
        "아이디": "hailcryptic",
        "학기": "3-2",
        "학점": "4.22"
    }

    const attendedCourse = {
        "last_updated_at": "2001-09-11",
        "data": []
    };

    return (
        <WidthBlock>
            <TitleBar>
                <TitleText>정보</TitleText>
            </TitleBar>
            <InformationBlock>
                <HalfBox>
                    <BoxContainer>
                        <InformationTab>
                            <InfoTitle>
                                <IoIosInformationCircleOutline size="1.5rem" />
                                &nbsp;
                                계정
                                <Button>Change</Button>
                            </InfoTitle>
                            <ContentContainer>
                                <Column style={{ width: "100%", height: "100%" }}>
                                    {
                                        Object.keys(userInfo).map((label, idx) => (
                                            <Row key={label} style={{ fontWeight: "bold" }}>
                                                <Label>{label}</Label>
                                            </Row>
                                        ))
                                    }
                                </Column>
                                <Divider />
                                <Column style={{ width: "100%", height: "100%" }}>
                                    {
                                        Object.values(userInfo).map((label, idx) => (
                                            <Row key={label}>
                                                <Label>{label}</Label>
                                            </Row>
                                        ))
                                    }
                                </Column>
                            </ContentContainer>
                        </InformationTab>
                    </BoxContainer>
                </HalfBox>

                <HalfBox>
                    <BoxContainer>
                        <InformationTab>
                            <InfoTitle>
                                <GrDocumentUser size="1.5rem" />
                                &nbsp;
                                기이수 과목 정보
                                <Button>Update</Button>
                            </InfoTitle>
                            <EmptyStateContainer>
                                {attendedCourse.data.length === 0 ? (
                                    <>
                                        <CiWarning size={"4rem"} color="#666"/>
                                        <EmptyStateText>아직 입력된 과목이 없습니다</EmptyStateText>
                                        <EmptyStateDescription>
                                            Update 버튼을 클릭하여 기이수 과목을 입력해주세요
                                        </EmptyStateDescription>
                                    </>
                                ) : (
                                    <>
                                        <CiCircleCheck size={"4rem"} color="#666"/>
                                        <EmptyStateText>최신 정보가 반영되었습니다</EmptyStateText>
                                        <EmptyStateDescription>
                                            마지막 업데이트: {attendedCourse.last_updated_at}
                                        </EmptyStateDescription>
                                    </>
                                )}
                            </EmptyStateContainer>
                        </InformationTab>
                    </BoxContainer>
                </HalfBox>
            </InformationBlock>
        </WidthBlock>
    )
}

const InformationBlock = styled(FlexBox)`
    width: 100%;
    min-height: 25rem;
`

const TitleBar = styled(FlexBox)`
    width: 100%;
    height: 6.25rem;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const TitleText = styled.span`
    width: 30%;
    padding: 1rem 0.125rem;
    font-weight: bold;
    border-top: 1px solid;
    border-bottom: 1px solid;
`;

const HalfBox = styled(FlexBox)`
    width: 50%;
    height: auto;
    justify-content: center;
    align-items: center;
`;

const BoxContainer = styled.div`
    width: 60%;
    border: 1px solid #ddd;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
`;

const InformationTab = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem 1.5rem;
    flex: 1;
`;

const InfoTitle = styled.div`
    padding: 8px 0;
    border-bottom: 1px solid #404040;
    display: flex;
    align-items: center;
    font-weight: bold;
`;

const Button = styled.button`
    margin-left: auto;
    padding: 10px 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: black;
    color: white;
    cursor: pointer;
    font-size: 10px;

    &:hover {
        background-color: #666;
    }
`;

const ContentContainer = styled.div`
    display: flex;
    width: 100%;
    flex: 1;
`;

const Column = styled.div`
    flex: 1;
    padding: 0 1rem;
    height: 100%;
`;

const Divider = styled.div`
    width: 1px;
    background-color: black;
    margin: 0 1rem;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    margin: 0.5rem 0;
`;

const Label = styled.span`
    min-width: 4rem;
    font-size: 0.8rem;
`;

const EmptyStateContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    height: 100%;
`;

const EmptyStateIcon = styled.div`
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #666;
`;

const EmptyStateText = styled.div`
    font-size: 1.1rem;
    font-weight: bold;
    color: #666;
    margin-bottom: 0.5rem;
`;

const EmptyStateDescription = styled.div`
    font-size: 0.9rem;
    color: #999;
    text-align: center;
`;

export default MyPage;