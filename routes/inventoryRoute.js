// routes/inventoryRoute.js
const express = require("express");
const router = express.Router();
const invController = require("../controllers/invController");
const invValidate = require("../utilities/inventory-validation");
const utilities = require("../utilities");
const invCont = require("../controllers/invController");
const invValidation = require("../utilities/inventory-validation");



// Route to display inventory by classification
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to display vehicle detail
router.get("/detail/:invId", invController.buildByInvId);

// Route to show the edit inventory view by inventory id
router.get('/edit/:inv_id', invCont.editInventoryView, (error, req, res, next) => {
  console.error(error);
  res.status(500).render('errors/500');
});

router.post("/update", invValidation.inventoryRules(), invValidation.checkUpdateData, invController.updateInventory);

router.get("/delete/:inv_id", invController.buildDeleteView);

router.post("/delete", invController.deleteInventoryItem);


// Trigger‐error route (for testing)
router.get("/trigger-error", (req, res, next) => {
  try {
    throw new Error("This is an intentional error for testing.");
  } catch (error) {
    next(error);
  }
});

router.get("/getInventory/:classification_id", invController.getInventoryJSON);

// Management view
router.get("/", utilities.handleErrors(invController.buildManagement));

// Add Classification (GET + POST)
router.get(
  "/add-classification",
  utilities.handleErrors(invController.buildAddClassification)
);
router.post(
  "/add-classification",
  invValidate.classificationRules(),
  invValidate.checkClassification,
  utilities.handleErrors(invController.addClassification)
);

// Add Inventory (GET + POST)
router.get(
  "/add-inventory",
  utilities.handleErrors(invController.buildAddInventory)
);
router.post(
  "/add-inventory",
  invValidate.inventoryRules(),
  invValidate.checkInventory,
  utilities.handleErrors(invController.addInventoryItem)
);

module.exports = router;
