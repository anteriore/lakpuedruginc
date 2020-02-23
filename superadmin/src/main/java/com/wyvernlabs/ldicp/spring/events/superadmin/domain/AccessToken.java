package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Date;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
public class AccessToken {
    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private String token;

    @JsonIgnore
    @ManyToOne
    private User user;

    @Column
    private Date expiry;

    protected AccessToken()
    {
        /* Reflection instantiation */
    }

    public AccessToken(User user, String token)
    {
        this.user = user;
        this.token = token;
    }

    public AccessToken(User user, String token, Date expiry)
    {
        this(user, token);
        this.expiry = expiry;
    }

    public Long getId()
    {
        return this.id;
    }

    public String getToken()
    {
        return this.token;
    }

    public User getUser()
    {
        return this.user;
    }

    public Date getExpiry()
    {
        return this.expiry;
    }

    public boolean isExpired()
    {
        if (null == this.expiry) {
            return false;
        }

        return this.expiry.getTime() > System.currentTimeMillis();
    }

    @Override
    public String toString() {
        return "AccessToken{" +
                "id=" + id +
                ", token='" + token + '\'' +
                ", user=" + user +
                ", expiry=" + expiry +
                '}';
    }
}
