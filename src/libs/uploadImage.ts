import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

import { storage } from "../firebase/config";
import { imageTypes } from "../constants";

export default (file: File) => {
  const isCorrectFileType = imageTypes.find((type) => file.type == type);

  if (!isCorrectFileType) return toast.error("Invalid File Type");

  if (file.size > 1000000)
    return toast.error("File Size Must Be Less Than 1MB");

  const storageRef = ref(storage, uuidv4());

  return uploadBytes(storageRef, file).then((snapshot) => {
    return getDownloadURL(snapshot.ref).then((url: string) => url);
  });
};
