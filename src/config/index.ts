import ReportData from "../data/ReportData";
import analyticsTracker from "../data/analyticsTracker";
import { ZeusConfig } from "../typings/types";

export const config: ZeusConfig = {
  // Metrics
  reportData: new ReportData({ logUrl: "hole" }),
  isResourceTiming: false,
  isElementTiming: false,
  captureError: false,
  maxTime: 15000,
  analyticsTracker: analyticsTracker,
};
