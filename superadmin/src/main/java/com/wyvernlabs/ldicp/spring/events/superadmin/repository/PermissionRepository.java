package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Area;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Permission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface PermissionRepository extends JpaRepository<Permission, Long>{

}
