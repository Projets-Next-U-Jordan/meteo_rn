# Setup
Il y a 2 branches à votre disposition, une utilisant [Bun](https://github.com/Projets-Next-U-Jordan/meteo_rn/tree/bun) et une utilisant [Node](https://github.com/Projets-Next-U-Jordan/meteo_rn/tree/node) (les projets sont fondamentalement les mêmes il y a juste les dépendances qui changent)

_Le bouton `Download Zip` dans le menu déroulant `Code` télécharge la branche "actuellement sélectionné", il y a donc juste à changer de branche et download zip. Ou cloner le projet et changer de branches_

Vous n'avez plus cas setup le projet
```
bun install
// OU
npm install
```

Et lancer Expo
```
bun start
npm start
```

Si jamais l'application décide de ne pas fonctionner de votre coté, une vidéo démo est mise en place ci-dessous

https://github.com/Projets-Next-U-Jordan/meteo_rn/assets/55529456/bb81b18c-1895-480c-8ebc-e9b9d87b7ed1

---

# Consignes du projet:

## Application 2 : Prévisions météo
Vous allez créer une application de prévisions météo. Le rendu se fera sous la forme d'un lien vers un repository GitHub ou GitLab. Tout rendu sous la forme d'un zip ne sera pas corrigé.
Veillez à pusher régulièrement votre code sur votre repo, idéalement à chaque step.
L'application comportera deux sections : une section permettant d'afficher la météo actuelle (à l'instant t) et une section correspondant aux prévisions météo sur 5j toutes les 3h (fonctionnalités gratuites de l'API).

Vous utiliserez l'API Openweathermap.

## Step 1
- Créer un compte sur le site : https://openweathermap.org/
- Créez une clé API gratuite
- Parcourez la documentation pour affichier les end-points disponibles en version gratuite : https://openweathermap/org/price
## Step 2
- Utiliser un module fourni par Expo Go afin d'obtenir la position de votre téléphone (latitude, longitude)
## Step 3
- Afficher la météo du jour : au moins le nom de la ville, température en Celsius, description du temps et icône correspondante
## Step 4
- Afficher les prévisions météo sur 5 jours toutes les trois heures grâce aux fonctionnalités de scroll, afin de garder un affichage léger et compréhensible (mêmes éléments que ceux affichés sur la météo actuelle)
## Step 5
- Découpage de votre code en composants
- Styliser votre application
- Ajouter un loader le temps que les données de l'API soient chargées
