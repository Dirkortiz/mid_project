const connection = require ('../config/db');

class DishControllers {

  //Vista de TOP de platos de restaurantes
   showAllDishes = (req, res, ) => {
    let sql = `SELECT dish.name as dish_name, dish_img,dish_id,dish.description,dish.restaurant_id,restaurant.name FROM dish, restaurant WHERE dish.restaurant_id = restaurant.restaurant_id and dish_is_deleted = 0`
    
    connection.query(sql, (err,result) => {
      console.log(result);
      if(err) throw err;
      res.render('topDishes',{result})
    })
    
  }

  //abre el formulario de añadir plato
  ViewCreateDish = (req,res) => {
    let id = req.params.id;
      res.render('formDish',{restaurant_id:id});
  }

//recoge los datos y los guarda en BBDD 

  createDish = (req,res) => {
    let id = req.params.id; 
    const {name,description} = req.body;
    
    let sql = `INSERT INTO dish (name,description,restaurant_id) VALUES ("${name}",
    "${description}","${id}")`

    if(req.file != undefined){
      let img = req.file.filename;
      sql = `INSERT INTO dish (name,description,restaurant_id,dish_img) VALUES ("${name}",
      "${description}","${id}","${img}")`
      
    }
    connection.query(sql, (err,result) => {
      if (err) throw err;
      res.redirect(`/restaurant/oneRestaurant/${id}`)
    })

  }

  //borra terminalmente un plato
  totalDelete = (req,res) => {
    let {id,restaurant_id} = req.params;
    let sql = `DELETE FROM dish WHERE dish_id = ${id}`
    connection.query(sql, (err,result) => {
      if(err) throw err;
      res.redirect(`/restaurant/oneRestaurant/${restaurant_id}`)

    })
  }

  /*  */

  ShowEditDish = (req,res) => {
    let id = req.params.id;
    let sql = `SELECT * FROM dish WHERE dish_id = ${id}`
    

    connection.query(sql, (err,result) =>{
      if(err) throw err;
      res.render('editFormDish',{result})
    })
  }

editDish =(req,res) => {
  let {id,restaurant_id}  = req.params;
  const {name,description} =req.body;
  let sql = `UPDATE dish SET name = "${name}", description = "${description}" 
  WHERE dish_id = ${id} `

  if(req.file != undefined){
      let img = req.file.filename;
      sql = `UPDATE dish SET name = "${name}", description = "${description}",
      dish_img = "${img}" WHERE dish_id = ${id}  `
  }

  connection.query(sql, (err,result) => {
    if(err) throw err;
    res.redirect(`/restaurant/oneRestaurant/${restaurant_id}`)
  })
}

  
}




module.exports = new DishControllers;