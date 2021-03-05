---
layout: single
title:  "Comment installer et configurer une certificate authorities sur Windows Server"
last_modified_at: 2020-12-07
header:
  teaser: "/assets/images/posts/2020-11-26-install-configure-certificate-authorities/logo-ad-cs-444x240.png"
  og_image: "/assets/images/posts/2020-11-26-install-configure-certificate-authorities/logo-ad-cs-444x240.png"
type: posts
classes: wide
comments: true
read_time: true
categories:
  - Active Directory
tags:
  - PKI
  - Public Key Infrastructure
  - Authoritie
  - Authorities
  - Certificate Authoritie
  - Certificate Authorities
  - CA
  - Certificate
  - Certificate Services
  - AD CS
  - Active Directory Certificate Services
  - AD
  - Active Directory
  - Windows
  - Windows Server
  - Microsoft
  - Security
  - Services
  - Server
---

![image-left](/assets/images/posts/2020-11-26-install-configure-certificate-authorities/logo-ad-cs-222x150.png){: .align-left}
L'**Active Directory Certificate Service (AD CS)** fournit des fonctionnalités pour la gestion d'une **infrastructure de clé publique (PKI)** qui gère les identités et autres caractéristiques de sécurité sur le domaine Windows. Il peut **créer**, **valider** et **révoquer des certificats de clés publiques** pour les besoins **internes d'une organisation**. Elle est utilisée pour la sécurité des applications suivantes : Signatures numériques, Courrier électronique sécurisé, Authentification Internet, Sécurité IP, Connexion par carte à puce, Cryptage des certificats d'utilisateur et de récupération du système de fichiers, Authentification 802.1X sans fil, Authentification des dispositifs de réseau tels que les routeurs qui n'ont pas de comptes réseau.
{: .text-justify}

{% include toc icon="align-left" title="Table des matières" %}


## 1 Installation

Ouvrez le **"Server Manager"**, puis cliquez sur **"Manage"** et ensuite sur **"Add Roles and Features"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_04_21-0.png){: .align-center}

**Before you begin :** la page affiche un petit rappel des pré-requis avant l'installation d'un rôle. Si vous souhaitez que cette page n'apparaisse plus, cochez la case **"Skip this page by default"** et cliquez sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_04_21-1.png){: .align-center}

**Select installation type :** nous voulons installer le rôle sur le serveur en question, laissez le choix par défaut et cliquez sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_13_21-1.png){: .align-center}

**Select destination server :** le choix par défaut est de sélectionner automatiquement notre serveur dans le pool, cliquez sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_21-1.png){: .align-center}

**Select server roles :** dans la liste des rôles, cochez la case **"Active Directory Certificate Services"**. Cliquez sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_22-1.png){: .align-center}

**Select server roles :** une fenêtre apparaît pour vous demander si vous souhaitez installer des outils de gestion pour le rôle Active Directory Certificate Services, cliquez sur **"Add Features"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_23-1.png){: .align-center}

**Select server roles :** cliquez sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_24-1.png){: .align-center}

**Select features :** cliquez sur **"Suivant >"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_25-1.png){: .align-center}

**Active Directory Certificate Services :** cliquez sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_26-1.png){: .align-center}

**Select role services :** cochez la case **"Certificate Authority"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_27-1.png){: .align-center}

**Confirm installation selections :** cliquer sur **"Install"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_32-1.png){: .align-center}

**Installation progress :** cliquez sur "Close".
{: .text-justify}
![image-center](/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_33-1.png){: .align-center}


## 2 Configuration

Dans le **"Server Manager"**, cliquez sur **"le drapeau avec un avertissement"** et cliquez sur le lien **"Configure Active Directory Certificate Services on th..."**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_34-1.png){: .align-center}

**Credentials :** cliquez sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_35-1.png){: .align-center}

**Role Services :** cochez la case **"Certificate Authority"**. Cliquez sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_36-1.png){: .align-center}

**Setup Type :** cochez la case **"Entreprise CA"**. Cliquez sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_36-2.png){: .align-center}

**CA Type :** cochez la case **"Root CA"** et cliquez sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_37-1.png){: .align-center}

**Private Key :** cochez la case **"Create a new private key"** et cliquez sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_38-1.png){: .align-center}

**Cryptography for CA :** dans le champ **"Key length field :"** sélectionnez **"4096"**, dans la liste **"Select the hash algorithm for signing certificates issued by this CA :"** et sélectionnez **"SHA256"**.<br/>
Cliquez sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_39-1.png){: .align-center}

**CA Name :** dans le champ **"Common name for this CA :"** remplir le champ avec le nom de cette CA comme ceci **"corpRootCA"**, dans le champ **"Distinguished name suffix :"** laisser le vide, dans le champ **"Preview of distinguished name :"** remplir le champ avec le nom de cette CA comme ceci **"CN=corpRootCA"**.<br/>
Cliquez sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_40-1.png){: .align-center}

**Validity Period :** dans le champ **"Select the validity period for the certificate generated for this certification authority (CA):"** remplissez le champ avec la période de validité de votre certificat, j'utiliserais pour ma part **"5"** ans.<br/>
Cliquez sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_41-1.png){: .align-center}

**CA Database :** cliquez sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_42-1.png){: .align-center}

**Confirmation :** cliquez sur **"Configure"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_43-1.png){: .align-center}

**Results :** cliquez sur **"Close"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_44-1.png){: .align-center}

Et voilà ! Les services de certificats Active Directory ont été installés et configurés avec succès, vous pouvez maintenant créer, valider et révoquer vos certificats de clés publiques pour votre organisation.
{: .text-justify}


## 3 Sources

- [Install the Certification Authority](https://docs.microsoft.com/en-us/windows-server/networking/core-network-guide/cncg/server-certs/install-the-certification-authority)
- [Active Directory Certificate Services (AD CS) Public Key Infrastructure (PKI) Design Guide](https://social.technet.microsoft.com/wiki/contents/articles/7421.active-directory-certificate-services-ad-cs-public-key-infrastructure-pki-design-guide.aspx)
- [Public Key Infrastructure Design Guidance](https://social.technet.microsoft.com/wiki/contents/articles/2901.public-key-infrastructure-design-guidance.aspx)
- [Designing and Implementing a PKI: Part I Design and Planning](https://techcommunity.microsoft.com/t5/ask-the-directory-services-team/designing-and-implementing-a-pki-part-i-design-and-planning/ba-p/396953)