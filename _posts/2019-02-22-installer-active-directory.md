---
layout: single
title:  "Installer un contrôleur de domaine Active Directory sur Windows Server 2016"
header:
  teaser: "/assets/images/Posts/2019-02-22-installer-active-directory/logo-active-directory.png"
  og_image: "/assets/images/Posts/2019-02-22-installer-active-directory/logo-active-directory.png"
comments: true
read_time: true
type: posts
classes: wide
categories:
  - Active Directory
tags:
  - Windows
  - Windows Server
  - Windows Server 2016
  - Active Directory
  - DNS
excerpt_separator: <!--more-->
---

<p  style="text-align: justify;"><img src="{{ site.baseurl }}/assets/images/Posts/2019-02-22-installer-active-directory/logo-active-directory.png" class="align-left"><strong>Active Directory est l'annuaire LDAP pour le système Windows</strong>, il contient des <strong>Objets</strong> de types différents comme des user, computers, organization unit (OU), servers ou printers.<!--more--> Il permet de gérer les fonctions essentielles <strong>d'identification</strong> et <strong>d'authentification</strong>. Il permet également <strong>l'attribution</strong> et <strong>l'application de stratégies</strong>. L'Active Directory s'appuie sur le protocole <strong>DNS</strong>, sans celui-ci l'AD ne peut pas fonctionner. Le rôle DNS sera installé durant en même temps.</p>

<p style="text-align: justify;">Je vais commencer par les notions de bases d'un contrôleur de domaine. Notamment les composants qui le constituent et qui l'entourent, ainsi que les rôles <strong>FSMO</strong> (<i>Flexible Single Master Operation</i>) qui le composent.</p>

<h3>Les Composants</h3>
<ul>
  <li style="text-align: justify;"><strong>Forests :</strong> désigne la structure d'un ou plusieurs domaines.</li>
  <img src="{{ site.baseurl }}/assets/images/Posts/2019-02-22-installer-active-directory/AD-forests.png" class="align-center">
  <li style="text-align: justify;"><strong>Domains :</strong> domaine faisant partie d'une forêt, ex : paris.corp.priv, corp.priv.</li>
  <img src="{{ site.baseurl }}/assets/images/Posts/2019-02-22-installer-active-directory/AD-domains.png" class="align-center">
  <li style="text-align: justify;"><strong>Sites :</strong> permet de faire la distinction au niveau de la topologie du réseau, ex : Paris: 192.168.4.0, Londre: 192.168.5.0.</li>
  <img src="{{ site.baseurl }}/assets/images/Posts/2019-02-22-installer-active-directory/AD-sites.png" class="align-center">
  <li style="text-align: justify;"><strong>Domain Controllers :</strong> rôle du serveur qui traite les requêtes d'un domaine, il devra gérer : l'identification des objets, l’authentification, veiller à l’application des stratégies de groupe.</li>
  <img src="{{ site.baseurl }}/assets/images/Posts/2019-02-22-installer-active-directory/AD-domain-controllers.png" class="align-center">
  <li style="text-align: justify;"><strong>Organizational Units :</strong> conteneurs permettant de créer une hiérarchie.</li>
  <img src="{{ site.baseurl }}/assets/images/Posts/2019-02-22-installer-active-directory/AD-organizational-units.png" class="align-center">
</ul>

<h3>Les Rôles FSMO</h3>
<ul>
  <li style="text-align: justify;"><strong>Schema Master :</strong> Il gère la modification du schéma et sur le serveur et sa réplication. <strong>Unique au sein d'une forêt.</strong></li>
  <li style="text-align: justify;"><strong>Domain Naming Master :</strong> Il gére la ajout et la suppression de nom de domaine dans une forêt. <strong>Unique au sein d'une forêt.</strong></li>
  <li style="text-align: justify;"><strong>PDC Emulator :</strong> (<i>PDC Primary Domain Controller</i>) remplis 5 fonctions. <strong>Unique au sein d'un domaine.</strong>
    <ul>
      <li style="text-align: justify;">Modification des stratégies de groupe du domaine.</li>
      <li style="text-align: justify;">Synchroniser les horloges (date & heure) sur les contrôleurs de domaine.</li>
      <li style="text-align: justify;">Gérer le verrouillage des comptes.</li>
      <li style="text-align: justify;">Gère le changement des mots de passe.</li>
      <li style="text-align: justify;">Assure la compatibilité avec les contrôleurs de domaine Windows NT.</li>
    </ul>
  </li>
  <li style="text-align: justify;"><strong>RID Master</strong> (<i>Relative IDentifier</i>) qui alloue un identificateur relatif à l’intérieur d’un domaine (pour un utilisateur, un groupe ou tout autre objet géré par Active Directory). Il gère aussi le déplacement d’un objet d’un domaine à un autre, à l’intérieur de la forêt. <strong>Unique au sein d'un domaine.</strong></li>
  <li style="text-align: justify;"><strong>Infrastructure Master :</strong> Maintients les références entre plusieurs objets, comme les SID (<i>Security Identifiers</i>) et les GUID (<i>Globally Unique Identifier</i>). <strong>Unique au sein d'un domaine.</strong></li>
</ul>


<h2>Les prérequis</h2>
<p style="text-align: justify;">Maintenant passons a la pratique ! Voici les préconisations de Microsoft pour la machine hébergeant un contrôleur de domaine.</p>

| Hardware     | Spécification |
|---------     | ----------- |
| **CPU :** | Minimum: 1.4 GHz 64-bit |
| **RAM :** | 2Go |
| **Disque dur :** | 32Go d’espace disque |
| **Réseau :** | Une connexion réseau |

<p style="text-align: justify;">Pour ce tutoriel, j'utiliserais une machine virtuel avec <strong>Windows Server 2016 Standard</strong> avec la configuration suivante :</p>

<h3>Hardware</h3>

| Hardware     | Spécification |
|---------     | ----------- |
| **CPU :** | 2 vCPU |
| **RAM :** | 4Go |
| **Disque dur :** | C:\System 50Go |
| **Réseau :** |Host-only |

<h3>Network</h3>

| Champs     | Valeurs |
|---------     | ----------- |
| **IP address :** | 192.168.100.100 |
| **Subnet :** | 255.255.255.0 |
| **Default gateway :** | 192.168.100.254 |
| **DNS :** | 192.168.100.254 |

<h2>Préparation du serveur</h2>
<p style="text-align: justify;">Ouvrez le <strong>"Server Manager"</strong>, le programme se lance au démarrage.</p>
<p style="text-align: justify;">Cliquer sur <strong>"Local Server"</strong> remplissez les paramètres suivant.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-02-22-installer-active-directory/2019-02-22-23_20_21-1.png" class="align-center">
<ul>
  <li><strong>Computer name :</strong> Donner un nom significatif à votre serveur, pour ma part, je prendrais pour exemple : <strong>CORPWADS1</strong>.</li>
  <li><strong>Windows Firewall :</strong> Désactiver le firewall de Windows.</li>
  <li><strong>Remote Desktop :</strong> Activer le bureau à distance.</li>
  <li><strong>Ethernet0 :</strong> Définissez une adresse IP fixe, je prendrais pour exemple : <strong>192.168.100.100</strong></li>
</ul>
<p style="text-align: justify;">
<img src="{{ site.baseurl }}/assets/images/Posts/2019-02-22-installer-active-directory/2019-02-22-23_25_21-1.png" class="align-center">
</p>
<span class="notice--warning" >Il est recommandé par Microsot d'effectuer toutes les mises à jour avant toutes installations de rôles.</span>


<h2>Installation d'Active Directory sur Windows Server 2016</h2>

<p style="text-align: justify;">Maintenant il faut installer le rôle <strong>"ADDS"</strong>. Ouvrez le <strong>"Server Manager"</strong>, puis cliquer sur <strong>"Manage"</strong> puis <strong>"Add Roles and Features"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-02-22-installer-active-directory/2019-02-23-17_57_21-1.png" class="align-center">

<p style="text-align: justify;"><strong>Before ou begin :</strong> La page vous affiche un petit rappel des pré-requis avant l'installation d'un rôle. Si vous voulez que cette page n'apparaisse plus, cocher la casse <strong>"Skip this page by default"</strong> et cliquer sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-02-22-installer-active-directory/2019-02-23-18_04_21-1.png" class="align-center">

<p style="text-align: justify;"><strong>Select installation type :</strong> Nous souhaitons installer le rôle sur le serveur en question, laisser le choix par défaut et cliquer sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-02-22-installer-active-directory/2019-02-23-18_13_21-1.png" class="align-center">

<p style="text-align: justify;"><strong>Select destination server :</strong> Le choix par défaut sélectionne automatiquement notre serveur, cliquer sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-02-22-installer-active-directory/2019-02-23-18_17_21-1.png" class="align-center">

<p style="text-align: justify;"><strong>Select server roles :</strong> Dans la liste des rôles, sélectionner <strong>"Active Directory Domain Services"</strong>. Une fenêtre apparaît listant toutes les fonctionnalités, cliquer sur <strong>"Add Features"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-02-22-installer-active-directory/2019-02-23-18_37_21-1.png" class="align-center">

<p style="text-align: justify;"><strong>Select server roles :</strong> Le rôle a bien été sélectionné, cliquer sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-02-22-installer-active-directory/2019-02-23-18_40_21-1.png" class="align-center">

<p style="text-align: justify;"><strong>Select features :</strong> Nous n'avons pas besoin de sélectionner de fonctionnalités supplémentaires, cliquer sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-02-22-installer-active-directory/2019-02-23-20_52_21-1.png" class="align-center">

<p style="text-align: justify;"><strong>Active Directory Domain Services :</strong> Dans cette partie il est possible de configurer la liaison avec Azure Active Directory, cliquer sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-02-22-installer-active-directory/2019-02-23-20_54_21-1.png" class="align-center">

<p style="text-align: justify;"><strong>Confirm installation selections :</strong> L'assistant nous liste les rôles et fonnalitées qui seront installés, cliquer sur <strong>"Install"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-02-22-installer-active-directory/2019-02-23-20_59_21-1.png" class="align-center">

<p style="text-align: justify;"><strong>Installation progress :</strong> L'installation est maintenant finie. Nous allons passer à la configuration, cliquer sur <strong>"Close"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-02-22-installer-active-directory/2019-02-23-21_03_21-1.png" class="align-center">


<h2>Promulgation du contrôleur de domaine</h2>

<p style="text-align: justify;">Ouvrez le <strong>"Server Manager"</strong>, en haut a droite cliquer sur le petit drapeau. Cliquer sur <strong>"Promote this server to a domain controller"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-02-22-installer-active-directory/2019-02-23-21_07_21-1.png" class="align-center">

<p style="text-align: justify;"><strong>Deployment Configuration :</strong> Etant donnée que nous n'avons pas de forêt, selectionner <strong>"Add a new forest"</strong>.<br/>Ensuite l'étape la plus importante le nom de domaine, voici le <a href="https://docs.microsoft.com/fr-fr/windows-server/identity/ad-ds/plan/assigning-domain-names">lien</a> vers le site de Microsoft contentant les règles d'affectation. En règle générale, le nom de domaine est le nom de l'entreprise suivie de .PRIV, pour cet exemple, j'utiliserais <strong>"CORP.PRIV"</strong>. Cliquer sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-02-22-installer-active-directory/2019-02-23-21_14_21-1.png" class="align-center">

<p style="text-align: justify;"><strong>Domain Controller Options :</strong> Maintenant il faut régler le niveau fonctionnel de la forêt et du domaine. Pour ma part, je laisserais le niveau fonctionnel de la forêt et du domaine sur <strong>"Windows Server 2016"</strong>, voici le <a href="https://docs.microsoft.com/fr-fr/windows-server/identity/ad-ds/active-directory-functional-levels">lien</a> vers le site de Microsoft pour comprendre ce que cela implique.</p>
<p style="text-align: justify;">Dans les champs <strong>"Password:"</strong> et <strong>"Cofirm password:"</strong> avec votre mot de passe, il est conseillé d'en renseigner un différent de celui utilisé pour le compte administrator. Garder le précieusement il vous servira lors de restauration de l'Active Directory.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-02-22-installer-active-directory/2019-02-23-21_23_21-1.png" class="align-center">

<p style="text-align: justify;"><strong>DNS Options :</strong> L'assistant nous demande maintenant si nous voulons créer une délégation DNS, vue qu'aucune zone DNS n'existe pour le moment l'icône est grisé. Cliquer sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-02-22-installer-active-directory/2019-02-23-21_29_21-1.png" class="align-center">

<p style="text-align: justify;"><strong>Additional Options :</strong> Le nom <strong>NetBIOS"</strong> s'affiche, il correspond au nom de domaine sans l'extension. Cliquer sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-02-22-installer-active-directory/2019-02-23-21_31_21-1.png" class="align-center">

<p style="text-align: justify;"><strong>Paths :</strong> Laisser le dossier par défaut. Cliquer sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-02-22-installer-active-directory/2019-02-23-21_41_21-1.png" class="align-center">

<p style="text-align: justify;"><strong>Review Options :</strong>On nous affiche les récapitulatifs de notre configuration. Vous avez la possibilité de cliquer sur le bouton <strong>"View script"</strong> pour exporter le script de configuration de l'Active Directory. Cliquer sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-02-22-installer-active-directory/2019-02-23-21_47_21-1.png" class="align-center">

<p style="text-align: justify;"><strong>Prerequisites Check :</strong> L'assistant d'installation a fini de vérifier les pré-requis. Deux erreurs apparaissent, voici a quoi elles correspondent :</p>
<p style="text-align: justify;">
  <blockquote style="text-align: justify;">Contrôleurs de domaine qui exécutent Windows Server2008 ou version ultérieure possèdent un paramètre par défaut pour "Autoriser algorithmes de chiffrement compatibles avec Windows NT 4" qui empêche les algorithmes de chiffrement plus faibles lors de l’établissement de sessions sur canal sécurisé. Pour plus d’informations sur l’impact potentiel et une solution de contournement, voir l’article <a href="https://support.microsoft.com/kb/942564">942564</a>.</blockquote>
</p>

<p style="text-align: justify;">
  <blockquote style="text-align: justify;">La délégation DNS ne peut pas être créée ou mis à jour. Pour plus d’informations, voir <a href="https://docs.microsoft.com/fr-fr/windows-server/identity/ad-ds/deploy/ad-ds-installation-and-removal-wizard-page-descriptions#BKMK_DNSOptionsPage">Options DNS</a>.</blockquote>
</p>

<p style="text-align: justify;">Ses warnings ne gêne en rien l'installation. Cliquer sur <strong>"Install"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-02-22-installer-active-directory/2019-02-23-21_52_21-1.png" class="align-center">

<p style="text-align: justify;">Une fois l'installation finis, le serveur vas redémarrer automatiquement.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-02-22-installer-active-directory/2019-02-23-21_54_21-1.png" class="align-center">

<p style="text-align: justify;">Une fois le redémarrage effectué, le domaine <strong>"CORP"</strong> apparaît devant le login utilisateur <strong>"Administrator"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-02-22-installer-active-directory/2019-02-23-22_03_21-1.png" class="align-center">

<p style="text-align: justify;">Et voilà ! Nous avons maintenant un domaine Active Directory. Vous pouvez ajouter de nouvelles machines à votre domaine.</p>