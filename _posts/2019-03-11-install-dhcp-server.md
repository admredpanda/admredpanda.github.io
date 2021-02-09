---
layout: single
title:  "How to install a DHCP server on Windows Server"
last_modified_at: 2020-12-07
header:
  teaser: "/assets/images/posts/2019-03-11-install-dhcp-server/logo-dhcp-444x240.png"
  og_image: "/assets/images/posts/2019-03-11-install-dhcp-server/logo-dhcp-444x240.png"
type: posts
classes: wide
comments: true
read_time: true
categories:
  - DHCP
tags:
  - DHCP
  - Dynamic Host Configuration Protocol
  - DHCP Server
  - Windows Server
  - Windows
  - Microsoft
  - Server
  - Discover
  - Offer
  - Request
  - Ack
  - IP
  - IPv4
  - IP address
  - Internet Protocol
  - Scope
  - Subnet
  - Subnet mask
  - Mask
  - Default Gateway
  - Gateway
  - DNS
  - Domain Name System
  - WINS
  - Windows Internet Naming Service
  - WINS Server
  - Reservations
  - Address
  - Address Pool
  - Router
---

<p style="text-align: justify;"><img src="{{ site.baseurl }}/assets/images/posts/2019-03-11-install-dhcp-server/logo-dhcp-222x150.png" class="align-left"><strong>Dynamic Host Configuration Protocol (DHCP)</strong>  is a network protocol that enables automatic configuration of client IP settings by automatically distributing an <strong>IP address</strong> and <strong>subnet mask</strong>. It can also configure the <strong>gateway</strong>, <strong>DNS</strong> servers and <strong>WINS</strong> servers. DHCP messages are transmitted through the <strong>UDP</strong> protocol, the client uses <strong>port 68</strong> to emit and receive messages. The server uses <strong>port 67</strong> to send and receive messages.</p>

## How it works

<p style="text-align: justify;">Here is a diagram that explains the interaction between a client and a server to get the IP parameters :</p>

<img src="{{ site.baseurl }}/assets/images/posts/2019-03-11-install-dhcp-server/DHCP-requetes.jpg" class="align-center">

<ul>
  <li style="text-align: justify;"><strong>DHCP Discover :</strong> the client sends a frame to find a DHCP server through a <strong>broadcast</strong> at the MAC address <strong>FF:FF:FF:FF:FF:FF</strong>.</li>
  <li style="text-align: justify;"><strong>DHCP Offer :</strong> the server responds with a proposal of one or more <strong>IP address</strong>, with a <strong>subnet mask</strong>. Available in its available address <strong>pool</strong>.</li>
  <li style="text-align: justify;"><strong>DHCP Request :</strong> the client retains one of the server offers, and returns a response to the server to stipulate its choice.</li>
  <li style="text-align: justify;"><strong>DHCP Ack :</strong> response from the server that acknowledges receiving the choice of the client's <strong>IP adress</strong>. This frame also contains the <strong>subnet</strong> and the duration of the <strong>allocated lease</strong>. It also includes the <strong>gateway</strong>, <strong>DNS</strong> servers and <strong>WINS</strong> servers.</li>
</ul>

### Pre-requisites
<p style="text-align: justify;">Here are the minimum prerequisites for a server that host the DHCP role.</p>

| Hardware     | Specification |
|---------     | ----------- |
| **CPU :** | 1.4 GHz 64-bit |
| **Memory :** | 2048Mo (512Mo for the core version) |
| **Hard disk :** | 32Go disk space |
| **Network :** | A network connection |

## Installation of the DHCP role

<p style="text-align: justify;">Opent the <strong>"Server Manager"</strong>.</p>
<p style="text-align: justify;">Click on <strong>"Manage"</strong>, and click on <strong>"Add Roles and Features"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_10_33-1.png" class="align-center">

<p style="text-align: justify;"><strong>Defore You Begin :</strong> the page displays a small reminder of the pre-requisites before installing a role. If you don't want this page to appear anymore, check the case <strong>"Skip this page by default"</strong> and click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_11_55-1.png" class="align-center">

<p style="text-align: justify;"><strong>Select installation type :</strong> we want to install the role on the server in question, leave the default choice and click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_12_19-1.png" class="align-center">

<p style="text-align: justify;"><strong>Select destination server :</strong> the default choice automatically selects our server and click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_12_35-1.png" class="align-center">

<p style="text-align: justify;"><strong>Select server roles :</strong> in the list of roles, select <strong>"DHCP Server"</strong>. A window appears listing all the features, click on <strong>"Add Features"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_13_13-1.png" class="align-center">

<p style="text-align: justify;"><strong>Select server roles :</strong> the role has been selected, click on <strong>"Next >"</strong></p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_13_32-1.png" class="align-center">

<p style="text-align: justify;"><strong>Select features :</strong> we do not need to select any additional features, just click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_13_48-1.png" class="align-center">

<p style="text-align: justify;"><strong>DHCP Server :</strong> a reminder of the function of the DHCP server. Click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_14_06-1.png" class="align-center">

<p style="text-align: justify;"><strong>Confirm installation selections :</strong> the wizard lists the roles and features that will be installed, click on <strong>"Install"</strong></p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_14_23-1.png" class="align-center">

<p style="text-align: justify;"><strong>Installation progress :</strong> the installation is now complete. We are going to go to the configuration, click on <strong>"Close"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_15_33-1.png" class="align-center">


## Post-deployment configuration

<p style="text-align: justify;">Open the <strong>"Server Manager"</strong>, at the top right click on the small flag. Click on <strong>"Compete DHCP configuration"</strong>.</p>

<img src="{{ site.baseurl }}/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_15_53-1.png" class="align-center">

<p style="text-align: justify;"><strong>Description :</strong> the wizard describes the nature of the operations, click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_17_53-1.png" class="align-center">

<p style="text-align: justify;"><strong>Authorization :</strong> here we will select the user authorized to manage the DHCP role. <br>Click on <strong>"Commit"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_18_11-1.png" class="align-center">

<p style="text-align: justify;"><strong>Summary :</strong> to finish the post-deployment, wizard creates two groups in <strong>"l'Active Directory"</strong> :
<ul>
  <li><strong>DHCP Administrators :</strong> group giving access to the management of the <strong>"DHCP Service"</strong>.</li>
  <li><strong>DHCP Users :</strong> group giving read-only access to the <strong>"DHCP service"</strong>.</li>
</ul>  
Click on <strong>"Close"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_18_32-1.png" class="align-center">


## DHCP server configuration

<p style="text-align: justify;">Open the <strong>"Server Manager"</strong>, at the top right click on <strong>"Tools"</strong>. In the list, click on <strong>"DHCP"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_19_49-1.png" class="align-center">

<p style="text-align: justify;">Click on <strong>"IPV4"</strong>. Click on <strong>"New Scope..."</strong> to add a new scope.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_21_20-1.png" class="align-center">

<p style="text-align: justify;"><strong>New Scope Wizard :</strong> click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_21_47-1.png" class="align-center">

<p style="text-align: justify;"><strong>Scope Name :</strong> fill in the <strong>"Name :"</strong> field with the name of your scope. Then click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_22_24-1.png" class="align-center">

<p style="text-align: justify;"><strong>IP Address Range :</strong> define the address range you want to assign, ex: <strong>"192.168.10.50"</strong> <strong>"192.168.10.60"</strong>. Then choose a subnet, ex: <strong>subnet</strong>, ex : <strong>"255.255.255.0"</strong>. Click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_23_26-1.png" class="align-center">

<p style="text-align: justify;"><strong>Add Exclusions and Delay :</strong> in this part it is possible to exclude one or more addresses from the address range. Click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_23_48-1.png" class="align-center">

<p style="text-align: justify;"><strong>Lease Duration :</strong> here you can specify the duration of the lease. Click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_24_09-1.png" class="align-center">

<p style="text-align: justify;"><strong>Configure DHCP Options :</strong> select the option <strong>"Yes, I want to configure these options now"</strong>. Click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_24_26-1.png" class="align-center">

<p style="text-align: justify;"><strong>Router (Default Gateway) :</strong> fill in the <strong>"IP address"</strong> field with the IP address of the gateway <strong>"192.168.10.254"</strong>. Then click on <strong>"Add"</strong> and it will be added to the list below. <br>Click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_25_16-1.png" class="align-center">

<p style="text-align: justify;"><strong>Domain Name and DNS Servers :</strong> indicate the name of the <strong>"Parent domain :"</strong> ex : <strong>"corp.priv"</strong>. Fill in the <strong>"IP address"</strong> field with the IP address of the DNS server <strong>"192.168.10.1"</strong>. Then click on <strong>"Add"</strong>. Click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_25_41-1.png" class="align-center">

<p style="text-align: justify;"><strong>WINS Servers :</strong> fill in the <strong>"IP address"</strong> field with the IP address of the WINS server <strong>"192.168.10.254"</strong>. Then click on <strong>"Add"</strong>. Click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_26_13-1.png" class="align-center">

<p style="text-align: justify;"><strong>Active Scope :</strong> select the option <strong>"Yes, Iwant to active this scope now"</strong>. <br/>Click on <strong>"Next >"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_26_51-1.png" class="align-center">

<p style="text-align: justify;"><strong>Completing the New Scope Wizard :</strong> click on <strong>"Finish"</strong>.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_27_06-1.png" class="align-center">

<p style="text-align: justify;">The scope appears well in the window.</p>
<img src="{{ site.baseurl }}/assets/images/posts/2019-03-11-install-dhcp-server/2019-02-26-17_27_51-1.png" class="align-center">

<p style="text-align: justify;">There you go ! We now have a DHCP server. You can automatically get an IP address on your network.</p>