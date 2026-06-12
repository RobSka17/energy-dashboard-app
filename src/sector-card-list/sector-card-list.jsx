import { UseDashboardContext } from '../dashboard/dashboard'
import { SectorCard } from '../sector-card/sector-card'
import { EnergyOverviewChartCard } from '../energy-overview-chart-card/energy-overview-chart-card'
import './sector-card-list.css'
import { DashboardViews } from '../constants'

export const SectorCardList = () => {
    const {
        sectors,
        dashboardView
    } = UseDashboardContext()

    if(dashboardView !== DashboardViews.AllSectors) return (<></>)

    return (
        <>
            <div className={'SectorCardList'}>
                <EnergyOverviewChartCard />
                {
                    sectors.map(s =>
                        <SectorCard key={`sector-card-${s.Name}`} props={{sector: s}} />
                    )
                }
            </div>
        </>
    )
}