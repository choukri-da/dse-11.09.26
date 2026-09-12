import Image from "next/image";

export interface SocialProvider {
  id: string;
  label: string;
  icon: string;
}

export interface SocialProvidersProps {
  action: "sign-in" | "sign-up";
  providers?: SocialProvider[];
}

const defaultProviders: SocialProvider[] = [
  { id: "google", label: "Google", icon: "/google.svg" },
  { id: "apple", label: "Apple", icon: "/apple.svg" },
];

export function SocialProviders({
  action,
  providers = defaultProviders,
}: SocialProvidersProps) {
  return (
    <div className="flex flex-col gap-3">
      {providers.map((provider) => (
        <button
          key={provider.id}
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-full border border-light-300 bg-light-100 px-6 py-3 text-body-medium text-dark-900 transition-colors hover:bg-light-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-900"
        >
          <Image src={provider.icon} alt="" width={20} height={20} />
          Continue with {provider.label}
        </button>
      ))}
      <p className="sr-only">
        {action === "sign-in"
          ? "Sign in with a social provider"
          : "Sign up with a social provider"}
      </p>
    </div>
  );
}

export default SocialProviders;
