export type WallpaperPlatform = "ios" | "android";

/** Official AI Engineer HUD loyalty wallpaper (device-native exports). */
export const WALLPAPER_ASSETS: Record<
  WallpaperPlatform,
  {
    src: string;
    width: number;
    height: number;
    aspect: string;
    file: string;
    label: string;
  }
> = {
  ios: {
    src: "/wallpapers/ai-engineer-ios.png",
    width: 1290,
    height: 2796,
    aspect: "9 / 19.5",
    file: "masterfabric-academy-wallpaper-ios.png",
    label: "iPhone · 1290×2796 · 9:19.5",
  },
  android: {
    src: "/wallpapers/ai-engineer-android.png",
    width: 1440,
    height: 3200,
    aspect: "9 / 20",
    file: "masterfabric-academy-wallpaper-android.png",
    label: "Android · 1440×3200 · 9:20",
  },
};

/**
 * Reference artwork wallpaper — centered Venn HUD + Academy seal.
 * Renders the official asset cropped to the target device aspect.
 */
export function WallpaperDocument({
  platform,
}: {
  platform: WallpaperPlatform;
}) {
  const asset = WALLPAPER_ASSETS[platform];

  return (
    <div
      className="relative w-full overflow-hidden bg-[#050505]"
      style={{ aspectRatio: asset.aspect }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset.src}
        alt="MasterFabric Academy — AI Engineer HUD wallpaper"
        width={asset.width}
        height={asset.height}
        className="absolute inset-0 h-full w-full object-cover object-center"
        draggable={false}
      />
    </div>
  );
}
