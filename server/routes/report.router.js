const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();
const cron = require('node-cron');
const updateInvoices = require('../modules/update.invoices');

// Execute the code block once every Day at 1AM
// Then the invoices get updated in out DB
cron.schedule('1 * * * *', function () {
    console.log('NODE-CRONNING!!', new Date().toLocaleTimeString());
    updateInvoices();
});

function makeResToSend () {
    router.get('/', (req, res) => {
      updateInvoices(res)
    });
}

module.exports = router;
