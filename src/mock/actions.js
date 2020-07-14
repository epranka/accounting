export const changeInvoiceLine = (
    dispatch,
    invoiceId,
    lineIndex,
    fieldName,
    value
) => {
    dispatch({
        type: "CHANGE_INVOICE_LINE",
        invoiceId,
        lineIndex,
        fieldName,
        value,
    });
};

export const changeInvoiceStatus = (dispatch, invoiceId, closed) => {
    dispatch({
        type: "CHANGE_INVOICE_STATUS",
        invoiceId,
        closed,
    });
};

export const changeInvoiceGroup = (dispatch, invoiceId, group) => {
    dispatch({
        type: "CHANGE_INVOICE_GROUP",
        invoiceId,
        group,
    });
};
