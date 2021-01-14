package com.wyvernlabs.ldicp.spring.events.superadmin.web.accounting;

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

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.CreditMemo;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Depot;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CreditMemoRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.DepotRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.MemoSlipRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.MemoSlipService;

@RestController
@RequestMapping("rest/credit-memos")
public class CreditMemoRestController {
    private static final Logger logger = LoggerFactory.getLogger(CreditMemoRestController.class);

    @Autowired
    private CreditMemoRepository creditMemoRepository;
    @Autowired
    private MemoSlipService memoSlipService;
    @Autowired
    private DepotRepository depotRepository;
    @Autowired
    private MemoSlipRepository memoSlipRepository;

    @GetMapping("/{id}")
    public CreditMemo get(@PathVariable Long id) {
        return creditMemoRepository.getOne(id);
    }

    @GetMapping()
    public List<CreditMemo> list() {
        return creditMemoRepository.findAll();
    }

    @PostMapping()
    public CreditMemo upsert(@RequestBody CreditMemo creditMemo) {
        return (CreditMemo) memoSlipService.saveMemoSlip(creditMemo);
    }

    @PostMapping("/delete")
    public boolean delete(@RequestBody Long id) {
        creditMemoRepository.deleteById(id);
        return true;
    }

    @GetMapping("/depot/{depotId}")
    public List<CreditMemo> listByDepot(@PathVariable Long depotId) {
        Depot depot = depotRepository.getOne(depotId);
        return creditMemoRepository.findByDepot(depot);
    }

}
