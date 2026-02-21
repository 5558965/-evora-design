@echo off
echo ========================================
echo   PUBLICATION EVORA DESIGN SUR GITHUB
echo ========================================
echo.

REM Vérifier si Git est installé
git --version >nul 2>&1
if errorlevel 1 (
    echo [ERREUR] Git n'est pas installé !
    echo Téléchargez Git depuis : https://git-scm.com/download/win
    pause
    exit /b 1
)

echo [OK] Git est installé
echo.

REM Demander le nom d'utilisateur GitHub
set /p USERNAME="Entrez votre nom d'utilisateur GitHub : "
if "%USERNAME%"=="" (
    echo [ERREUR] Le nom d'utilisateur ne peut pas être vide !
    pause
    exit /b 1
)

echo.
echo ========================================
echo   ÉTAPE 1 : Initialisation Git
echo ========================================
git init
if errorlevel 1 (
    echo [ERREUR] Échec de l'initialisation Git
    pause
    exit /b 1
)
echo [OK] Git initialisé
echo.

echo ========================================
echo   ÉTAPE 2 : Ajout des fichiers
echo ========================================
git add .
if errorlevel 1 (
    echo [ERREUR] Échec de l'ajout des fichiers
    pause
    exit /b 1
)
echo [OK] Fichiers ajoutés
echo.

echo ========================================
echo   ÉTAPE 3 : Premier commit
echo ========================================
git commit -m "Initial commit - Site EVORA DESIGN complet"
if errorlevel 1 (
    echo [ERREUR] Échec du commit
    pause
    exit /b 1
)
echo [OK] Commit créé
echo.

echo ========================================
echo   ÉTAPE 4 : Liaison avec GitHub
echo ========================================
git remote remove origin >nul 2>&1
git remote add origin https://github.com/%USERNAME%/evora-design.git
if errorlevel 1 (
    echo [ERREUR] Échec de la liaison avec GitHub
    pause
    exit /b 1
)
echo [OK] Lié à GitHub
echo.

echo ========================================
echo   ÉTAPE 5 : Configuration de la branche
echo ========================================
git branch -M main
if errorlevel 1 (
    echo [ERREUR] Échec de la configuration de la branche
    pause
    exit /b 1
)
echo [OK] Branche configurée
echo.

echo ========================================
echo   ÉTAPE 6 : Publication sur GitHub
echo ========================================
echo.
echo IMPORTANT : GitHub va vous demander de vous authentifier
echo - Username : Votre nom d'utilisateur GitHub
echo - Password : Utilisez un Personal Access Token (pas votre mot de passe)
echo.
echo Pour créer un token :
echo 1. Allez sur GitHub ^> Settings ^> Developer settings
echo 2. Personal access tokens ^> Tokens (classic)
echo 3. Generate new token (classic)
echo 4. Cochez : repo (Full control)
echo 5. Copiez le token généré
echo.
pause

git push -u origin main
if errorlevel 1 (
    echo.
    echo [ERREUR] Échec de la publication
    echo.
    echo Causes possibles :
    echo - Le dépôt n'existe pas sur GitHub
    echo - Problème d'authentification
    echo - Connexion internet
    echo.
    echo Solution :
    echo 1. Créez d'abord le dépôt sur GitHub.com
    echo 2. Utilisez un Personal Access Token
    echo 3. Réessayez
    pause
    exit /b 1
)

echo.
echo ========================================
echo   SUCCÈS !
echo ========================================
echo.
echo Votre projet est maintenant sur GitHub !
echo URL : https://github.com/%USERNAME%/evora-design
echo.
echo Pour activer GitHub Pages (hébergement gratuit) :
echo 1. Allez sur votre dépôt GitHub
echo 2. Settings ^> Pages
echo 3. Source : main branch, / (root)
echo 4. Save
echo 5. Site accessible à : https://%USERNAME%.github.io/evora-design/
echo.
echo ========================================
pause
