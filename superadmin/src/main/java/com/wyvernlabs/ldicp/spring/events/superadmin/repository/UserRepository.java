package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {
	public List<User> findByCompany(Company company);
	public List<User> findByEmail(String email);
	public List<User> findByActive(boolean active);

	//@Query(value = "SELECT m FROM MoInventory m WHERE m.lotNumber IS NULL and m.company = :company")

	//@Query(value = "UPDATE m FROM user m WHERE m.id =:id")
	//void update(@Param("id") Company company);



/*
@Modifying
@Query("update User u set u.first_name = :first_name where u.id = :id")
String updatefirstname(@Param("first_name") String first_name, 
  @Param("id") int id);
*/
}
