---
layout: single
title:  "Comment configurer les Discovery Methods dans System Center Configuration Manager"
last_modified_at: 2020-12-07
header:
  teaser: "/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/logo-sccm-444x240.png"
  og_image: "/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/logo-sccm-444x240.png"
type: posts
classes: wide
comments: true
read_time: true
categories:
  - SCCM
tags:
  - SCCM
  - System Center
  - Configuration Manager
  - System Center Configuration Manager
  - Windows
  - Windows Server
  - Microsoft
  - Active Directory
  - LDAP
  - Lightweight Directory Access Protocol
  - Forest
  - User
  - Users
  - Group
  - Groups
  - Discovery
  - Discovery Methods
  - OU
  - Organizational Unit
  - Bondaries
  - Sites
  - Sites Active Directory
  - Active Directory Forest
  - Active Directory Forest Discovery
  - Active Directory Group
  - Active Directory Group Discovery
  - Active Directory System
  - Active Directory System Discovery
  - Active Directory Users
  - Active Directory Users Discovery
---

![image-left](/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/logo-sccm-222x150.png){: .align-left}
Les **discovery methods** de configuration manager permettent d'importer automatiquement plusieurs objets Active Directory ou ressources réseau dans SCCM. Dans l'article suivant, je détaillerai les discovery methods suivants : **Active Directory Forest Discovery**, **Active Directory Group Discovery**, **Active Directory System Discovery**, **Active Directory Users Discovery**.
{: .text-justify}

{% include toc icon="align-left" title="Table des matières" %}


## 1 Avant de commencer

Vous pouvez lire les articles suivants :
{: .text-justify}
1. [Comment installer un contrôleur de domaine Active Directory sur Windows Server](/active%20directory/install-active-directory)
2. [Comment installer un serveur DHCP sur Windows Server](/dhcp/install-dhcp-server/)
3. [Comment installer Microsoft SQL Server 2016](/sql/install-sql-server-2016/)
4. [Comment installer les prérequis pour System Center Configuration Manager](/sccm/sccm-install-prerequisites/)
5. [Comment installer System Center Configuration Manager](/sccm/sccm-install/)
{: .text-justify}


## 2 Discovery Methods

### 2.1 Active Directory Forest Discovery

Dans la **"Configuration Manager Console"**, dans le panneau inférieur gauche, sélectionnez **"Administration"**. Faites dérouler le dossier **"Hierachy Configuration"** vers le bas et sélectionnez **"Discovery Methods"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/2020-06-06-20_37_18-mRemoteNG---confCons.xml---CORPWSCM1.png){: .align-center}

Dans la partie droite, sélectionnez **"Active Directory Forest Discovery"** et dans le ruban, cliquez sur **"Propriétés"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/2020-06-06-20_37_19-mRemoteNG---confCons.xml---CORPWSCM1.png){: .align-center}

Cochez la case **"Activer Active Directory Forest Discovery"** et la case **"Créer automatiquement les limites du site Active Directory lorsqu'elles sont découvertes"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/2020-06-06-20_37_20-mRemoteNG---confCons.xml---CORPWSCM1.png){: .align-center}

Cliquez sur **"Oui"** pour lancer la découverte immédiatement.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/2020-06-06-20_37_21-mRemoteNG---confCons.xml---CORPWSCM1.png){: .align-center}


### 2.2 Active Directory Group Discovery

Dans la partie droite, sélectionnez **"Active Directory Group Discovery"** et dans le ruban, cliquez sur **"Properties"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/2020-06-06-20_37_22-mRemoteNG---confCons.xml---CORPWSCM1.png){: .align-center}

Cochez la case **"Activer la découverte du groupe Active Directory"**, en bas cliquez sur **"Ajouter"** puis **"Localisation..."**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/2020-06-06-20_37_23-mRemoteNG---confCons.xml---CORPWSCM1.png){: .align-center}

Dans le champ **"Name :"**, entrez le nom de l'emplacement, pour moi **"Corp - Groups Users"**, dans la section **"Location :"**. Cliquez sur **"Browse..."** et sélectionnez votre OU, j'utiliserais pour ma part **"LDAP://OU=Groupes,OU=Paris,OU=Site,OU=CORP,DC=corp,DC=priv"**.<br/>
Cliquez sur **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/2020-06-06-20_37_24-mRemoteNG---confCons.xml---CORPWSCM1.png){: .align-center}

Cliquez sur **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/2020-06-06-20_37_25-mRemoteNG---confCons.xml---CORPWSCM1.png){: .align-center}

Cliquez sur **"Oui"** pour exécuter la découverte immédiatement.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/2020-06-06-20_37_26-mRemoteNG---confCons.xml---CORPWSCM1.png){: .align-center}


### 2.3 Active Directory System Discovery

Dans la partie droite, sélectionnez **"Active Directory System Discovery"** et dans le ruban, cliquez sur **"Propriétés"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/2020-06-06-20_37_27-mRemoteNG---confCons.xml---CORPWSCM1.png){: .align-center}


Cochez la case **"Activer la découverte du système Active Directory"**, cliquez sur le bouton avec le **"symbole en forme de soleil"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/2020-06-06-20_37_28-mRemoteNG---confCons.xml---CORPWSCM1.png){: .align-center}

Dans le champ **"Path :", cliquez sur "Browse..."** et sélectionnez votre OU, j'utiliserais pour ma part **"LDAP://DC=corp,DC=priv"**.<br/>
Cliquez sur **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/2020-06-06-20_37_29-mRemoteNG---confCons.xml---CORPWSCM1.png){: .align-center}

Cliquez sur **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/2020-06-06-20_37_30-mRemoteNG---confCons.xml---CORPWSCM1.png){: .align-center}

Cliquez sur **"Oui"** pour exécuter la découverte immédiatement.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/2020-06-06-20_37_26-mRemoteNG---confCons.xml---CORPWSCM1.png){: .align-center}


### 2.4 Active Directory Users Discovery

Dans la partie droite, sélectionnez **"Active Directory Users Discovery"** et dans le ruban, cliquez sur **"Properties"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/2020-06-06-20_37_31-mRemoteNG---confCons.xml---CORPWSCM1.png){: .align-center}

Cochez la case **"Activer la découverte des utilisateurs d'Active Directory"**, cliquez sur le bouton avec le **"symbole du soleil"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/2020-06-06-20_37_32-mRemoteNG---confCons.xml---CORPWSCM1.png){: .align-center}

Dans le champ **"Path :"**, cliquez sur **"Browse..."** et sélectionnez votre OU, j'utiliserais pour ma part **"LDAP://DC=corp,DC=priv"**.<br/>
Cliquez sur **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/2020-06-06-20_37_33-mRemoteNG---confCons.xml---CORPWSCM1.png){: .align-center}

Cliquez sur **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/2020-06-06-20_37_34-mRemoteNG---confCons.xml---CORPWSCM1.png){: .align-center}

Cliquez sur **"Oui"** pour exécuter la découverte immédiatement.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/2020-06-06-20_37_26-mRemoteNG---confCons.xml---CORPWSCM1.png){: .align-center}

Et voilà ! La découverte est maintenant configurée, vous pouvez maintenant trouver tous vos objets Active Directory dans SCCM.
{: .text-justify}