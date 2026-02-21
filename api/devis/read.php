<?php
/**
 * API - Lire les devis
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../models/Devis.php';

$database = new Database();
$db = $database->getConnection();

$devis = new Devis($db);

// Paramètres de requête
$statut = isset($_GET['statut']) ? $_GET['statut'] : null;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 100;
$offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;
$search = isset($_GET['search']) ? $_GET['search'] : null;

try {
    // Recherche ou lecture normale
    if($search) {
        $stmt = $devis->search($search);
    } else {
        $stmt = $devis->read($statut, $limit, $offset);
    }

    $num = $stmt->rowCount();

    if($num > 0) {
        $devis_arr = array();
        $devis_arr["records"] = array();
        $devis_arr["total"] = $devis->count($statut);

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $devis_item = array(
                "id" => $id,
                "nom" => $nom,
                "email" => $email,
                "telephone" => $telephone,
                "type_meuble" => $type_meuble,
                "budget" => $budget,
                "description" => $description,
                "statut" => $statut,
                "notes_admin" => $notes_admin,
                "created_at" => $created_at,
                "updated_at" => $updated_at
            );

            array_push($devis_arr["records"], $devis_item);
        }

        http_response_code(200);
        echo json_encode($devis_arr);
    } else {
        http_response_code(200);
        echo json_encode([
            "records" => [],
            "total" => 0,
            "message" => "Aucun devis trouvé"
        ]);
    }
} catch(Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Erreur serveur: " . $e->getMessage()
    ]);
}
?>
