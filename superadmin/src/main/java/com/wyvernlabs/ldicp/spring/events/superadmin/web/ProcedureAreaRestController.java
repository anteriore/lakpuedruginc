package com.wyvernlabs.ldicp.spring.events.superadmin.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProcedureArea;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProcedureAreaRepository;
@RestController
@RequestMapping("rest/procedure-areas")
public class ProcedureAreaRestController {
	@Autowired
	private ProcedureAreaRepository procedureAreaRepository;
	
	@GetMapping("/{id}")
    public ProcedureArea get(@PathVariable Long id) {
        return procedureAreaRepository.getOne(id);
    }

    @GetMapping()
    public List<ProcedureArea> list() {
        return procedureAreaRepository.findAll();
    }

    @PostMapping()
    public ProcedureArea upsert(@RequestBody ProcedureArea depot) {
        return procedureAreaRepository.save(depot);
    }
    
    @PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
    	procedureAreaRepository.delete(id);
		return true;
    }
}
