const express = require('express');
const router = express.Router();
const uploadImage = require ('../middlewares/multer')
const dishControllers = require ('../controllers/dishControllers');


//localhost:3000/dish
router.get('/',dishControllers.showAllDishes);

//abre el formulario de añadir un nuevo plato en un restaurante
//importante que esta ruta sea dinámica para enlazar las dos tablas con el
//restaurant _id

router.get('/createDish/:id', dishControllers.ViewCreateDish);

//recoge los datos del nuevo plato añadido

router.post('/createDish/:id',uploadImage("dishes"), dishControllers.createDish);

//borrado terminal de un plato

router.get('/deleteDish/:id/:restaurant_id',dishControllers.totalDelete);

//abre el formulario para modificar un  plato
//localhost:3000/dish/editDish
router.get ('/editDish/:id/:restaurant_id', dishControllers.ShowEditDish);





router.post('/editDish/:id/:restaurant_id',uploadImage("dishes"), dishControllers.editDish);

module.exports = router;