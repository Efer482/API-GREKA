const express = require('express');
const router = express.Router();

const { updatePremium  }   =   require("../controllers/premiumController");

router.put('/update', updatePremium, (req, res) =>{

})
module.exports = router;