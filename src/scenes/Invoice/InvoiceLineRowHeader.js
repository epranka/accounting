import React, { memo } from "react";
import Row from "../../components/Table/Row";
import ColumnHeader from "../../components/Table/ColumnHeader";
import styled from "styled-components";

const S = {};

const InvoiceLineRowHeader = () => {
    return (
        <S.InvoiceLineRowHeader>
            <Row>
                <ColumnHeader name="name" className="col-md">
                    Name
                </ColumnHeader>
                <ColumnHeader name="quantity" className="col-md">
                    <S.RightAlign>Quantity</S.RightAlign>
                </ColumnHeader>
                <ColumnHeader name="price" className="col-md">
                    <S.RightAlign>Unit Price, Eur</S.RightAlign>
                </ColumnHeader>
                <ColumnHeader name="total" className="col-md">
                    <S.RightAlign>Total Price, Eur</S.RightAlign>
                </ColumnHeader>
            </Row>
        </S.InvoiceLineRowHeader>
    );
};

S.InvoiceLineRowHeader = styled.div`
    background: #f9f9f9;
`;

S.RightAlign = styled.div`
    text-align: right;
`;

export default memo(InvoiceLineRowHeader);
