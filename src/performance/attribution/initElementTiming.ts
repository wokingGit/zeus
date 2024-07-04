import { IPerformanceEntry } from "../../typings/types";
import { logMetric } from "../../data/log";

export const initElementTiming = (performanceEntries: IPerformanceEntry[]) => {
  performanceEntries.forEach((entry) => {
    if (entry.identifier) {
      logMetric(entry.identifier, entry.startTime, { performanceEntry: entry });
    }
  });
};
