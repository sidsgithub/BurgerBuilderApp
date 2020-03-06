import React from 'react'
import c from './NavigationItem.css'

const navigationItem=(props)=>(
        <li className={c.NavigationItem}>
        <a href={props.link} className={props.active ? c.active:null}>{props.children}</a>
        </li> 
)
export default navigationItem;