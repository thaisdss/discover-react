import './style.css'

export type CardProps = {
    name: string;
    time: number;
}

export function Card(props: CardProps){
    return(
        <div className='card'>
        <strong>{props.name}</strong>
        <small>{props.time}</small>
        </div>
    )
}