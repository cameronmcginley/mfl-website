import { useSelectedLayoutSegments } from "next/navigation";
import SidebarLink from "./sidebar-link";
import SVGContainer from "./svgs/svg-container";

interface SidebarButtonProps {
  title: string;
  id: string;
  url: string;
  // svgpath1: string;
  // svgpath2: string;
  svgpaths: Array<{ svgpath: string; colorLight: string; colorDark: string }>;
}

export default function SidebarButton(props: SidebarButtonProps): JSX.Element {
  // Get segment for light/dark mode
  const segments = useSelectedLayoutSegments();

  return (
    <li
      className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
        segments.includes(props.id) && "bg-slate-900"
      }`}
    >
      <SidebarLink href={props.url}>
        <div className="flex items-center">
          {/* Icon */}
          <SVGContainer id={props.id} svgpaths={props.svgpaths} />

          {/* Title */}
          <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
            {props.title}
          </span>
        </div>
      </SidebarLink>
    </li>
  );
}
