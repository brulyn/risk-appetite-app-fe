import { createContext } from "react";

export const RatioContext = createContext({
  metric: "Current Ratio",
  category: "Liquidity",
  currentPerformance: 0,
  previousPerformance: 0,
  riskTolerance: 200,
});
