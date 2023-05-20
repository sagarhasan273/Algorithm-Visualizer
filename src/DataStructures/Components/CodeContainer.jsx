/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
import { useRef, useState } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-github';
import './CodeContainer.scss';
import keyValue from './GenerateKey';

function PythonCodeEditor({
  setData, code, setCode, isHovered, data,
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
    e.target.innerHTML = '<i class="fa fa-circle-o-notch fa-spin"></i> Running...';
    const pyodide = await loadPyodide();
    // Pyodide is now ready to use...
    pyodide.runPython(`
    import sys
    import io
    sys.stdout = io.StringIO()
    `);
    let stdout = null;
    try {
      pyodide.runPython(code);
      stdout = pyodide.runPython('sys.stdout.getvalue()');
      const list = JSON.parse(stdout);
      const updatedArray1 = [...data];

      // Traverse array1 and compare data values with array2
      updatedArray1.forEach((item, index) => {
        const newData = list[index];

        if (newData === undefined) {
          // Handle deletion - remove the item from updatedArray1
          updatedArray1.splice(index, 1);
        } else if (item.data !== newData) {
          // Handle data update - generate a new random id
          const newId = keyValue();
          item.id = newId;
          item.data = newData;
        }
      });

      // Handle insertion of new elements from array2
      if (list.length > updatedArray1.length) {
        for (let i = updatedArray1.length; i < list.length; i++) {
          const newData = list[i];
          const newId = keyValue();
          updatedArray1.push({ id: newId, data: newData });
        }
      }
      setData(updatedArray1);
    } catch (error) {
      alert(`${stdout} \n Do not follow the fundamental concept!`);
    }
    e.target.innerHTML = 'Run Code';
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
        style={{ width: '100%', height: '30vh' }}
      />
      <button className="copy" type="button" onClick={handleCopy} style={{ display: isHovered ? 'block' : 'none' }}><i className="fas fa-copy" /> Copy</button>
      <button className="run" type="button" onClick={handleRun}>Run Code</button>
      <h2 className="pythonTitle">Python Code</h2>
    </>
  );
}

export default function CodeContainer({
  code, setData, setCode, data,
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
        setData={setData}
        code={code}
        setCode={setCode}
        isHovered={isHovered}
        data={data}
      />
    </div>
  );
}
