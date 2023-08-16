interface DropdownProps {
  open: boolean;
}

export default function DropdownIcon(props: DropdownProps): JSX.Element {
  return (
    <div className="flex shrink-0 ml-2">
      <svg
        className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
          props.open && "rotate-180"
        }`}
        viewBox="0 0 12 12"
      >
        <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
      </svg>
    </div>
  );
}
