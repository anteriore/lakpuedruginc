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
    private ProductDivisionData divisionData;
    @Autowired
    private ProductCategoryData categoryData;
    @PostConstruct
    public void init() {

		unitData.init();
		classificationData.init();
        companyData.init();
        departmentData.init();
        areaData.init();
        depotData.init();
        userData.init();
        clientData.init();
        vendorData.init();
        groupData.init();
        permissionData.init();
        itemTypeData.init();
        itemData.init();
        finishedGoodData.init();
        recipeData.init();
        purchaseRequestData.init();
        purchaseOrderData.init();
        receivingReceiptData.init();
        approvedReceiptData.init();
        materialReevaluationData.init();
        materialIssuanceData.init();
        materialReceivingData.init();
        inventoryMovementData.init();
        divisionData.init();
        categoryData.init();
        productData.init();
        productMovementData.init();
        moInventoryData.init();
        productIssuanceData.init();
        productReceivingData.init();
        employeeData.init();
        procedureAreaData.init();
        procedureData.init();
        salesOrderData.init();
        orderSlipData.init();
        deliveryReceiptData.init();
        moCostingData.init();
        memoTypeData.init();
        accountTitleData.init();
        bankAccountData.init();
        purchaseVoucherData.init();
	}
}
