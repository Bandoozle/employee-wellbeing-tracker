import { ConvexProvider, ConvexReactClient } from "convex/react";
import convexConfig from "../convex/convex.json"; // Auto-generated config

const convex = new ConvexReactClient(convexConfig.address);

export default convex;
