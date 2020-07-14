import React, { memo } from "react";
import styled from "styled-components";

const S = {};

const BlockItem = React.forwardRef(({ children }, ref) => {
    return <S.BlockItem ref={ref}>{children}</S.BlockItem>;
});

S.BlockItem = styled.div`
    transform: translate3d(0, 0, 0);
    position: relative;
    background: white;
    border-bottom: 1px solid #cecece;

    &:nth-child(even) {
        background: #fbfbfb;
    }

    &:last-child {
        border-bottom: 0;
    }
`;

export default memo(BlockItem);
