import React, { useState } from "react";
import { Title } from "../styles/font";
import FileBtn from "../components/FileBtn";
import { ReactComponent as Logo } from "../assets/images/dropbox.svg";
import styled from "styled-components";

const HomePage = () => {
    const [isFile, setIsFile] = useState(false);
    return(
        <div>
            <UploadBoxStyled>
                <Logo/>
            </UploadBoxStyled>
            <FileBtn
                text="Hex 파일 변환"
                type='button'
                onClick={() => {
                console.log('FileBtn Clicked');
                setIsFile(true);
                }}
            />
            <FileBtn
                text="파일 다운로드"
                type='button'
                onClick={() => {
                console.log('FileDownBtn Clicked');
                setIsFile(true);
                }}
            />
            {isFile && (
                <div>test</div>
            )}
        </div>
    )
}

const UploadBoxStyled = styled.div`
    background-color: ${({theme}) => theme.colors.gray200};
`;

export default HomePage;