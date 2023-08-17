"use client";

import seasonsData from "@/data/seasons.json";
import teamsData from "@/data/teams.json";
import Dropdown from "@/src/components/mosaic/dropdown";
import TeamListHeader from "@/src/components/mosaic/teams/list-header";
import TeamListItem from "@/src/components/mosaic/teams/list-item";
import Sidecard from "@/src/components/mosaic/teams/sidecard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const metadata = {
  title: "Credit Cards - Mosaic",
  description: "Page description",
};

export default function CreditCards() {
  // Get seasons from database
  const [selectedSeasonID, setselectedSeasonID] = useState<number>(0);
  const [selectedSeasonStr, setselectedSeasonStr] = useState<string>();
  const [sideCardOpen, setSideCardOpen] = useState<boolean>(false);
  const [selectedTeamID, setSelectedTeamID] = useState<number>();

  // seasonsData is array of strings eg ["2015", "2016"], sort greatest to least
  seasonsData.sort((a, b) => Number(b) - Number(a));

  // Map seasonsData to map of 0: "2016", 1: "2015", etc
  // This is to give them ID to be used for dropdown
  const seasonOptions = seasonsData.reduce((acc, cur, i) => {
    acc[i] = cur;
    return acc;
  }, {});

  // Convert season options to array of maps, used for dropdown component
  const seasonOptionsSeperate = Object.keys(seasonOptions).map((key) => ({
    id: key,
    text: seasonOptions[key],
  }));

  // Handle click on team
  const handleClick = (newTeamID) => {
    console.log("You clicked: ", newTeamID);
    setSideCardOpen(true);
    setSelectedTeamID(newTeamID);
  };

  // Get current league id using segment
  const router = useRouter();
  const leagueID = router.query.leagueID;
  console.log(leagueID);

  // From team data, get teams that match: selected season, league id from url
  const filteredTeams = teamsData.filter((team) => {
    return (
      team.seasons.hasOwnProperty(selectedSeasonStr) &&
      team.seasons[selectedSeasonStr].league_id === 1
    );
  });

  // Print everytime selectedSeasonID upodates (this num is returned by dropdown)
  useEffect(() => {
    console.log("You selected: ", seasonOptions[selectedSeasonID]);
    setselectedSeasonStr(seasonOptions[selectedSeasonID]);
  }, [selectedSeasonID]);

  return (
    <div className="lg:relative lg:flex bg-white dark:bg-slate-900">
      {/* Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
        {/* Page header */}
        <div className="sm:flex sm:justify-between sm:items-center mb-5">
          {/* Left: Title */}
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
              Teams
            </h1>
          </div>

          {/* Add card button */}
          <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
            <svg
              className="w-4 h-4 fill-current opacity-50 shrink-0"
              viewBox="0 0 16 16"
            >
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="hidden xs:block ml-2">Add Card</span>
          </button>
        </div>

        {/* List */}
        <div className="space-y-2">
          {/* Season Dropdown */}
          <div>
            <Dropdown
              options={seasonOptionsSeperate}
              onUpdate={(option) => {
                setselectedSeasonID(option);
              }}
              selected={selectedSeasonID}
            />
          </div>

          {/* Table header */}
          <TeamListHeader />

          {/* Map teams to list */}
          {teamsData.map(
            (team) =>
              // Only include if it has values for the selected year
              team.seasons.hasOwnProperty(selectedSeasonStr) && (
                <TeamListItem
                  key={team.id}
                  teamID={team.id}
                  teamURL={team.current_name_id}
                  teamName={team.seasons[selectedSeasonStr].name}
                  teamCity={team.seasons[selectedSeasonStr].city}
                  owner={team.seasons[selectedSeasonStr].owner}
                  wins={team.seasons[selectedSeasonStr].wins}
                  ties={team.seasons[selectedSeasonStr].ties}
                  losses={team.seasons[selectedSeasonStr].losses}
                  place={1}
                  onChange={handleClick}
                />
              )
          )}
        </div>
      </div>

      {/* Sidebar */}
      {sideCardOpen && (
        <Sidecard seasonStr={selectedSeasonStr} teamID={selectedTeamID} />
      )}
    </div>
  );
}
