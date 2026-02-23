@echo off
echo ========================================
echo EVORA DESIGN - Commit des changements
echo ========================================
echo.

echo Verification du statut Git...
git status
echo.

echo ========================================
echo Ajout de tous les fichiers...
git add -A
echo.

echo ========================================
echo Fichiers ajoutes:
git status --short
echo.

echo ========================================
echo Creation du commit...
git commit -m "fix: Correction complete images, flux produits et utilisateurs

- Normalisation des noms de fichiers images (sans espaces ni caracteres speciaux)
- Correction des chemins dans admin/categories.html (../images/ -> ../Images/)
- Ajout de placeholder.jpg pour les images manquantes
- Correction des references au logo dans devis, panier, commande, confirmation
- Utilisation de data URI SVG pour les fallbacks d'images dans script.js et admin/products.html
- Toutes les images des categories pointent maintenant vers des fichiers existants
- Verification complete du flux d'ajout de produits (localStorage)
- Correction du flux utilisateurs: ajout de loadUsers() et saveUsers()
- Les utilisateurs persistent maintenant au rechargement de la page
- Creation de tests automatiques: test-ajout-produit.html et test-ajout-utilisateur.html
- Documentation complete avec 6 fichiers de verification"

echo.
echo ========================================
echo Commit cree avec succes!
echo.

echo Voulez-vous pusher vers GitHub? (O/N)
set /p push="Reponse: "

if /i "%push%"=="O" (
    echo.
    echo Push vers origin main...
    git push origin main
    echo.
    echo ========================================
    echo Push termine avec succes!
    echo ========================================
) else (
    echo.
    echo Push annule. Vous pouvez pusher plus tard avec: git push origin main
)

echo.
pause
