import TeamsData from "@/data/teams.json";
import ChiefsLogo from "@/public/images/chiefs-logo.jpg";
import Image from "next/image";
import Link from "next/link";

interface LeagueCardProps {
  league: {
    id: string;
    commisioner: string;
    name: string;
  };
}

export default function LeagueCard(props: LeagueCardProps): JSX.Element {
  // Based on given league id, fetch teams in this league
  const teams = TeamsData.filter((team) => team.league_id === props.league.id);

  // Build string of team names
  const teamNames = teams.map((team) => team.current_name).join(", ");

  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <div className="flex flex-col h-full">
        {/* Card top */}
        <Link href={"/leagues/" + props.league.id + "/home"}>
          <div className="grow p-5 hover:dark:bg-slate-700 hover:bg-slate-100">
            <header>
              {/* Image */}
              <div className="flex justify-center mb-2">
                <Image
                  className="rounded-full"
                  src={ChiefsLogo}
                  width={64}
                  height={64}
                  alt={props.league.name}
                />
              </div>

              {/* League Name */}
              <div className="text-center">
                <h2 className="text-xl leading-snug justify-center font-semibold">
                  {props.league.name}
                </h2>
              </div>
            </header>

            {/* Teams List */}
            <div className="text-center mt-2">
              <div className="text-sm">{teamNames}</div>
            </div>
          </div>
        </Link>

        {/* Card footer */}
        <div className="border-t border-slate-200 dark:border-slate-700">
          <Link
            className="block text-center text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium px-3 py-4"
            href="/messages"
          >
            <div className="flex items-center justify-center">
              <span>Settings</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
