---
layout: single
title:  "Comment configurer les Boundary Groups dans System Center Configuration Manager"
last_modified_at: 2020-12-07
header:
  teaser: "/assets/images/posts/2020-11-24-sccm-configure-boundary-groups/logo-sccm-444x240.png"
  og_image: "/assets/images/posts/2020-11-24-sccm-configure-boundary-groups/logo-sccm-444x240.png"
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
  - Boundaries
  - Boundary Group
  - Boundary Groups
  - Site system
  - Site system server
  - Site assignment
  - Site
  - Site Active Directory
  - Distribution Points
  - Software Update Points
  - State Migration Points
  - Management Points
  - Cloud Management Gateway
  - IP
  - Internet Protocol
  - IPv4
  - Active Directory Forest Discovery
  - Active Directory Forest
---

![image-left](/assets/images/posts/2019-06-15-sccm-install/logo-sccm-222x150.png){: .align-left}
Les **Boundary groups** permettent l'organisation logique des emplacements réseau. Cela permet de diriger les clients vers le serveur SCCM disponible le plus proche sur le réseau. Les **Boundary groups** augmentent également la disponibilité en redirigeant les clients vers un autre serveur en cas de défaillance du serveur le plus proche.
{: .text-justify}

Les clients utilisent un groupe limite pour :
{: .text-justify}
- **Site assignment** automatique
- Pour trouver un **site system server** qui peut fournir un service, y compris :
  - **Distribution points**
  - **Software update points**
  - **State migration points**
  - **Management points**
  - **Cloud management gateway**
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
6. [Comment configurer les Discovery Methods dans System Center Configuration Manager](/sccm/sccm-configure-discovery-methods/)
{: .text-justify}


## 2 Le fonctionnement

Le schéma suivant montre un exemple d'utilisation.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-24-sccm-configure-boundary-groups/diagram-boundary-groups.png){: .align-center}


- **Datacenter :**
  - **Boundarie - Datacenter :** une boundarie est basée sur le site Active Directory Datacenter.
  - **Boundary Group - Datacenter :** un groupe limite contenant le centre de données boundarie, et la référence pour les membres, le code de site primaire S01 et le serveur système du site du centre de données.
- **Paris :**
  - **Boundarie - Paris :** une boundarie est basée sur le site du centre de données Active Directory.
  - **Boundary Group - Paris :** un groupe frontière contenant la boundarie citée, et la référence pour les membres, le code de site secondaire S02 et le site serveur système de Paris et en failback celui du Datacenter.
- **VPN :**
  - **Boundarie - VPN 1 :** une boundarie basée sur une gamme d'adresses IP des stations VPN.
  - **Boundarie - VPN 2 :** une boundarie basée sur une gamme d'adresses IP des stations VPN.
  - **Boundary Group - VPN :** un groupe de frontière contenant la frontière citée, et la référence pour les membres, le code de site primaire S01 et le serveur de système de site du centre de données.


## 3 La configuration

Les groupes boundarie et boundary seront créés selon l'exemple ci-dessous.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-24-sccm-configure-boundary-groups/diagram-boundary-groups-labvl.png){: .align-center}

Dans la **"Configuration Manager Console"**, dans le panneau inférieur gauche, sélectionnez **"Administration"**. Faites défiler le dossier **"Hierachy Configuration"** vers le bas et sélectionnez **"Boundaries"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-24-sccm-configure-boundary-groups/2020-11-24-17_47_06-mRemoteNG---confCons.xml---CORPWSCM1.png){: .align-center}

Si vous avez suivi l'article [Comment configurer les Discovery Methods dans System Center Configuration Manager](/sccm/sccm-configure-discovery-methods/) et activer **"Active Directory Forest Discovery"**, le boundarie de **Paris** doivent avoir été créées automatiquement.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-24-sccm-configure-boundary-groups/2020-11-24-17_47_07-mRemoteNG---confCons.xml---CORPWSCM1.png){: .align-center}

Dans le panneau de gauche, faites défiler le dossier **"Hierachy Configuration"** et sélectionnez **"Boundary Groups"**. Par défaut, le groupe de limites **"Default-Site-Boundary-Group"** est le groupe de limites auquel les clients se connectent si aucun autre n'est disponible.<br/>
Dans le ruban, cliquez sur **"Create Bondary"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-24-sccm-configure-boundary-groups/2020-11-24-17_47_08-mRemoteNG---confCons.xml---CORPWSCM1.png){: .align-center}

Dans le champ **"Nom :"** donnez un nom à votre groupe limite, pour moi **"SA - Paris"**, dans le champ **"Description :"** donnez une description **"Boundary group Paris"**. Cliquez ensuite sur **"Ajouter..."**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-24-sccm-configure-boundary-groups/2020-11-24-17_47_09-mRemoteNG---confCons.xml---CORPWSCM1.png){: .align-center}

Sélectionnez la frontière **"Paris"** et cliquez sur **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-24-sccm-configure-boundary-groups/2020-11-24-17_47_10-mRemoteNG---confCons.xml---CORPWSCM1.png){: .align-center}

Sélectionnez l'onglet **"Références"**, dans la section **"Site assignement"** cochez la case **"Use this boundary group for site assignement"**, dans le champ **"Assigned site:"** sélectionnez votre site, pour moi **"COR-Corporate Site"**. Et cliquez sur **"Ajouter..."**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-24-sccm-configure-boundary-groups/2020-11-24-17_47_11-mRemoteNG---confCons.xml---CORPWSCM1.png){: .align-center}

Cochez la case de votre système de site pour attribuer **"\\\CORPWSCM1.corp.priv"** et cliquez sur **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-24-sccm-configure-boundary-groups/2020-11-24-17_47_12-mRemoteNG---confCons.xml---CORPWSCM1.png){: .align-center}

Cliquez sur **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-24-sccm-configure-boundary-groups/2020-11-24-17_47_13-mRemoteNG---confCons.xml---CORPWSCM1.png){: .align-center}

Votre **boundary group** est maintenant créé.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-24-sccm-configure-boundary-groups/2020-11-24-17_47_14-mRemoteNG---confCons.xml---CORPWSCM1.png){: .align-center}

Et voilà ! Vos clients qui sont situés dans le site Active Directory **"Paris"** se verront attribuer le code de site **"COR"** et se connecteront au serveur site system **"CORPWSCM1"**.
{: .text-justify}