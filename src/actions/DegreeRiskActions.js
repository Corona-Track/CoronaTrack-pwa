import firebase from '../FirebaseConnection';

export const verifySteps = (uid, history) => {
  return dispatch => {
    firebase
      .database()
      .ref(`healthScreening/${uid}`)
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
    console.log(data);
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`healthScreening/${uid}`)
        .update({ ...data })
        .then(() => {
          console.log('ok');
          resolve();
        })
        .catch(() => {
          reject(new Error('Erro Ao Gravar os dados'));
        });
    });
  };
};

function amountSymptms(element, item) {
  let symptms = {};
  Object.entries(item).forEach(([key, value]) => {
    const elementObj = Object.values(element);
    const sympt = elementObj.reduce(
      (accumulator, currentValue) => accumulator + currentValue[key],
      0
    );

    symptms = {
      ...symptms,
      [key]: sympt,
    };
  });
  console.log(symptms);
  return symptms;
}

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
    firebase
      .database()
      .ref(`healthScreening/${uid}`) // muda depois para percorrer todos
      .once('value', snapshot => {
        // const amountPeople = snapshot.numChildren();

        // const sintomas = amountSymptms(snapshot.val(), snapshot.val()[uid]);
        // febre, dor de cabeça, tosse, dor de garganta, coriza, dores musculares, dificuldade de respirar, diarreia
        const sintomas = snapshot.val();

        delete sintomas.contactWithConfirmed;
        delete sintomas.contactWithSuspect;
        console.log(sintomas);
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
        console.log(testeFinal);
        console.log(grauDeRisco);

        firebase
          .database()
          .ref(`healthScreening/${uid}`)
          .update({ grauDeRisco })
          .then(() => {
            console.log('ok');
          })
          .catch(() => {
            console.log(new Error('Erro Ao Gravar os dados'));
          });

        // console.log(testeFinal);

        // snapshot.forEach(item => {
        //   const newSympt = item.val();

        //   delete newSympt.contactWithConfirmed;
        //   delete newSympt.contactWithSuspect;

        //   console.log(newSympt);
        // });
      });
  };
};

// const newSympt = snapshot.val();

// delete newSympt.contactWithConfirmed;
// delete newSympt.contactWithSuspect;

// const posSympt = [115, 11, 113, 7, 6, 15, 41, 1];

// console.log(posSympt);
// console.log(newSympt);
