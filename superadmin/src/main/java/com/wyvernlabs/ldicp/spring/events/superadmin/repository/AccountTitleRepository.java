package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.AccountTitle;

public interface AccountTitleRepository extends JpaRepository<AccountTitle, Long>{

	AccountTitle findByTitle(String string);

	List<AccountTitle> findByType(String type);

	List<AccountTitle> findByLevel(int i);

	List<AccountTitle> findByLevelAndParent(int level, AccountTitle parent);

	List<AccountTitle> findByTitleStartingWith(String name);
}
