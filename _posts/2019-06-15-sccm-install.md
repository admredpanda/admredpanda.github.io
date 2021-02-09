---
layout: single
title:  "How to install System Center Configuration Manager"
last_modified_at: 2020-12-07
header:
  teaser: "/assets/images/posts/2019-06-15-sccm-install/logo-sccm-444x240.png"
  og_image: "/assets/images/posts/2019-06-15-sccm-install/logo-sccm-444x240.png"
type: posts
classes: wide
comments: true
read_time: true
categories:
  - SCCM
tags:
  - Windows Server
  - Microsoft
  - Services
  - Server
  - SCCM
  - System Center
  - Configuration Manager
  - System Center Configuration Manager
  - Site
  - Site Name
  - Primary Site
  - Language
  - Stand-alone
  - FQDN
  - Fully qualified domain name
  - Database
  - SMS
  - Systems Management Server
  - Site System Roles
  - Connection Point
  - SQL Server
---

<p style="text-align: justify;"><img src="{{ site.baseurl }}/assets/images/posts/2019-06-15-sccm-install/logo-sccm-222x150.png" class="align-left"><strong>System Center Configuration Manager (SCCM)</strong> is a system management software published by Microsoft. It is intended for the management of large computer parks. It allows: remote control, management and deployment of updates and patches, automation of tasks, remote distribution of applications, hardware and software inventory, compliance management, administration of security policies, deployment of operating systems.</p>

## Before starting
<p style="text-align: justify;">You can read the following articles :</p>
<ol>
  <li><a href="{{ site.baseurl }}/active%20directory/install-active-directory/">How to install a domain controller Active Directory on Windows Server</a></li>
  <li><a href="{{ site.baseurl }}/sql/install-sql-server-2016/">How to installer Microsoft SQL Server 2016</a></li>
  <li><a href="{{ site.baseurl }}/sccm/sccm-install-prerequisites/">How to install the prerequisites for System Center Configuration Manager</a></li>
</ol>

## Install System Center Configuration Manager

<p style="text-align: justify;">Go to <strong>"Z:\"</strong> on your SCCM installation CD, and run <strong>"splash.exe"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-06-15-sccm-install/2019-06-16-16_54_15-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;">The Microsoft System Center Configuration Manager installation wizard starts.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-06-15-sccm-install/2019-06-16-16_55_56-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"Install"</strong> to begin.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-06-15-sccm-install/2019-06-16-16_57_01-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;"><strong>Before You Begin :</strong> the wizard lists the prerequisites for installation. Click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-06-15-sccm-install/2019-06-16-16_59_45-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;"><strong>Getting Started :</strong> select <strong>"Install a Configuration Manager primary site"</strong> and click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-06-15-sccm-install/2019-06-16-17_00_10-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;"><strong>Product Key :</strong> select <strong>"Install the licensed edition of this product"</strong>, enter your product key in the field and click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-06-15-sccm-install/2019-06-16-17_01_27-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;"><strong>Product License Terms :</strong> check the following boxes :
<ul>
  <li><strong>"I accept these License Terms and Privacy Statement."</strong></li>
  <li><strong>"I accept these License Terms."</strong></li>
  <li><strong>"I accept these License Terms."</strong></li>
</ul>
And click on <strong>"Next >"</strong>.
</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-06-15-sccm-install/2019-06-16-17_02_19-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;"><strong>Prerequisite Downloads :</strong> select <strong>"Download required files"</strong>, enter the following path : <strong>"C:\Users\administrator.CORP\Downloads"</strong> and click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-06-15-sccm-install/2019-06-16-17_02_46-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;">The wizard downloads the files required for the installation.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-06-15-sccm-install/2019-06-16-17_03_08-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;"><strong>Server Language Selection :</strong> select the languages you want to add for the configuration manager and click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-06-15-sccm-install/2019-06-16-17_10_30-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;"><strong>Server Language Selection :</strong>  select the languages you want to add for the client part, for my part I would choose <strong>"French"</strong> and click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-06-15-sccm-install/2019-06-16-17_11_38-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;"><strong>Site and Installation Settings :</strong> fill in the <strong>"Site code:"</strong> with a 3 letter word, I would choose <strong>CORP</strong>.</p>
<p style="text-align: justify;">Fill in the <strong>"Site name:"</strong> with the name of your site.</p>
<p style="text-align: justify;">In the field <strong>"Installation folder:"</strong> indicate the following path : <strong>"D:\Program Files\Microsoft Configuration Manager"</strong>.</p>
<p style="text-align: justify;">Check the box <strong>"Install the Configuration Manager console"</strong> and click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-06-15-sccm-install/2019-06-16-17_13_59-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;"><strong>Primary Site Installation :</strong> select <strong>"Install the primary site as a stand-alone site"</strong> and click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-06-15-sccm-install/2019-06-16-17_14_30-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"Yes"</strong> to accept.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-06-15-sccm-install/2019-06-16-17_14_56-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;"><strong>Database Information :</strong> enter the name of your SQL server in the field <strong>"SQL Server name (FQDN):"</strong> for my part  <strong>corpwsql1.corp.priv</strong>.</p>
<p style="text-align: justify;">Enter the name of your future database in the field <strong>"Database name:"</strong> for me <strong>CM_COR</strong>. Click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-06-15-sccm-install/2019-06-16-17_16_06-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;"><strong>Database Information :</strong> Click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-06-15-sccm-install/2019-06-16-17_16_33-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;"><strong>SMS Provider Setting :</strong> in the field <strong>"SMS Provider (FQDN):"</strong> check that the full name of your SCCM server appears : SCCM : <strong>corpwscm1.corp.priv</strong> and click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-06-15-sccm-install/2019-06-16-17_16_56-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;"><strong>Client Computer Communication Settings :</strong> check the option <strong>"Configure the communication method on each site system role"</strong> and click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-06-15-sccm-install/2019-06-16-17_17_22-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;"><strong>Site System Roles :</strong> click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-06-15-sccm-install/2019-06-16-17_17_42-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;"><strong>Diagnostic and Usage Data :</strong> click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-06-15-sccm-install/2019-06-16-17_18_14-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;"><strong>Service Connection Point Setup :</strong> click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-06-15-sccm-install/2019-06-16-17_18_53-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;"><strong>Prerequisite Check :</strong> the wizard displays three warnings :
<ul>
  <li><strong>WSUS on site server :</strong> there is no WSUS server currently installed on the site.</li>
  <li><strong>SQL Server Native Client version :</strong> the current version needs to be updated.</li>
  <li><strong>SQL Server process memory allocation :</strong> the minimum memory reserve on the SQL server must be at least 8 GB.</li>
</ul>
Its various alerts are not blocking for the rest of the installation. You will find here the page listing <a href="https://docs.microsoft.com/en-us/mem/configmgr/core/servers/deploy/install/list-of-prerequisite-checks">the prerequisite checks for Configuration Manager</a>.</p>
<p style="text-align: justify;">Click on <strong>"Begin Install"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-06-15-sccm-install/2019-06-16-17_30_10-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;"><strong>Install :</strong> click on <strong>"Close"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-06-15-sccm-install/2019-06-16-18_31_53-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;">The configuration manager console is now available.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-06-15-sccm-install/2019-06-16-18_33_05-mRemoteNG---confCons.png" class="align-center">

<p style="text-align: justify;">There you go ! Your infrastructure is now ready for you to start using SCCM.</p>