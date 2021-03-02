package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import java.util.*;

import javax.transaction.Transactional;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.*;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.DepotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.DepartmentRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.UserRepository;

@Component
public class UserData {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private DepartmentRepository departmentRepository;
    @Autowired
    private DepotRepository depotRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public void init() {
        Company c1 = companyRepository.getOne(1L);
        Department d1 = departmentRepository.getOne(1L);
        Depot depot = depotRepository.getOne(1L);
        User u = new User();
        u.setFirstName("Katharine");
        u.setLastName("Guzman");
        u.setEmail("katharine@yahoo.com");
        u.setMiddleInitial("M");
        u.setPassword(passwordEncoder.encode("test"));
        //u.setPassword("test");
        u.setActive(true);
        u.setCompany(c1);
        u.setDepartment(d1);

        Set<Depot> depots = new HashSet<>();
        depots.add(depot);
        u.setDepots(depots);

        u.setRoles(new String[] { "ACTUATOR", "USER" });

        Map<String, UserPermission> permissions = new HashMap<>();
        /*UserPermission p0 = new UserPermission();
        p0.setCode("department-areas");
        p0.setActions("crud");
        permissions.put(p0.getCode(), p0);

        UserPermission p1 = new UserPermission();
        p1.setCode("group-categories");
        p1.setActions("rud");
        permissions.put(p1.getCode(), p1);

        UserPermission p2 = new UserPermission();
        p2.setCode("superadmin");
        p2.setActions("crud");
        permissions.put(p2.getCode(), p2);*/

        String[] permissionString = {
            //dashboard
            "purchase-requests", 
            "receiving-receipts", 
            "approved-receipts", 
            "material-reevaluations",
            "inventory",
            "material-issueance",
            "material-receiving",
            "inventory-movement",
            "product-movement",
            "product-inventory",
            "fgis",
            "fgrs",
            "depot-inventory",
            "employees",
            "job-orders",
            "engineering-items",
            "engineering-inventory",
            "account-summary",
            "sales-reports",
            //maintenance
            "finished-goods",
            "clients",
            "vendors",
            "group-categories",
            "department-areas",
            "items",
            "units",
            "items-types",
            "depots",
            "products",
            "procedures",
            "production-areas",
            "memo-types",
            "bank-accounts",
            "product-divisions",
            "region-codes",
            "cluster-codes",
            "institutional-codes",
            "account-codes",
            "province-codes",
            "sales-reps",
            "zip-codes",
            "product-categories",
            //users
            "users",
            //accounting
            "purchase-vouchers",
            "journal-vouchers",
            "vouchers-payables",
            "account-titles",
            "cheque-printings",
            "cheque-disbursement-vouchers",
            "credit-memos",
            "debit-memos",
            "cash-receipt-vouchers",
            "pdc-disbursements",
            "pdc-vouchers",
            //sales
            "sales-orders",
            "order-slips",
            "sales-invoices",
            "acknowledgement-receipts",
            "return-slips",
            "sales-journal-vouchers",
            "official-receipts",
            //purchasing
            "purchase-orders"
        };
        UserPermission p0;
        for(int i = 0; i < permissionString.length; i++){
            p0 = new UserPermission();
            p0.setCode(permissionString[i]);
            p0.setActions("crud");
            permissions.put(p0.getCode(), p0);
        }

        

        u.setPermissions(permissions);
        userRepository.save(u);

    }
}
