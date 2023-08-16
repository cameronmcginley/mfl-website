import { useSelectedLayoutSegments } from "next/navigation";

interface SVGContainerProps {
  id: string;
  svgpaths: Array<{ svgpath: string; colorLight: string; colorDark: string }>;
}

export default function SVGContainer(props: SVGContainerProps): JSX.Element {
  // Get segment for light/dark mode
  const segments = useSelectedLayoutSegments();

  return (
    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
      {/* Map svgpaths to svg component */}
      {props.svgpaths.map((svgpath, index) => (
        <path
          key={index}
          className={`fill-current ${
            segments.includes(props.id) ? svgpath.colorLight : svgpath.colorDark
          }`}
          d={svgpath.svgpath}
        />
      ))}
    </svg>
  );
}
