import { IPerformanceEntry } from "../../typings/types";
import { logMetric } from "../../data/log";
import { po } from "../performanceObserver";
import { metrics } from "../../data/metrics";

const { tbt, fcp } = metrics;

// TBT 是页面加载过程中阻塞的总时间
// 🟩: 低于0.2s
// 🟨: 0.1-0.6s
// 🟥: 大于0.6s

const cb = (performanceEntries: IPerformanceEntry[]) => {
  // console.log("🍌", performanceEntries);
  performanceEntries.forEach((entry) => {
    //从fcp -> tti获取长耗时任务（self表示耗时长任务来自于渲染帧）
    if (entry.name !== "self" || entry.startTime < fcp.value) {
      return;
    }
    //https://developer.mozilla.org/zh-CN/docs/Web/API/Long_Tasks_API
    //长耗时任务意味着执行时间超过50ms的
    const blockingTime = entry.duration - 50;
    if (blockingTime > 0) {
      tbt.value += blockingTime;
    }
  });
};

const onTBT = () => {
  return po("longtask", cb);
};

export default onTBT;
