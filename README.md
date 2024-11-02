# Product Processing App

## Introduction

The **Product Processing App** is a basic web application that demonstrates how to use RabbitMQ for managing tasks, such as processing product orders. It allows users to submit an order with a product name and quantity, sends the order to a queue managed by RabbitMQ, and processes each order one at a time. This app shows how RabbitMQ can help manage tasks efficiently, even with multiple requests.

## Features

- **User Interface**: Allows users to enter product details and place orders.
- **Server**: Receives orders, queues them using RabbitMQ, and processes them in the background.
- **RabbitMQ**: Manages the order queue, ensuring reliable and organized task handling.

## System Setup

### Step 1: Install Docker

To use this app, you’ll need Docker to run RabbitMQ and manage containers.

1. [Download and install Docker](https://docs.docker.com/get-docker/) for your operating system.
2. Once installed, verify Docker is running by using:
   ```bash
   docker --version
   ```

### Step 2: Pull the RabbitMQ Docker Image

Download the RabbitMQ Docker image, which will host our message queue.

1. Open your terminal and start a RabbitMQ container:
   ```bash
   docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
   ```
2. Verify that RabbitMQ is running by visiting [http://localhost:15672](http://localhost:15672) in your browser. Use the default login (`guest` / `guest`).

### Step 3: Install Node.js

We’ll use Node.js to set up the server for the app. You can download it from the [official Node.js website](https://nodejs.org/).

1. Install Node.js, and verify by checking the version:
   ```bash
   node --version
   npm --version
   ```

### Step 4: Set Up the App

1. Clone the project repository or download the files to your local system.
2. In the project directory, install the necessary packages:
   ```bash
   npm install
   ```
3. Run the app:
   ```bash
    # Start the Express server
   node server.js
    # Start the order processor
   node processor.js
   ```

### Step 5: Access the App

1. Open your browser and go to [http://localhost:5000](http://localhost:3000).
2. Enter product details (name and quantity) and click **Place Order**. The app will send the order to RabbitMQ, where it will be queued and processed.

## Components

### User Interface (UI)

A simple webpage where users:

- Input product details.
- Place orders by clicking the button.
- Receive confirmation when their order is added to the queue.

### Server

The backend server:

- Connects to RabbitMQ.
- Receives orders and adds them to the queue.
- Processes orders from the queue sequentially.

### RabbitMQ

RabbitMQ manages the queue and stores each order until it’s processed. This ensures reliable task handling, especially with a high volume of orders.

## Conclusion

The **Product Processing App** uses RabbitMQ to manage tasks, showing how a message queue system can help process tasks reliably. The setup with Docker, Node.js, and RabbitMQ makes it a robust demonstration of task management with message queuing.
