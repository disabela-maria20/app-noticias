import React, { ChangeEvent } from 'react';
import { Form } from 'react-bootstrap';

interface ImageUploadProps {
  onUpload: (base64Data: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = _handleReaderLoaded;
      reader.readAsDataURL(file);
    }
  };

  const _handleReaderLoaded = (e: ProgressEvent<FileReader>) => {
    const result = e.target?.result as string;
    onUpload(result);
  };

  return (
    <Form.Control type="file"
      name="image"
      id="file"
      accept=".jpg, .jpeg, .png"
      onChange={onChange} />
  );
};

export default ImageUpload;
