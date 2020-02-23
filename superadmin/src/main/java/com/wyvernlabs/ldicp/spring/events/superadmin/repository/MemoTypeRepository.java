package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.MemoType;

public interface MemoTypeRepository extends JpaRepository<MemoType, Long> {

	List<MemoType> findByType(String type);

}
