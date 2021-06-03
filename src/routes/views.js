const express = require('express');
const router = express.Router();

const {     insertView,
            consultViews}   =   require("../controllers/viewsController");

router.post('/insert', insertView, (req, res) =>{

})

router.get("/:ID", consultViews, (req, res) =>{
    
})
module.exports = router;