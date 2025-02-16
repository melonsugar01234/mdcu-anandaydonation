"use client";

import React, { useState } from "react";
import { Registrations } from "./Registrations";
import { Overview } from "./Overview";
import { Settings } from "./Settings";
import { AdvancedItemsTableEditor, AdvancedStatusTableEditor } from "./AdvancedTableEditor";

const tabs = {
  Overview: <Overview />,
  Registrations: <Registrations />,
  Settings: <Settings />,
  "[Advanced] Items Table": <AdvancedItemsTableEditor />,
  "[Advanced] Status Table": <AdvancedStatusTableEditor />,
} as const;

export const AdminUI: React.FC = () => {
  const [tab, setTab] = useState<keyof typeof tabs>("Overview");

  return (
    <div className="grid h-svh w-svw grid-rows-[min-content_minmax(0,1fr)]">
      <div role="tablist" className="tabs tabs-border flex flex-nowrap overflow-x-auto px-4">
        {Object.keys(tabs).map((tabName) => (
          <a
            key={tabName}
            role="tab"
            className={`tab ${tab === tabName ? "tab-active" : ""}`}
            onClick={() => {
              if (tab !== tabName) setTab(tabName as keyof typeof tabs);
            }}
          >
            {tabName}
          </a>
        ))}
      </div>

      <div className="min-h-0 min-w-0 overflow-clip p-4">{tabs[tab]}</div>
    </div>
  );
};
