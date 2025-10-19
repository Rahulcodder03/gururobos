const router = require('express').Router();
const contactController = require('../controllers/contactController');
// const auth = require('../middleware/auth');

// public: create contact
router.post('/', contactController.createContact);

// admin protected routes
router.get('/', contactController.getContacts);
router.get('/:id', contactController.getContact);
router.put('/:id', contactController.updateContact);
router.delete('/:id', contactController.deleteContact);

module.exports = router;
