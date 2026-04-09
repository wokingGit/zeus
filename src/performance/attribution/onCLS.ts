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
  // CLS 需要累加所有 layout-shift 条目，而非只取最后一个
  for (const entry of performanceEntries) {
    if (!entry.hadRecentInput && entry.value) {
      cls.value += entry.value;
    }
  }
};

const onCLS = () => {
  return po("layout-shift", cb);
};

export default onCLS;
