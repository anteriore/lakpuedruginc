package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ExecuteInitData {

    @Autowired
    private MoInventoryData moInventoryData;
    @Autowired
    private CompanyData companyData;
    @Autowired
    private UserData userData;
    @Autowired
    private DepartmentData departmentData;
    @Autowired
    private ClientData clientData;
    @Autowired
    private VendorData vendorData;
    @Autowired
    private AreaData areaData;
    @Autowired
    private GroupData groupData;
    @Autowired
    private PermissionsData permissionData;
    @Autowired
    private FinishedGoodData finishedGoodData;
    @Autowired
    private ItemData itemData;
    @Autowired
    private RecipeData recipeData;
    @Autowired
    private PurchaseRequestData purchaseRequestData;
    @Autowired
    private PurchaseOrderData purchaseOrderData;
    @Autowired
    private ItemTypeData itemTypeData;
    @Autowired
    private ReceivingReceiptData receivingReceiptData;
    @Autowired
    private ApprovedReceiptData approvedReceiptData;
    @Autowired
    private MaterialReevaluationData materialReevaluationData;
    @Autowired
    private UnitData unitData;
    @Autowired
    private ClassificationData classificationData;
    @Autowired
    private MaterialIssuanceData materialIssuanceData;
    @Autowired
    private MaterialReceivingData materialReceivingData;
    @Autowired
    private InventoryMovementData inventoryMovementData;
    @Autowired
    private DepotData depotData;
    @Autowired
    private ProductData productData;
    @Autowired
    private ProductMovementData productMovementData;
    @Autowired
    private ProductIssuanceData productIssuanceData;
    @Autowired
    private ProductReceivingData productReceivingData;
    @Autowired
    private EmployeeData employeeData;
    @Autowired
    private ProcedureData procedureData;
    @Autowired
    private ProcedureAreaData procedureAreaData;
    @Autowired
    private SalesOrderData salesOrderData;
    @Autowired
    private OrderSlipData orderSlipData;
    @Autowired
    private DeliveryReceiptData deliveryReceiptData;
    @Autowired
    private MoCostingData moCostingData;
    @Autowired
    private MemoTypeData memoTypeData;
    @Autowired
    private AccountTitleData accountTitleData;
    @Autowired
    private PurchaseVoucherData purchaseVoucherData;
    @Autowired
    private BankAccountData bankAccountData;
    @Autowired
    private ProductDivisionData productDivisionData;
    @Autowired
    private ProductCategoryData productCategoryData;
    @Autowired
    private ProvinceCodeData provinceCodeData;
    @Autowired
    private InstitutionData institutionData;
    @Autowired
    private ClusterCodeData clusterCodeData;
    @Autowired
    private SalesRepData salesRepData;

    @Autowired
    private ZipCodeData zipCodeData;


    //@PostConstruct
    public void init() {
        unitData.init();
        System.out.println("Units initialized.");
        classificationData.init();
        System.out.println("Classifications initialized.");
        companyData.init();
        System.out.println("Companies initialized.");
        departmentData.init();
        System.out.println("Departments initialized.");
        areaData.init();
        System.out.println("Areas initialized.");
        depotData.init();
        System.out.println("Depots initialized.");
        userData.init();
        System.out.println("Users initialized.");

        salesRepData.init();
        System.out.println("salesRep initialized");

        institutionData.init();
        System.out.println("institution initialized");
        
        clusterCodeData.init();
        System.out.println("cluster initialized");

        clientData.init();
        System.out.println("Clients initialized.");
        vendorData.init();
        System.out.println("Vendors initialized.");
        groupData.init();
        System.out.println("Groups initialized.");
        permissionData.init();
        System.out.println("Permissions initialized.");
        itemTypeData.init();
        System.out.println("Item Types initialized.");
        itemData.init();
        System.out.println("Items initialized.");
        finishedGoodData.init();
        System.out.println("finishedGoods initialized.");
        recipeData.init();
        System.out.println("Recipes initialized.");
        purchaseRequestData.init();
        System.out.println("Purchase Requests initialized.");
        purchaseOrderData.init();
        System.out.println("Purchase Orders initialized.");
        receivingReceiptData.init();
        System.out.println("Receiving Receipts initialized.");
        approvedReceiptData.init();
        System.out.println("Approved Receipts initialized");
        materialReevaluationData.init();
        System.out.println("Material Reevaluations initialized");
        materialIssuanceData.init();
        System.out.println("Material Issuance initialized");
        materialReceivingData.init();
        System.out.println("Material Receiving initialized");
        inventoryMovementData.init();
        System.out.println("Inventory Movement initialized");
        productDivisionData.init();
        System.out.println("Division initialized");
        productCategoryData.init();
        System.out.println("Category initialized");
        productData.init();
        System.out.println("Product initialized");
        productMovementData.init();
        System.out.println("Product Movement initialized");
        moInventoryData.init();
        System.out.println("moInventory initialized");
        productIssuanceData.init();
        System.out.println("Product Issuance initialized");
        productReceivingData.init();
        System.out.println("Product Receiving initialized");
        employeeData.init();
        System.out.println("Employee initialized");
        procedureAreaData.init();
        System.out.println("Procedure Area initialized");
        procedureData.init();
        System.out.println("Procedure initialized");
        salesOrderData.init();
        System.out.println("Sales Order initialized");
        orderSlipData.init();
        System.out.println("Order Slip initialized");
        deliveryReceiptData.init();
        System.out.println("Delivery Receipt initialized");
        moCostingData.init();
        System.out.println("moCosting initialized");
        memoTypeData.init();
        System.out.println("Memo initialized");
        accountTitleData.init();
        System.out.println("Account Title initialized");
        bankAccountData.init();
        System.out.println("Bank Account initialized");
        purchaseVoucherData.init();
        System.out.println("Purchase Voucher initialized");

        provinceCodeData.init();
        System.out.println("Province Code initialized");


        zipCodeData.init();
        System.out.println("zip Code initialized");

    }
}
