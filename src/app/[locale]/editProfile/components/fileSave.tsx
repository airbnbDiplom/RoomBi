import React, { useEffect, useState } from "react";
import { saveFoto } from "@/app/services/fotoServices";
import { CameraFill } from 'react-bootstrap-icons'; 
import styles from './YourStylesheet.module.css';

const FileTest = () => {
  const [fileData, setFileData] = useState(new FormData());

  const onFileSelected = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const input = event.target;

    if (input.files != null && input.files.length > 0) {
      const selectedFile = input.files[0];
      if (selectedFile) {
        let updatedFileData = new FormData();
        updatedFileData.append("upload", selectedFile);
        updatedFileData.append("folder", "car");
        setFileData(updatedFileData);
      }
    }
  };

  const sub = async () => {
    const res = await saveFoto(fileData);
    console.log("res 3", res);
  };

  useEffect(() => {
    console.log("Component mounted on the client");
  }, []);

  return (
    <div>
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        id="fileInput"
        onChange={onFileSelected}
        style={{ display: 'none' }} 
      />
      <label htmlFor="fileInput" className={styles.button1}>
        <CameraFill />
        Добавить
      </label>
      <button type="submit" onClick={sub}>
        sub
      </button>
    </div>
  );
};

export { FileTest };