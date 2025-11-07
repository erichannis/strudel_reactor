const DJControls = ({
    hushBassline, hushMainArp, hushDrums1, hushDrums2, cpm, volume,
    OnHushBassLineChange, onHushMainArpChange, onHushDrums1Change, onHushDrums2Change,
    onCpmChange, onVolumeChange,
    arpSelection, onArpSelectionChange
}) => {

    const handleSaveSettings = () => {
        const settings = { hushBassline, hushMainArp, hushDrums1, hushDrums2, cpm, volume, arpSelection };
        localStorage.setItem('djSettings', JSON.stringify(settings));
    };

    const handleLoadSettings = () => {
        const saved = localStorage.getItem('djSettings');
        if (saved) {
            const settings = JSON.parse(saved);
            if (settings.hushBassline !== undefined) OnHushBassLineChange(settings.hushBassline);
            if (settings.hushMainArp !== undefined) onHushMainArpChange(settings.hushMainArp);
            if (settings.hushDrums1 !== undefined) onHushDrums1Change(settings.hushDrums1);
            if (settings.hushDrums2 !== undefined) onHushDrums2Change(settings.hushDrums2);
            if (settings.cpm !== undefined) onCpmChange(settings.cpm);
            if (settings.volume !== undefined) onVolumeChange(settings.volume);
            if (settings.arpSelection !== undefined) onArpSelectionChange(settings.arpSelection);
        }
    };

    return (
        <div className="p-2">
            <div className="mb-4">
                <label className="form-label fw-semibold text-primary">Tempo Control</label>
                <div className="input-group">
                    <span className="input-group-text bg-primary text-white">CPM</span>
                    <input type="number" className="form-control" value={cpm} onChange={(e) => onCpmChange(Number(e.target.value))} />
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="volume_range" className="form-label fw-semibold text-primary">Master Volume</label>
                <input type="range" className="form-range" min="0" max="1" step="0.01" value={volume} onChange={(e) => onVolumeChange(Number(e.target.value))} id="volume_range" />
                <small className="text-muted">Adjusts all instrument layers</small>
            </div>

            <hr />

            <label className="form-label fw-semibold text-primary">Mute Instruments</label>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="hush_bass" checked={hushBassline} onChange={(e) => OnHushBassLineChange(e.target.checked)} />
                <label className="form-check-label" htmlFor="hush_bass">Bassline</label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="hush_arp" checked={hushMainArp} onChange={(e) => onHushMainArpChange(e.target.checked)} />
                <label className="form-check-label" htmlFor="hush_arp">Main Arp</label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="hush_d1" checked={hushDrums1} onChange={(e) => onHushDrums1Change(e.target.checked)} />
                <label className="form-check-label" htmlFor="hush_d1">Drums 1</label>
            </div>
            <div className="form-check mb-3">
                <input className="form-check-input" type="checkbox" id="hush_d2" checked={hushDrums2} onChange={(e) => onHushDrums2Change(e.target.checked)} />
                <label className="form-check-label" htmlFor="hush_d2">Drums 2</label>
            </div>

            <hr />

            <div className="mt-3">
                <label className="form-label fw-semibold text-primary">Arpeggiator Type</label>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="arpSelection" id="arp1" value="arpeggiator1" checked={arpSelection === "arpeggiator1"} onChange={(e) => onArpSelectionChange(e.target.value)} />
                    <label className="form-check-label" htmlFor="arp1">Arpeggiator 1 (Low + Rhythmic)</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="arpSelection" id="arp2" value="arpeggiator2" checked={arpSelection === "arpeggiator2"} onChange={(e) => onArpSelectionChange(e.target.value)} />
                    <label className="form-check-label" htmlFor="arp2">Arpeggiator 2 (High + Complex)</label>
                </div>
            </div>

            <hr />

            <div className="d-flex justify-content-between mt-4">
                <button className="btn btn-success w-50 me-2" onClick={handleSaveSettings}>💾 Save</button>
                <button className="btn btn-secondary w-50" onClick={handleLoadSettings}>📂 Load</button>
            </div>
        </div>
    );
};

export default DJControls;
