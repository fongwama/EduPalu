<?php

include_once('Pharmacie.php');
include_once('PharmacieDao.php');

$nom = filter_input(INPUT_POST,'nom', FILTER_SANITIZE_STRING);
$adresse = filter_input(INPUT_POST,'adresse', FILTER_SANITIZE_STRING);
$ville = filter_input(INPUT_POST,'ville', FILTER_SANITIZE_STRING);
$contact = filter_input(INPUT_POST,'contact', FILTER_SANITIZE_STRING);
$quartier = filter_input(INPUT_POST,'quartier', FILTER_SANITIZE_STRING);
$numero = filter_input(INPUT_POST,'numero', FILTER_SANITIZE_STRING);

if($nom != "" || $adresse != "" || $ville != "" || $quartier){

    $pharma = new Pharmacie();
    $pharma->setNom($nom);
    $pharma->setAdresse($adresse);
    $pharma->setVille($ville);
    $pharma->setContact($contact);
    $pharma->setQuartier($quartier);
    $pharma->setNumero($numero);

    echo('Nom: '+$pharma->getNom());

    $dao = new PharmaciesDao();

    $_pharmaId = $dao->addPharmacie($pharma);

    if($_pharmaId > 0){
        $result = Array("message" => "Pharmacie ajouter avec succès");
         //json_encode($result);
    }

}