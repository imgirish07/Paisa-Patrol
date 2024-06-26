const express = require('express');
const {handleExpense, handleRemoveExpense} = require('../controller/Expense');
const router = express.Router();

router.post('/addexpense', handleExpense);
router.post('/remove-expense',handleRemoveExpense);

module.exports = router;