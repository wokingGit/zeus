import { IPerformanceEntry } from "../../typings/types";
import { logMetric } from "../../data/log";
import { po } from "../performanceObserver";
import { metrics } from "../../data/metrics";

const { lcp } = metrics;

// LCP 是页面页面最大内容绘制
// 🟩: 低于2.5s
// 🟨: 2.5-4s
// 🟥: 大于4s

const cb = (performanceEntries: IPerformanceEntry[]) => {
  const lastEntry = performanceEntries.pop();
  if (lastEntry) {
    lcp.value = lastEntry.renderTime || lastEntry.loadTime;
  }
};

const onLCP = () => {
  return po("largest-contentful-paint", cb);
};

export default onLCP;
