/** A code-native isometric illustration; not a claimed game screenshot. */
export function FactoryIllustration() {
  return <svg className="dx-factory-art" viewBox="0 0 640 400" fill="none" aria-hidden="true">
    <ellipse cx="324" cy="314" rx="234" ry="49" fill="#071725" opacity=".34" />
    <path d="M68 217 304 86 574 228 337 362Z" fill="#577286"/><path d="m68 217 269 142v15L68 232Z" fill="#2d4559"/><path d="m337 359 237-131v16L337 374Z" fill="#1d364c"/>
    <path d="m91 216 214-117 244 129-213 119Z" fill="#cbd4d7"/>
    {[0,1,2,3,4].map(i=><g key={i} stroke="#a8bac3" strokeWidth="1"><path d={`M${91+i*61} ${216+i*32.6} l214 -117`}/><path d={`M${91+i*53.5} ${216-i*29.25} l244 131`}/></g>)}
    <path d="m128 211 99-54 66 35-51 28 77 40 111-61 67 35-105 59" stroke="#526c80" strokeWidth="15" strokeLinejoin="round"/>
    <path d="m128 211 99-54 66 35-51 28 77 40 111-61 67 35-105 59" stroke="#c6d2d8" strokeWidth="8" strokeDasharray="2 5" strokeLinejoin="round"/>
    <g><path d="m165 174 57-32 63 33-57 32Z" fill="#e3aa52"/><path d="m165 174 63 33v23l-63-33Z" fill="#b97929"/><path d="m228 207 57-32v23l-57 32Z" fill="#8b612c"/><path d="m174 171 12-6v-53l-12 6Z" fill="#6f8597"/><path d="m260 173 12-6v-53l-12 6Z" fill="#48647b"/><path d="m170 116 58-31 59 31-58 33Z" fill="#e6c087"/><path d="m170 116 59 33v18l-59-32Z" fill="#d4993e"/><path d="m229 149 58-33v18l-58 33Z" fill="#a66b26"/><path d="m216 153 15-8v40l-15 8Z" fill="#e7eceb"/></g>
    <g><path d="m250 226 43-25 55 29-43 25Z" fill="#a7bdc8"/><path d="m250 226 55 29v13l-55-29Z" fill="#6d8699"/><path d="m305 255 43-25v13l-43 25Z" fill="#3c596d"/><path d="m271 216-16-28 9-19 26 18 4 22" stroke="#f4b547" strokeWidth="11" strokeLinejoin="round"/><circle cx="263" cy="175" r="7" fill="#334f64"/><path d="m311 234 19-33-12-17-22 24" stroke="#e8a943" strokeWidth="10" strokeLinejoin="round"/><circle cx="329" cy="201" r="6" fill="#334f64"/><path d="m292 218 3-9 4 10 10-2-8 7" fill="#e5f8ff"/></g>
    <g><path d="m367 192 58-33 64 34-59 33Z" fill="#b1bfd7"/><path d="m367 192 63 34v32l-63-33Z" fill="#738aa8"/><path d="m430 226 59-33v32l-59 33Z" fill="#546f8a"/><path d="m370 188v-42l61 32v43" fill="#aecbdc" opacity=".7"/><path d="m431 178 54-30v43l-54 30Z" fill="#89b9d5" opacity=".5"/><path d="m363 145 59-33 71 36-62 35Z" fill="#e4e7e7"/><path d="m363 145 68 38v9l-68-37Z" fill="#a3b7c7"/><path d="m431 183 62-35v9l-62 35Z" fill="#8198ad"/></g>
    <g><path d="m383 278 60-32 54 29-60 34Z" fill="#8dc2ae"/><path d="m383 278 54 31v17l-54-31Z" fill="#5f9986"/><path d="m437 309 60-34v17l-60 34Z" fill="#3a766c"/><path d="m389 274v-45l61 32v43" stroke="#72a896" strokeWidth="8"/><path d="m389 229 53-30 61 32-53 30Z" fill="#a7d1c0"/><path d="m450 261 53-30v8l-53 30Z" fill="#4c8377"/></g>
    <g transform="translate(328 272)"><path d="m-20 0 19-11 30 16L10 16Z" fill="#dce2e4"/><path d="m-20 0 30 16v8L-20 8Z" fill="#9bb0bf"/><path d="M10 16 29 5v8L10 24Z" fill="#617c93"/><path d="m-7-5 9-5 17 10-9 5Z" fill="#3c6d91"/><ellipse cx="-11" cy="13" rx="4" ry="5" fill="#172d40"/><ellipse cx="7" cy="23" rx="4" ry="5" fill="#172d40"/></g>
    <g fill="#f1bd53">{[[141,230],[241,240],[361,224],[466,305]].map(([x,y],i)=><g key={i}><ellipse cx={x} cy={y-10} rx="5" ry="3"/><path d={`m${x-3} ${y-7}v13m6-13v13`} stroke="#38607a" strokeWidth="3"/><path d={`m${x} ${y-7}v7`} stroke="#f1bd53" strokeWidth="7"/></g>)}</g>
    <g fontFamily="monospace" fontSize="10" fill="#afc4d5"><text x="98" y="185">IN →</text><text x="481" y="326">→ OUT</text></g>
  </svg>;
}
