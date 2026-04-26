import type { Metadata } from "next";
import { DemoShell } from "@/components/demo/demo-shell";

export const metadata: Metadata = {
  title: "Demo",
  description:
    "Talk to a Mirror right now. Calibrated on real data. The answers will surprise you.",
};

export default function DemoPage() {
  return <DemoShell />;
}
