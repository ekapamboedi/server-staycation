const router = require('express').Router();
const ApiController = require('../controllers/ApiController');
const { uploadMultiple, upload } = require('../middlewares/multer');
// const auth = require('../middlewares/auth');

// Endpoint Dashboard
router.get('/landing-page', ApiController.landingPage);
router.get('/detail-page/:id', ApiController.detailPage);
router.post('/booking-page', upload, ApiController.bookingPage);

module.exports = router;
