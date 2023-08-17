"use client";

import ChiefsLogo from "@/public/images/chiefs-logo.jpg";
import { handleSignOut } from "@/src/functions/authHelpers";
// import { auth } from "@/src/firebase/config";
import { useAuth } from "@/src/functions/useAuth";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DropdownProfile({
  align,
}: {
  align?: "left" | "right";
}): JSX.Element {
  /// ////////////////////// AUTH /////////////////////////
  // Collect auth data from helper
  const auth = useAuth();
  const user = auth.user;
  const loading = auth.loading;
  // Track whether we have started loading yet
  // Prevents rendering beforehand
  const [hasDoneLoading, setHasDoneLoading] = useState(false);
  useEffect(() => {
    if (loading) {
      setHasDoneLoading(true);
    }
  }, [loading]);
  /// ////////////////////// AUTH /////////////////////////

  let displayProfile;
  // If not started loading, or still loading, show nothing
  if (!hasDoneLoading || loading) {
    console.log("loading");
    displayProfile = <></>;
  }
  // If done loading, and no user, show signin button
  else if (!loading && !user) {
    console.log("no user");
    displayProfile = (
      <Menu.Button className="inline-flex justify-center items-center group">
        <div className="flex items-center truncate">
          <Link href="/signin">
            <span className="truncate ml-2 text-sm font-medium dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200">
              Sign In
            </span>
          </Link>
        </div>
      </Menu.Button>
    );
  }
  // If done loading, and there is a user, show user section
  else if (!loading && user) {
    console.log("user");
    displayProfile = (
      <>
        <Menu.Button className="inline-flex justify-center items-center group">
          {/* Profile image */}
          <Image
            className="w-8 h-8 rounded-full"
            src={ChiefsLogo}
            width={32}
            height={32}
            alt="User"
          />
          <div className="flex items-center truncate">
            <span className="truncate ml-2 text-sm font-medium dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200">
              {user?.displayName}
            </span>
            <svg
              className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
              viewBox="0 0 12 12"
            >
              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
            </svg>
          </div>
        </Menu.Button>

        {/* Section on dropdown */}
        <Transition
          className={`origin-top-right z-10 absolute top-full min-w-[11rem] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${
            align === "right" ? "right-0" : "left-0"
          }`}
          enter="transition ease-out duration-200 transform"
          enterFrom="opacity-0 -translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Menu.Items as="ul" className="focus:outline-none">
            <Menu.Item as="li">
              {({ active }) => (
                <div
                  className={`font-medium text-sm flex items-center py-1 px-3 ${
                    active
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-indigo-500"
                  } cursor-pointer`}
                  onClick={() => {
                    handleSignOut();
                  }}
                >
                  Sign Out
                </div>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </>
    );
  }

  return (
    <Menu as="div" className="relative inline-flex">
      {/* Sign in button if no user, else the user section */}

      {/* If we're done loading, and there is no user, show signin button */}
      {/* Else show user */}
      {displayProfile}
    </Menu>
  );
}
