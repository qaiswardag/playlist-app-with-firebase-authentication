import { projectAuth } from '@/firebase/config';

const useUser = function () {
  //
  const updateUserDetails = async function (displayNewName, displayNewEmail) {
    try {
      //
      await projectAuth.updateUser('0BuESAaLDJXcnQZHTB5S7JWD0H53', {
        displayName: 'new name',
        email: 'modifiedUser@example.com',
      });
    } catch (err) {
      console.log(err.message);
    }
    //
  };

  return { updateUserDetails };
};

export default useUser;
