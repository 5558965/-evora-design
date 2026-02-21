<?php
/**
 * API - Statistiques du dashboard
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

try {
    // Récupérer les statistiques globales
    $query = "SELECT * FROM stats_globales";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $stats = $stmt->fetch(PDO::FETCH_ASSOC);

    // Visites des 7 derniers jours
    $query = "SELECT date_visite, nombre_visites, visiteurs_uniques 
              FROM visites_par_jour 
              ORDER BY date_visite DESC 
              LIMIT 7";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $visites_semaine = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Devis récents
    $query = "SELECT id, nom, type_meuble, statut, created_at 
              FROM devis 
              ORDER BY created_at DESC 
              LIMIT 5";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $devis_recents = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Produits populaires
    $query = "SELECT * FROM produits_populaires LIMIT 5";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $produits_populaires = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Réponse
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "data" => [
            "stats_globales" => $stats,
            "visites_semaine" => array_reverse($visites_semaine),
            "devis_recents" => $devis_recents,
            "produits_populaires" => $produits_populaires
        ]
    ]);

} catch(Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Erreur serveur: " . $e->getMessage()
    ]);
}
?>
