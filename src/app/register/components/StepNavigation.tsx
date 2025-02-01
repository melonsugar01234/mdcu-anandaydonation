"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import path from "path";
import { useEffect, useState } from "react";

const steps = [
  {
    title: "Personal Info",
    route: "personal-info",
    link: "/register/personal-info",
  },
  {
    title: "Donation Info",
    route: "donation-info",
    link: "/register/donation-info",
  },
  {
    title: "Payment Info",
    route: "payment-info",
    link: "/register/payment-info",
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
    <ul className="steps">
      {steps.map((step, index) => (
        <li key={index} className={`step ${index <= currentStep ? 'step-primary' : ''}`}>
          <Link href={step.link}>
            <span className="hover:underline">{step.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
