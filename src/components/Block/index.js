import React, { memo } from "react";
import styled from "styled-components";

const S = {};

const Block = ({ children }) => {
    return <S.Block>{children}</S.Block>;
};

S.Block = styled.div`
    position: relative;
    background: white;
    border-radius: 5px;
    border: 1px solid #cecece;
    box-shadow: 0 0 4px 0px #d2d2d2;
`;

export default memo(Block);
