---
layout: single
title:  "How to install the prerequisites for System Center Configuration Manager 1902"
header:
  teaser: "/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/logo-sccm-2016.png"
  og_image: "/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/logo-sccm-2016.png"
type: posts
classes: wide
comments: true
read_time: true
categories:
  - SCCM
tags:
  - SCCM
  - Windows Server 2016
  - Windows
excerpt_separator: <!--more-->
---

<p style="text-align: justify;"><img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/logo-sccm-2016.png" class="align-left"><strong>System Center Configuration Manager (SCCM)</strong> is a system management software published by Microsoft. It is intended for the management of large computer parks.<!--more--> It allows: remote hand-taking, management and deployment of updates and patches, automation of tasks, cable applications, hardware and software inventory, compliance management, security policies, the deployment of operating systems.</p>

## Before you start
<p style="text-align: justify;">Before starting to install the prerequies for SCCM it is necessary at first to have followed the three posts below :</p>
<ul>
  <li><a href="{{ site.baseurl }}/active%20directory/install-active-directory/">How to install a domain controller Active Directory on Windows Server 2016</a></li>
  <li><a href="{{ site.baseurl }}/dhcp/install-dhcp-server/">How to install a DHCP server on Windows Server 2016</a></li>
  <li><a href="{{ site.baseurl }}/sql/install-sql-server-2016/">How to installer Microsoft SQL Server 2016</a></li>
</ul>

## Preparing the Active Directory
<p style="text-align: justify;">Connect you to your Active Directory server to perform the following actions.</p>

### Creating a service account

<p style="text-align: justify;">Create an account in the Active Directory, for my part I would call it <strong>"svc-adm-sccm"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-02-28 17_53_43-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">

### Create the System Management container

<p style="text-align: justify;">Open the <strong>"Server Manager"</strong> at the top right <strong>"click"</strong> on <strong>"Tools"</strong> and select <strong>"ADSI Edit"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-02-28 17_54_33-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"ADSI Edit"</strong> and click on <strong>"Connect to..."</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-02-28 17_55_12-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">

<p style="text-align: justify;">Leave the fields by default and click on <strong>"OK"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-02-28 17_55_35-mRemoteNG - confCons.xml - CORPWADS1P.png.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"Default naming context"</strong>, click on <strong>"CN-System"</strong> and choose <strong>"New"</strong>, <strong>"Object..."</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-02-28 17_56_16-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">

<p style="text-align: justify;">In the <strong>"Value:"</strong> field write <strong>"System Management"</strong> and click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-02-28 17_58_18-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">

<p style="text-align: justify;">To finish the creation click on <strong>"Finish"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-02-28 17_58_42-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">

### Added rights to the System Management container
<p style="text-align: justify;">Open the <strong>"Server Manager"</strong> at the top right <strong>"click"</strong> on <strong>"Tools"</strong> and select <strong>"Active Directory Users and Computers"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-02-28 18_00_37-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">

<p style="text-align: justify;">Top left click on <strong>"View"</strong> and activates the <strong>"Advanced Features"</strong> option.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-02-28 18_00_59-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">

<p style="text-align: justify;">To add a delegation click on <strong>"System Management"</strong> and select <strong>"Delegate Control..."</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-02-28 18_07_24-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">

<p style="text-align: justify;">The assistant opens, click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-02-28 18_07_39-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"Add..."</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-02-28 18_07_55-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">

<p style="text-align: justify;">In the window click <strong>"Object Types"</strong> and select <strong>"Computers"</strong> to be able to add your SCCM server.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-02-28 18_07_56-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">

<p style="text-align: justify;">Add your SCCM server, for me <strong>CORPWSCM1</strong> and add the previously created <strong>Svc-SCCM-Adm</strong> account.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-02-28 18_08_37-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">

<p style="text-align: justify;">Select <strong>"Create a custom task to delegate"</strong> and click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-02-28 18_09_01-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">

<p style="text-align: justify;">Select <strong>This folder, existing objects in this folder, and creation of new objects in this folder"</strong> and click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-02-28 18_09_21-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">

<p style="text-align: justify;">In the section <strong>"Show these permissions:"</strong> select the following options:
<ul>
  <li><strong>"General"</strong></li>
  <li><strong>"Property-specific"</strong></li>
  <li><strong>"Creation/deletion of specific chold objects"</strong></li>
</ul>
In the section <strong>"Permissions:"</strong> select the <strong>"Full Control"</strong> options. And click on <strong>"Next >"</strong>. 
</p>

<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-02-28 18_09_49-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">

<p style="text-align: justify;">Pour finir l'assistant affiche le récapitulatif des actions. Click on <strong>"Finish"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-02-28 18_10_11-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">

### Changing the Active Directory scheme

<p style="text-align: justify;">Connect you to your SCCM server to perform the following actions.</p>
<p style="text-align: justify;">See you in following <strong>"D:\SMSSETUP\BIN\X64\"</strong> on your SCCM installation CD, and execute <strong>"extadsch.exe"</strong> with <strong>"Run as administrator"</strong> option.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-02-28 18_13_27-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">

<p style="text-align: justify;">When the operation is finished, an <strong>"ExtADsch.log"</strong> file is generated.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-02-28 18_14_08-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">

<p style="text-align: justify;">Here is the contents of the log file. We can see that the operation is correct unrolled thanks to the line <strong>"Successfully extend the Active Directory schema."</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-02-28 18_14_30-mRemoteNG - confCons.xml - CORPWADS1P.png" class="align-center">


## Preparing the SCCM server

### Installing roles and features

Pour installer le transfert intelligent en arrière-plan (BITS) et la compression différentielle à distance (RDC) effectuer la commande suivante.
<p style="text-align: justify;">To install <strong>Background Intelligent Transfer Service (BITS)</strong> and <strong>Remote Differential Compression (RDC)</strong> perform the next command :</p>
```powershell
Install-WindowsFeature -Name BITS , RDC
```
<p style="text-align: justify;">Here's the result :</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-02-28 18_40_08-mRemoteNG - confCons.xml - CORPWSCM1P.png" class="align-center">

<p style="text-align: justify;">To install <strong>.NET Framework 3.5</strong> and <strong>.NET Framework 4.5</strong> perform the next command :</p>
```powershell
Install-WindowsFeature -Name NET-Framework-Features , NET-Framework-45-Features
```
<p style="text-align: justify;">Here's the result :</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-02-28 18_41_24-mRemoteNG - confCons.xml - CORPWSCM1P.png" class="align-center">

<p style="text-align: justify;">To install <strong>IIS web server</strong> with the necessary components perform the next command :</p>
```powershell
Install-WindowsFeature -Name Web-Server , Web-Common-Http , Web-Static-Content , Web-Http-Errors , Web-Security , Web-Windows-Auth , Web-App-Dev , Web-Asp-Net, Web-Asp-Net45, Web-Net-Ext, Web-Net-Ext45, Web-ISAPI-Ext, Web-Mgmt-Compat, Web-Lgcy-Mgmt-Console, Web-Metabase, Web-Wmi, Web-Scripting-Tools -IncludeManagementTools
```
<p style="text-align: justify;">Here's the result :</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-02-28 18_42_10-mRemoteNG - confCons.xml - CORPWSCM1P.png" class="align-center">


### Installing Windows ADK for Windows 10

<p style="text-align: justify;">In this part we'll see how to install <strong>Windows Assessment and Deployment Kit (Windows ADK)</strong> for Windows 10.</p>

<p style="text-align: justify;">Download the Windows ADK for Windows 10, version 1903 : <a href="https://go.microsoft.com/fwlink/?linkid=2086042">https://go.microsoft.com/fwlink/?linkid=2086042</a></p>

<p style="text-align: justify;">Run <strong>"adksetup.exe"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-06-14-22_58_57-mRemoteNG---confCons.xml---LABNPWADM1P.png" class="align-center">

<p style="text-align: justify;">Leave the default choice and click on <strong>"Next"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-06-14-22_59_38-mRemoteNG---confCons.xml---LABNPWADM1P.png" class="align-center">

<p style="text-align: justify;">Select whether you want to send data anonymously to Microsoft or not, and click on <strong>"Next"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-06-14-23_00_12-mRemoteNG---confCons.xml---LABNPWADM1P.png" class="align-center">

<p style="text-align: justify;">Accept the license, and click on <strong>"Accept"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-06-14-23_00_42-mRemoteNG---confCons.xml---LABNPWADM1P.png" class="align-center">

<p style="text-align: justify;">Select these features :
  <ul>
    <li><strong>"Deployment Tools"</strong></li>
    <li><strong>"User State Migration Tool (USMT)"</strong></li>
  </ul>
And click on <strong>"Install"</strong>.
</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-06-14-23_02_16-mRemoteNG---confCons.xml---LABNPWADM1P.png" class="align-center">

<p style="text-align: justify;">The installation progress.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-06-14-23_03_27-mRemoteNG---confCons.xml---LABNPWADM1P.png" class="align-center">

<p style="text-align: justify;">The installation is finished, click on <strong>"Close"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-06-14-23_03_55-mRemoteNG---confCons.xml---LABNPWADM1P.png" class="align-center">


<p style="text-align: justify;">Download the Windows PE add-on for the ADK : <a href="https://go.microsoft.com/fwlink/?linkid=2087112">https://go.microsoft.com/fwlink/?linkid=2087112</a></p>

<p style="text-align: justify;">Run <strong>"adkwinpesetup.exe"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-06-14-23_05_01-mRemoteNG---confCons.xml---LABNPWADM1P.png" class="align-center">

<p style="text-align: justify;">Leave the default choice and click on <strong>"Next"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-06-14-23_05_36-mRemoteNG---confCons.xml---LABNPWADM1P.png" class="align-center">

<p style="text-align: justify;">Select whether you want to send data anonymously to Microsoft or not, and click on <strong>"Next"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-06-14-23_05_54-mRemoteNG---confCons.xml---LABNPWADM1P.png" class="align-center">

<p style="text-align: justify;">Accept the license, and click on <strong>"Accept"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-06-14-23_06_11-mRemoteNG---confCons.xml---LABNPWADM1P.png" class="align-center">

<p style="text-align: justify;">Select these features : <strong>"Windows Preinstallation Environnment (Windows PE)"</strong>, and click on <strong>"Install"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-06-14-23_06_28-mRemoteNG---confCons.xml---LABNPWADM1P.png" class="align-center">

<p style="text-align: justify;">The installation progress.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-06-14-23_20_03-mRemoteNG---confCons.xml---LABNPWADM1P.png" class="align-center">

<p style="text-align: justify;">The installation is finished, click on <strong>"Close"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-06-14-23_32_46-mRemoteNG---confCons.xml---LABNPWADM1P.png" class="align-center">

### Configure the SQL Server 2016

<p style="text-align: justify;">Open the <strong>"Computer Management"</strong> then open <strong>"System Tools"</strong>, <strong>"Local Users and Groups"</strong>, and <strong>"Groups"</strong>. Click on <strong>"Administrators"</strong> group and select <strong>"Add to Group..."</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-06-16-17_25_04-mRemoteNG---confCons.xml---LABNPWADM1P.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"Add..."</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-06-16-17_25_39-mRemoteNG---confCons.xml---LABNPWADM1P.png" class="align-center">

<p style="text-align: justify;">In the window click <strong>"Object Types"</strong> and select <strong>"Computers"</strong> to be able to add your SCCM server.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-06-16-17_26_05-mRemoteNG---confCons.xml---LABNPWADM1P.png" class="align-center">

<p style="text-align: justify;">Add your SCCM server, for me <strong>CORPWSCM1</strong>. And click on <strong>"OK"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-06-16-17_26_48-mRemoteNG---confCons.xml---LABNPWADM1P.png" class="align-center">

<p style="text-align: justify;">Click <strong>"OK"</strong> to finish</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-06-10-install-prerequisites-SCCM-1902/2019-06-16-17_27_21-mRemoteNG---confCons.xml---LABNPWADM1P.png" class="align-center">

<p style="text-align: justify;">There you go ! Your infrastructure is now ready for the installation of SCCM.</p>