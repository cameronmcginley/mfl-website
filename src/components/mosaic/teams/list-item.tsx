interface TeamListItemProps {
  teamName: string;
  teamCity: string;
  owner: string;
  wins: number;
  ties: number;
  losses: number;
  place: number;
  teamID: number;
  teamURL: string;
}

export default function TeamListItem(props: TeamListItemProps): JSX.Element {
  const placeColors = {
    "1": "bg-emerald-100 dark:bg-emerald-400/30 text-emerald-600 dark:text-emerald-400",
    "2": "bg-fuchsia-100 dark:bg-fuchsia-400/30 text-fuchsia-600 dark:text-fuchsia-400",
    "3": "bg-amber-100 dark:bg-amber-400/30 text-amber-600 dark:text-amber-400",
  };

  return (
    <label className="relative block cursor-pointer text-left w-full">
      <input
        type="radio"
        name="radio-buttons"
        className="peer sr-only"
        // defaultChecked
        onChange={() => props.onChange(props.teamID)}
      />
      <div className="p-4 rounded dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm duration-150 ease-in-out">
        <div className="grid grid-cols-12 items-center gap-x-2">
          {/* Card */}
          <div className="col-span-6 order-1 sm:order-none sm:col-span-3 flex items-center space-x-4 lg:sidebar-expanded:col-span-6 xl:sidebar-expanded:col-span-3">
            {/* Logo */}

            {/* Team City and Name */}
            <div className="col-span-6 order-2 sm:order-none sm:col-span-3 text-left sm:text-center lg:sidebar-expanded:hidden xl:sidebar-expanded:block flex flex-row">
              <div className="text-sm">{props.teamCity}&nbsp;</div>
              <div className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">
                {props.teamName}
              </div>
            </div>
          </div>

          {/* Owner */}
          <div className="col-span-6 order-2 sm:order-none sm:col-span-3 text-left sm:text-center lg:sidebar-expanded:hidden xl:sidebar-expanded:block">
            <div className="text-sm">{props.owner}</div>
          </div>

          {/* Record */}
          <div className="col-span-6 order-1 sm:order-none sm:col-span-4 text-right sm:text-center lg:sidebar-expanded:col-span-6 xl:sidebar-expanded:col-span-4">
            <div className="text-sm">
              {props.wins}-{props.ties}-{props.losses}
            </div>
          </div>

          {/* Place */}
          <div className="col-span-6 order-2 sm:order-none sm:col-span-2 text-right lg:sidebar-expanded:hidden xl:sidebar-expanded:block">
            <div
              className={`text-xs inline-flex font-medium ${
                placeColors[String(props.place)]
              } rounded-full text-center px-2.5 py-1`}
            >
              {props.place}
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 dark:peer-checked:border-indigo-500 rounded pointer-events-none"
        aria-hidden="true"
      />
    </label>
  );
}
