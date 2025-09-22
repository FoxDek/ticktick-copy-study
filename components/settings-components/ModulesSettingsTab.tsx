'use client'
import { cva } from "class-variance-authority";
import Image from "next/image";
import { useState } from "react";
import { modulesData } from "@/app/constants/settings-data";
import SwitchButton from '../SwitchButton';


const modulesTab = cva("modulesTab px-2");
const modulesTabTitle = cva("modulesTabTitle font-semibold");
const modulesTabContent = cva("modulesTabContent grid grid-cols-1 sm:grid-cols-2 gap-6 py-6");
const modulesTabCard = cva("modulesTabCard flex flex-col justify-between gap-2");
const modulesTabCardHeader = cva("modulesTabCardHeader flex flex-col gap-1");
const modulesTabCardHeaderTop = cva("modulesTabCardHeaderTop flex justify-between");
const modulesTabCardTitle = cva("modulesTabCardTitle font-semibold text-sm");
const modulesTabBodyCardDescription = cva("modulesTabBodyCardDescription text-xs text-gray-400 line-clamp-3");
const modulesTabBodyCardImage = cva("modulesTabBodyCardImage aspect-video relative border border-gray-200 rounded-md overflow-hidden");

export default function ModulesSettingsTab() {
  const [userChosenModules, setUserChosenModules] = useState(['calendar']);
  const [userAvailableModules] = useState(['calendar', 'matrix', 'habits', 'pomodoro', 'countdown']);

  const handleToggleModules = (module: string) => {
    if (userChosenModules.includes(module)) {
      setUserChosenModules(userChosenModules.filter((item) => item !== module));
    } else {
      if (userAvailableModules.includes(module)) {
        setUserChosenModules([...userChosenModules, module]);
      }
    }
  };

  return (
    <section className={modulesTab()}>
      <h2 className={modulesTabTitle()}>Функциональные модули</h2>

      <ul className={modulesTabContent()}>
        {modulesData.map((module) => (
          <li key={module.id} className={modulesTabCard()}>
            <div className={modulesTabCardHeader()}>
              <div className={modulesTabCardHeaderTop()}>
                <h4 className={modulesTabCardTitle()}>{module.title}</h4>
                <SwitchButton active={userChosenModules.includes(module.id)} onToggle={() => handleToggleModules(module.id)} />
              </div>
              <span className={modulesTabBodyCardDescription()}>{module.description}</span>
            </div>
            <div className={modulesTabBodyCardImage()}>
              <Image
                src={module.image}
                alt={module.title}
                fill
                className=""
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
