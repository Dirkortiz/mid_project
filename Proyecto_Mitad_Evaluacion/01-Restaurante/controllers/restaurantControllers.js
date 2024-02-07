const bcrypt = require("bcrypt");
const connection = require("../config/db");

class RestaurantControllers {
  //abre la vista de todos los restaurantes
  // localhost:3000/restaurant
  showAllRestaurant = (req, res) => {
    let sql = `SELECT * FROM restaurant WHERE restaurant_is_deleted = 0`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.render("allRestaurants", { result });
    });
  };

  //abre la vista del formulario de nuevo restaurante
  restaurantRegister = (req, res) => {
    res.render("registerForm");
  };

  //recoger los datos del formulario nuevo restaurante
  createRestaurant = (req, res) => {
    console.log(req.body);
    const { name, style, email, password, phone_number } = req.body;

    if (
      name === "" ||
      style === "" ||
      email === "" ||
      password === "" ||
      phone_number === ""
    ) {
      return res.render("registerForm", {
        message: `Por favor,debes rellenar todos los campos para continuar`,
      });
    }

    //encriptacion de contraseña con bcrypt
    bcrypt.hash(password, 8, function (err, hash) {
      if (err) throw err;

      let sql = `INSERT INTO restaurant (name,style,email,password,phone_number,res_img)
    VALUES ("${name}","${style}","${email}","${hash}","${phone_number}", "user.png") `;

      if (req.file != undefined) {
        let img = req.file.filename;
        sql = `INSERT INTO restaurant (name,style,email,password,phone_number,res_img)
        VALUES ("${name}","${style}","${email}","${hash}","${phone_number}","${img}") `;
      }

      connection.query(sql, (err, result) => {
        if (err) {
          if (err.errno == 1062) {
            return res.render("registerForm", {
              message: `Este email ya ha sido registrado`,
            });
          } else {
            throw err;
          }
        }
        res.redirect("/restaurant");
      });
    });
  };



  viewOneRestaurant = (req,res) => {
    let id = req.params.id;
    let sql = `SELECT * FROM restaurant WHERE restaurant_id = ${id} 
    AND restaurant_is_deleted = 0`

    let sql_dishes = `SELECT * FROM dish WHERE restaurant_id = ${id} `
    connection.query(sql, (err,result) =>{
        if(err) throw err;
        connection.query(sql_dishes, (err_dish,result_dish) => {
          if(err_dish) throw err_dish;
          console.log("Restaurante",result);
          console.log("Platos",result_dish);
          res.render('oneRestaurant',{result,result_dish});
        })

    })

  }

  ShowEditRestaurant = (req,res) => {
    let id = req.params.id;
    let sql = `SELECT * FROM restaurant WHERE restaurant_id = ${id} AND restaurant_is_deleted = 0`
    

    connection.query(sql, (err,result) =>{
      if(err) throw err;
      res.render('editFormRestaurant',{result})
    })
  }

editRestaurant =(req,res) => {
  let id = req.params.id;
  const {name,style,phone_number} = req.body;
  let sql = `UPDATE restaurant SET name = "${name}", style = "${style}", phone_number = "${phone_number}" 
  WHERE restaurant_id = ${id} `

  if(req.file != undefined){
      let img = req.file.filename;
      sql = `UPDATE restaurant SET name = "${name}", style = "${style}", phone_number = "${phone_number}",
      res_img = "${img}" WHERE restaurant_id = ${id}  `
  }

  connection.query(sql, (err,result) => {
    if(err) throw err;
    res.redirect(`/restaurant/oneRestaurant/${id}`)
  })
}



delLogicRestaurant = (req,res) => {
  let id = req.params.id;
  console.log(id);
  let sql = `UPDATE restaurant LEFT JOIN dish ON restaurant.restaurant_id = dish.restaurant_id
  SET restaurant.restaurant_is_deleted = 1, dish.dish_is_deleted = 1 WHERE
  restaurant.restaurant_id = ${id} `

  connection.query(sql, (err,result) => {
      if(err) throw err;
      res.redirect('/restaurant');
  })
}


}

module.exports = new RestaurantControllers();
