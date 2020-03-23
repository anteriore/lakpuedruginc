package com.wyvernlabs.ldicp.spring.events.superadmin.web;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Procedures;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProcedureArea;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProcedureAreaRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProcedureRepository;

@RestController
@RequestMapping("rest/procedures")
public class ProcedureRestController {
    private static final Logger logger = LoggerFactory.getLogger(ProcedureRestController.class);

    @Autowired
    private ProcedureRepository procedureRepository;
    @Autowired
    private ProcedureAreaRepository procedureAreaRepository;

    @GetMapping("/{id}")
    public Procedures get(@PathVariable Long id) {
        return procedureRepository.getOne(id);
    }

    @GetMapping()
    public List<Procedures> list() {
        return procedureRepository.findAll();
    }

    @PostMapping()
    public Procedures upsert(@RequestBody Procedures depot) {
        return procedureRepository.save(depot);
    }

    @PostMapping("/delete")
    public boolean delete(@RequestBody Long id) {
        procedureRepository.delete(id);
        return true;
    }

    @GetMapping("/area/{id}")
    public List<Procedures> listByArea(@PathVariable Long id) {
        ProcedureArea procedureArea = procedureAreaRepository.findOne(id);
        return procedureRepository.findByProcedureArea(procedureArea);
    }

}
