import React from 'react'

const ProcButtons = ({ onProc, onProcPlay }) => {
    return (
        <div className="btn-group" role="group">
            <button className="btn btn-outline-primary" onClick={onProc}>Preprocess</button>
            <button className="btn btn-outline-primary" onClick={onProcPlay}>Proc & Play</button>
        </div>
    )
}

export default ProcButtons