---
layout: single
title:  "Comment installer un contrôleur de domaine Active Directory sur Windows Server "
last_modified_at: 2020-12-07
header:
  teaser: "/assets/images/posts/2019-02-22-install-active-directory/logo-ad-444x240.png"
  og_image: "/assets/images/posts/2019-02-22-install-active-directory/logo-ad-444x240.png"
comments: true
read_time: true
type: posts
classes: wide
categories:
  - Active Directory
tags:
  - Windows
  - Windows Server
  - Microsoft
  - AD
  - Active Directory
  - AD DS
  - Active Directory Domain Services
  - DNS
  - Domain Name System
  - LDAP
  - Lightweight Directory Access Protocol
  - Server
  - Security
  - Authentication
  - Identification
  - User
  - Group
  - OU
  - Organizational Unit
  - SYSVOL
  - NetBIOS
  - Global Catalog
  - GC
  - Forest
  - Domain
  - Domain Controller
  - DC
  - Schema Master
  - Domain Naming Master
  - PDC Emulator
  - RID Master
  - Infrastructure Master
  - Sites
  - FSMO
  - Flexible Single Master Operation
---


![image-left](/assets/images/posts/2019-02-22-install-active-directory/logo-ad-222x150.png){: .align-left}
**Active Directory est l'annuaire LDAP pour le système Windows**, il contient des **Objets** de types différents comme des user, computers, organization unit (OU), servers ou printers. Il permet de gérer les fonctions essentielles **d'identification** et **d'authentification**. Il permet également **l'attribution** et **l'application de stratégies**. L'Active Directory s'appuie sur le protocole **DNS**, sans celui-ci l'AD ne peut pas fonctionner. Le rôle DNS sera installé durant en même temps.
{: .text-justify}

Je vais commencer par les notions de bases d'un contrôleur de domaine. Notamment les composants qui le constituent et qui l'entourent, ainsi que les rôles **FSMO** (*Flexible Single Master Operation*) qui le composent.
{: .text-justify}

{% include toc icon="align-left" title="Table des matières" %}

### 1 Les Composants

- **Forests :** désigne la structure d'un ou plusieurs domaines.
{: .text-justify}
![image-center](/assets/images/posts/2019-02-22-install-active-directory/AD-forests.png){: .align-center}
- **Domains :** domaine faisant partie d'une forêt, ex : paris.corp.priv, corp.priv.
{: .text-justify}
![image-center](/assets/images/posts/2019-02-22-install-active-directory/AD-domains.png){: .align-center}
- **Sites :** permet de faire la distinction au niveau de la topologie du réseau, ex : Paris: 192.168.4.0, Londre: 192.168.5.0.
{: .text-justify}
![image-center](/assets/images/posts/2019-02-22-install-active-directory/AD-sites.png){: .align-center}
- **Domain Controllers :** rôle du serveur qui traite les requêtes d'un domaine, il devra gérer : l'identification des objets, l’authentification, veiller à l’application des stratégies de groupe.
{: .text-justify}
![image-center](/assets/images/posts/2019-02-22-install-active-directory/AD-domain-controllers.png){: .align-center}
- **Organizational Units :** conteneurs permettant de créer une hiérarchie.
{: .text-justify}
![image-center](/assets/images/posts/2019-02-22-install-active-directory/AD-organizational-units.png){: .align-center}


### 2 Les Rôles FSMO

- **Schema Master :** il gère la modification du schéma et sur le serveur et sa réplication. **Unique au sein d'une forêt.**
- **Domain Naming Master :** il gére la ajout et la suppression de nom de domaine dans une forêt. **Unique au sein d'une forêt.**
- **PDC Emulator :** (*PDC Primary Domain Controller*) remplis 5 fonctions. **Unique au sein d'un domaine.**
  - Modification des stratégies de groupe du domaine.
  - Synchroniser les horloges (date & heure) sur les contrôleurs de domaine.
  - Gérer le verrouillage des comptes.
  - Gère le changement des mots de passe.
  - Assure la compatibilité avec les contrôleurs de domaine Windows NT.
- **RID Master :** (*Relative IDentifier*) qui alloue un identificateur relatif à l’intérieur d’un domaine (pour un utilisateur, un groupe ou tout autre objet géré par Active Directory). Il gère aussi le déplacement d’un objet d’un domaine à un autre, à l’intérieur de la forêt. **Unique au sein d'un domaine.**
- **Infrastructure Master :** maintients les références entre plusieurs objets, comme les SID (*Security Identifiers*) et les GUID (*Globally Unique Identifier*). **Unique au sein d'un domaine.**
{: .text-justify}


## 3 Les prérequis
Maintenant passons a la pratique ! Voici les préconisations de Microsoft pour la machine hébergeant un contrôleur de domaine.
{: .text-justify}

| Hardware     | Spécification |
|---------     | ----------- |
| **CPU :** | Minimum : 1.4 GHz 64-bit |
| **Memory :** | 2Go |
| **Hard disk :** | 32Go d’espace disque |
| **Network :** | Une connexion réseau |


### 3.1 Hardware

Pour ce tutoriel, j'utiliserais une machine virtuel avec **Windows Server 2016 Standard** avec la configuration suivante.
{: .text-justify}

| Hardware     | Spécification |
|---------     | ----------- |
| **CPU :** | 2 vCPU |
| **RAM :** | 4Go |
| **Disque dur :** | C:\System 50Go |
| **Réseau :** | Host-only |


### 3.2 Network

| Champs     | Valeurs |
|---------     | ----------- |
| **IP address :** | 192.168.100.100 |
| **Subnet :** | 255.255.255.0 |
| **Default gateway :** | 192.168.100.254 |
| **DNS :** | 192.168.100.254 |


## 4 Préparation du serveur
Ouvrez le **"Server Manager"**, le programme se lance au démarrage.
{: .text-justify}
Cliquer sur **"Local Server"** remplissez les paramètres suivant.
{: .text-justify}
![image-center](/assets/images/posts/2019-02-22-install-active-directory/2019-02-22-23_20_21-1.png){: .align-center}

- **Computer name :** donner un nom significatif à votre serveur, pour ma part, je prendrais pour exemple : **CORPWADS1**.
- **Windows Firewall :** désactiver le firewall de Windows.
- **Remote Desktop :** activer le bureau à distance.
- **Ethernet0 :** définissez une adresse IP fixe, je prendrais pour exemple : **192.168.100.100**.

![image-center](/assets/images/posts/2019-02-22-install-active-directory/2019-02-22-23_25_21-1.png){: .align-center}


<i class="fas fa-exclamation-triangle"></i> **Avertissement** <br>
Il est recommandé par Microsot d'effectuer toutes les mises à jour avant toutes installations de rôles.
{: .notice--warning .text-justify}


## 5 Installation d'Active Directory sur Windows Server

Maintenant il faut installer le rôle **"ADDS"**. Ouvrez le **"Server Manager"**, puis cliquer sur **"Manage"** puis **"Add Roles and Features"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-02-22-install-active-directory/2019-02-23-17_57_21-1.png){: .align-center}

**Before ou begin :** la page vous affiche un petit rappel des pré-requis avant l'installation d'un rôle. Si vous voulez que cette page n'apparaisse plus, cocher la casse **"Skip this page by default"** et cliquer sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-02-22-install-active-directory/2019-02-23-18_04_21-1.png){: .align-center}

**Select installation type :** nous souhaitons installer le rôle sur le serveur en question, laisser le choix par défaut et cliquer sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-02-22-install-active-directory/2019-02-23-18_13_21-1.png){: .align-center}

**Select destination server :** le choix par défaut sélectionne automatiquement notre serveur, cliquer sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-02-22-install-active-directory/2019-02-23-18_17_21-1.png){: .align-center}

**Select server roles :** dans la liste des rôles, sélectionner **"Active Directory Domain Services"**. Une fenêtre apparaît listant toutes les fonctionnalités, cliquer sur **"Add Features"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-02-22-install-active-directory/2019-02-23-18_37_21-1.png){: .align-center}

**Select server roles :** le rôle a bien été sélectionné, cliquer sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-02-22-install-active-directory/2019-02-23-18_40_21-1.png){: .align-center}

**Select features :** nous n'avons pas besoin de sélectionner de fonctionnalités supplémentaires, cliquer sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-02-22-install-active-directory/2019-02-23-20_52_21-1.png){: .align-center}

**Active Directory Domain Services :** dans cette partie il est possible de configurer la liaison avec Azure Active Directory, cliquer sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-02-22-install-active-directory/2019-02-23-20_54_21-1.png){: .align-center}

**Confirm installation selections :** l'assistant nous liste les rôles et fonnalitées qui seront installés, cliquer sur **"Install"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-02-22-install-active-directory/2019-02-23-20_59_21-1.png){: .align-center}

**Installation progress :** l'installation est maintenant finie. Nous allons passer à la configuration, cliquer sur **"Close"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-02-22-install-active-directory/2019-02-23-21_03_21-1.png){: .align-center}


## 6 Promulgation du contrôleur de domaine

Ouvrez le **"Server Manager"**, en haut a droite cliquer sur le petit drapeau. Cliquer sur **"Promote this server to a domain controller"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-02-22-install-active-directory/2019-02-23-21_07_21-1.png){: .align-center}

**Deployment Configuration :** etant donnée que nous n'avons pas de forêt, selectionner **"Add a new forest"**.<br/>Ensuite l'étape la plus importante le nom de domaine, voici le [lien](https://docs.microsoft.com/fr-fr/windows-server/identity/ad-ds/plan/assigning-domain-names) vers le site de Microsoft contentant les règles d'affectation. En règle générale, le nom de domaine est le nom de l'entreprise suivie de .PRIV, pour cet exemple, j'utiliserais **"CORP.PRIV"**. Cliquer sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-02-22-install-active-directory/2019-02-23-21_14_21-1.png){: .align-center}

**Domain Controller Options :** maintenant il faut régler le niveau fonctionnel de la forêt et du domaine. Pour ma part, je laisserais le niveau fonctionnel de la forêt et du domaine sur **"Windows Server 2016"**, voici le [lien](https://docs.microsoft.com/fr-fr/windows-server/identity/ad-ds/active-directory-functional-levels) vers le site de Microsoft pour comprendre ce que cela implique.
{: .align-center}
Dans les champs **"Password:"** et **"Cofirm password:"** avec votre mot de passe, il est conseillé d'en renseigner un différent de celui utilisé pour le compte administrator. Garder le précieusement il vous servira lors de restauration de l'Active Directory.</p>
{: .text-justify}
![image-center](/assets/images/posts/2019-02-22-install-active-directory/2019-02-23-21_23_21-1.png){: .align-center}

**DNS Options :** l'assistant nous demande maintenant si nous voulons créer une délégation DNS, vue qu'aucune zone DNS n'existe pour le moment l'icône est grisé. Cliquer sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-02-22-install-active-directory/2019-02-23-21_29_21-1.png){: .align-center}

**Additional Options :** le nom **"NetBIOS"** s'affiche, il correspond au nom de domaine sans l'extension. Cliquer sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-02-22-install-active-directory/2019-02-23-21_31_21-1.png){: .align-center}

**Paths :** laisser le dossier par défaut. Cliquer sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-02-22-install-active-directory/2019-02-23-21_41_21-1.png){: .align-center}

**Review Options :** on nous affiche les récapitulatifs de notre configuration. Vous avez la possibilité de cliquer sur le bouton **"View script"** pour exporter le script de configuration de l'Active Directory. Cliquer sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-02-22-install-active-directory/2019-02-23-21_47_21-1.png){: .align-center}

**Prerequisites Check :** l'assistant d'installation a fini de vérifier les pré-requis. Deux erreurs apparaissent, voici a quoi elles correspondent :
{: .align-center}

> Domain controllers that run Windows Server 2008 or later have a default setting for "Allow cryptography algorithms compatible with Windows NT 4" that prevents weaker cryptography algorithms when establishing secure channel sessions. For more information about the potential impact and a workaround, see KB article [942564](https://support.microsoft.com/en-us/help/942564/the-net-logon-service-on-windows-server-2008-and-newer-domain-controll).
{: .align-center}

> DNS delegation could not be created or updated. For more information, see [DNS Options](https://docs.microsoft.com/en-us/windows-server/identity/ad-ds/manage/ad-ds-simplified-administration#BKMK_ADDSInstallPrerequisiteTests)".



Ses warnings ne gêne en rien l'installation. Cliquer sur **"Install"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-02-22-install-active-directory/2019-02-23-21_52_21-1.png){: .align-center}

Une fois l'installation finis, le serveur vas redémarrer automatiquement.
{: .text-justify}
![image-center](/assets/images/posts/2019-02-22-install-active-directory/2019-02-23-21_54_21-1.png){: .align-center}

Une fois le redémarrage effectué, le domaine **"CORP"** apparaît devant le login utilisateur **"Administrator"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-02-22-install-active-directory/2019-02-23-22_03_21-1.png){: .align-center}

Et voilà ! Nous avons maintenant un domaine Active Directory. Vous pouvez ajouter de nouvelles machines à votre domaine.
{: .text-justify}