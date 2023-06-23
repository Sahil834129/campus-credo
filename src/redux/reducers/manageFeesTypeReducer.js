import { ActionTypes } from '../constants/action-types'

const initialState = {
  loader: false,
  feesTypeRows: [{
    feeTypeName: "", 
    feeTypeFrequency: "",
    editable: false,
    add: true

  }],
  classFeesType: [],
  errorMessage: null
}
export const ManageFeesTypes = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_FEES_TYPE: 
        return {
            ...state,
            loader: true,
        }
    case ActionTypes.SET_FEES_TYPE: 
        return {
            ...state,
            loader: false,
            feesTypeRows: initialState.feesTypeRows.concat(
                payload.map((it) => it)
              )
        }
    case ActionTypes.FEES_TYPE_ERROR: 
        return {
            ...state,
            loader: false,
            errorMessage: payload,
        }
    default:
      return state
  }
}
