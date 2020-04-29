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

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.DebitMemo;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Depot;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.DebitMemoRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.DepotRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.MemoSlipService;

@RestController
@RequestMapping("rest/debit-memos")
public class DebitMemoRestController {
    private static final Logger logger = LoggerFactory.getLogger(DebitMemoRestController.class);

    @Autowired
    private DebitMemoRepository debitMemoRepository;

    @Autowired
    private DepotRepository depotRepository;

    @Autowired
    private MemoSlipService memoSlipService;

    @GetMapping("/{id}")
    public DebitMemo get(@PathVariable Long id) {
        return debitMemoRepository.getOne(id);
    }

    @GetMapping()
    public List<DebitMemo> list() {
        return debitMemoRepository.findAll();
    }

    @PostMapping()
    public DebitMemo upsert(@RequestBody DebitMemo debitMemo) {
        return (DebitMemo) memoSlipService.saveMemoSlip(debitMemo);
    }

    @PostMapping("/delete")
    public boolean delete(@RequestBody Long id) {
        debitMemoRepository.deleteById(id);
        return true;
    }

    @GetMapping("/depot/{depotId}")
    public List<DebitMemo> listByDepot(@PathVariable Long depotId) {
        Depot depot = depotRepository.getOne(depotId);
        return debitMemoRepository.findByDepot(depot);
    }
}
