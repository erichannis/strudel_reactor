const DJControls = ({
    hushBassline, hushMainArp, hushDrums1, hushDrums2, cpm, volume,
    OnHushBassLineChange, onHushMainArpChange, onHushDrums1Change, onHushDrums2Change,
    onCpmChange, onVolumeChange,
    arpSelection, onArpSelectionChange
}) => {

    const handleSaveSettings = () => {
        const settings = {
            hushBassline,
            hushMainArp,
            hushDrums1,
            hushDrums2,
            cpm,
            volume,
            arpSelection
        };
        localStorage.setItem('djSettings', JSON.stringify(settings));
        console.log("Settings saved:", settings);
    };

    const handleLoadSettings = () => {
        const saved = localStorage.getItem('djSettings');
        if (saved) {
            try {
                const settings = JSON.parse(saved);
                if (settings.hushBassline !== undefined) OnHushBassLineChange(settings.hushBassline);
                if (settings.hushMainArp !== undefined) onHushMainArpChange(settings.hushMainArp);
                if (settings.hushDrums1 !== undefined) onHushDrums1Change(settings.hushDrums1);
                if (settings.hushDrums2 !== undefined) onHushDrums2Change(settings.hushDrums2);
                if (settings.cpm !== undefined) onCpmChange(settings.cpm);
                if (settings.volume !== undefined) onVolumeChange(settings.volume);
                if (settings.arpSelection !== undefined) onArpSelectionChange(settings.arpSelection);
                console.log("Settings loaded:", settings);
            } catch (err) {
                console.error("Error parsing saved settings:", err);
            }
        } else {
            console.warn("No saved settings found.");
        }
    };
    
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
            <div className="mt-3">
                <label className="form-label">Arpeggiator Type</label>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="arpSelection"
                        id="arp1"
                        value="arpeggiator1"
                        checked={arpSelection === "arpeggiator1"}
                        onChange={(e) => onArpSelectionChange(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="arp1">
                        Arpeggiator 1 (Low + Rhythmic)
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="arpSelection"
                        id="arp2"
                        value="arpeggiator2"
                        checked={arpSelection === "arpeggiator2"}
                        onChange={(e) => onArpSelectionChange(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="arp2">
                        Arpeggiator 2 (High + Complex)
                    </label>
                </div>
            </div>

            <div className="btn-group mt-3" role="group">
                <button className="btn btn-outline-success" onClick={handleSaveSettings}>Save Settings</button>
                <button className="btn btn-outline-secondary" onClick={handleLoadSettings}>Load Settings</button>
            </div>
        </>
    )
}

export default DJControls;