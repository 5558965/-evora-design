<?php
/**
 * API - Créer un devis
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include_once '../config/database.php';
include_once '../models/Devis.php';

$database = new Database();
$db = $database->getConnection();

$devis = new Devis($db);

// Récupérer les données POST
$data = json_decode(file_get_contents("php://input"));

// Vérifier les données requises
if(
    !empty($data->nom) &&
    !empty($data->email) &&
    !empty($data->telephone) &&
    !empty($data->type_meuble)
) {
    // Assigner les valeurs
    $devis->nom = $data->nom;
    $devis->email = $data->email;
    $devis->telephone = $data->telephone;
    $devis->type_meuble = $data->type_meuble;
    $devis->budget = $data->budget ?? null;
    $devis->description = $data->description ?? null;

    // Créer le devis
    if($devis->create()) {
        http_response_code(201);
        echo json_encode([
            "success" => true,
            "message" => "Demande de devis créée avec succès",
            "id" => $devis->id
        ]);
    } else {
        http_response_code(503);
        echo json_encode([
            "success" => false,
            "message" => "Impossible de créer la demande de devis"
        ]);
    }
} else {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Données incomplètes. Veuillez remplir tous les champs requis."
    ]);
}
?>
