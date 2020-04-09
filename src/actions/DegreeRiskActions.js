import firebase from '../FirebaseConnection';

export const getPosition = uid => {
  return dispatch => {
    return new Promise(resolve => {
      firebase
        .database()
        .ref(`tracking/${uid}`)
        .once('value', snapshot => {
          resolve(snapshot.val());
        });
    });
  };
};
export const verifySteps = (uid, history, path = '') => {
  return dispatch => {
    // firebase
    //   .database()
    //   .ref(`healthScreening/${uid}${path}`)
    //   .once('value', snapshot => {
    //     if (snapshot.val()) {
    //       const { contactWithSuspect, contactWithConfirmed } = snapshot.val();
    //       if (contactWithSuspect && !contactWithSuspect) {
    //         history.push('/diagnostico/confirmados');
    //         return;
    //       }
    //       if (
    //         (!contactWithSuspect && contactWithConfirmed) ||
    //         (!contactWithSuspect && !contactWithConfirmed)
    //       ) {
    //         history.push('/diagnostico/suspeitos');
    //       }
    //       history.push('/');
    //     }
    //   });
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
          console.log('jonassss');
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
  /**
   * 55924 laboratory confirmed cases,typical signs and symptoms include:
   * fever (87.9%)
   * dry cough (67.7%)
   * fatigue (38.1%)
   * sputum production (33.4%),
   * shortness of breath (18.6%),
   * sore throat (13.9%),
   * headache (13.6%),
   * myalgia or arthralgia (14.8%),
   * chills (11.4%),
   * nausea or vomiting (5.0%),
   * nasal congestion (4.8%),
   * diarrhea (3.7%),
   * hemoptysis (0.9%),
   * conjunctival congestion (0.8%)
   */

  /*
   * febre (87,9%),
   * tosse seca (67,7%),
   * fadiga (38,1%),
   * Corissa (33,4%),
   * falta de ar (18,6%),
   * dor de garganta (13,9%),
   * dor de cabeça (13,6%),
   * mialgia ou artralgia (14,8%),
   * calafrios (11,4%),
   * náusea ou vômito (5,0%),
   * congestão nasal (4,8%),
   * diarréia (3,7%),
   * hemoptise (0,9%),
   * congestão conjuntival (0,8%)
   */

  const posSintomas = [
    0.879, // febre
    0.677, // tosse seca
    0.381, // fadiga
    0.334, // Corissa
    0.186, // falta de ar
    0.139, // dor de garganta
    0.136, // dor de cabeça
    0.148, // mialgia ou artralgia
    0.114, // calafrios
    0.5, // náusea ou vômito
    0.48, // congestão nasal
    0.37, // diarréia
    0.9, // hemoptise
    0.8, // congestão conjuntival
  ];

  const posTotal = 13717;

  const negSintomas = [
    0.808852381,
    0.852779365,
    0.917147619,
    0.927368254,
    0.959552381,
    0.969773016,
    0.970425397,
    0.967815873,
    0.975209524,
    0.989126984,
    0.989561905,
    0.991953968,
    0.998042857,
    0.998260317,
  ];

  const negTotal = 49283;

  let nt = 1;
  let pt = 1;

  sintomas.forEach((item, index) => {
    if (item === 1) {
      pt *= posSintomas[index];
      nt *= negSintomas[index];
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
            tosseSeca,
            fadiga,
            tosseComCatarro,
            faltaDeAr,
            dorDeGarganta,
            dorDeCabeca,
            dorNoCorpo,
            calafrio,
            nauseaOuVomito,
            narizEntupido,
            diarreia,
            tosseComSangue,
            olhosVermelhos,
          } = sintomas;

          const calGrauDeRisco = calcSymptEval([
            febre,
            tosseSeca,
            fadiga,
            tosseComCatarro,
            faltaDeAr,
            dorDeGarganta,
            dorDeCabeca,
            dorNoCorpo,
            calafrio,
            nauseaOuVomito,
            narizEntupido,
            diarreia,
            tosseComSangue,
            olhosVermelhos,
          ]);

          let grauDeRisco = '';

          if (calGrauDeRisco < 0.06) {
            grauDeRisco = 'Baixo';
          }
          if (calGrauDeRisco >= 0.06 && calGrauDeRisco < 0.1) {
            grauDeRisco = 'Médio';
          }
          if (calGrauDeRisco >= 0.1) {
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
