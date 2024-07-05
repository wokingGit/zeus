import { config } from "./config";
import ReportData from "./data/ReportData";
import analyticsTracker from "./data/analyticsTracker";
import { logData } from "./data/log";
import { reportStorageEstimate } from "./data/storageEstimate";
import ErrorTrace from "./error";
import { isPerformanceSupported } from "./helpers/isSupported";
import { didVisibilityChange } from "./helpers/onVisibilityChange";
import {
  disconnectPerfObserversHidden,
  initPerformanceObserver,
} from "./performance";
import { getNavigationTiming } from "./performance/getNavigationTiming";
import { getNetworkInformation } from "./helpers/getNetworkInformation";
import { IReportData, ZeusOptions } from "./typings/types";

export default class Zeus {
  private v = "1.1.0";
  private reportData: IReportData | null;

  constructor(options: ZeusOptions = {}) {
    console.log("欢迎进入宙斯监控 V" + this.v);

    const logUrl = options.logUrl;
    if (options.captureError && !logUrl) console.log("❌ 未传递logUrl");

    //向后台输送数据
    const insReportData = logUrl
      ? new ReportData({
          logUrl,
        })
      : null;
    config.reportData = insReportData;
    //对外暴露上传接口
    this.reportData = insReportData;

    //集合数据汇总
    config.isResourceTiming = !!options.resourceTiming;
    config.isElementTiming = !!options.elementTiming;
    config.captureError = !!options.captureError;
    config.maxTime = options.maxMeasureTime || config.maxTime;
    config.analyticsTracker =
      options.analyticsTracker || config.analyticsTracker;

    // 开启错误跟踪
    if (config.captureError) {
      console.log("⏰ 全局捕获错误开启!");
      const errorTtace = new ErrorTrace();
      errorTtace.run();
    }

    //如果浏览器不支持性能指标只能放弃
    if (!isPerformanceSupported()) {
      console.log("❌ 浏览器不支持性能指标,收集失败!");
      return;
    }

    // 浏览器支持的起FRP这样的Observer统计性能
    if ("PerformanceObserver" in window) {
      initPerformanceObserver();
    }

    // 初始化
    if (typeof document.hidden !== "undefined") {
      // Opera 12.10 and Firefox 18 and later support
      document.addEventListener(
        "visibilitychange",
        didVisibilityChange.bind(this, disconnectPerfObserversHidden)
      );
    }

    // 记录系统DNS请求+白屏时间等
    logData("navigationTiming", getNavigationTiming());
    // 记录用户的网速 H5+多普勒测速
    logData("networkInformation", getNetworkInformation());

    // 获取离线缓存数据的状态
    const WN = window.navigator;
    if (WN && WN.storage && typeof WN.storage.estimate === "function") {
      // 估计存储使用情况和可用配额
      WN.storage.estimate().then(reportStorageEstimate);
    }
  }
}
