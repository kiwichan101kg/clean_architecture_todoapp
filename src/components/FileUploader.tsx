import React from "react";
import { storage } from "@/lib/firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

type FileUploaderProps = {
  setImages: (urls: string[]) => void;
};
export const FileUploader = ({ setImages }: FileUploaderProps) => {
  const onFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = e.target.files;
    if (files.length < 1) return;

    const urls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const storageRef = ref(storage, `image/${file.name}`);

      try {
        const snapshot = await uploadBytes(storageRef, file);
        console.log("Uploaded a blob or file!", snapshot);
        try {
          const url = await getDownloadURL(storageRef);
          urls.push(url);
        } catch (urlError) {
          console.error("Error getting download URL:", urlError);
        }
      } catch (uploadError) {
        console.error("Error uploading file:", uploadError);
      }
    }

    setImages(urls);
  };

  return (
    <div>
      <input
        type="file"
        onChange={onFileUpload}
        multiple
        accept=".png,.jpeg,.jpg"
      />
    </div>
  );
};
