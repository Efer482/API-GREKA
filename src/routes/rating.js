const express = require('express');
const router = express.Router();


const {     insertRating,
            consultRating,
            consultRatings  }   =   require("../controllers/ratingsController");

router.post('/insert', insertRating, (req, res) =>{
    
})

router.get("/rating/:ID", consultRating, (req, res) =>{
    
})

router.get("/:ID_BOOK", consultRatings, (req, res) =>{
    
})
module.exports = router;