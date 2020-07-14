const getInvoiceById = (invoices, uid) => {
    return invoices.find((invoice) => invoice.uid === uid);
};

export default getInvoiceById;
