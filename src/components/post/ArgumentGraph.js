import React, { useCallback } from 'react'
import { ForceGraph } from '../../util/forceGraph';
import withStyles from '@material-ui/core/styles/withStyles';

//redux imports
import { useDispatch, useSelector } from 'react-redux';

export default function ArgumentGraph() {
    const {graphData: {
        nodes,
        links
    }} = useSelector((state) => state.data.post)
    
      const nodeHoverTooltip = useCallback((node) => {
        return `<div>${node.id}</div>`;
      }, []);

    return (
        nodes === [] ? (
            <div>Loading graph...</div>
        ) : (
            <ForceGraph
                linksData={links}
                nodesData={nodes}
                nodeHoverTooltip={nodeHoverTooltip}
            />
        )     
    )
}
