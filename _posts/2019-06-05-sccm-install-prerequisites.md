---
layout: single
title:  "Comment installer les prérequis pour System Center Configuration Manager"
last_modified_at: 2020-12-07
header:
  teaser: "/assets/images/posts/2019-06-05-sccm-install-prerequisites/logo-sccm-444x240.png"
  og_image: "/assets/images/posts/2019-06-05-sccm-install-prerequisites/logo-sccm-444x240.png"
type: posts
classes: wide
comments: true
read_time: true
show_date: true
categories:
  - SCCM
tags:
  - AD
  - Active Directory
  - Windows
  - Windows Server
  - Microsoft
  - Security
  - Services
  - Server
  - SCCM
  - System Center
  - Configuration Manager
  - System Center Configuration Manager
  - ADSI
  - Active Directory Service Interfaces
  - Delegate Control
  - Computer
  - User
  - Active Directory Schema
  - BITS
  - RDC
  - .NET Framework 3.5
  - .NET Framework 4.5
  - Web Server
  - ADK
  - Assessment and Deployment Kit
  - Windows Assessment and Deployment Kit
  - USMT
  - User State Migration Tool
  - WinPE
  - Windows Pre-installation Environment
  - SQL Server
  - Structured Query Language
---

![image-left](/assets/images/posts/2019-06-05-sccm-install-prerequisites/logo-sccm-222x150.png){: .align-left}
**System Center Configuration Manager (SCCM)** est un logiciel de gestion de système édité par Microsoft. Il est destiné la gestion de grands parcs informatique. Il permet : la prise de main à distance, la gestion et déploiement des mises à jour et correctifs, l’automatisation de tâches, la télédistribution d’applications, l’inventaire matériel et logiciel, la gestion de la conformité, l’administration des politiques de sécurité, le déploiement de systèmes d’exploitation.
{: .text-justify}

{% include toc icon="align-left" title="Table des matières" %}


## 1 Prérequis

Pour ce tutoriel, j'utiliserais une machine virtuel avec **Windows Server 2016 Standard** intégré dans le domaine **corp.priv** créé précédemment avec la configuration suivante :

### 1.2 Hardware 

| Hardware     | Spécification |
|---------     | ----------- |
| **CPU :** | 4 vCPU |
| **RAM :** | 4Go |
| **Disque dur :** | C:\System 50Go, D:\Data 60Go |
| **Réseau :** | Host-only |

### 1.3 Network

| Champs     | Valeurs |
|---------     | ----------- |
| **IP address :** | 192.168.100.102 |
| **Subnet :** | 255.255.255.0 |
| **Default gateway :** | 192.168.100.254 |
| **DNS :** | 192.168.100.100 (server Active Directory) |


## 2 Préparation du serveur
Ouvrez le **"Server Manager"**, le programme se lance au démarrage.
{: .text-justify}

Cliquer sur **"Local Server"** remplissez les paramètres suivant.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-02-22-23_20_21-1.png){: .align-center}

- **Computer name :** donner un nom significatif à votre serveur, pour ma part, je prendrais pour exemple : **CORPWSCM1**.
{: .text-justify}
- **Windows Firewall :** désactiver le firewall de Windows.
- **Remote Desktop :** activer le bureau à distance.
- **Ethernet0 :** définissez une adresse IP fixe, je prendrais pour exemple : **192.168.100.102**.
{: .text-justify}

![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-02-22-23_20_21-1.png){: .align-center}

<i class="fas fa-exclamation-triangle"></i> **Avertissement** <br>
Il est recommandé par Microsot d'effectuer toutes les mises à jour avant toutes installations de rôles.
{: .notice--warning .text-justify}


## 3 Avant de commencer
Avant de commencer à mettre en place les conditions préalables à la mise en place des SCCM, il est nécessaire d'avoir suivi les trois articles suivant :
{: .text-justify}

- [Comment installer un contrôleur de domaine Active Directory sur Windows Server](/active%20directory/install-active-directory/)
- [Comment installer un serveur DHCP sur Windows Server](/dhcp/install-dhcp-server/)
- [Comment installer Microsoft SQL Server 2016](/sql/install-sql-server-2016/)
{: .text-justify}


## 4 Préparation de l'Active Directory

Connectez-vous à votre serveur Active Directory pour effectuer les actions suivantes.
{: .text-justify}

### 4.1 Création d'un compte de service

Créer un compte dans l'Active Directory, pour ma part je l'appellerais **"Svc_SCCM_Adm"**.
{: .text-justify}

![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-02-28 17_53_43-mRemoteNG - confCons.xml - CORPWADS1P.png){: .align-center}


### 4.2 Créer le conteneur System Management

Ouvrez le **"Server Manager"** en haut à droite, cliquez sur **"Tools"** et sélectionnez **"ADSI Edit"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-02-28 17_54_33-mRemoteNG - confCons.xml - CORPWADS1P.png){: .align-center}

Cliquez sur **"ADSI Edit"** et cliquez sur **"Connect to..."**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-02-28 17_55_12-mRemoteNG - confCons.xml - CORPWADS1P.png){: .align-center}

Laissez les champs par défaut et cliquez sur **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-02-28 17_55_35-mRemoteNG - confCons.xml - CORPWADS1P.png.png){: .align-center}

Cliquez sur **"Default naming context"**, cliquez sur **"CN-System"** et choisissez **"New"**, **"Object..."**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-02-28 17_56_16-mRemoteNG - confCons.xml - CORPWADS1P.png){: .align-center}

Dans la liste **"Select a class:"** sélectionner **"container"** et cliquez sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-02-28 17_57_43-mRemoteNG - confCons.xml - CORPWADS1P.png){: .align-center}

Dans le champ **"Value:"** écrivez **"System Management"** et cliquez sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-02-28 17_58_18-mRemoteNG - confCons.xml - CORPWADS1P.png){: .align-center}

Pour terminer la création, cliquez sur **"Finish"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-02-28 17_58_42-mRemoteNG - confCons.xml - CORPWADS1P.png){: .align-center}


### 4.3 Ajouter des droits au conteneur System Management

Ouvrez le **"Server Manager"** en haut à droite, cliquez sur **"Tools"** et sélectionnez **"Active Directory Users and Computers"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-02-28 18_00_37-mRemoteNG - confCons.xml - CORPWADS1P.png){: .align-center}

En haut à gauche, cliquez sur **"View"** et activez l'option **"Advanced Features"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-02-28 18_00_59-mRemoteNG - confCons.xml - CORPWADS1P.png){: .align-center}

Pour ajouter une délégation, cliquez sur **"System Management"** et sélectionnez **"Delegate Control..."**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-02-28 18_07_24-mRemoteNG - confCons.xml - CORPWADS1P.png){: .align-center}

L'assistant s'ouvre, cliquez sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-02-28 18_07_39-mRemoteNG - confCons.xml - CORPWADS1P.png){: .align-center}

Cliquez sur **"Add..."**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-02-28 18_07_55-mRemoteNG - confCons.xml - CORPWADS1P.png){: .align-center}

Dans la fenêtre, cliquez sur **"Object Types"** et sélectionnez **"Computers"** pour pouvoir ajouter votre serveur SCCM.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-02-28 18_07_56-mRemoteNG - confCons.xml - CORPWADS1P.png){: .align-center}

Ajoutez votre serveur SCCM, pour ma part **CORPWSCM1** et ajoutez le compte **Svc_SCCM_Adm** créé précédemment.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-02-28 18_08_37-mRemoteNG - confCons.xml - CORPWADS1P.png){: .align-center}

Sélectionnez **"Create a custom task to delegate"** et cliquez sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-02-28 18_09_01-mRemoteNG - confCons.xml - CORPWADS1P.png){: .align-center}

Sélectionnez **"This folder, existing objects in this folder, and creation of new objects in this folder"** et cliquez sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-02-28 18_09_21-mRemoteNG - confCons.xml - CORPWADS1P.png){: .align-center}

Dans la section **"Show these permissions:"**, sélectionnez les options suivantes :
{: .text-justify}
- **"General"**
- **"Property-specific"**
- **"Creation/deletion of specific chold objects"**
{: .text-justify}
Dans la section **"Permissions:"** sélectionnez l'option **"Full Control"**. Et cliquez sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-02-28 18_09_49-mRemoteNG - confCons.xml - CORPWADS1P.png){: .align-center}

Pour finir, l'assistant affiche le récapitulatif des actions. Cliquez sur **"Finish"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-02-28 18_10_11-mRemoteNG - confCons.xml - CORPWADS1P.png){: .align-center}


### 4.4 Modification du schéma Active Directory

Connectez-vous à votre serveur SCCM pour effectuer les actions suivantes.
{: .text-justify}
Rendez-vous dans le dossier suivant **"Z:\SMSSETUP\BIN\X64\"** sur votre CD d'installation SCCM, et exécutez **"extadsch.exe"** avec l'option **"Run as administrator"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-02-28 18_13_27-mRemoteNG - confCons.xml - CORPWADS1P.png){: .align-center}

Lorsque l'opération est terminée, un fichier **"ExtADsch.log"** est généré.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-02-28 18_14_08-mRemoteNG - confCons.xml - CORPWADS1P.png){: .align-center}

Voici le contenu du fichier journal. On peut voir que l'opération s'est correctement déroulée grâce à la ligne **"Successfully extend the Active Directory schema."**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-02-28 18_14_30-mRemoteNG - confCons.xml - CORPWADS1P.png){: .align-center}



## 5 Préparation du serveur du SCCM

### 5.1 Installation des rôles et des fonctionnalités

Pour installer le **Background Intelligent Transfer Service (BITS)** et **Remote Differential Compression (RDC)** effectuer la commande suivante :
{: .text-justify}
```powershell
Install-WindowsFeature -Name BITS, RDC
```
Voici le résultat :
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-02-28 18_40_08-mRemoteNG - confCons.xml - CORPWSCM1P.png){: .align-center}

Pour installer le **.NET Framework 3.5** et **.NET Framework 4.5** exécutez la commande suivante :
{: .text-justify}
```powershell
Install-WindowsFeature -Name NET-Framework-Features, NET-Framework-45-Features
```
Voici le résultat :
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-02-28 18_41_24-mRemoteNG - confCons.xml - CORPWSCM1P.png){: .align-center}

Pour installer le **IIS web server** avec les composants nécessaires, exécutez la commande suivante :
{: .text-justify}
```powershell
Install-WindowsFeature -Name Web-Server, Web-Common-Http, Web-Static-Content, Web-Http-Errors, Web-Security, Web-Windows-Auth, Web-App-Dev, Web-Asp-Net, Web-Asp-Net45, Web-Net-Ext, Web-Net-Ext45, Web-ISAPI-Ext, Web-Mgmt-Compat, Web-Lgcy-Mgmt-Console, Web-Metabase, Web-Wmi, Web-Scripting-Tools -IncludeManagementTools
```
Voici le résultat :
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-02-28 18_42_10-mRemoteNG - confCons.xml - CORPWSCM1P.png){: .align-center}



### 5.2 Installation de Windows ADK pour Windows 10 

Dans cette partie, nous verrons comment installer le **Windows Assessment and Deployment Kit (Windows ADK)** pour Windows 10.
{: .text-justify}

Téléchargez le Windows ADK for Windows 10 : [https://go.microsoft.com/fwlink/?linkid=2086042](https://go.microsoft.com/fwlink/?linkid=2086042).
{: .text-justify}

Exécutez **"adksetup.exe"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-06-14-22_58_57-mRemoteNG---confCons.xml---LABNPWADM1P.png){: .align-center}

Dans le champs **"Install Path:"** sélectionner le chemin suivant : **"D:\Program Files (x86)\Windows Kits\10\"** et cliquez sur **"Next"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-06-14-22_59_38-mRemoteNG---confCons.xml---LABNPWADM1P.png){: .align-center}

Choisissez si vous souhaitez envoyer des données anonymes à Microsoft ou non, et cliquez sur **"Next"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-06-14-23_00_12-mRemoteNG---confCons.xml---LABNPWADM1P.png){: .align-center}

Cliquez sur **"Accept"** pour accepter la licence.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-06-14-23_00_42-mRemoteNG---confCons.xml---LABNPWADM1P.png){: .align-center}

Sélectionnez ces fonctionnalités :
{: .text-justify}
- **"Deployment Tools"**</strong></li>
- **"User State Migration Tool (USMT)"**
{: .text-justify}

Et cliquez sur **"Install"**
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-06-14-23_02_16-mRemoteNG---confCons.xml---LABNPWADM1P.png){: .align-center}

L'installation progresse.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-06-14-23_03_27-mRemoteNG---confCons.xml---LABNPWADM1P.png){: .align-center}

L'installation est terminée, cliquez sur **"Close"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-06-14-23_03_55-mRemoteNG---confCons.xml---LABNPWADM1P.png){: .align-center}


### 5.3 Installation de Windows ADK Windows PE Add-ons Windows 10

Téléchargez l'add-on Windows PE pour l'ADK : [https://go.microsoft.com/fwlink/?linkid=2087112](https://go.microsoft.com/fwlink/?linkid=2087112).
{: .text-justify}

Exécutez **"adkwinpesetup.exe"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-06-14-23_05_01-mRemoteNG---confCons.xml---LABNPWADM1P.png){: .align-center}

Laissez le choix par défaut et cliquez sur **"Next"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-06-14-23_05_36-mRemoteNG---confCons.xml---LABNPWADM1P.png){: .align-center}

Choisissez si vous souhaitez envoyer des données de façon anonymes à Microsoft ou non, et cliquez sur **"Next"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-06-14-23_05_54-mRemoteNG---confCons.xml---LABNPWADM1P.png){: .align-center}

Acceptez la licence, et cliquez sur **"Accept"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-06-14-23_06_11-mRemoteNG---confCons.xml---LABNPWADM1P.png){: .align-center}

Sélectionnez la fonctionnalité **"Windows Preinstallation Environnment (Windows PE)"**, et cliquez sur **"Install"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-06-14-23_06_28-mRemoteNG---confCons.xml---LABNPWADM1P.png){: .align-center}

L'installation progresse.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-06-14-23_20_03-mRemoteNG---confCons.xml---LABNPWADM1P.png){: .align-center}

L'installation est terminée, cliquez sur **"Close"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-06-14-23_32_46-mRemoteNG---confCons.xml---LABNPWADM1P.png){: .align-center}


## 6 Configurer Microsoft SQL Server 2016

Connectez-vous à votre serveur SQL pour effectuer les actions suivantes.
{: .text-justify}
Ouvrez le **"Computer Management"** puis **"System Tools"**, **"Local Users and Groups"**, et **"Groups"**. Cliquez sur **"Administrators"** et sélectionnez **"Add to Group..."**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-06-16-17_25_04-mRemoteNG---confCons.xml---LABNPWADM1P.png){: .align-center}

Cliquez sur **"Add..."**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-06-16-17_25_39-mRemoteNG---confCons.xml---LABNPWADM1P.png){: .align-center}

Dans la fenêtre, cliquez sur **"Object Types"** et sélectionnez **"Computers"** pour pouvoir ajouter votre serveur SCCM.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-06-16-17_26_05-mRemoteNG---confCons.xml---LABNPWADM1P.png){: .align-center}


Ajoutez votre serveur SCCM, pour ma part **CORPWSCM1**. Et cliquez sur **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-06-16-17_26_48-mRemoteNG---confCons.xml---LABNPWADM1P.png){: .align-center}

Cliquez sur **"OK"** pour terminer.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-05-sccm-install-prerequisites/2019-06-16-17_27_21-mRemoteNG---confCons.xml---LABNPWADM1P.png){: .align-center}

Et voilà ! Votre infrastructure est maintenant prête pour l'installation de SCCM.
{: .text-justify}
