<div align="center">

<img src="./credentials/ionos.svg" alt="IONOS Cloud" height="80" />&nbsp;&nbsp;&nbsp;&nbsp;<picture><source media="(prefers-color-scheme: dark)" srcset="https://n8n.io/brandguidelines/logo-white.svg"><source media="(prefers-color-scheme: light)" srcset="https://n8n.io/brandguidelines/logo-dark.svg"><img src="https://n8n.io/brandguidelines/logo-dark.svg" alt="n8n" height="80" /></picture>

# n8n Nodes for IONOS Cloud

[![npm version](https://img.shields.io/npm/v/@ionos-cloud/n8n-nodes-ionos-cloud.svg)](https://www.npmjs.com/package/@ionos-cloud/n8n-nodes-ionos-cloud)
[![License](https://img.shields.io/npm/l/@ionos-cloud/n8n-nodes-ionos-cloud.svg)](https://github.com/ionos-cloud/n8n-nodes-ionos-cloud/blob/master/LICENSE)
[![npm downloads](https://img.shields.io/npm/dm/@ionos-cloud/n8n-nodes-ionos-cloud.svg)](https://www.npmjs.com/package/@ionos-cloud/n8n-nodes-ionos-cloud)
[![n8n](https://img.shields.io/badge/n8n-community-blue.svg)](https://n8n.io)
![Official](https://img.shields.io/badge/IONOS%20Cloud-Official-00BFFF.svg)

**Official IONOS Cloud n8n community nodes**

Automate your cloud infrastructure, DNS, CDN, certificates, and AI workflows with [n8n](https://n8n.io/)

[Installation](#installation) • [Operations](#operations) • [Credentials](#credentials) • [Usage](#usage) • [Examples](#common-patterns) • [Resources](#resources)

</div>

---

## Overview

This is the **official** n8n community node package for IONOS Cloud, developed and maintained by the IONOS Cloud team. [n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

The package provides comprehensive integration with key IONOS Cloud services, enabling you to automate infrastructure provisioning, certificate management, DNS operations, CDN distribution, and AI-powered workflows directly from n8n.

## Included Nodes

This package provides five separate nodes for different IONOS Cloud services:

1. **Ionos Cloud (Infrastructure)** - Core infrastructure management
2. **Ionos Cloud (Certificate Manager)** - SSL/TLS certificate management  
3. **Ionos Cloud (Cloud DNS)** - Domain name system management
4. **Ionos Cloud (CDN)** - Content delivery network management
5. **Ionos Cloud (AI Model Hub)** - AI model inference and RAG capabilities

---

## Getting Started

### Prerequisites

Before you begin, you will need:

1. A [IONOS Cloud account](https://www.ionos.com/enterprise-cloud/signup)
2. A Cloud API Bearer token (generate from [IONOS Cloud Console](https://dcd.ionos.com/) → DCD → User → Tokens)
3. n8n installed (version 2.1.5 or higher)

### Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

#### Quick Installation Steps

1. Go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `@ionos-cloud/n8n-nodes-ionos-cloud` in **Enter npm package name**
4. Agree to the risks of using community nodes
5. Select **Install**

**Note:** After installation, you may need to restart your n8n instance for the new node to be recognized.

## Operations

### Overview

| Node | Resources | Operations | Description |
|------|-----------|------------|-------------|
| **Infrastructure** | 20 | 145 | Complete infrastructure management (compute, networking, storage, Kubernetes) |
| **Certificate Manager** | 3 | 15 | SSL/TLS certificate lifecycle management with ACME support |
| **Cloud DNS** | 7 | 28 | DNS zones, records (15 types), DNSSEC, zone transfers |
| **CDN** | 2 | 7 | Content delivery with custom routing and geo-restrictions |
| **AI Model Hub** | 4 | 20 | Foundation model inference, RAG capabilities, and OpenAI-compatible API |

> **✨ v1.0.0**: First stable release with comprehensive support for the included IONOS Cloud services.


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

#### OpenAI Compatible Resource (5 operations)
Use OpenAI-compatible API endpoints for standardized AI interactions.

**Chat Completion** - Create chat completions with message history
- Supports system, user, and assistant message roles
- Parameters: model, messages (required), temperature, top_p, max_tokens, max_completion_tokens, n, stream, stop, presence_penalty, frequency_penalty, logit_bias, response_format, tools, tool_choice, user
- Compatible with OpenAI chat completion API format

**Completion** - Simple text completion
- Parameters: model, prompt (required), temperature, top_p, max_tokens, n, stream, stop, presence_penalty, frequency_penalty, logit_bias, user
- Compatible with OpenAI completion API format

**Create Embeddings** - Generate vector embeddings from text
- Parameters: model (default: intfloat/e5-large-v2), input (single text or comma-separated multiple texts)
- Returns embedding vectors for semantic search and similarity

**Generate Image** - Text-to-image generation
- Parameters: model (default: stabilityai/stable-diffusion-xl-base-1.0), prompt (required), n, size (1024x1024, 1024x1792, 1792x1024), response_format (b64_json), user
- Generates images from text descriptions

**Get Many** - List available models
- Returns all models in OpenAI-compatible format
- Shows model capabilities and availability

**API Endpoint**: `https://openai.inference.de-txl.ionos.com` (path: `/v1/*`)

**Features**: Full OpenAI API compatibility, drop-in replacement for OpenAI in existing workflows, comprehensive parameter support

</details>

---

## Credentials

All nodes in this package share a single credential type: **Ionos Cloud API**

Authentication uses the [Cloud API Bearer token](https://docs.ionos.com/cloud/set-up-ionos-cloud/management/identity-access-management/token-manager).

The same token works across these IONOS Cloud services (Infrastructure, Certificate Manager, DNS, CDN, and AI Model Hub).

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
* Select the resource (Model, Collection, Document, or OpenAI Compatible)
* **Model**: AI inference with native IONOS API
* **Collection**: Vector database management for RAG
* **Document**: Manage documents in collections
* **OpenAI Compatible**: Use OpenAI-compatible endpoints (chat, completions, embeddings, images)

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

**OpenAI-Compatible AI Integration:**
1. Use OpenAI Compatible Chat Completion for conversational AI
2. Use Create Embeddings for semantic search and similarity
3. Use Generate Image for text-to-image generation
4. Drop-in replacement for OpenAI API in existing n8n workflowstabase
2. Use Document resource to add knowledge base documents
3. Use Model Predict operation with collection query for context-aware responses
4. Automate document updates and model inference in workflows

## API Endpoints

Each node connects to:

- **Infrastructure**: `https://api.ionos.com/cloudapi/v6/`
- **Certificate Manager**: `https://certificate-manager.de-fra.ionos.com`
- **Cloud DNS**: `https://dns.de-fra.ionos.com`
- **CDN**: `https://cdn.de-fra.ionos.com`
- **AI Model Hub (Inference API)**: `https://inference.de-txl.ionos.com`
- **AI Model Hub (OpenAI Compatible API)**: `https://openai.inference.de-txl.ionos.com`

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [IONOS Cloud Documentation](https://docs.ionos.com/cloud)
* [Infrastructure API Documentation](https://api.ionos.com/docs/cloud/v6/)
* [Certificate Manager API Documentation](https://api.ionos.com/docs/certmanager/v2/)
* [Cloud DNS API Documentation](https://api.ionos.com/docs/dns/v1/)
* [CDN API Documentation](https://api.ionos.com/docs/cdn/v1/)
* [AI Model Hub API Documentation](https://api.ionos.com/docs/inference-modelhub/v1/)
* [AI Model Hub OpenAI-compatible API Documentation](https://api.ionos.com/docs/inference-openai/v1/)

## Contributing

We welcome contributions! If you find a bug or have a feature request:

1. Check the [GitHub Issues](https://github.com/ionos-cloud/n8n-nodes-ionos-cloud/issues) to see if it's already been reported
2. Open a new issue with a clear description and reproduction steps
3. For feature requests, explain the use case and expected behavior

### Development

To contribute code:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes and test thoroughly
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📖 [Documentation](https://docs.ionos.com/cloud)
- 💬 [GitHub Issues](https://github.com/ionos-cloud/n8n-nodes-ionos-cloud/issues)
- 🌐 [IONOS Cloud](https://www.ionos.com/cloud)
- 📧 [Support](https://docs.ionos.com/cloud/support/general-information/contact-information)

---

<div align="center">

Made with ❤️ by the IONOS Cloud team

</div>
