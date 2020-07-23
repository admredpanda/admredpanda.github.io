---
layout: single
title:  "Installer Microsoft SQL Server 2016 sur Windows server 2016"
header:
  teaser: "/assets/images/Posts/2019-03-26-installer-SQL-server-2016/logo-sql-server-2016.png"
  og_image: "/assets/images/Posts/2019-03-26-installer-SQL-server-2016/logo-sql-server-2016.png"
type: posts
classes: wide
comments: true
read_time: true
categories:
  - SQL
tags:
  - Windows
  - Windows Server
  - Windows Server 2016
  - SQL
  - SQL Server
  - SQL Server 2016
excerpt_separator: <!--more-->
---

<p style="text-align: justify;"><img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-installer-SQL-server-2016/logo-sql-server-2016.png" class="align-left">
SQL server désigne un serveur de base de données. La définition du SQL server est étroitement liée à celle du langage <strong>SQL (Structured Query Language)</strong><!--more-->, un langage informatique permettant d'exploiter des bases de données.</p>

<h2>Les principes</h2>

<p style="text-align: justify;">Concrètement, un SQL server est un outil qui possède toutes les caractéristiques pour pouvoir accompagner l'utilisateur dans la manipulation, le contrôle, le tri, la mise à jour, et bien d'autres actions encore, de bases de données grâce au langage SQL.</p>

<p style="text-align: justify;">Le terme désigne également le nom donné au <strong>système de gestion de base de données (SGBD)</strong> commercialisé par Microsoft, ou plus précisément le nom du moteur de bases de données de ce SGDB, SQL server offre de multiples fonctionnalités.</p>


<h3>Prérequis</h3>
<p style="text-align: justify;">Voici les prérequis minimum pour un serveur hébergent SQL Server 2016.</p>

| Hardware     | Spécification |
|---------     | ----------- |
| **CPU :** | 1.4 GHz 64-bit |
| **RAM :** | 1024Mo |
| **Disque dur :** | 40Go d’espace disque |
| **Réseau :** | Une connexion réseau |

<p style="text-align: justify;">Pour ce tutoriel, j'utiliserais une machine virtuel avec <strong>Windows Server 2016 Standard</strong> intégré dans le domaine <strong>corp.priv</strong> créé précédemment avec la configuration suivante :</p>

<h3>Hardware</h3>

| Hardware     | Spécification |
|---------     | ----------- |
| **CPU :** | 4 vCPU |
| **RAM :** | 4Go |
| **Disque dur :** | C:\System 40Go, D:\Data 20Go |
| **Réseau :** | Host-only |

<h3>Network</h3>

| Champs     | Valeurs |
|---------     | ----------- |
| **IP address :** | 192.168.100.101 |
| **Subnet :** | 255.255.255.0 |
| **Default gateway :** | 192.168.100.254 |
| **DNS :** | 192.168.100.100 (server Active Directory) |

<h2>Préparation du serveur</h2>
<p style="text-align: justify;">Ouvrez le <strong>"Server Manager"</strong>, le programme se lance au démarrage.</p>
<p style="text-align: justify;">Cliquer sur <strong>"Local Server"</strong> remplissez les paramètres suivant.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-installer-SQL-server-2016/2019-02-17-19_30_50.png" class="align-center">
<ul>
  <li><strong>Computer name :</strong> Donner un nom significatif à votre serveur, pour ma part, je prendrais pour exemple : <strong>CORPWSQL1</strong>.</li>
  <li><strong>Windows Firewall :</strong> Désactiver le firewall de Windows.</li>
  <li><strong>Remote Desktop :</strong> Activer le bureau à distance.</li>
  <li><strong>Ethernet0 :</strong> Définissez une adresse IP fixe, je prendrais pour exemple : <strong>192.168.100.101</strong></li>
</ul>
<p style="text-align: justify;">
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-installer-SQL-server-2016/2019-02-17-19_32_02.png" class="align-center">
</p>
<span class="notice--warning" >Il est recommandé par Microsot d'effectuer toutes les mises à jour avant toutes installations de rôles.</span>

<h2>Installation des prérequis</h2>

<p style="text-align: justify;">Ouvrez le <strong>"Start Menu"</strong>. Cliquer sur <strong>"Windows PowerShell"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-installer-SQL-server-2016/2019-02-26-21_03_11-1.png" class="align-center">

<p style="text-align: justify;">Exectuer la commande suivante pour installer le <strong>.NET Framework 3.5</strong> et le <strong>.NET Framework 4.6</strong> :</p>
```powershell
Install-WindowsFeature -Name NET-Framework-Features -Source Z:\sources\sxs
```
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-installer-SQL-server-2016/2019-02-26-21_05_11-1.png" class="align-center">

<p style="text-align: justify;">Afin de vérifier que les fonctionnalitées sont bien installées, executer la commande suivante :</p>
```powershell
Get-WindowsFeature -Name "NET-Framework-Core", "NET-Framework-45-Features"
```
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-installer-SQL-server-2016/2019-02-26-21_07_11-1.png" class="align-center">

<p style="text-align: justify;">Ensuite créer un groupe et un utilisateur pour administrer le serveur SQL :
<ul>
  <li>Groupe : <strong>GRP_SQL_Admins</strong> : 
    <ul>
      <li>Groupe scope <strong>"Domain local"</strong></li> 
      <li>Group type <strong>"Security"</strong></li>
    </ul>
  </li>
  <li>Utilisateur : <strong>SVC_SQL_Adm</strong> : 
    <ul>
      <li>Pour des raisons de sécuritées activer les options : <strong>"User cannot change password"</strong></li> 
      <li>Cocher aussi l'option : <strong>"Password never expires"</strong></li>
    </ul>
  </li>
</ul></p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-installer-SQL-server-2016/2019-02-26-22_03_11-1.png" class="align-center">


<h2>Installation de SQL Server 2016</h2>

<p style="text-align: justify;">Ouvrez l'ISO de l'installation de SQL Server 2016 et cliquer sur <strong>"setup"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-installer-SQL-server-2016/2019-02-26-22_04_33-1.png" class="align-center">

<p style="text-align: justify;">Dans le menu de gauche cliquer sur <strong>"Installation"</strong>. Dans le la fenetre de droite, cliquer sur <strong>"New SQL Server stand-alone installation or add features to an existing installation"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-installer-SQL-server-2016/2019-02-26-22_05_50-1.png" class="align-center">

<p style="text-align: justify;"><strong>Product Key :</strong> Sélectionner <strong>"Enter the product key:"</strong> et entrer votre <strong>Key</strong>. <br/>Puis cliquer sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-installer-SQL-server-2016/2019-02-26-22_06_19-1.png" class="align-center">

<p style="text-align: justify;"><strong>License Terms :</strong> Accepter le contrat de licence en cochant la case <strong>"I accept the license terms."</strong>. <br/>Cliquer sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-installer-SQL-server-2016/2019-02-26-22_06_33-1.png" class="align-center">

<p style="text-align: justify;"><strong>Global Rules :</strong> L'assistant vérifie les pré-requis. Cliquer sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-installer-SQL-server-2016/2019-02-26-22_06_54-1.png" class="align-center">

<p style="text-align: justify;"><strong>Microsoft Update :</strong> Cocher la case <strong>"Use Microsoft Update to check for updates (recommended)"</strong> pour vérifier les mises à jour du produit. Cliquer sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-installer-SQL-server-2016/2019-02-26-22_07_44-1.png" class="align-center">

<p style="text-align: justify;"><strong>Product Updates :</strong> L'assistant liste les mises à jour qui seront installés. <br/>Cliquer sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-installer-SQL-server-2016/2019-02-26-22_08_10-1.png" class="align-center">

<p style="text-align: justify;"><strong>Install Rules :</strong> Si toutes l'installation des règles est complète, cliquer sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-installer-SQL-server-2016/2019-02-26-22_10_05-1.png" class="align-center">

<p style="text-align: justify;"><strong>Feature Selection : </strong> Séléctionner les options suivantes :
<ul>
  <li><strong>"Database Engine Services"</strong></li>
  <li><strong>"Reporting Services - Native"</strong></li>
</ul>

Puis, effectuer les actions suivantes :
<ul>
  <li>Dans le champs <strong>"Instance root directory:"</strong> par : <strong>D:\Program Files\Microsoft SQL Server\</strong>.</li>
  <li>Dans le champs <strong>"Shared feature directory:"</strong> par : <strong>D:\Program Files\Microsoft SQL Server\</strong>.</li>
  <li>Dans le champs <strong>"Shared feature directory (x85):"</strong> par : <strong>D:\Program Files (x86)\Microsoft SQL Server\</strong>.</li>
</ul>

Cliquer sur <strong>"Next >"</strong>.</p>

<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-installer-SQL-server-2016/2019-02-26-22_12_04-1.png" class="align-center">

<p style="text-align: justify;"><strong>Instance Configuration :</strong> Dans cette partie, vous pouvez éditer le nom de l'instance si vous le souhaitez. Cliquer sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-installer-SQL-server-2016/2019-02-26-22_14_40-1.png" class="align-center">

<p style="text-align: justify;"><strong>Server Configuration :</strong> Renseigner les champs suivants avec le compte <strong>SVC_SQL_Adm</strong> créé précédemment :</p>
<ul>
  <li><strong>"SQL Server Agent"</strong></li>
  <li><strong>"SQL Server Database Engine"</strong></li>
  <li><strong>"SQL Server Reporting Services"</strong></li>
</ul>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-installer-SQL-server-2016/2019-02-26-22_18_40-1.png" class="align-center">

<p style="text-align: justify;"><strong>Database Engine Configuration :</strong> Sélectionner l'option <strong>"Windows authentification mode"</strong> et ajouter le groupe créé <strong>GRP_SQL_Admins</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-installer-SQL-server-2016/2019-02-26-22_21_42-1.png" class="align-center">

<p style="text-align: justify;"><strong>Reporting Services Configuration :</strong> Sélectionner <strong>"Install and configure"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-installer-SQL-server-2016/2019-02-26-22_22_06-1.png" class="align-center">

<p style="text-align: justify;"><strong>Feature Configuration Rules :</strong> Une fois toutes les vérifications passées, cliquer sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-installer-SQL-server-2016/2019-02-26-22_22_26-1.png" class="align-center">

<p style="text-align: justify;"><strong>Ready to Install :</strong> Un résumé des composant qui serons installés s'affiche, cliquer sur <strong>"Install"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-installer-SQL-server-2016/2019-02-26-22_22_42-1.png" class="align-center">

<p style="text-align: justify;"><strong>Installation Progress :</strong> L'installation commence.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-installer-SQL-server-2016/2019-02-26-22_36_12-1.png" class="align-center">

<p style="text-align: justify;"><strong>Complete :</strong> L'installation est finie, l'assistant affiche les informations du setup. Cliquer sur <strong>"Close"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-installer-SQL-server-2016/2019-02-26-22_38_20-1.png" class="align-center">


<h2>Installation Microsoft SQL Server Management Studio</h2>

<p style="text-align: justify;">Télécharger SSMS sur le site de Microsoft a l'adresse suivante : <a href="https://go.microsoft.com/fwlink/?linkid=2088649&clcid=0x409" alt="Lien SSMS">download</a></p>

<p style="text-align: justify;">Exécuter le setup <strong>"SSMS-Setup-ENU.exe"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-installer-SQL-server-2016/2019-02-26-22_48_41-1.png" class="align-center">

<p style="text-align: justify;">Cliquer sur <strong>"Install"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-installer-SQL-server-2016/2019-02-26-22_49_00-1.png" class="align-center">

<p style="text-align: justify;">L'installation progresse.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-installer-SQL-server-2016/2019-02-26-22_56_14-1.png" class="align-center">

<p style="text-align: justify;">Une fois l'installation terminée, cliquer sur <strong>"Restart"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-installer-SQL-server-2016/2019-02-26-22_57_42-1.png" class="align-center">

<h2>Connexion a Microsoft SQL Server 2016</h2>

<p style="text-align: justify;">Cliquer sur l'icone <strong>"Microsoft SQL Server Management Studio 17"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-installer-SQL-server-2016/2019-02-26-22_59_41-1.png" class="align-center">

<p style="text-align: justify;">Managment Studio démarre.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-installer-SQL-server-2016/2019-02-26-23_00_23-1.png" class="align-center">

<p style="text-align: justify;">Une fenêtre de connexion apparaît. Les informations de connexion étant pré remplis avec les informations du compte Windows connecté, il ne resta plus qu'a cliquer sur <strong>"Connect"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-installer-SQL-server-2016/2019-02-26-23_01_28-1.png" class="align-center">

<p style="text-align: justify;">La connexion au serveur est maintenant OK. Dans la fenêtre <strong>"Object Explorer"</strong> et <strong>"Databases"</strong> vous pourrez voir les bases de données de votre serveur.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-installer-SQL-server-2016/2019-02-26-23_03_33-1.png" class="align-center">

<h2>Configurer SQL Server 2016 pour SCCM</h2>

<p style="text-align: justify;">Ouvrez une fenêtre <strong>"Command Prompt"</strong> et placer vous sur le lecteur <strong>Z:\</strong> de l'ISO SQL Server 2016.</p>

<p style="text-align: justify;">Exécuter la commande suivante :</p>
```bash
Setup.exe /QUIET /ACTION=REBUILDDATABASE /SQLCOLLATION=SQL_Latin1_General_CP1_CI_AS /INSTANCENAME=MSSQLSERVER /SQLSYSADMINACCOUNTS=corp\SVC_SQL_Adm
```
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-installer-SQL-server-2016/2019-02-26-23_03_33-2.png" class="align-center">

<p style="text-align: justify;">Et voilà ! À vous de profiter de votre serveur Microsoft SQL Server 2016.</p>