import React from 'react'
import { useRouteMatch } from 'react-router-dom';
import Nav from "./../container/admin/nav/Nav"
export default function Admin() {
    const match = useRouteMatch();
    console.log({ match });
    return (
        <div>
            <Nav url={match.url} path={match.path} />
        </div>
    )
}