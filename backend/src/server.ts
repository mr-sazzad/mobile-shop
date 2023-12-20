import { Server } from "http";
import app from "./app";

const port = process.env.PORT || 5001;

async function startServer() {
  const server: Server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  // Graceful shutdown
  const shutdown = async () => {
    console.log("Shutting down the server...");
    server.close(() => {
      console.log("Server has been gracefully terminated");
      process.exit(0);
    });

    // Forcefully close server after a specific timeout (e.g., 10 seconds)
    setTimeout(() => {
      console.error("Server forcefully terminated after timeout");
      process.exit(1);
    }, 10000);
  };

  // Handle process termination signals
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);

  // Handle uncaught exceptions and unhandled promise rejections
  const handleUnexpectedErrors = (error: unknown) => {
    console.error("Unexpected error:", error);
    shutdown();
  };

  process.on("uncaughtException", handleUnexpectedErrors);
  process.on("unhandledRejection", handleUnexpectedErrors);

  return server;
}

// Start the server
startServer()
  .then(() => {
    console.log("Server started successfully");
  })
  .catch((error) => {
    console.error("Error starting the server:", error);
    process.exit(1);
  });
