const DJControls = ({ hushBassline, hushMainArp, hushDrums1, hushDrums2, cpm, volume, OnHushBassLineChange, onHushMainArpChange, onHushDrums1Change, onHushDrums2Change, onCpmChange, onVolumeChange }) => {
    return (
        <>
            <div className="input-group mb-3">
                <span className="input-group-text" id="cpm_label">setCPM</span>
                <input type="text" className="form-control" id="cpm_text_input" placeholder="35" value={cpm} onChange={(e) => onCpmChange(Number(e.target.value))}/>
            </div>

            <label htmlFor="volume_range" className="form-label">Volume</label>
            <input type="range" className="form-range" min="0" max="1" step="0.01" value={volume} onChange={(e) => onVolumeChange(Number(e.target.value))} id="volume_range"></input>

            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="hush_checkbox_bassline" checked={hushBassline} onChange={(e) => OnHushBassLineChange(e.target.checked)} />
                <label className="form-check-label" htmlFor="hush_checkbox_bassline">Hush Bassline</label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="hush_checkbox_main_arp" checked={hushMainArp} onChange={(e) => onHushMainArpChange(e.target.checked)} />
                <label className="form-check-label" htmlFor="hush_checkbox_main_arp">Hush Main Arp</label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="hush_checkbox_drums_1" checked={hushDrums1} onChange={(e) => onHushDrums1Change(e.target.checked)} />
                <label className="form-check-label" htmlFor="hush_checkbox_drums_1">Hush Drums 1</label>
            </div>
            <div className="form-check mb-3">
                <input className="form-check-input" type="checkbox" id="hush_checkbox_drums_2" checked={hushDrums2} onChange={(e) => onHushDrums2Change(e.target.checked)} />
                <label className="form-check-label" htmlFor="hush_checkbox_drums_2">Hush Drums 2</label>
            </div>
        </>
    )
}

export default DJControls;