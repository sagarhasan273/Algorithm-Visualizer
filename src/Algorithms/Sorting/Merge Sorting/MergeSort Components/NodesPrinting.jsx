/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
import keyValue from '../../../Components/GenerateKey';
import MergeNodes from './MergeNodes';

export default function NodesPrinting({ nodes, nodesInPositions }) {
  const newMap = {};
  let lastKey = nodes[0];
  for (let i = 0; i < nodes.length; i += 1) {
    if (newMap[nodes[i]] !== undefined) {
      newMap[nodes[i]] = nodesInPositions[nodes[i]][1];
    } else { newMap[nodes[i]] = nodesInPositions[nodes[i]][0]; }
    lastKey = nodes[i];
  }

  const newNodes = Object.entries(newMap).map((val) => val[1].map((value) => <MergeNodes key={keyValue()} x={value[0]} y={value[1]} value={value[2]} color={lastKey === val[0]} />));
  return newNodes;
}
