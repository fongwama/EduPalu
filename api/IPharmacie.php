<?php

include_once ('Pharmacie.php');

interface IPharmacie
{
    public function addPharmacie(Pharmacie $pharmacie);
    public function deletePharmacie(Pharmacie $pharmacie);
    public function updatePharmacie(Pharmacie $pharmacie);
}