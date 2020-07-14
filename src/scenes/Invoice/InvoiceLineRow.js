import React, { useCallback, memo } from "react";
import styled from "styled-components";
import Column from "../../components/Table/Column";
import Row from "../../components/Table/Row";
import ReactTooltip from "react-tooltip";
import thousands from "../../utils/thousands";
import Editable from "../../components/Editable";

const S = {};

const InvoiceLineRow = ({ index, invoiceLine, onLineChange }) => {
    const totalLinePrice =
        Math.round(invoiceLine.price * invoiceLine.quantity * 100) / 100;

    const handleChange = useCallback(
        (name, value) => {
            onLineChange(index, name, value);
        },
        [index, onLineChange]
    );

    return (
        <S.InvoiceLineRow>
            <Row>
                <Column name="name" className="col-md">
                    <S.Name>
                        <Editable
                            name="name"
                            value={invoiceLine.name}
                            onChange={handleChange}
                        >
                            {invoiceLine.name ? (
                                invoiceLine.name
                            ) : (
                                <S.Blank>(blank)</S.Blank>
                            )}
                        </Editable>
                    </S.Name>
                </Column>
                <Column name="quantity" className="col-md">
                    <S.Quantity>
                        <Editable
                            type="number"
                            name="quantity"
                            value={invoiceLine.quantity}
                            onChange={handleChange}
                        >
                            {invoiceLine.quantity}
                        </Editable>
                    </S.Quantity>
                </Column>
                <Column name="price" className="col-md">
                    <S.UnitPrice>
                        <Editable
                            type="number"
                            name="price"
                            decimals={2}
                            value={invoiceLine.price}
                            onChange={handleChange}
                        >
                            {thousands(invoiceLine.price.toFixed(2))}
                        </Editable>
                    </S.UnitPrice>
                </Column>
                <Column name="total" className="col-md">
                    <S.TotalPrice>
                        {thousands(totalLinePrice.toFixed(2))}
                    </S.TotalPrice>
                </Column>
            </Row>
            <ReactTooltip />
        </S.InvoiceLineRow>
    );
};

S.InvoiceLineRow = styled.div``;

S.Name = styled.div``;

S.Quantity = styled.div`
    text-align: right;
`;

S.UnitPrice = styled.div`
    text-align: right;
`;

S.TotalPrice = styled.div`
    text-align: right;
`;

S.Blank = styled.span`
    color: #b3b3b3;
    font-size: 14px;
`;

export default memo(InvoiceLineRow);
