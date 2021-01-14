package com.wyvernlabs.ldicp.spring.events.superadmin.web.maintenance;

import java.util.List;


import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import org.springframework.http.ResponseEntity;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Unit;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.UnitRepository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Item;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ItemRepository;

@RestController
@RequestMapping("rest/units")
public class UnitRestController {
	private static final Logger logger = LoggerFactory.getLogger(ClientRestController.class);

	@Autowired
	private UnitRepository unitRepository;
	@Autowired
	private ItemRepository itemRepository;

	@GetMapping("/{id}")
	public Unit get(@PathVariable Long id) {
		return unitRepository.getOne(id);
	}

	@GetMapping()
	public List<Unit> list() {
		return unitRepository.findAll();
	}

	@PostMapping()
	public Unit upsert(@RequestBody Unit client) {
		return unitRepository.save(client);
	}

	@PostMapping("/delete")
	public ResponseEntity delete(@RequestBody Long id) {
		/*
		unitRepository.deleteById(id);
			
		
		return true;
*/
Optional<Unit> optinalEntity =  unitRepository.findById(id);
Unit unit = optinalEntity.get();


		//Unit u=unitRepository.findById(id);
		List <Item> x=itemRepository.findByUnitId(unit.getId());

		System.out.println(x.size());

		if(x.size()>0){
			return ResponseEntity.unprocessableEntity().body("Failed to delete the specified organization due to dependencies");
		}else
		{
			unitRepository.deleteById(id);
			return ResponseEntity.ok("Successfully deleted the specified organization");
		}


		//return ResponseEntity.unprocessableEntity().body("Failed to delete the specified organization due to dependencies");
	/*
        if(unitRepository.findById(id).isPresent()) {

			if(itemRepository.findbyUnit(unitRepository.findById(id)).isPresent()){
				return ResponseEntity.unprocessableEntity().body("Failed to delete the specified organization due to dependencies");
			}



			
			unitRepository.deleteById(id);
			
						if (unitRepository.findById(id).isPresent())
			
							return ResponseEntity.unprocessableEntity().body("Failed to delete the specified organization");
			
						else return ResponseEntity.ok("Successfully deleted the specified organization");
			
					} else return ResponseEntity.unprocessableEntity().body("Specified organization not present");




	


*/


}
}
