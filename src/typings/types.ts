export interface ZeusOptions {
  // Metrics
  captureError?: boolean;
  resourceTiming?: boolean;
  elementTiming?: boolean;
  // Analytics
  analyticsTracker?: (options: IAnalyticsTrackerOptions) => void;
  // Logging
  maxMeasureTime?: number;
  logUrl?: string;
}

export interface IZeusNavigationTiming {
  fetchTime?: number;
  workerTime?: number;
  totalTime?: number;
  downloadTime?: number;
  timeToFirstByte?: number;
  headerSize?: number;
  dnsLookupTime?: number;
  tcpTime?: number;
  whiteTime?: number;
  domTime?: number;
  loadTime?: number;
  parseDomTime?: number;
}

export type EffectiveConnectionType =
  | "2g"
  | "3g"
  | "4g"
  | "5g"
  | "slow-2g"
  | "lte";
export interface IZeusNetworkInformation {
  downlink?: number;
  effectiveType?: EffectiveConnectionType;
  onchange?: () => void;
  rtt?: number;
  saveData?: boolean;
}

export type IYidengData =
  | number
  | IZeusNavigationTiming
  | IZeusNetworkInformation;

export interface INavigatorInfo {
  deviceMemory?: number;
  hardwareConcurrency?: number;
  isLowEndDevice?: boolean;
  isLowEndExperience?: boolean;
  serviceWorkerStatus?: "controlled" | "supported" | "unsupported";
}
export type IVitalsScore = "good" | "needsImprovement" | "poor" | null;

export interface IAnalyticsTrackerOptions {
  metricName: string;
  data: IYidengData;
  eventProperties: object;
  navigatorInformation: INavigatorInfo;
  vitalsScore: IVitalsScore;
}

export interface IReportData {
  sendToAnalytics(level: AskPriority, body: string): void;
}
/**
 * @param isResourceTiming - 是否开启资源数据
 * @param isElementTiming - 是否开启性能数据
 * @param analyticsTracker - 自定义分析工具
 * @param analyticsTracker - void方法参数
 * @param maxTime - 最大请求时间
 * @interface 系统配置接口
 * @public
 */
export interface ZeusConfig {
  reportData: IReportData | null;
  isResourceTiming: boolean;
  isElementTiming: boolean;
  captureError: boolean;
  analyticsTracker?: (options: IAnalyticsTrackerOptions) => void;
  maxTime: number;
}

export interface IPerfObservers {
  [measureName: string]: any;
}
// 性能指标参数
export type IPerformanceObserverType =
  | "first-input"
  | "largest-contentful-paint"
  | "layout-shift"
  | "longtask"
  | "measure"
  | "navigation"
  | "paint"
  | "element"
  | "resource";
// 性能指标具体请求类型
export type IPerformanceEntryInitiatorType =
  | "beacon"
  | "css"
  | "fetch"
  | "img"
  | "other"
  | "script"
  | "xmlhttprequest";

export declare interface IPerformanceEntry {
  duration: number;
  entryType: IPerformanceObserverType;
  name: string;
  startTime: number;
  decodedBodySize?: number;
  initiatorType?: IPerformanceEntryInitiatorType;
  loadTime?: number;
  renderTime?: number;
  hadRecentInput?: boolean;
  value?: number;
  identifier?: string;
}
// 度量指标数据
export interface IMetricMap {
  [measureName: string]: any;
}
export interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: DOMHighResTimeStamp;
  target?: Node;
}

// 请求响应优先级
export enum AskPriority {
  URGENT = 1,
  IDLE = 2,
}
