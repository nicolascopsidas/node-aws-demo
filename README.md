# Node AWS E-commerce Demo

A streamlined, event-driven e-commerce microservice demo using Node.js, TypeScript, AWS Serverless architecture (Lambda, EventBridge, Step Functions, SQS) and a Next.js frontend.

## Architecture Overview

This project demonstrates a focused e-commerce platform built with AWS serverless technologies:

- **Frontend**: Next.js application with TypeScript
- **Backend Services**:
  - Order Service: Manages order creation and processing
  - Product Service: Handles product catalog
  - Notification Service: Sends order confirmations

## Technical Stack

- **Language**: TypeScript/Node.js
- **Frontend**: Next.js, React, TailwindCSS
- **AWS Services**:
  - Lambda: Serverless compute
  - API Gateway: RESTful API endpoints
  - EventBridge: Event bus for service communication
  - Step Functions: Order processing workflow
  - SQS: Message queuing for notifications
  - DynamoDB: Product and order storage

## Project Structure

```text
├── backend/
│   ├── services/
│   │   ├── order-service/
│   │   ├── product-service/
│   │   └── notification-service/
│   ├── lib/
│   │   └── common/
│   └── events/
└── frontend/
    ├── pages/
    ├── components/
    └── services/
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- AWS CLI configured with appropriate credentials
- AWS SAM CLI

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/node-aws-demo.git
   cd node-aws-demo
   ```

2. Install dependencies for backend services

   ```bash
   cd backend
   npm install
   ```

3. Install dependencies for frontend

   ```bash
   cd frontend
   npm install
   ```

### Local Development

1. Start the backend services locally

   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend application

   ```bash
   cd frontend
   npm run dev
   ```

### Deployment

1. Deploy backend services to AWS

   ```bash
   cd backend
   npm run deploy
   ```

2. Deploy frontend to Vercel or AWS Amplify

   ```bash
   cd frontend
   npm run build
   npm run deploy
   ```

## Features

- Product browsing and searching
- Shopping cart functionality
- Order processing workflow
- Order notifications via email
- Basic product management

## Event-Driven Architecture

This demo showcases event-driven architecture using AWS services:

1. Order creation triggers an EventBridge event
2. Step Functions orchestrate the order processing workflow
3. SQS queues handle notification delivery

## License

MIT
