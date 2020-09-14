import React, { useEffect } from 'react';
import useStorage from '../../../shared/useStorage';
// import { motion } from 'framer-motion';


const ProgressBar = ({ file, setFile }) => {
  const { progress, url } = useStorage(file);


  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  

  return (
    <div className="progress-bar"
      style={{ width: progress + '%' }}
    ></div>
  );
} 

export default ProgressBar;