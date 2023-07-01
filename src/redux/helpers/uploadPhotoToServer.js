import uuid from 'react-native-uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../config';

export async function uploadPhotoToServer(photo) {
        try {
            const response = await fetch(photo);
            const file = await response.blob();

            const postPhotoId = uuid.v4();

            const storageRef = ref(storage, `postImages/${postPhotoId}`);

            await uploadBytes(storageRef, file);

            const photoUrl = await getDownloadURL(storageRef);

            return photoUrl;
        } catch (error) {
            console.log(error);
        }
    }