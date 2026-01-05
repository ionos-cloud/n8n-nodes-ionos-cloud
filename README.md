# @ionos-cloud/n8n-nodes-cloud-api

This is an n8n community node for connecting with the Cloud API v6 of IONOS cloud.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

This node supports the following operations for IONOS Cloud API v6:
or IONOS Cloud API v6:

### Contract Resources
* **Get Contract**: Retrieve contract information and resource limits

### Server Resources
* **List Servers**: Get all servers in a data center
* **Get Server**: Retrieve details of a specific server including volumes, NICs etc
* **Start Server**: Power on a server
* **Stop Server**: Power off a server
* **Reboot Server**: Restart a server


## Credentials

Nodes supports authentication using the [Cloud API Bearer token](https://docs.ionos.com/cloud/set-up-ionos-cloud/management/identity-access-management/token-manager)

## Compatibility

Tested againist n8n version 2.1.5

## Usage

### Authentication
* Create new credentials in n8n and select "Ionos Cloud: Cloud API".
* Provide the API token for authentication.

### Managing VMs
* Add the "Ionos Cloud (Cloud API v6)" node and select "Server" as Resource
* Choose the respective operation and configure the required fields

### Fetch Contract and Quota details
* Add the "Ionos Cloud (Cloud API v6)" node and select "Contract" as Resource
* Choose the "Get Many" operation 

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [Ionos Cloud Documentation](https://docs.ionos.com/cloud)
