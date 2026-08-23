import { cn } from "@/lib/utils";
import { BRAND_ASSETS, type BrandIconAssetName } from "@/content/brand-assets";

export type BrandIconName = BrandIconAssetName;

export function BrandIcon({
  name,
  size = 24,
  className,
  decorative = true,
  label,
}: {
  name: BrandIconName;
  size?: number;
  className?: string;
  decorative?: boolean;
  label?: string;
}) {
  const asset = BRAND_ASSETS.iconos[name];
  return (
    <span
      className={cn("relative inline-flex shrink-0", className)}
      style={{ width: size, height: size }}
      aria-hidden={decorative ? "true" : undefined}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : label ?? name}
    >
      <img
        src={asset.negro}
        alt=""
        aria-hidden="true"
        className="brand-asset-negro absolute inset-0 h-full w-full object-contain select-none pointer-events-none"
        draggable={false}
      />
      <img
        src={asset.blanco}
        alt=""
        aria-hidden="true"
        className="brand-asset-blanco absolute inset-0 h-full w-full object-contain select-none pointer-events-none"
        draggable={false}
      />
    </span>
  );
}
