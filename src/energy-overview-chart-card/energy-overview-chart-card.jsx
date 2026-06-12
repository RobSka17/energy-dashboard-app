import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'
import { EnergySourceBorderColours, EnergySourceColours, EnergySourceNames } from '../constants'
import { UseDashboardContext } from '../dashboard/dashboard'
import { ChartCard } from '../chart-card/chart-card'
ChartJS.register(ArcElement, Tooltip)

export const EnergyOverviewChartCard = () => {
    const {
        sectors
    } = UseDashboardContext()

    const buildDataFromSectors = () => {
        const allEnergySources = sectors.map(s =>
            s.EnergySources
        ).flat()
        
        let summedEnergySourceAmounts = {}
        
        for(let i = 0; i < allEnergySources.length; i++) {
            const energySource = allEnergySources[i]
            const name = energySource.Name
            if(summedEnergySourceAmounts[name]) {
                summedEnergySourceAmounts[name] += energySource.Amount
                continue
            }
            summedEnergySourceAmounts[name] = energySource.Amount
        }
        
        return {
            labels: Object.keys(summedEnergySourceAmounts),
            datasets: [
                {
                    data: Object.values(summedEnergySourceAmounts),
                    backgroundColor: Object.keys(summedEnergySourceAmounts).map(s => EnergySourceColours[s]),
                    borderColor: Object.keys(summedEnergySourceAmounts).map(s => EnergySourceBorderColours[s]),
                    borderWidth: 1,
                    hoverOffset: 4
                }
            ]
        }
    }

    const data = buildDataFromSectors()

    return (
        <>
            <ChartCard props={{
                type: 'doughnut',
                data,
                heading: 'Energy Overview'
            }} />
        </>
    )
}