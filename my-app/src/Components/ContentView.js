import React from 'react'

const ContentView = (props) => {
    const{content} = props
    return (
        <div className="card p-1">
            {content.content}
        </div>
    )
}
export default ContentView;
