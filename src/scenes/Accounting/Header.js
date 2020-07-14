import React from "react";
import styled from "styled-components";
import ColumnsControl from "../../components/ColumnsControl";
import { media } from "../../utils/responsive";
import { memo } from "react";

const S = {};

const columns = [
    { title: "Title", name: "title" },
    { title: "Date", name: "date" },
    { title: "Status", name: "status" },
    { title: "Total", name: "total" },
];

const Header = ({ balance }) => {
    return (
        <S.Header>
            <ColumnsControl columns={columns} />
            <S.BalanceContainer>
                <S.BalanceLabel>Balance:</S.BalanceLabel>
                <S.Balance negative={balance < 0}>
                    {balance.toFixed(2)} EUR
                </S.Balance>
            </S.BalanceContainer>
        </S.Header>
    );
};

S.Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 15px;
`;

S.BalanceContainer = styled.div`
    display: block;

    ${media.min.sm`
        display: flex;
        justify-content: space-between;
    `}
`;

S.BalanceLabel = styled.div`
    font-weight: 600;
    margin-bottom: 5px;
    color: #5a5a5a;

    ${media.min.sm`
        margin-bottom: 0;
    `}
`;

S.Balance = styled.div`
    text-align: right;
    font-weight: 500;
    color: #5a5a5a;

    ${(props) => (props.negative ? `color: red;` : "")}

    ${media.min.sm`
        width: 187px;
    `}
`;

export default memo(Header);
