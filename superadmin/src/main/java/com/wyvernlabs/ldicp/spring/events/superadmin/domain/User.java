package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import java.util.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.persistence.*;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.*;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCrypt;
//import org.springframework.security.crypto.password.PasswordEncoder;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;
    private String firstName;
    private String lastName;
    private String middleInitial;
    private String email;
    private String password;
    private boolean active = true;
    @OneToOne
    private Company company;
    private String employeeType;
    @OneToOne
    private Department department;
    @ManyToMany
    private Set<Depot> depots;

    private String[] roles;

   // @Autowired
   // private PasswordEncoder passwordEncoder;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @MapKey(name = "code")
    private Map<String, UserPermission> permissions;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Set<Depot> getDepots() {
        return depots;
    }

    public void setDepots(Set<Depot> depots) {
        this.depots = depots;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMiddleInitial() {
        return middleInitial;
    }

    public void setMiddleInitial(String middleInitial) {
        this.middleInitial = middleInitial;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
       
        //this.password =  passwordEncoder.encode(password);
        this.password=password;
    }

    public Company getCompany() {
        return company;
    }
    public void setActive(boolean active){
        this.active=active;
    }
    public boolean getActive(){
        return active;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public String getEmployeeType() {
        return employeeType;
    }

    public void setEmployeeType(String employeeType) {
        this.employeeType = employeeType;
    }

    public String[] getRoles() {
        return roles;
    }

    public void setRoles(String[] roles) {
        this.roles = roles;
    }

    public Map<String, UserPermission> getPermissions() {
        return permissions;
    }

    public void setPermissions(Map<String, UserPermission> permissions) {
        this.permissions = permissions;
    }

    @Override
    public String toString() {
        return "User [id=" + id + 
        ", firstName=" + firstName + 
        ", lastName=" + lastName + 
        ", middleInitial="  + middleInitial + 
        ", email=" + email + 
        ", password=" + "XD" + 
        ", company=" + company  + 
        ", employeeType=" + employeeType + 
        ", department=" + department + 
        ", depots=" + depots + 
        ", roles="+ Arrays.toString(roles) + 
        ", permissions=" + permissions + "]";
    }

}
