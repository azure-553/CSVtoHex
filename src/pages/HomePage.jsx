import React, { useState } from "react";
import FileBtn from "../components/FileBtn";
import { ReactComponent as Logo } from "../assets/images/dropbox.svg";
import styled from "styled-components";

const HomePage = () => {
    const [isFile, setIsFile] = useState(false);
    const [isChanged, setIsChanged] = useState(true);

    return(
        <div>
            <UploadBoxStyled>
                <Logo/>
            </UploadBoxStyled>
            <FileBtn
                text="Hex 파일 변환"
                type='button'
                onClick={() => {
                console.log('FileChangeBtn Clicked');
                }}
                disabled={isFile}
            />
            <FileBtn
                text="파일 다운로드"
                type='button'
                onClick={() => {
                console.log('FileDownBtn Clicked');
                }}
                disabled={isChanged}
            />
        </div>
    )
}

const UploadBoxStyled = styled.div`
    background-color: ${({theme}) => theme.colors.gray200};
`;

export default HomePage;