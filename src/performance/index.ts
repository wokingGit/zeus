import { perfObservers } from "./observeInstances";
import { config } from "../config";
import onFCP from "./attribution/onFCP";
import onLCP from "./attribution/onLCP";
import onFID from "./attribution/onFID";
import onCLS from "./attribution/onCLS";
import { po, poDisconnect } from "./performanceObserver";
import { initResourceTiming } from "./attribution/initResourceTiming";
import { initElementTiming } from "./attribution/initElementTiming";
import { logMetric } from "../data/log";
import { metrics } from "../data/metrics";

export const initPerformanceObserver = () => {
  perfObservers["onFCP"] = onFCP();
  perfObservers["onLCP"] = onLCP();
  perfObservers["onCLS"] = onCLS();
  perfObservers["onFID"] = onFID();

  // 收集页面全部资源加载性能数据
  if (config.isResourceTiming) {
    console.log("⏰ 资源加载性能数据收集开启!");
    po("resource", initResourceTiming);
  }

  // 观察特定元素的渲染时间 带有 elementtiming 属性的元素
  if (config.isElementTiming) {
    console.log("⏰ 特定元素的渲染时间收集开启!");
    po("element", initElementTiming);
  }
};

// 注销回调
export const disconnectPerfObserversHidden = (): void => {
  const { lcp, cls, tbt } = metrics;
  if (perfObservers["onLCP"]) {
    logMetric(`lcpFinal`, lcp.value);
    poDisconnect("onLCP");
  }
  if (perfObservers["onCLS"]) {
    if (typeof perfObservers["onCLS"].takeRecords === "function") {
      perfObservers["onCLS"].takeRecords();
    }
    logMetric(`clsFinal`, cls.value);
    poDisconnect("onCLS");
  }
  if (perfObservers["onTBT"]) {
    logMetric(`tbtFinal`, tbt.value);
    poDisconnect("onTBT");
  }
};
