---
layout: single
title:  "How to configure Boundary Groups in System Center Configuration Manager"
last_modified_at: 2020-12-07
header:
  teaser: "/assets/images/posts/2020-11-24-sccm-configure-boundary-groups/logo-sccm-444x240.png"
  og_image: "/assets/images/posts/2020-11-24-sccm-configure-boundary-groups/logo-sccm-444x240.png"
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
  - Boundaries
  - Boundary Group
  - Boundary Groups
  - Site system
  - Site system server
  - Site assignment
  - Site
  - Site Active Directory
  - Distribution Points
  - Software Update Points
  - State Migration Points
  - Management Points
  - Cloud Management Gateway
  - IP
  - Internet Protocol
  - IPv4
  - Active Directory Forest Discovery
  - Active Directory Forest
---

<p style="text-align: justify;"><img src="{{ site.baseurl }}/assets/images/posts/2020-11-24-sccm-configure-boundary-groups/logo-sccm-222x150.png" class="align-left"><strong>Boundary groups</strong> allow the logical organization of network locations. This allows clients to be directed to the nearest available SCCM server on the network. <strong>Boundary groups</strong> also increase availability by redirecting clients to another server in case of failure of the nearest server.</p>

<p style="text-align: justify;">Clients use a <strong>boundary groups</strong> for :
<ul>
  <li>Automatic <strong>site assignment</strong></li>
  <li>To find a <strong>site system server</strong> that can provide a service, including:</li>
    <ul>
      <li><strong>Distribution points</strong></li>
      <li><strong>Software update points</strong></li>
      <li><strong>State migration points</strong></li>
      <li><strong>Management points</strong></li>
      <li><strong>Cloud management gateway</strong></li>
    </ul>
</ul>
</p>


## Before starting
<p style="text-align: justify;">You can read the following articles :</p>
<ol>
  <li><a href="{{ site.baseurl }}/active%20directory/install-active-directory/">How to install a domain controller Active Directory on Windows Server</a></li>
  <li><a href="{{ site.baseurl }}/sql/install-sql-server-2016/">How to installer Microsoft SQL Server 2016</a></li>
  <li><a href="{{ site.baseurl }}/sccm/sccm-install-prerequisites/">How to install the prerequisites for System Center Configuration Manager</a></li>
  <li><a href="{{ site.baseurl }}/sccm/sccm-install/">How to install System Center Configuration Manager</a></li>
  <li><a href="{{ site.baseurl }}/sccm/sccm-configure-discovery-methods/">How to configure Discovery Methods in System Center Configuration Manager</a></li>
</ol>


## Concept

<p style="text-align: justify;">The following diagram shows an example of use.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-24-sccm-configure-boundary-groups/diagram-boundary-groups.png" class="align-center">
<ul>
  <li><strong>Datacenter :</strong>
    <ul>
      <li><strong>Boundarie - Datacenter :</strong> a boundarie is based on the Active Directory Datacenter site.</li>
      <li><strong>Boundary Group - Datacenter :</strong> a boundary group containing the boundarie datacenter, and referral for members, the primary site code S01 and site system server of the datacenter.</li>
    </ul> 
  </li>
  <li><strong>Paris :</strong>
    <ul>
      <li><strong>Boundarie - Paris :</strong> a boundarie is based on the Active Directory Datacenter site.</li>
      <li><strong>Boundary Group - Paris :</strong> a boundary group containing the boundarie cited, and reference for the members, the secondary site code S02 and system server site of Paris and in failback that of the Datacenter.</li>
    </ul> 
  </li>
  <li><strong>VPN :</strong>
    <ul>
      <li><strong>Boundarie - VPN 1 :</strong> a boundarie based on a range of IP addresses of the VPN stations.</li>
      <li><strong>Boundarie - VPN 2 :</strong> a boundarie based on a range of IP addresses of the VPN stations.</li>
      <li><strong>Boundary Group - VPN :</strong> a boundary group containing the cited boundary, and reference for members, the primary site code S01 and site system server of the Datacenter.</li>
    </ul> 
  </li>
</ul>


## Configuration

<p style="text-align: justify;">The boundarie and boundary groups will be created following the example below.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-24-sccm-configure-boundary-groups/diagram-boundary-groups-labvl.png" class="align-center">

<p style="text-align: justify;">In the <strong>"Configuration Manager Console"</strong>, in the bottom left panel, select <strong>"Administration"</strong>. Scroll down the <strong>"Hierachy Configuration"</strong> folder and select <strong>"Boundaries"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-24-sccm-configure-boundary-groups/2020-11-24-17_47_06-mRemoteNG---confCons.xml---CORPWSCM1.png" class="align-center">

<p style="text-align: justify;">If you followed the article <a href="{{ site.baseurl }}/sccm/SCCM-configure-discovery-methods/">How to configure Discovery Methods in SCCM</a> and activate the <strong>"Active Directory Forest Discovery"</strong>, the <strong>Paris</strong> boundaries must have been created automatically.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-24-sccm-configure-boundary-groups/2020-11-24-17_47_07-mRemoteNG---confCons.xml---CORPWSCM1.png" class="align-center">

<p style="text-align: justify;">In left panel, scroll down the <strong>"Hierachy Configuration"</strong> folder and select <strong>"Boundary Groups"</strong>. By default the boundary group <strong>"Default-Site-Boundary-Group&lt;COR&gt;"</strong> is the boundary group to which clients connect if no others are available.<br> In the ribbon click on <strong>"Create Bondary"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-24-sccm-configure-boundary-groups/2020-11-24-17_47_08-mRemoteNG---confCons.xml---CORPWSCM1.png" class="align-center">

<p style="text-align: justify;">In the field <strong>"Name:"</strong> give a name to your boundary group, for me <strong>"SA - Paris"</strong>, in the field <strong>"Descripstion:"</strong> give a description <strong>"Boundary group Paris"</strong>. Then click on <strong>"Add..."</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-24-sccm-configure-boundary-groups/2020-11-24-17_47_09-mRemoteNG---confCons.xml---CORPWSCM1.png" class="align-center">

<p style="text-align: justify;">Select the boundarie <strong>"Paris"</strong> and click <strong>"OK"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-24-sccm-configure-boundary-groups/2020-11-24-17_47_10-mRemoteNG---confCons.xml---CORPWSCM1.png" class="align-center">

<p style="text-align: justify;">Select the <strong>"References"</strong> tab, in the section <strong>"Site assignement"</strong> check the <strong>"Use this boundary group for site assignement"</strong> box, in the <strong>"Assigned site:"</strong> select your site, for me <strong>"COR-Corporate Site"</strong>. And click on <strong>"Add..."</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-24-sccm-configure-boundary-groups/2020-11-24-17_47_11-mRemoteNG---confCons.xml---CORPWSCM1.png" class="align-center">

<p style="text-align: justify;">Check the box of your site system to assign <strong>"\\CORPWSCM1.corp.priv"</strong> and clik on <strong>"OK"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-24-sccm-configure-boundary-groups/2020-11-24-17_47_12-mRemoteNG---confCons.xml---CORPWSCM1.png" class="align-center">

<p style="text-align: justify;">Clik on <strong>"OK"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-24-sccm-configure-boundary-groups/2020-11-24-17_47_13-mRemoteNG---confCons.xml---CORPWSCM1.png" class="align-center">

<p style="text-align: justify;">Your boundary group is now created.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2020-11-24-sccm-configure-boundary-groups/2020-11-24-17_47_14-mRemoteNG---confCons.xml---CORPWSCM1.png" class="align-center">

<p style="text-align: justify;">There you go ! Your clients who are located in the Active Directory site <strong>"Paris"</strong> will be assigned the site code <strong>"COR"</strong> and will connect to the site system server <strong>"CORPWSCM1"</strong>.</p>