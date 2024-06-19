import { useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface TextEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  theme?: 'snow' | 'bubble';
}

const TextEditor: React.FC<TextEditorProps> = ({
  initialValue,
  onChange,
  placeholder = 'Compose an epic...',
  readOnly = false,
  theme = 'snow',
  ...props
}) => {
  
  return (
    <ReactQuill
      value={initialValue}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      theme={theme}
      modules={{
        toolbar: [
          [{ 'header': '1' }, { 'header': '2' }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          [{ 'align': [] }],
          ['link', 'image'],
          ['clean'],
          ['code-block']
        ],
      }}
    />
  );
};

export default TextEditor;
