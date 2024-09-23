import { useMemo } from "react";
import {
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const JumpCuts = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const sections = useMemo(() => {
    return [
      { startFrom: 0, endAt: 5 * fps },
      {
        startFrom: 7 * fps,
        endAt: 10 * fps,
      },
      {
        startFrom: 13 * fps,
        endAt: 18 * fps,
      },
    ];
  }, [fps]);

  const startFrom = useMemo(() => {
    let summedUpDurations = 0;
    for (const section of sections) {
      summedUpDurations += section.endAt - section.startFrom;
      if (summedUpDurations > frame) {
        return section.endAt - summedUpDurations;
      }
    }

    return null;
  }, [frame, sections]);

  if (startFrom === null) {
    return null;
  }

  return (
    <OffthreadVideo
      pauseWhenBuffering
      startFrom={startFrom}
      // Remotion will automatically add a time fragment to the end of the video URL
      // based on `startFrom` and `endAt`. Opt out of this by adding one yourself.
      src={`${staticFile("time.mp4")}#t=0,`}
    />
  );
};
