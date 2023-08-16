import { useSelectedLayoutSegments } from "next/navigation";
import SidebarLink from "./sidebar-link";
import SidebarLinkGroup from "./sidebar-link-group";
import DropdownIcon from "./svgs/dropdown";
import SVGContainer from "./svgs/svg-container";

interface SidebarButtonGroupProps {
  title: string;
  id: string;
  url: string;
  // svgpaths is array of maps, each map has svgpath, colorLight, colorDark
  svgpaths: Array<{ svgpath: string; colorLight: string; colorDark: string }>;
  subpaths: Array<{ title: string; url: string }>;
  expandOnly: boolean;
  setSidebarExpanded: (expanded: boolean) => void;
}

export default function SidebarButtonGroup(
  props: SidebarButtonGroupProps
): JSX.Element {
  // Get segment for light/dark mode
  const segments = useSelectedLayoutSegments();

  return (
    <SidebarLinkGroup open={segments.includes(props.id)}>
      {(handleClick, open) => {
        return (
          <>
            <a
              href="#0"
              className={`block text-slate-200 truncate transition duration-150 ${
                segments.includes(props.id)
                  ? "hover:text-slate-200"
                  : "hover:text-white"
              }`}
              onClick={(e) => {
                e.preventDefault();
                props.expandOnly
                  ? props.setSidebarExpanded(true)
                  : handleClick();
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
                <DropdownIcon open={open} />
              </div>
            </a>
            {/* Sub links */}
            <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
              <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
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
        );
      }}
    </SidebarLinkGroup>
  );
}
