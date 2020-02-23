package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.AccountTitleEntry;

public interface AccountTitleEntryRepository extends JpaRepository<AccountTitleEntry, Long> {
	
	@Query("SELECT at.title as title, at.type as type, entry.amount as amount FROM AccountTitleEntry entry JOIN entry.accountTitle at WHERE entry.id IN :entryIds GROUP BY at.id")
	public List<Map<String, Object>> testfunction(@Param("entryIds") Long[] objects);
}
