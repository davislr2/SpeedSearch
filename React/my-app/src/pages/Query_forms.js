import React from 'react'
import '../styles/Query_forms.css'

function Query_forms() {

    return (
        <div className="query_forms">
            <h1>Query Forms</h1>
            <p> This is a list of query forms that are accepted by the search function on the site.</p>
            <ul>
                <li>[Driver] vs [Driver]</li>
                <li>[Team] vs [Team]</li>
                <li>Which driver has the most [counting stat] in [series]</li>
                <li>Which team has the most [counting stat] in [series]</li>
                <li>[Driver]</li>
                <li>[Team]</li>
            </ul>
        </div>
    );
}

export default Query_forms;