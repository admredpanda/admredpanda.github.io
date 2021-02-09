---
layout: single
title:  "How to synchronize Active Directory with Azure Active Directory"
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
toc: true
toc_label: "Table of Content"
toc_icon: "align-left"
---

![image-left](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/logo-azure-ad-222x150.png){: .align-left}
**Azure Active Directory** (Azure AD) is Microsoft's cloud-based identity and access management service. It allows your employees to connect and access the following resources such as **Microsoft 365**, **Azure portal**, **SaaS applications**. In particular, it makes it possible to set up a single and simplified authentication for access to company resources, to set up **conditional access** and **multi-factor authentication (MFA)**.
{: .text-justify}

## 1 Concept

### 1.1 Azure Active Directory
Azure Active Directory is Microsoft's enterprise cloud-based **identity and access management (IAM)** solution. **Azure AD Domain Services** is a **PaaS** Offering provided by Microsoft Azure. It provides seamless access, easy collaboration and improved security and compliance.<br>
Azure Active Directory was originally designed as an add-on service to **Active Directory** on-premise. Its functionality has been gradually expanded to include services that support **LDAP** and **LDAPS**, **Multi-Factor Authentication (MFA)**, and many others. <br>
Today companies use it to access Cloud technologies such as **Teams**, **Microsoft 365**, **OneDrive**. It complements an on-premise **Active Directory** and enables the extension of services through the Cloud.<br>
Here are the two portals providing access to the Azure AD service :
{: .text-justify}

- [https://portal.azure.com/](https://portal.azure.com/)
- [https://aad.portal.azure.com/](https://aad.portal.azure.com/)


#### 1.1.1 Authentication protocols

Azure Active Directory supports several of the most widely used authentication protocols. Here is an exhaustive list of the main ones :
{: .text-justify}
- [SAML (Security Assertion Markup Language)](https://en.wikipedia.org/wiki/Security_Assertion_Markup_Language)
- [OAuth](https://en.wikipedia.org/wiki/OAuth)
- [OpenID](https://en.wikipedia.org/wiki/OpenID)
- [WS-Federation](https://en.wikipedia.org/wiki/WS-Federation)

#### 1.1.2 Azure Active Directory Multi-Factor Authentication

**Multi-Factor authentication (MFA)** is a process in which a user is prompted during a login event to use additional forms of identification. When you require a second form of authentication, security is increased because this additional factor is not something that is easily obtained or duplicated by an attacker. Multi-factor authentication is based on two or three of the three authentication factors :
- **Something you know :** a password.
- **Something you have :** a phone number.
- **Something you are :** biometry.

<i class="fas fa-lightbulb"></i> **Advice** <br>
Microsoft recommends the activation of Multi-factor Authentication with a minimum of 2 factors for users, including high-privilege accounts or user with positions of responsibility, such as administrators, managers and chief executive officer.
{: .notice--success .text-justify}

#### 1.1.3 Licences

- **Azure Active Directory Free** : provides user and group management, local directory synchronization, basic reporting, self-service password changes for cloud users, and single sign-on on Azure, Microsoft 365 and many popular SaaS applications.
{: .text-justify}
- **Azure Active Directory Premium P1** : in addition to Free features, the P1 license gives your hybrid users access to local and cloud resources. It also supports advanced administrative features, including dynamic groups, self-service group management, Microsoft Identity Manager (a local identity and access management suite) and cloud write-back (to give your local users the benefit of self-service password resets).
{: .text-justify}
- **Azure Active Directory Premium P2** : in addition to the Free and P1 features, the P2 license offers Azure Active Directory Identity Protection to provide risk-based conditional access to your critical business applications and data. It also offers Privileged Identity Management to make it easy for administrators to discover, restrict, monitor and access resources and, if necessary, provide just-in-time access.
{: .text-justify}

*Source : [https://azure.microsoft.com/en-us/pricing/details/active-directory/](https://azure.microsoft.com/en-us/pricing/details/active-directory/)*


### 1.2 Difference between Active Directory and Azure Active Directory

| Azure Active Directory            | Active Directory Domain Services                  |
|:----------------------------------|:--------------------------------------------------|
| User and computer registration    | User and computer registration                    |
| Does not provide group policies   | Provides group policies                           |
| No trust relationships            | Can create trusts                                 |
| Application management            | Application and device management and deployment  |
| Single sign on                    | Kerberos and NTLM support                         |
|                                   | Schema management                                 |
|                                   | Hierrarchical directory service                   |


## 2 How Hybrid Identity works

### 2.1 Hybrid Identity Diagram

![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/diagram-ad-azure-ad-sync.jpg)

1. Every two minutes, the password hash synchronization agent on the AD Connect server requests stored password hashes with the [unicodePwd](https://docs.microsoft.com/en-us/openspecs/windows_protocols/ms-adts/6e803168-f140-4d23-b2d3-c3a8ab5917d2) attribute to the domain controller. This request uses the [MS-DRSR](https://docs.microsoft.com/en-us/compliance/regulatory/gdpr-manage-gdpr-data-subject-requests-with-the-dsr-case-tool) replication protocol.
2. Before sending, the domain controller encrypts the [MD4](https://en.wikipedia.org/wiki/MD4) password hash using a key that is an [MD5](https://en.wikipedia.org/wiki/MD5) hash of the RPC session key and a salt. It then sends the result to the password hash synchronization agent via RPC. The Domain Controller also passes the salt to the synchronization agent using the Domain Controller replication protocol, so that the agent can decrypt the envelope.
3 . Once the Password Hash Synchronization Agent has the encrypted envelope, it uses [MD5CryptoServiceProvider](https://docs.microsoft.com/en-us/dotnet/api/system.security.cryptography.md5cryptoserviceprovider?view=net-5.0) and the salt to generate a key to decrypt the received data in its original [MD4](https://en.wikipedia.org/wiki/MD4) format. The password hash synchronization agent never has access to the plain text password.  
4. The password hash synchronization agent extends the binary password hash from 16 bytes to 64 bytes by first converting the hash to a 32-byte hexadecimal string and then reconverting this string to binary format with [UTF-16](https://en.wikipedia.org/wiki/UTF-16) encoding.
5. The password hash synchronization agent adds for each user a 10-byte long salt to the 64-byte binary file to enhance the protection of the original hash.
6. The password hash synchronization agent then combines the [MD4](https://en.wikipedia.org/wiki/MD4) hash and the user salt and places it all into the [PBKDF2](https://en.wikipedia.org/wiki/PBKDF2) function. 1,000 iterations of the [HMAC-SHA256](https://en.wikipedia.org/wiki/HMAC) key hash algorithm are used.
7. The password hash synchronization agent takes the resulting 32-byte hash, concatenates the salt per user and the number of iterations [SHA256](https://en.wikipedia.org/wiki/SHA-2) (for use by Azure AD), and then transmits the string from Azure AD Connect to Azure AD via [TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security).
8. When a user attempts to log in to Azure AD and enters their password, the password is processed by the same MD4+salt+PBKDF2+HMAC-SHA256 process. If the resulting hash matches the hash stored in Azure AD, the user has entered the correct password and is authenticated.

*Source : [https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-password-hash-synchronization](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-password-hash-synchronization)*


### 2.2 Required Ports and Protocols

![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/diagram-ad-azure-ad-sync-required-ports-protocols.jpg)

**Table 1**

| Protocol             | Ports                  | Description |
|:---------------------|:-----------------------|:-----------------------|
| DNS | 53 (TCP/UDP) | DNS lookups on the destination forest. |
| Kerberos | 88 (TCP/UDP) | Kerberos authentication to the AD forest. |
| MS-RPC | 135 (TCP) | Used during the initial configuration of the Azure AD Connect wizard when it binds to the AD forest, and also during Password synchronization. |
| LDAP |389 (TCP/UDP) | Used for data import from AD. Data is encrypted with Kerberos Sign & Seal. |
| SMB | 445 (TCP) | Used by Seamless SSO to create a computer account in the AD forest. |
| LDAP/SSL | 636 (TCP/UDP) | Used for data import from AD. The data transfer is signed and encrypted. Only used if you are using TLS. |
| RPC | 49152- 65535 (Random high RPC Port)(TCP) | Used during the initial configuration of Azure AD Connect when it binds to the AD forests, and during Password synchronization. |
| WinRM | 5985 (TCP) | Only used if you are installing AD FS with gMSA by Azure AD Connect Wizard. | 
| AD DS Web Services | 9389 (TCP) | Only used if you are installing AD FS with gMSA by Azure AD Connect Wizard. |

**Table 2**

| Protocol | Ports     | Description                                                                          |
|:---------|:----------|:-------------------------------------------------------------------------------------|
| HTTP     | 80 (TCP)  | Used to download CRLs (Certificate Revocation Lists) to verify TLS/SSL certificates. |
| HTTPS    | 443 (TCP) | Used to synchronize with Azure AD.                                                   |

*Source : [https://docs.microsoft.com/en-us/azure/active-directory/hybrid/reference-connect-ports](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/reference-connect-ports)*


## 3 Preparation

### 3.1 How to add custom domain name to Azure Active Directory

Open a **Browser**, go to **[https://portal.azure.com/](https://portal.azure.com/)** and logon with your **"Global Administrator Account"**.<br>
In left, on the **"Portal Menu"** click on **"Azure Active Directory"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-01.png){: .align-center}

In the second bar click on **"Custom domain names"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-02.png){: .align-center}

Click on **"+ Add custom domain"**, fill in the field **"Custom domain name *"** your public domain, for me **"corporate.ovh"** and click on **"Add domain"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-03.png){: .align-center}

You will see a notification we say said **"Domain name added"**, after copy the content of fields **"Alias or hoste name"**, **"Destionation or point to address"** and **"TTL"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-04.png){: .align-center}

Go to your provider who register your domain name, for me it's [OVH](https://www.ovh.com/manager).<br>
Select your domain, for me **"corporate.ovh"**, select **"DNS zone"** and **"Add an entry"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-05.png){: .align-center}

Select **"TXT"** records type.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-06.png){: .align-center}

In the field **"Sub-domaine"** leave a blank. In the field **"TTL"** copy your value **"3600"**, in the field **"Value *"** copy your value **"MS=ms54677804"**. Click on **"Next"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-07.png){: .align-center}

Click on **"Confirm"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-08.png){: .align-center}

You will see the record has been added **"The entry has been added to the DNS zone."**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-09.png){: .align-center}

Go back to **Azure Portal** and click on **"Verify"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-10.png){: .align-center}

You will see a notification we say said **"Verifiy domain name"** successfully, click on **"Make primary"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-11.png){: .align-center}

Click on **"Yes"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-12.png){: .align-center}

You will see a notification we say said **"Domain name made primary"**, click on tenant, for me **"Contoso"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-13.png){: .align-center}

You will see your domain **corporate.ovh** is **Verified** and the **Primary**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-14.png){: .align-center}

### 3.2 Add UPN in Active Directory

In your Active Directory domain controller, for me **"CORPWADS1"**.<br>
Open **"Start Menu"**, expand **"Windows Administrative Tools"** folder, open **"Active Directory Domains and Trusts"** console.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-15.png){: .align-center}

On the left bar, click right on **Active Directory Domains and Trusts**, and select **"Properties"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-16.png){: .align-center}

On the field **"Alternative UPN suffices:"** fill in your domain name **"corporate.ovh"**, click on **"Add"** and click on **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-17.png){: .align-center}

Open **"Active Directory Users and Computers"** console.<br> 
Go to your users OU, for me **"corp.priv/CORP/Sites/Paris/Users"**, select all users, click right and select **"Properties"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-18.png){: .align-center}

Select **"Account"** tab. Check **"UPN suffix:"** box, select your UPN **"@corporate.ovh"**.<br> 
Click on **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-19.png){: .align-center}


## 4 Install and configuration d’Azure Active Directory Connect

### 4.1 Create service account in Active Directory for synchronisation

In your Active Directory domain controller, for me **"CORPWADS1"**.<br>
Open **"Start Menu"**, expand **"Windows Administrative Tools"** folder, open **"Active Directory Users and Computers"** console.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-24.png){: .align-center}

On the top bar, click on **"Action"**, select **"New >"** and click on **"User"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-25.png){: .align-center}

In field **"First name:"** fill in **"svc_az_sync_aad"**, in field **"User logon name:"** fill in **"svc_az_sync_aad"**. Click on **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-26.png){: .align-center}

In field **"Password:"** fill in with a strong password and repeat it in **"Cofirm password:"**. Check **"User cannot change password"** box and check **"Password never expires"**.<br> Click on **"Next >"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-27.png){: .align-center}

Click on **"Finish"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-28.png){: .align-center}


### 4.2 Install Azure Active Directory Connect

In your **Active Directory domain controller**, download **[Microsoft Azure Active Direcotry Connect](https://aka.gd/2FqW1up)**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-20.png){: .align-center}

Run **"AzureADConnect.msi"** and install it. After launch **"Azure AD Connect"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-21.png){: .align-center}

**Welcome :** check **"I agree to the licence terms and privacy notice."** and click on **"Continue"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-22.png){: .align-center}

**Required Components :** check the box **"Use an existing service Account"**, in **"SERVICE ACCOUNT NAME"** fill in prevously account **"corp\svc_az_sync_aad"**, in **"SERVICE ACCOUNT PASSWORD"** fill in the password account. Click on **"Install"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-29.png){: .align-center}

**User Sign-In :** select **"Password Hash Synchronization"** option and click on **"Next"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-30.png){: .align-center}

**Connect to Azure AD :** in **"USERNAME"** fill in a **Azure AD global administrator account**, in **"PASSWORD"** fill in the password account. Click on **"Next"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-31.png){: .align-center}

**Connect Directories :** in **"FOREST"** select your Active Directory Forest that you want to synchronize, for me **"corp.priv"**, and click on **"Add Directory"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-32.png){: .align-center}

**AD Forest account :** in **"ENTREPRISE ADMIN USERNAME"** fill in a Entreprise administrator account for me **"CORP\Administrator"**, in **"PASSWORD"** fill in the password account. <br> Click on **"OK"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-33.png){: .align-center}

**Connect Directories :** click on **"Next"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-34.png){: .align-center}

**Azure AD sign-in configuration :** you can see, your public domain **corporate.ovh** is **Verified**. Because my domain Active Directory **corp.priv** is not a public domain and cannot be added on Azure AD, I am forced to check the box **"Continue without matching all UPN suffixes to verified domains"**. Click on **"Next"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-35.png){: .align-center}

**Domain/OU Filtering :** select **"Sync selected domains and OUs"**, select OUs that contain users, groups or computers that you want to synchronize. For me this one :
- **corp.priv/CORP/Administrators**
- **corp.priv/CORP/Groups**
- **corp.priv/CORP/Sites/Paris/Computers**
- **corp.priv/CORP/Sites/Paris/Groups**
- **corp.priv/CORP/Sites/Paris/Users**

Click on **"Next"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-36.png){: .align-center}

**Identifying users :** click on **"Next"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-37.png){: .align-center}

**Filtering :** click on **"Next"**.
{: .text-justify}

<i class="fas fa-exclamation-triangle"></i> **Warning** <br>
***"Synchronize selected :"** this feature is intended to support only a pilot deployment. Don't use it in a full production deployment."*
{: .notice--warning .text-justify}

![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-38.png){: .align-center}

**Optional features :** click on **"Next"**.
{: .text-justify}

<i class="fas fa-info-circle"></i> **Information** <br>
***Password writeback :** "Use this option to ensure that password changes that originate in Azure AD are written back to your on-premises directory. For more information, [see Getting started with password management](https://docs.microsoft.com/en-us/azure/active-directory/authentication/tutorial-enable-sspr)."*
{: .notice--info .text-justify}

![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-39.png){: .align-center}

**Configure** : click on **"Install"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-40.png){: .align-center}

**Configure :** click on **"Exit"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-41.png){: .align-center}


### 4.3 Check install and synchronisation

#### 4.3.1 Check install

The following services as been created :
- **Microsoft Azure AD Connect Agent Updater :** Microsoft Azure AD Connect Agent Update Service.
- **Microsoft Azure AD Sync :** executing with **corp\svc_az_sync_aad**, enables integration and management of identity information across multiple directories, systems and platforms. If this service is stopped or disabled, no synchronization or password management for objects in connected data sources will be performed.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-42.png){: .align-center}

The following account **MSOL_067d2d0e6b9e** as been created for configured to synchronize to the tenant. This account must have directory replication permissions in the local Active Directory and write permission on certain attributes to enable Hybrid Deployment.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-43.png){: .align-center}

The following services as been created :
- **ADSyncAdmins** 
- **ADSyncBrowse**
- **ADSyncOperators**
- **ADSyncPasswordSet**
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-44.png){: .align-center}

The following account **Sync_CORPWADS1_067d2d0e6b9e@M365B856048.onmicrosoft.com** as been created. The account is created with a long and complex password that does not expire. It is given the role of Directory Synchronization Account.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-45.png){: .align-center}

#### 4.3.2 Check synchronisation

On the server on which **Azure AD Connect is installed** is installed, for me **"CORPWADS1"**.
Open **"Start Menu"**, on the right open **"Windows Powershell"** console.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-46.png){: .align-center}

In **"Windows Powershell Console"** type the following command.
{: .text-justify}
```powershell
PS C:\Users\Administrator> Get-ADSyncScheduler
```
After running the code above, the result would show you the following:
- **AllowedSyncCycleInterval :** the scheduled sync cycle interval.
- **SyncCycleEnabled :** whether the sync cycle schedule is enabled.
- **NextSyncCycleStartTimeInUTC :** when the next sync is scheduled.
- **NextSyncCyclePolicyType :** the type of sync that is scheduled to run next.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-47.png){: .align-center}

In **"Windows Powershell Console"** type the following command.
{: .text-justify}
```powershell
PS C:\Users\Administrator> Start-ADSyncSyncCycle -PolicyType Delta
```
After running the above command, wait for it to return the result, as shown in the image below.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-48.png){: .align-center}

Open **"Start Menu"**, on the right open **"Synchronization Service"** console.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-49.png){: .align-center}

In **"Synchronization Service Manager"**, you can see the last operation and its associated status.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-50.png){: .align-center}

Open a **Browser**, go to **[https://aad.portal.azure.com/](https://aad.portal.azure.com/)** and logon.<br>
In left, click on **"Users"**. On the **Users | All Users**, you can see your users synchronized with the status **"Yes"** in the column **"Directory synced"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-51.png){: .align-center}

In left, click on **"Sign-ins"**, you can see your last synchronization.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-52.png){: .align-center}

In left, click on **Azure Active Directory"**, click on **"Azure AD Connect"**, in right you can see your synchronization status.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-53.png){: .align-center}


There you go ! You now have synchronization between **Active Directory** and **Azure Active Directory**.
{: .text-justify}

**Sources :**
{: .text-justify}

- [Tutorial: Create and configure an Azure Active Directory Domain Services managed domain](https://docs.microsoft.com/en-us/azure/active-directory-domain-services/tutorial-create-instance)
- [Tutorial: Integrate a single forest with a single Azure AD tenant](https://docs.microsoft.com/en-us/azure/active-directory/cloud-provisioning/tutorial-single-forest)
- [Custom installation of Azure Active Directory Connect](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-install-custom)
- [Azure AD Connect: Accounts and permissions](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/reference-connect-accounts-permissions#adsync-service-account)
- [Implement password hash synchronization with Azure AD Connect sync](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-password-hash-synchronization)
- [Hybrid Identity Required Ports and Protocols](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/reference-connect-ports)
- [Azure AD Connect sync: Scheduler](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-sync-feature-scheduler)