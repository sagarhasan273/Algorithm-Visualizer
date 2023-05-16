/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import { useRef } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-github';

function PythonCodeEditor({ setStack, code, setCode }) {
  const editorRef = useRef(null);
  // const [editorValue, setEditorValue] = useState(code);

  const handleCopy = (e) => {
    if (editorRef.current) {
      const codePy = editorRef.current.editor.getValue();
      navigator.clipboard.writeText(codePy);
    }
    let counter = 0;
    e.target.style.color = 'green';
    e.target.innerHTML = 'Copied!';
    const interval = setTimeout(() => {
      e.target.style.color = 'black';
      e.target.innerHTML = 'Copy Code';
      counter += 1;
      if (counter === 2) {
        clearInterval(interval);
      }
    }, 1000);
  };

  const handleRun = async () => {
    console.log('Code running...');
    const pyodide = await loadPyodide();
    // Pyodide is now ready to use...
    pyodide.runPython(`
    import sys
    import io
    sys.stdout = io.StringIO()
`);
    pyodide.runPython(code);
    const stdout = pyodide.runPython('sys.stdout.getvalue()');
    setStack(JSON.parse(stdout));
    console.log('Code exicuted!');
  };

  return (
    <>
      <AceEditor
        className="aceEditor"
        ref={editorRef}
        mode="python"
        theme="github"
        value={code}
        onChange={(value) => setCode(value)}
        style={{ width: '100%', height: '190px' }}
      />
      <button className="copy" type="button" onClick={handleCopy}>Copy Code</button>
      <button className="run" type="button" onClick={handleRun}>Run Code</button>
    </>
  );
}

export default function CodeContainer({
  code, setStack, setCode,
}) {
  return (
    <div className="codeContainer">
      <PythonCodeEditor setStack={setStack} code={code} setCode={setCode} />
    </div>
  );
}
