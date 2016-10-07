Principe du jeu :
Type de jeux par élimination de joueurs
2 vues disponibles :
Une vue cliente permettant au joueur de jouer sa partie
Une vue “tableau de bord” permettant de voir le jeu complet et le leader board et permettant de jouer en mode fantôme

Déroulement du jeu :
Entrée dans le jeu :
On peut entrer dans le jeu à n’importe quel moment
Si la partie est commencée : on arrive en mode fantôme
Apparition des balles au centre du terrain en direction de chaque joueurs (angle aléatoire en direction du but du joueur)
Carte : 
Nombre de joueur illimité
Map en forme de polygone régulier : 
nombre de mur == nombre de joueurs
Nombre de balles == Nombre de joueurs - 1
La forme de la carte évolue en fonction du nombre de joueurs vivants
Mode joueur : 
On protège ses buts entouré par deux murs.
Mouvement du joueur :
déplacements de gauche à droite
pivoter sur son axe central
poussée vers l’avant pour donner plus de force à la balle
Le joueur meurt quand il se prend 3 buts
Mode fantôme : 
Quand un joueur meurt il devient un fantôme
Par défaut, il peut se déplacer sur tout l’espace de jeu sans collision
Il peut disposer de bonus pour influencer la partie
Il ramasse les bonus en se déplaçant sur la carte
UI : 
Les portraits des autres joueurs occupe le tour de l’écran
Les portraits des joueurs proche de mes balles sont plus opaques que les autres joueurs
Ils ont également un z-index plus important
Le portrait d’un joueur est entouré de couleur 
Les balles envoyées par un joueur porte sa couleur et son image en fond
Le portrait d’un joueur explose quand il est tué
Les fantômes sont transparents (Sauf le joueur en lui même)
Victoire : 
Le dernier joueurs vivant remporte la partie
La forme se reconstruit en fonction du nombre de joueurs présents dans la partie

Librairies :
http://www.pixijs.com/
http://box2d.org/ => https://github.com/kripken/box2d.js/ (JS via emscripten)
https://developer.mozilla.org/fr/docs/Jeux/Introduction

Ressources utiles :
https://fr.wikipedia.org/wiki/Polygone_r%C3%A9gulier
http://www.alloprof.qc.ca/BV/pages/m1480.aspx


