# Backend DataWatt Loyn
Cette application est le backend de l'application DataWatt Loyn. Elle est développée en Node.js et utilise le framework Express.js.

## Installation

### Prérequis
- Node.js
- npm
- mysql

### Installation et configuration
Pour installer l'application, il suffit de cloner le dépôt git et d'installer les dépendances avec npm.
```bash
git clone https://github.com/Nathmaxx/projet-tutore-backend.git
cd projet-tutore-backend
npm install
```

Dans le dossier /scrapping, se trouve un fichier dump.sql qui contient la structure de la base de données. Il suffit de l'importer dans votre base de données mysql.
Commande pour importer le fichier dump.sql :
```bash
mysql -u root -p < dump.sql
```
A remplacer par le nom de votre utilisateur mysql.

Ensuite, il faut configurer les variables d'environnement. Pour cela, il faut créer un fichier .env à la racine du projet et y ajouter les variables suivantes :
```bash
PORT=3001
HOST_DB=localhost
USER_DB=ptut
PASS_DB=root
NAME_DB=ptut_db
PORT_DB=3306
NRG_LYON_API_KEY='PLonDxbQyo5L8H4kauqm/W8xuN19KJqSoMp3cqDXQEU='
```

### Lancement
Pour lancer l'application, il suffit de lancer la commande suivante :
```bash
npm run dev
```

## Documentation
L'api est disponible à l'adresse https://projet-tutore-backend.vercel.app/
Les information sont tirées du site de la ville de Lyon et de l'API de la métropole de Lyon : [https://data.grandlyon.com/](https://data.grandlyon.com/fr/datapusher/ws/rdata/nrj_energie.nrjcad_parcelles_2020/all.json?maxfeatures=-1&start=1&filename=consommations-energetiques-2020-a-parcelle-territoire-metropole-lyon)


### Routes

#### `parcelles`
- `GET /parcelles/annee/:annee` : Récupère toutes les parcelles pour une année donnée
- `GET /parcelles/:id` : Récupère une parcelle par son id

#### `consommations`
- `GET /consommations/` : Récupère toutes les consommations
- `GET /consommations/annee/:annee` : Récupère toutes les consommations pour une année donnée
- `GET /consommations/:id` : Récupère une consommation par son id
- `GET /consommations/commune/:commune/annee/:annee` : Récupère toutes les consommations pour une commune donnée et une année donnée
- `GET /consommations/stat/elect` : Récupère les statistiques sur les consommations électriques
- `GET /consommations/stat/gaz` : Récupère les statistiques sur les consommations de gaz
- `GET /consommations/stat/elec-gaz-commune` : Récupère les statistiques sur les consommations électriques et de gaz pour toutes les communes
- `GET /consommations/stat/conso-by-year` : Récupère les statistiques sur les consommations par année
- `GET /consommations/stat/conso-surface` : Récupère les statistiques sur les consommations electriques et de gaz par surface

### `consommations-industrielles`
