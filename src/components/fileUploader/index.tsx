import React, {useRef, useState} from "react"
import * as UC from '@uploadcare/file-uploader'
import {FileUploaderRegular, OutputFileEntry} from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';
import {FileEntry} from "@/types";

UC.defineComponents(UC);

interface IFileUploaderProps {
    fileEntry: FileEntry;
    onChange: (fileentry: FileEntry) => void;
}

const FileUploader: React.FC<IFileUploaderProps> = ({fileEntry, onChange}) => {
    const [uploadedFiles, setUploadedFiles] = useState<OutputFileEntry[]>([]);
    const ctxProviderRef = useRef<InstanceType<UC.UploadCtxProvider>>(null);
    const configRef = useRef<InstanceType<UC.Config>>(null);

    return (
      <div>
          <FileUploaderRegular
              sourceList="local, url, camera"
              classNameUploader="uc-light"
              pubkey="9fc51b146131c222dec4"
          />
      </div>
  )
  }

  export default FileUploader;