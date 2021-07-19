const express = require('express');
const jwt       = require('jsonwebtoken');
const router = express.Router();

const { consultUser,
        signUp, 
        signUpIMG,
        login,
        update,
        verifyToken} = require("../controllers/userController")
        

router.get("/:ID", consultUser, (req, res) => {}); //GET request de consulta de un usuario especifico, haciendo uso de la ID.

router.post('/signup', signUp, (req, res) =>{

});
router.post('/signup/img', signUpIMG,(req, res) =>{
    
});

router.get('/login', login, (req, res) =>{});

router.post("/login/post", verifyToken, (req, res) =>{
    jwt.verify(req.token, 'secretkey', (err, authData) =>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                mensaje: "Post",
                authData
            })
        }
    });
});

router.put("/update", update, (req, res) =>{
    
})
module.exports = router;
