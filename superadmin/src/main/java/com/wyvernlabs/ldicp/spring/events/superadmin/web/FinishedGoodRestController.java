package com.wyvernlabs.ldicp.spring.events.superadmin.web;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.FinishedGood;
import com.wyvernlabs.ldicp.spring.events.superadmin.helper.OffsetBasedPageRequest;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.FinishedGoodRepository;

@RestController
@RequestMapping("rest/finished-goods")
public class FinishedGoodRestController {
    private static final Logger logger = LoggerFactory.getLogger(FinishedGoodRestController.class);

    private FinishedGoodRepository finishedGoodRepository;

    public FinishedGoodRestController(FinishedGoodRepository finishedGoodRepository) {
        this.finishedGoodRepository = finishedGoodRepository;
    }

    @GetMapping("/{id}")
    public FinishedGood get(@PathVariable Long id) {
        return finishedGoodRepository.getOne(id);
    }

    @GetMapping()
    public List<FinishedGood> list() {
        return finishedGoodRepository.findAll();
    }

    @GetMapping("/paginate/{itemsPerPage}/{offset}")
    public Page<FinishedGood> paginate(@PathVariable("itemsPerPage") Integer itemsPerPage,
            @PathVariable("offset") Integer offset) {
        Pageable pageable = new OffsetBasedPageRequest(offset, itemsPerPage);
        return finishedGoodRepository.findAll(pageable);
    }

    @GetMapping("/count")
    public long count() {
        return finishedGoodRepository.count();
    }

    @PostMapping()
    public FinishedGood upsert(@RequestBody FinishedGood finishedGood) {

        if (finishedGood.getId() == null) {
            if (finishedGoodRepository.findByCodeOrName(finishedGood.getCode(), finishedGood.getName()) == null)
                return finishedGoodRepository.save(finishedGood);
            else
                return null;
        } else {
            FinishedGood fg = finishedGoodRepository.getOne(finishedGood.getId());
            fg.setCode(finishedGood.getCode());
            fg.setName(finishedGood.getName());
            return finishedGoodRepository.save(fg);
        }

    }

    @PostMapping("/delete")
    public boolean delete(@RequestBody Long id) {
        finishedGoodRepository.delete(id);
        return true;
    }

}
