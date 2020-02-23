package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import javax.persistence.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
public class PromoSlip extends SalesSlip {

}
