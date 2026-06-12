import './sector-card.css'

export const SectorCard = ({props}) => {
    const {
        sector
    } = props

    return (
        <>
            <div className={'SectorCard'}>
                <span className={'SectorCardHeading'}>{sector.DisplayName}</span>
                <SectorCardEnergySourceList props={{energySources: sector.EnergySources}} />
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