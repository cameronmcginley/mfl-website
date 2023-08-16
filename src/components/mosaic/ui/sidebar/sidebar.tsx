"use client";

import { useAppProvider } from "@/src/app/app-provider";
import { Transition } from "@headlessui/react";
import { useSelectedLayoutSegments } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getBreakpoint } from "../../utils/utils";
import Logo from "./../logo";
import SidebarButton from "./sidebar-button";
import SidebarButtonGroup from "./sidebar-button-group";

export default function Sidebar() {
  const sidebar = useRef<HTMLDivElement>(null);
  const { sidebarOpen, setSidebarOpen } = useAppProvider();
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(false);
  const segments = useSelectedLayoutSegments();
  const [breakpoint, setBreakpoint] = useState<string | undefined>(
    getBreakpoint()
  );
  const expandOnly =
    !sidebarExpanded && (breakpoint === "lg" || breakpoint === "xl");

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (sidebar.current == null) return;
      if (!sidebarOpen || sidebar.current.contains(target as Node)) return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => {
      document.removeEventListener("click", clickHandler);
    };
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("keydown", keyHandler);
    };
  });

  const handleBreakpoint = () => {
    setBreakpoint(getBreakpoint());
  };

  useEffect(() => {
    window.addEventListener("resize", handleBreakpoint);
    return () => {
      window.removeEventListener("resize", handleBreakpoint);
    };
  }, [breakpoint]);

  return (
    <div className={`min-w-fit ${sidebarExpanded ? "sidebar-expanded" : ""}`}>
      {/* Sidebar backdrop (mobile only) */}
      <Transition
        className="fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto"
        show={sidebarOpen}
        enter="transition-opacity ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-out duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        aria-hidden="true"
      />

      {/* Sidebar */}
      <Transition
        show={sidebarOpen}
        unmount={false}
        as="div"
        id="sidebar"
        ref={sidebar}
        className="flex lg:!flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => {
              setSidebarOpen(!sidebarOpen);
            }}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <Logo />
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Group 1 */}
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Group 1
              </span>
            </h3>
            <ul className="mt-3">
              {/* E-Commerce */}
              <SidebarButtonGroup
                id="ecommerce"
                title="E-commerce"
                url="/ecommerce"
                svgpaths={[
                  {
                    svgpath:
                      "M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z",
                    colorLight: "text-indigo-300",
                    colorDark: "text-slate-400",
                  },
                  {
                    svgpath: "M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z",
                    colorLight: "text-indigo-600",
                    colorDark: "text-slate-700",
                  },
                  {
                    svgpath:
                      "M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z",
                    colorLight: "text-indigo-500",
                    colorDark: "text-slate-600",
                  },
                ]}
                subpaths={[
                  { title: "Main", url: "/ecommerce" },
                  { title: "Analytics", url: "/ecommerce/analytics" },
                ]}
                expandOnly={expandOnly}
                setSidebarExpanded={setSidebarExpanded}
              />

              {/* Inbox */}
              <SidebarButton
                title="Inbox"
                id="inbox"
                url="/inbox"
                svgpaths={[
                  {
                    svgpath: "M16 13v4H8v-4H0l3-9h18l3 9h-8Z",
                    colorLight: "text-indigo-500",
                    colorDark: "text-slate-600",
                  },
                  {
                    svgpath:
                      "m23.72 12 .229.686A.984.984 0 0 1 24 13v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-8c0-.107.017-.213.051-.314L.28 12H8v4h8v-4H23.72ZM13 0v7h3l-4 5-4-5h3V0h2Z",
                    colorLight: "text-indigo-300",
                    colorDark: "text-slate-400",
                  },
                ]}
              />

              {/* Calendar */}
              <SidebarButton
                title="Calendar"
                id="calendar"
                url="/calendar"
                svgpaths={[
                  {
                    svgpath: "M1 3h22v20H1z",
                    colorLight: "text-indigo-500",
                    colorDark: "text-slate-600",
                  },
                  {
                    svgpath: "M21 3h2v4H1V3h2V1h4v2h10V1h4v2Z",
                    colorLight: "text-indigo-300",
                    colorDark: "text-slate-400",
                  },
                ]}
              />

              {/* Card */}
              <SidebarButton
                title="Cards"
                id="cards"
                url="/cards"
                svgpaths={[
                  {
                    svgpath: "M1 3h22v20H1z",
                    colorLight: "text-indigo-500",
                    colorDark: "text-slate-600",
                  },
                  {
                    svgpath: "M21 3h2v4H1V3h2V1h4v2h10V1h4v2Z",
                    colorLight: "text-indigo-300",
                    colorDark: "text-slate-400",
                  },
                ]}
              />
            </ul>
          </div>
          {/* Group 2 */}
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Group 2
              </span>
            </h3>
            <ul className="mt-3">
              {/* Card */}
              <SidebarButton
                title="Cards"
                id="cards"
                url="/cards"
                svgpaths={[
                  {
                    svgpath: "M1 3h22v20H1z",
                    colorLight: "text-indigo-500",
                    colorDark: "text-slate-600",
                  },
                  {
                    svgpath: "M21 3h2v4H1V3h2V1h4v2h10V1h4v2Z",
                    colorLight: "text-indigo-300",
                    colorDark: "text-slate-400",
                  },
                ]}
              />
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button
              onClick={() => {
                setSidebarExpanded(!sidebarExpanded);
              }}
            >
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                viewBox="0 0 24 24"
              >
                <path
                  className="text-slate-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </Transition>
    </div>
  );
}
