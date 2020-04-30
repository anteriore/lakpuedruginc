package com.wyvernlabs.ldicp.spring.events.superadmin.service;

import java.util.Date;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductInventory;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductMovement;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductMovementItem;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductStockCard;
import com.wyvernlabs.ldicp.spring.events.superadmin.enums.ProductMovementType;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.DepotRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductInventoryRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductMovementRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductStockCardRepository;

@Service
@Transactional
public class ProductMovementService {
	@Autowired
	private ProductMovementRepository productMovementRepository;
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private ProductInventoryRepository productInventoryRepository;
	@Autowired
	private DepotRepository depotRepository;
	@Autowired
	private ProductStockCardService productStockCardService;
	/*
	 * @Transactional public ProductMovement saveProductMovement(ProductMovement
	 * productMovement) { ProductStockCard productStockCard = new
	 * ProductStockCard(); productStockCard.setDate(new Date());
	 * productStockCard.setQuantity(productMovement.getQuantity());
	 * productStockCard.setUser(productMovement.getRequestedBy());
	 * productStockCard.setAction("PM-" + productMovement.getType()); Product
	 * product = productRepository.findByFinishedGoodAndLotNumber(
	 * productMovement.getProduct().getFinishedGood(),
	 * productMovement.getProduct().getLotNumber()); Depot depot =
	 * depotRepository.getOne(productMovement.getDepot().getId());
	 * if(productMovement.getType().equals(ProductMovementType.IN)) { if(product !=
	 * null) { ProductInventory productInventory =
	 * productInventoryRepository.findByProductAndDepot(product, depot);
	 * if(productInventory != null) {
	 * productInventory.setQuantity(productInventory.getQuantity() +
	 * productMovement.getQuantity());
	 * productInventoryRepository.save(productInventory); }else { productInventory =
	 * new ProductInventory(); productInventory.setDepot(depot);
	 * productInventory.setProduct(product);
	 * productInventory.setQuantity(productMovement.getQuantity());
	 * productInventoryRepository.save(productInventory); } }else { product =
	 * productRepository.save(productMovement.getProduct()); ProductInventory
	 * productInventory = new ProductInventory(); productInventory.setDepot(depot);
	 * productInventory.setProduct(product);
	 * productInventory.setQuantity(productMovement.getQuantity());
	 * productInventoryRepository.save(productInventory); }
	 * 
	 * 
	 * productStockCard.setProduct(product); productStockCard.setSign("IN");
	 * 
	 * }else if(productMovement.getType().equals(ProductMovementType.OUT) ||
	 * productMovement.getType().equals(ProductMovementType.SHIP)) {
	 * ProductInventory productInventory =
	 * productInventoryRepository.findByProductAndDepot(product, depot);
	 * productInventory.setQuantity(productInventory.getQuantity() -
	 * productMovement.getQuantity());
	 * productInventoryRepository.save(productInventory);
	 * 
	 * productStockCard.setProduct(product); productStockCard.setSign("OUT"); }
	 * 
	 * productStockCardRepository.save(productStockCard); return
	 * productMovementRepository.save(productMovement); }
	 */

	@Transactional
	public ProductMovement saveProductMovement(ProductMovement productMovement) {
		Long id = productMovementRepository.getMaxId();
		if (id == null) {
			id = 0L;
		}

		productMovement.setNumber("FGRIS-" + ++id);
		for (ProductMovementItem productMovementItem : productMovement.getProducts()) {
			ProductInventory inventory = productInventoryRepository
					.findByProductAndDepot(productMovementItem.getProduct(), productMovement.getDepot());
			if (productMovement.getType().equals(ProductMovementType.OUT)) {
				inventory.setQuantity(inventory.getQuantity() - productMovementItem.getQuantity());
			} else if (productMovement.getType().equals(ProductMovementType.IN)) {
				if (inventory != null) {
					inventory.setQuantity(inventory.getQuantity() + productMovementItem.getQuantity());
				} else {
					inventory = new ProductInventory();
					inventory.setCompany(productMovement.getCompany());
					inventory.setDepot(productMovement.getDepot());
					inventory.setProduct(productMovementItem.getProduct());
					inventory.setQuantity(productMovementItem.getQuantity());
				}
			}
			productInventoryRepository.save(inventory);
			productStockCardService.saveProductStockCard("FGRIS", productMovement.getCompany(),
					productMovement.getDepot(), productMovement.getDate(), productMovementItem.getQuantity(),
					productMovement.getRemarks(), productMovement.getRequestedBy(),
					productMovement.getType().toString(), productMovementItem.getProduct());

		}

		return productMovementRepository.save(productMovement);
	}
}
