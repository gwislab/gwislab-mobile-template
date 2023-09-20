import { appEnv } from "configs/env";
import { ImagePickerAsset } from "expo-image-picker";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppState, IUploadedFile } from "store/interface";
import axios from "axios";
import { closeModal, endProgress, setProgress, showError } from "store/system";
import { removeUploadedImages, setUploadedImages } from "store/system_persist";

const client = axios.create({ baseURL: appEnv.backendBase });

export const useUploadDocument = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: IAppState) => state.systemPersist.token);
  const [uploadedFile, setUploadedFile] = useState();

  const uploadImage = useCallback(async (image: ImagePickerAsset) => {
    const formData = new FormData();

    formData.append("file", {
      type: "image/jpg",
      uri: image.uri,
      name: image.fileName,
    });

    try {
      const response = await client.post(`/document/upload`, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`,
        },
        onUploadProgress({ loaded, total }) {
          if (total) {
            dispatch(setProgress(loaded / total));
          }
        },
      });
      const result = response.data;

      setUploadedFile(result.data);
      dispatch(setUploadedImages(result.data));
    } catch (error: any) {
      dispatch(endProgress());
      // An error occured while uploading the file. please check the file extension and make sure the image size is less than 10Mb
      dispatch(
        showError(
          "Une erreur s'est produite lors du téléchargement du fichier. Veuillez vérifier l'extension du fichier et vous assurer que la taille de l'image est inférieure à 10 Mo."
        )
      );
    } finally {
      dispatch(closeModal());
    }
  }, []);

  const removeImage = useCallback(async (image: IUploadedFile) => {
    try {
      const response = await client.delete(`/document/${image.id}`, {
        headers: {
          Accept: "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      const result = response.data;
      dispatch(removeUploadedImages(result.data));
    } catch (error: any) {
      console.log(error.response.data);
      console.log(error.response);
      console.log(error);
    }
  }, []);

  return { uploadImage, removeImage, uploadedFile };
};
