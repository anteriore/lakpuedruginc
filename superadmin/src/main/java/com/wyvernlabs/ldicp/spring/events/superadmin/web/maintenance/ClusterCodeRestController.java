package com.wyvernlabs.ldicp.spring.events.superadmin.web.maintenance;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ClusterCode;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ClusterCodeRepository;

@RestController
@RequestMapping("rest/cluster-codes")
public class ClusterCodeRestController {

    @Autowired
    private ClusterCodeRepository clusterCodeRepository;

    @GetMapping("/{id}")
    public ClusterCode get(@PathVariable Long id) {
        return clusterCodeRepository.getOne(id);
    }

    @GetMapping()
    public List<ClusterCode> list() {
        return clusterCodeRepository.findAll();
    }

    @PostMapping()
    public ClusterCode upsert(@RequestBody ClusterCode depot) {
        return clusterCodeRepository.save(depot);
    }

    @PostMapping("/delete")
    public boolean delete(@RequestBody Long id) {
        clusterCodeRepository.deleteById(id);
        return true;
    }
}