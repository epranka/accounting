import React, { memo } from "react";
import { useVisibleColumns } from ".";
import styled from "styled-components";

const S = {};

const ColumnHeader = ({ name, className, children }) => {
    const [visibleColumns] = useVisibleColumns();
    if (!visibleColumns[name]) return null;

    return (
        <S.ColumnHeader className={className}>
            <S.ColumnHeaderContent>{children}</S.ColumnHeaderContent>
        </S.ColumnHeader>
    );
};

S.ColumnHeader = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;

    &:last-child {
        text-align: right;
    }

    &:first-child {
        text-align: left;
    }
`;

S.ColumnHeaderContent = styled.div`
    flex: 1 0;
    font-size: 14px;
    font-weight: 700;
    color: #545454;
`;

export default memo(ColumnHeader);
