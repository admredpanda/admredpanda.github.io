---
layout: single
title:  "How to install a domain controller Active Directory on Windows Server"
last_modified_at: 2020-12-07
header:
  teaser: "/assets/images/posts/2019-02-22-install-active-directory/logo-ad-444x240.png"
  og_image: "/assets/images/posts/2019-02-22-install-active-directory/logo-ad-444x240.png"
comments: true
read_time: true
type: posts
classes: wide
categories:
  - Active Directory
tags:
  - Windows
  - Windows Server
  - Microsoft
  - AD
  - Active Directory
  - AD DS
  - Active Directory Domain Services
  - DNS
  - Domain Name System
  - LDAP
  - Lightweight Directory Access Protocol
  - Server
  - Security
  - Authentication
  - Identification
  - User
  - Group
  - OU
  - Organizational Unit
  - SYSVOL
  - NetBIOS
  - Global Catalog
  - GC
  - Forest
  - Domain
  - Domain Controller
  - DC
  - Schema Master
  - Domain Naming Master
  - PDC Emulator
  - RID Master
  - Infrastructure Master
  - Sites
  - FSMO
  - Flexible Single Master Operation
---

<p  style="text-align: justify;"><img src="{{ site.baseurl }}/assets/images/posts/2019-02-22-install-active-directory/logo-ad-222x150.png" class="align-left"><strong>Active Directory is the LDAP directory for the Windows system</strong>, it contains <strong>Objets</strong> of differents types like user, computers, organization unit (OU), servers or printers. It allows you manage the essential functions of <strong>identification</strong> and <strong>authentication</strong>. It also allows the <strong>attribution</strong> and <strong>application of strategies</strong>. Active Directory relies on the <strong>DNS</strong> protocol, without it the AD can not function. The DNS role will be installed at the same time.</p>

<p style="text-align: justify;">I will starting with the basic knowledge of domain controller. In particular, the components that make up and surround it, as well as the <strong>FSMO</strong> (<i>Flexible Single Master Operation</i>) that compose it.</p>


### Components
<ul>
  <li style="text-align: justify;"><strong>Forests :</strong> designates the structure of one or more domains.</li>
  <img src="{{ site.baseurl }}/assets/images/posts/2019-02-22-install-active-directory/AD-forests.png" class="align-center">
  <li style="text-align: justify;"><strong>Domains :</strong> a domain spanning part of a forest, ex : paris.corp.priv, corp.priv.</li>
  <img src="{{ site.baseurl }}/assets/images/posts/2019-02-22-install-active-directory/AD-domains.png" class="align-center">
  <li style="text-align: justify;"><strong>Sites :</strong> allows to distinguish at the level of the network topology, ex : Paris - 192.168.4.0, Londre - 192.168.5.0.</li>
  <img src="{{ site.baseurl }}/assets/images/posts/2019-02-22-install-active-directory/AD-sites.png" class="align-center">
  <li style="text-align: justify;"><strong>Domain Controllers :</strong> role of the server that processes the requests of a domain, it will have to manage : the identification of the objects, the authentication, to take care of the application of the group strategies.</li>
  <img src="{{ site.baseurl }}/assets/images/posts/2019-02-22-install-active-directory/AD-domain-controllers.png" class="align-center">
  <li style="text-align: justify;"><strong>Organizational Units :</strong> containers for creating a hierarchy.</li>
  <img src="{{ site.baseurl }}/assets/images/posts/2019-02-22-install-active-directory/AD-organizational-units.png" class="align-center">
</ul>


### FSMO Roles
<ul>
  <li style="text-align: justify;"><strong>Schema Master :</strong> it manages the modification of the schema and the server and its replication. <strong>Unique in a forest.</strong></li>
  <li style="text-align: justify;"><strong>Domain Naming Master :</strong> it manages the addition and deletion of domain names in a forest. <strong>Unique in a forest.</strong></li>
  <li style="text-align: justify;"><strong>PDC Emulator :</strong> (<i>PDC Primary Domain Controller</i>) completed 5 functions. <strong>Unique in a forest.</strong>
    <ul>
      <li style="text-align: justify;">Changing domain group policies.</li>
      <li style="text-align: justify;">Synchronize clocks (date & time) on domain controllers.</li>
      <li style="text-align: justify;">Manage account lockout.</li>
      <li style="text-align: justify;">Manages the change of passwords.</li>
      <li style="text-align: justify;">Ensures compatibility with Windows NT domain controllers.</li>
    </ul>
  </li>
  <li style="text-align: justify;"><strong>RID Master :</strong> (<i>Relative IDentifier</i>) that allocates a relative identifier inside a domain (for a user, group, or other Active Directory managed object). It also manages the movement of an object from one domain to another, inside the forest. <strong>Unique in a forest.</strong></li>
  <li style="text-align: justify;"><strong>Infrastructure Master :</strong> maintains references between multiple objects, such as SID (<i>Security Identifiers</i>) and GUID (<i>Globally Unique Identifier</i>). <strong>Unique in a domain.</strong></li>
</ul>


## Pre-requisites
<p style="text-align: justify;">Now let's go to practice! Here are the Microsoft recommendations for the machine hosting a domain controller.</p>

| Hardware     | Specification |
|---------     | ----------- |
| **CPU :** | Minimum : 1.4 GHz 64-bit |
| **Memory :** | 2Go |
| **Hard disk :** | 32Go disk space |
| **Network :** | A network connection |

<p style="text-align: justify;">For this tutorial, I would use a virtual machine with <strong>Windows Server 2016 Standard</strong> with the following configuration :</p>

### Hardware

| Hardware     | Specification |
|---------     | ----------- |
| **CPU :** | 2 vCPU |
| **RAM :** | 4Go |
| **Disque dur :** | C:\System 50Go |
| **Réseau :** |Host-only |

### Network

| Champs     | Values |
|---------     | ----------- |
| **IP address :** | 192.168.100.100 |
| **Subnet :** | 255.255.255.0 |
| **Default gateway :** | 192.168.100.254 |
| **DNS :** | 192.168.100.254 |

## Server preparation
<p style="text-align: justify;">Open the <strong>"Server Manager"</strong>, the program launches at startup.</p>
<p style="text-align: justify;">Click on <strong>"Local Server"</strong> fill in the following settings.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-02-22-install-active-directory/2019-02-22-23_20_21-1.png" class="align-center">
<ul>
  <li><strong>Computer name :</strong> give a meaningful name to your server, for my part, I would take for example : <strong>CORPWADS1</strong>.</li>
  <li><strong>Windows Firewall :</strong> disable Windows Firewall.</li>
  <li><strong>Remote Desktop :</strong> enable remote desktop.</li>
  <li><strong>Ethernet0 :</strong> set a fixed IP address, I would take for example : <strong>192.168.10.1</strong></li>
</ul>
<p style="text-align: justify;">
<img src="{{ site.baseurl }}/assets/images/posts/2019-02-22-install-active-directory/2019-02-22-23_25_21-1.png" class="align-center">
</p>
<span class="notice--warning">It is recommended by Microsot to perform all updates before any roles are installed.</span>

## Installing Active Directory on Windows Server

<p style="text-align: justify;">Now you have to install the <strong>"ADDS"</strong>. Open the <strong>"Server Manager"</strong>, then click <strong>"Manage"</strong> and then <strong>"Add Roles and Features"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-02-22-install-active-directory/2019-02-23-17_57_21-1.png" class="align-center">

<p style="text-align: justify;"><strong>Before you begin :</strong> the page displays a small reminder of prerequisites before a role is installed. If you want this page to no longer appear, check the case <strong>"Skip this page by default"</strong> and click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-02-22-install-active-directory/2019-02-23-18_04_21-1.png" class="align-center">

<p style="text-align: justify;"><strong>Select installation type :</strong> we want to install the role on the server in question, leave the default choice and click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-02-22-install-active-directory/2019-02-23-18_13_21-1.png" class="align-center">

<p style="text-align: justify;"><strong>Select destination server :</strong> the default choice is automatically selects our server in the pool, click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-02-22-install-active-directory/2019-02-23-18_17_21-1.png" class="align-center">

<p style="text-align: justify;"><strong>Select server roles :</strong> in the list of roles, select <strong>"Active Directory Domain Services"</strong>. A window appears listing all the features, click on <strong>"Add Features"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-02-22-install-active-directory/2019-02-23-18_37_21-1.png" class="align-center">

<p style="text-align: justify;"><strong>Select server roles :</strong> the role has been selected, click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-02-22-install-active-directory/2019-02-23-18_40_21-1.png" class="align-center">

<p style="text-align: justify;"><strong>Select features :</strong> we don't need to select additional features, click <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-02-22-install-active-directory/2019-02-23-20_52_21-1.png" class="align-center">

<p style="text-align: justify;"><strong>Active Directory Domain Services :</strong> in this part it is possible to configure the link with azure Active Directory, click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-02-22-install-active-directory/2019-02-23-20_54_21-1.png" class="align-center">

<p style="text-align: justify;"><strong>Confirm installation selections :</strong> the wizard lists the roles and features that will be installed, click on <strong>"Install"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-02-22-install-active-directory/2019-02-23-20_59_21-1.png" class="align-center">

<p style="text-align: justify;"><strong>Installation progress :</strong> the installation is now finished. We will move to the configuration, click on <strong>"Close"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-02-22-install-active-directory/2019-02-23-21_03_21-1.png" class="align-center">


## Promote Domain Controller

<p style="text-align: justify;">Open the <strong>"Server Manager"</strong>, at the top right click on the small flag. Click on <strong>"Promote this server to a domain controller"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-02-22-install-active-directory/2019-02-23-21_07_21-1.png" class="align-center">

<p style="text-align: justify;"><strong>Deployment Configuration :</strong> given that we do not have a forest, select <strong>"Add a new forest"</strong>.<br/>Then the most important step to the domain name, here is the <a href="https://docs.microsoft.com/en-us/windows-server/identity/ad-ds/plan/assigning-domain-names
$">link</a>  to the Microsoft site that content the assignment rules. Typically, the domain name is the name of the company followed by .PRIV, for this example, I would use <strong>"CORP.PRIV"</strong>. Click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-02-22-install-active-directory/2019-02-23-21_14_21-1.png" class="align-center">

<p style="text-align: justify;"><strong>Domain Controller Options :</strong> now we have to adjust the functional level of the forest and the domain. For my part, I would leave the functional level of the forest and domain on <strong>"Windows Server 2016"</strong>, here is the <a href="https://docs.microsoft.com/en-us/windows-server/identity/ad-ds/active-directory-functional-levels">link</a> to the Microsoft site to understand what this entails.</p>
<p style="text-align: justify;">In the fields <strong>"Password:"</strong> and <strong>"Cofirm password:"</strong> with your password, it is advisable to fill in a different one from the one used for the administrator account. Keep it preciously it will serve you when restoring Active Directory.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-02-22-install-active-directory/2019-02-23-21_23_21-1.png" class="align-center">

<p style="text-align: justify;"><strong>DNS Options :</strong> the wizard asks us now if we want to create a DNS delegation, view that no DNS zone exists at the moment the icon is dimmed. Click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-02-22-install-active-directory/2019-02-23-21_29_21-1.png" class="align-center">

<p style="text-align: justify;"><strong>Additional Options :</strong> the <strong>"NetBIOS"</strong> name appears, it matches the domain name without the extension. Click on  <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-02-22-install-active-directory/2019-02-23-21_31_21-1.png" class="align-center">

<p style="text-align: justify;"><strong>Paths :</strong> leave the default folder. Click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-02-22-install-active-directory/2019-02-23-21_41_21-1.png" class="align-center">

<p style="text-align: justify;"><strong>Review Options :</strong> we are shown the summary of our configuration. You can click on <strong>"View script"</strong> button to export the Active Directory configuration script. Click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-02-22-install-active-directory/2019-02-23-21_47_21-1.png" class="align-center">

<p style="text-align: justify;"><strong>Prerequisites Check :</strong> the installation wizard has finished checking the prerequisites. Two errors appear, here is what they correspond to :</p>
<p style="text-align: justify;">
  <blockquote style="text-align: justify;">Domain controllers that run Windows Server 2008 or later have a default setting for "Allow cryptography algorithms compatible with Windows NT 4" that prevents weaker cryptography algorithms when establishing secure channel sessions. For more information about the potential impact and a workaround, see KB article <a href="https://support.microsoft.com/en-us/help/942564/the-net-logon-service-on-windows-server-2008-and-newer-domain-controll">942564</a>.</blockquote>
</p>

<p style="text-align: justify;">
  <blockquote style="text-align: justify;">DNS delegation could not be created or updated. For more information, see <a href="https://docs.microsoft.com/en-us/windows-server/identity/ad-ds/manage/ad-ds-simplified-administration#BKMK_ADDSInstallPrerequisiteTests">DNS Options</a>.</blockquote>
</p>

<p style="text-align: justify;">Its warnings do not interfere with the installation. Click on <strong>"Install"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-02-22-install-active-directory/2019-02-23-21_52_21-1.png" class="align-center">

<p style="text-align: justify;">Once the installation is finished, the server will restart automatically.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-02-22-install-active-directory/2019-02-23-21_54_21-1.png" class="align-center">

<p style="text-align: justify;">Once the restart has been completed, the domain <strong>"CORP"</strong> appears in front of the user login <strong>"Administrator"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-02-22-install-active-directory/2019-02-23-22_03_21-1.png" class="align-center">

<p style="text-align: justify;">There you go ! We now have an Active Directory domain. You can add new machines and users to your domain.</p>