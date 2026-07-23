import React from "react";
import { Composition, registerRoot } from "remotion";
import { ZaserBrandReel } from "./ZaserBrandReel";

export const RemotionRoot = () => {
  return (
    <Composition
      id="ZaserBrandReel"
      component={ZaserBrandReel}
      durationInFrames={600}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};

registerRoot(RemotionRoot);
