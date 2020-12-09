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

        /*
        Permission p7 = new Permission();
        p7.setCategory("BUILDING1");
        p7.setSortOrder(7);
        ArrayList<PermissionSub> p7Subs = new ArrayList<>();
        p7Subs.add(new PermissionSub(null, "Job Orders", "building1-jo", 1));
        p7Subs.add(new PermissionSub(null, "Reports", "building1-r", 2));
        p7.setPermissionSubs(p7Subs);
        permissionRepository.save(p7);

        */
    }
}
