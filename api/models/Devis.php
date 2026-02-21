<?php
/**
 * Modèle Devis
 */

class Devis {
    private $conn;
    private $table = "devis";

    // Propriétés
    public $id;
    public $nom;
    public $email;
    public $telephone;
    public $type_meuble;
    public $budget;
    public $description;
    public $statut;
    public $notes_admin;
    public $created_at;
    public $updated_at;

    /**
     * Constructeur
     */
    public function __construct($db) {
        $this->conn = $db;
    }

    /**
     * Créer un nouveau devis
     */
    public function create() {
        $query = "INSERT INTO " . $this->table . "
                SET nom = :nom,
                    email = :email,
                    telephone = :telephone,
                    type_meuble = :type_meuble,
                    budget = :budget,
                    description = :description,
                    ip_address = :ip_address,
                    user_agent = :user_agent";

        $stmt = $this->conn->prepare($query);

        // Nettoyer les données
        $this->nom = htmlspecialchars(strip_tags($this->nom));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->telephone = htmlspecialchars(strip_tags($this->telephone));
        $this->type_meuble = htmlspecialchars(strip_tags($this->type_meuble));
        $this->budget = htmlspecialchars(strip_tags($this->budget));
        $this->description = htmlspecialchars(strip_tags($this->description));

        // Bind des valeurs
        $stmt->bindParam(":nom", $this->nom);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":telephone", $this->telephone);
        $stmt->bindParam(":type_meuble", $this->type_meuble);
        $stmt->bindParam(":budget", $this->budget);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":ip_address", $_SERVER['REMOTE_ADDR']);
        $stmt->bindParam(":user_agent", $_SERVER['HTTP_USER_AGENT']);

        if($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            return true;
        }

        return false;
    }

    /**
     * Lire tous les devis
     */
    public function read($statut = null, $limit = 100, $offset = 0) {
        $query = "SELECT * FROM " . $this->table;
        
        if($statut) {
            $query .= " WHERE statut = :statut";
        }
        
        $query .= " ORDER BY created_at DESC LIMIT :limit OFFSET :offset";

        $stmt = $this->conn->prepare($query);

        if($statut) {
            $stmt->bindParam(":statut", $statut);
        }
        
        $stmt->bindParam(":limit", $limit, PDO::PARAM_INT);
        $stmt->bindParam(":offset", $offset, PDO::PARAM_INT);

        $stmt->execute();
        return $stmt;
    }

    /**
     * Lire un devis par ID
     */
    public function readOne() {
        $query = "SELECT * FROM " . $this->table . " WHERE id = :id LIMIT 1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if($row) {
            $this->nom = $row['nom'];
            $this->email = $row['email'];
            $this->telephone = $row['telephone'];
            $this->type_meuble = $row['type_meuble'];
            $this->budget = $row['budget'];
            $this->description = $row['description'];
            $this->statut = $row['statut'];
            $this->notes_admin = $row['notes_admin'];
            $this->created_at = $row['created_at'];
            $this->updated_at = $row['updated_at'];
            return true;
        }

        return false;
    }

    /**
     * Mettre à jour le statut
     */
    public function updateStatut() {
        $query = "UPDATE " . $this->table . "
                SET statut = :statut,
                    notes_admin = :notes_admin
                WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        $this->statut = htmlspecialchars(strip_tags($this->statut));
        $this->notes_admin = htmlspecialchars(strip_tags($this->notes_admin));

        $stmt->bindParam(":statut", $this->statut);
        $stmt->bindParam(":notes_admin", $this->notes_admin);
        $stmt->bindParam(":id", $this->id);

        return $stmt->execute();
    }

    /**
     * Supprimer un devis
     */
    public function delete() {
        $query = "DELETE FROM " . $this->table . " WHERE id = :id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);

        return $stmt->execute();
    }

    /**
     * Compter les devis
     */
    public function count($statut = null) {
        $query = "SELECT COUNT(*) as total FROM " . $this->table;
        
        if($statut) {
            $query .= " WHERE statut = :statut";
        }

        $stmt = $this->conn->prepare($query);
        
        if($statut) {
            $stmt->bindParam(":statut", $statut);
        }

        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        return $row['total'];
    }

    /**
     * Rechercher des devis
     */
    public function search($term) {
        $query = "SELECT * FROM " . $this->table . "
                WHERE nom LIKE :term 
                OR email LIKE :term 
                OR telephone LIKE :term
                OR type_meuble LIKE :term
                ORDER BY created_at DESC";

        $stmt = $this->conn->prepare($query);
        $term = "%{$term}%";
        $stmt->bindParam(":term", $term);
        $stmt->execute();

        return $stmt;
    }
}
?>
