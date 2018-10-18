import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import { store } from '../../config/store'
import tree from '../../features/tree.png'
import './styles.css'

function Navbar(props) {
    
    const navigate = (history) => {
        store.dispatch({
            type: 'NAVIGATE',
            payload: {
                navHistory: history
            },
        })
    }

    const userName = store.getState().user.userName
    const userAvatar = store.getState().user.useravatar

    return <div>
        <img src={tree} alt='Aspen Clinic' title='Aspen Clinic'
                style={{ width: '25px', marginRight: '5px', float: 'left'}} />
        <ul className="navbar">
        <a href="" className="nav-link">
            <img src={userAvatar} alt={userName} title={userName}
                className="rounded-circle"
                style={{ width: '25px', marginRight: '5px'}} />
        </a>
        <li 
            onClick={() => navigate('/login')}
        ><NavLink exact={true} to='/login'>Logout</NavLink>
        </li>
        <li
            onClick={() => navigate('/home')}
        ><NavLink exact={true} to='/home'>Home</NavLink></li>
        <li
            onClick={() => navigate('/home')}
            ><NavLink to='/patient-entries/new'>New Patient</NavLink>
        </li>
        <li
            onClick={() => navigate('/users')}
            ><NavLink to='/users'>Users</NavLink>
        </li>
        <li 
            onClick={() => navigate('/users')}
            ><NavLink to='/user-entries/new'>New User</NavLink>
        </li>
        
    </ul>
    </div>
}

function mapStateToProps(state) {
    return {
        ...state.navbar,    
    }
}

export default connect(mapStateToProps)(Navbar)