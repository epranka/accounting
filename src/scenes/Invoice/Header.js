import React, { memo, useCallback } from "react";
import styled from "styled-components";
import ColumnsControl from "../../components/ColumnsControl";
import { media } from "../../utils/responsive";

const S = {};

const columns = [
    { title: "Name", name: "name" },
    { title: "Quantity", name: "quantity" },
    { title: "Price", name: "price" },
    { title: "Total", name: "total" },
];

const Header = ({ total, group, onGroupChange }) => {
    const handleChangeGroup = useCallback(
        (e) => {
            e.preventDefault();
            onGroupChange(group === "expense" ? "income" : "expense");
        },
        [group, onGroupChange]
    );

    return (
        <S.Header>
            <ColumnsControl columns={columns} />
            <S.ExpenseToggle group={group} onClick={handleChangeGroup}>
                <input type="checkbox" checked={group === "expense"} readOnly />
                Expense ?
            </S.ExpenseToggle>
            <S.TotalContainer>
                <S.TotalLabel>Total:</S.TotalLabel>
                <S.Total group={group}>{total.toFixed(2)} EUR</S.Total>
            </S.TotalContainer>
        </S.Header>
    );
};

S.Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 15px;
`;

S.ExpenseToggle = styled.label`
    font-size: 14px;
    font-weight: 500;
    color: #777;
    cursor: pointer;
    ${(props) => (props.group === "expense" ? `color: red;` : null)}

    input {
        pointer-events: none;
        margin-right: 8px;
    }
`;

S.TotalContainer = styled.div`
    display: block;

    ${media.min.sm`
        display: flex;
        justify-content: space-between;
    `}
`;

S.TotalLabel = styled.div`
    font-weight: 600;
    margin-bottom: 5px;
    color: #5a5a5a;

    ${media.min.sm`
        margin-bottom: 0;
    `}
`;

S.Total = styled.div`
    text-align: right;
    font-weight: 500;
    color: #5a5a5a;

    ${(props) => (props.group === "expense" ? `color: red;` : null)}

    ${media.min.sm`
        width: 187px;
    `}
`;

export default memo(Header);
