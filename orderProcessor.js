const amqp = require("amqplib")

async function processOrders() {
  try {
    // Connect to RabbitMQ server
    const connection = await amqp.connect("amqp://localhost")
    const channel = await connection.createChannel()

    // Declare a queue
    const queue = "order_queue"
    await channel.assertQueue(queue, { durable: true })

    console.log(" [*]  Waiting for orders... To exit, press CTRL+C")

    // Set up the consumer
    channel.consume(queue, (msg) => {
      if (msg !== null) {
        const order = JSON.parse(msg.content.toString())
        console.log(
          `Processing order ${order.orderId}: ${order.product} x ${order.quantity}`
        )
        // Simulate processing delay
        setTimeout(() => {
          console.log(`Order ${order.orderId} processed.`)
          channel.ack(msg)
        }, 1000) // 1-second delay
      }
    })
  } catch (error) {
    console.error("Failed to connect to RabbitMQ:", error)
  }
}

processOrders()
