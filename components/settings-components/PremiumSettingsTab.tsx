'use client';
import { cva } from "class-variance-authority";
import Image from "next/image";
import {premiumDetailsData} from "@/app/constants/settings-data";

const premiumTab = cva("premiumTab flex flex-col px-2");
const premiumTabHeader = cva("premiumTabHeader flex flex-col gap-4 pt-2 pb-6 border-b border-gray-200");
const premiumTabHeaderTop = cva("premiumTabHeaderTop flex items-center gap-3");
const premiumTabHeaderTopImage = cva("premiumTabHeaderTopImage relative aspect-square w-full max-w-20 rounded-full");
const premiumTabHeaderTopTitle = cva("premiumTabHeaderTopTitle text-2xl font-semibold text-purple-400");
const premiumTabHeaderTopPrice = cva("premiumTabHeaderTopPrice px-6 py-1 rounded-md text-sm text-white cursor-pointer");
const premiumTabHeaderBottom = cva("premiumTabHeaderBottom text-sm flex gap-4 place-self-end");
const premiumTabHeaderBottomLink = cva("premiumTabHeaderBottomLink text-purple-400 cursor-pointer hover:text-purple-500");
const premiumTabBody = cva("premiumTabBody py-6 flex flex-col gap-4");
const premiumTabBodyTitle = cva("premiumTabBodyTitle font-semibold");
const premiumTabBodyCard = cva("premiumTabBodyCard flex flex-col sm:flex-row items-center gap-4");
const premiumTabBodyCardImage = cva("premiumTabBodyCardImage flex-shrink-0 rounded-md w-50 h-30 relative border-2 border-gray-200 overflow-hidden bg-[url('/premium-details.png')]");
const premiumTabBodyCardAbout = cva("premiumTabBodyCardDescription w-full max-w-100 sm:max-w-none flex flex-col gap-2 text-center sm:text-start");
const premiumTabBodyCardTitle = cva("premiumTabBodyCardTextTitle font-semibold");
const premiumTabBodyCardDescription = cva("premiumTabBodyCardTextDescription text-sm text-gray-400");

export default function PremiumSettingsTab() {
  return (
    <section className={premiumTab()}>
      <div className={premiumTabHeader()}>
        <div className={premiumTabHeaderTop()}>
          <div className={premiumTabHeaderTopImage()}>
            <Image
              src={"/premium.jpg"}
              alt="Premium"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className={premiumTabHeaderTopTitle()}>Обновить до Premium</h1>
            <div className="flex gap-4">
              <a className={premiumTabHeaderTopPrice({className: 'bg-green-400'})}>$3.99 / Месяц</a>
              <a className={premiumTabHeaderTopPrice({className: 'bg-yellow-400'})}>$35.99 / Год</a>
            </div>
          </div>
        </div>
        <div className={premiumTabHeaderBottom()}>
          <a className={premiumTabHeaderBottomLink()}>Код выкупа</a>
          <a className={premiumTabHeaderBottomLink()}>Подарочная карта</a>
          <a className={premiumTabHeaderBottomLink()}>История заказов</a>
        </div>
      </div>
      <div className={premiumTabBody()}>
        <h3 className={premiumTabBodyTitle()}>Обновить до Premium и насладиться следующими функциями:</h3>
        {
          premiumDetailsData.map((item, index) => (
            <div className={premiumTabBodyCard()} key={index}>
              <div className={premiumTabBodyCardImage({className: item.imageProps})}>
              </div>
              <div className={premiumTabBodyCardAbout()}>
                <h4 className={premiumTabBodyCardTitle()}>{item.title}</h4>
                <p className={premiumTabBodyCardDescription()}>{item.description}</p>
              </div>
            </div>
          ))
        }
      </div>
    </section>
  );
}
