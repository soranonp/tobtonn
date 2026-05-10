import type { ComponentType } from "react";
import SnowballHero from "./SnowballHero";
import Rule72Hero from "./Rule72Hero";
import DcaLumpsumHero from "./DcaLumpsumHero";
import InvestingYoungHero from "./InvestingYoungHero";
import RetirementHero from "./RetirementHero";

export type HeroIllustration =
  | "snowball"
  | "rule72"
  | "dcaLumpsum"
  | "investingYoung"
  | "retirement";

export const heroMap: Record<HeroIllustration, ComponentType> = {
  snowball: SnowballHero,
  rule72: Rule72Hero,
  dcaLumpsum: DcaLumpsumHero,
  investingYoung: InvestingYoungHero,
  retirement: RetirementHero,
};

function DefaultHero() {
  return (
    <div
      aria-hidden
      className="h-full w-full rounded-2xl bg-gradient-to-br from-accent via-accent-bright to-gold"
    />
  );
}

export function getHeroComponent(key?: string): ComponentType {
  if (key && key in heroMap) {
    return heroMap[key as HeroIllustration];
  }
  return DefaultHero;
}
