/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useRef, useState } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-github';

function PythonCodeEditor() {
  const pythonCode = `stack = [1, 2, 3, 4]
  print(stack)
  
  `;
  const editorRef = useRef(null);
  const [editorValue, setEditorValue] = useState(pythonCode);
  // const [output, setOutput] = useState('');

  const handleCopy = () => {
    if (editorRef.current) {
      const code = editorRef.current.editor.getValue();
      navigator.clipboard.writeText(code);
    }
  };

  const handleRun = async () => {

  };

  return (
    <>
      <AceEditor
        ref={editorRef}
        mode="python"
        theme="github"
        value={editorValue}
        onChange={(value) => setEditorValue(value)}
        style={{ width: '100%', height: '170px' }}
      />
      <button className="copy" type="button" onClick={handleCopy}>Copy Code</button>
      <button className="run" type="button" onClick={handleRun}>Run Code</button>
      {/* <div>{output}</div> */}
    </>
  );
}

export default function CodeContainer() {
  return (
    <div className="codeContainer">
      {/* <h5>Python Code Editor</h5> */}
      <PythonCodeEditor />
    </div>
  );
}
