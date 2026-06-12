import { createContext, useContext, useEffect, useReducer } from 'react'
import { DashboardViews, Endpoints, ReducerKeys } from '../constants'
import { SectorCardList } from '../sector-card-list/sector-card-list'
import './dashboard.css'
import { SectorCard } from '../sector-card/sector-card'
import { FocusedSectorView } from '../focused-sector-view/focused-sector-view'

const DashboardContext = createContext()
export const UseDashboardContext = () => useContext(DashboardContext)

export const Dashboard = () => {
    const initialState = {
        sectors: [],
        dashboardView: DashboardViews.AllSectors,
        focusedSector: null
    }
    const [state, dispatch] = useReducer(rootReducer, initialState)

    useEffect(() => {
        getSectors()
    }, [])

    async function getSectors() {
        try {
            const endpoint = Endpoints.GetSectors
            const response = await fetch(endpoint)
            if(!response.ok) throw new Error(`Response status: ${response.status}`)
            const result = await response.json()
            const sectors = result
            dispatch({
                type: ReducerKeys.DashboardKeys.UpdateDashboard,
                payload: {
                    sectors
                }
            })
        }
        catch(e) {
            console.error('Error while trying to get sectors:', e.message)
        }
    }
    
    async function getSector(name) {
        try {
            const endpoint = `${Endpoints.GetSector}?name=${name}`
            const response = await fetch(endpoint)
            if(!response.ok) throw new Error(`Response status: ${response.status}`)
            const result = await response.json()
            const focusedSector = result
            dispatch({
                type: ReducerKeys.DashboardKeys.UpdateDashboardView,
                payload: {
                    dashboardView: DashboardViews.SectorFocus,
                    focusedSector
                }
            })
        }
        catch(e) {
            console.error('Error while trying to get sectors:', e.message)
        }
    }
    
    if(state.sectors.length < 1) return (
        <>
            <div className={'DashboardNoDataMessage'}>
                <span>Hmm... There doesn't seem to be any data to display.</span>
                <span>There may be a problem connecting to the API</span>
            </div>
        </>
    )

    return (
        <>
            <DashboardContext.Provider value={{
                dispatch,
                sectors: state.sectors,
                dashboardView: state.dashboardView,
                focusedSector: state.focusedSector,
                getSector
            }}>
                <div className={'Dashboard'}>
                    <SectorCardList />
                    <FocusedSectorView />
                </div>
            </DashboardContext.Provider>
        </>
    )
    
}

function rootReducer(state, action) {
    console.log('!!!!')
    console.log(action)
    const reducerMap = new Map([
        [ReducerKeys.DashboardKeys.UpdateDashboard, OnUpdateDashboard],
        [ReducerKeys.DashboardKeys.UpdateDashboardView, OnUpdateDashboardView]
    ])

    const reducer = reducerMap.get(action.type)
    return reducer(state, action)
}

function OnUpdateDashboard(state, action) {
    const {
        sectors
    } = action.payload

    return {
        ...state,
        sectors
    }
}

function OnUpdateDashboardView(state, action) {
    const {
        dashboardView,
        focusedSector
    } = action.payload

    return {
        ...state,
        dashboardView,
        focusedSector
    }
}