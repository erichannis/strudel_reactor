const DJControls = ({ hush, onHushChange }) => {
    return (
        <>
            <div className="input-group mb-3">
                <span className="input-group-text" id="cpm_label">setCPM</span>
                <input type="text" className="form-control" id="cpm_text_input" placeholder="120" aria-label="cpm" aria-describedby="cpm_label"/>
            </div>

            <label htmlFor="volume_range" className="form-label">Volume</label>
            <input type="range" className="form-range" min="0" max="1" step="0.01" id="volume_range"></input>

            <div className="form-check mb-3">
                <input className="form-check-input" type="checkbox" id="hush_checkbox" checked={hush} onChange={(e) => onHushChange(e.target.checked)} />
                <label className="form-check-label" htmlFor="hush_checkbox">Hush p1</label>
            </div>
        </>
    )
}

export default DJControls;