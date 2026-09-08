// Original vector artwork, not photographs of participants or actual events.
import { mkdir, writeFile } from "node:fs/promises";
import { deflateSync } from "node:zlib";
const directory = new URL("../client/public/assets/", import.meta.url);
await mkdir(directory, { recursive: true });
function actor(x, y, scale, pose, color = "#131411") {
  const arms =
    pose === 0
      ? "M-12-139Q-58-170-89-222M12-139Q65-167 91-224"
      : pose === 1
        ? "M-12-139Q-63-132-90-90M12-139Q60-163 76-202"
        : "M-12-139Q-47-115-60-75M12-139Q52-106 68-130";
  return `<g transform="translate(${x} ${y}) scale(${scale})" fill="${color}" stroke="${color}" stroke-linecap="round"><ellipse cy="-184" rx="20" ry="25"/><path d="M-15-158Q-30-134-21-81L-32-5H-13L2-70 20-3H40L23-87Q28-128 15-159Z"/><path d="${arms}" stroke-width="16" fill="none"/><ellipse cx="8" cy="6" rx="65" ry="7" opacity=".45"/></g>`;
}
function scene(name, colors, poseOffset = 0) {
  const [curtain, glow, floor] = colors;
  let folds = "";
  for (let i = 0; i < 8; i++)
    folds += `<path d="M${i * 32} 0Q${i * 28 + 35} 230 ${i * 11} 770" stroke="${i % 2 ? "#000" : "#fff"}" opacity="${i % 2 ? ".19" : ".035"}" stroke-width="24"/><path d="M${1200 - i * 32} 0Q${1200 - i * 28 - 35} 230 ${1200 - i * 11} 770" stroke="${i % 2 ? "#000" : "#fff"}" opacity="${i % 2 ? ".19" : ".035"}" stroke-width="24"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900"><defs><radialGradient id="light"><stop stop-color="${glow}" stop-opacity=".7"/><stop offset="1" stop-color="#111410" stop-opacity="0"/></radialGradient><linearGradient id="floor" x2="0" y2="1"><stop stop-color="${floor}"/><stop offset="1" stop-color="#151411"/></linearGradient><linearGradient id="beam" x2="0" y2="1"><stop stop-color="#fff5bc" stop-opacity=".3"/><stop offset="1" stop-color="#fff0be" stop-opacity="0"/></linearGradient><filter id="grain"><feTurbulence baseFrequency=".7" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".045"/></feComponentTransfer><feBlend in="SourceGraphic" mode="soft-light"/></filter></defs><g filter="url(#grain)"><rect width="1200" height="900" fill="#161a16"/><ellipse cx="620" cy="440" rx="580" ry="520" fill="url(#light)"/><path d="M280 0 400 770 940 770Z M920 0 290 770 790 770Z" fill="url(#beam)"/><path d="M0 700Q600 660 1200 700V900H0Z" fill="url(#floor)"/><g stroke="#b99f66" opacity=".13">${Array.from({ length: 12 }, (_, i) => `<path d="M600 690 ${i * 130 - 100} 900"/>`).join("")}<path d="M0 750h1200M0 805h1200M0 866h1200"/></g><path d="M0 0h290Q285 260 210 455T70 710L0 755Z M1200 0H910Q915 260 990 455T1130 710L1200 755Z" fill="${curtain}"/>${folds}<path d="M0 0H1200V65Q960 148 800 78Q600 163 400 78Q220 150 0 65Z" fill="${curtain}"/><path d="M0 72Q220 160 400 86Q600 170 800 86Q960 155 1200 72" stroke="#bc9546" stroke-width="3" fill="none" opacity=".5"/>${actor(365, 730, 1.22, poseOffset % 3)}${actor(580, 726, 1.47, (poseOffset + 1) % 3)}${actor(830, 744, 1.29, (poseOffset + 2) % 3)}<g fill="#e9d393" opacity=".7">${Array.from({ length: 15 }, (_, i) => `<circle cx="${75 + i * 75}" cy="826" r="3"/>`).join("")}</g><path d="M0 851Q600 825 1200 851V900H0Z" fill="#080a08"/></g><text x="35" y="878" font-family="sans-serif" font-size="10" letter-spacing="3" fill="#cbbf9e">${name.toUpperCase()} · ILLUSTRATED PLACEHOLDER</text></svg>`;
}
const scenes = [
  ["children", ["#775534", "#cbae5d", "#725b37"], 0],
  ["teens", ["#324d48", "#bcbd83", "#4b5e45"], 1],
  ["workshop", ["#783e3b", "#e5aa67", "#986846"], 2],
  ["stage", ["#631c28", "#cfaa4f", "#625131"], 0],
];
for (const [name, colors, pose] of scenes)
  await writeFile(new URL(`${name}.svg`, directory), scene(name, colors, pose));
const hero = scene(
  "Stage artwork",
  ["#46151d", "#d7ad49", "#72572c"],
  1,
).replace(
  'width="1200" height="900" viewBox="0 0 1200 900"',
  'width="1920" height="1080" viewBox="0 80 1200 675"',
);
await writeFile(new URL("hero.svg", directory), hero);
await writeFile(new URL("social-placeholder.svg", directory), hero);
await writeFile(
  new URL("founder.svg", directory),
  `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000"><defs><radialGradient id="p"><stop stop-color="#dbc9bd"/><stop offset="1" stop-color="#b5978f"/></radialGradient></defs><rect width="800" height="1000" fill="url(#p)"/><rect x="35" y="35" width="730" height="930" fill="none" stroke="#fff8e8" opacity=".5"/><path d="M80 1000Q100 655 280 625Q204 510 246 351Q275 205 408 205Q560 204 586 380Q604 535 527 625Q710 705 730 1000" fill="#80666a" opacity=".36"/><ellipse cx="413" cy="414" rx="123" ry="160" fill="#ceb3a8"/><path d="M266 395Q246 218 399 195Q575 193 580 414Q500 325 427 290Q387 375 266 395" fill="#80666a" opacity=".68"/><path d="M274 644Q406 720 533 644L623 960H160Z" fill="#641b25" opacity=".35"/><text x="400" y="840" text-anchor="middle" fill="#fff8ef" font-family="Georgia,serif" font-size="30">Mrs. Varshaa Raane</text><text x="400" y="885" text-anchor="middle" fill="#fff8ef" font-family="sans-serif" font-size="13" letter-spacing="3">PORTRAIT PLACEHOLDER</text><text x="400" y="916" text-anchor="middle" fill="#fff8ef" font-family="sans-serif" font-size="12">Not a likeness · Replace with approved photograph</text></svg>`,
);
// Tiny dependency-free PNG favicon placeholder for Apple devices.
function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let i = 0; i < 8; i++) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const kind = Buffer.from(type);
  const size = Buffer.alloc(4);
  size.writeUInt32BE(data.length);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([kind, data])));
  return Buffer.concat([size, kind, data, crc]);
}
const size = 180;
const raw = Buffer.alloc((size * 3 + 1) * size);
for (let y = 0; y < size; y++) {
  for (let x = 0; x < size; x++) {
    const index = y * (size * 3 + 1) + 1 + x * 3;
    const gold =
      (y > 40 &&
        y < 140 &&
        Math.abs(x - 90) < (y - 30) * 0.45 &&
        Math.abs(x - 90) > (y - 45) * 0.24) ||
      (y > 110 && y < 120 && x > 60 && x < 120);
    raw[index] = gold ? 228 : 8;
    raw[index + 1] = gold ? 173 : 8;
    raw[index + 2] = 8;
  }
}
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(size, 0);
ihdr.writeUInt32BE(size, 4);
ihdr[8] = 8;
ihdr[9] = 2;
await writeFile(
  new URL("../client/public/apple-touch-icon.png", import.meta.url),
  Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw)),
    chunk("IEND", Buffer.alloc(0)),
  ]),
);
