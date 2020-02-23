package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {
	public List<User> findByCompany(Company company);
	public List<User> findByEmail(String email);
}
