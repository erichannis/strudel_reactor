import './App.css';
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import DJControls from './components/DJControls';
import PlayButtons from './components/PlayButtons';
import ProcButtons from "./components/ProcButtons";
import PreprocessorTextArea from "./components/PreprocessorTextArea";

const handleD3Data = (event) => {
    console.log(event.detail);
};

export default function StrudelDemo() {

    const hasRun = useRef(false);
    // use reference for strudel editor instead of const variable outside of componenet
    const editorRef = useRef(null);
    // use references instead of document.getelementbyid's for the elements
    const canvasRef = useRef(null);
    const editorContainerRef = useRef(null);



    const [songText, setSongText] = useState(stranger_tune);

    useEffect(() => {

        if (hasRun.current) return;
        hasRun.current = true;

        document.addEventListener("d3Data", handleD3Data);
        console_monkey_patch();

        //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
        //init canvas
        const canvas = document.getElementById('roll');
        canvas.width = canvas.width * 2;
        canvas.height = canvas.height * 2;
        const drawContext = canvas.getContext('2d');
        const drawTime = [-2, 2]; // time window of drawn haps

        const editor = new StrudelMirror({
            defaultOutput: webaudioOutput,
            getTime: () => getAudioContext().currentTime,
            transpiler,
            root: editorContainerRef.current,
            drawTime,
            onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
            prebake: async () => {
                initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                const loadModules = evalScope(
                    import('@strudel/core'),
                    import('@strudel/draw'),
                    import('@strudel/mini'),
                    import('@strudel/tonal'),
                    import('@strudel/webaudio'),
                );
                await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
            },
        });

        editor.setCode(songText);
        editorRef.current = editor;

    }, []);

    // make live changes happen instantly in REPL
    useEffect(() => {
        editorRef.current.setCode(songText);
    }, [songText]);


    const processText = (songText, hushBassline, hushMainArp, hushDrums1, hushDrums2, cpm, volume) => {
        return songText
            .replace('<hush_bass>', hushBassline ? '_' : '')
            .replace('<hush_arp>', hushMainArp ? '_' : '')
            .replace('<hush_drums1>', hushDrums1 ? '_' : '')
            .replace('<hush_drums2>', hushDrums2 ? '_' : '')
            .replace('<cpm>', cpm.toString())
            .replaceAll('<volume>', volume.toString())
            .replace('<arp_selection>', arpSelection);
    };

    const handleProc = () => {
        const processed = processText(songText, hushBassline, hushMainArp, hushDrums1, hushDrums2, cpm, volume, arpSelection);
        editorRef.current?.setCode(processed);
    };


    const handlePlay = () => { editorRef.current.evaluate(); }
    const handleStop = () => { editorRef.current.stop(); }

    const handleProcPlay = () => {
        handleProc();
        handlePlay();
    };

    const [hushBassline, setHushBassLine] = useState(false);
    const [hushMainArp, setHushMainArp] = useState(false);
    const [hushDrums1, setHushDrums1] = useState(false);
    const [hushDrums2, setHushDrums2] = useState(false);
    const [cpm, setCpm] = useState(35);
    const [volume, setVolume] = useState(1.0);
    const [arpSelection, setArpSelection] = useState("arpeggiator1");

    useEffect(() => {
        if (!editorRef.current) return;
        handleProcPlay();
    }, [hushBassline, hushMainArp, hushDrums1, hushDrums2, cpm, volume, arpSelection]);


    return (
        <div className="container-fluid py-4 bg-light min-vh-100">
            <div className="text-center mb-4">
                <h2 className="fw-bold text-primary mb-1">🎵 Strudel Studio</h2>
                <p className="text-muted">Create, tweak, and perform algorithmic music with live control</p>
            </div>

            <main className="row g-4">
                {/* Left Side: Preprocessor & CodeMirror */}
                <div className="col-md-8">
                    <div className="card shadow-sm border-0">
                        <div className="card-header bg-primary text-white fw-semibold">Code Preprocessor</div>
                        <div className="card-body">
                            <PreprocessorTextArea defaultValue={songText} onChange={(e) => setSongText(e.target.value)} />
                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <ProcButtons onProc={handleProc} onProcPlay={handleProcPlay} />
                                <PlayButtons onPlay={handlePlay} onStop={handleStop} />
                            </div>
                        </div>
                    </div>

                    <div className="card shadow-sm border-0 mt-4">
                        <div className="card-header bg-secondary text-white fw-semibold">Live Editor & Output</div>
                        <div className="card-body p-0">
                            <div ref={editorContainerRef} id="editor" className="border rounded p-2 bg-white" />
                            <div id="output" className="mt-2 text-muted small ps-2"></div>
                            <canvas ref={canvasRef} id="roll" className="w-100 mt-3 border rounded"></canvas>
                        </div>
                    </div>
                </div>

                {/* Right Side: DJ Controls */}
                <div className="col-md-4">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="card-header bg-dark text-white fw-semibold">DJ Controls</div>
                        <div className="card-body">
                            <DJControls
                                hushBassline={hushBassline} onHushMainArpChange={setHushMainArp}
                                hushMainArp={hushMainArp} OnHushBassLineChange={setHushBassLine}
                                hushDrums1={hushDrums1} onHushDrums1Change={setHushDrums1}
                                hushDrums2={hushDrums2} onHushDrums2Change={setHushDrums2}
                                cpm={cpm} onCpmChange={setCpm}
                                volume={volume} onVolumeChange={setVolume}
                                arpSelection={arpSelection} onArpSelectionChange={setArpSelection}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}