---
layout: single
title:  "How to to configure HTTPS communication mode in System Center Configuration Manager"
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
toc: true
toc_label: "Table of Content"
toc_icon: "align-left"
toc_sticky: true
---

<p style="text-align: justify;"><img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/logo-sccm-222x150.png" class="align-left">In SCCM natively, communications between clients and servers, and between servers is not secure. <strong>System Center Configuration Manager</strong> allows to rely on a <strong>Public Key Infrastructure (PKI)</strong> to secure an enterprise <strong>Certification Authority (CA)</strong>. This mechanism may be required for security reasons in the implementation of a <strong>Cloud Management Gateway (CMG)</strong>, <strong>Internet Based Client Management (IBCM)</strong>, <strong>BitLocker management</strong>, communication with <strong>MacOS clients</strong>. In this article we configure the client-side HTTPS connection to the <strong>Management Point</strong>, <strong>Distribution Point</strong> and <strong>Software Update Point</strong>.</p>

## 1 Create Active Directory Security Group

### 1.1 Group for SCCM Internet Information Services Servers

<p style="text-align: justify;">In your <strong>Active Directory domain controller</strong>, for me <strong>"CORPWADS1"</strong>.
<br> Open <strong>"Active Directory Users and Computers"</strong> console, in your OU when contain your groups, click on <strong>"Action</strong> on the top, and select <strong>"New"</strong> and click on <strong>"Group"</strong>.</p>

<p style="text-align: justify;">In <strong>"Group name:"</strong> field indicate the following name <strong>"GRP_SCCM_IIS_Servers"</strong> and in <strong>"Group name (pre-Windows 2000):"</strong> field indicate the following name <strong>"GRP_SCCM_IIS_Servers"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_00.png" class="align-center">

<p style="text-align: justify;">Double click on the group <strong>"GRP_SCCM_IIS_Servers"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_01.png" class="align-center">

<p style="text-align: justify;">Select <strong>"Members"</strong> tab on the top, in the bottom click on <strong>"Add..."</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_02.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"Object Types..."</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_03.png" class="align-center">

<p style="text-align: justify;">Select <strong>"Computers"</strong> box and click on <strong>"OK"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_04.png" class="align-center">

<p style="text-align: justify;">In <strong>"Enter the object names to select (examples):"</strong> field indicate the name of your SCCM Server <strong>"CORPWSCM1"</strong> and click on <strong>"Check Names"</strong> button. Click on <strong>"OK"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_05.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"OK"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_06.png" class="align-center">


### 1.2 Group for SCCM Distribution Point Server

<p style="text-align: justify;">In <strong>"Active Directory Users and Computers"</strong> console, in your OU when contain your groups, click on <strong>"Action</strong> on the top, and select <strong>"New"</strong> and click on <strong>"Group"</strong>.</p>

<p style="text-align: justify;">In <strong>"Group name:"</strong> field indicate the following name <strong>"GRP_SCCM_DP_Servers"</strong> and in <strong>"Group name (pre-Windows 2000):"</strong> field indicate the following name <strong>"GRP_SCCM_DP_Servers"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_07.png" class="align-center">

<p style="text-align: justify;">Double click on the group <strong>"GRP_SCCM_DP_Servers"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_08.png" class="align-center">

<p style="text-align: justify;">Select <strong>"Members"</strong> tab on the top, in the bottom click on <strong>"Add..."</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_09.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"Object Types..."</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_10.png" class="align-center">

<p style="text-align: justify;">Select <strong>"Computers"</strong> box and click on <strong>"OK"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_11.png" class="align-center">

<p style="text-align: justify;">In <strong>"Enter the object names to select (examples):"</strong> field indicate the name of your SCCM Server <strong>"CORPWSCM1"</strong> and click on <strong>"Check Names"</strong> button. Click on <strong>"OK"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_12.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"OK"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_13.png" class="align-center">

<p style="text-align: justify;">After, reboot the <strong>CORPWSCM1</strong> server, for the change to take effect.</p>


## 2 Create certificate templates on the certification authority

<p style="text-align: justify;">In your <strong>Active Directory Certificate Service</strong>, for me <strong>"CORPWADS1"</strong>.
<br> Open <strong>"Windows Start Menu"</strong>, in the search bar search <strong>"CertSrv.msc"</strong> console and open it.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_14.png" class="align-center">

<p style="text-align: justify;">In the left bar, expand <strong>"corpRootCA"</strong>, right click on <strong>"Certificate Templates"</strong> and click on <strong>"Manage"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_15.png" class="align-center">


### 2.1 Internet Information Services Certificate

<p style="text-align: justify;">In <strong>Certificate Templates Console</strong>, at the bottom, right click on <strong>"Web Server"</strong> and select <strong>"Duplicate Template"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_16.png" class="align-center">

<p style="text-align: justify;">Select <strong>"General"</strong> tab.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_17.png" class="align-center">

<p style="text-align: justify;">In <strong>"Template display name:"</strong> field indicate the following name <strong>"SCCM IIS Certificate"</strong> and in <strong>"Template name:"</strong> field indicate the following name <strong>"SCCMIISCertificate"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_18.png" class="align-center">

<p style="text-align: justify;">Select <strong>"Request Handling"</strong> tab, verify that <strong>"Allow private key to be exported"</strong> is not selected.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_19.png" class="align-center">

<p style="text-align: justify;">Select <strong>"Subject Name"</strong> tab, verify that <strong>"Supply in the Request"</strong> is selected.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_20.png" class="align-center">

<p style="text-align: justify;">Select <strong>"Security"</strong> tab, click on <strong>"Add..."</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_21.png" class="align-center">

<p style="text-align: justify;">In <strong>"Enter the object names to select (examples):"</strong> field indicate the following name of your group <strong>"GRP_SCCM_IIS_Servers"</strong> and click on <strong>"Check Names"</strong>. Click on <strong>"OK"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_22.png" class="align-center">

<p style="text-align: justify;">For the group <strong>"GRP_SCCM_IIS_Servers"</strong> check the <strong>"Read"</strong> and <strong>"Enroll"</strong> box. Click on <strong>"OK"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_23.png" class="align-center">


### 2.2 Distribution Point Certificate

<p style="text-align: justify;">In <strong>Certificate Templates Console</strong>, at the bottom, right click on <strong>"Workstation Authentification"</strong> and select <strong>"Duplicate Template"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_24.png" class="align-center">

<p style="text-align: justify;">Select <strong>"General"</strong> tab.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_25.png" class="align-center">

<p style="text-align: justify;">In <strong>"Template display name:"</strong> field indicate the following name <strong>"SCCM DP Certificate"</strong> and in <strong>"Template name:"</strong> field indicate the following name <strong>"SCCMDPCertificate"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_26.png" class="align-center">

<p style="text-align: justify;">Select <strong>"Request Handling"</strong> tab, checl the box <strong>"Allow private key to be exported"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_27.png" class="align-center">

<p style="text-align: justify;">Select <strong>"Security"</strong> tab, click on <strong>"Add..."</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_28.png" class="align-center">

<p style="text-align: justify;">In <strong>"Enter the object names to select (examples):"</strong> field indicate the following name of your group <strong>"GRP_SCCM_DP_Servers"</strong> and click on <strong>"Check Names"</strong>. Click on <strong>"OK"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_29.png" class="align-center">

<p style="text-align: justify;">For the group <strong>"GRP_SCCM_DP_Servers"</strong> check the <strong>"Read"</strong> and <strong>"Enroll"</strong> box.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_30.png" class="align-center">

<p style="text-align: justify;">Select the group <strong>"Entreprise Admins (CORP\Entreprise Admins)"</strong> and click to <strong>"Remove"</strong> button. Click on <strong>"OK"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_31.png" class="align-center">


### 2.3 Client Certificate

<p style="text-align: justify;">In <strong>Certificate Templates Console</strong>, at the bottom, right click on <strong>"Workstation Authentification"</strong> and select <strong>"Duplicate Template"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_32.png" class="align-center">

<p style="text-align: justify;">Select <strong>"General"</strong> tab.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_33.png" class="align-center">

<p style="text-align: justify;">In <strong>"Template display name:"</strong> field indicate the following name <strong>"SCCM Client Certificate"</strong> and in <strong>"Template name:"</strong> field indicate the following name <strong>"SCCMClientCertificate"</strong>, in <strong>"Validity period:"</strong> field indicate <strong>"3"</strong> years.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_34.png" class="align-center">

<p style="text-align: justify;">Select <strong>"Subject Name"</strong> tab, checl the box <strong>"Build from this Active Directory information"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_35.png" class="align-center">

<p style="text-align: justify;">Select <strong>"Request Handling"</strong> tab, verify that <strong>"Allow private key to be exported"</strong> is not selected.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_36.png" class="align-center">

<p style="text-align: justify;">Select <strong>"Security"</strong> tab, for the group <strong>"Domain Computers (CORP\Domain Computers)"</strong>, check the <strong>"Read"</strong>, <strong>"Enroll"</strong> and <strong>"Autoenroll"</strong> box. Click on <strong>"OK"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_37.png" class="align-center">

<p style="text-align: justify;">The three SCCM templates are now shown below, close the <strong>Certificate Templates Console</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_38.png" class="align-center">


## 3 Deploy certificates

### 3.1 Publishing Certificates Templates

<p style="text-align: justify;">Back on <strong>"certsrv"</strong> console, in the left bar, right click on <strong>"Certificate Templates"</strong> and click on <strong>"New"</strong> and on <strong>"Certificate Template to Issue"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_39.png" class="align-center">

<p style="text-align: justify;">Select your three Certificate Templates, <strong>"SCCM Client Certificate"</strong>, <strong>"SCCM DP Certificate"</strong>, <strong>"SCCM IIS Certificate"</strong> and click on <strong>"OK"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_40.png" class="align-center">


### 3.2 Create GPO autoenroll for computers

<p style="text-align: justify;">In your <strong>Active Directory domain controller</strong>, for me <strong>"CORPWADS1"</strong>.
<br> Open <strong>"Group Policy Management"</strong> console, expand <strong>"Forest: corp.priv"</strong>, <strong>"Domains"</strong>, click right on <strong>"corp.priv"</strong> and select <strong>"Create a GPO in this domain, and Link it here..."</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_41.png" class="align-center">

<p style="text-align: justify;">In <strong>"Name:"</strong> field indicate the following name <strong>"C-Cert_Auto_Enrollment"</strong> and click on <strong>"OK"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_42.png" class="align-center">

<p style="text-align: justify;">Click right on your GPO <strong>"C-Cert_Auto_Enrollment"</strong> and click on <strong>"Edit..."</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_43.png" class="align-center">

<p style="text-align: justify;">On <strong>"Group Policy Management Editor"</strong> console, in the left bar, expand <strong>"Computer Configuration"</strong>, <strong>"Policies"</strong>, <strong>"Windows Settings"</strong>, <strong>"Security Settings"</strong>, <strong>"Public Key Policies"</strong> and on the right bar double click on <strong>"Caertificate Services Client - Auto-Enrollment"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_44.png" class="align-center">

<p style="text-align: justify;">On the <strong>"Configuration Model:"</strong> select <strong>"Enabled"</strong> and click on <strong>"OK"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_45.png" class="align-center">


### 3.3 Request client certificate in your SCCM Server

<p style="text-align: justify;">In your <strong>SCCM Server</strong>, for me <strong>"CORPWSCM1"</strong>.
<br> Open <strong>"Windows Start Menu"</strong>, open <strong>"Command Prompt"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_46.png" class="align-center">

<p style="text-align: justify;">In <strong>Command Prompt</strong>, type the command <strong>"certlm.msc"</strong> and type <strong>"Enter"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_47.png" class="align-center">

<p style="text-align: justify;">In <strong>certlm</strong> console, in the left bar, expand <strong>"Personal"</strong> and double click on <strong>"Certificates"</strong>. <br>You can see the certificates published by default for the servers.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_48.png" class="align-center">

<p style="text-align: justify;">Switch in <strong>Command Prompt</strong>, type the command <strong>"gpupdate /force"</strong> and type <strong>"Enter"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_49.png" class="align-center">

<p style="text-align: justify;">Return to <strong>certlm</strong> console, refresh the view, you can see the <strong>"SCCM Client Certificate"</strong> template have generate the client certificat authentification certificate.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_50.png" class="align-center">


### 3.4 Request New certificates in SCCM Server

<p style="text-align: justify;">In <strong>certlm</strong> console, in the left bar, click on <strong>"Certificates"</strong>, click on <strong>"All Tasks"</strong> , click on <strong>"Request New Certificate..."</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_51.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"Next"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_52.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"Next"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_53.png" class="align-center">

<p style="text-align: justify;">Check <strong>"SCCM DP Certificate"</strong> and <strong>"SCCM IIS Certificate"</strong> box. And click on <strong>"More information is required to enroll for this certificate. Click here to configure settings"</strong> link.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_54.png" class="align-center">

<p style="text-align: justify;">In <strong>"Alternative name:"</strong>, in <strong>"Type:"</strong> select <strong>"DNS"</strong>, in <strong>"Value:"</strong> fill in the DNS name of your server and click on <strong>"Add >"</strong>. Repeat the operation with the FQDN name of your server.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_55.png" class="align-center">

<p style="text-align: justify;">Select <strong>"General"</strong> tab. In <strong>"Friendly name:"</strong> fill in the following name <strong>"SCCM IIS Cert"</strong>. 
<br>Click on <strong>"OK"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_56.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"Enroll"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_57.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"Finish"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_58.png" class="align-center">

<p style="text-align: justify;">You can see the <strong>"SCCM DP Certificate"</strong> adn <strong>"SCCM IIS Certificate"</strong> templates have generated.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_59.png" class="align-center">


### 3.5 Export Distribution Point Certificate

<p style="text-align: justify;">Click right on your <strong>"SCCM DP Certificate"</strong>, select <strong>"All Tasks"</strong> and click to <strong>"Export..."</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_60.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"Next"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_61.png" class="align-center">

<p style="text-align: justify;">Select <strong>"Yes, export the private key"</strong> and click on <strong>"Next"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_62.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"Next"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_63.png" class="align-center">

<p style="text-align: justify;">Check the <strong>"Password:"</strong> box, enter a <strong>"Password"</strong> and confirm it, click on <strong>"Next"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_64.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"Browse..."</strong> button and fill in the field, for me <strong>"D:\Cert\OSD Cert.pfx"</strong>. Click on <strong>"Next"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_65.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"Finish"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_66.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"OK"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_67.png" class="align-center">


## 4 Changing the Internet Information Services configuration

<p style="text-align: justify;">In your <strong>SCCM Server</strong>, for me <strong>"CORPWSCM1"</strong>.<br>
Open <strong>"Windows Start Menu"</strong>, on the right, click on <strong>"Windows Administrative Tools"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_68.png" class="align-center">

<p style="text-align: justify;">Open the <strong>"Internet Information Services (IIS) Manager"</strong> console.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_69.png" class="align-center">

<p style="text-align: justify;">On <strong>"Internet Information Services (IIS) Manager"</strong> console, click on <strong>"CORPWSCM1 (CORP\administrator)"</strong>, click on <strong>"Sites"</strong>, click right on <strong>"Default Web Site"</strong> and select <strong>"Edit Bindings..."</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_70.png" class="align-center">

<p style="text-align: justify;">Select <strong>"https"</strong> line and click on <strong>"Edit..."</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_71.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"Select..."</strong> and select on <strong>"SSL Certificate"</strong> the <strong>"SCCM IIS Cert"</strong> certificate and click on <strong>"OK"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_72.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"Close"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_73.png" class="align-center">

<p style="text-align: justify;">Open <strong>"Internet Explorer"</strong>, go to the <strong>"https://corpwscm1.corp.priv"</strong> site. In the right, click on <strong>"lock icon"</strong>, you can see, your root certificate is <strong>corpRootCA</strong> and the certificate is for server <strong>"corpwscm1.corp.priv"</strong>. After close <strong>"Internet Explorer"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_74.png" class="align-center">


### 4.1 Certificate for WSUS

<p style="text-align: justify;">In your <strong>WSUS Server</strong>, for me, it is the same as the SCCM server. <br>Open <strong>"Internet Information Services (IIS) Manager"</strong> console, click right on <strong>"WSUS Administration"</strong> and select <strong>"Edit Bindings..."</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_75.png" class="align-center">

<p style="text-align: justify;">Select <strong>"https"</strong> line and click on <strong>"Edit..."</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_76.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"Select..."</strong> and select on <strong>"SSL Certificate"</strong> the <strong>"SCCM IIS Cert"</strong> certificate and click on <strong>"OK"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_77.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"Close"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_78.png" class="align-center">


### 4.2 Modify WSUS Internet Information Services SSL Settings

<p style="text-align: justify;">Expend <strong>"WSUS Administration"</strong>, select <strong>"ApiRemoting30"</strong>, double click on <strong>"SSL Settings"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_79.png" class="align-center">

<p style="text-align: justify;">Check <strong>"Require SSL"</strong> box and on right, click on <strong>"Apply"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_80.png" class="align-center">

<p style="text-align: justify;">Select <strong>"ClientWebService"</strong>, double click on <strong>"SSL Settings"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_81.png" class="align-center">

<p style="text-align: justify;">Check <strong>"Require SSL"</strong> box and on right, click on <strong>"Apply"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_82.png" class="align-center">

<p style="text-align: justify;">Select <strong>"DssAuthWebService"</strong>, double click on <strong>"SSL Settings"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_83.png" class="align-center">

<p style="text-align: justify;">Check <strong>"Require SSL"</strong> box and on right, click on <strong>"Apply"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_84.png" class="align-center">

<p style="text-align: justify;">Select <strong>"ServerSyncWebService"</strong>, double click on <strong>"SSL Settings"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_85.png" class="align-center">

<p style="text-align: justify;">Check <strong>"Require SSL"</strong> box and on right, click on <strong>"Apply"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_86.png" class="align-center">

<p style="text-align: justify;">Select <strong>"SimpleAuthWebService"</strong>, double click on <strong>"SSL Settings"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_87.png" class="align-center">

<p style="text-align: justify;">Check <strong>"Require SSL"</strong> box and on right, click on <strong>"Apply"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_88.png" class="align-center">


## 5 Configure WSUS for use SSL

<p style="text-align: justify;">Open <strong>"Windows Start Menu"</strong>, on the left, expand <strong>"Windows System"</strong>, click on <strong>"Command Prompt"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_89.png" class="align-center">

<p style="text-align: justify;">On <strong>"Command Prompt"</strong>, use the following command :</p>
```powershell
C:\Users\administrator.CORP>cd C:\Program Files\Update Services\Tools
```
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_90.png" class="align-center">

<p style="text-align: justify;">On <strong>"Command Prompt"</strong>, use the following command :</p>
```powershell
C:\Program Files\Update Services\Tools>WsusUtil.exe configuressl corpwscm1.corp.priv
```
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_91.png" class="align-center">


## 6 Export your RootCA

<p style="text-align: justify;">In your <strong>Active Directory Certificate Service</strong>, for me <strong>"CORPWADS1"</strong>.
<br> Open <strong>"Windows Start Menu"</strong>, in the search bar search <strong>"CertSrv.msc"</strong> console and open it.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_92.png" class="align-center">

<p style="text-align: justify;">In the left bar, right click on <strong>"corpRootCA"</strong> and select <strong>"Properties"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_93.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"View Cartificate"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_94.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"Details"</strong> tab and click on <strong>"Copy to File..."</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_95.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"Next"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_96.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"Next"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_97.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"Browse..."</strong> and fill in the <strong>"File name:"</strong> field your certificate file name <strong>C:\Users\Administrator\Documents\corpRootCA.cer</strong>. Click on <strong>"Next"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_98.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"Finish"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_99.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"OK"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_100.png" class="align-center">

<p style="text-align: justify;">Copy your <strong>corpRootCA.cer</strong> in your SCCM Server.</p>


## 7 Configure SCCM to use HTTPS client communication

<p style="text-align: justify;">In your <strong>SCCM Server</strong>, for me <strong>"CORPWSCM1"</strong>. Open <strong>"Microsoft Endpoint Configuration Manager"</strong> console .<br>
Open <strong>"Windows Start Menu"</strong>, on the right, click on <strong>"Windows Administrative Tools"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_101.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"Communication Security"</strong> tab and click on <strong>"Set..."</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_102.png" class="align-center">

<p style="text-align: justify;">Click on the <strong>Sun icon</strong> and select your <strong>corpRootCA.cer</strong> file, click on <strong>"OK"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_103.png" class="align-center">

<p style="text-align: justify;">Check <strong>"HTTPS Only"</strong> and click on <strong>"OK"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_104.png" class="align-center">


### 7.1 Configure the Distribution Point for using SSL

<p style="text-align: justify;">In left panel select <strong>"Servers and Site System Roles"</strong>, on right side select your server <strong>"\\CORPWSCM1.corp.priv"</strong>, click on <strong>"Distribution point"</strong> and click on <strong>"Properties"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_105.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"Communication"</strong> tab, check the <strong>"Import certificate"</strong> box. Click on <strong>"Browse..."</strong> and select the OSD certificate <strong>D:\Cert\OSD Cert.pxf</strong> in the <strong>"Certificate:"</strong>, fill in the <strong>"Password:"</strong> field your certificate password and click on <strong>"OK"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_106.png" class="align-center">


### 7.2 Configure the Management Point for using SSL

<p style="text-align: justify;">Click on <strong>"Distribution point"</strong> and click on <strong>"Properties"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_107.png" class="align-center">

<p style="text-align: justify;">Verify if the <strong>HTTPS</strong> box is selected and click on <strong>"OK"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_108.png" class="align-center">


### 7.3 Configure the Software update Point for using SSL

<p style="text-align: justify;">Click on <strong>"Software update point"</strong> and click on <strong>"Properties"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_109.png" class="align-center">

<p style="text-align: justify;">Check the <strong>"Require SSL communication to the WSUS server"</strong> box and click on <strong>"OK"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_110.png" class="align-center">


### 7.4 Check the logs

<p style="text-align: justify;">Open <strong>"D:\Program Files\Microsoft Configuration Manager\Logs\sitecomp.log"</strong>.
In <strong>sitecomp.log</strong> you can see this initiated the Management Point to reinstall itself with the new settings.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_111.png" class="align-center">

<p style="text-align: justify;">Open <strong>"D:\Program Files\Microsoft Configuration Manager\Logs\MPSetup.log"</strong>.
In <strong>MPSetup.log</strong> you can see the communication is in SSL mode.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_112.png" class="align-center">

<p style="text-align: justify;">Open <strong>"D:\Program Files\Microsoft Configuration Manager\Logs\mpcontrol.log"</strong>.
In <strong>mpcontrol.log</strong> you can see the communication in HTTPS is OK.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_113.png" class="align-center">

<p style="text-align: justify;">Open <strong>"D:\Program Files\Microsoft Configuration Manager\Logs\WCM.log"</strong>.
In <strong>WCM.log</strong> you can see Software Update Point reconfigure to use the communication in HTTPS.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_114.png" class="align-center">


## 8 Verify client certificate and SSL communication with SCCM

<p style="text-align: justify;">In your <strong>Client</strong>, for me <strong>"WD01"</strong>.
<br> Open <strong>"Windows Start Menu"</strong>, in the search bar search <strong>"certlm.msc"</strong> console and open it.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_115.png" class="align-center">

<p style="text-align: justify;">In the left bar, expand <strong>"Personal"</strong>, click on <strong>"Certificates"</strong>. <br>You can see the certificate <strong>"SCCM Client Certificate"</strong> have requested by the client.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_116.png" class="align-center">

<p style="text-align: justify;">Open <strong>"Control Panel"</strong>, and open the <strong>"Configuration Manager Client agent"</strong>.
<br>In your <strong>"Client certificate:"</strong> Property, you will see for the moment is <strong>"Selft-signed"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_117.png" class="align-center">

<p style="text-align: justify;">Close <strong>"Configuration Manager Client agent"</strong> and after couple of minutes repopen it.
<br>In your <strong>"Client certificate:"</strong> Property, you will see now is <strong>"PKI"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_118.png" class="align-center">

<p style="text-align: justify;">Open <strong>"C:\Windows\CCM\Logs\ClientIDManagerStartup.log"</strong>.<br>
In <strong>ClientIDManagerStartup.log</strong> you can see Client PKI Certificate is available.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_119.png" class="align-center">

<p style="text-align: justify;">Open <strong>"C:\Windows\CCM\Logs\CcmMessaging.log"</strong>.<br>
In <strong>CcmMessaging.log</strong> you can see the communication is successfuly.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/2020-04-25-08_46_120.png" class="align-center">


<p style="text-align: justify;">There you go ! Your SCCM infrastructure now uses PKI to communicate.</p>

<p style="text-align: justify;"><strong>Sources :</strong></p>
<ul>
  <li><a href="https://docs.microsoft.com/en-us/mem/configmgr/core/plan-design/network/pki-certificate-requirements">PKI certificate requirements for Configuration Manager</a></li>
  <li><a href="https://www.windows-noob.com/forums/topic/16300-how-can-i-configure-system-center-configuration-manager-in-https-mode-pki-part-1/">How can I configure System Center Configuration Manager in HTTPS mode (PKI) - Part 1</a></li>
  <li><a href="https://www.windows-noob.com/forums/topic/16301-how-can-i-configure-system-center-configuration-manager-in-https-mode-pki-part-2/">How can I configure System Center Configuration Manager in HTTPS mode (PKI) - Part 2</a></li>
  <li><a href="https://www.prajwaldesai.com/deploy-pki-certificates-for-sccm-2012-r2/">Deploy PKI Certificates for SCCM 2012 R2 Step by Step Guide</a></li>
  <li><a href="https://gmarculescu.com/?p=81">Set up HTTPS client communication with SCCM</a></li>
  <li><a href="https://danikuci.wordpress.com/2014/03/26/configuring-sccm-for-managing-macs/">Configuring SCCM 2012 for PKI and SSL: Setting up HTTPS communication</a></li>
</ul>