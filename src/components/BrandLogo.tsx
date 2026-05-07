type BrandLogoProps = {
  className?: string;
  imageClassName?: string;
};

export function BrandLogo({ className = "", imageClassName = "" }: BrandLogoProps) {
  return (
    <span
      className={`inline-flex items-center justify-center overflow-hidden rounded-lg bg-white/95 p-1 ${className}`.trim()}
    >
      <img
        src="/nust_society_of_maritime_engineers_logo.jpg"
        alt="NUST Society of Maritime Engineers"
        className={`h-full w-full object-contain ${imageClassName}`.trim()}
      />
    </span>
  );
}