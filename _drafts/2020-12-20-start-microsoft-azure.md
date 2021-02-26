---
layout: single
title:  "Let's start with Microsoft Azure"
#last_modified_at: 2020-12-07
header:
  teaser: "/assets/images/posts/2020-12-20-start-microsoft-azure/logo-azure-444x240.png"
  og_image: "/assets/images/posts/2020-12-20-start-microsoft-azure/logo-azure-444x240.png"
type: posts
classes: wide
comments: true
read_time: true
categories:
  - Azure
tags:
  - Azure
  - Windows
  - Microsoft
  - Security
  - Services
  - Powershell
toc: true
toc_label: "Table of Content"
toc_icon: "align-left"
---

![image-left](/assets/images/posts/2020-12-20-start-microsoft-azure/logo-azure-222x150.png){: .align-left}
**Azure Active Directory** (Azure AD) is Microsoft's cloud-based identity and access management service. It allows your employees to connect and access the following resources such as **Microsoft 365**, **Azure portal**, **SaaS applications**. In particular, it makes it possible to set up a single and simplified authentication for access to company resources, to set up **conditional access** and **multi-factor authentication (MFA)**.
{: .text-justify}


## 1 Get Started

![image-center](/assets/images/posts/2020-12-20-start-microsoft-azure/diagram-azure-logic-global.jpg){: .align-center}


## 2 Management Groups


## 3 Subscriptions


## 4 Resource Groups


Azure Active Directory is Microsoft's enterprise cloud-based **identity and access management (IAM)** solution. **Azure AD Domain Services** is a **PaaS** Offering provided by Microsoft Azure. It provides seamless access, easy collaboration and improved security and compliance.<br>
Azure Active Directory was originally designed as an add-on service to **Active Directory** on-premise. Its functionality has been gradually expanded to include services that support 
{: .text-justify}

- [https://portal.azure.com/](https://portal.azure.com/)
- [https://aad.portal.azure.com/](https://aad.portal.azure.com/)


Open a **Browser**, go to **[https://portal.azure.com/](https://portal.azure.com/)** and logon with your **"Global Administrator Account"**.<br>
In left, on the **"Portal Menu"** click on **"Azure Active Directory"**.
{: .text-justify}
![image-center](/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/2020-12-09-20_29_13-01.png){: .align-center}


**Table 2**

| Protocol | Ports     | Description                                                                          |
|:---------|:----------|:-------------------------------------------------------------------------------------|
| HTTP     | 80 (TCP)  | Used to download CRLs (Certificate Revocation Lists) to verify TLS/SSL certificates. |
| HTTPS    | 443 (TCP) | Used to synchronize with Azure AD.                                                   |

*Source : [https://docs.microsoft.com/en-us/azure/active-directory/hybrid/reference-connect-ports](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/reference-connect-ports)*


In **"Windows Powershell Console"** type the following command.
{: .text-justify}
```powershell
PS C:\Users\Administrator> Start-ADSyncSyncCycle -PolicyType Delta
```


<i class="fas fa-lightbulb"></i> **Advice** <br>
Microsoft recommends the activation of Multi-factor Authentication with a minimum of 2 factors for users, including high-privilege accounts or user with positions of responsibility, such as administrators, managers and chief executive officer.
{: .notice--success .text-justify}

<i class="fas fa-info-circle"></i> **Information** <br>
***Password writeback :** "Use this option to ensure that password changes that originate in Azure AD are written back to your on-premises directory. For more information, [see Getting started with password management](https://docs.microsoft.com/en-us/azure/active-directory/authentication/tutorial-enable-sspr)."*
{: .notice--info .text-justify}

<i class="fas fa-exclamation-triangle"></i> **Warning** <br>
***"Synchronize selected :"** this feature is intended to support only a pilot deployment. Don't use it in a full production deployment."*
{: .notice--warning .text-justify}



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