import { ref } from 'vue';
import { projectFirestore } from '../firebase/config';

const useDocument = function (collection, id) {
  const error = ref(null);
  const isPending = ref(false);
  let docRef = projectFirestore.collection(collection).doc(id);

  // delete document
  const deleteDoc = async function () {
    isPending.value = true;
    error.value = null;

    try {
      isPending.value = true;
      const response = await docRef.delete();
      isPending.value = false;
      return response;
    } catch (err) {
      console.log(err.message);
      isPending.value = false;
      error.value = 'Could not delete document.';
    }
  };

  // update document
  const updateDoc = async function (updates) {
    isPending.value = true;
    error.value = null;

    try {
      isPending.value = true;
      const response = await docRef.update(updates);
      isPending.value = false;
      return response;
    } catch (err) {
      console.log(err.message);
      isPending.value = false;
      error.value = 'Could not update the document.';
    }
  };

  return { error, isPending, deleteDoc, isPending, updateDoc };
};

export default useDocument;
