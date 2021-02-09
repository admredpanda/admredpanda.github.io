---
layout: single
title:  "How to install and configure certificate authorities on Windows Server"
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
excerpt_separator: <!--more-->
---

<p style="text-align: justify;"><img src="{{ site.baseurl }}/assets/images/posts/2020-11-26-install-configure-certificate-authorities/logo-ad-cs-222x150.png" class="align-left">
The <strong>Active Directory Certificate Service (AD CS)</strong> provides functionality for managing a <strong>Public Key Infrastructure (PKI)</strong> that manages identities and other security features on the Windows domain. It can <strong>create</strong>, <strong>validate</strong>, and <strong>revoke</strong> <strong>public key certificates</strong> for an <strong>organization's internal uses</strong>.<!--more--> It is used for the security of the following applications: Digital signatures, Secure e-mail, Internet authentication, IP security, Smart card logon, Encrypting File System user and recovery certificates, Wireless 802.1X authentication, Authentication of network devices such as routers that do not have network accounts.</p>


## Installation

<p style="text-align: justify;">Open the <strong>"Server Manager"</strong>, then click <strong>"Manage"</strong> and then <strong>"Add Roles and Features"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_04_21-0.png" class="align-center">

<p style="text-align: justify;"><strong>Before you begin :</strong> the page displays a small reminder of prerequisites before a role is installed. If you want this page to no longer appear, check the case <strong>"Skip this page by default"</strong> and click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_04_21-1.png" class="align-center">

<p style="text-align: justify;"><strong>Select installation type :</strong> we want to install the role on the server in question, leave the default choice and click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_13_21-1.png" class="align-center">

<p style="text-align: justify;"><strong>Select destination server :</strong> the default choice is automatically selects our server in the pool, click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_21-1.png" class="align-center">

<p style="text-align: justify;"><strong>Select server roles :</strong> in the list of roles, check the <strong>"Active Directory Certificate Services"</strong> box. Click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_22-1.png" class="align-center">

<p style="text-align: justify;"><strong>Select server roles :</strong> a window appears asking if you want to install management tools for the Active Directory Certificate Services role, click on <strong>"Add Features"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_23-1.png" class="align-center">

<p style="text-align: justify;"><strong>Select server roles :</strong> click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_24-1.png" class="align-center">

<p style="text-align: justify;"><strong>Select features :</strong> click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_25-1.png" class="align-center">

<p style="text-align: justify;"><strong>Active Directory Certificate Services :</strong> click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_26-1.png" class="align-center">

<p style="text-align: justify;"><strong>Select role services :</strong> check the <strong>"Certificate Authority"</strong> box.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_27-1.png" class="align-center">

<p style="text-align: justify;"><strong>Confirm installation selections :</strong> click on <strong>"Install"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_32-1.png" class="align-center">

<p style="text-align: justify;"><strong>Installation progress :</strong> click on <strong>"Close"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_33-1.png" class="align-center">


## Configuration

<p style="text-align: justify;">In the <strong>"Server Manager"</strong>, click on <strong>"the flag with a warning"</strong> and click on the link <strong>"Configure Active Directory Certificate Services on th..."</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_34-1.png" class="align-center">

<p style="text-align: justify;"><strong>Credentials :</strong> click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_35-1.png" class="align-center">

<p style="text-align: justify;"><strong>Role Services :</strong> check the <strong>"Certificate Authority"</strong> box. Click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_36-1.png" class="align-center">

<p style="text-align: justify;"><strong>Setup Type :</strong> check the <strong>"Entreprise CA"</strong> box. Click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_36-2.png" class="align-center">

<p style="text-align: justify;"><strong>CA Type :</strong> check the <strong>"Root CA"</strong> box and click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_37-1.png" class="align-center">

<p style="text-align: justify;"><strong>Private Key :</strong> check the <strong>"Create a new private key"</strong> box and click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_38-1.png" class="align-center">

<p style="text-align: justify;"><strong>Cryptography for CA :</strong> in the <strong>"Key length field:"</strong> select <strong>"4096"</strong>, in the list <strong>"Select the hash algorithm for signing certificates issued by this CA:"</strong> and select <strong>"SHA256"</strong>. <br>Click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_39-1.png" class="align-center">

<p style="text-align: justify;"><strong>CA Name :</strong> in the <strong>"Common name for this CA:"</strong> fill in the field with the name of this CA like this <strong>"corpRootCA"</strong>, in the <strong>"Distinguished name suffix:"</strong> field live a blank, in the <strong>"Preview of distinguished name:"</strong> fill in the field with the name of this CA like this <strong>"CN=corpRootCA"</strong>. <br>Click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_40-1.png" class="align-center">

<p style="text-align: justify;"><strong>Validity Period :</strong> in the <strong>"Select the validity period for the certificate generated for this certification authority (CA):"</strong> fill in the field with the validity period of your certificate, I would use for my part <strong>"5"</strong> Years. <br>Click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_41-1.png" class="align-center">

<p style="text-align: justify;"><strong>CA Database :</strong> click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_42-1.png" class="align-center">

<p style="text-align: justify;"><strong>Confirmation :</strong> click on <strong>"Configure"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_43-1.png" class="align-center">

<p style="text-align: justify;"><strong>Results :</strong> click on <strong>"Close"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-26-install-configure-certificate-authorities/2019-02-23-18_17_44-1.png" class="align-center">

<p style="text-align: justify;">There you go ! Active Directory Certificate Services have been successfully installed and configured, you can now create, validate, and revoke your public key certificates for your organization's.</p>

<p style="text-align: justify;"><strong>Sources :</strong></p>
<ul>
  <li><a href="https://docs.microsoft.com/en-us/windows-server/networking/core-network-guide/cncg/server-certs/install-the-certification-authority">Install the Certification Authority</a></li>
  <li><a href="https://social.technet.microsoft.com/wiki/contents/articles/7421.active-directory-certificate-services-ad-cs-public-key-infrastructure-pki-design-guide.aspx">Active Directory Certificate Services (AD CS) Public Key Infrastructure (PKI) Design Guide</a></li>
  <li><a href="https://social.technet.microsoft.com/wiki/contents/articles/2901.public-key-infrastructure-design-guidance.aspx">Public Key Infrastructure Design Guidance</a></li>
  <li><a href="https://techcommunity.microsoft.com/t5/ask-the-directory-services-team/designing-and-implementing-a-pki-part-i-design-and-planning/ba-p/396953">Designing and Implementing a PKI: Part I Design and Planning</a></li>
</ul>