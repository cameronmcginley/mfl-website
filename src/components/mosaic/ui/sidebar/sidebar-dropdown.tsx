import { useSelectedLayoutSegments } from "next/navigation";
import { useEffect, useState } from "react";
import DropdownIcon from "../svgs/dropdown";
import SVGContainer from "../svgs/svg-container";
import SidebarLink from "./sidebar-link";

interface SidebarDropdownProps {
  open?: boolean;
  title: string;
  id: string;
  url: string;
  svgpaths: Array<{ svgpath: string; colorLight: string; colorDark: string }>;
  subpaths: Array<{ title: string; url: string }>;
  expandOnly: boolean;
  setSidebarExpanded: (expanded: boolean) => void;
}

export default function SidebarDropdown(
  props: SidebarDropdownProps
): JSX.Element {
  const [openGroup, setOpenGroup] = useState<boolean>(false);
  const segments = useSelectedLayoutSegments();

  // Determine if page is being viewed
  // If so, open the dropdown as default (for page refreshing)
  const isActive = segments.includes(props.id);
  useEffect(() => {
    if (isActive) {
      setOpenGroup(true);
    }
  }, [isActive]);

  // Toggle dropdown
  const handleClick = (): void => {
    setOpenGroup(!openGroup);
  };

  return (
    <li
      className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 group is-link-group ${
        isActive && openGroup && "bg-slate-900"
      }`}
    >
      <>
        {/* Main button */}
        <a
          href="#0"
          className={`block text-slate-200 truncate transition duration-150 ${
            isActive ? "hover:text-slate-200" : "hover:text-white"
          }`}
          // Toggle dropdown
          onClick={(e) => {
            e.preventDefault();
            props.expandOnly ? props.setSidebarExpanded(true) : handleClick();
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/* Icon */}
              <SVGContainer id={props.id} svgpaths={props.svgpaths} />

              {/* Title */}
              <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                {props.title}
              </span>
            </div>

            {/* Dropdown Icon */}
            <DropdownIcon open={openGroup} />
          </div>
        </a>
        {/* Sub links */}
        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
          <ul className={`pl-9 mt-1 ${!openGroup && "hidden"}`}>
            {/* Map all the subpaths */}
            {props.subpaths.map((subpath, index) => (
              <li className="mb-1 last:mb-0" key={index}>
                <SidebarLink href={subpath.url}>
                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                    {subpath.title}
                  </span>
                </SidebarLink>
              </li>
            ))}
          </ul>
        </div>
      </>
    </li>
  );
}
