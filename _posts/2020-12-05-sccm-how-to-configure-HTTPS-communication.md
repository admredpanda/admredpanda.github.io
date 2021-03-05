---
layout: single
title:  "Comment configurer le mode de communication HTTPS dans System Center Configuration Manager"
last_modified_at: 2020-12-07
header:
  teaser: "/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/logo-sccm-444x240.png"
  og_image: "/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/logo-sccm-444x240.png"
type: posts
classes: wide
comments: true
read_time: true
categories:
  - SCCM
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
  - SCCM
  - System Center
  - Configuration Manager
  - System Center Configuration Manager
---

![image-left](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/logo-sccm-222x150.png){: .align-left}
Dans SCCM nativement, les communications entre clients et serveurs, et entre les serveurs ne sont pas sécurisées. **System Center Configuration Manager** permet de s'appuyer sur une **infrastructure à clé publique (PKI)** pour sécuriser une **autorité de certification (CA)** d'entreprise. Ce mécanisme peut être nécessaire pour des raisons de sécurité lors de la mise en œuvre d'une **Cloud Management Gateway (CMG)**, **Internet Based Client Management (IBCM)**, **BitLocker management**, de la communication avec les **clients MacOS**. Dans cet article, nous configurons la connexion HTTPS côté client au **Management Point**, **Distribution Point** et au **Software Update Point**.
{: .text-justify}

{% include toc icon="align-left" title="Table des matières" %}


## 1 Créer un groupe de sécurité Active Directory

### 1.1 Groupe pour les serveurs SCCM Internet Information Services

Sur votre contrôleur de domaine Active Directory, pour moi **"CORPWADS1"**.<br/>
Ouvrez la console **"Active Directory Users and Computers"**, dans votre OU quand vous avez vos groupes, cliquez sur **"Action"** en haut, et sélectionnez **"New"** et cliquez sur **"Group"**.
{: .text-justify}
Dans le champ **"Group name :"**, indiquez le nom suivant **"GRP_SCCM_IIS_Servers"** et dans le champ **"Group name (pre-Windows 2000) :"**, indiquez le nom suivant **"GRP_SCCM_IIS_Servers"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_00.png){: .align-center}

Double-cliquez sur le groupe **"GRP_SCCM_IIS_Servers"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_01.png){: .align-center}

Sélectionnez l'onglet **"Members"** en haut, en bas cliquez sur **"Add..."**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_02.png){: .align-center}

Cliquez sur **"Object Types..."**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_03.png){: .align-center}

Cochez la case **"Computers"** et cliquez sur **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_04.png){: .align-center}

Dans le champ **"Enter the object names to select (examples):"** indiquez le nom de votre serveur SCCM **"CORPWSCM1"** et cliquez sur le bouton **"Check Names"**. Cliquez sur **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_05.png){: .align-center}

Cliquez sur **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_06.png){: .align-center}

### 1.2 Groupe pour les serveurs SCCM Distribution Point

Dans la console **"Active Directory Users and Computers"**, dans votre OU lorsque celui-ci contient vos groupes, cliquez sur **"Action"** en haut, et sélectionnez **"New"** et cliquez sur **"Group"**.
{: .text-justify}
Dans le champ **"Group name :"**, indiquez le nom suivant **"GRP_SCCM_DP_Servers"** et dans le champ **"Group name (pre-Windows 2000) :"**, indiquez le nom suivant **"GRP_SCCM_DP_Servers"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_07.png){: .align-center}

Double-cliquez sur le groupe **"GRP_SCCM_DP_Servers"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_08.png){: .align-center}

Sélectionnez l'onglet **"Members"** en haut, en bas cliquez sur **"Add..."**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_09.png){: .align-center}

Cliquez sur **"Object Types..."**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_10.png){: .align-center}

Cochez la case **"Computers"** et cliquez sur **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_11.png){: .align-center}

Dans le champ **"Enter the object names to select (examples):"** indiquez le nom de votre serveur SCCM **"CORPWSCM1"** et cliquez sur le bouton **"Check Names"**. Cliquez sur **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_12.png){: .align-center}

Cliquez sur **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_13.png){: .align-center}

Ensuite, redémarrez le serveur **CORPWSCM1**, pour que le changement prenne effet.
{: .text-justify}


## 2 Créer des modèles de certificat sur l'autorité de certification

Sur votre server **Active Directory Certificate Service**, pour moi **"CORPWADS1"**.<br/>
Ouvrez le **"Windows Start Menu"**, dans la barre de recherche, cherchez la console **"CertSrv.msc"** et ouvrez-la.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_14.png){: .align-center}

Dans la barre de gauche, développez **"corpRootCA"**, cliquez avec le bouton droit sur **"Certificate Templates"** et cliquez sur **"Manage"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_15.png){: .align-center}


### 2.1 Certificat Internet Information Services

Dans la console **"Certificate Templates Console"**, en bas, cliquez avec le bouton droit de la souris sur **"Web Server"** et sélectionnez **"Duplicate Template"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_16.png){: .align-center}

Sélectionnez l'onglet **"General"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_17.png){: .align-center}

Dans le champ **"Template display name:"**, indiquez le nom suivant **"SCCM IIS Certificate"** et dans le champ **"Template name:"**, indiquez le nom suivant **"SCCMIISCertificate"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_18.png){: .align-center}

Sélectionnez l'onglet **"Request Handling"**, vérifiez que **"Allow private key to be exported"** n'est pas sélectionné.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_19.png){: .align-center}

Sélectionnez l'onglet **"Subject Name"**, vérifiez que **"Supply in the Request"** est sélectionné.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_20.png){: .align-center}

Sélectionnez l'onglet **"Security"**, cliquez sur **"Add..."**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_21.png){: .align-center}

Dans le champ **"Enter the object names to select (examples):"** indiquez le nom suivant de votre groupe **"GRP_SCCM_IIS_Servers"** et cliquez sur **"Check Names"**. Cliquez sur **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_22.png){: .align-center}

Pour le groupe **"GRP_SCCM_IIS_Servers"**, cochez les cases **"Read"** et **"Enroll"**. Cliquez sur **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_23.png){: .align-center}


### 2.2 Certificat Distribution Point

Dans la console **"Certificate Templates Console"**, en bas, cliquez avec le bouton droit de la souris sur **"Workstation Authentification"** et sélectionnez **"Duplicate Template"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_24.png){: .align-center}

Sélectionnez l'onglet **"General"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_25.png){: .align-center}

Dans le champ **"Template display name:"**, indiquez le nom suivant **"SCCM DP Certificate"** et dans le champ **"Template name:"**, indiquez le nom suivant **"SCCMDPCertificate"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_26.png){: .align-center}

Sélectionnez l'onglet **"Request Handling"**, cochez la case **"Allow private key to be exported"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_27.png){: .align-center}

Sélectionnez l'onglet **"Security"**, cliquez sur **"Add..."**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_28.png){: .align-center}

Dans le champ **"Enter the object names to select (examples):"**, indiquez le nom suivant de votre groupe **"GRP_SCCM_DP_Servers"** et cliquez sur **"Check Names"**. Cliquez sur **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_29.png){: .align-center}

Pour le groupe **"GRP_SCCM_DP_Servers"**, cochez les cases **"Read"** et **"Enroll"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_30.png){: .align-center}

Sélectionnez le groupe **"Entreprise Admins (CORP\Entreprise Admins)"** et cliquez sur le bouton **"Remove"**. Cliquez sur **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_31.png){: .align-center}


### 2.3 Certificat Client 

Dans la console **"Certificate Templates Console"**, en bas, cliquez avec le bouton droit de la souris sur **"Workstation Authentification"** et sélectionnez **"Duplicate Template"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_32.png){: .align-center}

Sélectionnez l'onglet **"General"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_33.png){: .align-center}

Dans le champ **"Template display name:"**, indiquez le nom suivant **"SCCM Client Certificate"** et dans le champ **"Template name:"**, indiquez le nom suivant **"SCCMClientCertificate"**, dans le champ **"Validity period:"**, indiquez **"3"** ans.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_34.png){: .align-center}

Sélectionnez l'onglet **"Subject Name"**, puis cochez la case **"Build from this Active Directory information"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_35.png){: .align-center}

Sélectionnez l'onglet **"Request Handling"**, vérifiez que **"Allow private key to be exported"** n'est pas sélectionné.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_36.png){: .align-center}

Sélectionnez l'onglet **"Security"**, pour le groupe **"Domain Computers (CORP\Domain Computers)"**, cochez les cases **"Read"**, **"Enroll"** et **"Autoenroll"**. Cliquez sur **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_37.png){: .align-center}

Les trois modèles de SCCM sont maintenant affichés ci-dessous, fermez la console **Certificate Templates Console**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_38.png){: .align-center}


## 3 Déployer les certificats

### 3.1 Publier les Certificates Templates

De retour sur la console **"certsrv"**, dans la barre de gauche, cliquez à droite sur **"Certificate Templates"** et cliquez sur **"New"** et sur **"Certificate Template to Issue"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_39.png){: .align-center}

Sélectionnez vos trois modèles de certificat, **"SCCM Client Certificate"**, **"SCCM DP Certificate"**, **"SCCM IIS Certificate"** et cliquez sur **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_40.png){: .align-center}


### 3.2 Créer une GPO d'inscription automatique pour les ordinateurs

Sur votre **contrôleur de domaine Active Directory**, pour moi **"CORPWADS1"**.<br/>
Ouvrez la console **"Group Policy Management"**, développez **"Forest : corp.priv"**, **"Domains"**, cliquez à droite sur **"corp.priv"** et sélectionnez **"Create a GPO in this domain, and Link it here..."**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_41.png){: .align-center}

Dans le champ **"Nom :"**, indiquez le nom suivant **"C-Cert_Auto_Enrollment"** et cliquez sur **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_42.png){: .align-center}

Cliquez à droite sur votre GPO **"C-Cert_Auto_Enrollment"** et cliquez sur **"Edit..."**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_43.png){: .align-center}

Dans la console **"Group Policy Management Editor"**, dans la barre de gauche, développez **"Computer Configuration"**, **"Policies"**, **"Windows Settings"**, **"Security Settings"**, **"Public Key Policies"** et dans la barre de droite, double-cliquez sur **"Certificate Services Client - Auto-Enrollment"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_44.png){: .align-center}

Sur le **"Configuration Model:"** sélectionnez **"Enabled"** et cliquez sur **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_45.png){: .align-center}


### 3.3 Demandez le certificat du client dans votre serveur SCCM

Sur votre **serveur SCCM**, pour moi **"CORPWSCM1"**.
Ouvrez le **"Windows Start Menu"**, puis **"Command Prompt"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_46.png){: .align-center}

Dans l'invite de commande, tapez la commande **"certlm.msc"** et tapez **"Enter"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_47.png){: .align-center}

Dans la console certlm, dans la barre de gauche, développez **"Personal"** et double-cliquez sur **"Certificates"**.
Vous pouvez voir les certificats publiés par défaut pour les serveurs.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_48.png){: .align-center}

Passez à l'invite de commande, tapez la commande **"gpupdate /force"** et tapez **"Enter"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_49.png){: .align-center}

Retournez à la console **certlm**, rafraîchissez la vue, vous pouvez voir que le modèle **"SCCM Client Certificate"** a généré le certificat d'authentification du certificat du client.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_50.png){: .align-center}


### 3.4 Générer les certificats sur les serveurs SCCM

Dans la console certlm, dans la barre de gauche, cliquez sur **"Certificates"**, cliquez sur **"All Tasks"**, cliquez sur **"Request New Certificate..."**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_51.png){: .align-center}

Cliquez sur **"Next"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_52.png){: .align-center}

Cliquez sur **"Next"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_53.png){: .align-center}

Cochez les cases **"SCCM DP Certificate"** et **"SCCM IIS Certificate"**. Et cliquez sur le lien **"More information is required to enroll for this certificate. Click here to configure settings"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_54.png){: .align-center}

Dans **"Alternative name :"**, dans **"Type :"** sélectionnez **"DNS"**, dans **"Value :"** remplissez le nom DNS de votre serveur et cliquez sur **"Add >"**. Répétez l'opération avec le nom FQDN de votre serveur.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_55.png){: .align-center}

Sélectionnez l'onglet **"General"**. Dans **"Friendly name :"** remplissez le nom suivant **"SCCM IIS Cert"**.<br/>
Cliquez sur **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_56.png){: .align-center}

Cliquez sur **"Enroll"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_57.png){: .align-center}

Cliquez sur **"Finish"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_58.png){: .align-center}

Vous pouvez voir les modèles de **"SCCM DP Certificate"** et de **"SCCM IIS Certificate"** qui ont été générés.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_59.png){: .align-center}


### 3.5 Export du certificat du distribution point

Cliquez à droite sur votre **"SCCM DP Certificate"**, sélectionnez **"All Tasks"** et cliquez sur **"Export..."**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_60.png){: .align-center}

Cliquez sur "Next".
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_61.png){: .align-center}

Sélectionnez **"Yes, export the private key"** et cliquez sur **"Next"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_62.png){: .align-center}

Cliquez sur **"Next"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_63.png){: .align-center}

Cochez la case **"Password:"**, entrez un **"Password:"** et confirmez-le, cliquez sur **"Next"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_64.png){: .align-center}

Cliquez sur le bouton **"Browse..."** et remplissez le champ, pour moi **"D:\Cert\OSD Cert.pfx"**. Cliquez sur **"Suivant"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_65.png){: .align-center}

Cliquez sur **"Finish"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_66.png){: .align-center}

Cliquez sur **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_67.png){: .align-center}


## 4 Modification de la configuration des Internet Information Services

Sur votre **serveur SCCM**, pour moi **"CORPWSCM1"**.
Ouvrez le **"Windows Start Menu"**, à droite, cliquez sur **"Windows Administrative Tools"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_68.png){: .align-center}

Ouvrez la console **"Internet Information Services (IIS) Manager"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_69.png){: .align-center}

Dans la console **"Internet Information Services (IIS) Manager"**, cliquez sur **"CORPWSCM1 (CORP\administrator)"**, cliquez sur **"Sites"**, cliquez à droite sur **"Default Web Site"** et sélectionnez **"Edit Bindings..."**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_70.png){: .align-center}

Sélectionnez la ligne **"https"** et cliquez sur **"Edit..."**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_71.png){: .align-center}

Cliquez sur **"Select..."** et sélectionnez sur **"SSL Certificate"** le certificat **"SCCM IIS Cert"** et cliquez sur **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_72.png){: .align-center}

Cliquez sur **"Close"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_73.png){: .align-center}

Ouvrez **"Internet Explorer"**, allez sur le site **"https://corpwscm1.corp.priv"**. Dans la partie droite, cliquez sur l'icône **"lock"**, vous pouvez voir que votre certificat racine est corpRootCA et que le certificat est pour le serveur **"corpwscm1.corp.priv"**. Après avoir fermé **"Internet Explorer"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_74.png){: .align-center}


### 4.1 Certificat pour WSUS

Sur votre **serveur WSUS**, pour moi, c'est le même que le serveur SCCM.
Ouvrez la console **"Internet Information Services (IIS) Manager"**, cliquez à droite sur **"WSUS Administration"** et sélectionnez **"Edit Bindings..."**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_75.png){: .align-center}

Sélectionnez la ligne **"https"** et cliquez sur **"Edit..."**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_76.png){: .align-center}

Cliquez sur **"Select..."** et sélectionnez sur **"SSL Certificate"** le certificat **"SCCM IIS Cert"** et cliquez sur **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_77.png){: .align-center}

Cliquez sur **"Close"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_78.png){: .align-center}


### 4.2 Modifier les paramètres SSL des services d'information sur Internet du WSUS

Dépensez **"WSUS Administration"**, sélectionnez **"ApiRemoting30"**, double-cliquez sur **"SSL Settings"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_79.png){: .align-center}

Cochez la case **"Require SSL"** et cliquez à droite sur **"Apply"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_80.png){: .align-center}

Sélectionnez **"ClientWebService"**, double-cliquez sur **"SSL Settings"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_81.png){: .align-center}

Cochez la case **"Require SSL"** et cliquez à droite sur **"Apply"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_82.png){: .align-center}

Sélectionnez **"DssAuthWebService"**, double-cliquez sur **"SSL Settings"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_83.png){: .align-center}

Cochez la case **"Require SSL"** et cliquez à droite sur **"Apply"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_84.png){: .align-center}

Sélectionnez **"ServerSyncWebService"**, double-cliquez sur **"SSL Settings"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_85.png){: .align-center}

Cochez la case **"Require SSL"** et cliquez à droite sur **"Apply"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_86.png){: .align-center}

Sélectionnez **"SimpleAuthWebService"**, double-cliquez sur **"SSL Settings"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_87.png){: .align-center}

Cochez la case **"Require SSL"** et cliquez à droite sur **"Apply"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_88.png){: .align-center}


## 5 Configurer WSUS pour l'utilisation de SSL

Ouvrez le **"Windows Start Menu"**, à gauche, développez **"Windows System"**, cliquez sur **"Command Prompt"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_89.png){: .align-center}

Dans le **"Command Prompt"**, utilisez la commande suivante :
{: .text-justify}
```powershell
C:\Users\administrator.CORP>cd C:\Program Files\Update Services\Tools
```
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_90.png){: .align-center}

Dans le **"Command Prompt"**, utilisez la commande suivante :
{: .text-justify}
```powershell
C:\Program Files\Update Services\Tools>WsusUtil.exe configuressl corpwscm1.corp.priv
```
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_91.png){: .align-center}


## 6 Exportez votre RootCA

Sur votre **Active Directory Certificate Service**, pour moi **"CORPWADS1"**.
Ouvrez le **"Windows Start Menu"**, dans la barre de recherche, cherchez la console **"CertSrv.msc"** et ouvrez-la.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_92.png){: .align-center}

Dans la barre de gauche, faites un clic droit sur **"corpRootCA"** et sélectionnez **"Properties"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_93.png){: .align-center}

Cliquez sur **"View Cartificate"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_94.png){: .align-center}

Cliquer sur l'onglet **"Details"** et cliquer sur **"Copy to File..."**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_95.png){: .align-center}

Cliquez sur **"Next"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_96.png){: .align-center}

Cliquez sur **"Next"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_97.png){: .align-center}

Cliquez sur **"Browse..."** et remplissez le champ **"File name:"** en indiquant le nom du fichier de votre certificat **C:\Users\Administrator\Documents\corpRootCA.cer** Cliquez sur **"Next"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_98.png){: .align-center}

Cliquez sur **"Finish"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_99.png){: .align-center}

Cliquez sur **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_100.png){: .align-center}

Copiez votre fichier **corpRootCA.cer** sur votre serveur SCCM.


## 7 Configurer SCCM pour utiliser la communication client HTTPS

Sur votre serveur SCCM, pour moi **"CORPWSCM1"**. Ouvrez la console **"Microsoft Endpoint Configuration Manager"**.
Ouvrez le **"Windows Start Menu"**, à droite, cliquez sur **"Windows Administrative Tools"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_101.png){: .align-center}

Cliquez sur l'onglet **"Communication Security"** et cliquez sur **"Set..."**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_102.png){: .align-center}

Cliquez sur **l'icône en forme soleil** et sélectionnez votre fichier **corpRootCA.cer**, cliquez sur **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_103.png){: .align-center}

Cochez **"HTTPS Only"** et cliquez sur **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_104.png){: .align-center}


### 7.1 Configurer le Distribution Point pour l'utilisation de SSL

Dans le panneau de gauche, sélectionnez **"Servers and Site System Roles"**, dans le panneau de droite, sélectionnez votre serveur **"\\\CORPWSCM1.corp.priv"**, cliquez sur **"Distribution point"** et cliquez sur **"Properties"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_105.png){: .align-center}

Cliquez sur l'onglet **"Communication"**, cochez la case **"Import certificate"**. Cliquez sur **"Browse..."** et sélectionnez le certificat OSD **D:\Cert\OSD Cert.pxf** dans le champ **"Certificate:"**, remplissez le champ **"Password:"** de votre mot de passe de certificat et cliquez sur **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_106.png){: .align-center}


### 7.2 Configurer le Management Point pour l'utilisation de SSL

Cliquez sur **"Distribution point"** et cliquez sur **"Properties"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_107.png){: .align-center}

Vérifiez si la case HTTPS est sélectionnée et cliquez sur **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_108.png){: .align-center}


### 7.3 Configurer le Software update Point pour l'utilisation de SSL

Cliquez sur **"Software update point"** et cliquez sur **"Properties"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_109.png){: .align-center}

Cochez la case **"Require SSL communication to the WSUS server"** et cliquez sur **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_110.png){: .align-center}


### 7.4 Vérifiez les logs

Ouvrez **"D:\Program Files\Microsoft Configuration Manager\Logs\sitecomp.log"**. Dans **sitecomp.log**, vous pouvez voir que le point de gestion a été initié pour se réinstaller avec les nouveaux paramètres.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_111.png){: .align-center}

Ouvrez **"D:\Program Files\Microsoft Configuration Manager\Logs\MPSetup.log"**. Dans **MPSetup.log**, vous pouvez voir que la communication est en mode SSL.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_112.png){: .align-center}

Ouvrez **"D:\Program Files\Microsoft Configuration Manager\Logs\mpcontrol.log"**. Dans **mpcontrol.log**, vous pouvez voir que la communication en HTTPS est OK.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_113.png){: .align-center}

Ouvrez **"D:\Program Files\Microsoft Configuration Manager\Logs\WCM.log"**. Dans le fichier **WCM.log**, vous pouvez voir le point de mise à jour du logiciel reconfiguré pour utiliser la communication en HTTPS.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_114.png){: .align-center}


## 8 Vérifier le certificat client et la communication SSL avec le SCCM

Sur votre client, pour moi **"WD01"**.
Ouvrez le **"Windows Start Menu"**, dans la barre de recherche, cherchez la console **"certlm.msc"** et ouvrez-la.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_115.png){: .align-center}

Dans la barre de gauche, développez **"Personal"**, cliquez sur **"Certificates"**.
Vous pouvez voir le certificat **"SCCM Client Certificate"** demandé par le client.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_116.png){: .align-center}

Ouvrez le **"Control Panel"**, et ouvrez le **"Configuration Manager Client agent"**.
Dans votre **"Client certificate:"**. Propriété, vous verrez pour le moment est **"Selft-signed"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_117.png){: .align-center}

Fermez le **"Configuration Manager Client agent"** et après quelques minutes, rouvrez-le.
Dans votre **"Client certificate:"**, vous verrez Property, vous verrez maintenant est **"PKI"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_118.png){: .align-center}

Ouvrez **"C:\Windows\CCM\Logs\ClientIDManagerStartup.log"**.<br/>
Dans **ClientIDManagerStartup.log**, vous pouvez voir que le certificat PKI du client est disponible.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_119.png){: .align-center}

Ouvrez **"C:\Windows\CCM\Logs\CcmMessaging.log"**.<br/>
Dans le fichier **CcmMessaging.log**, vous pouvez voir que la communication est réussie.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_120.png){: .align-center}

Et voilà ! Votre infrastructure SCCM utilise maintenant votre PKI pour communiquer.


## 9 Sources

- [PKI certificate requirements for Configuration Manager](https://docs.microsoft.com/en-us/mem/configmgr/core/plan-design/network/pki-certificate-requirements)
- [How can I configure System Center Configuration Manager in HTTPS mode (PKI) - Part 1](https://www.windows-noob.com/forums/topic/16300-how-can-i-configure-system-center-configuration-manager-in-https-mode-pki-part-1/)
- [How can I configure System Center Configuration Manager in HTTPS mode (PKI) - Part 2](https://www.windows-noob.com/forums/topic/16301-how-can-i-configure-system-center-configuration-manager-in-https-mode-pki-part-2/)
- [Deploy PKI Certificates for SCCM 2012 R2 Step by Step Guide](https://www.prajwaldesai.com/deploy-pki-certificates-for-sccm-2012-r2/)
- [Set up HTTPS client communication with SCCM](https://gmarculescu.com/?p=81)
- [Configuring SCCM 2012 for PKI and SSL: Setting up HTTPS communication](https://danikuci.wordpress.com/2014/03/26/configuring-sccm-for-managing-macs/)