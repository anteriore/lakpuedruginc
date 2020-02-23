package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Category;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Group;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.GroupRepository;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class GroupData {

	private CompanyRepository companyRepository;
	private GroupRepository groupRepository;

	public GroupData(CompanyRepository companyRepository, GroupRepository groupRepository) {
		this.companyRepository = companyRepository;
		this.groupRepository = groupRepository;
	}

	public void init() {
		Company c1 = companyRepository.getOne(1L);
		Group g1 = new Group();
		g1.setName("Miscellaneous");
		g1.setCompany(c1);
		List<Category> g1Category = new ArrayList<>();
		Category c1g1 = new Category();
		c1g1.setName("C1 G1 Capital Expenditure 1");
		g1Category.add(c1g1);
		Category c2g1 = new Category();
		c2g1.setName("C1 G1 Capital Expenditure 2");
		g1Category.add(c2g1);

		g1.setCategories(g1Category);
		groupRepository.save(g1);
	}
}
