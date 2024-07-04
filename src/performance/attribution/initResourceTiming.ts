import { config } from "../../config";
import { IPerformanceEntry } from "../../typings/types";
import { logData } from "../../data/log";
import { metrics } from "../../data/metrics";

const { rt } = metrics;

export const initResourceTiming = (performanceEntries: IPerformanceEntry[]) => {
  performanceEntries.forEach((entry) => {
    if (config.isResourceTiming) {
      logData("resourceTiming", entry);
    }
    if (entry.decodedBodySize && entry.initiatorType) {
      const bodySize = entry.decodedBodySize / 1000;
      if (!rt.value[entry.initiatorType]) rt.value[entry.initiatorType] = 0;
      rt.value[entry.initiatorType] += bodySize;
      rt.value.total += bodySize;
    }
  });
};
