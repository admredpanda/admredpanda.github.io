var store = [{
        "title": "How to install a domain controller Active Directory on Windows Server",
        "excerpt":"Active Directory is the LDAP directory for the Windows system, it contains Objets of differents types like user, computers, organization unit (OU), servers or printers. It allows you manage the essential functions of identification and authentication. It also allows the attribution and application of strategies. Active Directory relies on the...","categories": ["Active Directory"],
        "tags": ["Windows","Windows Server","Microsoft","AD","Active Directory","AD DS","Active Directory Domain Services","DNS","Domain Name System","LDAP","Lightweight Directory Access Protocol","Server","Security","Authentication","Identification","User","Group","OU","Organizational Unit","SYSVOL","NetBIOS","Global Catalog","GC","Forest","Domain","Domain Controller","DC","Schema Master","Domain Naming Master","PDC Emulator","RID Master","Infrastructure Master","Sites","FSMO","Flexible Single Master Operation"],
        "url": "http://localhost:4000/active%20directory/install-active-directory/",
        "teaser":"http://localhost:4000/assets/images/posts/2019-02-22-install-active-directory/logo-ad-444x240.png"},{
        "title": "How to install a DHCP server on Windows Server",
        "excerpt":"Dynamic Host Configuration Protocol (DHCP) is a network protocol that enables automatic configuration of client IP settings by automatically distributing an IP address and subnet mask. It can also configure the gateway, DNS servers and WINS servers. DHCP messages are transmitted through the UDP protocol, the client uses port 68...","categories": ["DHCP"],
        "tags": ["DHCP","Dynamic Host Configuration Protocol","DHCP Server","Windows Server","Windows","Microsoft","Server","Discover","Offer","Request","Ack","IP","IPv4","IP address","Internet Protocol","Scope","Subnet","Subnet mask","Mask","Default Gateway","Gateway","DNS","Domain Name System","WINS","Windows Internet Naming Service","WINS Server","Reservations","Address","Address Pool","Router"],
        "url": "http://localhost:4000/dhcp/install-dhcp-server/",
        "teaser":"http://localhost:4000/assets/images/posts/2019-03-11-install-dhcp-server/logo-dhcp-444x240.png"},{
        "title": "How to install Microsoft SQL Server 2016",
        "excerpt":"SQL server designates a database server. The definition of the SQL server is closely linked to that of SQL (Structured Query Language), a computer language that allows databases to be exploited. Microsoft SQL Server allows the operation of SQL and can create tables in a relational database, as well as...","categories": ["SQL"],
        "tags": ["Windows","SQL","SQL Server","SQL Server 2016","Microsoft","Server","Structured Query Language","RDBMS","Relational Database Management System","Language SQL","Powershell",".NET Framework 3.5",".NET Framework 4.6","Stand-alone","Microsoft Update","Database Engine Services","Reporting Services","Instance","SQL Server Agent","SQL Server Database Engine","SQL Server Reporting Services","Microsoft SQL Server Management Studio","SSMS","SQL Server Management Studio","Authentification","Databases"],
        "url": "http://localhost:4000/sql/install-sql-server-2016/",
        "teaser":"http://localhost:4000/assets/images/posts/2019-03-26-install-sql-server-2016/logo-sql-444x240.png"},{
        "title": "Create a FakeCompany with Powershell",
        "excerpt":"While fessing tests in my lab, I got tired of creating users User01 groups, etc ... So I decided to create a script Powershell to create a similar structure to that of a company, allowing me to automatically create OUs, users, groups, computers, from a CSV file. Company scheme Working...","categories": ["Powershell"],
        "tags": ["Windows","Windows Server","Microsoft","AD","Active Directory","PS","Powershell","User","Group","OU","Organizational Unit","Computer","CSV","Comma-Separated Values","Company","Fake","FakeCompany","Powershell Module","Module","Github","Repository","Repo"],
        "url": "http://localhost:4000/powershell/powershell-create-fakecompany/",
        "teaser":"http://localhost:4000/assets/images/posts/2019-06-02-powershell-create-fakecompany/logo-fakecompany-444x240.png"},{
        "title": "How to install the prerequisites for System Center Configuration Manager",
        "excerpt":"System Center Configuration Manager (SCCM) is a system management software published by Microsoft. It is intended for the management of large computer parks. It allows: remote hand-taking, management and deployment of updates and patches, automation of tasks, cable applications, hardware and software inventory, compliance management, security policies, the deployment of...","categories": ["SCCM"],
        "tags": ["AD","Active Directory","Windows","Windows Server","Microsoft","Security","Services","Server","SCCM","System Center","Configuration Manager","System Center Configuration Manager","ADSI","Active Directory Service Interfaces","Delegate Control","Computer","User","Active Directory Schema","BITS","RDC",".NET Framework 3.5",".NET Framework 4.5","Web Server","ADK","Assessment and Deployment Kit","Windows Assessment and Deployment Kit","USMT","User State Migration Tool","WinPE","Windows Pre-installation Environment","SQL Server","Structured Query Language"],
        "url": "http://localhost:4000/sccm/sccm-install-prerequisites/",
        "teaser":"http://localhost:4000/assets/images/posts/posts/2019-06-05-sccm-install-prerequisites/logo-sccm-444x240.png"},{
        "title": "How to install System Center Configuration Manager",
        "excerpt":"System Center Configuration Manager (SCCM) is a system management software published by Microsoft. It is intended for the management of large computer parks. It allows: remote control, management and deployment of updates and patches, automation of tasks, remote distribution of applications, hardware and software inventory, compliance management, administration of security...","categories": ["SCCM"],
        "tags": ["Windows Server","Microsoft","Services","Server","SCCM","System Center","Configuration Manager","System Center Configuration Manager","Site","Site Name","Primary Site","Language","Stand-alone","FQDN","Fully qualified domain name","Database","SMS","Systems Management Server","Site System Roles","Connection Point","SQL Server"],
        "url": "http://localhost:4000/sccm/sccm-install/",
        "teaser":"http://localhost:4000/assets/images/posts/2019-06-15-sccm-install/logo-sccm-444x240.png"},{
        "title": "Create a application with Powershell in System Center Configuration Manager",
        "excerpt":"When integrating applications into System Center Configuration Manager, it can be complicated to create uniformly applications that all have different parameters and specificities. The developed script allows to meet this need and to establish a silimar integration process for applications. Application packaging is developed with the PSAppDeployToolkit utility, which allows...","categories": ["Powershell"],
        "tags": ["Windows","Microsoft","Powershell","PS","SCCM","System Center","Configuration Manager","System Center Configuration Manager","Application","Github","Repository","Repo","PSAppDeployToolkit","XML","Extensible Markup Language","Deployment Type","DP","Distribution Point","AD","Active Directory","Group","User","Collection","Device","Device Collection","User Collection","Function","Module","Package"],
        "url": "http://localhost:4000/powershell/powershell-create-sccm-application/",
        "teaser":"http://localhost:4000/assets/images/posts/2020-11-08-powershell-create-sccm-application/logo-sccm-application-444x240.png"},{
        "title": "How to configure Discovery Methods in System Center Configuration Manager",
        "excerpt":"Configuration manager's discovery methods allow several Active Directory objects or network resources to be imported into SCCM automatically. In the following article, I will detail the following methods of discovery : Active Directory Forest Discovery, Active Directory Group Discovery, Active Directory System Discovery, Active Directory Users Discovery. Before starting You...","categories": ["SCCM"],
        "tags": ["SCCM","System Center","Configuration Manager","System Center Configuration Manager","Windows","Windows Server","Microsoft","Active Directory","LDAP","Lightweight Directory Access Protocol","Forest","User","Users","Group","Groups","Discovery","Discovery Methods","OU","Organizational Unit","Bondaries","Sites","Sites Active Directory","Active Directory Forest","Active Directory Forest Discovery","Active Directory Group","Active Directory Group Discovery","Active Directory System","Active Directory System Discovery","Active Directory Users","Active Directory Users Discovery"],
        "url": "http://localhost:4000/sccm/sccm-configure-discovery-methods/",
        "teaser":"http://localhost:4000/assets/images/posts/2020-11-22-sccm-configure-discovery-methods/logo-sccm-444x240.png"},{
        "title": "How to configure Boundary Groups in System Center Configuration Manager",
        "excerpt":"Boundary groups allow the logical organization of network locations. This allows clients to be directed to the nearest available SCCM server on the network. Boundary groups also increase availability by redirecting clients to another server in case of failure of the nearest server. Clients use a boundary groups for :...","categories": ["SCCM"],
        "tags": ["SCCM","System Center","Configuration Manager","System Center Configuration Manager","Windows","Windows Server","Microsoft","Boundaries","Boundary Group","Boundary Groups","Site system","Site system server","Site assignment","Site","Site Active Directory","Distribution Points","Software Update Points","State Migration Points","Management Points","Cloud Management Gateway","IP","Internet Protocol","IPv4","Active Directory Forest Discovery","Active Directory Forest"],
        "url": "http://localhost:4000/sccm/sccm-configure-boundary-groups/",
        "teaser":"http://localhost:4000/assets/images/posts/2020-11-24-sccm-configure-boundary-groups/logo-sccm-444x240.png"},{
        "title": "How to install and configure certificate authorities on Windows Server",
        "excerpt":"The Active Directory Certificate Service (AD CS) provides functionality for managing a Public Key Infrastructure (PKI) that manages identities and other security features on the Windows domain. It can create, validate, and revoke public key certificates for an organization's internal uses. It is used for the security of the following...","categories": ["Active Directory"],
        "tags": ["PKI","Public Key Infrastructure","Authoritie","Authorities","Certificate Authoritie","Certificate Authorities","CA","Certificate","Certificate Services","AD CS","Active Directory Certificate Services","AD","Active Directory","Windows","Windows Server","Microsoft","Security","Services","Server"],
        "url": "http://localhost:4000/active%20directory/install-configure-certificate-authorities/",
        "teaser":"http://localhost:4000/assets/images/posts/2020-11-26-install-configure-certificate-authorities/logo-ad-cs-444x240.png"},{
        "title": "How to to configure HTTPS communication mode in System Center Configuration Manager",
        "excerpt":"In SCCM natively, communications between clients and servers, and between servers is not secure. System Center Configuration Manager allows to rely on a Public Key Infrastructure (PKI) to secure an enterprise Certification Authority (CA). This mechanism may be required for security reasons in the implementation of a Cloud Management Gateway...","categories": ["SCCM"],
        "tags": ["PKI","Public Key Infrastructure","Authoritie","Authorities","Certificate Authoritie","Certificate Authorities","CA","Certificate","Certificate Services","AD CS","Active Directory Certificate Services","AD","Active Directory","Windows","Windows Server","Microsoft","Security","Services","Server","SCCM","System Center","Configuration Manager","System Center Configuration Manager"],
        "url": "http://localhost:4000/sccm/sccm-how-to-configure-HTTPS-communication/",
        "teaser":"http://localhost:4000/assets/images/posts/2020-12-05-sccm-how-to-configure-https-communication/logo-sccm-444x240.png"},{
        "title": "How to synchronize Active Directory with Azure Active Directory",
        "excerpt":"Azure Active Directory (Azure AD) is Microsoft’s cloud-based identity and access management service. It allows your employees to connect and access the following resources such as Microsoft 365, Azure portal, SaaS applications. In particular, it makes it possible to set up a single and simplified authentication for access to company...","categories": ["Azure"],
        "tags": ["Azure","Azure AD","Azure Active Directory","Azure AD DS","Azure AD Domain Services","Azure Active Directory Domain Services","AD","Active Directory","Windows","Windows Server","Microsoft","Security","Services","Server","MFA","Multi-Factor Authentication","IAM","Identity and Access Management","LDAP","Lightweight Directory Access Protocol","SAML","OAuth","OpenID","WS-Federation","Domain Controller","Azure AD Connect","unicodePwd","MS-DRSR","MD4","MD5","MD5CryptoServiceProvider","SHA256","TLS","UPN","User Principal Name","Identity","DNS","Domain","Powershell"],
        "url": "http://localhost:4000/azure/azure-sync-ad-with-azure-ad/",
        "teaser":"http://localhost:4000/assets/images/posts/2020-12-16-azure-sync-ad-with-azure-ad/logo-azure-ad-444x240.png"}]