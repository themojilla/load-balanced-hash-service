# Load Balanced Hash Service

A high-performance, scalable text hashing web service with automatic load balancing capabilities.

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
- Node.js 22+ (for local development)
- pnpm (for local development)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/themojilla/load-balanced-hash-service.git
cd load-balanced-hash-service
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

#### View logs:

```bash
# All containers
docker-compose logs -f

# Specific container
docker-compose logs -f nginx
docker-compose logs -f hash-server-1
```

#### Stop all containers:

```bash
docker-compose down
```

#### Rebuild after code changes:

```bash
docker-compose up -d --build
```

### Development Mode

For local development without Docker:

```bash
pnpm install
pnpm dev
```

## Performance Testing

The project includes a comprehensive performance testing suite that evaluates the service's behavior under various load conditions.

### Running Performance Tests

Run all tests with a single command:

```bash
pnpm build:ts
pnpm test:all
```

This executes:

1. **High Concurrency Test**: Tests the service with 100 concurrent connections
2. **Stress Test**: Progressively increases load from 50 to 1000 connections

### Test Results

The tests measure:

- Requests per second
- Average latency
- P99 latency (99th percentile)
- Error rate
- Total number of requests
- Number of timeouts

### Manual Testing with Autocannon

You can also run custom load tests:

```bash
# Basic test
npx autocannon -c 100 -d 10 -m POST \
  -b '{"text":"test string","algorithm":"sha256"}' \
  -H "Content-Type: application/json" \
  http://localhost:8080/api/hash

# Test with Argon2 (CPU intensive)
npx autocannon -c 50 -d 20 -m POST \
  -b '{"text":"test string","algorithm":"argon2"}' \
  -H "Content-Type: application/json" \
  http://localhost:8080/api/hash
```

## Load Balancing Strategy

The Nginx load balancer uses a round-robin strategy to distribute requests evenly across the three hash service instances. Each server is given equal weight, ensuring balanced resource utilization.
