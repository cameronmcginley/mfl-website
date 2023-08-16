"use client";

import { Menu, Transition } from "@headlessui/react";

interface DropdownProps {
  options: [{ id: number; text: string }];
  selected: number;
  onUpdate: (id: number) => void;
}
export default function Dropdown(props: DropdownProps) {
  // Map props.options to options
  const options = props.options.map((option, index) => ({
    id: index,
    period: option.text,
  }));

  //   const [selected, setSelected] = useState<number>(0);

  return (
    <Menu as="div" className="relative inline-flex">
      {({ open }) => (
        <>
          <Menu.Button
            className="btn justify-between min-w-[11rem] bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-200"
            aria-label="Select date range"
          >
            {/* Currently selection option */}
            <span className="flex items-center">
              <span>{options[props.selected].period}</span>
            </span>

            {/* Dropdown icon */}
            <svg
              className="shrink-0 ml-1 fill-current text-slate-400"
              width="11"
              height="7"
              viewBox="0 0 11 7"
            >
              <path d="M5.4 6.8L0 1.4 1.4 0l4 4 4-4 1.4 1.4z" />
            </svg>
          </Menu.Button>

          <Transition
            className="z-10 absolute top-full right-0 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1"
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 -translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-out duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Menu.Items className="font-medium text-sm text-slate-600 dark:text-slate-300 focus:outline-none">
              {options.map((option, optionIndex) => (
                <Menu.Item key={optionIndex}>
                  {({ active }) => (
                    <button
                      className={`flex items-center w-full py-1 px-3 cursor-pointer ${
                        active ? "bg-slate-50 dark:bg-slate-700/20" : ""
                      } ${option.id === props.selected && "text-indigo-500"}`}
                      onClick={() => {
                        // setSelected(option.id);
                        props.onUpdate(option.id);
                      }}
                    >
                      <svg
                        className={`shrink-0 mr-2 fill-current text-indigo-500 ${
                          option.id !== props.selected && "invisible"
                        }`}
                        width="12"
                        height="9"
                        viewBox="0 0 12 9"
                      >
                        <path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z" />
                      </svg>
                      <span>{option.period}</span>
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
