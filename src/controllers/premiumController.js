const jwt           = require('jsonwebtoken');
const connection    = require('../database.js');

let updatePremium   =   (req, res) =>{
    const   {ID_USER, PREMIUM, DATA}    =   req.body;
    const   query   =   `CALL spUserPremium(?,?,?)`;
    let u = Date.now();
    connection.query(query, [ID_USER, PREMIUM, DATA], (err,rows, fields) =>{
        if (!err) {
            res.json({Status: 'Actualizado'});
        }else{
            res.json({Status: 'Error'});
            console.log(err);
        }
    })
}

module.exports  =   {
    updatePremium
}