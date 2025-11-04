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


    const handlePlay = () => {
        editorRef.current.evaluate();
    }

    const handleStop = () => {
        editorRef.current.stop();
    }

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


    const handleProc = () => {
        const processed = processText(songText, hushMode);
        editorRef.current?.setCode(processed);
    };

    const handleProcPlay = () => {
        handleProc();
        handlePlay();
    };


    return (
        <div>
            <h2>Strudel Demo</h2>
            <main>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                            <PreprocessorTextArea defaultValue={songText} onChange={(e) => setSongText(e.target.value)}/>
                        </div>
                        <div className="col-md-4">

                            <nav>
                                <ProcButtons onProc={handleProc} onProcPlay={handleProcPlay}/>
                                <br />
                                <PlayButtons onPlay={handlePlay} onStop={handleStop}/>
                            </nav>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                            <div ref={editorContainerRef} id="editor" />
                            <div id="output" />
                        </div>
                        <div className="col-md-4">
                            <DJControls />
                        </div>
                    </div>
                </div>
                <canvas ref={canvasRef} id="roll"></canvas>
            </main >
        </div >
    );


}