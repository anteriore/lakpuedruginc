package com.wyvernlabs.ldicp.spring.events.superadmin.data.json;

import com.dropbox.core.DbxException;
import com.dropbox.core.DbxRequestConfig;
import com.dropbox.core.v2.DbxClientV2;
import com.dropbox.core.v2.users.FullAccount;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wyvernlabs.ldicp.spring.events.superadmin.data.CompanyData;
import com.wyvernlabs.ldicp.spring.events.superadmin.data.GroupData;
import com.wyvernlabs.ldicp.spring.events.superadmin.data.PermissionsData;
import com.wyvernlabs.ldicp.spring.events.superadmin.data.UserData;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.*;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.*;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.List;

@Component
public class LdiFgJsonExecuteInitData {
    private static final Logger logger = LoggerFactory.getLogger(LdiFgJsonExecuteInitData.class);
    private static final String DROPBOX_ACCESS_TOKEN = "wggYiXoewBAAAAAAAAAACYA-Xl8OKc7H9-t7JhAut3Tvj6pFyiAyUkLFWRWFS3e4";
    ObjectMapper om = new ObjectMapper();

    @Autowired
    private UnitRepository unitRepository;
    @Autowired
    private ClassificationRepository classificationRepository;
    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private DepartmentRepository departmentRepository;
    @Autowired
    private AreaRepository areaRepository;
    @Autowired
    private DepotRepository depotRepository;
    @Autowired
    private UserData userData;
    @Autowired
    private CompanyData companyData;
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private VendorRepository vendorRepository;
    @Autowired
    private PermissionsData permissionData;
    @Autowired
    private ItemTypeRepository itemTypeRepository;
    @Autowired
    private GroupData groupData;
    @Autowired
    private FinishedGoodRepository finishedGoodRepository;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private ItemRepository itemRepository;

    //@PostConstruct
    public void init() {
        logger.info("LDI Loading data from client");
        DbxRequestConfig config = new DbxRequestConfig("ldi-project");
        DbxClientV2 cliente = new DbxClientV2(config, DROPBOX_ACCESS_TOKEN);

        try {
            FullAccount account = cliente.users().getCurrentAccount();
            System.out.println(account.getName().getDisplayName());
        }
        catch (DbxException dbxe)
        {
            dbxe.printStackTrace();
        }
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
//            companyData.init();
                    List<Unit> units = om.readValue(IOUtils.toString(cliente.files().downloadBuilder("/json-data/ldi-fg/unit.json").start().getInputStream(), "UTF-8"), new TypeReference<List<Unit>>() {
                    });
                    unitRepository.save(units);
                    List<Classification> classifications = om.readValue(IOUtils.toString(cliente.files().downloadBuilder("/json-data/ldi-fg/classification.json").start().getInputStream(), "UTF-8"), new TypeReference<List<Classification>>() {
                    });
                    classificationRepository.save(classifications);

                    Company lcpi = companyRepository.findAll().get(0);
                    logger.info("====> company: " + lcpi.getName() + ", id: " + lcpi.getId());
                    //lcpi department
                    List<Department> departments = om.readValue(IOUtils.toString(cliente.files().downloadBuilder("/json-data/ldi-fg/department.json").start().getInputStream(), "UTF-8"), new TypeReference<List<Department>>() {
                    });

                    for (Department department : departments) {
                        department.setCompany(lcpi);
                    }

                    departmentRepository.save(departments);


                    //lcpi area
                    List<Area> areas = om.readValue(IOUtils.toString(cliente.files().downloadBuilder("/json-data/ldi-fg/area.json").start().getInputStream(), "UTF-8"), new TypeReference<List<Area>>() {
                    });

                    for (Area area : areas) {
                        area.setCompany(lcpi);
                    }

                    areaRepository.save(areas);


                    //lcpi depot
                    List<Depot> depots = om.readValue(IOUtils.toString(cliente.files().downloadBuilder("/json-data/ldi-fg/depot.json").start().getInputStream(), "UTF-8"), new TypeReference<List<Depot>>() {
                    });

                    for (Depot depot : depots) {
                        depot.setCompany(lcpi);
                        depot.setArea(areaRepository.findByCompanyAndCode(lcpi, depot.getCode()));
                    }

                    depotRepository.save(depots);

//            userData.init();


                    //lcpi clients
                    List<Client> clients = om.readValue(IOUtils.toString(cliente.files().downloadBuilder("/json-data/ldi-fg/client.json").start().getInputStream(), "UTF-8"), new TypeReference<List<Client>>() {
                    });

                    for (Client client : clients) {
                        client.setCompany(lcpi);
                    }

                    clientRepository.save(clients);

                    //lcpi vendors
                    List<Vendor> vendors = om.readValue(IOUtils.toString(cliente.files().downloadBuilder("/json-data/ldi-fg/supplier.json").start().getInputStream(), "UTF-8"), new TypeReference<List<Vendor>>() {
                    });

                    for (Vendor vendor : vendors) {
                        vendor.setCompany(lcpi);
                    }

                    vendorRepository.save(vendors);


//            permissionData.init();


                    //lcpi itemtypes


                    List<Item> items = om.readValue(IOUtils.toString(cliente.files().downloadBuilder("/json-data/ldi-fg/materialrmpm.json").start().getInputStream(), "UTF-8"), new TypeReference<List<Item>>() {
                    });
                    for (Item item : items) {
                        List<ItemType> itemTypes = itemTypeRepository.findByCode(item.getCode());
                        ItemType itemType = new ItemType();
                        if (itemTypes.size() == 0) {
                            itemType.setName(item.getTypeString());
                            itemType.setCode(item.getTypeString());
                            itemType = itemTypeRepository.save(itemType);
                        } else {
                            itemType = itemTypes.get(0);
                        }

                        item.setType(itemType);
                        if (item.getActive()) {
                            itemRepository.save(item);
                        }
                    }


                    groupData.init();


                    //lcpi itemtypes
                    List<FinishedGood> finishedGoods = om.readValue(IOUtils.toString(cliente.files().downloadBuilder("/json-data/ldi-fg/ldi-fg-finishedgood2.json").start().getInputStream(), "UTF-8"), new TypeReference<List<FinishedGood>>() {
                    });
                    finishedGoodRepository.save(finishedGoods);

//            //lcpi itemtypes
//            List<Employee> employees = om.readValue(new File(classLoader.getResource("/json-data/ldi-fg/employee.json").getFile()), new TypeReference<List<Employee>>() {
//            });
//            employeeRepository.save(employees);

                } catch (IOException e) {
                    e.printStackTrace();
                } catch (DbxException dbxe) {
                    dbxe.printStackTrace();
                }
            }
        }).start();

    }
}

