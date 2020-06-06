package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
@Entity
public class Permission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;
    private String category;
    private Integer sortOrder;

    @OneToMany(cascade = CascadeType.ALL)
    private List<PermissionSub> permissionSubs;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(Integer sortOrder) {
        this.sortOrder = sortOrder;
    }

    public List<PermissionSub> getPermissionSubs() {
        return permissionSubs;
    }

    public void setPermissionSubs(List<PermissionSub> permissionSubs) {
        this.permissionSubs = permissionSubs;
    }

    @Override
    public String toString() {
        return "Permission{" + "id=" + id + ", category='" + category + '\'' + ", sortOrder=" + sortOrder
                + ", permissionSubs=" + permissionSubs + '}';
    }
}
