import Link from "next/link";

interface LinkCardProps {
  text: string;
  url: string;
}

export default function LinkCard(props: LinkCardProps): JSX.Element {
  return (
    <div className="w-48 m-2 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <div className="flex flex-col h-full">
        {/* Card top */}
        <Link href={props.url}>
          <div className="grow p-3 hover:dark:bg-slate-700 hover:bg-slate-100">
            <header>
              {/* Text */}
              <div className="text-center">
                <h2 className="text-xl leading-snug justify-center font-semibold">
                  {props.text}
                </h2>
              </div>
            </header>
          </div>
        </Link>
      </div>
    </div>
  );
}
