# @ionos-cloud/n8n-nodes-ionos-cloud

This is an n8n community node for connecting with the Cloud API v6 of IONOS cloud.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)

[Operations](#operations)

[Credentials](#credentials)

[Compatibility](#compatibility)

[Usage](#usage)

[Resources](#resources)


## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

This node supports the following operations for IONOS Cloud API v6:

### Contract Resource
* **Get Many**: Retrieve contract information and resource limits

### Datacenter Resource
* **Create**: Create a new datacenter
* **Delete**: Delete a datacenter
* **Get**: Retrieve details of a specific datacenter
* **Get Many**: List all datacenters in your account
* **Update**: Modify datacenter properties

### Image Resource
* **Get**: Retrieve details of a specific image
* **Get Many**: List all available images (OS templates)

### IP Block Resource
* **Create**: Reserve a new IP block
* **Delete**: Release an IP block
* **Get**: Retrieve details of a specific IP block
* **Get Many**: List all reserved IP blocks

### Server Resource
* **Create**: Create a new server in a datacenter
* **Delete**: Delete a server
* **Get**: Retrieve details of a specific server including volumes, NICs etc
* **Get Many**: List all servers in a datacenter
* **Reboot**: Restart a server
* **Start**: Power on a server
* **Stop**: Power off a server
* **Update**: Modify server properties (cores, RAM, etc.)

### Snapshot Resource
* **Delete**: Delete a snapshot
* **Get**: Retrieve details of a specific snapshot
* **Get Many**: List all available snapshots
* **Update**: Modify snapshot properties

### Volume Resource
* **Create**: Create a new storage volume
* **Create Snapshot**: Create a snapshot of a volume
* **Delete**: Delete a volume
* **Get**: Retrieve details of a specific volume
* **Get Many**: List all volumes in a datacenter
* **Update**: Modify volume properties (size, type, etc.)

### LAN Resource
* **Create**: Create a new LAN in a datacenter
* **Delete**: Delete a LAN
* **Get**: Retrieve details of a specific LAN
* **Get Many**: List all LANs in a datacenter
* **Update**: Modify LAN properties

### NIC (Network Interface) Resource
* **Create**: Create a new network interface for a server
* **Delete**: Delete a network interface
* **Get**: Retrieve details of a specific network interface
* **Get Many**: List all network interfaces of a server
* **Update**: Modify network interface properties

### Firewall Rule Resource
* **Create**: Create a new firewall rule for a NIC
* **Delete**: Delete a firewall rule
* **Get**: Retrieve details of a specific firewall rule
* **Get Many**: List all firewall rules for a network interface
* **Update**: Modify firewall rule properties

### NAT Gateway Resource
* **Create**: Create a new NAT gateway
* **Delete**: Delete a NAT gateway
* **Get**: Retrieve details of a specific NAT gateway
* **Get Many**: List all NAT gateways in a datacenter
* **Update**: Modify NAT gateway properties

### Kubernetes Resource
* **Create**: Create a new Kubernetes cluster
* **Delete**: Delete a Kubernetes cluster
* **Get**: Retrieve properties of a Kubernetes cluster
* **Get Many**: List all Kubernetes clusters
* **Get Kubeconfig**: Get the kubeconfig file for a cluster
* **Update**: Modify Kubernetes cluster properties

### Node Pool Resource
* **Create**: Create a new node pool in a Kubernetes cluster
* **Delete**: Delete a node pool
* **Get**: Retrieve details of a specific node pool
* **Get Many**: List all node pools in a Kubernetes cluster
* **Update**: Modify node pool properties

### Location Resource
* **Get**: Retrieve details of a specific location
* **Get Many**: List all available locations

### Security Group Resource
* **Create**: Create a new security group
* **Delete**: Delete a security group
* **Get**: Retrieve details of a specific security group
* **Get Many**: List all security groups in a datacenter
* **Update**: Modify security group properties

### Load Balancer Resource (Classic)
* **Create**: Create a new classic load balancer
* **Delete**: Delete a load balancer
* **Get**: Retrieve details of a specific load balancer
* **Get Many**: List all load balancers in a datacenter
* **Update**: Modify load balancer properties

### Network Load Balancer Resource
* **Create**: Create a new network load balancer
* **Delete**: Delete a network load balancer
* **Get**: Retrieve details of a specific network load balancer
* **Get Many**: List all network load balancers in a datacenter
* **Update**: Modify network load balancer properties

### Application Load Balancer Resource
* **Create**: Create a new application load balancer
* **Delete**: Delete an application load balancer
* **Get**: Retrieve details of a specific application load balancer
* **Get Many**: List all application load balancers in a datacenter
* **Update**: Modify application load balancer properties


## Credentials

Nodes supports authentication using the [Cloud API Bearer token](https://docs.ionos.com/cloud/set-up-ionos-cloud/management/identity-access-management/token-manager)

## Compatibility

Tested againist n8n version 2.1.5

## Usage

### Authentication
* Create new credentials in n8n and select "Ionos Cloud: Cloud API".
* Provide the API token for authentication.

### Managing resources
* Add the "Ionos Cloud (Cloud API v6)" node and select the required Resource
* Choose the respective operation and configure the required fields

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [Ionos Cloud Documentation](https://docs.ionos.com/cloud)
