/* eslint-disable no-undef */
import { useRef, useState } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-github';

function PythonCodeEditor({
  setStack, code, setCode, isHovered,
}) {
  const editorRef = useRef(null);

  const handleCopy = (e) => {
    if (editorRef.current) {
      const codePy = editorRef.current.editor.getValue();
      navigator.clipboard.writeText(codePy);
    }
    let counter = 0;
    e.target.style.color = 'green';
    e.target.innerHTML = '<i class="fas fa-check-double"></i> Copied!';
    console.log(e.target.innerHTML);
    const interval = setTimeout(() => {
      e.target.style.color = 'black';
      e.target.innerHTML = '<i class="fas fa-copy"></i> Copy';
      counter += 1;
      if (counter === 1) {
        clearInterval(interval);
      }
    }, 2000);
  };

  const handleRun = async (e) => {
    console.log('Code running...');
    e.target.innerHTML = '<i class="fa fa-circle-o-notch fa-spin"></i>Running...';
    e.target.style.opacity = '1';
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
    e.target.innerHTML = 'Run Code';
    e.target.style.opacity = '0.8';
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
        style={{ width: '100%', height: '35vh' }}
      />
      <button className="copy" type="button" onClick={handleCopy} style={{ display: isHovered ? 'block' : 'none' }}><i className="fas fa-copy" /> Copy</button>
      <button className="run" type="button" onClick={handleRun}>Run Code</button>
      <h2 className="pythonTitle">Python Code</h2>
    </>
  );
}

export default function StackCode({
  code, setStack, setCode,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    let counter = 0;
    const interval = setTimeout(() => {
      setIsHovered(false);
      counter += 1;
      if (counter === 1) {
        clearInterval(interval);
      }
    }, 1500);
  };
  return (
    <div className="codeContainer" onMouseMove={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <PythonCodeEditor
        setStack={setStack}
        code={code}
        setCode={setCode}
        isHovered={isHovered}
      />
    </div>
  );
}
