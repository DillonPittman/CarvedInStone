create database mydb;

use mydb;

CREATE TABLE `users`
(`id` int(11) NOT NULL AUTO_INCREMENT, 
 `name` varchar(255) NOT NULL, 
 `email` varchar(255) NOT NULL, 
 `password` varchar(255) NOT NULL, 
 `created_at` datetime NOT NULL, 
 `updated_at` datetime NOT NULL, 
 PRIMARY KEY (`id`)) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1