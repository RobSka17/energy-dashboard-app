import { DashboardViews, ReducerKeys } from '../constants'
import { UseDashboardContext } from '../dashboard/dashboard'
import './sector-card.css'

export const SectorCard = ({props}) => {
    const {
        sector,
        focused
    } = props

    if(focused) return (
        <>
            <div className={'SectorCard'}>
                <div>
                    <span className={'SectorCardHeading'}>{sector.DisplayName}</span>
                    <SectorCardEnergySourceList props={{energySources: sector.EnergySources}} />
                    <div className={'SectorCardField'}>Efficiency: {sector.Efficiency}</div>
                </div>
                <SectorCardFooter props={{name: sector.Name, focused}}/>
            </div>
        </>
    )

    return (
        <>
            <div className={'SectorCard'}>
                <div>
                    <span className={'SectorCardHeading'}>{sector.DisplayName}</span>
                    <SectorCardEnergySourceList props={{energySources: sector.EnergySources}} />
                </div>
                <SectorCardFooter props={{name: sector.Name, focused}}/>
            </div>
        </>
    )
}

const SectorCardEnergySourceList = ({props}) => {
    const {
        energySources
    } = props

    return (
        <>
            <div className={'SectorCardEnergySourceList'}>
                {
                    energySources.map((e, i) =>
                        <SectorCardEnergySource
                            key={`energy-source-card-${i}`}
                            props={{energySource: e}}
                        />
                    )
                }
            </div>
        </>
    )
}

const SectorCardEnergySource = ({props}) => {
    const {
        energySource
    } = props

    return (
        <>
            <span className={'SectorCardEnergySource'}>{energySource.Name}: {energySource.Amount}</span>
        </>
    )
}

const SectorCardFooter = ({props}) => {
    const {
        name,
        focused
    } = props

    const {
        dispatch,
        getSector
    } = UseDashboardContext()

    function onClickFocusButton() {
        getSector(name)
    }

    function onClickBackButton() {
        dispatch({
            type: ReducerKeys.DashboardKeys.UpdateDashboardView,
            payload: {
                dashboardView: DashboardViews.AllSectors,
                focusedSector: null
            }
        })
    }

    if(focused) return (
        <>
            <div className={'SectorCardFooter'}>
                <button onClick={onClickBackButton}>Back</button>
            </div>
        </>
    )

    return (
        <>
            <div className={'SectorCardFooter'}>
                <button onClick={onClickFocusButton}>Focus</button>
            </div>
        </>
    )
}