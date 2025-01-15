const express = require('express');
const depenseController = require('../controllers/depenseController');


const router = express.Router();

router.get('/', depenseController.getAllDepenses);
router.get('/total/category/:category', depenseController.getTotalByCategory);
router.get('/total', depenseController.getTotalExpenses);
router.get('/:id',  depenseController.getDepenseById);
router.post('/',  depenseController.createDepense);
router.put('/:id',  depenseController.updateDepense);
router.delete('/:id', depenseController.deleteDepense);


module.exports = router;
