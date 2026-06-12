import { DashboardViews } from '../constants'
import { UseDashboardContext } from '../dashboard/dashboard'
import { EnergyOverviewChartCard } from '../energy-overview-chart-card/energy-overview-chart-card'
import { SectorCard } from '../sector-card/sector-card'
import './focused-sector-view.css'

export const FocusedSectorView = () => {
    const {
        dashboardView,
        focusedSector
    } = UseDashboardContext()

    if(dashboardView !== DashboardViews.SectorFocus || !focusedSector) return (<></>)

    return (
        <>
            <div className={'FocusedSectorView'}>
                <EnergyOverviewChartCard props={{sector: focusedSector}}/>
                <SectorCard props={{sector: focusedSector, focused: true}} />
            </div>
        </>
    )
}