"use client";

import LeaguesData from "@/data/leagues.json";
import ChiefsLogo from "@/public/images/chiefs-logo.jpg";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import LinkCard from "./link-card";

export const metadata = {
  title: "Company - Mosaic",
  description: "Page description",
};

export default function Home(): JSX.Element {
  const [leagueID, setleagueID] = useState<string>("");

  // Get League ID from URL
  const params = useParams();
  useEffect(() => {
    setleagueID(params.leagueID);
  }, [params]);

  // Get league name from data
  const league = LeaguesData.find((league) => league.id === leagueID);

  const baseURL = "/leagues/" + leagueID + "/";

  return (
    <>
      {/* Background image */}
      <div className="h-56 bg-slate-200 dark:bg-slate-900">
        <Image
          className="object-cover h-full w-full"
          src={ChiefsLogo}
          width={2560}
          height={440}
          alt="Company background"
        />
      </div>

      {/* Header */}
      <header className="text-center bg-slate-50 dark:bg-slate-800/20 pb-6 border-b border-slate-200 dark:border-slate-700">
        <div className="px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl mx-auto">
            {/* Logo */}
            <div className="-mt-12 mb-2">
              <div className="inline-flex -ml-1 -mt-1 sm:mb-0">
                <Image
                  className="rounded-full border-4 border-white dark:border-slate-900"
                  src={ChiefsLogo}
                  width={104}
                  height={104}
                  alt="Avatar"
                />
              </div>
            </div>

            {/* League name and info */}
            <div className="mb-4">
              <h2 className="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-2">
                {league?.name}
              </h2>
              <p>Add league description field later.</p>
            </div>

            {/* Meta */}
            <div className="mb-4 inline-flex flex-wrap justify-center sm:justify-start space-x-4">
              <div className="flex items-center">
                <span className="text-sm font-medium whitespace-nowrap text-slate-500 dark:text-slate-400 ml-2">
                  Commissioner - {league?.commissioner}
                </span>
              </div>
            </div>

            {/* Cards for sidebar buttons */}
            <div className="flex flex-row flex-wrap justify-center">
              <LinkCard text="Teams" url={baseURL + "teams"} />
              <LinkCard text="Schedule" url={baseURL + "schedule"} />
            </div>
          </div>
        </div>
      </header>

      {/* Page content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="max-w-3xl mx-auto">
          {/* Page content */}
          <h3 className="text-xl leading-snug text-slate-800 dark:text-slate-100 font-bold mb-6">
            Open Positions at Revolut Ltd
          </h3>
        </div>
      </div>
    </>
  );
}
