package com.wyvernlabs.ldicp.spring.events.superadmin.web;

import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.JobOrderCostSheet;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.JobOrderCostSheetIngredient;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.JobOrderCostSheetProcedureArea;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.JobOrderCostSheetIngredientRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.JobOrderCostSheetProcedureAreaRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.JobOrderCostSheetRepository;


@RestController
@RequestMapping("rest/joCosts")
public class JobOrderCostSheetRestController {
    private static final Logger logger = LoggerFactory.getLogger(JobOrderCostSheetRestController.class);

   @Autowired
   private JobOrderCostSheetRepository jobOrderCostSheetRepository;
   @Autowired
   private JobOrderCostSheetIngredientRepository jobOrderCostSheetIngredientRepository;
   @Autowired
   private JobOrderCostSheetProcedureAreaRepository jobOrderCostSheetProcedureAreaRepository;
   @Autowired
   private CompanyRepository companyRepository;

    @PostMapping
    public JobOrderCostSheet upsert(@RequestBody JobOrderCostSheet jobOrderCostSheet) {

        Set<JobOrderCostSheetIngredient> jobOrderCostSheetIngredients = jobOrderCostSheet.getJobOrderCostSheetIngredients();

        for (JobOrderCostSheetIngredient jobOrderCostSheetIngredient : jobOrderCostSheetIngredients) {
            jobOrderCostSheetIngredientRepository.save(jobOrderCostSheetIngredient);
        }


        Set<JobOrderCostSheetProcedureArea> jobOrderCostSheetProcedureAreas = jobOrderCostSheet.getJobOrderCostSheetProcedureAreas();

        for (JobOrderCostSheetProcedureArea jobOrderCostSheetProcedureArea : jobOrderCostSheetProcedureAreas) {
            jobOrderCostSheetProcedureAreaRepository.save(jobOrderCostSheetProcedureArea);
        }

        return jobOrderCostSheetRepository.save(jobOrderCostSheet);
    }

    @GetMapping("/{id}")
    public JobOrderCostSheet get(@PathVariable Long id) {
        return jobOrderCostSheetRepository.getOne(id);
    }

    @GetMapping("/company/{companyId}")
    public List<JobOrderCostSheet> listByCompany(@PathVariable Long companyId) {
        Company company = companyRepository.findOne(companyId);
        return jobOrderCostSheetRepository.findByCompany(company);
    }
    @GetMapping()
    public List<JobOrderCostSheet> list() {
        return jobOrderCostSheetRepository.findAll();
    }

}
