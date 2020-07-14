import React, { memo } from "react";
import styled from "styled-components";

const S = {};

const Row = ({ children }) => {
    return (
        <S.Row>
            <div className="container-fluid">
                <div className="row">{children}</div>
            </div>
        </S.Row>
    );
};

S.Row = styled.div`
    position: relative;
`;

export default memo(Row);
