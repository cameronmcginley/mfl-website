export default function TeamListHeader(): JSX.Element {
  return (
    <label className="relative block text-left w-full">
      {/* <div className="p-4 rounded dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm duration-150 ease-in-out"> */}
      <div className="p-4 pt-2 pb-2 rounded border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="grid grid-cols-12 items-center gap-x-2">
          {/* Card */}
          <div className="col-span-6 order-1 sm:order-none sm:col-span-3 flex items-center space-x-4 lg:sidebar-expanded:col-span-6 xl:sidebar-expanded:col-span-3">
            {/* Logo */}

            {/* Team City and Name */}
            <div className="col-span-6 order-2 sm:order-none sm:col-span-3 text-left sm:text-center lg:sidebar-expanded:hidden xl:sidebar-expanded:block">
              <div className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">
                Team
              </div>
            </div>
          </div>

          {/* Owner */}
          <div className="col-span-6 order-2 sm:order-none sm:col-span-3 text-left sm:text-center lg:sidebar-expanded:hidden xl:sidebar-expanded:block">
            <div className="text-sm">Owner</div>
          </div>

          {/* Record */}
          <div className="col-span-6 order-1 sm:order-none sm:col-span-4 text-right sm:text-center lg:sidebar-expanded:col-span-6 xl:sidebar-expanded:col-span-4">
            <div className="text-sm">Record (W-T-L)</div>
          </div>

          {/* Place */}
          <div className="col-span-6 order-2 sm:order-none sm:col-span-2 text-right lg:sidebar-expanded:hidden xl:sidebar-expanded:block">
            <div className="text-sm">Place</div>
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
