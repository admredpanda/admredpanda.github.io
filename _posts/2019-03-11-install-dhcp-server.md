---
layout: single
title:  "Comment installer un serveur DHCP sur Windows Server"
last_modified_at: 2020-12-07
header:
  teaser: "/assets/images/posts/2019-03-11-install-dhcp-server/logo-dhcp-444x240.png"
  og_image: "/assets/images/posts/2019-03-11-install-dhcp-server/logo-dhcp-444x240.png"
type: posts
classes: wide
comments: true
read_time: true
categories:
  - DHCP
tags:
  - DHCP
  - Dynamic Host Configuration Protocol
  - DHCP Server
  - Windows Server
  - Windows
  - Microsoft
  - Server
  - Discover
  - Offer
  - Request
  - Ack
  - IP
  - IPv4
  - IP address
  - Internet Protocol
  - Scope
  - Subnet
  - Subnet mask
  - Mask
  - Default Gateway
  - Gateway
  - DNS
  - Domain Name System
  - WINS
  - Windows Internet Naming Service
  - WINS Server
  - Reservations
  - Address
  - Address Pool
  - Router
---

![image-left](/assets/images/posts/2019-03-11-install-dhcp-server/logo-dhcp-222x150.png){: .align-left}
**Dynamic Host Configuration Protocol (DHCP)** est un protocole réseau qui permet la configuration automatique des paramètres IP de clients, en leur distribuant automatiquement une **IP address** et **subnet mask**. Il peut également configurer la **gateway**, les serveurs **DNS** et des serveurs **WINS**. Les messages DHCP sont transmis via le protocole **UDP**, le client utilise le **port 68** pour émettre et recevoir les messages. Le serveur lui utilise le **port 67** pour envoyer et recevoir les messages.
{: .text-justify}

{% include toc icon="align-left" title="Table des matières" %}

## Le fonctionnement
Voici un schéma qui explique les échanges entre un client et un serveur pour obtenir les paramètres IP :
{: .text-justify}

![image-center](/assets/images/posts/2019-03-11-install-dhcp-server/DHCP-requetes.jpg){: .align-center}

- **DHCP Discover :** le client envoi une trame permettant de trouver un serveur DHCP via un **broadcast** à l'adresse MAC **FF:FF:FF:FF:FF:FF**.
- **DHCP Offer :** le serveur répond par une proposition d'une ou plusieurs **IP address**, avec un **subnet mask**. Disponible dans son **pool** d'adresses disponible.
- **DHCP Request :** le client retient une des offres du serveur, et renvoi une réponse au serveur pour stipuler son choix.
- **DHCP Ack :** réponse du serveur qui accuse réception du choix de l'**IP adress** du client. Cette trame contient également le **subnet** et la durée du **bail** alloué. Elle inclut aussi la **gateway**, les serveurs **DNS** et le serveur **WINS**.
{: .text-justify}


### Prérequis
Voici les prérequis minimum pour un serveur hébergent le rôle DHCP.
{: .text-justify}

| Hardware     | Spécification |
|---------     | ----------- |
| **CPU :** | 1.4 GHz 64-bit |
| **RAM :** | 2048Mo (512Mo pour la version core) |
| **Disque dur :** | 32Go d’espace disque |
| **Réseau :** | Une connexion réseau |


## Installation du rôle DHCP

Ouvrez le **"Server Manager"**.
{: .text-justify}
Cliquer sur **"Manage"**. Cliquer sur **"Add Roles and Features"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_10_33-1.png){: .align-center}

**Defore You Begin :** la page vous affiche un petit rappel des pré-requis avant l'installation d'un rôle. Si vous voulez que cette page n'apparaisse plus, cocher la casse **"Skip this page by default"** et cliquer sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_11_55-1.png){: .align-center}

**Select installation type :** nous souhaitons installer le rôle sur le serveur en question, laisser le choix par défaut et cliquer sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_12_19-1.png){: .align-center}

**Select destination server :** le choix par défaut sélectionne automatiquement notre serveur, cliquer sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_12_35-1.png){: .align-center}

**Select server roles :** select server roles : Dans la liste des rôles, sélectionner **"DHCP Server"**. Une fenêtre apparaît listant toutes les fonctionnalités, cliquer sur **"Add Features"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_13_13-1.png){: .align-center}

**Select server roles :** le rôle a bien été sélectionné, cliquer sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_13_32-1.png){: .align-center}

**Select features :** nous n'avons pas besoin de sélectionner de fonctionnalités supplémentaires, cliquer sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_13_48-1.png){: .align-center}

**DHCP Server :** un rappel de la fonction du serveur DHCP. Cliquer sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_14_06-1.png){: .align-center}

**Confirm installation selections :** l'assistant nous liste les rôles et fonnalitées qui seront installés, cliquer sur **"Install"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_14_23-1.png){: .align-center}

**Installation progress :** l'installation est maintenant finie. Nous allons passer à la configuration, cliquer sur **"Close"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_15_33-1.png){: .align-center}








## Configuration post-déploiement

Ouvrez le **"Server Manager"**, en haut a droite cliquer sur le petit drapeau. Cliquer sur **"Compete DHCP configuration"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_15_53-1.png){: .align-center}

**Description :** l'assistant nous décris la nature des opérations, cliquer sur **"Next >"**
{: .text-justify}
![image-center](/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_17_53-1.png){: .align-center}

**Authorization :** ici, nous allons sélectionner l'utilisateur autorisé a gérer le rôle DHCP. Puis cliquer sur **"Commit"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_18_11-1.png){: .align-center}

**Summary :** pour finir le post-déploiement, assistant créé deux groupes dans **"l'Active Directory"** :
{: .text-justify}
- **DHCP Administrators :** groupe donnant accès a la gestion du **"DHCP Service"**.
- **DHCP Users :** groupe donnant accès en lecture seule access au **"DHCP service"**.
{: .text-justify}

Cliquer sur **"Close"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_18_32-1.png){: .align-center}


## Configuration du serveur DHCP

Ouvrez le **"Server Manager"**, en haut a droite cliquer sur **"Tools"**. Dans la liste, cliquer sur **"DHCP"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_19_49-1.png){: .align-center}

Cliquer sur **"IPV4"**. Cliquer sur **"New Scope..."** pour ajouter une nouvelle étendue.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_21_20-1.png){: .align-center}

**New Scope Wizard :** cliquer sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_21_47-1.png){: .align-center}

**Scope Name :** renseigner le champ **"Name :"** avec le nom de votre scope. Puis cliquer sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_22_24-1.png){: .align-center}

**IP Address Range :** définisser la plage d'adresse que vous voulez affecter, ex: **"192.168.100.50"** **"192.168.100.60"**. Ensuite, choisissez un **subnet**, ex : **"255.255.255.0"**. Cliquer sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_23_26-1.png){: .align-center}

**Add Exclusions and Delay :** dans cette partie, il est possible d'exclure de la plage d'adresse une ou plusieurs adresses. Cliquer sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_23_48-1.png){: .align-center}

**Lease Duration :** ici vous pouvez spécifier la durée du bail. Cliquer sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_24_09-1.png){: .align-center}

**Configure DHCP Options :** sélectionner l'option **"Yes, I want to configure these options now"**. Cliquer sur "Next >".
{: .text-justify}
![image-center](/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_24_26-1.png){: .align-center}

**Router (Default Gateway) :** renseigner le champs **"IP address"** avec l'IP address de la gateway **"192.168.10.254"**. Cliquer ensuite sur **"Add"** et celui-ci s'ajoute à la liste en dessous. Cliquer sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_25_16-1.png){: .align-center}

**Domain Name and DNS Servers :** indiquer le nom du **"Parent domain :"** ex : **"corp.priv"**. Renseigner le champs **"IP address"** avec l'IP address du serveur DNS **"192.168.10.1"**. Cliquer ensuite sur **"Add"**. Cliquer sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_25_41-1.png){: .align-center}

**WINS Servers :** renseigner le champs **"IP address"** avec l'IP address de du serveur WINS **"192.168.10.254"**. Cliquer ensuite sur **"Add"**. Cliquer sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_26_13-1.png){: .align-center}

**Active Scope :** sélectionner l'option **"Yes, Iwant to active this scope now"**. <br/>Cliquer sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_26_51-1.png){: .align-center}

**Completing the New Scope Wizard :** cliquer sur **"Finish"**.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_27_06-1.png){: .align-center}

Le scope apparaît bien dans la fenêtre.
{: .text-justify}
![image-center](/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_27_51-1.png){: .align-center}

Et voilà ! Nous avons maintenant un serveur DHCP. Vous pouvez obtenir automatiquement une IP address sur votre réseau.
{: .text-justify}