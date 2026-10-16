import { copyFile, mkdir } from 'node:fs/promises';
await mkdir('public/games/factory/vendor', {recursive:true});
for (const file of ['three.module.js','three.core.js']) await copyFile('node_modules/three/build/'+file,'public/games/factory/vendor/'+file);
await copyFile('node_modules/three/examples/jsm/controls/OrbitControls.js','public/games/factory/OrbitControls.mjs');
await copyFile('node_modules/three/LICENSE','public/games/factory/vendor/THREE-LICENSE.txt');
console.log('Prepared pinned Three.js game assets.');
