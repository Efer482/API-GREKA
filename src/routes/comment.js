const express = require('express');
const router = express.Router();


const   {   insetComment,
            updateComment,
            spConsultComments,
            deleteComment}   =   require("../controllers/commentController")

    /*===========================================
                INSERTAR COMENTARIO
    ===========================================*/
router.post('/insert', insetComment, (req, res) =>{

});

router.get('/:id', spConsultComments, (req, res) =>{

})

router.put('/update', updateComment, (req, res) =>{

})

router.delete('/delete', deleteComment, (req, res) =>{

})
module.exports = router;