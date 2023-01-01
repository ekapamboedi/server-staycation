const router = require('express').Router();
const AdminController = require('../controllers/AdminController');
const { uploadMultiple, upload } = require('../middlewares/multer');
const auth = require('../middlewares/auth');

// Endpoint Dashboard
router.get('/login', AdminController.viewLogin);
router.post('/login', AdminController.actionLogin);
router.use(auth);
router.get('/logout', AdminController.actionLogout);
router.get('/dashboard', AdminController.viewDashboard);
// Endpoint Category
router.get('/category', AdminController.viewCategory);
router.post('/category', AdminController.addCategory);
router.put('/category', AdminController.editCategory);
router.delete('/category/:id', AdminController.deleteCategory);
// Endppoint Bank
router.get('/bank', AdminController.viewBank);
router.post('/bank', upload, AdminController.addBank);
router.put('/bank', upload, AdminController.editBank);
router.delete('/bank/:id', AdminController.deleteBank);

//Endpoint Item
router.get('/item', AdminController.viewItem);
router.post('/item', uploadMultiple, AdminController.addItem);
router.get('/item/show-image/:id', AdminController.showImageItem);
router.get('/item/:id', AdminController.showEditItem);
router.put('/item/:id', uploadMultiple, AdminController.editItem);

// Endpoint detail item
router.get('/item/show-detail-item/:itemId', AdminController.viewDetailItem);
router.post('/item/add/feature', upload, AdminController.addFeature);
router.put('/item/update/feature', upload, AdminController.editFeature);
router.delete('/item/:itemId/feature/:id', AdminController.deleteFeature);

// Endpoint Activity
router.post('/item/add/activity', upload, AdminController.addActivity);
router.put('/item/update/activity', upload, AdminController.editActivity);
router.delete('/item/:itemId/activity/:id', AdminController.deleteActivity);


router.get('/booking', AdminController.viewBooking);
router.get('/booking/:id', AdminController.showDetailBooking);
router.put('/booking/:id/confirmation', AdminController.actionConfirm);
router.put('/booking/:id/rejection', AdminController.actionReject);

module.exports = router;
