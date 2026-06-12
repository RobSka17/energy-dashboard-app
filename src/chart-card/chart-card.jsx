import { Doughnut } from 'react-chartjs-2'
import './chart-card.css'

export const ChartCard = ({props}) => {
    const {
        type,
        data,
        heading
    } = props

    if(type.toUpperCase() === 'DOUGHNUT') return (
        <DoughnutChartCard props={{data, heading}} />
    )
    return (<></>)
}

const DoughnutChartCard = ({props}) => {
    const {
        data,
        heading
    } = props

    return (
        <>
            <div className={'ChartCard'}>
                <span className={'ChartCardHeading'}>{heading}</span>
                <div className={'ChartCardBody'}>
                    <Doughnut
                        data={data}
                        options={{responsive: true}}
                    />
                </div>
            </div>
        </>
    )
}