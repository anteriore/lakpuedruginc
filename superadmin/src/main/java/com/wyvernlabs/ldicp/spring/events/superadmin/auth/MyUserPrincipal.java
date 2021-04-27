package com.wyvernlabs.ldicp.spring.events.superadmin.auth;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.*;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.Hibernate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class MyUserPrincipal implements UserDetails {
    private Long id;
    private String email;
    @JsonIgnore
    private String password;
    private final String[] roles;

    // required info
    private String firstName;
    private String middleInitial;
    private String lastName;
    private Company company;
    private String employeeType;
    private Department department;
    private Map<String, UserPermission> permissions;



    public MyUserPrincipal(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.firstName = user.getFirstName();
        this.middleInitial = user.getMiddleInitial();
        this.lastName = user.getLastName();
        this.company = user.getCompany();
        this.employeeType = user.getEmployeeType();
        this.department = user.getDepartment();
        this.permissions = user.getPermissions();
        this.roles = (user.getRoles() == null) ? new String[] {"USER"} : user.getRoles();
    }

    public Long getId() {
        return id;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return AuthorityUtils.createAuthorityList((this.roles));
    }

    public String getEmail() {
        return this.email;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public String getMiddleInitial() {
        return this.middleInitial;
    }

    public String getLastName() {
        return this.lastName;
    }

    public Company getCompany() {
        return this.company;
    }

    public String getEmployeeType() {
        return this.employeeType;
    }

    public Department getDepartment() {
        return this.department;
    }

    public Map<String, UserPermission> getPermissions() {
        return permissions;
    }

    @JsonIgnore
    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}

