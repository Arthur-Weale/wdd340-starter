const express = require("express");
const router = express.Router();
const invController = require("../controllers/invController");
const invValidate = require("../utilities/inventory-validation");
const utilities = require("../utilities");
const { requireAuth, checkAccountType } = require("../utilities/auth");

// Management view (protected)
router.get(
  "/management", 
  requireAuth,
  checkAccountType(['Employee', 'Admin']),
  invController.buildManagement
);

// Route to display inventory by classification
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to display vehicle detail
router.get("/detail/:invId", invController.buildByInvId);

// Edit Inventory
router.get(
  "/edit/:inv_id",
  requireAuth,
  checkAccountType(['Employee', 'Admin']),
  utilities.handleErrors(invController.editInventoryView)
);

router.post(
  "/update",
  requireAuth,
  checkAccountType(['Employee', 'Admin']),
  invValidate.inventoryRules(),
  invValidate.checkUpdateData,
  utilities.handleErrors(invController.updateInventory)
);

// Delete Inventory
router.get(
  "/delete/:inv_id",
  requireAuth,
  checkAccountType(['Employee', 'Admin']),
  utilities.handleErrors(invController.buildDeleteView)
);

router.post(
  "/delete",
  requireAuth,
  checkAccountType(['Employee', 'Admin']),
  utilities.handleErrors(invController.deleteInventoryItem)
);

// AJAX endpoint
router.get("/getInventory/:classification_id", invController.getInventoryJSON);

// Add Classification
router.get(
  "/add-classification",
  requireAuth,
  checkAccountType(['Employee', 'Admin']),
  utilities.handleErrors(invController.buildAddClassification)
);

router.post(
  "/add-classification",
  requireAuth,
  checkAccountType(['Employee', 'Admin']),
  invValidate.classificationRules(),
  invValidate.checkClassification,
  utilities.handleErrors(invController.addClassification)
);

// Add Inventory
router.get(
  "/add-inventory",
  requireAuth,
  checkAccountType(['Employee', 'Admin']),
  utilities.handleErrors(invController.buildAddInventory)
);

router.post(
  "/add-inventory",
  requireAuth,
  checkAccountType(['Employee', 'Admin']),
  invValidate.inventoryRules(),
  invValidate.checkInventory,
  utilities.handleErrors(invController.addInventoryItem)
);

// Trigger‐error route (for testing)
router.get("/trigger-error", (req, res, next) => {
  try {
    throw new Error("This is an intentional error for testing.");
  } catch (error) {
    next(error);
  }
});

module.exports = router;