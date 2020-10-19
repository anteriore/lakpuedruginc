package com.wyvernlabs.ldicp.spring.events.superadmin.web.rnd;

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

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.FinishedGood;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.MoInventory;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.FinishedGoodRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.InventoryRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.MoInventoryRepository;

@RestController
@RequestMapping("rest/moInventory")
public class MoInventoryRestController {
    private static final Logger logger = LoggerFactory.getLogger(MoInventoryRestController.class);

    @Autowired
    private MoInventoryRepository moInventoryRepository;
    @Autowired
    private InventoryRepository inventoryRepository;
    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private FinishedGoodRepository finishedGoodRepository;

    @PostMapping
    public MoInventory upsert(@RequestBody MoInventory moInventory) {
        inventoryRepository.saveAll(moInventory.getInventoryList());
        return moInventoryRepository.save(moInventory);
    }

    /**
     * This actually also increments moNumber
     * 
     * @param moInventory
     * @return
     */
    @PostMapping("/lotnumber")
    public MoInventory saveWithLotNumber(@RequestBody MoInventory moInventory) {
        MoInventory lastMoInventory = moInventoryRepository.getLastMoInventory();
        int lotNumber = 0;
        int moNumber = 0;
        if (lastMoInventory != null) {
            lotNumber = lastMoInventory.getLotNumber();
            moNumber = lastMoInventory.getMoNumber();
        }

        moInventory.setLotNumber(++lotNumber);
        moInventory.setMoNumber(++moNumber);
        inventoryRepository.saveAll(moInventory.getInventoryList());
        return moInventoryRepository.save(moInventory);
    }

    @GetMapping("/{id}")
    public MoInventory get(@PathVariable Long id) {
        return moInventoryRepository.getOne(id);
    }

    @GetMapping("/company/{companyId}")
    public List<MoInventory> listByCompany(@PathVariable Long companyId) {
        Company company = companyRepository.getOne(companyId);
        return moInventoryRepository.findByCompany(company);
    }

    @GetMapping("/nonlotnumber/company/{companyId}")
    public List<MoInventory> listByCompanyAndNonLotNumber(@PathVariable Long companyId) {
        Company company = companyRepository.getOne(companyId);
        return moInventoryRepository.findByNonLotNumber(company);
    }

    @GetMapping("/remainingBatchSize/company/{companyId}")
    public List<MoInventory> listByCompanyAndremainingBatchSize(@PathVariable Long companyId) {
        Company company = companyRepository.getOne(companyId);
        return moInventoryRepository.findByNonZeroRemainingBatchSize(company);
    }

    @GetMapping("/finishedGood/{finishGoodId}")
    public List<MoInventory> listByFinishedGood(@PathVariable Long finishedGoodId) {
        FinishedGood finishedGood = finishedGoodRepository.getOne(finishedGoodId);
        return moInventoryRepository.findByFinishedGood(finishedGood);
    }

    @GetMapping()
    public List<MoInventory> list() {
        return moInventoryRepository.findAll();
    }

}
