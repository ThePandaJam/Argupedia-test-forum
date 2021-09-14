import React, { useCallback } from 'react'
import { ForceGraph } from '../../util/forceGraph';

//redux imports
import { useDispatch, useSelector } from 'react-redux';

export default function ArgumentGraph() {
    const data = {
        nodes: [
          { id: "Harry", color: "red", size: 600 },
          { id: "Sally" },
          { id: "Alice" }
        ],
        links: [
          { source: "Harry", target: "Sally" },
          { source: "Harry", target: "Alice" }
        ]
      };
    
      const nodeHoverTooltip = useCallback((node) => {
        return `<div>${node.id}</div>`;
      }, []);

    return (
        <div>
            <ForceGraph
                linksData={data.links}
                nodesData={data.nodes}
                nodeHoverTooltip={nodeHoverTooltip}
            />
        </div>
    )
}
