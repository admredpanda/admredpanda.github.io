---
layout: single
title:  "Comment synchroniser Active Directory avec Azure Active Directory"
#last_modified_at: 2020-12-07
header:
  teaser: "/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/logo-azure-ad-444x240.png"
  og_image: "/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/logo-azure-ad-444x240.png"
type: posts
classes: wide
comments: true
read_time: true
categories:
  - Azure
tags:
  - Azure
  - Azure AD
  - Azure Active Directory
  - Azure AD DS
  - Azure AD Domain Services
  - Azure Active Directory Domain Services
  - AD
  - Active Directory
  - Windows
  - Windows Server
  - Microsoft
  - Security
  - Services
  - Server
  - MFA
  - Multi-Factor Authentication
  - IAM
  - Identity and Access Management
  - LDAP
  - Lightweight Directory Access Protocol
  - SAML
  - OAuth
  - OpenID
  - WS-Federation
  - Domain Controller
  - Azure AD Connect
  - unicodePwd
  - MS-DRSR
  - MD4
  - MD5
  - MD5CryptoServiceProvider
  - SHA256
  - TLS
  - UPN
  - User Principal Name
  - Identity
  - DNS
  - Domain
  - Powershell
---

![image-left](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/logo-azure-ad-222x150.png){: .align-left}
**Azure Active Directory** (Azure AD) est le service de gestion des identités et des accès de Microsoft basé sur le cloud. Il permet à vos employés de se connecter et d'accéder aux ressources suivantes telles que **Microsoft 365**, **Azure portal**, **SaaS applications**. Il permet notamment de mettre en place une authentification unique et simplifiée pour l'accès aux ressources de l'entreprise, de mettre en place un **conditional access** et le **multi-factor authentication (MFA)**.
{: .text-justify}

{% include toc icon="align-left" title="Table of Content" %}

## 1 Concept

### 1.1 Azure Active Directory
Azure Active Directory est la solution de **identity and access management (IAM)** de Microsoft basée sur le cloud. **Azure AD Domain Services** est une offre **PaaS** fournie par Microsoft Azure. Elle offre un accès transparent, une collaboration aisée et une sécurité et une conformité améliorées.
{: .text-justify}
Azure Active Directory a été conçu à l'origine comme un service complémentaire à **Active Directory** sur site. Sa fonctionnalité a été progressivement étendue pour inclure des services qui prennent en charge **LDAP** et **LDAPS**, **Multi-Factor Authentication (MFA)**, et bien d'autres.
{: .text-justify}
Aujourd'hui, les entreprises l'utilisent pour accéder aux technologies du Cloud telles que **Teams**, **Microsoft 365**, **OneDrive**. Il complète un **Active Directory** sur site et permet l'extension des services par le biais du Cloud.
{: .text-justify}
Voici les deux portails donnant accès au service Azure AD :
{: .text-justify}

- [https://portal.azure.com/](https://portal.azure.com/)
- [https://aad.portal.azure.com/](https://aad.portal.azure.com/)


#### 1.1.1 Authentication protocols

Azure Active Directory prend en charge plusieurs des protocoles d'authentification les plus répandus. Voici une liste exhaustive des principaux d'entre eux :
{: .text-justify}
- [SAML (Security Assertion Markup Language)](https://en.wikipedia.org/wiki/Security_Assertion_Markup_Language)
- [OAuth](https://en.wikipedia.org/wiki/OAuth)
- [OpenID](https://en.wikipedia.org/wiki/OpenID)
- [WS-Federation](https://en.wikipedia.org/wiki/WS-Federation)

#### 1.1.2 Azure Active Directory Multi-Factor Authentication

**Multi-Factor authentication (MFA)** est un processus dans lequel un utilisateur est invité, lors d'un événement de connexion, à utiliser des formes d'identification supplémentaires. Lorsque vous avez besoin d'une deuxième forme d'authentification, la sécurité est renforcée car ce facteur supplémentaire n'est pas quelque chose qui est facilement obtenu ou dupliqué par un attaquant. L'authentification à facteurs multiples est basée sur deux ou trois des trois facteurs d'authentification :
- **Quelque chose que vous savez :** un mot de passe.
- **Quelque chose que vous avez :** un numéro de téléphone.
- **Quelque chose que vous êtes :** biométrie.

<i class="fas fa-lightbulb"></i> **Conseil** <br>
Microsoft recommande l'activation de l'authentification multifactorielle avec un minimum de 2 facteurs pour les utilisateurs, y compris les comptes à haut privilège ou les utilisateurs ayant des postes à responsabilité, tels que les administrateurs, les gestionnaires et le directeur général.
{: .notice--success .text-justify}

#### 1.1.3 Licences

- **Azure Active Directory Free** : ce qui vous fournit la gestion des utilisateurs et des groupes, la synchronisation des annuaires locaux, des rapports de base, des changements de mot de passe en libre-service pour les utilisateurs du cloud, et une connexion unique sur Azure, Microsoft 365 et de nombreuses applications SaaS populaires.
{: .text-justify}
- **Azure Active Directory Premium P1** : en plus des fonctionnalités gratuites, la licence P1 donne à vos utilisateurs hybrides un accès aux ressources locales et cloud. Elle prend également en charge des fonctions administratives avancées, notamment les groupes dynamiques, la gestion de groupes en libre-service, Microsoft Identity Manager (une suite de gestion des identités et des accès locaux) et la reprise de données dans le nuage (pour permettre à vos utilisateurs locaux de bénéficier de la réinitialisation des mots de passe en libre-service).
{: .text-justify}
- **Azure Active Directory Premium P2** : en plus des fonctionnalités gratuites et P1, la licence P2 offre la protection d'identité Azure Active Directory pour fournir un accès conditionnel basé sur le risque à vos applications et données professionnelles critiques. Elle offre également une gestion privilégiée des identités pour permettre aux administrateurs de découvrir, de restreindre, de surveiller et d'accéder facilement aux ressources et, si nécessaire, de fournir un accès juste à temps.
{: .text-justify}

*Source : [https://azure.microsoft.com/en-us/pricing/details/active-directory/](https://azure.microsoft.com/en-us/pricing/details/active-directory/)*


### 1.2 Différence entre Active Directory et Azure Active Directory

| Azure Active Directory                                | Active Directory Domain Services                           |
|:------------------------------------------------------|:-----------------------------------------------------------|
| Enregistrement de l'utilisateur et de l'ordinateur    | Enregistrement de l'utilisateur et de l'ordinateur         |
| Ne fournit pas de group policies                      | Fournit des group policies                                 |
| Aucune relation de confiance                          | Peut créer des relation de confiance                       |
| Gestion des applications                              | Gestion et déploiement des applications et des appareils   |
| Single sign on                                        | Kerberos et support NTLM                                   |
|                                                       | Gestion des schémas                                        |
|                                                       | Service d'annuaire hiérarchique                            |


## 2 Comment fonctionne l'identité hybride

### 2.1 Diagramme d'identité hybride

![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/diagram-ad-azure-ad-sync.jpg)

1. Toutes les deux minutes, l'agent de synchronisation des hachages de mots de passe sur le serveur AD Connect demande les hachages de mots de passe stockés avec l'attribut [unicodePwd](https://docs.microsoft.com/en-us/openspecs/windows_protocols/ms-adts/6e803168-f140-4d23-b2d3-c3a8ab5917d2) au contrôleur de domaine. Cette requête utilise le protocole de réplication [MS-DRSR](https://docs.microsoft.com/en-us/compliance/regulatory/gdpr-manage-gdpr-data-subject-requests-with-the-dsr-case-tool).

2. Avant l'envoi, le contrôleur de domaine crypte le hachage du mot de passe [MD4](https://en.wikipedia.org/wiki/MD4) en utilisant une clé qui est un hachage [MD5](https://en.wikipedia.org/wiki/MD5) de la clé de session RPC et un sel. Il envoie ensuite le résultat à l'agent de synchronisation du hachage du mot de passe via RPC. Le contrôleur de domaine transmet également le sel à l'agent de synchronisation en utilisant le protocole de réplication du contrôleur de domaine, afin que l'agent puisse décrypter l'enveloppe. 3 . Une fois que l'agent de synchronisation du hachage de mot de passe a l'enveloppe cryptée, il utilise [MD5CryptoServiceProvider](https://docs.microsoft.com/en-us/dotnet/api/system.security.cryptography.md5cryptoserviceprovider?view=net-5.0) et le sel pour générer une clé permettant de décrypter les données reçues dans leur format [MD4](https://en.wikipedia.org/wiki/MD4) d'origine. L'agent de synchronisation du hachage du mot de passe n'a jamais accès au mot de passe en texte clair.

3. L'agent de synchronisation du hachage du mot de passe étend le hachage binaire du mot de passe de 16 à 64 octets en convertissant d'abord le hachage en une chaîne hexadécimale de 32 octets, puis en reconvertissant cette chaîne au format binaire avec un codage [UTF-16](https://en.wikipedia.org/wiki/UTF-16).

4. L'agent de synchronisation du hachage du mot de passe ajoute pour chaque utilisateur un sel de 10 octets de long au fichier binaire de 64 octets pour renforcer la protection du hachage original.

5. L'agent de synchronisation du hachage du mot de passe combine ensuite le hachage [MD4](https://en.wikipedia.org/wiki/MD4) et le sel utilisateur et place le tout dans la fonction [PBKDF2](https://en.wikipedia.org/wiki/PBKDF2). 1 000 itérations de l'algorithme de hachage de clés [HMAC-SHA256](https://en.wikipedia.org/wiki/HMAC) sont utilisées.

6. L'agent de synchronisation du hachage du mot de passe prend le hachage de 32 octets qui en résulte, concatène le sel par utilisateur et le nombre d'itérations [SHA256](https://en.wikipedia.org/wiki/SHA-2) (à utiliser par Azure AD), puis transmet la chaîne de Azure AD Connect à Azure AD via [TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security).

7. Lorsqu'un utilisateur tente de se connecter à Azure AD et saisit son mot de passe, celui-ci est traité par le même processus MD4+sel+PBKDF2+HMAC-SHA256. Si le hachage obtenu correspond au hachage stocké dans Azure AD, l'utilisateur a saisi le mot de passe correct et est authentifié.
{: .text-justify}

*Source : [https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-password-hash-synchronization](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-password-hash-synchronization)*


### 2.2 Ports et protocoles requis

![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/diagram-ad-azure-ad-sync-required-ports-protocols.jpg)

**Tableau 1**

| Protocole             | Ports                  | Description |
|:---------------------|:------------------------|:-----------------------|
| DNS | 53 (TCP/UDP)                             | Recherches DNS dans la forêt de destination. |
| Kerberos | 88 (TCP/UDP)                        | Authentification Kerberos auprès de la forêt AD. |
| MS-RPC | 135 (TCP)                             | Utilisé pendant la configuration initiale de l’Assistant Azure AD au moment d’établir une liaison avec la forêt AD, ainsi que pendant la synchronisation du mot de passe. |
| LDAP |389 (TCP/UDP)                            | Utilisé pour l’importation de données à partir d’AD. Les données sont chiffrées à l’aide de Kerberos Sign & Seal. |
| SMB | 445 (TCP)                                | Utilisé par l’authentification unique transparente pour créer un compte d’ordinateur dans la forêt AD. |
| LDAP/SSL | 636 (TCP/UDP)                       | Utilisé pour l’importation de données à partir d’AD. Le transfert de données est signé et chiffré. Utilisé uniquement si vous utilisez TLS. |
| RPC | 49152- 65535 (port RPC aléatoire élevé)(TCP) | Utilisé pendant la configuration initiale d’Azure AD Connect au moment d’établir une liaison avec les forêts AD, ainsi que pendant la synchronisation du mot de passe.  |
| WinRM | 5985 (TCP)                             | Utilisé uniquement si vous installez AD FS avec l’assistant de connexion gMSA par Azure AD Connect | 
| AD DS Web Services | 9389 (TCP)                | Utilisé uniquement si vous installez AD FS avec l’assistant de connexion gMSA par Azure AD Connect |

**Tableau 2**

| Protocol | Ports     | Description                                                                                                  |
|:---------|:----------|:-------------------------------------------------------------------------------------------------------------|
| HTTP     | 80 (TCP)  | Utilisé pour télécharger des listes de révocation de certificats en vue de vérifier les certificats TLS/SSL. |
| HTTPS    | 443 (TCP) | Utilisé pour établir une synchronisation avec Azure AD.                                                      |

*Source : [https://docs.microsoft.com/en-us/azure/active-directory/hybrid/reference-connect-ports](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/reference-connect-ports)*


## 3 Préparation

### 3.1 Comment ajouter un nom de domaine personnalisé à Azure Active Directory

Ouvrez un **navigateur**, allez sur **[https://portal.azure.com/](https://portal.azure.com/)** et connectez-vous avec votre **"Global Administrator Account"**.<br>
A gauche, dans le **"Portal Menu"** cliquez sur **"Azure Active Directory"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-01.png){: .align-center}

Dans la deuxième barre, cliquez sur **"Custom domain names"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-02.png){: .align-center}

Cliquez sur **"+ Add custom domain"**, remplissez le champ **"Custom domain name *"** de votre domaine public, pour moi **"corporate.ovh"** et cliquez sur **"Add domain"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-03.png){: .align-center}

Vous verrez une notification disant que **"Domain name added"**, après avoir copié le contenu des champs **"Alias or hoste name"**, **"Destionation or point to address"** et **"TTL"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-04.png){: .align-center}

Rendez-vous sur le site de votre registra qui enregistre votre nom de domaine, pour moi [OVH](https://www.ovh.com/manager).<br>
Select your domain, for me **"corporate.ovh"**, select **"DNS zone"** and **"Add an entry"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-05.png){: .align-center}

Sélectionnez le type d'enregistrement **"TXT"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-06.png){: .align-center}

Dans le champ **"Sub-domaine"** laissez un blanc. Dans le champ **"TTL"** copiez la valeur **"3600"**, dans le champ **"Value *"** copiez la valeur **"MS=ms54677804"**. Cliquez sur **"Next"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-07.png){: .align-center}

Cliquez sur **"Confirm"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-08.png){: .align-center}

Vous verrez que l'enregistrement a été ajouté **"The entry has been added to the DNS zone."**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-09.png){: .align-center}

Retournez au **Azure Portal** et cliquez sur **"Verify"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-10.png){: .align-center}

Vous verrez une notification disant que **"Verifiy domain name"** avec succès, cliquez sur **"Make primary"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-11.png){: .align-center}

Cliquez sur **"Yes"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-12.png)

Vous verrez une notification disant que **"Domain name made primary"**, cliquez sur locataire, pour moi **"Contoso"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-13.png){: .align-center}

Vous verrez que votre domaine **corporate.ovh** est **Verified** et le **Primary**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-14.png){: .align-center}


### 3.2 Ajouter un UPN dans Active Directory

Dans votre contrôleur de domaine Active Directory, pour moi **"CORPWADS1"**.<br>
Ouvrez le **"Start Menu"**, développez le dossier **"Windows Administrative Tools"**, ouvrez la console **"Active Directory Domains and Trusts"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-15.png){: .align-center}

Dans la barre de gauche, cliquez à droite sur **Active Directory Domains and Trusts**, et sélectionnez **"Properties"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-16.png){: .align-center}

Dans le champ **"Alternative UPN suffices:"** remplissez votre nom de domaine **"corporate.ovh"**, cliquez sur **"Add"** et cliquez sur **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-17.png){: .align-center}

Ouvrez la console **"Active Directory Users and Computers"**.<br> 
Rendez-vous dans votre OU utilisateurs, pour moi **"corp.priv/CORP/Sites/Paris/Users"**, sélectionnez tous les utilisateurs, cliquez sur le bouton droit et sélectionnez **"Properties"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-18.png){: .align-center}

Sélectionnez l'onglet **"Account"**. Cochez la case **"UPN suffix:"**, sélectionnez votre UPN **"@corporate.ovh"**. Cliquez sur **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-19.png){: .align-center}


## 4 Installation et configuration d’Azure Active Directory Connect

### 4.1 Créer un compte de service dans Active Directory pour la synchronisation

Dans votre contrôleur de domaine Active Directory, pour moi **"CORPWADS1"**.<br>
Ouvrez le **"Start Menu"**, développez le dossier **"Windows Administrative Tools"**, ouvrez la console **"Active Directory Users and Computers"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-24.png){: .align-center}

Dans la barre supérieure, cliquez sur **"Action"**, sélectionnez **"New >"** et cliquez sur **"User"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-25.png){: .align-center}

Dans le champ **"First name:"** remplissez **"svc_az_sync_aad"**, dans le champ **"User logon name:"** remplissez **"svc_az_sync_aad"**. Cliquez sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-26.png){: .align-center}

Dans le champ **"Password:"** emplissez avec un mot de passe fort et répétez le dans **"Cofirm password:"**. Cochez la case **"User cannot change password"** et cochez la case **"Password never expires"**. Cliquez sur **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-27.png){: .align-center}

Cliquez sur **"Finish"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-28.png){: .align-center}


### 4.2 Installer Azure Active Directory Connect

Sur un serveur dédié **Azure Active Directory Connect**, télécharger **[Microsoft Azure Active Direcotry Connect](https://aka.gd/2FqW1up)**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-20.png){: .align-center}

Lancez **"AzureADConnect.msi"** et installez-le. Après avoir lancé **"Azure AD Connect"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-21.png){: .align-center}

**Welcome :** cochez la case **"I agree to the licence terms and privacy notice."** et cliquez sur **"Continue"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-22.png){: .align-center}

**Required Components :** cocher la case **"Use an existing service Account"**, dans **"SERVICE ACCOUNT NAME"** remplir le compte précédent créé **"corp\svc_az_sync_aad"**, dans **"SERVICE ACCOUNT PASSWORD"** remplir le compte du mot de passe. Cliquez sur **"Install"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-29.png){: .align-center}

**User Sign-In :** sélectionnez l'option **"Password Hash Synchronization"** et cliquez sur **"Next"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-30.png){: .align-center}

**Connect to Azure AD :** dans **"USERNAME"** renseignez un compte administrateur global Azure AD, dans **Azure AD global administrator account**, dans **"PASSWORD"** renseignez le  mot de passe. Cliquez sur **"Next"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-31.png){: .align-center}

**Connect Directories :** dans **"FOREST"** sélectionnez votre Active Directory Forest que vous voulez synchroniser, pour moi **"corp.priv"**, et cliquez sur **"Add Directory"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-32.png){: .align-center}

**AD Forest account :** dans **"ENTREPRISE ADMIN USERNAME"** remplir un compte d'administrateur d'entreprise pour moi **"CORP\Administrator"**, dans **"PASSWORD"** remplir le mot de passe du compte. Cliquez sur **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-33.png){: .align-center}

**Connect Directories :** Cliquez sur **"Next"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-34.png){: .align-center}

**Azure AD sign-in configuration :** vous pouvez voir, votre domaine public **corporate.ovh** est **Verified**. Comme mon domaine Active Directory **corp.priv** n'est pas un domaine public et ne peut pas être ajouté sur Azure AD, je suis obligé de cocher la case **"Continue without matching all UPN suffixes to verified domains"**. Cliquez sur **"Next"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-35.png){: .align-center}

**Domain/OU Filtering :** sélectionnez **"Sync selected domains and OUs"**, sélectionnez les OU qui contiennent les utilisateurs, groupes ou ordinateurs que vous souhaitez synchroniser. Pour moi, celui-ci :
- **corp.priv/CORP/Administrators**
- **corp.priv/CORP/Groups**
- **corp.priv/CORP/Sites/Paris/Computers**
- **corp.priv/CORP/Sites/Paris/Groups**
- **corp.priv/CORP/Sites/Paris/Users**
{: .text-justify}
Cliquez sur **"Next"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-36.png){: .align-center}

**Identifying users :** cliquez sur **"Next"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-37.png){: .align-center}

**Filtering :** cliquez sur **"Next"**.
{: .text-justify}

<i class="fas fa-exclamation-triangle"></i> **Avertissement** <br>
***Synchronize selected :** "cette fonction est destinée à ne prendre en charge qu'un déploiement pilote. Ne l'utilisez pas dans un déploiement de production complet."*
{: .notice--warning .text-justify}

![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-38.png){: .align-center}

**Optional features :** cliquez sur **"Next"**.
{: .text-justify}

<i class="fas fa-info-circle"></i> **Information** <br>
***Password writeback :** "utilisez cette option pour vous assurer que les changements de mot de passe qui proviennent d'Azure AD sont inscrits dans votre répertoire sur place. Pour plus d'informations, [see Getting started with password management](https://docs.microsoft.com/en-us/azure/active-directory/authentication/tutorial-enable-sspr)."*
{: .notice--info .text-justify}

![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-39.png){: .align-center}

**Configure** : cliquez sur **"Install"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-40.png){: .align-center}

**Configure :** cliquez sur **"Exit"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-41.png){: .align-center}


### 4.3 Vérifier l'installation et la synchronisation

#### 4.3.1 Vérifier l'installation

Les services suivants ont été créés :
- **Microsoft Azure AD Connect Agent Updater :** service de mise à jour de Microsoft Azure AD Connect Agent.
- **Microsoft Azure AD Sync :** exécuté avec **corp\svc_az_sync_aad**, permet l'intégration et la gestion des informations d'identité à travers plusieurs répertoires, systèmes et plates-formes. Si ce service est arrêté ou désactivé, aucune synchronisation ou gestion de mot de passe pour les objets dans les sources de données connectées ne sera effectuée.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-42.png){: .align-center}

Le compte suivant **MSOL_067d2d0e6b9e** a été créé pour être configuré pour la synchronisation avec le locataire. Ce compte doit avoir des autorisations de réplication d'annuaire dans l'Active Directory local et des autorisations d'écriture sur certains attributs pour permettre le déploiement hybride
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-43.png){: .align-center}

Les groupes suivants ont été créés :
- **ADSyncAdmins** 
- **ADSyncBrowse**
- **ADSyncOperators**
- **ADSyncPasswordSet**
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-44.png){: .align-center}

Le compte suivant **Sync_CORPWADS1_067d2d0e6b9e@M365B856048.onmicrosoft.com** a été créé. Le compte est créé avec un mot de passe long et complexe qui n'expire pas. Il a le rôle de compte de synchronisation d'annuaire.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-45.png){: .align-center}


#### 4.3.2 Vérifier la synchronisation

Sur le serveur sur lequel est installé **Azure AD Connect is installed**, pour moi **"CORPWADS1"**.
Ouvrez le **"Start Menu"**, sur la droite ouvrez la console **"Windows Powershell"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-46.png){: .align-center}

Dans **"Windows Powershell Console"** tapez la commande suivante.
{: .text-justify}
```powershell
PS C:\Users\Administrator> Get-ADSyncScheduler
```
Après avoir exécuté le code ci-dessus, le résultat vous montrerait ce qui suit :
- **AllowedSyncCycleInterval :** cycle d'intervalle de synchronisation programmé.
- **SyncCycleEnabled :** si le cycle de synchronisation programmé est activé.
- **NextSyncCycleStartTimeInUTC :** quand la prochaine synchronisation est programmée.
- **NextSyncCyclePolicyType :** le type de synchronisation qui est programmé pour s'exécuter ensuite.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-47.png){: .align-center}

Dans **"Windows Powershell Console"** tapez la commande suivante.
{: .text-justify}
```powershell
PS C:\Users\Administrator> Start-ADSyncSyncCycle -PolicyType Delta
```
Après avoir exécuté la commande ci-dessus, attendez qu'elle renvoie le résultat, comme indiqué dans l'image ci-dessous.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-48.png){: .align-center}

Ouvrez le **"Start Menu"**, sur la droite ouvrez la console **"Synchronization Service"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-49.png){: .align-center}

Dans **"Synchronization Service Manager"**, vous pouvez voir la dernière opération et son statut associé.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-50.png){: .align-center}

Ouvrez un **navigateur**, allez sur **[https://aad.portal.azure.com/](https://aad.portal.azure.com/)** et connectez-vous.<br>
À gauche, cliquez sur **"Users"**. Sur la page **Users | All Users**, vous pouvez voir vos utilisateurs synchronisés avec le statut **"Yes"** dans la colonne **"Directory synced"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-51.png){: .align-center}

A gauche, cliquez sur **"Sign-ins"**, vous pouvez voir votre dernière synchronisation.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-52.png){: .align-center}

A gauche, cliquez sur **Azure Active Directory"**, cliquez sur **"Azure AD Connect"**, à droite vous pouvez voir votre statut de synchronisation.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-53.png){: .align-center}


Et voilà ! Vous avez maintenant une synchronisation entre **Active Directory** et **Azure Active Directory**.
{: .text-justify}


## 5 Sources

- [Tutorial: Create and configure an Azure Active Directory Domain Services managed domain](https://docs.microsoft.com/en-us/azure/active-directory-domain-services/tutorial-create-instance)
- [Tutorial: Integrate a single forest with a single Azure AD tenant](https://docs.microsoft.com/en-us/azure/active-directory/cloud-provisioning/tutorial-single-forest)
- [Custom installation of Azure Active Directory Connect](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-install-custom)
- [Azure AD Connect: Accounts and permissions](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/reference-connect-accounts-permissions#adsync-service-account)
- [Implement password hash synchronization with Azure AD Connect sync](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-password-hash-synchronization)
- [Hybrid Identity Required Ports and Protocols](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/reference-connect-ports)
- [Azure AD Connect sync: Scheduler](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-sync-feature-scheduler)