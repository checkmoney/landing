import { OutcomeModel } from '@shared/models/money/OutcomeModel'

import { fetchOrFail } from '@front/domain/store/fetchingRedux/fetchOrFail'

import { createOutcomeRequest } from '../api/createOutcomeRequest'
import { actions as outcomeFetchingActions } from '../reducer/createOutcomeFetching'
import { refetchData } from './refetchData'

export const createOutcome = (outcomeFields: OutcomeModel) =>
  fetchOrFail(outcomeFetchingActions, async (dispatch, getApi) => {
    await createOutcomeRequest(getApi())(outcomeFields)

    await dispatch(refetchData() as any)
  })
