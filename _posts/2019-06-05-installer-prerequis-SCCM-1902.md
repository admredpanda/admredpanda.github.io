---
layout: single
title:  "Installer les prérequis pour System Center Configuration Manager 1902"
header:
  teaser: "/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/logo-sccm-2016.png"
  og_image: "/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/logo-sccm-2016.png"
type: posts
classes: wide
comments: true
read_time: true
categories:
  - SCCM
tags:
  - SCCM
  - SCCM 1902
  - Windows Server
  - Windows Server 2016
  - Windows
excerpt_separator: <!--more-->
---

<p style="text-align: justify;"><img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/logo-sccm-2016.png" class="align-left"><strong>System Center Configuration Manager (SCCM)</strong> est un logiciel de gestion de système édité par Microsoft. Il est destiné la gestion de grands parcs informatique.<!--more--> Il permet : la prise de main à distance, la gestion et déploiement des mises à jour et correctifs, l’automatisation de tâches, la télédistribution d’applications, l’inventaire matériel et logiciel, la gestion de la conformité, l’administration des politiques de sécurité, le déploiement de systèmes d’exploitation.</p>

<p style="text-align: justify;">Pour ce tutoriel, j'utiliserais une machine virtuel avec <strong>Windows Server 2016 Standard</strong> intégré dans le domaine <strong>corp.priv</strong> créé précédemment avec la configuration suivante :</p>

<h3>Hardware</h3>

| Hardware     | Spécification |
|---------     | ----------- |
| **CPU :** | 4 vCPU |
| **RAM :** | 4Go |
| **Disque dur :** | C:\System 50Go, D:\Data 60Go |
| **Réseau :** | Host-only |

<h3>Network</h3>

| Champs     | Valeurs |
|---------     | ----------- |
| **IP address :** | 192.168.100.102 |
| **Subnet :** | 255.255.255.0 |
| **Default gateway :** | 192.168.100.254 |
| **DNS :** | 192.168.100.100 (server Active Directory) |

<h2>Préparation du serveur</h2>
<p style="text-align: justify;">Ouvrez le <strong>"Server Manager"</strong>, le programme se lance au démarrage.</p>
<p style="text-align: justify;">Cliquer sur <strong>"Local Server"</strong> remplissez les paramètres suivant.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-02-22-23_20_21-1.png" class="align-center">
<ul>
  <li><strong>Computer name :</strong> Donner un nom significatif à votre serveur, pour ma part, je prendrais pour exemple : <strong>CORPWSCM1</strong>.</li>
  <li><strong>Windows Firewall :</strong> Désactiver le firewall de Windows.</li>
  <li><strong>Remote Desktop :</strong> Activer le bureau à distance.</li>
  <li><strong>Ethernet0 :</strong> Définissez une adresse IP fixe, je prendrais pour exemple : <strong>192.168.100.102</strong></li>
</ul>
<p style="text-align: justify;">
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-02-22-23_25_21-1.png" class="align-center">
</p>
<span class="notice--warning" >Il est recommandé par Microsot d'effectuer toutes les mises à jour avant toutes installations de rôles.</span>

## Avant de commencer
<p style="text-align: justify;">Avant de commencer à mettre en place les conditions préalables à la mise en place des SCCM, il est nécessaire d'avoir suivi les trois articles suivant :</p>
<ul>
  <li><a href="{{ site.baseurl }}/active%20directory/installer-active-directory/">Installer un contrôleur de domaine Active Directory sur Windows Server 2016</a></li>
  <li><a href="{{ site.baseurl }}/dhcp/installer-dhcp-serveur/">Installer un serveur DHCP sur Windows Server 2016</a></li>
  <li><a href="{{ site.baseurl }}/sql/installer-sql-server-2016/">Installer Microsoft SQL Server 2016 sur Windows server 2016</a></li>
</ul>

## Préparation de l'Active Directory
<p style="text-align: justify;">Connectez-vous à votre serveur Active Directory pour effectuer les actions suivantes.</p>

### Création d'un compte de service

<p style="text-align: justify;">Créer un compte dans l'Active Directory, pour ma part je l'appellerais <strong>"Svc_SCCM_Adm"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-02-28 17_53_43-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">

### Créer le conteneur System Management

<p style="text-align: justify;">Ouvrez le <strong>"Server Manager"</strong> en haut à droite, cliquez sur <strong>"Tools"</strong> et sélectionnez <strong>"ADSI Edit"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-02-28 17_54_33-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">

<p style="text-align: justify;">Cliquez sur <strong>"ADSI Edit"</strong> et cliquez sur <strong>"Connect to..."</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-02-28 17_55_12-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">

<p style="text-align: justify;">Laissez les champs par défaut et cliquez sur <strong>"OK"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-02-28 17_55_35-mRemoteNG - confCons.xml - CORPWADS1P.png.png" class="align-center">

<p style="text-align: justify;">Cliquez sur <strong>"Default naming context"</strong>, cliquez sur <strong>"CN-System"</strong> et choisissez <strong>"New"</strong>, <strong>"Object..."</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-02-28 17_56_16-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">

<p style="text-align: justify;">Dans la liste <strong>"Select a class:"</strong> sélectionner <strong>"container"</strong> et cliquez sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-02-28 17_57_43-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">

<p style="text-align: justify;">Dans le champ <strong>"Value:"</strong> écrivez <strong>"System Management"</strong> et cliquez sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-02-28 17_58_18-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">

<p style="text-align: justify;">Pour terminer la création, cliquez sur <strong>"Finish"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-02-28 17_58_42-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">

### Ajouter des droits au conteneur System Management
<p style="text-align: justify;">Ouvrez le <strong>"Server Manager"</strong> en haut à droite, <strong>"click"</strong> sur <strong>"Tools"</strong> et sélectionnez <strong>"Active Directory Users and Computers"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-02-28 18_00_37-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">

<p style="text-align: justify;">En haut à gauche, cliquez sur <strong>"View"</strong> et activez l'option <strong>"Advanced Features"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-02-28 18_00_59-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">

<p style="text-align: justify;">Pour ajouter une délégation, cliquez sur  <strong>"System Management"</strong> et sélectionnez <strong>"Delegate Control..."</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-02-28 18_07_24-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">

<p style="text-align: justify;">L'assistant s'ouvre, cliquez sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-02-28 18_07_39-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">

<p style="text-align: justify;">Cliquez sur <strong>"Add..."</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-02-28 18_07_55-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">

<p style="text-align: justify;">Dans la fenêtre, cliquez sur <strong>"Object Types"</strong> et sélectionnez <strong>"Computers"</strong> pour pouvoir ajouter votre serveur SCCM.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-02-28 18_07_56-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">

<p style="text-align: justify;">Ajoutez votre serveur SCCM, pour ma part <strong>CORPWSCM1</strong> et ajoutez le compte <strong>Svc_SCCM_Adm</strong> créé précédemment.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-02-28 18_08_37-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">

<p style="text-align: justify;">Sélectionnez <strong>"Create a custom task to delegate"</strong> et cliquez sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-02-28 18_09_01-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">

<p style="text-align: justify;">Sélectionnez <strong>This folder, existing objects in this folder, and creation of new objects in this folder"</strong> et cliquez sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-02-28 18_09_21-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">

<p style="text-align: justify;">Dans la section <strong>"Show these permissions:"</strong>, sélectionnez les options suivantes :
<ul>
  <li><strong>"General"</strong></li>
  <li><strong>"Property-specific"</strong></li>
  <li><strong>"Creation/deletion of specific chold objects"</strong></li>
</ul>
Dans la section <strong>"Permissions:"</strong> sélectionnez l'option <strong>"Full Control"</strong>. Et cliquez sur <strong>"Next >"</strong>. 
</p>

<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-02-28 18_09_49-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">

<p style="text-align: justify;">Pour finir l'assistant affiche le récapitulatif des actions. Cliquez sur <strong>"Finish"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-02-28 18_10_11-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">

### Modification du schéma Active Directory

<p style="text-align: justify;">Connectez-vous à votre serveur SCCM pour effectuer les actions suivantes.</p>
<p style="text-align: justify;">Rendez-vous dans le dossier suivant <strong>"Z:\SMSSETUP\BIN\X64\"</strong> sur votre CD d'installation SCCM, et exécutez <strong>"extadsch.exe"</strong> avec l'option <strong>"Run as administrator"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-02-28 18_13_27-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">

<p style="text-align: justify;">Lorsque l'opération est terminée, un fichier <strong>"ExtADsch.log"</strong> est généré.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-02-28 18_14_08-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">

<p style="text-align: justify;">Voici le contenu du fichier journal. On peut voir que l'opération s'est correctement déroulée grâce à la ligne <strong>"Successfully extend the Active Directory schema."</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-02-28 18_14_30-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">


## Préparation du serveur du SCCM

### Installation des rôles et des fonctionnalités

<p style="text-align: justify;">Pour installer le <strong>Background Intelligent Transfer Service (BITS)</strong> et <strong>Remote Differential Compression (RDC)</strong> effectuer la commande suivante :</p>
```powershell
Install-WindowsFeature -Name BITS , RDC
```
<p style="text-align: justify;">Voici le résultat :</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-02-28 18_40_08-mRemoteNG - confCons.xml - CORPWSCM1P.png" class="align-center">

<p style="text-align: justify;">Pour installer le <strong>.NET Framework 3.5</strong> et <strong>.NET Framework 4.5</strong> exécutez la commande suivante :</p>
```powershell
Install-WindowsFeature -Name NET-Framework-Features , NET-Framework-45-Features
```
<p style="text-align: justify;">Voici le résultat :</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-02-28 18_41_24-mRemoteNG - confCons.xml - CORPWSCM1P.png" class="align-center">

<p style="text-align: justify;">Pour installer le <strong>IIS web server</strong> avec les composants nécessaires, exécutez la commande suivante :</p>
```powershell
Install-WindowsFeature -Name Web-Server , Web-Common-Http , Web-Static-Content , Web-Http-Errors , Web-Security , Web-Windows-Auth , Web-App-Dev , Web-Asp-Net, Web-Asp-Net45, Web-Net-Ext, Web-Net-Ext45, Web-ISAPI-Ext, Web-Mgmt-Compat, Web-Lgcy-Mgmt-Console, Web-Metabase, Web-Wmi, Web-Scripting-Tools -IncludeManagementTools
```
<p style="text-align: justify;">Voici le résultat :</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-02-28 18_42_10-mRemoteNG - confCons.xml - CORPWSCM1P.png" class="align-center">


### Installation de Windows ADK pour Windows 10

<p style="text-align: justify;">Dans cette partie, nous verrons comment installer le <strong>Windows Assessment and Deployment Kit (Windows ADK)</strong> pour Windows 10.</p>

<p style="text-align: justify;">Téléchargez le Windows ADK for Windows 10 : <a href="https://go.microsoft.com/fwlink/?linkid=2086042">https://go.microsoft.com/fwlink/?linkid=2086042</a></p>

<p style="text-align: justify;">Exécutez <strong>"adksetup.exe"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-06-14-22_58_57-mRemoteNG---confCons.xml---LABNPWADM1P.png" class="align-center">

<p style="text-align: justify;">Dans le champs <strong>"Install Path:"</strong> sélectionner le chemin suivant : <strong>"D:\Program Files (x86)\Windows Kits\10\"</strong> et cliquez sur <strong>"Next"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-06-14-22_59_38-mRemoteNG---confCons.xml---LABNPWADM1P.png" class="align-center">

<p style="text-align: justify;">Choisissez si vous souhaitez envoyer des données anonymes à Microsoft ou non, et cliquez sur <strong>"Next"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-06-14-23_00_12-mRemoteNG---confCons.xml---LABNPWADM1P.png" class="align-center">

<p style="text-align: justify;">Cliquez sur <strong>"Accept"</strong> pour accepter la licence.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-06-14-23_00_42-mRemoteNG---confCons.xml---LABNPWADM1P.png" class="align-center">

<p style="text-align: justify;">Sélectionnez ces fonctionnalités :
  <ul>
    <li><strong>"Deployment Tools"</strong></li>
    <li><strong>"User State Migration Tool (USMT)"</strong></li>
  </ul>
Et cliquez sur <strong>"Install"</strong>.
</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-06-14-23_02_16-mRemoteNG---confCons.xml---LABNPWADM1P.png" class="align-center">

<p style="text-align: justify;">L'installation progresse.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-06-14-23_03_27-mRemoteNG---confCons.xml---LABNPWADM1P.png" class="align-center">

<p style="text-align: justify;">L'installation est terminée, cliquez sur <strong>"Close"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-06-14-23_03_55-mRemoteNG---confCons.xml---LABNPWADM1P.png" class="align-center">


<p style="text-align: justify;">Téléchargez l'add-on Windows PE pour l'ADK : <a href="https://go.microsoft.com/fwlink/?linkid=2087112">https://go.microsoft.com/fwlink/?linkid=2087112</a></p>

<p style="text-align: justify;">Exécutez <strong>"adkwinpesetup.exe"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-06-14-23_05_01-mRemoteNG---confCons.xml---LABNPWADM1P.png" class="align-center">

<p style="text-align: justify;">Laissez le choix par défaut et cliquez sur <strong>"Next"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-06-14-23_05_36-mRemoteNG---confCons.xml---LABNPWADM1P.png" class="align-center">

<p style="text-align: justify;">Choisissez si vous souhaitez envoyer des données de façon anonymes à Microsoft ou non, et cliquez sur <strong>"Next"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-06-14-23_05_54-mRemoteNG---confCons.xml---LABNPWADM1P.png" class="align-center">

<p style="text-align: justify;">Acceptez la licence, et cliquez sur <strong>"Accept"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-06-14-23_06_11-mRemoteNG---confCons.xml---LABNPWADM1P.png" class="align-center">

<p style="text-align: justify;">Sélectionnez la fonctionnalité : <strong>"Windows Preinstallation Environnment (Windows PE)"</strong>, et cliquez sur <strong>"Install"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-06-14-23_06_28-mRemoteNG---confCons.xml---LABNPWADM1P.png" class="align-center">

<p style="text-align: justify;">L'installation progresse.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-06-14-23_20_03-mRemoteNG---confCons.xml---LABNPWADM1P.png" class="align-center">

<p style="text-align: justify;">L'installation est terminée, cliquez sur <strong>"Close"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-06-14-23_32_46-mRemoteNG---confCons.xml---LABNPWADM1P.png" class="align-center">

## Configurer Microsoft SQL Server 2016

<p style="text-align: justify;">Connectez-vous à votre serveur SQL pour effectuer les actions suivantes.</p>
<p style="text-align: justify;">Ouvrez le <strong>"Computer Management"</strong> puis <strong>"System Tools"</strong>, <strong>"Local Users and Groups"</strong>, et <strong>"Groups"</strong>. Cliquez sur <strong>"Administrators"</strong> et sélectionnez <strong>"Add to Group..."</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-06-16-17_25_04-mRemoteNG---confCons.xml---LABNPWADM1P.png" class="align-center">

<p style="text-align: justify;">Cliquez sur <strong>"Add..."</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-06-16-17_25_39-mRemoteNG---confCons.xml---LABNPWADM1P.png" class="align-center">

<p style="text-align: justify;">Dans la fenêtre, cliquez sur <strong>"Object Types"</strong> et sélectionnez <strong>"Computers"</strong> pour pouvoir ajouter votre serveur SCCM.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-06-16-17_26_05-mRemoteNG---confCons.xml---LABNPWADM1P.png" class="align-center">

<p style="text-align: justify;">Ajoutez votre serveur SCCM, pour ma part <strong>CORPWSCM1</strong>. Et cliquez sur <strong>"OK"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-06-16-17_26_48-mRemoteNG---confCons.xml---LABNPWADM1P.png" class="align-center">

<p style="text-align: justify;">Cliquez sur <strong>"OK"</strong> pour terminer</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-05-installer-prerequis-SCCM-1902/2019-06-16-17_27_21-mRemoteNG---confCons.xml---LABNPWADM1P.png" class="align-center">

<p style="text-align: justify;">Et voilà ! Votre infrastructure est maintenant prête pour l'installation de SCCM.</p>