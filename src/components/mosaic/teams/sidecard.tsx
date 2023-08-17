import ChiefsLogo from "@/public/images/chiefs-logo.jpg";
import Image from "next/image";

import gamesData from "@/data/games.json";
import teamsData from "@/data/teams.json";
import Link from "next/link";

interface SidecardProps {
  teamID: number;
  seasonStr: string;
}

function getGameByID(gameID: string) {
  return gamesData.find((game) => {
    return game.id === gameID;
  });
}

function getTeamByID(teamID: number) {
  return teamsData.find((team) => {
    return team.id === teamID;
  });
}

export default function Sidecard(props: SidecardProps): JSX.Element {
  // Get team info from id
  const teamFromID = getTeamByID(props.teamID);
  const teamAndSeason = teamFromID.seasons[props.seasonStr];

  // Details to be displayed in sidecard
  const details = [{ name: "Owner", value: teamAndSeason.owner }];

  // Get array of game ids from season
  const gameIDs = teamAndSeason.games;

  //   Define background and text colors for the games section
  const gameColors = {
    win: "bg-emerald-100 dark:bg-emerald-400/30 text-emerald-600 dark:text-emerald-400",
    loss: "bg-rose-100 dark:bg-rose-400/30 text-rose-600 dark:text-rose-400",
  };

  return (
    <div>
      <div className="lg:sticky lg:top-16 bg-slate-50 dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-900 lg:overflow-x-hidden lg:overflow-y-auto no-scrollbar lg:shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 lg:w-[390px] lg:h-[calc(100dvh-64px)]">
        <div className="py-8 px-4 lg:px-8">
          <div className="max-w-sm mx-auto lg:max-w-none">
            <div className="text-md text-slate-600 dark:text-slate-100 text-center">
              {teamAndSeason.city}
            </div>
            <div className="text-xl text-slate-800 dark:text-slate-100 font-semibold text-center mb-6">
              {teamAndSeason.name}
            </div>

            {/* Credit Card */}
            <div className="relative aspect-square bg-gradient-to-tr from-slate-600 to-slate-800 p-5 shadow-lg overflow-hidden">
              <Image src={ChiefsLogo} alt="Logo" />
            </div>

            {/* Details */}
            <div className="mt-6">
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-1">
                {props.seasonStr} Season Details
              </div>
              <ul>
                {/* Map details to li */}
                {details.map((detail) => (
                  <li
                    key={detail.name}
                    className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700"
                  >
                    <div className="text-sm">{detail.name}</div>
                    <div className="text-sm font-medium text-slate-800 dark:text-slate-100 ml-2">
                      {detail.value}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Games */}
            <div className="mt-6">
              {/* Title */}
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-4">
                Games
              </div>

              {/* List */}
              <div className="pb-4 border-b border-slate-200 dark:border-slate-700">
                {/* Label */}
                <div className={`flex justify-between text-sm mb-0`}>
                  <div>Week #</div>
                  <div>Teams</div>
                  <div>Score</div>
                </div>

                {/* Games */}
                {gameIDs.map((gameID: string): false | JSX.Element => {
                  // Fetch actual game object, ensure null check
                  const game = getGameByID(gameID);
                  return (
                    game != null && (
                      <div
                        key={gameID}
                        // Use different colors for win/loss
                        className={`${
                          game.winner_team_id === props.teamID
                            ? gameColors.win
                            : gameColors.loss
                        } flex justify-between text-sm mb-2`}
                      >
                        <div>Week {game.week}</div>
                        <div>
                          {getTeamByID(game.home_team_id)?.current_name} @{" "}
                          {getTeamByID(game.away_team_id)?.current_name}
                        </div>
                        <div>
                          {game.home_team_score}-{game.away_team_score}
                        </div>
                      </div>
                    )
                  );
                })}
              </div>
            </div>

            {/* Edit / Delete */}
            <div className="flex items-center space-x-3 mt-6">
              <div className="w-full">
                <Link href={`/teams/${teamFromID.name_id}`}>
                  <button className="btn w-full dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300">
                    <span className="ml-2">See Full Page</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
