import { Composition } from "remotion";
import { JumpCuts } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={JumpCuts}
        durationInFrames={30 * 30}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
