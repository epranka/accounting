import { useParams } from "@reach/router";
import React, { memo, useCallback } from "react";
import styled from "styled-components";
import Block from "../../components/Block";
import BlockHeader from "../../components/Block/BlockHeader";
import BlockItem from "../../components/Block/BlockItem";
import TableProvider from "../../components/Table";
import * as actions from "../../mock/actions";
import { useData } from "../../mock/DataProvider";
import getInvoiceById from "../../mock/helpers/getInvoiceById";
import Header from "./Header";
import InvoiceLineRow from "./InvoiceLineRow";
import InvoiceLineRowHeader from "./InvoiceLineRowHeader";

const S = {};

const defaultVisibleColumns = {
    name: true,
    quantity: true,
    price: true,
    total: true,
};

const Invoice = () => {
    const { invoiceId } = useParams();
    const [data, dispatch] = useData();

    const handleLineChange = useCallback(
        (index, name, value) => {
            actions.changeInvoiceLine(
                dispatch,
                parseInt(invoiceId),
                index,
                name,
                value
            );
        },
        [invoiceId, dispatch]
    );

    const handleGroupChange = useCallback(
        (group) => {
            actions.changeInvoiceGroup(dispatch, parseInt(invoiceId), group);
        },
        [invoiceId, dispatch]
    );

    const invoice = getInvoiceById(data.invoices, parseInt(invoiceId));
    if (!invoice) return null;

    return (
        <S.Invoice>
            <TableProvider defaultVisibleColumns={defaultVisibleColumns}>
                <div className="container">
                    <Block>
                        <BlockHeader>
                            <Header
                                total={invoice.total}
                                group={invoice.group}
                                onGroupChange={handleGroupChange}
                            />
                        </BlockHeader>
                        <BlockItem>
                            <InvoiceLineRowHeader />
                        </BlockItem>
                        {invoice.invoiceLines.map((invoiceLine, index) => {
                            return (
                                <BlockItem key={index}>
                                    <InvoiceLineRow
                                        index={index}
                                        invoiceLine={invoiceLine}
                                        onLineChange={handleLineChange}
                                    />
                                </BlockItem>
                            );
                        })}
                    </Block>
                </div>
            </TableProvider>
        </S.Invoice>
    );
};

S.Invoice = styled.div``;

export default memo(Invoice);
