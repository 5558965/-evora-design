<?php
/**
 * API - Enregistrer une visite
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

// Récupérer les données
$data = json_decode(file_get_contents("php://input"));

if(!empty($data->page)) {
    try {
        // Générer ou récupérer l'ID de session
        session_start();
        if(!isset($_SESSION['visitor_id'])) {
            $_SESSION['visitor_id'] = uniqid('visitor_', true);
        }

        $query = "CALL enregistrer_visite(:page, :ip, :user_agent, :referer, :session_id)";
        
        $stmt = $db->prepare($query);
        
        $page = htmlspecialchars(strip_tags($data->page));
        $ip = $_SERVER['REMOTE_ADDR'];
        $user_agent = $_SERVER['HTTP_USER_AGENT'];
        $referer = $_SERVER['HTTP_REFERER'] ?? null;
        $session_id = $_SESSION['visitor_id'];

        $stmt->bindParam(":page", $page);
        $stmt->bindParam(":ip", $ip);
        $stmt->bindParam(":user_agent", $user_agent);
        $stmt->bindParam(":referer", $referer);
        $stmt->bindParam(":session_id", $session_id);

        if($stmt->execute()) {
            http_response_code(201);
            echo json_encode([
                "success" => true,
                "message" => "Visite enregistrée"
            ]);
        } else {
            throw new Exception("Erreur lors de l'enregistrement");
        }

    } catch(Exception $e) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "Erreur: " . $e->getMessage()
        ]);
    }
} else {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Page non spécifiée"
    ]);
}
?>
