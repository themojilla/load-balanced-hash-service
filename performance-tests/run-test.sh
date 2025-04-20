#!/bin/bash

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${YELLOW}Waiting for services to be ready...${NC}"
sleep 10

echo -e "${GREEN}Running High Concurrency Test...${NC}"
node dist/performance-tests/high-concurrency.js

echo -e "${YELLOW}Waiting before next test...${NC}"
sleep 10

echo -e "${GREEN}Running Stress Test...${NC}"
node dist/performance-tests/stress-test.js

echo -e "${GREEN}Tests completed!${NC}"
