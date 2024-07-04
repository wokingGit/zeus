import { IYidengData, IVitalsScore } from "../typings/types";

// https://web.dev/vitals/
const fcpScore = [1800, 3000];
const lcpScore = [2500, 4000];
const fidcore = [100, 300];
const clsScore = [100, 250];
const tbtScore = [200, 600];

export const webVitalsScore: Record<string, number[]> = {
  fp: fcpScore,
  fcp: fcpScore,
  lcp: lcpScore,
  lcpFinal: lcpScore,
  fid: fidcore,
  fidVitals: fidcore,
  cls: clsScore,
  clsFinal: clsScore,
  tbt: tbtScore,
  tbt5S: tbtScore,
  tbt10S: tbtScore,
  tbtFinal: tbtScore,
};

export const getVitalsScore = (
  measureName: string,
  value: IYidengData
): IVitalsScore => {
  if (typeof value !== "number") return null;
  if (!webVitalsScore[measureName]) {
    return null;
  }
  if (value <= webVitalsScore[measureName][0]) {
    return "good";
  }
  return value <= webVitalsScore[measureName][1] ? "needsImprovement" : "poor";
};
