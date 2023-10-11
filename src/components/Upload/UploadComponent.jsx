import React from "react";
import { ReactComponent as Logo } from "../../assets/images/dropbox.svg";
import styled from "styled-components";

const UploadComponent = () => {
    return(
        <div>
            <UploadBoxStyled>
                <Logo/>
            </UploadBoxStyled>
        </div>
    );
}


const UploadBoxStyled = styled.div`
    margin-bottom: 45px;

    width: 1298px;
    height: 502px;

    background-color: ${({theme}) => theme.colors.gray200};
    border-radius: 12px;

    border: 3px dashed ${({theme}) => theme.colors.gs300};

    &:hover{
        border: 3px dashed ${({theme}) => theme.colors.gs500};
    }
`;


export default UploadComponent;