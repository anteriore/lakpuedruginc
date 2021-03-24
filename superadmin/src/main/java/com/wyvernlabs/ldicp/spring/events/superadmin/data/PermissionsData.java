package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Permission;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.PermissionSub;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.PermissionRepository;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class PermissionsData {

    private PermissionRepository permissionRepository;

    public PermissionsData(PermissionRepository permissionRepository) {
        this.permissionRepository = permissionRepository;
    }

    public void init() {
        /*
        Permission p0 = new Permission();
        p0.setCategory("SUPERADMIN");
        p0.setSortOrder(0);
        ArrayList<PermissionSub> p0Subs = new ArrayList<>();
        p0Subs.add(new PermissionSub(null, "Super Admin", "superadmin", 1));
        p0.setPermissionSubs(p0Subs);
        permissionRepository.save(p0);

        Permission p1 = new Permission();
        p1.setCategory("ADMIN");
        p1.setSortOrder(1);
        ArrayList<PermissionSub> p1Subs = new ArrayList<>();
        p1Subs.add(new PermissionSub(null, "Department Area & Codes", "admin-dac", 1));
        p1Subs.add(new PermissionSub(null, "Groups & Categories", "admin-gc", 2));
        p1.setPermissionSubs(p1Subs);
        permissionRepository.save(p1);

        Permission p2 = new Permission();
        p2.setCategory("MIS");
        p2.setSortOrder(2);
        ArrayList<PermissionSub> p2Subs = new ArrayList<>();
        p2Subs.add(new PermissionSub(null, "Clients", "mis-c", 1));
        p2.setPermissionSubs(p2Subs);
        permissionRepository.save(p2);

        Permission p3 = new Permission();
        p3.setCategory("MMD");
        p3.setSortOrder(3);
        ArrayList<PermissionSub> p3Subs = new ArrayList<>();
        p3Subs.add(new PermissionSub(null, "P.R.I.S", "mmd-p", 1));
        p3Subs.add(new PermissionSub(null, "Reports", "mmd-r", 2));
        p3.setPermissionSubs(p3Subs);
        permissionRepository.save(p3);

        Permission p4 = new Permission();
        p4.setCategory("R & D");
        p4.setSortOrder(4);
        ArrayList<PermissionSub> p4Subs = new ArrayList<>();
        p4Subs.add(new PermissionSub(null, "Recipe", "rnd-recipe", 1));
        p4Subs.add(new PermissionSub(null, "Reports", "rnd-report", 2));
        p4Subs.add(new PermissionSub(null, "Items", "rnd-items", 3));
        p4Subs.add(new PermissionSub(null, "Item Types", "rnd-item-types", 3));
        p4Subs.add(new PermissionSub(null, "Finished Goods", "rnd-finished-good", 4));
        p4.setPermissionSubs(p4Subs);
        permissionRepository.save(p4);

        Permission p5 = new Permission();
        p5.setCategory("PURCHASING");
        p5.setSortOrder(5);
        ArrayList<PermissionSub> p5Subs = new ArrayList<>();
        p5Subs.add(new PermissionSub(null, "Purchase Order", "purchasing-po", 1));
        p5Subs.add(new PermissionSub(null, "Reports", "purchasing-r", 2));
        p5Subs.add(new PermissionSub(null, "Vendors", "purchasing-v", 3));
        p5Subs.add(new PermissionSub(null, "Purchase Request", "purchasing-pr", 4));
        p5Subs.add(new PermissionSub(null, "Receiving Receipt", "purchasing-rr", 5));
        p5Subs.add(new PermissionSub(null, "Approved Receipt", "purchasing-ar", 6));
        p5Subs.add(new PermissionSub(null, "Material Evaluation", "purchasing-me", 6));
        p5.setPermissionSubs(p5Subs);
        permissionRepository.save(p5);

        Permission p6 = new Permission();
        p6.setCategory("COSTING");
        p6.setSortOrder(6);
        ArrayList<PermissionSub> p6Subs = new ArrayList<>();
        p6Subs.add(new PermissionSub(null, "Direct Labors", "costing-dl", 1));
        p6Subs.add(new PermissionSub(null, "Reports", "costing-r", 2));
        p6.setPermissionSubs(p6Subs);
        permissionRepository.save(p6);

        Permission p7 = new Permission();
        p7.setCategory("BUILDING1");
        p7.setSortOrder(7);
        ArrayList<PermissionSub> p7Subs = new ArrayList<>();
        p7Subs.add(new PermissionSub(null, "Job Orders", "building1-jo", 1));
        p7Subs.add(new PermissionSub(null, "Reports", "building1-r", 2));
        p7.setPermissionSubs(p7Subs);
        permissionRepository.save(p7);
        */
        
        Permission p1 = new Permission();
        p1.setCategory("Dashboard");
        p1.setSortOrder(0);
        ArrayList<PermissionSub> p1Subs = new ArrayList<>();
        p1Subs.add(new PermissionSub(null, "Purchase Requests", "purchase-requests", 1));
        p1Subs.add(new PermissionSub(null, "Receiving Receipts", "receiving-receipts", 2));
        p1Subs.add(new PermissionSub(null, "Approved Receipts", "approved-receipts", 3));
        p1Subs.add(new PermissionSub(null, "Material Re-evaluations", "material-reevaluations", 4));
        p1Subs.add(new PermissionSub(null, "Inventory", "inventory", 5));
        p1Subs.add(new PermissionSub(null, "Material Issuance Slips", "material-issueance", 6));
        p1Subs.add(new PermissionSub(null, "Material Receiving Slips", "material-receiving", 7));
        p1Subs.add(new PermissionSub(null, "Inventory Movement Slips", "inventory-movement", 8));
        p1Subs.add(new PermissionSub(null, "Product Movements", "product-movement", 9));
        p1Subs.add(new PermissionSub(null, "Product Inventory", "product-inventory", 10));
        p1Subs.add(new PermissionSub(null, "FG-IS", "fgis", 11));
        p1Subs.add(new PermissionSub(null, "FG-RS", "fgrs", 12));
        p1Subs.add(new PermissionSub(null, "Depot Inventory", "depot-inventory", 13));
        p1Subs.add(new PermissionSub(null, "Employee", "employees", 14));
        p1Subs.add(new PermissionSub(null, "Job Order", "job-orders", 15));
        p1Subs.add(new PermissionSub(null, "Engineering Items", "engineering-items", 16));
        p1Subs.add(new PermissionSub(null, "Engineering Inventory", "engineering-inventory", 17));
        p1Subs.add(new PermissionSub(null, "Account Summary Reports", "account-summary", 18));
        p1Subs.add(new PermissionSub(null, "Sales Reports", "sales-reports", 19));
        p1.setPermissionSubs(p1Subs);
        permissionRepository.save(p1);

        p1 = new Permission();
        p1.setCategory("Maintenance");
        p1.setSortOrder(1);
        p1Subs = new ArrayList<>();
        p1Subs.add(new PermissionSub(null, "Finished Goods", "finished-goods", 1));
        p1Subs.add(new PermissionSub(null, "Client", "clients", 2));
        p1Subs.add(new PermissionSub(null, "Vendor", "vendors", 3));
        p1Subs.add(new PermissionSub(null, "Groups & Categories", "group-categories", 4));
        p1Subs.add(new PermissionSub(null, "Department & Area Codes", "department-areas", 5));
        p1Subs.add(new PermissionSub(null, "Items", "items", 6));
        p1Subs.add(new PermissionSub(null, "Units", "units", 7));
        p1Subs.add(new PermissionSub(null, "Item Types", "items-types", 8));
        p1Subs.add(new PermissionSub(null, "Depots", "depots", 9));
        p1Subs.add(new PermissionSub(null, "Products", "products", 10));
        p1Subs.add(new PermissionSub(null, "Procedure", "procedures", 11));
        p1Subs.add(new PermissionSub(null, "Production Area", "production-areas", 12));
        p1Subs.add(new PermissionSub(null, "Memo Types", "memo-types", 13));
        p1Subs.add(new PermissionSub(null, "Bank Accounts", "bank-accounts", 14));
        p1Subs.add(new PermissionSub(null, "Product Divisions", "product-divisions", 15));
        p1Subs.add(new PermissionSub(null, "Region Codes", "region-codes", 16));
        p1Subs.add(new PermissionSub(null, "Cluster Codes", "cluster-codes", 17));
        p1Subs.add(new PermissionSub(null, "Institutional Codes", "institutional-codes", 18));
        p1Subs.add(new PermissionSub(null, "Account Codes", "account-codes", 19));
        p1Subs.add(new PermissionSub(null, "Province Codes", "province-codes", 20));
        p1Subs.add(new PermissionSub(null, "Sales Reps", "sales-reps", 21));
        p1Subs.add(new PermissionSub(null, "Zip Codes", "zip-codes", 22));
        p1Subs.add(new PermissionSub(null, "Product Categories", "product-categories", 23));
        p1.setPermissionSubs(p1Subs);
        permissionRepository.save(p1);

        p1 = new Permission();
        p1.setCategory("Users");
        p1.setSortOrder(2);
        p1Subs = new ArrayList<>();
        p1Subs.add(new PermissionSub(null, "Users", "users", 1));
        p1.setPermissionSubs(p1Subs);
        permissionRepository.save(p1);

        p1 = new Permission();
        p1.setCategory("Accounting");
        p1.setSortOrder(3);
        p1Subs = new ArrayList<>();
        p1Subs.add(new PermissionSub(null, "Purchase Vouchers", "purchase-vouchers", 1));
        p1Subs.add(new PermissionSub(null, "Journal Vouchers", "journal-vouchers", 2));
        p1Subs.add(new PermissionSub(null, "Vouchers Payables", "vouchers-payables", 3));
        p1Subs.add(new PermissionSub(null, "Account Titles", "account-titles", 4));
        p1Subs.add(new PermissionSub(null, "Cheque Printings", "cheque-printings", 5));
        p1Subs.add(new PermissionSub(null, "Cheque Disbursement Vouchers", "cheque-disbursement-vouchers", 6));
        p1Subs.add(new PermissionSub(null, "Credit Memos", "credit-memos", 7));
        p1Subs.add(new PermissionSub(null, "Debit Memos", "debit-memos", 8));
        p1Subs.add(new PermissionSub(null, "Cash Receipt Vouchers", "cash-receipt-vouchers", 9));
        p1Subs.add(new PermissionSub(null, "PDC Disbursements", "pdc-disbursements", 10));
        p1Subs.add(new PermissionSub(null, "PDC Vouchers", "pdc-vouchers", 11));
        p1.setPermissionSubs(p1Subs);
        permissionRepository.save(p1);

        p1 = new Permission();
        p1.setCategory("Sales");
        p1.setSortOrder(4);
        p1Subs = new ArrayList<>();
        p1Subs.add(new PermissionSub(null, "Sales Orders", "sales-orders", 1));
        p1Subs.add(new PermissionSub(null, "Order Slips", "order-slips", 2));
        p1Subs.add(new PermissionSub(null, "Sales Invoices", "sales-invoices", 3));
        p1Subs.add(new PermissionSub(null, "Acknowledgement Receipts", "acknowledgement-receipts", 4));
        p1Subs.add(new PermissionSub(null, "Return Slips", "return-slips", 5));
        p1Subs.add(new PermissionSub(null, "Sales Journal Vouchers", "sales-journal-vouchers", 6));
        p1Subs.add(new PermissionSub(null, "Official Receipts", "official-receipts", 7));
        p1.setPermissionSubs(p1Subs);
        permissionRepository.save(p1);

        p1 = new Permission();
        p1.setCategory("Purchasing");
        p1.setSortOrder(5);
        p1Subs = new ArrayList<>();
        p1Subs.add(new PermissionSub(null, "Purchase Orders", "purchase-orders", 1));
        p1.setPermissionSubs(p1Subs);
        permissionRepository.save(p1);

    }
}
