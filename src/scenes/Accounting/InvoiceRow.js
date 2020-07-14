import React, { useCallback, memo } from "react";
import styled from "styled-components";
import Column from "../../components/Table/Column";
import Row from "../../components/Table/Row";
import ReactTooltip from "react-tooltip";
import { Link } from "@reach/router";
import thousands from "../../utils/thousands";

const S = {};

const InvoiceRow = ({ invoice, onStatusChange }) => {
    const handleChangeStatus = useCallback(
        (e) => {
            e.preventDefault();
            onStatusChange(invoice.uid, !invoice.closed);
        },
        [invoice.uid, invoice.closed, onStatusChange]
    );

    return (
        <S.InvoiceRow>
            <Row>
                <Column name="title" className="col-md">
                    <S.Title>
                        <Link to={"/invoice/" + invoice.uid}>
                            {invoice.title}
                        </Link>
                    </S.Title>
                </Column>
                <Column name="date" className="col-md">
                    <S.Date>{invoice.date}</S.Date>
                </Column>
                <Column name="status" className="col-md">
                    <S.Status closed={invoice.closed}>
                        <span
                            data-tip="Click to change"
                            onClick={handleChangeStatus}
                        >
                            {invoice.closed ? "Closed" : "Open"}
                        </span>
                    </S.Status>
                </Column>
                <Column name="total" className="col-md">
                    <S.Price group={invoice.group}>
                        {invoice.group === "expense" ? "-" : ""}
                        {thousands(invoice.total.toFixed(2))} EUR
                    </S.Price>
                </Column>
            </Row>
            <ReactTooltip />
        </S.InvoiceRow>
    );
};

S.InvoiceRow = styled.div``;

S.Title = styled.div`
    a {
        text-decoration: none;
        font-weight: 500;
        color: #484848;

        transition: color 0.15s ease;

        &:hover {
            color: #2d2d2d;
        }
    }
`;

S.Date = styled.div``;

S.Status = styled.div`
    cursor: pointer;
    user-select: none;
    ${(props) => (props.closed ? `color: #9a9a9a` : `color: green`)};
`;

S.Price = styled.div`
    text-align: right;
    ${(props) =>
        props.group === "expense"
            ? `
        color: red;
    `
            : null}
`;

export default memo(InvoiceRow);
