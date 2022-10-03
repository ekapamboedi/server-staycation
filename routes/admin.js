const router = require('express').Router();
const AdminController = require('../controllers/AdminController');
const { uploadMultiple, upload } = require('../middlewares/multer');

// Endpoint Dashboard
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


router.get('/item', AdminController.viewItem);
// router.post('/item', upload, AdminController.addItem);
router.post('/item', uploadMultiple, AdminController.addItem);

router.get('/booking', AdminController.viewBooking);

module.exports = router;
