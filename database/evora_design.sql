-- ============================================
-- Base de données EVORA DESIGN
-- ============================================

-- Création de la base de données
CREATE DATABASE IF NOT EXISTS evora_design CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE evora_design;

-- ============================================
-- Table des administrateurs
-- ============================================
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    nom VARCHAR(100) NOT NULL,
    role ENUM('super_admin', 'admin', 'moderator') DEFAULT 'admin',
    actif BOOLEAN DEFAULT TRUE,
    derniere_connexion DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table des catégories
-- ============================================
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    image VARCHAR(255),
    parent_id INT NULL,
    ordre INT DEFAULT 0,
    actif BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_parent (parent_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table des produits
-- ============================================
CREATE TABLE IF NOT EXISTS produits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    description TEXT,
    prix DECIMAL(10, 2) NOT NULL,
    prix_promo DECIMAL(10, 2) NULL,
    categorie_id INT NOT NULL,
    image_principale VARCHAR(255),
    stock INT DEFAULT 0,
    en_vedette BOOLEAN DEFAULT FALSE,
    actif BOOLEAN DEFAULT TRUE,
    vues INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (categorie_id) REFERENCES categories(id) ON DELETE CASCADE,
    INDEX idx_slug (slug),
    INDEX idx_categorie (categorie_id),
    INDEX idx_vedette (en_vedette),
    INDEX idx_actif (actif)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table des images produits
-- ============================================
CREATE TABLE IF NOT EXISTS produits_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produit_id INT NOT NULL,
    image VARCHAR(255) NOT NULL,
    alt_text VARCHAR(255),
    ordre INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (produit_id) REFERENCES produits(id) ON DELETE CASCADE,
    INDEX idx_produit (produit_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table des demandes de devis
-- ============================================
CREATE TABLE IF NOT EXISTS devis (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telephone VARCHAR(20) NOT NULL,
    type_meuble VARCHAR(100) NOT NULL,
    budget VARCHAR(50),
    description TEXT,
    statut ENUM('pending', 'processed', 'rejected', 'archived') DEFAULT 'pending',
    notes_admin TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_statut (statut),
    INDEX idx_email (email),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table des commandes
-- ============================================
CREATE TABLE IF NOT EXISTS commandes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero_commande VARCHAR(50) UNIQUE NOT NULL,
    nom_client VARCHAR(100) NOT NULL,
    email_client VARCHAR(100) NOT NULL,
    telephone_client VARCHAR(20) NOT NULL,
    adresse_livraison TEXT NOT NULL,
    ville VARCHAR(100) NOT NULL,
    commune VARCHAR(100),
    notes_livraison TEXT,
    mode_paiement ENUM('mobile-money', 'wave', 'virement', 'livraison') NOT NULL,
    montant_total DECIMAL(10, 2) NOT NULL,
    statut ENUM('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    statut_paiement ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_numero (numero_commande),
    INDEX idx_statut (statut),
    INDEX idx_email (email_client),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table des articles de commande
-- ============================================
CREATE TABLE IF NOT EXISTS commandes_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    commande_id INT NOT NULL,
    produit_id INT NOT NULL,
    nom_produit VARCHAR(200) NOT NULL,
    prix_unitaire DECIMAL(10, 2) NOT NULL,
    quantite INT NOT NULL DEFAULT 1,
    sous_total DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (commande_id) REFERENCES commandes(id) ON DELETE CASCADE,
    FOREIGN KEY (produit_id) REFERENCES produits(id) ON DELETE RESTRICT,
    INDEX idx_commande (commande_id),
    INDEX idx_produit (produit_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table de la galerie
-- ============================================
CREATE TABLE IF NOT EXISTS galerie (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(200) NOT NULL,
    description TEXT,
    image VARCHAR(255) NOT NULL,
    categorie_id INT,
    ordre INT DEFAULT 0,
    actif BOOLEAN DEFAULT TRUE,
    vues INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (categorie_id) REFERENCES categories(id) ON DELETE SET NULL,
    INDEX idx_categorie (categorie_id),
    INDEX idx_actif (actif)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table des statistiques de visites
-- ============================================
CREATE TABLE IF NOT EXISTS visites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    page VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    referer VARCHAR(255),
    session_id VARCHAR(100),
    date_visite DATE NOT NULL,
    heure_visite TIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_page (page),
    INDEX idx_date (date_visite),
    INDEX idx_session (session_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table du journal d'activités
-- ============================================
CREATE TABLE IF NOT EXISTS activites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT,
    action VARCHAR(255) NOT NULL,
    table_name VARCHAR(100),
    record_id INT,
    details TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE SET NULL,
    INDEX idx_admin (admin_id),
    INDEX idx_table (table_name),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table des paramètres du site
-- ============================================
CREATE TABLE IF NOT EXISTS parametres (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cle VARCHAR(100) UNIQUE NOT NULL,
    valeur TEXT,
    type ENUM('text', 'number', 'boolean', 'json') DEFAULT 'text',
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_cle (cle)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Insertion des données initiales
-- ============================================

-- Admin par défaut (mot de passe: evora2026)
INSERT INTO admins (username, password, email, nom, role) VALUES
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@evoradesign.ci', 'Administrateur', 'super_admin');

-- Catégories par défaut
INSERT INTO categories (nom, slug, description, ordre) VALUES
('Salon', 'salon', 'Meubles pour le salon', 1),
('Chambre', 'chambre', 'Meubles pour la chambre', 2),
('Cuisine', 'cuisine', 'Meubles et équipements de cuisine', 3),
('Bureau', 'bureau', 'Meubles de bureau', 4),
('Rangement', 'rangement', 'Solutions de rangement', 5),
('Salle de bain', 'salle-de-bain', 'Meubles de salle de bain', 6);

-- Produits par défaut
INSERT INTO produits (nom, slug, description, prix, categorie_id, image_principale, en_vedette, stock) VALUES
('Canapé Bois Noble', 'canape-bois-noble', 'Canapé artisanal en bois noble avec finitions haut de gamme', 450000, 1, 'Canapé Bois Noble.jpg', TRUE, 5),
('Table Artisanale', 'table-artisanale', 'Table en bois massif fabriquée à la main', 380000, 1, 'Table Artisanale.jpg', TRUE, 8),
('Lit Moderne', 'lit-moderne', 'Lit design moderne avec rangements intégrés', 520000, 2, 'Lit Moderne.jpg', TRUE, 3);

-- Paramètres du site
INSERT INTO parametres (cle, valeur, type, description) VALUES
('site_name', 'EVORA DESIGN', 'text', 'Nom du site'),
('site_email', 'contact@evoradesign.ci', 'text', 'Email de contact'),
('site_phone', '+225 07 48 65 51 20', 'text', 'Téléphone principal'),
('site_phone_2', '+225 05 54 17 57 94', 'text', 'Téléphone secondaire'),
('site_address', 'KOUMASSI, ZOE BRUNO, RUE SORO SORI 127', 'text', 'Adresse'),
('whatsapp_number', '2250748655120', 'text', 'Numéro WhatsApp'),
('livraison_gratuite', 'true', 'boolean', 'Livraison gratuite activée'),
('maintenance_mode', 'false', 'boolean', 'Mode maintenance');

-- ============================================
-- Vues pour les statistiques
-- ============================================

-- Vue des statistiques globales
CREATE OR REPLACE VIEW stats_globales AS
SELECT 
    (SELECT COUNT(*) FROM visites) as total_visites,
    (SELECT COUNT(*) FROM devis) as total_devis,
    (SELECT COUNT(*) FROM devis WHERE statut = 'pending') as devis_en_attente,
    (SELECT COUNT(*) FROM produits WHERE actif = TRUE) as total_produits,
    (SELECT COUNT(*) FROM galerie WHERE actif = TRUE) as total_photos,
    (SELECT COUNT(*) FROM commandes) as total_commandes,
    (SELECT SUM(montant_total) FROM commandes WHERE statut_paiement = 'paid') as chiffre_affaires;

-- Vue des visites par jour
CREATE OR REPLACE VIEW visites_par_jour AS
SELECT 
    date_visite,
    COUNT(*) as nombre_visites,
    COUNT(DISTINCT ip_address) as visiteurs_uniques
FROM visites
GROUP BY date_visite
ORDER BY date_visite DESC;

-- Vue des produits populaires
CREATE OR REPLACE VIEW produits_populaires AS
SELECT 
    p.id,
    p.nom,
    p.prix,
    p.vues,
    c.nom as categorie,
    COUNT(ci.id) as nombre_ventes
FROM produits p
LEFT JOIN categories c ON p.categorie_id = c.id
LEFT JOIN commandes_items ci ON p.id = ci.produit_id
WHERE p.actif = TRUE
GROUP BY p.id
ORDER BY p.vues DESC, nombre_ventes DESC
LIMIT 10;

-- ============================================
-- Procédures stockées
-- ============================================

DELIMITER //

-- Procédure pour enregistrer une visite
CREATE PROCEDURE enregistrer_visite(
    IN p_page VARCHAR(255),
    IN p_ip VARCHAR(45),
    IN p_user_agent TEXT,
    IN p_referer VARCHAR(255),
    IN p_session_id VARCHAR(100)
)
BEGIN
    INSERT INTO visites (page, ip_address, user_agent, referer, session_id, date_visite, heure_visite)
    VALUES (p_page, p_ip, p_user_agent, p_referer, p_session_id, CURDATE(), CURTIME());
END //

-- Procédure pour créer une commande
CREATE PROCEDURE creer_commande(
    IN p_numero VARCHAR(50),
    IN p_nom VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_telephone VARCHAR(20),
    IN p_adresse TEXT,
    IN p_ville VARCHAR(100),
    IN p_commune VARCHAR(100),
    IN p_notes TEXT,
    IN p_mode_paiement VARCHAR(20),
    IN p_montant DECIMAL(10,2),
    IN p_ip VARCHAR(45),
    OUT p_commande_id INT
)
BEGIN
    INSERT INTO commandes (
        numero_commande, nom_client, email_client, telephone_client,
        adresse_livraison, ville, commune, notes_livraison,
        mode_paiement, montant_total, ip_address
    ) VALUES (
        p_numero, p_nom, p_email, p_telephone,
        p_adresse, p_ville, p_commune, p_notes,
        p_mode_paiement, p_montant, p_ip
    );
    
    SET p_commande_id = LAST_INSERT_ID();
END //

DELIMITER ;

-- ============================================
-- Triggers
-- ============================================

DELIMITER //

-- Trigger pour incrémenter les vues d'un produit
CREATE TRIGGER increment_produit_vues
AFTER INSERT ON visites
FOR EACH ROW
BEGIN
    IF NEW.page LIKE '%produit%' THEN
        UPDATE produits 
        SET vues = vues + 1 
        WHERE CONCAT('produit-', id) = SUBSTRING_INDEX(NEW.page, '/', -1);
    END IF;
END //

DELIMITER ;

-- ============================================
-- Index pour optimisation
-- ============================================

-- Index composites pour les requêtes fréquentes
CREATE INDEX idx_devis_statut_date ON devis(statut, created_at);
CREATE INDEX idx_commandes_statut_date ON commandes(statut, created_at);
CREATE INDEX idx_produits_categorie_actif ON produits(categorie_id, actif);
CREATE INDEX idx_visites_date_page ON visites(date_visite, page);

-- ============================================
-- Fin du script
-- ============================================
