---
layout: single
title:  "Comment installer Microsoft SQL Server 2016"
last_modified_at: 2020-12-07
header:
  teaser: "/assets/images/posts/2019-03-26-install-sql-server-2016/logo-sql-444x240.png"
  og_image: "/assets/images/posts/2019-03-26-install-sql-server-2016/logo-sql-444x240.png"
type: posts
classes: wide
comments: true
read_time: true
categories:
  - SQL
tags:
  - Windows
  - SQL
  - SQL Server
  - SQL Server 2016
  - Microsoft
  - Server
  - Structured Query Language
  - RDBMS
  - Relational Database Management System
  - Language SQL
  - Powershell
  - .NET Framework 3.5
  - .NET Framework 4.6
  - Stand-alone
  - Microsoft Update
  - Database Engine Services
  - Reporting Services
  - Instance
  - SQL Server Agent
  - SQL Server Database Engine
  - SQL Server Reporting Services
  - Microsoft SQL Server Management Studio
  - SSMS
  - SQL Server Management Studio
  - Authentification
  - Databases
---

![image-left](/assets/images/posts/2019-03-26-install-sql-server-2016/logo-sql-222x150.png){: .align-left}
SQL server désigne un serveur de base de données. La définition du SQL server est étroitement liée à celle du langage **SQL (Structured Query Language)**, un langage informatique qui permet d'exploiter les bases de données. Microsoft SQL Server permet le fonctionnement de SQL et peut créer des tables dans une base de donnée relationnelle, ainsi que l'ajout,  la modification ou la suppression d’entrer a l’intérieur de celle-ci.
{: .text-justify}

{% include toc icon="align-left" title="Table des matières" %}


## Les principes

Concrètement, un SQL server est un outil qui possède toutes les caractéristiques pour pouvoir accompagner l'utilisateur dans la manipulation, le contrôle, le tri, la mise à jour, et bien d'autres actions encore, de bases de données grâce au langage SQL.
{: .text-justify}

Le terme désigne également le nom donné au **système de gestion de base de données (SGBD)** ou **relational database management system (RDBMS) en anglais**, commercialisé par Microsoft, ou plus précisément le nom du moteur de bases de données de ce SGDB, SQL server offre de multiples fonctionnalités.
{: .text-justify}


### Prérequis

Voici les prérequis minimum pour un serveur hébergent SQL Server 2016.
{: .text-justify}

| Hardware     | Spécification |
|---------     | ----------- |
| **CPU :** | 1.4 GHz 64-bit |
| **RAM :** | 1024Mo |
| **Disque dur :** | 40Go d’espace disque |
| **Réseau :** | Une connexion réseau |


### Hardware

Pour ce tutoriel, j'utiliserais une machine virtuel avec **Windows Server 2016 Standard** intégré dans le domaine **corp.priv** créé précédemment avec la configuration suivante :
{: .text-justify}

| Hardware     | Spécification |
|---------     | ----------- |
| **CPU :** | 4 vCPU |
| **RAM :** | 4Go |
| **Disque dur :** | C:\System 40Go, D:\Data 20Go |
| **Réseau :** | Host-only |


### Network

| Champs     | Valeurs |
|---------     | ----------- |
| **IP address :** | 192.168.100.101 |
| **Subnet :** | 255.255.255.0 |
| **Default gateway :** | 192.168.100.254 |
| **DNS :** | 192.168.100.100 (server Active Directory) |


## Préparation du serveur

Ouvrez le **"Server Manager"**, le programme se lance au démarrage.
{: .text-justify}

Cliquer sur **"Local Server"** remplissez les paramètres suivant.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-26-install-sql-server-2016/2019-02-17-19_30_50.png){: .align-center}

- **Computer name :** donner un nom significatif à votre serveur, pour ma part, je prendrais pour exemple : **CORPWSQL1**.
- **Windows Firewall :** désactiver le firewall de Windows.
- **Remote Desktop :** activer le bureau à distance.
- **Ethernet0 :** définissez une adresse IP fixe, je prendrais pour exemple : **192.168.100.101**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-26-install-sql-server-2016/2019-02-17-19_32_02.png){: .align-center}

<i class="fas fa-exclamation-triangle"></i> **Avertissement** <br>
Il est recommandé par Microsot d'effectuer toutes les mises à jour avant toutes installations de rôles.
{: .notice--warning .text-justify}


## Installation des prérequis

### Préparation des droits d'accès 

Sur votre serveur Active Directory, pour moi **CORPWADS1**. Et créez un groupe et un utilisateur pour administrer le serveur SQL: 
{: .text-justify}

- Groupe : **GRP_SQL_Admins** 
  - Groupe scope **"Domain local"** 
  - Group type **"Security"**
- Utilisateur : **SVC_SQL_Adm** 
  - Pour des raisons de sécuritées activer les options : **"User cannot change password"** 
  - Cocher aussi l'option : **"Password never expires"**
{: .text-justify}
![image-center](/assets/images/posts/2019-03-26-install-sql-server-2016/2019-02-26-22_03_11-1.png){: .align-center}


### Préparation du serveur 

Ouvrez le **"Start Menu"**. Cliquer sur **"Windows PowerShell"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-26-install-sql-server-2016/2019-02-26-21_03_11-1.png){: .align-center}

Exectuer la commande suivante pour installer **.NET Framework 3.5** et **.NET Framework 4.6** :
{: .text-justify}
```powershell
Install-WindowsFeature -Name NET-Framework-Features -Source Z:\sources\sxs
```
![image-center](/assets/images/posts/2019-03-26-install-sql-server-2016/2019-02-26-21_05_11-1.png){: .align-center}

Afin de vérifier que les fonctionnalitées sont bien installées, executer la commande suivante :
{: .text-justify}
```powershell
Get-WindowsFeature -Name "NET-Framework-Core", "NET-Framework-45-Features"
```
![image-center](/assets/images/posts/2019-03-26-install-sql-server-2016/2019-02-26-21_07_11-1.png){: .align-center}



## Installation de SQL Server 2016

Ouvrez l'ISO de l'installation de SQL Server 2016 et cliquer sur **"setup"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-26-install-sql-server-2016/2019-02-26-22_04_33-1.png){: .align-center}

Dans le menu de gauche cliquer sur **"Installation"**. Dans le la fenetre de droite, cliquer sur **"New SQL Server stand-alone installation or add features to an existing installation"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-26-install-sql-server-2016/2019-02-26-22_05_50-1.png){: .align-center}

**Product Key :** sélectionner **"Enter the product key:"** et entrer votre **Key**. Puis cliquer sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-26-install-sql-server-2016/2019-02-26-22_06_19-1.png){: .align-center}

**License Terms :** accepter le contrat de licence en cochant la case **"I accept the license terms."**. <br/>Cliquer sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-26-install-sql-server-2016/2019-02-26-22_06_33-1.png){: .align-center}

**Global Rules :** l'assistant vérifie les pré-requis. Cliquer sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-26-install-sql-server-2016/2019-02-26-22_06_54-1.png){: .align-center}

**Microsoft Update :** cocher la case **"Use Microsoft Update to check for updates (recommended)"** pour vérifier les mises à jour du produit. Cliquer sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-26-install-sql-server-2016/2019-02-26-22_07_44-1.png){: .align-center}

**Product Updates :** l'assistant liste les mises à jour qui seront installés. <br/>Cliquer sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-26-install-sql-server-2016/2019-02-26-22_07_44-1.png){: .align-center}

**Install Rules :** si toutes l'installation des règles est complète, cliquer sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-26-install-sql-server-2016/2019-02-26-22_10_05-1.png){: .align-center}

**Feature Selection :** séléctionner les options suivantes :
{: .text-justify}
- **"Database Engine Services"**
- **"Reporting Services - Native"**
{: .text-justify}
Puis, effectuer les actions suivantes :
{: .text-justify}
- Dans le champs **"Instance root directory:"** par : **"D:\Program Files\Microsoft SQL Server\"**.
- Dans le champs **"Shared feature directory:"** par : **"D:\Program Files\Microsoft SQL Server\"**.
- Dans le champs **"Shared feature directory (x86):"** par : **"D:\Program Files (x86)\Microsoft SQL Server\"**
{: .text-justify}
Cliquer sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-26-install-sql-server-2016/2019-02-26-22_12_04-1.png){: .align-center}

**Instance Configuration :** dans cette partie, vous pouvez éditer le nom de l'instance si vous le souhaitez. Cliquer sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-26-install-sql-server-2016/2019-02-26-22_14_40-1.png){: .align-center}

**Server Configuration :** renseigner les champs suivants avec le compte **SVC_SQL_Adm** créé précédemment :
{: .text-justify}
- **"SQL Server Agent"**
- **"SQL Server Database Engine"**
- **"SQL Server Reporting Services"**
{: .text-justify}
![image-center](/assets/images/posts/2019-03-26-install-sql-server-2016/2019-02-26-22_18_40-1.png){: .align-center}

**Database Engine Configuration :** sélectionner l'option **"Windows authentification mode"** et ajouter le groupe créé **GRP_SQL_Admins**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-26-install-sql-server-2016/2019-02-26-22_21_42-1.png){: .align-center}

**Reporting Services Configuration :** sélectionner **"Install and configure"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-26-install-sql-server-2016/2019-02-26-22_22_06-1.png){: .align-center}

**Feature Configuration Rules :** une fois toutes les vérifications passées, cliquer sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-26-install-sql-server-2016/2019-02-26-22_22_26-1.png){: .align-center}

**Ready to Install :** un résumé des composant qui serons installés s'affiche, cliquer sur **"Install"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-26-install-sql-server-2016/2019-02-26-22_22_42-1.png){: .align-center}

**Installation Progress :** l'installation commence.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-26-install-sql-server-2016/2019-02-26-22_36_12-1.png){: .align-center}

**Complete :** l'installation est finie, l'assistant affiche les informations du setup. Cliquer sur **"Close"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-26-install-sql-server-2016/2019-02-26-22_38_20-1.png){: .align-center}


## Installation Microsoft SQL Server Management Studio

Télécharger SSMS sur le site de Microsoft a l'adresse suivante : [download](https://go.microsoft.com/fwlink/?linkid=2088649&clcid=0x409).
{: .text-justify}

Exécuter le setup **"SSMS-Setup-ENU.exe"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-26-install-sql-server-2016/2019-02-26-22_48_41-1.png){: .align-center}


Cliquer sur **"Install"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-26-install-sql-server-2016/2019-02-26-22_49_00-1.png){: .align-center}

L'installation progresse.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-26-install-sql-server-2016/2019-02-26-22_56_14-1.png){: .align-center}

Une fois l'installation terminée, cliquer sur **"Restart"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-26-install-sql-server-2016/2019-02-26-22_57_42-1.png){: .align-center}


## Connexion a Microsoft SQL Server 2016

Cliquer sur l'icone **"Microsoft SQL Server Management Studio 17"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-26-install-sql-server-2016/2019-02-26-22_59_41-1.png){: .align-center}

Managment Studio démarre.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-26-install-sql-server-2016/2019-02-26-23_00_23-1.png){: .align-center}

Une fenêtre de connexion apparaît. Les informations de connexion étant pré remplis avec les informations du compte Windows connecté, il ne resta plus qu'a cliquer sur **"Connect"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-26-install-sql-server-2016/2019-02-26-23_01_28-1.png){: .align-center}

La connexion au serveur est maintenant OK. Dans la fenêtre **"Object Explorer"** et **"Databases"** vous pourrez voir les bases de données de votre serveur.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-26-install-sql-server-2016/2019-02-26-23_03_33-1.png){: .align-center}


## Configurer SQL Server 2016 pour SCCM

Ouvrez une fenêtre **"Command Prompt"** et placer vous sur le lecteur **"Z:\"** de l'ISO SQL Server 2016.
{: .text-justify}

Exécuter la commande suivante :
{: .text-justify}
```bash
Setup.exe /QUIET /ACTION=REBUILDDATABASE /SQLCOLLATION=SQL_Latin1_General_CP1_CI_AS /INSTANCENAME=MSSQLSERVER /SQLSYSADMINACCOUNTS=corp\SVC_SQL_Adm
```
![image-center](/assets/images/posts/2019-03-26-install-sql-server-2016/2019-02-26-23_03_33-2.png){: .align-center}

Et voilà ! À vous de profiter de votre serveur Microsoft SQL Server 2016.
{: .text-justify}