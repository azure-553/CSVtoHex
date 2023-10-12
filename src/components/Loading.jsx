import React from "react";
import { Body } from "../styles/font";
import LoadingSpinner from "../assets/gif/Loading.gif";

export const Loading = () => {
    return (
        <div>
            <img src={LoadingSpinner} alt="Loading..." width="30%" />
        </div>
    )
}