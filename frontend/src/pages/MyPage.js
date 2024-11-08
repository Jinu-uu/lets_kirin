import { WidthBlock, Wrapper, FlexBox } from "../styles/styled";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function MyPage() {
    return (
        <WidthBlock>
            <InformationBlock>

            </InformationBlock>
        </WidthBlock>
    )
}
export default MyPage;
const InformationBlock = styled(FlexBox)`
    width: 100%;
    height: 40%;
`