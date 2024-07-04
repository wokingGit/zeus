import { perfObservers } from "./observeInstances";
import { IPerformanceObserverType } from "../typings/types";

export const po = (
  eventType: IPerformanceObserverType,
  cb: (performanceEntries: any[]) => void
): PerformanceObserver | null => {
  try {
    const perfObserver = new PerformanceObserver((entrylist) => {
      cb(entrylist.getEntries());
    });

    // 订阅时间或者开始计时 buffered不立即执行在内存中留下PerformanceObserver实例
    perfObserver.observe({ type: eventType, buffered: true });
    return perfObserver;
  } catch (e) {
    console.log("zeus错误:", e);
  }
  return null;
};

// 断开监听通道
export const poDisconnect = (observer: any) => {
  if (perfObservers[observer]) {
    perfObservers[observer].disconnect();
  }
  delete perfObservers[observer];
};
