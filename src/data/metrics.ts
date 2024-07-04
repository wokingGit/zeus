import { IMetricMap } from "../typings/types";

export const metrics: IMetricMap = {
  fp: { value: 0 },
  fcp: { value: 0 },
  lcp: { value: 0 },
  fid: { value: 0 },
  cls: { value: 0 },
  tbt: { value: 0 },
  rt: {
    value: {
      beacon: 0,
      css: 0,
      fetch: 0,
      img: 0,
      other: 0,
      script: 0,
      link: 0,
      total: 0,
      xmlhttprequest: 0,
    },
  },
};
