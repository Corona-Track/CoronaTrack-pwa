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
          resolve();
        })
        .catch(e => {
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
  /*
    lista final de sintomas (de acordo com o ministério da saúde)


    febre
    tosse
    dificuldade de respirar
    dores musculares
    exaustão ou fraqueza
    perda do apetite
    produção de catarro
    dor de garganta
    dor de cabeça
    sangue pelo nariz ou boca
    diarréia
    enjôo ou vômito
    dor de barriga
    irritação nos olhos

    confusão ou sonolência
    tonturas
    dor no peito
    dificuldade de sentir cheiro ou gosto

    -----------------------------------------------------

    prob = (0,8535*febre + 0,7008*tosse + 0,2259*dificuldade de respirar + 0,2250*dores musculares
    + 0,3184*exaustão ou fraqueza + 0,2791*produção de catarro + 0,1739*dor de garganta + 0,1739*dor de cabeça
    + 0,0075*sangue pelo nariz ou boca + 0,0816*diarréia + 0,0683*enjôo ou vômito + 0,0201* dor de barriga
    + 0,0067*irritação nos olhos)/3,1348

    a partir de 0.48 é alto risco
    de 0.3 até 0.48 é médio risco
    até 0.3 é baixo risco

    qualquer pessoa com prob acima de 0.4 e pelo menos 1 comorbidade tem alto risco
  */

  const {
    febre,
    tosse,
    dificuldadeDeRespirar,
    doresMusculares,
    exaustaoOuFraqueza,
    producaoDeCatarro,
    dorDeGarganta,
    dorDeCabeca,
    sanguePeloNarizOuBoca,
    diarreia,
    enjooOuVomito,
    dorDeBarriga,
    irritacaoNosOlhos,
  } = sintomas;

  const probTotal =
    (0.8535 * febre +
      0.7008 * tosse +
      0.2259 * dificuldadeDeRespirar +
      0.225 * doresMusculares +
      0.3184 * exaustaoOuFraqueza +
      0.2791 * producaoDeCatarro +
      0.1739 * dorDeGarganta +
      0.1739 * dorDeCabeca +
      0.0075 * sanguePeloNarizOuBoca +
      0.0816 * diarreia +
      0.0683 * enjooOuVomito +
      0.0201 * dorDeBarriga +
      0.0067 * irritacaoNosOlhos) /
    3.1348;

  return probTotal;
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

          const calGrauDeRisco = calcSymptEval(sintomas);

          firebase
            .database()
            .ref(`Users/${uid}`)
            .on('value', snap => {
              const { dateBirth } = snap.val();
              const userYear = dateBirth.split('/')[2];
              const currentDate = new Date().getFullYear();
              const age = currentDate - userYear;

              firebase
                .database()
                .ref(`healthScreening/${uid}/Cronicas`)
                .once('value', snaps => {
                  const chronicSympt = snaps.val();
                  const isChronic =
                    Object.entries(chronicSympt).find(
                      ([key, value]) => value === 1
                    ) || false;
                  let grauDeRisco = '';

                  if (calGrauDeRisco < 0.3) {
                    grauDeRisco = 'Baixo';
                  }

                  if (calGrauDeRisco >= 0.3 && calGrauDeRisco < 0.48) {
                    grauDeRisco = 'Médio';
                  }
                  if (
                    calGrauDeRisco >= 0.48 ||
                    (calGrauDeRisco > 0.4 && isChronic) ||
                    (calGrauDeRisco > 0.4 && age >= 59)
                  ) {
                    grauDeRisco = 'Alto';
                  }

                  firebase
                    .database()
                    .ref(`healthScreening/${uid}/Sintomas`)
                    .update({ grauDeRisco, prob: calGrauDeRisco })
                    .then(() => {
                      resolve(grauDeRisco);
                    })
                    .catch(() => {
                      reject(new Error('Erro Ao Gravar os dados'));
                    });
                });
            });
        });
    });
  };
};
