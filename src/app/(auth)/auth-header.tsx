import Logo from "@/src/components/mosaic/ui/logo";

export default function AuthHeader(): JSX.Element {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <Logo />
      </div>
    </div>
  );
}
