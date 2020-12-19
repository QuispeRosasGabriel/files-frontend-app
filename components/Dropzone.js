import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import clienteAxios from '../config/axios';

const DropZone = () => {

    const { getRootProps, getInputProps } = useDropzone();

    return (
        <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 
        flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100">
            <div {...getRootProps({className: 'dropzone w-full py-32'})}>
                <input className="h-100" {...getInputProps()} />
            </div>
        </div>
    )
}

export default DropZone;