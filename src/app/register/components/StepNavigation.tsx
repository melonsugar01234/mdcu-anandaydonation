"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import path from "path";
import { useEffect, useState } from "react";
import { AddDealRoutes } from "@/lib/types";

const steps = [
  {
    title: "Personal Info",
    route: "step-one",
    link: AddDealRoutes.PERSONAL_INFO,
  },
  {
    title: "Donation Info",
    route: "step-two",
    link: AddDealRoutes.DONATE_INFO,
  },
  {
    title: "Payment Info",
    route: "step-three",
    link: AddDealRoutes.PAYMENT_INFO,
  },
];

export default function StepNavigation() {
  const pathname = usePathname();
  const currentPath = path.basename(pathname);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    setCurrentStep(steps.findIndex((step) => step.route === currentPath));
  }, [currentPath]);

  return (
    <ul className="steps mt-5">
      {steps.map((step, index) => (
        <li key={index} className={`step ${index <= currentStep ? 'step-primary' : ''}`}>
          {/* <Link href={step.link}>
            <span className="hover:underline">{step.title}</span>
          </Link> */}
        </li>
      ))}
    </ul>
  );
}
