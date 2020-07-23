---
layout: single
title:  "Installer un serveur DHCP sur Windows Server 2016"
header:
  teaser: "/assets/images/Posts/2019-03-11-installer-dhcp-serveur/logo-dhcp-server.png"
  og_image: "/assets/images/Posts/2019-03-11-installer-dhcp-serveur/logo-dhcp-server.png"
type: posts
classes: wide
comments: true
read_time: true
categories:
  - DHCP
tags:
  - DHCP
  - Windows
  - Windows Server
  - Windows Server 2016
excerpt_separator: <!--more-->
---

<p style="text-align: justify;"><img src="{{ site.baseurl }}/assets/images/Posts/2019-03-11-installer-dhcp-serveur/logo-dhcp-server.png" class="align-left"><strong>Dynamic Host Configuration Protocol (DHCP)</strong> est un protocole réseau qui permet la configuration automatique des paramètres IP de clients<!--more-->, en leur distribuant automatiquement une <strong>IP address</strong> et <strong>subnet mask</strong>. Il peut également configurer la <strong>gateway</strong>, les serveurs <strong>DNS</strong> et des serveurs <strong>WINS</strong>. Les messages DHCP sont transmis via le protocole <strong>UDP</strong>, le client utilise le <strong>port 68</strong> pour émettre et recevoir les messages. Le serveur lui utilise le <strong>port 67</strong> pour envoyer et recevoir les messages.</p>

<h2>Le fonctionnement</h2>
<p style="text-align: justify;">Voici un schéma qui explique les échanges entre un client et un serveur pour obtenir les paramètres IP :</p>

<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-11-installer-dhcp-serveur/DHCP-requetes.jpg" class="align-center">

<ul>
  <li style="text-align: justify;"><strong>DHCP Discover :</strong> le client envoi une trame permettant de trouver un serveur DHCP via un <strong>broadcast</strong> à l'adresse MAC <strong>FF:FF:FF:FF:FF:FF</strong>.</li>
  <li style="text-align: justify;"><strong>DHCP Offer :</strong> le serveur répond par une proposition d'une ou plusieurs <strong>IP address</strong>, avec un <strong>subnet mask</strong>. Disponible dans son <strong>pool</strong> d'adresses disponible.</li>
  <li style="text-align: justify;"><strong>DHCP Request :</strong> le client retient une des offres du serveur, et renvoi une réponse au serveur pour stipuler son choix.</li>
  <li style="text-align: justify;"><strong>DHCP Ack :</strong> réponse du serveur qui accuse réception du choix de l'<strong>IP adress</strong> du client. Cette trame contient également le <strong>subnet</strong> et la durée du <strong>bail</strong> alloué. Elle inclut aussi la <strong>gateway</strong>, les serveurs <strong>DNS</strong> et le serveur <strong>WINS</strong>.</li>
</ul>

<h3>Prérequis</h3>
<p style="text-align: justify;">Voici les prérequis minimum pour un serveur hébergent le rôle DHCP.</p>

| Hardware     | Spécification |
|---------     | ----------- |
| **CPU :** | 1.4 GHz 64-bit |
| **RAM :** | 2048Mo (512Mo pour la version core) |
| **Disque dur :** | 32Go d’espace disque |
| **Réseau :** | Une connexion réseau |

<p style="text-align: justify;">Pour ce tutoriel, j'utiliserais la machine virtuel <strong>CORPWADS1</strong> créée précédemment dans l'article <a href="{{ site.baseurl }}/active%20directory/installer-active-directory/">Installer un contrôleur de domaine Active Directory sur Windows Server 2016</a>.</p>

<h2>Installation du rôle DHCP</h2>

<p style="text-align: justify;">Ouvrez le <strong>"Server Manager"</strong>.</p>
<p style="text-align: justify;">Cliquer sur <strong>"Manage"</strong>. Cliquer sur <strong>"Add Roles and Features"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-11-installer-dhcp-serveur/2019-02-26-17_10_33-1.png" class="align-center">

<p style="text-align: justify;"><strong>Defore You Begin :</strong> la page vous affiche un petit rappel des pré-requis avant l'installation d'un rôle. Si vous voulez que cette page n'apparaisse plus, cocher la casse <strong>"Skip this page by default"</strong> et cliquer sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-11-installer-dhcp-serveur/2019-02-26-17_11_55-1.png" class="align-center">

<p style="text-align: justify;"><strong>Select installation type :</strong> Nous souhaitons installer le rôle sur le serveur en question, laisser le choix par défaut et cliquer sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-11-installer-dhcp-serveur/2019-02-26-17_12_19-1.png" class="align-center">

<p style="text-align: justify;"><strong>Select destination server :</strong> Le choix par défaut sélectionne automatiquement notre serveur, cliquer sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-11-installer-dhcp-serveur/2019-02-26-17_12_35-1.png" class="align-center">

<p style="text-align: justify;"><strong>Select server roles :</strong> Select server roles : Dans la liste des rôles, sélectionner <strong>"DHCP Server"</strong>. Une fenêtre apparaît listant toutes les fonctionnalités, cliquer sur <strong>"Add Features"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-11-installer-dhcp-serveur/2019-02-26-17_13_13-1.png" class="align-center">

<p style="text-align: justify;"><strong>Select server roles :</strong> Le rôle a bien été sélectionné, cliquer sur <strong>"Next >"</strong></p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-11-installer-dhcp-serveur/2019-02-26-17_13_32-1.png" class="align-center">

<p style="text-align: justify;"><strong>Select features :</strong> Nous n'avons pas besoin de sélectionner de fonctionnalités supplémentaires, cliquer sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-11-installer-dhcp-serveur/2019-02-26-17_13_48-1.png" class="align-center">

<p style="text-align: justify;"><strong>DHCP Server :</strong> Un rappel de la fonction du serveur DHCP. Cliquer sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-11-installer-dhcp-serveur/2019-02-26-17_14_06-1.png" class="align-center">

<p style="text-align: justify;"><strong>Confirm installation selections :</strong> L'assistant nous liste les rôles et fonnalitées qui seront installés, cliquer sur <strong>"Install"</strong></p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-11-installer-dhcp-serveur/2019-02-26-17_14_23-1.png" class="align-center">

<p style="text-align: justify;"><strong>Installation progress :</strong> L'installation est maintenant finie. Nous allons passer à la configuration, cliquer sur <strong>"Close"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-11-installer-dhcp-serveur/2019-02-26-17_15_33-1.png" class="align-center">


<h2>Configuration post-déploiement</h2>

<p style="text-align: justify;">Ouvrez le <strong>"Server Manager"</strong>, en haut a droite cliquer sur le petit drapeau. Cliquer sur <strong>"Compete DHCP configuration"</strong>.</p>

<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-11-installer-dhcp-serveur/2019-02-26-17_15_53-1.png" class="align-center">

<p style="text-align: justify;"><strong>Description :</strong> L'assistant nous décris la nature des opérations, cliquer sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-11-installer-dhcp-serveur/2019-02-26-17_17_53-1.png" class="align-center">

<p style="text-align: justify;"><strong>Authorization :</strong> Ici, nous allons sélectionner l'utilisateur autorisé a gérer le rôle DHCP. Puis cliquer sur <strong>"Commit"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-11-installer-dhcp-serveur/2019-02-26-17_18_11-1.png" class="align-center">

<p style="text-align: justify;"><strong>Summary :</strong> Pour finir le post-déploiement, assistant créé deux groupes dans <strong>"l'Active Directory"</strong> :
<ul>
  <li><strong>DHCP Administrators :</strong> Groupe donnant accès a la gestion du <strong>"DHCP Service"</strong>.</li>
  <li><strong>DHCP Users :</strong> Groupe donnant accès en lecture seule access au <strong>"DHCP service"</strong>.</li>
</ul>  
Cliquer sur <strong>"Close"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-11-installer-dhcp-serveur/2019-02-26-17_18_32-1.png" class="align-center">


<h2>Configuration du serveur DHCP</h2>

<p style="text-align: justify;">Ouvrez le <strong>"Server Manager"</strong>, en haut a droite cliquer sur <strong>"Tools"</strong>. Dans la liste, cliquer sur <strong>"DHCP"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-11-installer-dhcp-serveur/2019-02-26-17_19_49-1.png" class="align-center">

<p style="text-align: justify;">Cliquer sur <strong>"IPV4"</strong>. Cliquer sur <strong>"New Scope..."</strong> pour ajouter une nouvelle étendue.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-11-installer-dhcp-serveur/2019-02-26-17_21_20-1.png" class="align-center">

<p style="text-align: justify;"><strong>New Scope Wizard :</strong> Cliquer sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-11-installer-dhcp-serveur/2019-02-26-17_21_47-1.png" class="align-center">

<p style="text-align: justify;"><strong>Scope Name :</strong> Renseigner le champ <strong>"Name :"</strong> avec le nom de votre scope. Puis cliquer sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-11-installer-dhcp-serveur/2019-02-26-17_22_24-1.png" class="align-center">

<p style="text-align: justify;"><strong>IP Address Range :</strong> Définisser la plage d'adresse que vous voulez affecter, ex: <strong>"192.168.100.50"</strong> <strong>"192.168.100.60"</strong>. Ensuite, choisissez un <strong>subnet</strong>, ex : <strong>"255.255.255.0"</strong>. Cliquer sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-11-installer-dhcp-serveur/2019-02-26-17_23_26-1.png" class="align-center">

<p style="text-align: justify;"><strong>Add Exclusions and Delay :</strong> Dans cette partie, il est possible d'exclure de la plage d'adresse une ou plusieurs adresses. Cliquer sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-11-installer-dhcp-serveur/2019-02-26-17_23_48-1.png" class="align-center">

<p style="text-align: justify;"><strong>Lease Duration :</strong> Ici vous pouvez spécifier la durée du bail. Cliquer sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-11-installer-dhcp-serveur/2019-02-26-17_24_09-1.png" class="align-center">

<p style="text-align: justify;"><strong>Configure DHCP Options :</strong> Sélectionner l'option <strong>"Yes, I want to configure these options now"</strong>. Cliquer sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-11-installer-dhcp-serveur/2019-02-26-17_24_26-1.png" class="align-center">

<p style="text-align: justify;"><strong>Router (Default Gateway) :</strong> Renseigner le champs <strong>"IP address"</strong> avec l'IP address de la gateway <strong>"192.168.10.254"</strong>. Cliquer ensuite sur <strong>"Add"</strong> et celui-ci s'ajoute à la liste en dessous. Cliquer sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-11-installer-dhcp-serveur/2019-02-26-17_25_16-1.png" class="align-center">

<p style="text-align: justify;"><strong>Domain Name and DNS Servers :</strong> Indiquer le nom du <strong>"Parent domain :"</strong> ex : <strong>"corp.priv"</strong>. Renseigner le champs <strong>"IP address"</strong> avec l'IP address du serveur DNS <strong>"192.168.10.1"</strong>. Cliquer ensuite sur <strong>"Add"</strong>. Cliquer sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-11-installer-dhcp-serveur/2019-02-26-17_25_41-1.png" class="align-center">

<p style="text-align: justify;"><strong>WINS Servers :</strong> Renseigner le champs <strong>"IP address"</strong> avec l'IP address de du serveur WINS <strong>"192.168.10.254"</strong>. Cliquer ensuite sur <strong>"Add"</strong>. Cliquer sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-11-installer-dhcp-serveur/2019-02-26-17_26_13-1.png" class="align-center">

<p style="text-align: justify;"><strong>Active Scope :</strong> Sélectionner l'option <strong>"Yes, Iwant to active this scope now"</strong>. <br/>Cliquer sur <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-11-installer-dhcp-serveur/2019-02-26-17_26_51-1.png" class="align-center">

<p style="text-align: justify;"><strong>Completing the New Scope Wizard :</strong> Cliquer sur <strong>"Finish"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-11-installer-dhcp-serveur/2019-02-26-17_27_06-1.png" class="align-center">

<p style="text-align: justify;">Le scope apparaît bien dans la fenêtre.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-11-installer-dhcp-serveur/2019-02-26-17_27_51-1.png" class="align-center">

<p style="text-align: justify;">Et voilà ! Nous avons maintenant un serveur DHCP. Vous pouvez obtenir automatiquement une IP address sur votre réseau.</p>