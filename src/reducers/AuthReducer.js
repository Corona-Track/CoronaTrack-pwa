const initialState = {
  name: '',
  uid: '',
  cpf: '',
  signed: false,
  loading: false,
};

export default (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case 'SIGNED':
      return { ...state, signed: payload.signed };

    case 'SET_UID':
      return { ...state, signed: true, uid: payload.uid };

    case 'SET_INFOS':
      return {
        ...state,
        email: payload.email,
        name: payload.nickName,
        cpf: payload.cpf,
      };
    default:
      return state;
  }
};
