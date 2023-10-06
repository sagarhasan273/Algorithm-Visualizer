export default function NodesPrinting({ nodes, nodesInPositions }) {
  const newNodes = new Set([]);

  for (let i = 0; i < nodes.length; i += 1) {
    if (newNodes.has(nodesInPositions[nodes[i]][0])) {
      newNodes.delete(nodesInPositions[nodes[i]][0]);
      newNodes.add(nodesInPositions[nodes[i]][1]);
    } else { newNodes.add(nodesInPositions[nodes[i]][0]); }
  }
  return newNodes;
}
