import React, { memo } from "react";
import styled from "styled-components";
import { useVisibleColumns } from ".";

const S = {};

const Column = ({ name, className, children }) => {
    const [visibleColumns] = useVisibleColumns();
    if (!visibleColumns[name]) return null;
    return (
        <S.Column className={className}>
            <S.ColumnContent>{children}</S.ColumnContent>
        </S.Column>
    );
};

S.Column = styled.div`
    padding: 15px 20px;
    display: flex;
    align-items: center;

    &:last-child {
        text-align: right;
    }

    &:first-child {
        text-align: left;
    }
`;

S.ColumnContent = styled.div`
    flex: 1 0;
`;

export default memo(Column);
