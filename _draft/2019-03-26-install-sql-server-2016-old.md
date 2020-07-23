---
layout: single
title:  "How to installer Microsoft SQL Server 2016"
header:
  teaser: "/assets/images/Posts/2019-03-26-install-SQL-server-2016/logo-sql-server-2016.png"
  og_image: "/assets/images/Posts/2019-03-26-install-SQL-server-2016/logo-sql-server-2016.png"
type: posts
classes: wide
comments: true
read_time: true
categories:
  - SQL
tags:
  - Windows
  - SQL
  - SQL Server
  - SQL Server 2016
excerpt_separator: <!--more-->
---

<p style="text-align: justify;"><img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-install-SQL-server-2016/logo-sql-server-2016.png" class="align-left">SQL server designates a database server. The definition of the SQL server is closely linked to that of <strong>SQL (Structured Query Language)</strong>, a computer language that allows databases to be exploited.<!--more-->Microsoft SQL Server allows the operation of SQL and can create tables in a relational database, as well as add, modify or delete them.</p>

<h2>The principles</h2>

<p style="text-align: justify;">Concretely, a SQL server is a tool that has all the characteristics to be able to accompany the user in the manipulation, the control, the sorting, the update, and many other actions still, of databases thanks to the language SQL .</p>

<p style="text-align: justify;">The term also refers to the name given to the <strong>Relational Database Management System (RDBMS)</strong> marketed by Microsoft, or more precisely the name of the database engine of this RDBMS, SQL server offers multiple features.</p>

<h3>Prerequisites</h3>
<p style="text-align: justify;">Here are the minimum prerequisites for a server that host SQL Server 2016.</p>

| Hardware     | Specification |
|---------     | ----------- |
| **CPU :** | 1.4 GHz 64-bit |
| **Memory :** | 1024Mo |
| **Hard disk :** | 40Go disk space |
| **Network :** | A network connection |

<p style="text-align: justify;">For this tutorial, I would use a virtual machine with <strong>Windows Server 2016 Standard</strong> with the following configuration :</p>

<h3>Hardware</h3>

| Hardware     | Specification |
|---------     | ----------- |
| **CPU :** | 2 vCPU |
| **Memory :** | 4Go |
| **Hard disk :** | 45Go disk space |
| **Network :** | A network connection with NAT |

<h3>Network</h3>

| Fields     | Values |
|---------     | ----------- |
| **IP address :** | 192.168.10.3 |
| **Subnet :** | 255.255.255.0 |
| **Default gateway :** | 192.168.10.254 |
| **DNS :** | 192.168.10.1 |

<h2>Server preparation</h2>
<p style="text-align: justify;">Open the <strong>"Server Manager"</strong>, the program launches at startup.</p>
<p style="text-align: justify;">Click on <strong>"Local Server"</strong> fill in the following settings.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-install-SQL-server-2016/2019-02-17 19_30_50-mRemoteNG - confCons.xml - LABNPWADM1P.png" class="align-center">
<ul>
  <li><strong>Computer name :</strong> give a meaningful name to your server, for my part, I would take for example : <strong>CORPWSQL1</strong>.</li>
  <li><strong>Windows Firewall :</strong> disable Windows Firewall.</li>
  <li><strong>Remote Desktop :</strong> enable remote desktop.</li>
  <li><strong>Ethernet0 :</strong> set a fixed IP address, I would take for example : <strong>192.168.10.3</strong></li>
</ul>
<p style="text-align: justify;">
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-install-SQL-server-2016/2019-02-17 19_32_02-mRemoteNG - confCons.xml - LABNPWADM1P.png" class="align-center">
</p>
<span class="notice--warning">It is recommended by Microsot to perform all updates before any roles are installed.</span>

<h2>Installing prerequisites</h2>

<h3>Preparing for access rights</h3>

<p style="text-align: justify;">On your Active Directory server, for me <strong>CORPWADS1</strong>. And create a group and a user to administer the SQL server :
<ul>
  <li>Group : <strong>GRP_SQL-Admins</strong> : 
    <ul>
      <li>Group scope <strong>"Global"</strong></li> 
      <li>Group type <strong>"Security"</strong></li>
    </ul>
  </li>
  <li>Users : <strong>SVC_SQL_Adm</strong> : 
    <ul>
      <li>For security reasons activate options : <strong>"User cannot change password"</strong></li> 
      <li>Check also this option : <strong>"Password never expires"</strong></li>
    </ul>
  </li>
</ul></p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-install-SQL-server-2016/2019-02-26-22_03_11-1.png" class="align-center">

<h3>Server preparation</h3>

<p style="text-align: justify;">Then on your future SQL server, open the <strong>"Start Menu"</strong>. Click on <strong>"Windows PowerShell"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-install-SQL-server-2016/2019-02-26-21_03_11-1.png" class="align-center">

<p style="text-align: justify;">Run the following command to install the <strong>.NET Framework 3.5</strong> and the <strong>.NET Framework 4.6</strong> :</p>
```powershell
Install-WindowsFeature -Name NET-Framework-Features -Source D:\sources\sxs
```
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-install-SQL-server-2016/2019-02-26-21_05_11-1.png" class="align-center">

<p style="text-align: justify;">To make sure the features are installed, run the next command :</p>
```powershell
Get-WindowsFeature -Name "NET-Framework-Core", "NET-Framework-45-Features"
```
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-install-SQL-server-2016/2019-02-26-21_07_11-1.png" class="align-center">




<h2>Installing SQL Server 2016</h2>

<p style="text-align: justify;">Open the ISO of the SQL Server 2016 installation and click <strong>"setup"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-install-SQL-server-2016/2019-02-26-22_04_33-1.png" class="align-center">

<p style="text-align: justify;">In the menu on the left click <strong>"Install"</strong>. In the right window, click on <strong>"New SQL Server stand-alone installation or add features to an existing installation"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-install-SQL-server-2016/2019-02-26-22_05_50-1.png" class="align-center">

<p style="text-align: justify;"><strong>Product Key :</strong> select <strong>"Enter the product key:"</strong> and enter your <strong>Key</strong>. <br/>Then click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-install-SQL-server-2016/2019-02-26-22_06_19-1.png" class="align-center">

<p style="text-align: justify;"><strong>License Terms :</strong> accept the license agreement by checking the box <strong>"I accept the license terms."</strong>. Click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-install-SQL-server-2016/2019-02-26-22_06_33-1.png" class="align-center">

<p style="text-align: justify;"><strong>Global Rules :</strong> the assistant checks the requirements. Click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-install-SQL-server-2016/2019-02-26-22_06_54-1.png" class="align-center">

<p style="text-align: justify;"><strong>Microsoft Update :</strong> check the <strong>"Use Microsoft Update to check for updates (recommended)"</strong> box to check for product updates. Click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-install-SQL-server-2016/2019-02-26-22_07_44-1.png" class="align-center">

<p style="text-align: justify;"><strong>Product Updates :</strong> the assistant lists the updates that will be installed. Click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-install-SQL-server-2016/2019-02-26-22_08_10-1.png" class="align-center">

<p style="text-align: justify;"><strong>Install Rules :</strong> if all the rules are complete, click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-install-SQL-server-2016/2019-02-26-22_10_05-1.png" class="align-center">

<p style="text-align: justify;"><strong>Feature Selection : </strong> select the following options for <strong>"Database Engine Services"</strong>, <strong>"Reporting Services - Native"</strong> and click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-install-SQL-server-2016/2019-02-26-22_12_04-1.png" class="align-center">

<p style="text-align: justify;"><strong>Instance Configuration :</strong> in this part, you can edit the name of the instance if you wish. Click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-install-SQL-server-2016/2019-02-26-22_14_40-1.png" class="align-center">

<p style="text-align: justify;"><strong>Server Configuration :</strong> learn about the following fields with the previously created <strong>SVC_SQL_Adm</strong> account created previously :</p>
<ul>
  <li><strong>"SQL Server Agent"</strong></li>
  <li><strong>"SQL Server Database Engine"</strong></li>
  <li><strong>"SQL Server Reporting Services"</strong></li>
</ul>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-install-SQL-server-2016/2019-02-26-22_18_40-1.png" class="align-center">

<p style="text-align: justify;"><strong>Database Engine Configuration :</strong> select the <strong>"Windows authentification mode"</strong> option and add the group created <strong>GRP_SQL_Admins</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-install-SQL-server-2016/2019-02-26-22_21_42-1.png" class="align-center">

<p style="text-align: justify;"><strong>Reporting Services Configuration :</strong> select <strong>"Install and configure"</strong> and click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-install-SQL-server-2016/2019-02-26-22_22_06-1.png" class="align-center">

<p style="text-align: justify;"><strong>Feature Configuration Rules :</strong> once all the checks have been completed, click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-install-SQL-server-2016/2019-02-26-22_22_26-1.png" class="align-center">

<p style="text-align: justify;"><strong>Ready to Install :</strong> a summary of the components that will be installed will appear, click on <strong>"Install"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-install-SQL-server-2016/2019-02-26-22_22_42-1.png" class="align-center">

<p style="text-align: justify;"><strong>Installation Progress :</strong> the installation begins.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-install-SQL-server-2016/2019-02-26-22_36_12-1.png" class="align-center">

<p style="text-align: justify;"><strong>Complete :</strong> the installation is finished, the assistant displays the setup information. Click on <strong>"Close"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-install-SQL-server-2016/2019-02-26-22_38_20-1.png" class="align-center">


<h2>Installing Microsoft SQL Server Management Studio</h2>

<p style="text-align: justify;">Download SSMS from the Microsoft website at the following address : <a href="https://go.microsoft.com/fwlink/?linkid=2088649&clcid=0x409" alt="Lien SSMS">download</a></p>

<p style="text-align: justify;">Run the setup <strong>"SSMS-Setup-ENU.exe"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-install-SQL-server-2016/2019-02-26-22_48_41-1.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"Install"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-install-SQL-server-2016/2019-02-26-22_49_00-1.png" class="align-center">

<p style="text-align: justify;">The installation is progressing.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-install-SQL-server-2016/2019-02-26-22_56_14-1.png" class="align-center">

<p style="text-align: justify;">Once the installation is complete, click on <strong>"Restart"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-install-SQL-server-2016/2019-02-26-22_57_42-1.png" class="align-center">

<h2>Connect to Microsoft SQL Server 2016</h2>

<p style="text-align: justify;">Click on the icon <strong>"Microsoft SQL Server Management Studio 17"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-install-SQL-server-2016/2019-02-26-22_59_41-1.png" class="align-center">

<p style="text-align: justify;">Managment Studio starts.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-install-SQL-server-2016/2019-02-26-23_00_23-1.png" class="align-center">

<p style="text-align: justify;">A connection window appears. As the login information was pre-filled with the information from the connected Windows account, all that remained was to click on <strong>"Connect"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-install-SQL-server-2016/2019-02-26-23_01_28-1.png" class="align-center">

<p style="text-align: justify;">The connection to the server is now OK. In the <strong>"Object Explorer"</strong> and <strong>"Databases"</strong> window you will be able to see your server databases.</p>
<img src="{{ site.baseurl }}/assets/images/Posts/2019-03-26-install-SQL-server-2016/2019-02-26-23_03_33-1.png" class="align-center">

<p style="text-align: justify;">There you go ! It's up to you to enjoy your Microsoft SQL Server 2016.</p>