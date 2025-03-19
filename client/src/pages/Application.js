import React from 'react';

function Application() {

    function search(formData) {
        const query = formData.get("query");
        alert(`You searched for '${query}'`)
    }

    return (
        <div>
            <h1>Applications Page</h1>
            <p>What would you like to search for</p>
            <form action={search}>
                <input name="query" />
                <button type="submit">Search button</button>
            </form>
        </div>
    )
}

export default Application;