# Strudel Studio – React Frontend & Preprocessor**

This project is a custom React-based frontend for a locally hosted **Strudel.cc** live-coding music environment. It provides real-time preprocessing, UI-driven musical control, a Strudel REPL integration, and a live D3 visualisation of gain data.



## How to Run the Project

1. Install dependencies  
`npm install`
2. Start the development server  
`npm start`


3. Open the app at:  
**http://localhost:3000**


## Controls Overview

### **Tempo (CPM)**
Adjusts `<cpm>` in the song template and controls global playback speed.

### **Master Volume**
Updates `<volume>`, scaling all instrument layers simultaneously.

### **Instrument Mutes**
Each checkbox toggles one of the `<hush_*>` placeholders, muting or restoring the corresponding instrument:
- Bassline → `<hush_bass>`
- Main Arp → `<hush_arp>`
- Drums 1 → `<hush_drums1>`
- Drums 2 → `<hush_drums2>`

### **Arpeggiator Selection**
Switches `<arp_selection>` between:
- `arpeggiator1` (lower, rhythmic)
- `arpeggiator2` (higher, complex)

### **Save / Load Settings (JSON Feature)**
Stores all control states in `localStorage` as JSON.  
Load restores the saved configuration instantly.



## D3 Gain Visualiser

The D3 graph displays the gain value of the most recent 100 Strudel events.  
As the music plays, each new event’s gain is extracted and plotted, creating a live visualisation of the track’s dynamic intensity.  
Higher peaks indicate louder or more energetic sections, while lower points show quieter or muted layers.



## Usage Notes & Quirks

- The REPL updates immediately when any control changes.
- Initial audio may take a moment to activate depending on the browser’s and computer's hardware
- The D3 graph intentionally visualises **gain only**.
- Saving settings overwrites the previous preset.



## Video Demonstration

https://youtu.be/fNSoLFg2kos



## Song Attribution

This project uses a Strudel pattern built from the community bakery:
- https://strudel.cc/bakery  
- Algorave Dave — referenced in comments in the song file

