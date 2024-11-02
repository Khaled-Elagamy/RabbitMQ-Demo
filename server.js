const express = require("express")
const amqp = require("amqplib")

const app = express()
app.use(express.json()) // Middleware to parse JSON request body
// Serve static files from the 'public' directory
app.use(express.static("./server/public"))

async function connectRabbitMQ() {
  try {
    // Connect to RabbitMQ server
    const connection = await amqp.connect("amqp://localhost")
    const channel = await connection.createChannel()

    // Declare a queue
    await channel.assertQueue("order_queue", { durable: true })

    return channel
  } catch (error) {
    console.error("Failed to connect to RabbitMQ:", error)
  }
}

let rabbitChannel
// Initialize RabbitMQ connection and store the channel
connectRabbitMQ().then((channel) => {
  rabbitChannel = channel
})

app.post("/order", async (req, res) => {
  const { product, quantity } = req.body

  if (!rabbitChannel) {
    return res.status(500).send("RabbitMQ channel is not available")
  }

  try {
    // Send an order
    const order = { product, quantity, orderId: Date.now() }
    rabbitChannel.sendToQueue(
      "order_queue",
      Buffer.from(JSON.stringify(order)),
      {
        persistent: true,
      }
    )
    console.log(`[x] Order '${product}: Quantity ${quantity}'sent to RabbitMQ`)
    res.status(200).json({ message: "Order placed successfully!" })
  } catch (error) {
    console.error("Failed to send message to RabbitMQ:", error)
    res.status(500).send("Failed to send message to RabbitMQ")
  }
})

// Start the server
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000")
})
