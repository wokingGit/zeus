import { IPerformanceEntry } from "../../typings/types";
import { logMetric } from "../../data/log";
import { po, poDisconnect } from "../performanceObserver";
import { metrics } from "../../data/metrics";
import { perfObservers } from "../observeInstances";
import onTBT from "./onTBT";

const { fp, fcp } = metrics;

// FCP 是页面首次展示有意义内容的时间点
// 🟩: 低于1.8s
// 🟨: 1.8-3s
// 🟥: 大于3s

const cb = (performanceEntries: IPerformanceEntry[]) => {
  performanceEntries.forEach((entry) => {
    if (entry.name === "first-paint") {
      fp.value = entry.startTime;
      logMetric("fp", entry.startTime, { performanceEntry: entry });
    } else if (entry.name === "first-contentful-paint") {
      fcp.value = entry.startTime;
      logMetric("fcp", entry.startTime, { performanceEntry: entry });
    }
  });

  // 获取TBT
  perfObservers["onTBT"] = onTBT();

  // 注销onFCP回调
  poDisconnect("onFCP");
};

const onFCP = () => {
  return po("paint", cb);
};

export default onFCP;
