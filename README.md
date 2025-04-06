# Load Balanced Hash Service

A scalable and performant text hashing web service with load balancing capabilities.

## Project Overview

This project implements a distributed hash computing service that can handle high loads by distributing requests across multiple server instances. The service provides multiple hashing algorithms (MD5, SHA-256, and Argon2) and uses Nginx as a load balancer to ensure optimal resource utilization and fault tolerance.

## API Endpoints

### Hash Text

```
POST /api/hash
```

**Request Body:**

```json
{
  "text": "string to hash",
  "algorithm": "md5" | "sha256" | "argon2" (optional, defaults to sha256)
}
```

**Response:**

```json
{
  "original": "string to hash",
  "algorithm": "sha256",
  "hash": "hash_result_string",
  "processingTimeMs": 1.23
}
```

### Server Info

```
GET /api/info
```

**Response:**

```json
{
  "serverId": "server1",
  "port": 3001,
  "supportedAlgorithms": ["md5", "sha256", "argon2"]
}
```

### Health Check

```
GET /health
```

**Response:**

```json
{
  "status": "healthy"
}
```

## Setup Instructions

### Prerequisites

- Node.js 18 or higher
- pnpm

### Installation

1. Clone the repository:

```bash
git clone git@github.com:themojilla/load-balanced-hash-service.git
cd load-balanced-hash-service
```

2. Install dependencies:

```bash
pnpm install
```

3. Build the TypeScript code:

```bash
pnpm build:ts
```

### Running the Server

```bash
# Development mode
pnpm dev

# Production mode
pnpm build:ts
pnpm start
```

_Note: Multiple server instance configuration will be added in a future implementation._
