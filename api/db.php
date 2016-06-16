<?php

//Définition des constantes de connexion à la base de donnée
define('USERNAME', 'all');
define('PASSWD', 'test');
define('DSN', 'mysql:host=localhost;dbname=edupalu_db');

//Connexion à la base de données
try{
	$pdo = new PDO(DSN, USERNAME, PASSWD, array(PDO::ATTR_PERSISTENT => true, PDO::MYSQL_ATTR_LOCAL_INFILE => 1));
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $pdo;
}catch (PDOException $e){
	print "Erreur ! : " . $e->getMessage() . "<br />";
	die();
}
	

