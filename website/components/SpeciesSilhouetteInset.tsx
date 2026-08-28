import Image from "next/image";

type SpeciesSilhouetteInsetVariant = "aphid" | "bat" | "bird" | "varroa" | "toad";

interface SpeciesSilhouetteInsetProps {
  src: string;
  variant: SpeciesSilhouetteInsetVariant;
}

const VARIANTS: Record<
  SpeciesSilhouetteInsetVariant,
  { frameClass: string; imageClass: string; sizes: string }
> = {
  aphid: {
    frameClass: "h-16 w-16 sm:h-20 sm:w-20",
    imageClass: "h-full w-full object-contain",
    sizes: "(max-width: 639px) 64px, 80px",
  },
  bat: {
    frameClass: "h-16 w-16 sm:h-20 sm:w-20",
    imageClass: "h-full w-full object-contain",
    sizes: "(max-width: 639px) 64px, 80px",
  },
  bird: {
    frameClass: "h-16 w-16 sm:h-20 sm:w-20",
    imageClass: "h-full w-full object-contain",
    sizes: "(max-width: 639px) 64px, 80px",
  },
  varroa: {
    frameClass: "h-16 w-16 sm:h-20 sm:w-20",
    imageClass: "h-full w-full object-contain",
    sizes: "(max-width: 639px) 64px, 80px",
  },
  toad: {
    frameClass: "h-12 w-[5.5rem] sm:h-16 sm:w-28",
    imageClass:
      "absolute left-1/2 top-1/2 h-[5.75rem] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 sm:h-[7.75rem]",
    sizes: "(max-width: 639px) 88px, 112px",
  },
};

/**
 * A decorative opening inset for species-specific prose. The surrounding text
 * identifies the subject, so the silhouette is not repeated to assistive tech.
 */
export function SpeciesSilhouetteInset({ src, variant }: SpeciesSilhouetteInsetProps) {
  const style = VARIANTS[variant];

  return (
    <div
      aria-hidden="true"
      className={`species-silhouette relative float-left mr-3 mt-0.5 mb-1 block overflow-hidden sm:mr-4 ${style.frameClass}`}
    >
      <Image
        src={src}
        alt=""
        width={1254}
        height={1254}
        sizes={style.sizes}
        className={style.imageClass}
      />
    </div>
  );
}
