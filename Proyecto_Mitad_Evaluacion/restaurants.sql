CREATE DATABASE restaurants;

USE restaurants;

CREATE TABLE restaurant (
	restaurant_id MEDIUMINT UNSIGNED PRIMARY KEY AUTO_INCREMENT, 
	name VARCHAR (90) NOT NULL, 
	style VARCHAR (30) NOT NULL, 
	email VARCHAR (80) NOT NULL UNIQUE,
	password VARCHAR (120) NOT NULL, 
	description VARCHAR (300),
    phone_number VARCHAR (20) NOT NULL,
    res_img VARCHAR(180),
    restaurant_is_deleted BOOLEAN DEFAULT 0 NOT NULL
);

CREATE TABLE dish (
dish_id MEDIUMINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
name VARCHAR (60) NOT NULL,
description VARCHAR (200) NOT NULL,
dish_img VARCHAR(180),
dish_is_deleted BOOLEAN DEFAULT 0 NOT NULL,
restaurant_id MEDIUMINT UNSIGNED NOT NULL,
CONSTRAINT fk_restaurant_1 FOREIGN KEY (restaurant_id)
REFERENCES restaurant(restaurant_id) ON DELETE CASCADE ON UPDATE CASCADE
);

select * from restaurant;

select * from dish;

INSERT INTO restaurant (restaurant_id,name,style,email,password,description,phone_number)
value (1,"Bar Manolo","Mediterráneo","manolete@gmail.com","manolo123","Bar de colegas con frituras",
"666666666");
INSERT INTO restaurant (restaurant_id,name,style,email,password,description,phone_number)
value (2,"Kebabish Josef","Arabe","josef@gmail.com","josef123","Tu kebabish de confianza",
"777777777");



INSERT INTO dish (dish_id,name,description,restaurant_id)
value (1,"Croquetas","Croquetas de la abuela de todos los sabores",1);

INSERT INTO dish (dish_id,name,description,restaurant_id)
value (2,"Oreja","Oreja muy sabrosa",1);

INSERT INTO dish (dish_id,name,description,restaurant_id)
value (3,"Kebab","De pollo",2);
INSERT INTO dish (dish_id,name,description,restaurant_id)
value (4,"Durum","Vegetal",2);