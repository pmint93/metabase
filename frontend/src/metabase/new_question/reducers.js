import {
    ADVANCE_STEP,
    BACK,
    NEW_METRIC,
    SELECT_FLOW
} from './actions'

import QueryTypeList from './components/QueryTypeList'

import MetricLanding from './containers/MetricLanding'
import MetricBuilder from './containers/MetricBuilder'
import MapLanding from './containers/MapLanding'

const tips = {
    'metric': {
        title: "Don't fear the metric",
        text: "Despite their fancy sounding name, metrics are just numbers your company cares about. They provide starting points for you to further examine and slice in different ways."
    },
    'database': {
        title: 'Databi',
        text: "Your data lives in databases, which is good cause otherwise that'd be a silly name. Each database can have many tables, which are"
    },
    'schemas': {
        title: 'Schemas',
        text: "All metrics start their lives as a table of data. Here are a few of the most used in your company. After you pick a table, you can pick what you want to know about it, like the how many total entries exist or what the average of a particular value is"
    }
}

const initialStep = {
    subtitle: 'What would you like to see #user.firstName',
    component: QueryTypeList,
    tip: tips['metric'],
    back: false
}

const metricTitle = 'Metrics'
const metric = [
    {
        title: 'Pick a metric',
        component: MetricLanding,
        tip: tips['metric']
    },
]

const newMetricSteps = [
    {
        title: 'Pick a database',
        component: MetricBuilder,
        tip: tips['database']
    },
    {
        title: 'Pick a schema',
        component: MetricBuilder,
        tip: tips['schema']
    }
]

const segmentTitle = 'View a segment or table'
const segment = []

const mapTitle = 'Metric on a map'
const map = [
    {
        title: mapTitle,
        subtitle: 'What kind of map would you like to see?',
        component: MapLanding,
    },
    {
        title: mapTitle,
        component: MetricLanding,
        tip: tips['metric']
    },
]

const pivotTitle = 'Pivot a metric'
const pivot = [
    {
        title: pivotTitle,
        component: MetricLanding,
        tip: tips['metric']
    },
    {
        title: pivotTitle,
    }
]

const titles = {
    map: mapTitle,
    metric: metricTitle,
    pivot: pivotTitle,
    segment: segmentTitle,
}

const flows = {
    metric,
    map,
    pivot,
    segment
}

const initialState = {
    newMetric: false,
    currentStep: initialStep,
    flow: { title: 'Start with...' },
    currentStepIndex: 0
}

export default function(state = initialState, { type, payload, error }) {
    const { currentStepIndex, flow } = state;
    switch(type) {
        case BACK:
            const newStepIndex = currentStepIndex - 1;

            // if the currentStepIndex is 0 then we're back at the beginning and
            // we should just reset
            if(currentStepIndex === 0) {
                return initialState
            }

            return {
                ...state,
                currentStep: flows[flow.type][newStepIndex],
                currentStepIndex: newStepIndex
            }
        case NEW_METRIC:
            return {
                ...state,
                newMetric: true,
                currentStep: newMetricSteps[0]
            }
        case ADVANCE_STEP:
            return {
                ...state,
                currentStep: flows[flow.type][currentStepIndex + 1],
                currentStepIndex: currentStepIndex + 1
            }
        case SELECT_FLOW:
            // if the chosen mode is SQL then just dump off to sql
            if(payload === 'sql') {

            }
            return {
                ...state,
                flow: {
                    type: payload,
                    title: titles[payload]
                },
                currentStep: flows[payload][state.currentStepIndex],
            }
        default:
            return state
    }
}
