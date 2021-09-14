//https://gist.github.com/gilf/2c28025c16c005a0d714a5fab014941f#file-forcegraph-jsx

import React, { useRef, useEffect } from "react";
import { runForceGraph } from "./forceGraphGenerator";
import styles from './forceGraph.css'

export function ForceGraph({ linksData, nodesData, nodeHoverTooltip }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let destroyFn;

    if (containerRef.current) {
      const { destroy } = runForceGraph(containerRef.current, linksData, nodesData, nodeHoverTooltip);
      destroyFn = destroy;
    }

    return destroyFn;
  }, []);

  return <div ref={containerRef} className={styles.graphContainer} />;
}