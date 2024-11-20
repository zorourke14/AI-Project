import { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';

// Configure Monaco Editor
self.MonacoEnvironment = {
  getWorkerUrl: function (moduleId, label) {
    if (label === 'json') {
      return './json.worker.bundle.js';
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return './css.worker.bundle.js';
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return './html.worker.bundle.js';
    }
    if (label === 'typescript' || label === 'javascript') {
      return './ts.worker.bundle.js';
    }
    return './editor.worker.bundle.js';
  }
};


const CodeEditor = ({ code, onChange, language = 'javascript' }) => {
  const editorRef = useRef(null);
  const monacoRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      monacoRef.current = monaco.editor.create(editorRef.current, {
        value: code,
        language: language,
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: { enabled: false },
      });

      monacoRef.current.onDidChangeModelContent(() => {
        onChange(monacoRef.current.getValue());
      });

      return () => {
        monacoRef.current.dispose();
      };
    }
  }, []); // Empty dependency array to run only once

  useEffect(() => {
    if (monacoRef.current) {
      const currentValue = monacoRef.current.getValue();
      if (currentValue !== code) {
        monacoRef.current.setValue(code);
      }
    }
  }, [code]);

  return <div ref={editorRef} style={{ width: '100%', height: '500px' }} />;
};

export default CodeEditor;