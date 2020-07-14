import React, { memo } from "react";
import Row from "../../components/Table/Row";
import ColumnHeader from "../../components/Table/ColumnHeader";
import styled from "styled-components";

const S = {};

const InvoiceRowHeader = () => {
    return (
        <S.InvoiceRowHeader>
            <Row>
                <ColumnHeader name="title" className="col-md">
                    Title
                </ColumnHeader>
                <ColumnHeader name="date" className="col-md">
                    Date
                </ColumnHeader>
                <ColumnHeader name="status" className="col-md">
                    Status
                </ColumnHeader>
                <ColumnHeader name="total" className="col-md">
                    <S.RightAlign>Total</S.RightAlign>
                </ColumnHeader>
            </Row>
        </S.InvoiceRowHeader>
    );
};

S.InvoiceRowHeader = styled.div`
    background: #f9f9f9;
`;

S.RightAlign = styled.div`
    text-align: right;
`;

export default memo(InvoiceRowHeader);
