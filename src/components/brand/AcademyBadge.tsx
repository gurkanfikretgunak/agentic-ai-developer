import Image from "next/image";

/** Circular MasterFabric Academy badge (embroidered-patch logo). */
export function AcademyBadge({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/academy-badge.png"
      alt="MasterFabric Academy"
      width={size}
      height={size}
      className={`rounded-full ${className}`}
      priority={size <= 48}
    />
  );
}
