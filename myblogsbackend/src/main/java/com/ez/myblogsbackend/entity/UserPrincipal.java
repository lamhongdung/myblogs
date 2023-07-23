package com.ez.myblogsbackend.entity;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

// map User to UserPrincipal
public class UserPrincipal implements UserDetails {
    private User user;

    public UserPrincipal(User user) {
        this.user = user;
    }

    // authorization
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        List<GrantedAuthority> authorities = new ArrayList<>();

        // add role "ROLE_USER"
        authorities.add(new SimpleGrantedAuthority(this.user.getRole()));

        return authorities;

    } // end of getAuthorities()

    @Override
    public String getPassword() {
        return this.user.getPassword();
    }

    // username = email address
    @Override
    public String getUsername() {
        return this.user.getEmail();
    }

    // account has never expired
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    // account has never locked
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    // no need re-enter credential(email and password)
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    // always enable
    @Override
    public boolean isEnabled() {

        return true;
    }
}
