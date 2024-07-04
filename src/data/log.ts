import { config } from "../config";
import { roundByTwo } from "../helpers/utils";
import { reportPerf } from "./reportPerf";

export const logData = (
  measureName: string,
  metric: any,
  customProperties?: object
): void => {
  console.log("metric🍉", metric);
  Object.keys(metric).forEach((key) => {
    if (typeof metric[key] === "number") {
      metric[key] = roundByTwo(metric[key]);
    }
  });
  // Sends the metric to an external tracking service
  reportPerf(measureName, metric, customProperties);
};

// 记录数据
export const logMetric = (
  measureName: string,
  duration: number,
  customProperties?: object
): void => {
  const duration2Decimal = roundByTwo(duration);
  if (duration2Decimal <= config.maxTime && duration2Decimal >= 0) {
    // 从内部或者外部的报告工具报告指标数据
    reportPerf(measureName, duration2Decimal, customProperties);
  }
};
