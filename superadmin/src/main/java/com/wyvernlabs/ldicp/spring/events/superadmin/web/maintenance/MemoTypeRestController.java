package com.wyvernlabs.ldicp.spring.events.superadmin.web.maintenance;

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

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.MemoType;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.MemoTypeRepository;

@RestController
@RequestMapping("rest/memo-types")
public class MemoTypeRestController {
    private static final Logger logger = LoggerFactory.getLogger(MemoTypeRestController.class);

    @Autowired
    private MemoTypeRepository memoTypeRepository;

    @GetMapping("/{id}")
    public MemoType get(@PathVariable Long id) {
        return memoTypeRepository.getOne(id);
    }

    @GetMapping()
    public List<MemoType> list() {
        return memoTypeRepository.findAll();
    }

    @PostMapping()
    public MemoType upsert(@RequestBody MemoType memoType) {
        return memoTypeRepository.save(memoType);
    }

    @PostMapping("/delete")
    public boolean delete(@RequestBody Long id) {
        memoTypeRepository.deleteById(id);
        return true;
    }

    @GetMapping("/type/{type}")
    public List<MemoType> listByType(@PathVariable String type) {
        return memoTypeRepository.findByType(type);
    }

}
