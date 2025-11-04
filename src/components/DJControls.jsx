const DJControls = ({ hushMode, onHushChange }) => {
    return (
        <>
            <div className="input-group mb-3">
                <span className="input-group-text" id="cpm_label">setCPM</span>
                <input type="text" className="form-control" id="cpm_text_input" placeholder="120" aria-label="cpm" aria-describedby="cpm_label"/>
            </div>

            <label htmlFor="volume_range" className="form-label">Volume</label>
            <input type="range" className="form-range" min="0" max="1" step="0.01" id="volume_range"></input>

                <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="radioOn" checked={!hushMode} onChange={() => onHushChange(false)} />
                    <label className="form-check-label" htmlFor="radioOn">p1: ON</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="radioHush" checked={hushMode} onChange={() => onHushChange(true)} />
                    <label className="form-check-label" htmlFor="radioHush">p1: HUSH</label>
                </div>
            {/* <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="d2" />
                <label className="form-check-label" htmlFor="d2">
                    d2
                </label>
            </div> */}
        </>
    )
}

export default DJControls;