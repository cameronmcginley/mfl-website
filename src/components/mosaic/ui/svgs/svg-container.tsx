import { useSelectedLayoutSegments } from "next/navigation";

interface SVGContainerProps {
  id: string;
  svgpath1: string;
  svgpath2: string;
}

export default function SVGContainer(props: SVGContainerProps): JSX.Element {
  // Get segment for light/dark mode
  const segments = useSelectedLayoutSegments();

  return (
    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
      <path
        className={`fill-current ${
          segments.includes(props.id) ? "text-indigo-500" : "text-slate-600"
        }`}
        // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d
        d={props.svgpath1}
      />
      <path
        className={`fill-current ${
          segments.includes(props.id) ? "text-indigo-300" : "text-slate-400"
        }`}
        d={props.svgpath2}
      />
    </svg>
  );
}
