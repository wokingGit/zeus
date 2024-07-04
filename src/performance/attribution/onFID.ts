import { PerformanceEventTiming } from "../../typings/types";
import { logData, logMetric } from "../../data/log";
import { po, poDisconnect } from "../performanceObserver";

import { metrics } from "../../data/metrics";
import { perfObservers } from "../observeInstances";

const { fid } = metrics;

// FID 首次输入延迟
// 🟩: 低于0.1s
// 🟨: 0.2-0.3s
// 🟥: 大于0.3s

const cb = (performanceEntries: PerformanceEventTiming[]) => {
  const lastEntry = performanceEntries.pop();
  if (lastEntry) {
    // 手动计算不推荐
    // const fid = lastEntry.processingStart - lastEntry.startTime;
    // logMetric("fidVitals", fid,  {
    //   performanceEntry: lastEntry,
    // });

    // 传统的FID逻辑
    // Measure the duration of processing the first input event
    fid.value = lastEntry.duration;
    logMetric("fid", lastEntry.duration, {
      performanceEntry: lastEntry,
    });
  }

  // 销毁对FID注册回调 避免过多的观察者造成内存泄露
  poDisconnect("onFID");

  batchLog();
};

// 批量上报数据
const batchLog = () => {
  const { lcp, cls, tbt, rt } = metrics;

  logMetric("lcp", lcp.value);
  if (
    perfObservers["onCLS"] &&
    typeof perfObservers["onCLS"].takeRecords === "function"
  ) {
    perfObservers["onCLS"].takeRecords();
  }
  logMetric("cls", cls.value);
  logMetric("tbt", tbt.value);
  // TBT with 5 second delay after FID
  setTimeout(() => {
    logMetric(`tbt5S`, tbt.value);
  }, 5000);
  // TBT with 10 second delay after FID
  setTimeout(() => {
    logMetric(`tbt10S`, tbt.value);
    //FID被激活以后10S的整体数据消耗
    logData("rt10S", rt.value);
  }, 10000);
};

const onFID = () => {
  return po("first-input", cb);
};

export default onFID;
