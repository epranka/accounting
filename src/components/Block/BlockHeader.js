import React, { memo } from "react";
import styled from "styled-components";

const S = {};

const BlockHeader = ({ children }) => {
    return <S.BlockHeader>{children}</S.BlockHeader>;
};

S.BlockHeader = styled.div`
    position: relative;
    background: #f9f9f9;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom: 1px solid #cecece;
`;

export default memo(BlockHeader);
