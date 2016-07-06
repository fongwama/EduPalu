<?php

include_once ('db.php');
include_once ('IPharmacie.php');

class PharmaciesDao
{


    /**
     * PharmacieDao constructor.
     */
    public function __construct()
    {
    }

    public function addPharmacie(Pharmacie $pharmacie)
    {
        global $pdo;

        try{
            //On ajoute la pharmacie dans la table tab_pharmacie
            $query = "INSERT INTO tab_pharmacie
            SET
            nom =            :nom,
            adresse =        :adresse,
            ville =          :ville,
            contact =        :contact,
            quartier =       :quartier,
            numero =         :numero";

            $q = $pdo->prepare($query);

            $q->bindValue(':nom', $pharmacie->getNom());
            $q->bindValue(':adresse', $pharmacie->getAdresse());
            $q->bindValue(':ville', $pharmacie->getVille());
            $q->bindValue(':contact', $pharmacie->getContact());
            $q->bindValue(':quartier', $pharmacie->getQuartier());
            $q->bindValue(':numero', $pharmacie->getNumero());

            $q->execute();

            $pharmaIdAdd = $pdo->lastInsertId();

            return $pharmaIdAdd;

        }catch (PDOException $e){
            return $e -> getMessage();
        }
    }
}