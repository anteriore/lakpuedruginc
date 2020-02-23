package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.FinishedGood;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Recipe;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
	public List<Recipe> findByStatus(String status);
	public List<Recipe> findByFinishedGood(FinishedGood finishedGood);
}
