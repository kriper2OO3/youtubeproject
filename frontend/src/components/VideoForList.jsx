import {Link} from "react-router-dom";
import './VideoForList.css'

export default function VideoForList(props) {
    return (
        <ul>
            <li key={props.id}>
                <div className="video">
                    <Link to={'/video/' + props.path}>
                        <img src={process.env.REACT_APP_API_URL + '/' + props.path + '.png'} 
                        className="image" alt="Нажмите для открытия видео" style={{ cursor: 'pointer' }} />
                    </Link>
                    <div className="info">
                        <strong className="name">{props.name}</strong>
                        <div className="creator_name">{props.creator.login}</div>
                    </div>
                </div>
            </li>
        </ul>
    )
}