import { chain, assoc } from 'icepick'

import COSTS from 'metabase/xray/costs'

import {
    createAction,
    createThunkAction,
    handleActions
} from 'metabase/lib/redux'

import { XRayApi } from 'metabase/services'

export const FETCH_FIELD_XRAY = 'metabase/xray/FETCH_FIELD_XRAY'
export const fetchFieldXray = createThunkAction(FETCH_FIELD_XRAY, (fieldId, cost) =>
    async (dispatch) => {
        dispatch(startLoad())
        try {
            const xray = await XRayApi.field_xray({ fieldId, ...cost.method })
            return dispatch(loadXray(xray))
        } catch (error) {
            console.error(error)
        }
    }
)

export const FETCH_TABLE_XRAY = 'metabase/xray/FETCH_TABLE_XRAY'
export const fetchTableXray = createThunkAction(FETCH_TABLE_XRAY, (tableId, cost) =>
    async (dispatch) => {
        dispatch(startLoad())
        try {
            const xray = await XRayApi.table_xray({ tableId, ...cost.method })
            return dispatch(loadXray(xray))
        } catch (error) {
            console.error(error)
        }
    }
)


export const FETCH_SEGMENT_XRAY = 'metabase/xray/FETCH_SEGMENT_XRAY'
export const fetchSegmentXray = createThunkAction(FETCH_SEGMENT_XRAY, (segmentId, cost) =>
    async (dispatch) => {
        dispatch(startLoad())
        try {
            const xray = await XRayApi.segment_xray({ segmentId, ...cost.method })
            return dispatch(loadXray(xray))
        } catch (error) {
            console.error(error)
        }
    }
)

export const FETCH_CARD_XRAY = 'metabase/xray/FETCH_CARD_XRAY';
export const fetchCardXray = createThunkAction(FETCH_CARD_XRAY, (cardId, cost) =>
    async (dispatch) => {
        const c = COSTS[cost]
        dispatch(startLoad())
        try {
            const xray = await XRayApi.card_xray({ cardId, ...c.method });
            dispatch(loadXray(xray));
            return false
        } catch (error) {
            console.error(error);
        }
    }
)

export const FETCH_SEGMENT_COMPARISON = 'metabase/xray/FETCH_SEGMENT_COMPARISON';
export const fetchSegmentComparison = createThunkAction(
    FETCH_SEGMENT_COMPARISON,
    (segmentId1, segmentId2, cost) =>
        async (dispatch) => {
            const c = COSTS[cost]
            dispatch(startLoad())
            try {
                const comparison = await XRayApi.segment_compare({ segmentId1, segmentId2, ...c.method })
                return dispatch(loadComparison(comparison))
            } catch (error) {
                console.error(error)
            }
        }
)

export const FETCH_SEGMENT_TABLE_COMPARISON = 'metabase/xray/FETCH_SEGMENT_COMPARISON';
export const fetchSegmentTableComparison = createThunkAction(
    FETCH_SEGMENT_TABLE_COMPARISON,
    (segmentId, tableId, cost) =>
        async (dispatch) => {
            const c = COSTS[cost]
            dispatch(startLoad())
            try {
                const comparison = await XRayApi.segment_table_compare({ segmentId, tableId, ...c.method })
                return dispatch(loadComparison(comparison))
            } catch (error) {
                console.error(error)
            }
        }
)

const FETCH_TABLE_COMPARISON = 'metabase/xray/FETCH_TABLE_COMPARISON';
export const fetchTableComparison = createThunkAction(
    FETCH_TABLE_COMPARISON,
    (tableId1, tableId2) =>
        async () => {
            try {
                const comparison = await XRayApi.table_compare({ tableId1, tableId2 })
                return comparison
            } catch (error) {
                console.error(error)
            }
        }
)

export const FETCH_CARD_COMPARISON = 'metabase/xray/FETCH_CARD_COMPARISON';
export const fetchCardComparison = createThunkAction(FETCH_CARD_COMPARISON, (cardId1, cardId2) =>
    async () => {
        try {
            const comparison = await XRayApi.card_compare({ cardId1, cardId2 })
            return comparison
        } catch (error) {
            console.error(error)
        }
    }
)

export const FETCH_FIELD_COMPARISON = 'metabase/xray/FETCH_FIELD_COMPARISON';
export const fetchFieldComparison = createThunkAction(
    FETCH_FIELD_COMPARISON,
    (fieldId1, fieldId2) =>
        async (dispatch) => {
            try {
                const comparison = await XRayApi.field_compare({ fieldId1, fieldId2 })
                dispatch(loadComparison(comparison))
                return false
            } catch (error) {
                console.error(error)
            }
        }
)

/*
 * NOTE Kyle Doherty 9/8/17 - future comparisons


export const FETCH_METRIC_COMPARISON = 'metabase/xray/FETCH_METRIC_COMPARISON';
export const fetchMetricComparison = createThunkAction(FETCH_METRIC_COMPARISON, function(metricId1, metricId2) {
    async () => {
        try {
            const comparison = await XRayApi.metric_compare({ metricId1, metricId2 })
            return comparison
        } catch (error) {
            console.error(error)
        }
    }
})



*/

export const FETCH_SEGMENT_TABLE_FIELD_COMPARISON = 'metabase/xray/FETCH_SEGMENT_TABLE_FIELD_COMPARISON';
export const fetchSegmentTableFieldComparison = createThunkAction(
    FETCH_SEGMENT_TABLE_FIELD_COMPARISON,
    (requestParams) =>
        async (dispatch) => {
            requestParams.cost = COSTS[requestParams.cost].method
            dispatch(startLoad())
            try {
                const comparison = await XRayApi.segment_table_field_compare(requestParams)
                return dispatch(loadComparison(comparison))
            } catch (error) {
                console.error(error)
            }
        }
)

export const FETCH_SEGMENT_FIELD_COMPARISON = 'metabase/xray/FETCH_SEGMENT_FIELD_COMPARISON';
export const fetchSegmentFieldComparison = createThunkAction(
    FETCH_SEGMENT_FIELD_COMPARISON,
    (requestParams) =>
        async (dispatch) => {
            requestParams.cost = COSTS[requestParams.cost].method
            dispatch(startLoad())
            try {
                const comparison = await XRayApi.segment_field_compare(requestParams)
                return dispatch(loadComparison(comparison))
            } catch (error) {
                console.error(error)
            }
        }
)

export const START_LOAD = 'metabase/xray/START_LOAD'
export const startLoad = createAction(START_LOAD)

export const LOAD_XRAY = 'metabase/xray/LOAD_XRAY'
export const loadXray = createAction(LOAD_XRAY)

export const LOAD_COMPARISON = 'metabase/xray/LOAD_COMPARISON'
export const loadComparison = createAction(LOAD_COMPARISON)

export default handleActions({
    [START_LOAD]: {
        next: (state, { payload }) => assoc(state, 'loading', true)
    },
    [LOAD_XRAY]: {
        next: (state, { payload }) =>
            chain(state)
                .assoc('xray', payload)
                .assoc('loading', false)
                .value()
    },
    [LOAD_COMPARISON]: {
        next: (state, { payload }) =>
            chain(state)
                .assoc('comparison', payload)
                .assoc('loading', false)
                .value()
    }

}, {
    loading: false
})
