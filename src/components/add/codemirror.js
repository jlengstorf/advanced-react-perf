import React, { useState } from 'react';
import { Controlled } from 'react-codemirror2';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/neat.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';

export default ({ onChange }) => {
  const [value, setValue] = useState('');
  return (
    <Controlled
      value={value}
      options={{
        mode: 'javascript',
        theme: 'material',
        lineNumbers: true
      }}
      onBeforeChange={(_editor, _data, val) => {
        setValue(val);
      }}
      onChange={() => onChange(value)}
    />
  );
};
