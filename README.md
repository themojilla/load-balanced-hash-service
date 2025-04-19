# Load Balanced Hash Service

A scalable and performant text hashing web service with load balancing capabilities.

## Project Overview

This project implements a distributed hash computing service that can handle high loads by distributing requests across multiple server instances. The service provides multiple hashing algorithms (MD5, SHA-256, and Argon2) and uses Nginx as a load balancer to ensure optimal resource utilization and fault tolerance.

## Architecture

The system consists of:

1. **Multiple Hash Service Instances**: Independent Node.js servers running in separate Docker containers
2. **Load Balancer**: Nginx container that distributes incoming requests
3. **Common API Interface**: Consistent endpoints across all server instances
4. **Performance Monitoring**: Built-in timing for hash operations

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
  "port": 3000,
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

- Docker
- Docker Compose

### Installation

1. Clone the repository:

```bash
git clone https://github.com/themojilla/load-balanced-hash-service.git
cd load-balanced-hash-service
```

2. Create the necessary directory structure:

```bash
mkdir -p config/nginx
```

### Running with Docker

#### Start the entire stack:

```bash
docker-compose up -d
```

This will:

- Build the hash service image
- Start three hash service containers
- Start an Nginx container configured for load balancing
- Make the service available at http://localhost:8080

#### View logs from all containers:

```bash
docker-compose logs -f
```

#### View logs from a specific container:

```bash
docker-compose logs -f nginx
docker-compose logs -f hash-server-1
```

#### Stop all containers:

```bash
docker-compose down
```

#### Rebuild and restart containers after code changes:

```bash
docker-compose up -d --build
```

### Development Mode (without Docker)

For local development without Docker:

```bash
pnpm install
pnpm dev
```

### How the Docker Setup Works

The Docker Compose configuration sets up a complete environment with:

1. **Multiple Hash Service Instances**:

   - Three independent containers running your hash service
   - Each has a unique **SERVER_ID** for identification
   - All containers run in the same Docker network

2. **Nginx Load Balancer**:

   - Proxies requests to the three hash service instances
   - Uses round-robin load balancing by default
   - Configured with health checks and error handling
   - Maps port 8080 from your host to the Nginx container

3. **Docker Network**:
   - All containers run in a shared bridge network
   - Enables service discovery by container name
   - Isolates the application stack from other Docker services

## Performance Testing

### Load Testing with Autocannon

Run manual tests with autocannon against the Docker setup:

```bash
# Basic test
npx autocannon -c 100 -d 10 -m POST \
  -b '{"text":"test string","algorithm":"sha256"}' \
  -H "Content-Type: application/json" \
  http://localhost:8080/api/hash

# Testing with Argon2 (more CPU intensive)
npx autocannon -c 50 -d 20 -m POST \
  -b '{"text":"test string","algorithm":"argon2"}' \
  -H "Content-Type: application/json" \
  http://localhost:8080/api/hash
```
