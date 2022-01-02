import { projectStorage } from '../firebase/config';
import { ref } from 'vue';
import getUser from './getUser';

const { user } = getUser();

const useStorage = () => {
  const error = ref(null);
  const url = ref(null);
  const filePath = ref(null);

  // where to store the image inside firebase storage
  // we need current user id so we need to import getUser.js
  const uploadImage = async (file) => {
    // we need a storage ref to a specific place in storage when we want to add a file
    filePath.value = `covers/${user.value.uid}/${file.name}`;
    const storageRef = projectStorage.ref(filePath.value);

    try {
      const res = await storageRef.put(file);
      url.value = await res.ref.getDownloadURL();
    } catch (err) {
      console.log(err.message);
      error.value = err;
    }
  };

  // like we have an upload image function we also need an delete image function
  // delete image
  const deleteImage = async function (path) {
    // when we have the path we need a storage ref to a specific place in storage in order to delete a file
    const storageRef = projectStorage.ref(path);
    // now we can delete the file via try catch
    try {
      await storageRef.delete();
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  return { uploadImage, url, filePath, error, deleteImage };
};

export default useStorage;
