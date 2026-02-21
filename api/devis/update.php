<?php
/**
 * API - Mettre à jour un devis
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include_once '../config/database.php';
include_once '../models/Devis.php';

$database = new Database();
$db = $database->getConnection();

$devis = new Devis($db);

// Récupérer les données
$data = json_decode(file_get_contents("php://input"));

// Vérifier les données
if(!empty($data->id) && !empty($data->statut)) {
    $devis->id = $data->id;
    $devis->statut = $data->statut;
    $devis->notes_admin = $data->notes_admin ?? null;

    if($devis->updateStatut()) {
        http_response_code(200);
        echo json_encode([
            "success" => true,
            "message" => "Devis mis à jour avec succès"
        ]);
    } else {
        http_response_code(503);
        echo json_encode([
            "success" => false,
            "message" => "Impossible de mettre à jour le devis"
        ]);
    }
} else {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Données incomplètes"
    ]);
}
?>
