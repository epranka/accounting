import Accounting from "./scenes/Accounting";
import Invoice from "./scenes/Invoice";
import { useData } from "./mock/DataProvider";
import { useParams } from "@reach/router";
import getInvoiceById from "./mock/helpers/getInvoiceById";

const routes = [
    {
        path: "/",
        Component: Accounting,
        breadcrumbs: () => [{ title: "Accounting", link: "/" }],
    },
    {
        path: "/invoice/:invoiceId",
        Component: Invoice,
        breadcrumbs: () => [
            { title: "Accounting", link: "/" },
            { title: "Invoice" },
            {
                title: function InvoiceTitle() {
                    const [data] = useData();
                    const { invoiceId } = useParams();
                    const invoice = getInvoiceById(
                        data.invoices,
                        parseInt(invoiceId)
                    );
                    if (!invoice) return null;
                    return invoice.title;
                },
            },
        ],
    },
];

export default routes;
