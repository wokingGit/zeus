import { IPerformanceEntry } from "../../typings/types";
import { logMetric } from "../../data/log";
import { po } from "../performanceObserver";
import { metrics } from "../../data/metrics";

const { cls } = metrics;

// CLS 是页面首次布局偏移量的累积值
// 🟩: 低于0.1s
// 🟨: 0.1-0.25s
// 🟥: 大于0.25s

const cb = (performanceEntries: IPerformanceEntry[]) => {
  const lastEntry = performanceEntries.pop();
  console.log("cls", lastEntry);
  // Only count layout shifts without recent user input.
  if (lastEntry && !lastEntry.hadRecentInput && lastEntry.value) {
    cls.value += lastEntry.value;
  }
};

const onCLS = () => {
  return po("layout-shift", cb);
};

export default onCLS;
