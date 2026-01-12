import Link from "next/link";

export default function SidebarItem({
  title,
  href,
  icon,
  isActive,
}: {
  title: string;
  href: string;
  icon: React.ReactNode;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-3 py-2 hover:bg-accent hover:text-accent-foreground ${
        isActive
          ? "bg-primary/20 hover:bg-primary/18  border-l-4 border-primary"
          : "text-foreground/70"
      }`}
    >
      <h4 className={`${isActive ? "text-primary" : ""} text-[22px]`}>
        {icon}
      </h4>
      <h4>{title}</h4>
    </Link>
  );
}
