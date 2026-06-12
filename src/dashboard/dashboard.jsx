import { createContext, useContext, useEffect, useReducer } from 'react'
import { Endpoints, ReducerKeys } from '../constants'
import { SectorCardList } from '../sector-card-list/sector-card-list'
import './dashboard.css'

const DashboardContext = createContext()
export const UseDashboardContext = () => useContext(DashboardContext)

export const Dashboard = () => {
    const initialState = {
        sectors: []
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
            const sectors = result.Sectors
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

    if(!Array.isArray(state.sectors)) return (
        <>
            Something went wrong!
        </>
    )

    return (
        <>
            <DashboardContext.Provider value={{
                dispatch,
                sectors: state.sectors
            }}>
                <div className={'Dashboard'}>
                    <SectorCardList />
                </div>
            </DashboardContext.Provider>
        </>
    )
}

function rootReducer(state, action) {
    const reducerMap = new Map([
        [ReducerKeys.DashboardKeys.UpdateDashboard, OnUpdateDashboard]
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