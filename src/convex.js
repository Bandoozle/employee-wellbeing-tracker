import { ConvexReactClient } from "convex/react";

// Get the Convex URL from environment variables
const convexAddress = process.env.REACT_APP_CONVEX_URL || "http://localhost:8188"; // Use REACT_APP_ prefix for CRA

if (!convexAddress) {
  throw new Error("No address provided to ConvexReactClient.");
}

// Initialize Convex client with the address
const convex = new ConvexReactClient(convexAddress);
Console.log("Connecting to Convex at:", convexAddress);

export default convex;
