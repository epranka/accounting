import React, { memo, useCallback } from "react";
import styled from "styled-components";
import Block from "../../components/Block";
import BlockHeader from "../../components/Block/BlockHeader";
import { useData } from "../../mock/DataProvider";
import BlockItem from "../../components/Block/BlockItem";
import InvoiceRow from "./InvoiceRow";
import Header from "./Header";
import TableProvider from "../../components/Table";
import InvoiceRowHeader from "./InvoiceRowHeader";
import * as actions from "../../mock/actions";

const S = {};

const defaultVisibleColumns = {
    title: true,
    date: true,
    status: true,
    total: true,
};

const Accounting = () => {
    const [data, dispatch] = useData();

    const invoices = data.invoices;

    const balance = invoices.reduce((balance, invoice) => {
        if (invoice.group === "expense") {
            return balance - invoice.total;
        } else {
            return balance + invoice.total;
        }
    }, 0);

    const changeInvoiceStatus = useCallback(
        (invoiceId, closed) => {
            actions.changeInvoiceStatus(dispatch, invoiceId, closed);
        },
        [dispatch]
    );

    return (
        <S.Accounting>
            <TableProvider defaultVisibleColumns={defaultVisibleColumns}>
                <div className="container">
                    <Block>
                        <BlockHeader>
                            <Header balance={balance}></Header>
                        </BlockHeader>
                        <BlockItem>
                            <InvoiceRowHeader />
                        </BlockItem>
                        {invoices.map((invoice, key) => {
                            return (
                                <BlockItem key={key}>
                                    <InvoiceRow
                                        invoice={invoice}
                                        onStatusChange={changeInvoiceStatus}
                                    />
                                </BlockItem>
                            );
                        })}
                    </Block>
                </div>
            </TableProvider>
        </S.Accounting>
    );
};

S.Accounting = styled.div``;

export default memo(Accounting);
