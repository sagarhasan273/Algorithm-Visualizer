/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
import keyValue from '../../../Components/GenerateKey';
import QuickNodes from './QuickNodes';

export default function NodesPrinting({ nodes, nodesInPositions }) {
  const newNodes = new Array([]);
  for (let i = 0; i < nodes.length; i += 1) {
    newNodes.push(nodesInPositions[nodes[i]].map((value) => {
      console.log(value.length, value);
      if (value.length === 2) {
        return value.map((val) => <QuickNodes key={keyValue()} x={val[0]} y={val[1]} value={val[2]} i={val[3]} color="sorted" index="indexView" />);
      }
      return value.map((val) => <QuickNodes key={keyValue()} x={val[0]} y={val[1]} value={val[2]} color="" i={val[3]} index={i === 0 ? 'indexView' : ''} />);
    }));
  }

  return newNodes;
}
