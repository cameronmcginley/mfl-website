import ChiefsLogo from "@/public/images/chiefs-logo.jpg";
import Image from "next/image";

import gamesData from "@/data/games.json";
import teamsData from "@/data/teams.json";

interface SidecardProps {
  teamID: number;
  seasonStr: string;
}

function getGameByID(gameID: string) {
  return gamesData.find((game) => {
    return game.id === gameID;
  });
}

export default function Sidecard(props: SidecardProps): JSX.Element {
  // Get team info from id
  const teamFromID = teamsData.find((team) => {
    return team.id === props.teamID;
  });
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
              <Image src={ChiefsLogo} alt="Girl in a jacket" />
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
                        <div>{gameID}</div>
                      </div>
                    )
                  );
                })}
              </div>
            </div>

            {/* Edit / Delete */}
            <div className="flex items-center space-x-3 mt-6">
              <div className="w-1/2">
                <button className="btn w-full dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300">
                  <svg
                    className="w-4 h-4 fill-current text-slate-500 dark:text-slate-400 shrink-0"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                  </svg>
                  <span className="ml-2">Edit Card</span>
                </button>
              </div>
              <div className="w-1/2">
                <button className="btn w-full dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-rose-500">
                  <svg
                    className="w-4 h-4 fill-current shrink-0"
                    viewBox="0 0 16 16"
                  >
                    <path d="M14.574 5.67a13.292 13.292 0 0 1 1.298 1.842 1 1 0 0 1 0 .98C15.743 8.716 12.706 14 8 14a6.391 6.391 0 0 1-1.557-.2l1.815-1.815C10.97 11.82 13.06 9.13 13.82 8c-.163-.243-.39-.56-.669-.907l1.424-1.424ZM.294 15.706a.999.999 0 0 1-.002-1.413l2.53-2.529C1.171 10.291.197 8.615.127 8.49a.998.998 0 0 1-.002-.975C.251 7.29 3.246 2 8 2c1.331 0 2.515.431 3.548 1.038L14.293.293a.999.999 0 1 1 1.414 1.414l-14 14a.997.997 0 0 1-1.414 0ZM2.18 8a12.603 12.603 0 0 0 2.06 2.347l1.833-1.834A1.925 1.925 0 0 1 6 8a2 2 0 0 1 2-2c.178 0 .348.03.512.074l1.566-1.566C9.438 4.201 8.742 4 8 4 5.146 4 2.958 6.835 2.181 8Z" />
                  </svg>
                  <span className="ml-2">Block Card</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
