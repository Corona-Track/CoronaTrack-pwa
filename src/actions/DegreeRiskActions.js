import firebase from '../FirebaseConnection';

export const verifySteps = (uid, history, path = '') => {
  return dispatch => {
    firebase
      .database()
      .ref(`healthScreening/${uid}${path}`)
      .once('value', snapshot => {
        //   if (snapshot.val()) {
        //     const {
        //       contactWithSuspect,
        //       contactWithConfirmed,
        //       Sintomas,
        //       Cronicas,
        //     } = snapshot.val();
        //     if (contactWithSuspect && !contactWithSuspect) {
        //       history.push('/diagnostico/confirmados');
        //       return;
        //     }
        //     if (
        //       (!contactWithSuspect && contactWithConfirmed) ||
        //       (!contactWithSuspect && !contactWithConfirmed)
        //     ) {
        //       history.push('/diagnostico/suspeitos');
        //       return;
        //     }
        //     if (Sintomas && !Cronicas) {
        //       history.push('/doencas/cronicas');
        //       return;
        //     }
        //     if ((!Sintomas && Cronicas) || (!Sintomas && !Cronicas)) {
        //       history.push(' /sintomas');
        //     }
        //   }
      });
  };
};

export const AddInDb = (uid, data, path = '') => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`healthScreening/${uid}${path}`)
        .update({ ...data })
        .then(() => {
          resolve();
        })
        .catch(e => {
          console.log(e);
          reject(new Error('Erro Ao Gravar os dados'));
        });
    });
  };
};

export function getInfos(uid) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`healthScreening/${uid}/Sintomas`) // muda depois para percorrer todos
        .once('value', snapshot => {
          if (snapshot.val()) {
            let infos = {
              grauDeRisco: snapshot.val().grauDeRisco,
            };
            firebase
              .database()
              .ref(`Users/${uid}`) // muda depois para percorrer todos
              .once('value', snap => {
                infos = {
                  ...infos,
                  name: snap.val().name,
                };
                console.log(infos);
                resolve(infos);
              });
          }
        })
        .catch(() => {
          reject();
        });
    });
  };
}

// function amountSymptms(element, item) {
//   let symptms = {};
//   Object.entries(item).forEach(([key, value]) => {
//     const elementObj = Object.values(element);
//     const sympt = elementObj.reduce(
//       (accumulator, currentValue) => accumulator + currentValue[key],
//       0
//     );

//     symptms = {
//       ...symptms,
//       [key]: sympt,
//     };
//   });
//   console.log(symptms);
//   return symptms;
// }

function calcSymptEval(sintomas) {
  const posSintomas = [115, 11, 113, 7, 6, 15, 41, 1];
  const posTotal = 138;

  const negSintomas = [45, 22, 44, 4, 3, 33, 12, 7];
  const negTotal = 427;

  let nt = 1;
  let pt = 1;

  sintomas.forEach((item, index) => {
    if (item === 1) {
      pt = (pt * posSintomas[index]) / posTotal;
      nt = (nt * negSintomas[index]) / negTotal;
    }
  });

  const fracPos = posTotal * pt;
  const fracNeg = negTotal * nt;

  return fracPos / (fracPos + fracNeg);
}

export const symptEval = uid => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`healthScreening/${uid}/Sintomas`) // muda depois para percorrer todos
        .once('value', snapshot => {
          const sintomas = snapshot.val();

          delete sintomas.contactWithConfirmed;
          delete sintomas.contactWithSuspect;

          const {
            febre,
            dorDeCabeca,
            tosse,
            dorDeGarganta,
            coriza,
            doresMusculares,
            dificuldadesRespiratorias,
            diarreia,
          } = sintomas;

          const testeFinal = calcSymptEval([
            febre,
            dorDeCabeca,
            tosse,
            dorDeGarganta,
            coriza,
            doresMusculares,
            dificuldadesRespiratorias,
            diarreia,
          ]);

          let grauDeRisco = '';

          if (testeFinal < 0.4) {
            grauDeRisco = 'Baixo';
          }
          if (testeFinal >= 0.4 && testeFinal < 0.8) {
            grauDeRisco = 'Médio';
          }
          if (testeFinal >= 0.8) {
            grauDeRisco = 'Alto';
          }

          firebase
            .database()
            .ref(`healthScreening/${uid}/Sintomas`)
            .update({ grauDeRisco })
            .then(() => {
              resolve(grauDeRisco);
            })
            .catch(() => {
              reject(new Error('Erro Ao Gravar os dados'));
            });
        });
    });
  };
};
