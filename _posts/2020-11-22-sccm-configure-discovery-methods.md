---
layout: single
title:  "How to configure Discovery Methods in System Center Configuration Manager"
last_modified_at: 2020-12-07
header:
  teaser: "/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/logo-sccm-444x240.png"
  og_image: "/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/logo-sccm-444x240.png"
type: posts
classes: wide
comments: true
read_time: true
categories:
  - SCCM
tags:
  - SCCM
  - System Center
  - Configuration Manager
  - System Center Configuration Manager
  - Windows
  - Windows Server
  - Microsoft
  - Active Directory
  - LDAP
  - Lightweight Directory Access Protocol
  - Forest
  - User
  - Users
  - Group
  - Groups
  - Discovery
  - Discovery Methods
  - OU
  - Organizational Unit
  - Bondaries
  - Sites
  - Sites Active Directory
  - Active Directory Forest
  - Active Directory Forest Discovery
  - Active Directory Group
  - Active Directory Group Discovery
  - Active Directory System
  - Active Directory System Discovery
  - Active Directory Users
  - Active Directory Users Discovery
---

<p style="text-align: justify;"><img src="{{ site.baseurl }}/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/logo-sccm-222x150.png" class="align-left">Configuration manager's discovery methods allow several Active Directory objects or network resources to be imported into SCCM automatically. In the following article, I will detail the following methods of discovery : Active Directory Forest Discovery, Active Directory Group Discovery, Active Directory System Discovery, Active Directory Users Discovery.</p>


## Before starting
<p style="text-align: justify;">You can read the following articles :</p>
<ol>
  <li><a href="{{ site.baseurl }}/active%20directory/install-active-directory/">How to install a domain controller Active Directory on Windows Server</a></li>
  <li><a href="{{ site.baseurl }}/sql/install-sql-server-2016/">How to installer Microsoft SQL Server 2016</a></li>
  <li><a href="{{ site.baseurl }}/sccm/sccm-install-prerequisites/">How to install the prerequisites for System Center Configuration Manager</a></li>
  <li><a href="{{ site.baseurl }}/sccm/sccm-install/">How to install System Center Configuration Manager</a></li>
</ol>


## Discovery Methods

### Active Directory Forest Discovery

<p style="text-align: justify;">In the <strong>"Configuration Manager Console"</strong>, in the bottom left panel, select <strong>"Administration"</strong>. Scroll down the <strong>"Hierachy Configuration"</strong> folder and select <strong>"Discovery Methods"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/2020-06-06-20_37_18-mRemoteNG---confCons.xml---CORPWSCM1.png" class="align-center">

<p style="text-align: justify;">On the right hand part, select <strong>"Active Directory Forest Discovery"</strong> and in the ribbon, click on <strong>"Properties"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/2020-06-06-20_37_19-mRemoteNG---confCons.xml---CORPWSCM1.png" class="align-center">

<p style="text-align: justify;">Check the <strong>"Enable Active Directory Forest Discovery"</strong> box, and the <strong>"Automatically create Active Directory site boundaries when they are discovered"</strong> box.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/2020-06-06-20_37_20-mRemoteNG---confCons.xml---CORPWSCM1.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"Yes"</strong> to run the discovery immediately.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/2020-06-06-20_37_21-mRemoteNG---confCons.xml---CORPWSCM1.png" class="align-center">


### Active Directory Group Discovery

<p style="text-align: justify;">On the right hand part, select <strong>"Active Directory Group Discovery"</strong> and in the ribbon, click on <strong>"Properties"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/2020-06-06-20_37_22-mRemoteNG---confCons.xml---CORPWSCM1.png" class="align-center">

<p style="text-align: justify;">Check the box <strong>"Enable Active Directory Group Discovery"</strong>, at the bottom click on <strong>"Add"</strong> then <strong>"Location..."</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/2020-06-06-20_37_23-mRemoteNG---confCons.xml---CORPWSCM1.png" class="align-center">

<p style="text-align: justify;">In the <strong>"Name:"</strong> field enter the name of the location, for me <strong>"Corp - Groups Users"</strong>, in the <strong>"Location:"</strong> section. Click on <strong>"Browse..."</strong> and select your OU, I would use for my part <strong>"LDAP://OU=Groups,OU=Paris,OU=Site,OU=CORP,DC=corp,DC=priv"</strong>. <br>Click on <strong>"OK"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/2020-06-06-20_37_24-mRemoteNG---confCons.xml---CORPWSCM1.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"OK"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/2020-06-06-20_37_25-mRemoteNG---confCons.xml---CORPWSCM1.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"Yes"</strong> to execute the discovery immediately.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/2020-06-06-20_37_26-mRemoteNG---confCons.xml---CORPWSCM1.png" class="align-center">


### Active Directory System Discovery

<p style="text-align: justify;">On the right hand part, select <strong>"Active Directory System Discovery"</strong> and in the ribbon, click on <strong>"Properties"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/2020-06-06-20_37_27-mRemoteNG---confCons.xml---CORPWSCM1.png" class="align-center">

<p style="text-align: justify;">Check the box <strong>"Enable Active Directory System Discovery"</strong>, click on the button with the <strong>"sun symbol"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/2020-06-06-20_37_28-mRemoteNG---confCons.xml---CORPWSCM1.png" class="align-center">

<p style="text-align: justify;">In the <strong>"Path:"</strong> field, click on <strong>"Browse..."</strong> and select your OU, I would use for my part <strong>"LDAP://DC=corp,DC=priv"</strong>. <br>Click on <strong>"OK"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/2020-06-06-20_37_29-mRemoteNG---confCons.xml---CORPWSCM1.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"OK"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/2020-06-06-20_37_30-mRemoteNG---confCons.xml---CORPWSCM1.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"Yes"</strong> to execute the discovery immediately.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/2020-06-06-20_37_26-mRemoteNG---confCons.xml---CORPWSCM1.png" class="align-center">


### Active Directory Users Discovery

<p style="text-align: justify;">On the right hand part, select <strong>"Active Directory Users Discovery"</strong> and in the ribbon, click on <strong>"Properties"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/2020-06-06-20_37_31-mRemoteNG---confCons.xml---CORPWSCM1.png" class="align-center">

<p style="text-align: justify;">Check the box <strong>"Enable Active Directory Users Discovery"</strong>, click on the button with the <strong>"sun symbol"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/2020-06-06-20_37_32-mRemoteNG---confCons.xml---CORPWSCM1.png" class="align-center">

<p style="text-align: justify;">In the <strong>"Path:"</strong> field, click on <strong>"Browse..."</strong> and select your OU, I would use for my part <strong>"LDAP://DC=corp,DC=priv"</strong>. <br>Click on <strong>"OK"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/2020-06-06-20_37_33-mRemoteNG---confCons.xml---CORPWSCM1.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"OK"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/2020-06-06-20_37_34-mRemoteNG---confCons.xml---CORPWSCM1.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"Yes"</strong> to execute the discovery immediately.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/2020-06-06-20_37_26-mRemoteNG---confCons.xml---CORPWSCM1.png" class="align-center">



<p style="text-align: justify;">There you go ! The discovery is now configured, you can now find all your Active Directory objects in SCCM.</p>