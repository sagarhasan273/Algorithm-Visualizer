/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import pyodide from 'pyodide';

function App() {
  const pyodideInstance = pyodide.init();

  const pythonCode = `
  import random

  print(random.randint(1, 10))
  `;

  pyodideInstance.runPython(pythonCode);

  const output = pyodideInstance.getPythonValue('random.randint(1, 10)');

  return (
    <div>
      <h1>The output of the Python code is:</h1>
      <h2>{output}</h2>
    </div>
  );
}
function LinkedList() {
  return (
    <div>
      <App />
    </div>
  );
}

export default LinkedList;
