import firebase from '../FirebaseConnection';

export const verifySteps = (uid, history) => {
  return dispatch => {
    firebase
      .database()
      .ref(`Users/${uid}`)
      .once('value', snapshot => {
        const { contactWithSuspect, contactWithConfirmed } = snapshot.val();
        if (contactWithSuspect && !contactWithConfirmed) {
          history.push('/diagnostico/confirmados');
          return;
        }
        if (
          (!contactWithSuspect && contactWithConfirmed) ||
          (!contactWithSuspect && !contactWithConfirmed)
        ) {
          history.push('/diagnostico/suspeitos');
          return;
        }

        history.push('/');
      });
  };
};

export const AddInDb = (uid, data) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`Users/${uid}`)
        .update({ ...data })
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject(new Error('Erro Ao Gravar os dados'));
        });
    });
  };
};
