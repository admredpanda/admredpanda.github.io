---
layout: single
title:  "Installer System Center Configuration Manager 1902"
header:
  teaser: "/assets/images/Posts/2019-06-15-installer-SCCM-1902/logo-sccm-2016.png"
  og_image: "/assets/images/Posts/2019-06-15-installer-SCCM-1902/logo-sccm-2016.png"
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

<p style="text-align: justify;"><img src="{{ site.baseurl }}/assets/images/Posts/2019-06-15-installer-SCCM-1902/logo-sccm-2016.png" class="align-left"><strong>System Center Configuration Manager (SCCM)</strong> est un logiciel de gestion de système édité par Microsoft. Il est destiné la gestion de grands parcs informatique.<!--more--> Il permet : la prise de main à distance, la gestion et déploiement des mises à jour et correctifs, l’automatisation de tâches, la télédistribution d’applications, l’inventaire matériel et logiciel, la gestion de la conformité, l’administration des politiques de sécurité, le déploiement de systèmes d’exploitation.</p>


<p style="text-align: justify;">Rendez-vous sur <strong>"Z:\"</strong> sur votre CD d'installation de SCCM, et exécutez <strong>"splash.exe"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-15-installer-SCCM-1902/2019-06-16-16_54_15-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;">L'assistant d'installation de Microsoft System Center Configuration Manager démarre.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-15-installer-SCCM-1902/2019-06-16-16_55_56-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;">Cliquez sur <strong>"Install"</strong> pour commencer.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-15-installer-SCCM-1902/2019-06-16-16_57_01-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;"><strong>Before You Begin :</strong> l'assistant énumère les conditions préalables à l'installation. Cliquez sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-15-installer-SCCM-1902/2019-06-16-16_59_45-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;"><strong>Getting Started :</strong> séléctionnez <strong>"Install a Configuration Manager primary site"</strong> et cliquez sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-15-installer-SCCM-1902/2019-06-16-17_00_10-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;"><strong>Product Key :</strong> séléctionnez <strong>"Install the licensed edition of this product"</strong>, entrez votre clé de produit dans le champ et cliquez sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-15-installer-SCCM-1902/2019-06-16-17_01_27-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;"><strong>Product License Terms :</strong> cochez les cases suivantes :
<ul>
  <li><strong>"I accept these License Terms and Privacy Statement."</strong></li>
  <li><strong>"I accept these License Terms."</strong></li>
  <li><strong>"I accept these License Terms."</strong></li>
</ul>
Et cliquez sur <strong>"Next >"</strong>.
</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-15-installer-SCCM-1902/2019-06-16-17_02_19-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;"><strong>Prerequisite Downloads :</strong> sélectionnez <strong>"Download required files"</strong>, entrez le chemin suivant : <strong>"C:\Users\administrator.CORP\Downloads"</strong> et cliquez sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-15-installer-SCCM-1902/2019-06-16-17_02_46-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;">L'assistant télécharge les fichiers nécessaires à l'installation.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-15-installer-SCCM-1902/2019-06-16-17_03_08-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;"><strong>Server Language Selection :</strong> sélectionnez les langues que vous souhaitez ajouter pour le gestionnaire de configuration et cliquez sur  <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-15-installer-SCCM-1902/2019-06-16-17_10_30-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;"><strong>Server Language Selection :</strong> sélectionnez les langues que vous voulez ajouter pour la partie client, pour ma part je choisirais <strong>"French"</strong> et cliquez sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-15-installer-SCCM-1902/2019-06-16-17_11_38-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;"><strong>Site and Installation Settings :</strong> remplissez le <strong>"Site code:"</strong> avec un mot de 3 lettres, pour ma part je choisirais <strong>CORP</strong>.</p>
<p style="text-align: justify;">Remplissez le <strong>"Site name:"</strong> avec le nom de votre site.</p>
<p style="text-align: justify;">Dans le champs <strong>"Installation folder:"</strong> indiquer le chemin suivant : <strong>"D:\Program Files\Microsoft Configuration Manager"</strong>.</p>
<p style="text-align: justify;">Cochez la case <strong>"Install the Configuration Manager console"</strong> et cliquez sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-15-installer-SCCM-1902/2019-06-16-17_13_59-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;"><strong>Primary Site Installation :</strong> sélectionnez <strong>"Install the primary site as a stand-aline site"</strong> et cliquez sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-15-installer-SCCM-1902/2019-06-16-17_14_30-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;">Cliquez sur <strong>"Yes"</strong> pour accepter.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-15-installer-SCCM-1902/2019-06-16-17_14_56-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;"><strong>Database Information :</strong> entrez le nom de votre serveur SQL dans le champ <strong>"SQL Server name (FQDN):"</strong> pour ma part <strong>corpwsql1.corp.priv</strong>.</p>
<p style="text-align: justify;">Entrez le nom de votre future base de données dans le champ <strong>"Database name:"</strong> pour ma part <strong>CM_COR</strong>. Cliquez sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-15-installer-SCCM-1902/2019-06-16-17_16_06-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;"><strong>Database Information :</strong> Cliquez sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-15-installer-SCCM-1902/2019-06-16-17_16_33-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;"><strong>SMS Provider Setting :</strong> dans le champ <strong>"SMS Provider (FQDN):"</strong> vérifier qu'apparaît bien le nom complet de votre serveur SCCM : <strong>corpwscm1.corp.priv</strong> et cliquez sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-15-installer-SCCM-1902/2019-06-16-17_16_56-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;"><strong>Client Computer Communication Settings :</strong> cocher l'option <strong>"Configure the communication method on each site system role"</strong> et cliquez sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-15-installer-SCCM-1902/2019-06-16-17_17_22-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;"><strong>Site System Roles :</strong> cliquez sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-15-installer-SCCM-1902/2019-06-16-17_17_42-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;"><strong>Diagnostic and Usage Data :</strong> cliquez sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-15-installer-SCCM-1902/2019-06-16-17_18_14-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;"><strong>Service Connection Point Setup :</strong> cliquez sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-15-installer-SCCM-1902/2019-06-16-17_18_53-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;"><strong>Prerequisite Check :</strong> l'assistant affiche trois warnings :
<ul>
  <li><strong>WSUS on site server :</strong> il n'y a pas de serveur WSUS d'installer actuellement sur le site.</li>
  <li><strong>SQL Server Native Client version :</strong> la version actuellement dois être mise à jour.</li>
  <li><strong>SQL Server process memory allocation :</strong> la réserve minimum de mémoire sur le serveur SQL doit être au moins de 8 Go.</li>
</ul>
Ses différentes alertes ne sont pas bloquantes pour la suite de l'installation. Vous trouverez ici la page listant <a href="https://docs.microsoft.com/fr-fr/configmgr/core/servers/deploy/install/list-of-prerequisite-checks">les vérifications des prérequis pour Configuration Manager</a>.</p>
<p style="text-align: justify;">Cliquez sur <strong>"Begin Install"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-15-installer-SCCM-1902/2019-06-16-17_30_10-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;"><strong>Install :</strong> cliquez sur <strong>"Close"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-15-installer-SCCM-1902/2019-06-16-18_31_53-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;">La console Configuration Manager est maintenant disponible.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-15-installer-SCCM-1902/2019-06-16-18_33_05-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;">Et voilà ! Votre infrastructure est maintenant prête pour que vous puissiez commencer à utiliser SCCM.</p>