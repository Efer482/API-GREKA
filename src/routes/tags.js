const express = require('express');
const router = express.Router();


const {     insertTag,
            spConsultTags   }   =   require("../controllers/tagsController");

router.post('/insert', insertTag, (req, res) =>{

})

router.get('/tag/:ID', spConsultTags, (req, res)    =>{

})
module.exports = router;