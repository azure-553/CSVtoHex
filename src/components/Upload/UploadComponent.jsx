import React from "react";
import { ReactComponent as Logo } from "../assets/images/dropbox.svg";
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
    background-color: ${({theme}) => theme.colors.gray200};
`;


export default UploadComponent;