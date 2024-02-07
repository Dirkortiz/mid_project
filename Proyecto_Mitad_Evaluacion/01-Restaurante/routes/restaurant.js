var express = require('express');
var router = express.Router();
const restaurantControllers = require ('../controllers/restaurantControllers');
const uploadImage = require ('../middlewares/multer');

//localhost:3000/restaurant
router.get('/', restaurantControllers.showAllRestaurant);

//abre la pagina con el formulario de creación de nuevo restaurante
//localhost:3000/restaurant/register

router.get('/register', restaurantControllers.restaurantRegister);

//recoge los datos del formulario de nuevo restaurante
//localhost:3000/restaurant/register

router.post('/register',uploadImage("restaurants"), restaurantControllers.createRestaurant);

//abre la página de un restaurante determinado
//localhost:3000/restaurant/oneRestaurant/:id

router.get('/oneRestaurant/:id',restaurantControllers.viewOneRestaurant);

//abre el formulario de edicion de un restaurante
//localhost:3000/restaurant/editRestaurant/1
router.get('/editRestaurant/:id', restaurantControllers.ShowEditRestaurant);

//recoge los datos del formulario de modificacion restaurante en BBDD
//localhost:3000/restaurant/register

router.post('/editRestaurant/:id',uploadImage("restaurants"), restaurantControllers.editRestaurant);

//eliminar un restaurante

router.get('/deleteRestaurantLogic/:id',restaurantControllers.delLogicRestaurant)

module.exports = router;
