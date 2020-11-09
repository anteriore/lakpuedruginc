
import PurchaseRequests from '../../screens/Dashboard/PurchaseRequests/';
import ReceivingReceipts from '../../screens/Dashboard/ReceivingReceipts/';
import ApprovedReceipts from '../../screens/Dashboard/ApprovedReceipts/';

export const modules = [
    {
        title: "Purchase Requests",
        path: "/purchase",
        component: PurchaseRequests
    },
    {
        title: "Receiving Receipts",
        path: "/receiving",
        component: ReceivingReceipts
    },
    {
        title: "Approved Receipts",
        path: "/approved",
        component: ApprovedReceipts
    },
    {
        title: "Material Re-evaluations",
        path: "material/reevaluation",
        component: PurchaseRequests
    },
    {
        title: "Inventory",
        path: "inventory",
        component: PurchaseRequests
    },
    {
        title: "Material Issuance Slips",
        path: "material/issueance",
        component: PurchaseRequests
    },
    {
        title: "Material Receiving Slips",
        path: "material/receiving",
        component: PurchaseRequests
    },
    {
        title: "Inventory Movement Slips",
        path: "inventory/movement",
        component: PurchaseRequests
    },
    {
        title: "Product Movements",
        path: "product/movement",
        component: PurchaseRequests
    },
    {
        title: "Product Inventory",
        path: "product/inventory",
        component: PurchaseRequests
    },
    {
        title: "FG-IS",
        path: "fgis",
        component: PurchaseRequests
    },
    {
        title: "FG-RS",
        path: "fgrs",
        component: PurchaseRequests
    },
    {
        title: "Depot Inventory",
        path: "depot",
        component: PurchaseRequests
    },
    {
        title: "Employee",
        path: "employee",
        component: PurchaseRequests
    },
    {
        title: "Job Order",
        path: "joborder",
        component: PurchaseRequests
    },
    {
        title: "Engineering Items",
        path: "engineering/items",
        component: PurchaseRequests
    },
    {
        title: "Engineering Inventory",
        path: "engineering/inventory",
        component: PurchaseRequests
    },
    {
        title: "Account Summary Reports",
        path: "account/summary",
        component: PurchaseRequests
    },
    {
        title: "Sales Reports",
        path: "sales",
        component: PurchaseRequests
    }
]