---
layout: single
title:  "Comment installer System Center Configuration Manager"
last_modified_at: 2020-12-07
header:
  teaser: "/assets/images/posts/2019-06-15-sccm-install/logo-sccm-444x240.png"
  og_image: "/assets/images/posts/2019-06-15-sccm-install/logo-sccm-444x240.png"
type: posts
classes: wide
comments: true
read_time: true
categories:
  - SCCM
tags:
  - Windows Server
  - Microsoft
  - Services
  - Server
  - SCCM
  - System Center
  - Configuration Manager
  - System Center Configuration Manager
  - Site
  - Site Name
  - Primary Site
  - Language
  - Stand-alone
  - FQDN
  - Fully qualified domain name
  - Database
  - SMS
  - Systems Management Server
  - Site System Roles
  - Connection Point
  - SQL Server
---

![image-left](/assets/images/posts/2019-06-15-sccm-install/logo-sccm-222x150.png){: .align-left}
**System Center Configuration Manager (SCCM)** est un logiciel de gestion de système édité par Microsoft. Il est destiné la gestion de grands parcs informatique. Il permet : la prise de main à distance, la gestion et déploiement des mises à jour et correctifs, l’automatisation de tâches, la télédistribution d’applications, l’inventaire matériel et logiciel, la gestion de la conformité, l’administration des politiques de sécurité, le déploiement de systèmes d’exploitation.
{: .text-justify}

{% include toc icon="align-left" title="Table des matières" %}

## 1 Avant de commencer
Avant de commencer à mettre en place les conditions préalables à la mise en place des SCCM, il est nécessaire d'avoir suivi les trois articles suivant :
{: .text-justify}

- [Comment installer un contrôleur de domaine Active Directory sur Windows Server](/active%20directory/install-active-directory/)
- [Comment installer un serveur DHCP sur Windows Server](/dhcp/install-dhcp-server/)
- [Comment installer Microsoft SQL Server 2016](/sql/install-sql-server-2016/)
- [Comment installer les prérequis pour System Center Configuration Manager](/sccm/sccm-install-prerequisites/)
{: .text-justify}



## 2 Installer System Center Configuration Manager

Rendez-vous sur **"Z:\"** sur votre CD d'installation de SCCM, et exécutez **"splash.exe"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-15-sccm-install/2019-06-16-16_54_15-mRemoteNG---confCons.png){: .align-center}

L'assistant d'installation de Microsoft System Center Configuration Manager démarre.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-15-sccm-install/2019-06-16-16_55_56-mRemoteNG---confCons.png){: .align-center}

Cliquez sur **"Install"** pour commencer.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-15-sccm-install/2019-06-16-16_57_01-mRemoteNG---confCons.png){: .align-center}

**Before You Begin :** l'assistant énumère les conditions préalables à l'installation. Cliquez sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-15-sccm-install/2019-06-16-16_59_45-mRemoteNG---confCons.png){: .align-center}

**Getting Started :** séléctionnez **"Install a Configuration Manager primary site"** et cliquez sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-15-sccm-install/2019-06-16-17_00_10-mRemoteNG---confCons.png){: .align-center}

**Product Key :** séléctionnez **"Install the licensed edition of this product"**, entrez votre clé de produit dans le champ et cliquez sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-15-sccm-install/2019-06-16-17_01_27-mRemoteNG---confCons.png){: .align-center}

**Product License Terms :** cochez les cases suivantes :
{: .text-justify}
- **"I accept these License Terms and Privacy Statement."**
- **"I accept these License Terms."**
- **"I accept these License Terms."**
{: .text-justify}
Et cliquez sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-15-sccm-install/2019-06-16-17_02_19-mRemoteNG---confCons.png){: .align-center}

**Prerequisite Downloads :** sélectionnez **"Download required files"**, entrez le chemin suivant : **"C:\Users\administrator.CORP\Downloads"** et cliquez sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-15-sccm-install/2019-06-16-17_02_46-mRemoteNG---confCons.png){: .align-center}

L'assistant télécharge les fichiers nécessaires à l'installation.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-15-sccm-install/2019-06-16-17_03_08-mRemoteNG---confCons.png){: .align-center}

**Server Language Selection :** sélectionnez les langues que vous souhaitez ajouter pour le gestionnaire de configuration et cliquez sur  **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-15-sccm-install/2019-06-16-17_10_30-mRemoteNG---confCons.png){: .align-center}

**Server Language Selection :** sélectionnez les langues que vous voulez ajouter pour la partie client, pour ma part je choisirais **"French"** et cliquez sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-15-sccm-install/2019-06-16-17_11_38-mRemoteNG---confCons.png){: .align-center}

**Site and Installation Settings :** remplissez les champs suivants :
{: .text-justify}
- Dans le champs **"Site code:"** avec un mot de 3 lettres, pour ma part je choisirais **CORP**. 
- Remplissez le **"Site name:"** avec le nom de votre site.
- Dans le champs **"Installation folder:"** indiquer le chemin suivant : **"D:\Program Files\Microsoft Configuration Manager"**.
- Cochez la case **"Install the Configuration Manager console"**.
{: .text-justify}
Cliquez sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-15-sccm-install/2019-06-16-17_13_59-mRemoteNG---confCons.png){: .align-center}

**Primary Site Installation :** sélectionnez **"Install the primary site as a stand-aline site"** et cliquez sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-15-sccm-install/2019-06-16-17_14_30-mRemoteNG---confCons.png){: .align-center}

Cliquez sur **"Yes"** pour accepter.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-15-sccm-install/2019-06-16-17_14_56-mRemoteNG---confCons.png){: .align-center}

**Database Information :** entrez le nom de votre serveur SQL dans le champ **"SQL Server name (FQDN):"** pour ma part **corpwsql1.corp.priv**.
{: .text-justify}
Entrez le nom de votre future base de données dans le champ **"Database name:"** pour ma part **CM_COR**. Cliquez sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-15-sccm-install/2019-06-16-17_16_06-mRemoteNG---confCons.png){: .align-center}

**Database Information :** cliquez sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-15-sccm-install/2019-06-16-17_16_33-mRemoteNG---confCons.png){: .align-center}

**SMS Provider Setting :** dans le champ **"SMS Provider (FQDN):"** vérifier qu'apparaît bien le nom complet de votre serveur SCCM : **corpwscm1.corp.priv** et cliquez sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-15-sccm-install/2019-06-16-17_16_56-mRemoteNG---confCons.png){: .align-center}

**Client Computer Communication Settings :** cocher l'option **"Configure the communication method on each site system role"** et cliquez sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-15-sccm-install/2019-06-16-17_17_22-mRemoteNG---confCons.png){: .align-center}

**Site System Roles :** cliquez sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-15-sccm-install/2019-06-16-17_17_42-mRemoteNG---confCons.png){: .align-center}

**Diagnostic and Usage Data :** cliquez sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-15-sccm-install/2019-06-16-17_18_14-mRemoteNG---confCons.png){: .align-center}

**Service Connection Point Setup :** cliquez sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-15-sccm-install/2019-06-16-17_18_53-mRemoteNG---confCons.png){: .align-center}


**Prerequisite Check :** l'assistant affiche trois warnings :
{: .text-justify}
- **WSUS on site server :** il n'y a pas de serveur WSUS d'installer actuellement sur le site.
- **SQL Server Native Client version :** la version actuellement dois être mise à jour.</li>
- **SQL Server process memory allocation :** la réserve minimum de mémoire sur le serveur SQL doit être au moins de 8 Go.
{: .text-justify}

<i class="fas fa-info-circle"></i> **Information** <br>
Ses différentes alertes ne sont pas bloquantes pour la suite de l'installation. Vous trouverez ici la page listant [les vérifications des prérequis pour Configuration Manager](https://docs.microsoft.com/en-us/configmgr/core/servers/deploy/install/list-of-prerequisite-checks).
{: .notice--info .text-justify}

Cliquez sur **"Begin Install"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-15-sccm-install/2019-06-16-17_30_10-mRemoteNG---confCons.png){: .align-center}

**Install :** cliquez sur **"Close"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-15-sccm-install/2019-06-16-18_31_53-mRemoteNG---confCons.png){: .align-center}

La console Configuration Manager est maintenant disponible.
{: .text-justify}
![image-center](/assets/images/posts/2019-06-15-sccm-install/2019-06-16-18_33_05-mRemoteNG---confCons.png){: .align-center}

Et voilà ! Votre infrastructure est maintenant prête pour que vous puissiez commencer à utiliser SCCM.
{: .text-justify}