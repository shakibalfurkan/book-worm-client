import Image from "next/image";
import Link from "next/link";
import logoImage from "../../public/library-logo.svg";

export default function Logo() {
  return (
    <section className="w-fit">
      <Link
        href="/"
        className="flex items-center gap-1 p-1 group transition-all duration-300 ease-in-out"
      >
        <div className="relative overflow-hidden rounded-lg transition-colors">
          <Image
            src={logoImage}
            height={40}
            width={40}
            alt="BookWorm Logo"
            className="transform group-hover:scale-105 size-8 lg:size-10 transition-transform duration-300"
          />
        </div>

        <h2 className="font-display text-2xl font-bold tracking-tight">
          Book<span className="text-primary">Worm</span>
        </h2>
      </Link>
    </section>
  );
}
