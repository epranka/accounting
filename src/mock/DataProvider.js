import update from "immutability-helper";
import React, { memo, useContext, useReducer } from "react";
import data from "./data";

const DataContext = React.createContext(data);

const reducer = (state, action) => {
    let invoiceIndex;
    switch (action.type) {
        case "CHANGE_INVOICE_GROUP":
            invoiceIndex = state.invoices.findIndex(
                ({ uid }) => uid === action.invoiceId
            );
            if (invoiceIndex === -1)
                throw new Error(
                    `Invoice with uid ${action.invoiceId} not found`
                );
            return update(state, {
                invoices: {
                    [invoiceIndex]: { group: { $set: action.group } },
                },
            });
        case "CHANGE_INVOICE_STATUS":
            invoiceIndex = state.invoices.findIndex(
                ({ uid }) => uid === action.invoiceId
            );
            if (invoiceIndex === -1)
                throw new Error(
                    `Invoice with uid ${action.invoiceId} not found`
                );
            return update(state, {
                invoices: {
                    [invoiceIndex]: { closed: { $set: action.closed } },
                },
            });
        case "CHANGE_INVOICE_LINE":
            invoiceIndex = state.invoices.findIndex(
                ({ uid }) => uid === action.invoiceId
            );
            if (invoiceIndex === -1)
                throw new Error(
                    `Invoice with uid ${action.invoiceId} not found`
                );
            let newState = update(state, {
                invoices: {
                    [invoiceIndex]: {
                        invoiceLines: {
                            [action.lineIndex]: {
                                [action.fieldName]: { $set: action.value },
                            },
                        },
                    },
                },
            });

            newState.invoices[invoiceIndex].total = newState.invoices[
                invoiceIndex
            ].invoiceLines.reduce((total, invoiceLine) => {
                return total + invoiceLine.quantity * invoiceLine.price;
            }, 0);
            return newState;
        default:
            return state;
    }
};
const DataProvider = memo(({ children }) => {
    const value = useReducer(reducer, data);
    return (
        <DataContext.Provider value={value}>{children}</DataContext.Provider>
    );
});

const useData = () => {
    return useContext(DataContext);
};

export { DataProvider, useData };
