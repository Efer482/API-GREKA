const express = require('express');
const router = express.Router();

const {
	uploadImg,
	insertBook,
	consultBooks,
	consultBook,
	consultTags,
	updateBook
} = require('../controllers/bookController');
/*===========================================
                    INSERTAR LIBRO
    ===========================================*/
router.post('/insert', insertBook);

/*===========================================
                OBTENER TODOS LOS LIBROS
    ===========================================*/
router.get('/', consultBooks, (req, res) => {});

/*===========================================
            OBTENER LOS TAGS DE UN LIBRO
    ===========================================*/
router.get('/tags/:id', consultTags, (req, res) => {});

/*===========================================
                ACTUALIZAR IMAGEN
    ===========================================*/
router.post('/files1', uploadImg, (req, res) => {});

/*===========================================
                OBTENER UN SOLO LIBRO
    ===========================================*/
router.get('/book/:id', consultBook, (req, res) => {});

/*===========================================
                ACTUALIZAR LIBRO
    ===========================================*/
router.put('/update', updateBook, (req, res) => {});
module.exports = router;
