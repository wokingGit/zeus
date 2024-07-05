# zeus 性能监控系统

收集页面性能指标以及错误捕获!!

---

使用方法

```node
pnpm install @woking/zeus
```

```js
import Zeus from "@woking/zeus";

const zeus = new Zeus({
  resourceTiming: true, // 开启收集页面全部资源加载性能数据
  elementTiming: true, // 开启观察特定元素的渲染时间
  captureError: true, // 开启错误跟踪
  logUrl: null, // 错误上报地址
  maxMeasureTime: 15000, // 最大测量时间
  analyticsTracker: (options) => {
    // 对采集的数据进行处理
    console.log("options", options);
  },
});
```
