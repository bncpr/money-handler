import { easeElastic, select } from "d3";
import { keys } from "ramda";
import { useEffect } from "react";

export const useInitialBarsAnimationEffect = rects => {
  useEffect(() => {
    keys(rects).forEach(key => {
      const rect = rects[key];
      const ref = rect.props.ref;
      select(ref.current)
        .transition()
        .ease(easeElastic.period(0.9))
        .duration(900)
        .attr("y", rect.props.y)
        .attr("height", rect.props.height);
    });
  }, [rects]);
};
