# @ionos-cloud/n8n-nodes-ionos-cloud

This is an n8n community node package for interacting with IONOS Cloud services.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

## Included Nodes

This package provides five separate nodes for different IONOS Cloud services:

1. **Ionos Cloud (Infrastructure)** - Core infrastructure management
2. **Ionos Cloud (Certificate Manager)** - SSL/TLS certificate management  
3. **Ionos Cloud (Cloud DNS)** - Domain name system management
4. **Ionos Cloud (CDN)** - Content delivery network management
5. **Ionos Cloud (AI Model Hub)** - AI model inference and RAG capabilities

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Usage](#usage)  
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Overview

| Node | Resources | Operations | Description |
|------|-----------|------------|-------------|
| **Infrastructure** | 20 | 145 | Complete infrastructure management (compute, networking, storage, Kubernetes) |
| **Certificate Manager** | 3 | 15 | SSL/TLS certificate lifecycle management with ACME support |
| **Cloud DNS** | 7 | 28 | DNS zones, records (15 types), DNSSEC, zone transfers |
| **CDN** | 2 | 7 | Content delivery with custom routing and geo-restrictions |
| **AI Model Hub** | 3 | 15 | Foundation model inference with RAG capabilities |
| **Total** | **35** | **210** | |

<details>
<summary><b>Infrastructure - Detailed Operations</b></summary>

#### Account & Global Resources (9 operations)
- **Contract** (1): Get Many
- **Location** (2): Get, Get Many
- **Image** (2): Get, Get Many  
- **IP Block** (4): Create, Delete, Get, Get Many

#### Core Infrastructure (10 operations)
- **Datacenter** (5): Create, Delete, Get, Get Many, Update
- **LAN** (5): Create, Delete, Get, Get Many, Update

#### Compute Resources (41 operations)
- **Server** (21): Attach/Detach CDROM/Volume, Create, Delete, Get (+ CDROM/CDROMs/Volume/Volumes/Remote Console/Token), Get Many, Reboot, Resume, Start, Stop, Suspend, Update, Upgrade
- **Volume** (6): Create, Create Snapshot, Delete, Get, Get Many, Update
- **Snapshot** (4): Delete, Get, Get Many, Update
- **NIC** (5): Create, Delete, Get, Get Many, Update
- **Firewall Rule** (5): Create, Delete, Get, Get Many, Update

#### Kubernetes (11 operations)
- **Kubernetes Cluster** (6): Create, Delete, Get, Get Many, Get Kubeconfig, Update
- **Node Pool** (5): Create, Delete, Get, Get Many, Update

#### Networking (34 operations)
- **Private Cross-Connect** (5): Create, Delete, Get, Get Many, Update
- **Load Balancer** (9): Attach/Detach NIC, Create, Delete, Get (+ Balanced NIC/NICs), Get Many, Update
- **Network Load Balancer** (5): Create, Delete, Get, Get Many, Update
- **Application Load Balancer** (5): Create, Delete, Get, Get Many, Update
- **Target Group** (5): Create, Delete, Get, Get Many, Update
- **NAT Gateway** (5): Create, Delete, Get, Get Many, Update

#### Security (5 operations)
- **Security Group** (5): Create, Delete, Get, Get Many, Update

</details>

<details>
<summary><b>Certificate Manager - Detailed Operations</b></summary>

#### Certificate Resource (5 operations)
Upload and manage SSL/TLS certificates manually with full chain and private key support.
- Create, Delete, Get, Get Many, Update

#### AutoCertificate Resource (5 operations)
Configure automatic certificate renewal via ACME providers (Let's Encrypt, etc.).
- Create, Delete, Get, Get Many, Update
- **Key Algorithms**: RSA (2048/4096), ECDSA (256/384)
- **Features**: Subject Alternative Names (SANs), common name, provider selection

#### Provider Resource (5 operations)
Configure ACME certificate providers with External Account Binding (EAB) support.
- Create, Delete, Get, Get Many, Update

</details>

<details>
<summary><b>Cloud DNS - Detailed Operations</b></summary>

#### Zone Resource (5 operations)
Manage primary DNS zones.
- Create, Delete, Get, Get Many, Update

#### Record Resource (5 operations)
Manage DNS records with 15 supported types: A, AAAA, ALIAS, CAA, CNAME, DS, HTTPS, MX, NS, SMIMEA, SRV, SSHFP, SVCB, TLSA, TXT
- Create, Delete, Get, Get Many, Update

#### SecondaryZone Resource (7 operations)
Secondary zones with AXFR (zone transfer) support.
- Create, Delete, Get, Get Many, Update, AXFR Get, AXFR Start

#### ZoneFile Resource (2 operations)
Import/export zones in BIND format (RFC 1035).
- Get (export), Update (import)

#### Quota Resource (1 operation)
View DNS resource usage and limits.
- Get

#### DNSSEC Resource (3 operations)
Enable and manage DNSSEC for zones.
- Create (enable), Delete (disable), Get

#### ReverseRecord Resource (5 operations)
Manage reverse DNS (PTR) records for IPv4/IPv6.
- Create, Delete, Get, Get Many, Update

</details>

<details>
<summary><b>CDN - Detailed Operations</b></summary>

#### Distribution Resource (5 operations)
Configure CDN distributions with custom routing rules.
- Create, Delete, Get, Get Many, Update
- **Features**: Domain routing, SSL/TLS integration, HTTP/HTTPS schemes, geo-restrictions, upstream origins

#### Ip Resource (2 operations)
Get CDN edge server IPs for origin whitelisting.
- Get, Get Many

</details>

<details>
<summary><b>AI Model Hub - Detailed Operations</b></summary>

#### Model Resource (2 operations)
Browse and invoke foundation models for AI inference.
- Get Many (list available models), Predict (run inference)
- **Features**: RAG support via collection queries, custom model options, streaming responses

#### Collection Resource (6 operations)
Manage vector database collections for document storage and retrieval.
- Create, Delete, Get, Get Many, Update, Query
- **Features**: Chunking strategies (sentence/fixed/recursive), embedding models, database types (chromadb/pgvector), semantic search

#### Document Resource (7 operations)
Manage documents within collections for RAG applications.
- Add, Delete, Delete All, Get, Get Many, Get Chunks, Update
- **Features**: Base64 content encoding, metadata management, chunk retrieval, batch operations

</details>

---

## Credentials

All nodes in this package share a single credential type: **Ionos Cloud API**

Authentication uses the [Cloud API Bearer token](https://docs.ionos.com/cloud/set-up-ionos-cloud/management/identity-access-management/token-manager).

The same token works across all IONOS Cloud services (Infrastructure, Certificate Manager, DNS, CDN, and AI Model Hub).

## Compatibility

Tested against n8n version 2.1.5+

## Usage

### Authentication
1. Create new credentials in n8n and select "Ionos Cloud API"
2. Provide your API token (generated from IONOS Cloud Console)
3. The same credential works for all five nodes

### Using the Nodes

#### Infrastructure
* Add the "Ionos Cloud (Infrastructure)" node to your workflow
* Select the resource (e.g., Server, Volume, Datacenter)
* Choose the operation and configure the required fields

#### Certificate Manager
* Add the "Ionos Cloud (Certificate Manager)" node to your workflow
* Select the resource (Certificate, AutoCertificate, or Provider)
* Configure certificate properties, domains, and ACME providers

#### DNS
* Add the "Ionos Cloud (Cloud DNS)" node to your workflow
* Select the resource (Zone, Record, SecondaryZone, etc.)
* Configure DNS zones, records, and DNSSEC settings

#### CDN
* Add the "Ionos Cloud (CDN)" node to your workflow
* Select the resource (Distribution or Ip)
* Configure CDN distributions with routing rules and upstream origins

#### AI Model Hub
* Add the "Ionos Cloud (AI Model Hub)" node to your workflow
* Select the resource (Model, Collection, or Document)
* Use Model for AI inference, Collection for vector storage, Document for RAG applications

### Common Patterns

**Automated SSL Certificate Deployment:**
1. Use Certificate Manager to create an AutoCertificate
2. Use CDN node to create a Distribution referencing the certificate ID
3. Automate certificate renewal with n8n scheduling

**Infrastructure Provisioning:**
1. Use Infrastructure node to create Datacenter, Server, and Volume
2. Use DNS node to create Zone and A/AAAA Records pointing to server IPs
3. Use Certificate Manager to provision SSL certificates for domains

**DNS Management:**
1. Use DNS Zone resource to create zones
2. Use Record resource to manage DNS records (A, CNAME, MX, TXT, etc.)
3. Use DNSSEC resource to enable DNSSEC signing
4. Use ReverseRecord for PTR records

**AI-Powered Applications with RAG:**
1. Use AI Model Hub Collection resource to create a vector database
2. Use Document resource to add knowledge base documents
3. Use Model Predict operation with collection query for context-aware responses
4. Automate document updates and model inference in workflows

## API Endpoints

Each node connects to a different IONOS Cloud API endpoint:

- **Infrastructure**: `https://api.ionos.com/cloudapi/v6/`
- **Certificate Manager**: `https://certificate-manager.de-fra.ionos.com`
- **Cloud DNS**: `https://dns.de-fra.ionos.com`
- **CDN**: `https://cdn.de-fra.ionos.com`
- **AI Model Hub**: `https://inference.de-txl.ionos.com`

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [IONOS Cloud Documentation](https://docs.ionos.com/cloud)
* [Infrastructure API Documentation](https://api.ionos.com/docs/cloud/v6/)
* [Certificate Manager API Documentation](https://api.ionos.com/docs/certmanager/v2/)
* [Cloud DNS API Documentation](https://api.ionos.com/docs/dns/v1/)
* [CDN API Documentation](https://api.ionos.com/docs/cdn/v1/)
* [AI Model Hub API Documentation](https://api.ionos.com/docs/inference-modelhub/v1/)

## Version History

**v0.1.0** - Initial release
- Infrastructure node (20 resources, 110 operations)
- Certificate Manager node (3 resources, 15 operations)
- DNS node (7 resources, 36 operations)
- CDN node (2 resources, 7 operations)
- AI Model Hub node (3 resources, 15 operations)
- Total: 210 operations across 35 resources
