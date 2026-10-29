(async function () {
  const roomNumber = Number(document.body.dataset.room);
  const configurations = {
    1: {
      name: 'Bedroom 1', width: 3630, length: 3560, entryWidth: 3790,
      outline: [[0, 0], [3630, 0], [3630, 3560], [-160, 3560], [-160, 2625], [0, 2625]],
      window: {side: 'east', start: 880, width: 1800, sill: 750, height: 1500},
      entrance: {hinge: [-160, 3560], width: 935, closed: -Math.PI / 2, open: 0},
      wardrobe: {position: [0, 855.5], rotation: Math.PI / 2, width: 775.5, bays: 1},
      bed: {x: 520, z: 2512.5, rotation: Math.PI / 2, width: 1472, mattress: 1372},
      seat: {position: [3630, 880], rotation: -Math.PI / 2, width: 1800},
      dresser: {position: [3630, 0], rotation: -Math.PI / 2, width: 750},
      overview: [1900, 6600, 8600], entryCamera: [350, 1650, 3250], entryTarget: [2350, 1250, 1100],
      wardrobeCamera: [2250, 1550, 1100], bedCamera: [1750, 1450, 3450], seatCamera: [900, 1400, 1850],
      palette: {front: '#b1b9aa', panel: '#a8b39d', fabric: '#d0d3c8', accent: '#7b8c72'},
      roomNote: '3630 x 3560 nominal room. The 3790 lower dimension is modelled as a 160 entrance offset, not a wider full room. Offset depth 935 = 3560 - 2625; confirm this interpretation on site.',
      openingNote: 'East opening: 1800 derived from 3560 - 880 - 880. West entrance: 935 inferred from the remaining wall length. Window sill 750, height 1500 and entry height 2250 are assumptions.',
      clearances: [['Bed foot to window seat', 510], ['Fitted wardrobe link panel', 85], ['Cabinet to entry opening', 12.5]],
      intent: 'Kids room: a two-door W1-style wardrobe and Murphy bed share the west entrance wall. Opposite, the east window wall has a seat, north-side storage with a mirror concealed on the inside of its door, and a study desk to the right (south) with tinted storage above. Full-width lofts cover the window unit and Murphy cabinet. The 12.5 cabinet-to-entry-wall margin is tight and requires site and hardware approval.'
    },
    2: {
      name: 'Bedroom 2', width: 3300, length: 3560, entryWidth: 5185,
      outline: [[0, 0], [3300, 0], [3300, 2625], [5185, 2625], [5185, 3560], [0, 3560]],
      window: {side: 'north', start: 750, width: 1850, sill: 750, height: 1500},
      entrance: {hinge: [5185, 3560], width: 935, closed: -Math.PI / 2, open: -Math.PI},
      wardrobe: {position: [2213.6, 3560], rotation: Math.PI, width: 2133.6, bays: 3},
      bed: {x: 100, z: 2060, rotation: Math.PI / 2, width: 1630, mattress: 1524},
      seat: {position: [750, 0], rotation: 0, width: 1850},
      dresser: {position: [3300, 300], rotation: -Math.PI / 2, width: 650},
      overview: [6400, 6900, -6600], entryCamera: [4750, 1650, 3100], entryTarget: [1400, 1300, 2050],
      wardrobeCamera: [700, 1500, 1350], bedCamera: [1200, 1500, 700], seatCamera: [1600, 1450, 2850],
      palette: {front: '#a9b8bc', panel: '#a8babe', fabric: '#d3d7d7', accent: '#557a82'},
      roomNote: '3300 x 3560 main room, plus a 1885 x 935 entrance return. Overall lower width 5185. The toilet occupies the excluded upper-right area; the bedroom is not a 5185-wide rectangle.',
      openingNote: 'North window starts 750 from west wall; 1850 width is estimated from the screenshot. East entry 935 is inferred. Toilet doorway 750 at X 3475-4225 is provisional; the shown 825 is adjacent wall length, not an assumed door width.',
      clearances: [['Bed side to wardrobe', 890], ['Bed to window wall', 430], ['Entrance passage depth', 935]],
      intent: 'No mirror cabinet or window seat. The 2133.6-wide (7 ft) wardrobe occupies the west end of the south wall with an 80-wide closed scribe filler to the wall. Its east end faces the entrance and contains hidden used-clothes storage above the drawers. Ending the wardrobe at the entrance-side corner instead would restrict the passage turn. Bed remains on the west wall beside the north window.'
    }
  };
  const config = configurations[roomNumber];
  const app = document.getElementById('app');
  if (!config) { app.textContent = 'Unknown room configuration.'; return; }
  const spec = {height: 2794, soffit: 2794, ceilingDrop: 101.6, board: 18, depth: 610, plinth: 101.6, loftClear: 304.8, drawerFront: 203.2, runner: 508, bedWidth: config.bed.width, bedLength: 2100};
  const pretty = value => Number(value.toFixed(1)).toLocaleString('en-IN', {maximumFractionDigits: 1});
  app.innerHTML = `
    <header class="page-header"><div><h1>${config.name} / 03${roomNumber === 1 ? ' / Kids Room' : ''}</h1><p>${config.width} x ${config.length} mm / Full-height fitted cabinetry</p></div><nav aria-label="Room models"><a href="living-dining.html">Living &amp; Dining</a><a href="bedroom-1.html" ${roomNumber === 1 ? 'aria-current="page"' : ''}>Bedroom 1</a><a href="bedroom-2.html" ${roomNumber === 2 ? 'aria-current="page"' : ''}>Bedroom 2</a><a href="master-bedroom.html">Master bedroom</a><a href="kitchen-design.html">Kitchen</a></nav><div class="revision">PROPOSED DIMENSIONS<br>Not released for cutting</div></header>
    <div class="workbench"><section class="drawing" aria-label="Room drawing"><div class="toolbar"><select id="view" aria-label="Drawing view"><option value="overview">3D overview</option><option value="entry">Entrance perspective</option><option value="plan">Dimensioned plan</option><option value="wardrobe">Wardrobe elevation</option><option value="bed">Bed / headboard</option><option value="window">Window seat</option><option value="section">Wardrobe section</option><option value="component">Component dimensions</option></select><div class="actions"><button class="icon-button" id="reset" title="Reset room" aria-label="Reset room"><i data-lucide="rotate-ccw"></i></button><button class="icon-button" id="walk" title="Room walkthrough" aria-label="Room walkthrough" aria-pressed="false"><i data-lucide="footprints"></i></button><button class="icon-button" id="png" title="Export current view PNG" aria-label="Export current view PNG"><i data-lucide="camera"></i></button><button class="icon-button" id="print" title="Print coordination drawings" aria-label="Print coordination drawings"><i data-lucide="printer"></i></button></div></div><div id="viewport"><div id="loading" role="status">Loading ${config.name.toLowerCase()}...</div><div class="view-caption" id="view-caption"></div></div><div class="view-footer"><span>Millimetres / X right, Z down the supplied plan</span><span id="view-status" role="status"></span></div></section>
    <aside><section><h3>Room Schedule</h3><dl><div><dt>Main room</dt><dd>${config.width} x ${config.length}</dd></div><div><dt>Wardrobe W x D</dt><dd>${config.wardrobe.width} x 610*</dd></div><div><dt>Wardrobe doors / bays</dt><dd>${config.wardrobe.bays * 2} / ${config.wardrobe.bays}</dd></div><div><dt>Finished ceiling / cabinet top</dt><dd>2794 / 9 ft 2 in</dd></div><div><dt>Loft clear height</dt><dd>304.8 / 1 ft*</dd></div><div><dt>Drawers per bay</dt><dd>${roomNumber === 1 ? '4 / W1 layout' : '4 / 5 / 4'}*</dd></div><div><dt>Drawer fronts W x H</dt><dd>${roomNumber === 1 ? '699.5' : '647.2'} x 203.2*</dd></div><div><dt>${roomNumber === 1 ? 'Wall-bed' : 'Storage-bed'} frame</dt><dd>${spec.bedWidth} x 2100*</dd></div><div><dt>Mattress</dt><dd>${config.bed.mattress} x 2030*</dd></div>${roomNumber === 1 ? '<div><dt>Window seat W x D</dt><dd>1800 x 500*</dd></div><div><dt>Murphy cabinet W x D</dt><dd>1672 x 740*</dd></div>' : '<div><dt>Wardrobe clear bay width</dt><dd>687.2*</dd></div><div><dt>Used-clothes side clear</dt><dd>150*</dd></div><div><dt>Mirror / window seat</dt><dd>Removed</dd></div>'}</dl><p class="note">2794 is interpreted as the finished ceiling underside, not slab height. A proposed 101.6 ceiling zone requires slab clearance above it; verify on site. * Furniture sizes are proposals.</p></section>
    <section><h3>Model States</h3><label class="toggle"><input type="checkbox" id="dimensions" checked>Dimensions</label><label class="toggle"><input type="checkbox" id="shell">Full room shell</label><label class="toggle"><input type="checkbox" id="wardrobe-doors">Wardrobe doors open</label><label class="toggle"><input type="checkbox" id="drawers">Wardrobe drawers open</label><label class="toggle"><input type="checkbox" id="bed-storage">${roomNumber === 1 ? 'Wall bed folded up' : 'Bed storage open'}</label><label class="toggle"><input type="checkbox" id="seat-storage">Window seat drawers open</label><label class="toggle"><input type="checkbox" id="dresser-storage">Mirror storage open</label><label class="toggle"><input type="checkbox" id="entry-door" checked>Entrance door open</label><label class="toggle"><input type="checkbox" id="ceiling">Ceiling</label></section>
    <section class="checks-section"><h3>Clearances</h3><dl>${config.clearances.map(([name, value]) => `<div><dt>${name}</dt><dd>${value}*</dd></div>`).join('')}</dl><div class="swatches"><span class="swatch"><i style="background:${config.palette.front}"></i>Matte colour</span><span class="swatch"><i style="background:#eeeade"></i>Ivory</span><span class="swatch"><i style="background:#b99570"></i>Oak</span></div><div class="checks"><output id="checks" role="status">Checks pending</output><small id="render-status">Renderer pending</small></div><p class="note">${roomNumber === 1 ? 'Kids room: adult-operated wall-bed hardware with anti-tip anchors, positive locks, controlled descent and pinch protection is essential. The entrance-end fitting margin is only 12.5; site verification may require resizing the bed cabinet. Pull-down hardware, window safety and safety-backed mirror need approval.' : 'Full wardrobe drawer extension leaves 410 to the bed, not standing room. The existing window is retained, without a bay seat or overhead window cabinets.'} Model checks do not certify hardware or accessibility.</p></section></aside></div>
    <section class="doc"><h2>Plan Interpretation</h2><p>${config.roomNote}</p><div class="table-wrap"><table><thead><tr><th>Basis</th><th>Model interpretation / hold</th></tr></thead><tbody><tr><td>Measurement screenshot</td><td>${config.openingNote}</td></tr><tr><td>Revised arrangement</td><td>${config.intent}</td></tr><tr><td>Window wall</td><td>${roomNumber === 1 ? '750-wide hidden-mirror cabinet, 1800-wide window seat and right-side 780-wide study. Study desktop 550 deep, top 750, knee height 700. Study upper storage now extends from 1250 to 2453.2, meeting the loft. Window loft spans 3560, depth 400; cabinet fronts align at the same 405 projection. Fixed scribe panels close the 130 and 100 side spaces. Mirror-to-loft gap is closed with a matching fascia.' : 'Existing north window only; no bay-seat furniture, overhead window cabinets or separate mirror cabinet. Bed remains X 100-2200, Z 430-2060. Bedside moved to the window end so the west wardrobe drawers can extend without striking it.'}</td></tr><tr><td>Bed and finish</td><td>${roomNumber === 1 ? 'Murphy cabinet: 1672 W x 740 D x 2794 H, Z 940.5-2612.5. Frame 1472 x 2100; mattress 1372 x 2030. Fold pivot 220, deck 350. Added flat folding fascia, side closures and a transom from Y 2324 to 2453.2. Bed loft clear 304.8; shelf 1636 x 704 x 18. Wardrobe-to-bed link is closed by an 85-wide fitted panel. Operational reveals and plinth recesses remain; supplier must approve the full moving-bed mechanism.' : 'Storage bed 1630 x 2100 with 1524 x 2030 mattress; rounded headboard 1830 W x 2400 H x 100 D. Wardrobe width 2133.6 is exactly 7 ft, excluding its 80-wide wall scribe. Carcass spans X 80-2213.6; fitted run reaches X 0. Entrance-facing side access is at X 2213.6.'}</td></tr><tr><td>Finished ceiling</td><td>9 ft 2 in = 2794 is the requested finished ceiling underside and cabinet top. Door tops at 2792 retain a 2 mm working joint. Loft clear levels 2471.2-2776; shelf underside 2453.2. A proposed 101.6 ceiling zone requires a slab at or above 2895.6, not measured here. If 2794 is actually the slab height, the cabinetry must be lowered before fabrication.</td></tr><tr><td>Factory hold</td><td>Clean fitted appearance does not mean zero mechanical clearance. Retain 2-4 mm door joints and supplier movement tolerances. Verify wall plumb, ceiling framing, anchors, laminate thickness, glazing, edge bands, hinges and runners. Model only, not a cutting release.</td></tr></tbody></table></div></section>
    <section class="doc"><h2>Wardrobe / Internal Schedule</h2><p>${roomNumber === 1 ? 'Two full-height doors and master W1-style internals: four 8-inch-front drawers, three shelves, pull-down hanging and a 1-ft clear loft.' : 'Seven-foot wardrobe: three equal drawer bays, six full-height doors and 4 / 5 / 4 drawers. Hidden used-clothes pocket is in the entrance-facing end bay above its drawers, preserving every drawer width.'}</p><div class="table-wrap"><table><thead><tr><th>Item</th><th>Proposed size / quantity</th><th>Coordination note</th></tr></thead><tbody><tr><td>Carcass / doors</td><td>${config.wardrobe.width} W x 610 D x 2794 H; 18 panels, 8 back, 101.6 plinth</td><td>Door height 2688.4, thickness 19; each leaf ${roomNumber === 1 ? '383.8' : '351.6'} wide. Scribe fillers close wall-end spaces but are not part of the quoted wardrobe width.</td></tr><tr><td>Clear bays / lofts</td><td>${roomNumber === 1 ? '1 x 739.5' : '3 x 687.2'} clear bay width; loft height 304.8</td><td>Loft shelf 18 thick, top 2471.2; roof underside 2776. All wardrobe lofts remain full width.</td></tr><tr><td>Drawer fronts</td><td>${roomNumber === 1 ? '4 x 699.5' : '13 x 647.2'} W x 203.2 H x 18</td><td>207.2 pitch with 4 separation. Outer stack allocation top 948.4, cap 966.4; centre top 1155.6, cap 1173.6. Model side panels 152.2 high; actual usable depth needs runner approval.</td></tr><tr><td>Outer shelves / hanging</td><td>Shelf centres 1170, 1390, 1610; rail 2250</td><td>${roomNumber === 1 ? 'W1 pull-down: pivot 1750, arms 500, lowered rail about 1431. Adult operation; keep drawers closed. Short garments only.' : 'Entrance-end upper clear width is 519.2 after a 150 side pocket and 18 divider. Other outer shelves 687.2. Centre rail 2110. Short garments only.'}</td></tr>${roomNumber === 2 ? '<tr><td>Hidden used-clothes pocket</td><td>150 clear X-depth x 565 along Z; starts above cap 966.4</td><td>Side door 550 along Z x 1353.2 H x 18, Y 1100-2453.2, flush opaque finish. Shelves at 1110/1390; rail 2230. Suits light used clothes, not a full hanging bay. Side and front doors are interlocked in the model.</td></tr>' : ''}<tr><td>Hardware</td><td>${roomNumber === 1 ? '4' : '13'} pairs nominal 508 runners; ${config.wardrobe.bays * 4} straighteners</td><td>Exact Quadro SKU, hinge swing, notching, depth, loads, clips, safety locks and glass specification remain unapproved. No certified drilling or cutting dimensions.</td></tr></tbody></table></div></section>
    <section class="doc" id="factory"><h2>Component Dimensions / Factory Review</h2><p><strong>MODEL ENVELOPES ONLY / NOT RELEASED FOR CUTTING.</strong> W x H x D are in the component's local axes, not the rotated room axes. Assemblies and their constituent panels must not be added together. Grain direction, joints, edge-band deductions, laminate thickness, glass rebates and hardware machining are not defined.</p><div class="part-controls"><select id="part-select" aria-label="Component"></select><button id="inspect-part"><i data-lucide="box"></i>Inspect</button><button id="parts-csv"><i data-lucide="download"></i>Dimensions CSV</button></div><p id="part-size" role="status"></p><div class="table-wrap"><table id="parts-table"><thead><tr><th>ID / module / component</th><th>Type / quantity</th><th>Model W x H x D</th><th>Finish / release</th></tr></thead><tbody id="part-rows"></tbody></table></div></section>
    <section class="doc"><h2>Reference Direction</h2><p>Original images alongside the proposed model. Perspective renders are not dimensioned shop drawings.</p><div class="reference-grid"><figure><a href="bedroom${roomNumber}-1.png"><img src="bedroom${roomNumber}-1.png" alt="Bedroom ${roomNumber} first supplied design reference" loading="lazy"></a><figcaption>Bedroom ${roomNumber} / supplied reference 1</figcaption></figure><figure><a href="bedroom${roomNumber}-2.png"><img src="bedroom${roomNumber}-2.png" alt="Bedroom ${roomNumber} second supplied design reference" loading="lazy"></a><figcaption>Bedroom ${roomNumber} / supplied reference 2</figcaption></figure></div></section>
    <footer>Revision 03 / Interactive HTML model, not a native SketchUp file. Three.js and icons load from the internet. <a href="floor%20plan%20measurement.pdf">Floor-plan source</a></footer>`;
  const loading = document.getElementById('loading');
  document.getElementById('dresser-storage').closest('section').insertAdjacentHTML('beforeend', `<div ${roomNumber === 2 ? 'hidden' : ''}><label class="toggle"><input type="checkbox" id="pull-down">Lower W1 hanging rail</label><label class="toggle"><input type="checkbox" id="study-glass">Open study glass</label><label class="toggle"><input type="checkbox" id="loft-doors">Open window / bed lofts</label></div>`);
  if (roomNumber === 2) {
    for (const name of ['seat-storage', 'dresser-storage']) document.getElementById(name).closest('label').style.display = 'none';
    document.getElementById('wardrobe-doors').closest('section').insertAdjacentHTML('beforeend', '<label class="toggle"><input type="checkbox" id="used-clothes">Open used-clothes side storage</label>');
    document.getElementById('view').insertAdjacentHTML('beforeend', '<option value="side">Entrance-side storage</option>');
  } else document.getElementById('wardrobe-doors').closest('section').insertAdjacentHTML('beforeend', '<input type="checkbox" id="used-clothes" hidden>');
  document.querySelector('#view option[value="window"]').textContent = roomNumber === 1 ? 'Window / study wall' : 'Window elevation';
  document.querySelector('#view option[value="bed"]').textContent = roomNumber === 1 ? 'Murphy / wardrobe wall' : 'Bed / headboard';
  try {
    const THREE = await import('three');
    const {OrbitControls} = await import('three/addons/controls/OrbitControls.js');
    const {RoomEnvironment} = await import('three/addons/environments/RoomEnvironment.js');
    import('https://cdn.jsdelivr.net/npm/lucide@0.468.0/+esm').then(({createIcons, icons}) => createIcons({icons})).catch(() => {});
    const viewport = document.getElementById('viewport');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#dce5df');
    const renderer = new THREE.WebGLRenderer({antialias: true, preserveDrawingBuffer: true});
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = .9;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.setAttribute('aria-label', `${config.name} interactive 3D interior`);
    viewport.prepend(renderer.domElement);
    const environmentGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = environmentGenerator.fromScene(new RoomEnvironment(), .04).texture;
    environmentGenerator.dispose();
    const perspective = new THREE.PerspectiveCamera(48, 1, 10, 35000);
    const orthographic = new THREE.OrthographicCamera(-3000, 3000, 3000, -3000, 1, 35000);
    let activeCamera = perspective;
    let controls = new OrbitControls(activeCamera, renderer.domElement);
    controls.enableDamping = true;
    const groups = {};
    for (const name of ['floor', 'walls', 'openings', 'wardrobe', 'bed', 'headboard', 'bedside', 'seat', 'dresser', 'study', 'bridge', 'ceiling', 'dimensions', 'section', 'component']) {
      groups[name] = new THREE.Group(); groups[name].name = name; scene.add(groups[name]);
    }
    const material = (color, extra = {}) => new THREE.MeshStandardMaterial({color, roughness: .78, ...extra});
    const finishes = {
      ivory: material('#eeeade'), oak: material('#b99570'), edge: material('#8c775e'),
      front: material(config.palette.front, {roughness: .94}), panel: material(config.palette.panel),
      fabric: material(config.palette.fabric), accent: material(config.palette.accent), linen: material('#f4f3ec'),
      dark: material('#424b46'), wall: material('#f2f1e9'), floor: material('#d6d6cb'),
      metal: material('#9da8a2', {metalness: .7, roughness: .25}), brass: material('#a8864d', {metalness: .65, roughness: .35}),
      glass: material('#c4dedc', {transparent: true, opacity: .23, roughness: .12, depthWrite: false}),
      tint: material('#536e68', {transparent: true, opacity: .48, roughness: .16, depthWrite: false}),
      mirror: material('#bacbc9', {metalness: .96, roughness: .1}), glow: material('#fff4d8', {emissive: '#ffe2a1', emissiveIntensity: 1.5})
    };
    const records = [];
    const moduleCounts = {};
    function register(object, module, name, dims, finish, type = 'Panel') {
      moduleCounts[module] = (moduleCounts[module] || 0) + 1;
      const record = {id: `${module}-${String(moduleCounts[module]).padStart(2, '0')}`, object, module, name, dims, finish, type};
      object.name = name; records.push(record); return object;
    }
    function box(parent, width, height, depth, centerX, centerY, centerZ, finish, name, module) {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), finishes[finish] || finish);
      mesh.position.set(centerX, centerY, centerZ); mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh);
      if (name && module) register(mesh, module, name, [width, height, depth], finish);
      return mesh;
    }
    function line(parent, points, color = '#3e7258', dashed = false) {
      const geometry = new THREE.BufferGeometry().setFromPoints(points.map(point => new THREE.Vector3(...point)));
      const pen = dashed ? new THREE.LineDashedMaterial({color, dashSize: 50, gapSize: 30}) : new THREE.LineBasicMaterial({color});
      const result = new THREE.Line(geometry, pen); result.computeLineDistances(); parent.add(result); return result;
    }
    function label(parent, text, point, height = 100) {
      const canvas = document.createElement('canvas'); canvas.width = 1024; canvas.height = 128;
      const context = canvas.getContext('2d'); context.font = '54px Georgia';
      const textWidth = Math.min(1020, context.measureText(text).width + 30);
      context.fillStyle = '#fffffff0'; context.fillRect((1024 - textWidth) / 2, 4, textWidth, 120);
      context.fillStyle = '#28583e'; context.textAlign = 'center'; context.textBaseline = 'middle'; context.fillText(text, 512, 64, 1000);
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({map: new THREE.CanvasTexture(canvas), depthTest: false, transparent: true, toneMapped: false}));
      sprite.position.set(...point); sprite.scale.set(height * 8, height, 1); sprite.userData.dimensionLabel = true; sprite.renderOrder = 10; parent.add(sprite); return sprite;
    }
    function dimension(parent, start, end, text, offset = [0, 0, 0], height = 95) {
      const first = start.map((value, index) => value + offset[index]);
      const last = end.map((value, index) => value + offset[index]);
      line(parent, [start, first]); line(parent, [end, last]); line(parent, [first, last]);
      for (const point of [first, last]) line(parent, [[point[0] - 20, point[1] - 20, point[2] - 20], [point[0] + 20, point[1] + 20, point[2] + 20]]);
      label(parent, text, first.map((value, index) => (value + last[index]) / 2), height);
    }
    function rod(parent, start, end, radius, finish) {
      const first = new THREE.Vector3(...start), last = new THREE.Vector3(...end), direction = last.clone().sub(first);
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, direction.length(), 16), finishes[finish]);
      mesh.position.copy(first.add(last).multiplyScalar(.5)); mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize()); parent.add(mesh); return mesh;
    }
    function positionGroup(group, position, rotation) { group.position.set(position[0], 0, position[1]); group.rotation.y = rotation; }
    const shape = new THREE.Shape(config.outline.map(([coordX, coordZ]) => new THREE.Vector2(coordX, -coordZ)));
    const floor = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, {depth: 70, bevelEnabled: false}), finishes.floor);
    floor.rotation.x = -Math.PI / 2; floor.position.y = -70; floor.receiveShadow = true; groups.floor.add(floor);
    line(groups.floor, [...config.outline, config.outline[0]].map(([coordX, coordZ]) => [coordX, 2, coordZ]), '#8a9b8d');
    for (let seam = 200; seam < config.length; seam += 200) {
      const minX = roomNumber === 1 && seam > 2625 ? -160 : 0;
      const maxX = roomNumber === 2 && seam > 2625 ? 5185 : config.width;
      line(groups.floor, [[minX, 1, seam], [maxX, 1, seam]], '#bcc3b8');
    }
    const walls = [];
    function wallSegment(start, end, bottom = 0, top = spec.height) {
      const deltaX = end[0] - start[0], deltaZ = end[1] - start[1];
      const mesh = box(groups.walls, Math.hypot(deltaX, deltaZ), top - bottom, 100, (start[0] + end[0]) / 2, (top + bottom) / 2, (start[1] + end[1]) / 2, 'wall');
      mesh.rotation.y = -Math.atan2(deltaZ, deltaX); walls.push(mesh); return mesh;
    }
    if (roomNumber === 1) {
      wallSegment([0, -50], [3630, -50]); wallSegment([-50, 0], [-50, 2625]);
      wallSegment([-160, 3610], [3630, 3610]); wallSegment([-160, 2625], [0, 2625]);
      wallSegment([-210, 2625], [-210, 3560], 2250);
      wallSegment([3680, 0], [3680, 880]); wallSegment([3680, 2680], [3680, 3560]);
      wallSegment([3680, 880], [3680, 2680], 0, 750); wallSegment([3680, 880], [3680, 2680], 2250);
    } else {
      wallSegment([-50, 0], [-50, 3560]); wallSegment([0, 3610], [5185, 3610]);
      wallSegment([3350, 0], [3350, 2625]); wallSegment([0, -50], [750, -50]); wallSegment([2600, -50], [3300, -50]);
      wallSegment([750, -50], [2600, -50], 0, 750); wallSegment([750, -50], [2600, -50], 2250);
      wallSegment([3300, 2575], [3475, 2575]); wallSegment([4225, 2575], [5185, 2575]);
      wallSegment([3475, 2575], [4225, 2575], 2250); wallSegment([5235, 2625], [5235, 3560], 2250);
      const bath = new THREE.Group(); bath.position.set(3475, 0, 2625); groups.openings.add(bath);
      box(bath, 35, 2210, 715, 18, 1105, -357.5, 'ivory');
    }
    const windowGroup = new THREE.Group(); groups.openings.add(windowGroup);
    positionGroup(windowGroup, config.seat.position, config.seat.rotation);
    const windowWidth = config.window.width;
    for (const frameX of [0, windowWidth / 2, windowWidth]) box(windowGroup, 30, 1500, 55, frameX, 1500, 0, 'metal');
    for (const frameY of [750, 2250]) box(windowGroup, windowWidth + 30, 30, 55, windowWidth / 2, frameY, 0, 'metal');
    for (const paneX of [windowWidth / 4, windowWidth * .75]) box(windowGroup, windowWidth / 2 - 30, 1470, 8, paneX, 1500, 0, 'glass');
    box(windowGroup, windowWidth + 160, 45, 120, windowWidth / 2, 2390, 30, 'oak');
    for (const curtainX of [80, windowWidth - 80]) for (let pleat = 0; pleat < 5; pleat++) rod(windowGroup, [curtainX + (pleat - 2) * 24, 480, 55], [curtainX + (pleat - 2) * 24, 2350, 55], 19, 'linen');
    const doorPivot = new THREE.Group(); doorPivot.position.set(config.entrance.hinge[0], 0, config.entrance.hinge[1]); groups.openings.add(doorPivot);
    box(doorPivot, config.entrance.width - 25, 2210, 35, config.entrance.width / 2, 1105, 0, 'ivory');
    box(doorPivot, 110, 22, 20, config.entrance.width - 135, 1000, -28, 'brass');
    const doorArc = [];
    for (let step = 0; step <= 32; step++) {
      const angle = config.entrance.closed + (config.entrance.open - config.entrance.closed) * step / 32;
      doorArc.push([config.entrance.hinge[0] + config.entrance.width * Math.cos(angle), 5, config.entrance.hinge[1] + config.entrance.width * Math.sin(angle)]);
    }
    line(groups.dimensions, doorArc, '#9a743a', true);
    const furnitureBounds = [];
    function footprint(group, width, depth, name, origin = [0, 0]) {
      scene.updateMatrixWorld(true);
      const corners = [[0, 0], [width, 0], [width, depth], [0, depth]].map(([coordX, coordZ]) => group.localToWorld(new THREE.Vector3(coordX + origin[0], 0, coordZ + origin[1])));
      const bounds = {name, minX: Math.min(...corners.map(point => point.x)), maxX: Math.max(...corners.map(point => point.x)), minZ: Math.min(...corners.map(point => point.z)), maxZ: Math.max(...corners.map(point => point.z))};
      furnitureBounds.push(bounds); return bounds;
    }
    const wardrobe = groups.wardrobe;
    positionGroup(wardrobe, config.wardrobe.position, config.wardrobe.rotation);
    const wardrobeWidth = config.wardrobe.width, bayCount = config.wardrobe.bays, clearBay = (wardrobeWidth - (bayCount + 1) * spec.board) / bayCount;
    const loftTop = spec.soffit - spec.board, loftBottom = loftTop - spec.loftClear;
    const carcassHeight = spec.soffit - spec.plinth, carcassCenter = (spec.soffit + spec.plinth) / 2, doorHeight = carcassHeight - 4;
    const wardrobeDoors = [], drawers = [], loftShelves = [], loftDoors = [], studyDoors = [];
    let pullDownPivot = null, pullDownClothes = null, murphyLoftShelf = null, usedClothesPivot = null;
    box(wardrobe, wardrobeWidth, 101.6, 550, wardrobeWidth / 2, 50.8, 275, 'dark', 'Recessed plinth envelope', 'W');
    box(wardrobe, wardrobeWidth, carcassHeight, 8, wardrobeWidth / 2, carcassCenter, 4, 'ivory', 'Back', 'W');
    for (let division = 0; division <= bayCount; division++) {
      if (roomNumber === 2 && division === 0) {
        box(wardrobe, 18, 998.4, 610, 9, 600.8, 305, 'ivory', 'Side pocket lower end panel', 'W');
        box(wardrobe, 18, spec.soffit - (loftBottom - 18), 610, 9, (spec.soffit + loftBottom - 18) / 2, 305, 'ivory', 'Side pocket upper end panel', 'W');
        for (const edgeZ of [10, 590]) box(wardrobe, 18, loftBottom - 18 - 1100, 20, 9, (1100 + loftBottom - 18) / 2, edgeZ, 'ivory', 'Side opening jamb', 'W');
      } else box(wardrobe, 18, carcassHeight, 610, 9 + division * (clearBay + 18), carcassCenter, 305, 'ivory', 'Vertical carcass panel', 'W');
    }
    for (const shelfY of [110.6, spec.soffit - 9]) box(wardrobe, wardrobeWidth - 36, 18, 592, wardrobeWidth / 2, shelfY, 304, 'ivory', 'Base / roof panel', 'W');
    function drawer(parent, module, width, bottom, centerX, frontZ, travel, collection, frontHeight = 203.2, depth = 508) {
      const group = new THREE.Group(); parent.add(group); group.position.set(centerX, bottom, 0);
      box(group, width, frontHeight, 18, 0, frontHeight / 2, frontZ, 'ivory', 'Drawer front', module);
      box(group, width - 36, 12, depth, 0, 24, frontZ - depth / 2 - 9, 'ivory', 'Drawer bottom', module);
      for (const sideX of [-(width - 18) / 2, (width - 18) / 2]) box(group, 18, frontHeight - 51, depth, sideX, (frontHeight - 51) / 2 + 30, frontZ - depth / 2 - 9, 'ivory', 'Drawer side', module);
      box(group, width - 36, frontHeight - 51, 18, 0, (frontHeight - 51) / 2 + 30, frontZ - depth, 'ivory', 'Drawer rear', module);
      box(group, width - 30, 22, 8, 0, frontHeight - 25, frontZ + 28, 'dark');
      for (const railX of [-(width - 70) / 2, (width - 70) / 2]) box(group, 20, 16, depth, railX, 10, frontZ - depth / 2 - 9, 'metal');
      register(group, module, 'Drawer assembly including pull', [width, frontHeight, depth + 41], 'ivory', 'Assembly');
      collection.push({group, travel, width, frontHeight}); return group;
    }
    for (let bay = 0; bay < bayCount; bay++) {
      const left = 18 + bay * (clearBay + 18), center = left + clearBay / 2, count = bay === 1 ? 5 : 4;
      const capTop = 119.6 + count * 207.2 + 18;
      const upperLeft = left + (roomNumber === 2 && bay === 0 ? 168 : 0), upperWidth = left + clearBay - upperLeft, upperCenter = upperLeft + upperWidth / 2;
      for (let index = 0; index < count; index++) drawer(wardrobe, `C${bay + 1}`, clearBay - 40, 121.6 + index * 207.2, center, 550, 508, drawers);
      box(wardrobe, clearBay, 18, 565, center, capTop - 9, 290.5, 'ivory', 'Drawer stack cap', 'W');
      loftShelves.push(box(wardrobe, clearBay, 18, 565, center, loftBottom - 9, 290.5, 'ivory', 'One-foot loft shelf', 'W'));
      box(wardrobe, clearBay * .65, 180, 380, center, loftBottom + 90, 230, 'fabric');
      const railY = bay === 1 ? 2110 : 2250;
      if (roomNumber === 1) {
        pullDownPivot = new THREE.Group(); pullDownPivot.position.set(center, 1750, 300); wardrobe.add(pullDownPivot);
        rod(pullDownPivot, [-clearBay / 2 + 35, 500, 0], [clearBay / 2 - 35, 500, 0], 12, 'metal');
        for (const armX of [-clearBay / 2 + 45, clearBay / 2 - 45]) rod(pullDownPivot, [armX, 0, 0], [armX, 500, 0], 12, 'metal');
        rod(pullDownPivot, [0, 500, 0], [0, -100, 0], 9, 'dark');
      } else rod(wardrobe, [upperLeft + 35, railY, 290], [left + clearBay - 35, railY, 290], 12, 'metal');
      if (bay !== 1) for (const shelfY of [1170, 1390, 1610]) {
        box(wardrobe, upperWidth, 18, 500, upperCenter, shelfY, 280, 'ivory', 'Outer shelf', 'W');
        box(wardrobe, Math.min(370, upperWidth - 40), 75, 330, upperCenter, shelfY + 47, 240, 'fabric');
      }
      const clothes = new THREE.Group(); wardrobe.add(clothes);
      if (roomNumber === 1) pullDownClothes = clothes;
      for (let garment = 0; garment < 4; garment++) {
        const garmentX = upperLeft + upperWidth * (garment + 1) / 5;
        rod(clothes, [garmentX, railY, 290], [garmentX, railY - 45, 290], 4, 'metal');
        line(clothes, [[garmentX - 60, railY - 100, 290], [garmentX, railY - 45, 290], [garmentX + 60, railY - 100, 290], [garmentX - 60, railY - 100, 290]], '#82705b');
        box(clothes, 90, bay === 1 ? 700 : 500, 25, garmentX, railY - 100 - (bay === 1 ? 350 : 250), 290, garment % 2 ? 'fabric' : 'accent');
      }
      for (let leaf = 0; leaf < 2; leaf++) {
        const doorWidth = wardrobeWidth / (bayCount * 2) - 4;
        const pivot = new THREE.Group(); wardrobe.add(pivot);
        const hingeX = bay * wardrobeWidth / bayCount + (leaf ? wardrobeWidth / bayCount - 2 : 2), direction = leaf ? -1 : 1;
        pivot.position.set(hingeX, 103.6, 602);
        const centerX = direction * doorWidth / 2;
        box(pivot, doorWidth, doorHeight, 19, centerX, doorHeight / 2, 0, bay === 1 ? 'ivory' : 'front', 'Full-height door', 'D');
        box(pivot, 12, 420, 28, direction * (doorWidth - 45), 1270, 25, 'brass');
        for (const inset of [55, doorWidth - 55]) box(pivot, 14, 2200, 8, direction * inset, 1293.4, -13.5, 'metal', 'Door straightener envelope', 'H');
        wardrobeDoors.push({pivot, angle: direction * -Math.PI * .53});
      }
    }
    footprint(wardrobe, wardrobeWidth, 641, 'Wardrobe including pulls');
    if (roomNumber === 2) {
      const pocketTop = loftBottom - 18, pocketHeight = pocketTop - 1100;
      box(wardrobe, 18, pocketTop - 966.4, 565, 177, (pocketTop + 966.4) / 2, 290.5, 'ivory', 'Used-clothes pocket divider above drawers', 'U');
      box(wardrobe, 150, pocketTop - 966.4, 18, 93, (pocketTop + 966.4) / 2, 580, 'ivory', 'Concealed pocket front closure', 'U');
      for (const shelfY of [1110, 1390]) box(wardrobe, 150, 18, 550, 93, shelfY, 285, 'ivory', 'Used-clothes pocket shelf', 'U');
      rod(wardrobe, [93, 2230, 85], [93, 2230, 495], 12, 'metal');
      for (const garmentZ of [170, 285, 400]) { rod(wardrobe, [93, 2230, garmentZ], [93, 2170, garmentZ], 4, 'metal'); box(wardrobe, 75, 580, 25, 93, 1880, garmentZ, 'fabric'); }
      usedClothesPivot = new THREE.Group(); wardrobe.add(usedClothesPivot); usedClothesPivot.position.set(0, 1100, 20);
      box(usedClothesPivot, 18, pocketHeight, 550, 9, pocketHeight / 2, 275, 'front', 'Flush used-clothes side door', 'U');
      box(wardrobe, 80, spec.soffit, 19, wardrobeWidth + 40, spec.soffit / 2, 602, 'front', 'Wall-end scribe filler', 'F');
    }
    const bed = groups.bed;
    positionGroup(bed, [config.bed.x, config.bed.z], config.bed.rotation);
    const bedWidth = spec.bedWidth, bedCenter = bedWidth / 2;
    box(bed, bedWidth - 36, 18, 2064, bedCenter, 40, 1050, 'oak', 'Bed underside / base', 'B');
    for (const sideX of [9, bedWidth - 9]) box(bed, 18, 300, 2100, sideX, 185, 1050, 'oak', 'Long side panel', 'B');
    for (const endZ of [9, 2091]) box(bed, bedWidth - 36, 300, 18, bedCenter, 185, endZ, 'oak', 'End panel', 'B');
    box(bed, 18, 285, 2064, bedCenter, 180, 1050, 'oak', 'Central support', 'B');
    if (roomNumber === 2) { box(bed, 500, 130, 750, 405, 112, 1050, 'fabric'); box(bed, 500, 130, 750, 1225, 112, 1050, 'linen'); }
    const bedLift = new THREE.Group(); bed.add(bedLift);
    box(bedLift, bedWidth, 25, 2100, bedCenter, 337.5, 1050, 'oak', 'Bed deck', 'B');
    box(bedLift, config.bed.mattress, 200, 2030, bedCenter, 450, 1050, 'linen');
    box(bedLift, config.bed.mattress + 6, 35, 820, bedCenter, 565, 1530, 'fabric');
    for (const pillowX of [bedWidth * .26, bedWidth * .74]) { const pillow = box(bedLift, 550, 115, 400, pillowX, 600, 280, 'linen'); pillow.rotation.x = -.12; }
    box(bedLift, 420, 130, 250, bedCenter, 620, 480, 'accent');
    const wallBedFold = new THREE.Group();
    if (roomNumber === 1) {
      const children = [...bed.children]; bed.add(wallBedFold); wallBedFold.position.y = 220;
      for (const child of children) { wallBedFold.add(child); child.position.y -= 220; }
      box(wallBedFold, bedWidth, 18, 2100, bedCenter, -210, 1050, 'front', 'Murphy flush fascia panel', 'WB');
    }
    footprint(bed, bedWidth, 2100, 'Deployed bed frame');
    positionGroup(groups.headboard, [config.bed.x, config.bed.z], config.bed.rotation);
    if (roomNumber === 1) {
      for (const sideX of [-91, bedWidth + 91]) box(groups.headboard, 18, spec.soffit, 740, sideX, spec.soffit / 2, -150, 'oak', 'Wall-bed cabinet side', 'WB');
      box(groups.headboard, bedWidth + 200, 18, 740, bedCenter, spec.soffit - 9, -150, 'oak', 'Wall-bed cabinet roof', 'WB');
      box(groups.headboard, bedWidth + 164, spec.soffit, 18, bedCenter, spec.soffit / 2, -511, 'oak', 'Wall-bed cabinet back', 'WB');
      murphyLoftShelf = box(groups.headboard, bedWidth + 164, 18, 704, bedCenter, loftBottom - 9, -150, 'oak', 'Full-width Murphy loft shelf', 'WB');
      box(groups.headboard, bedWidth, 180, 400, bedCenter, loftBottom + 90, -180, 'fabric');
      for (let leaf = 0; leaf < 2; leaf++) {
        const pivot = new THREE.Group(); groups.headboard.add(pivot); const direction = leaf ? -1 : 1;
        pivot.position.set(leaf ? bedWidth + 82 : -82, loftBottom - 16, 210);
        box(pivot, (bedWidth + 164) / 2 - 4, 336.8, 19, direction * ((bedWidth + 164) / 2 - 4) / 2, 168.4, 0, 'front', 'Murphy loft shutter', 'WB');
        loftDoors.push({pivot, angle: direction * -Math.PI / 2});
      }
      box(groups.headboard, bedWidth - 20, 430, 30, bedCenter, 650, -490, 'fabric', 'Wall-bed head cushion', 'WB');
      box(groups.headboard, bedWidth + 164, loftBottom - 18 - 2324, 19, bedCenter, (loftBottom - 18 + 2324) / 2, 210, 'front', 'Murphy loft transom closure', 'F');
      for (const sideX of [-42, bedWidth + 42]) box(groups.headboard, 80, 2320, 19, sideX, 1160, 210, 'front', 'Murphy side closure', 'F');
      box(wardrobe, 80, spec.soffit, 19, wardrobeWidth + 40, spec.soffit / 2, 602, 'front', 'North wall scribe filler', 'F');
      box(wardrobe, 85, spec.soffit, 19, -42.5, spec.soffit / 2, 602, 'front', 'Wardrobe to Murphy closure', 'F');
    } else {
      const arch = new THREE.Shape(); arch.moveTo(-100, 0); arch.lineTo(1730, 0); arch.lineTo(1730, 1485); arch.absarc(815, 1485, 915, 0, Math.PI, false); arch.lineTo(-100, 0);
      const back = new THREE.Mesh(new THREE.ExtrudeGeometry(arch, {depth: 92, bevelEnabled: false, curveSegments: 48}), finishes.panel); back.position.z = -100; groups.headboard.add(back);
      register(back, 'HB', 'Rounded framed headboard envelope', [1830, 2400, 92], 'panel', 'Profile envelope');
      const outline = arch.getPoints(72).map(point => new THREE.Vector3(point.x, point.y, -6));
      const glowCurve = new THREE.CatmullRomCurve3(outline, true);
      groups.headboard.add(new THREE.Mesh(new THREE.TubeGeometry(glowCurve, 180, 5, 12, true), finishes.glow));
      for (let panel = 0; panel < 6; panel++) box(groups.headboard, 245, 850, 24, 180 + panel * 254, 825, -12, 'fabric', 'Upholstered headboard panel', 'HB');
    }
    const bedside = groups.bedside;
    positionGroup(bedside, [config.bed.x, config.bed.z], config.bed.rotation);
    if (roomNumber === 2) {
      box(bedside, 360, 18, 380, 1850, 440, 190, 'oak', 'Floating bedside top', 'N');
      box(bedside, 360, 170, 360, 1850, 346, 190, 'ivory', 'Bedside cabinet envelope', 'N');
      rod(bedside, [1850, 450, 130], [1850, 700, 130], 10, 'brass');
      const lamp = new THREE.Mesh(new THREE.CylinderGeometry(65, 110, 150, 24), finishes.linen); lamp.position.set(1850, 760, 130); bedside.add(lamp);
      footprint(bedside, 360, 380, 'Bedside', [1670, 0]);
    }
    const seat = groups.seat; positionGroup(seat, config.seat.position, config.seat.rotation);
    const seatWidth = config.seat.width, seatDrawers = [];
    if (roomNumber === 1) {
    box(seat, seatWidth, 80, 450, seatWidth / 2, 40, 245, 'dark', 'Seat plinth', 'S');
    for (const sideX of [9, seatWidth / 2, seatWidth - 9]) box(seat, 18, 332, 500, sideX, 246, 250, 'oak', 'Seat side / divider', 'S');
    box(seat, seatWidth, 18, 500, seatWidth / 2, 403, 250, 'oak', 'Seat top', 'S');
    box(seat, seatWidth - 12, 38, 488, seatWidth / 2, 431, 250, 'fabric');
    for (let index = 0; index < 2; index++) drawer(seat, 'SD', seatWidth / 2 - 30, 91, seatWidth * (index ? .75 : .25), 485, 350, seatDrawers, 290, 400);
    footprint(seat, seatWidth, 520, 'Window seat including pulls');
    }
    const dresser = groups.dresser; positionGroup(dresser, config.dresser.position, config.dresser.rotation);
    const mirrorWidth = config.dresser.width;
    const mirrorPivot = new THREE.Group();
    let hiddenMirror = null;
    if (roomNumber === 1) {
    for (const sideX of [9, mirrorWidth - 9]) box(dresser, 18, 2310, 400, sideX, 1155, 200, 'oak', 'Mirror cabinet side', 'M');
    box(dresser, mirrorWidth - 36, 2310, 8, mirrorWidth / 2, 1155, 4, 'oak', 'Mirror cabinet back', 'M');
    for (const shelfY of [110, 460, 850, 1240, 1630, 2020, 2301]) box(dresser, mirrorWidth - 36, 18, 370, mirrorWidth / 2, shelfY, 193, 'oak', 'Mirror storage shelf', 'M');
    dresser.add(mirrorPivot); mirrorPivot.position.set(mirrorWidth - 20, 110, 405);
    const mirrorCenter = (roomNumber === 1 ? -1 : 1) * (mirrorWidth - 40) / 2;
    box(mirrorPivot, mirrorWidth - 40, 2180, 20, mirrorCenter, 1090, 0, 'oak', 'Mirror door backing', 'M');
    hiddenMirror = box(mirrorPivot, mirrorWidth - 64, 2156, 6, mirrorCenter, 1090, -13, 'mirror', 'Hidden inside-face mirror', 'M');
    footprint(dresser, mirrorWidth, 421, 'Mirror storage');
    }
    if (roomNumber === 1) {
    positionGroup(groups.bridge, roomNumber === 1 ? [3630, 0] : [0, 0], config.seat.rotation);
    const bridgeWidth = 3560, bridgeHeight = 340.8, bridgeCount = 5;
    box(groups.bridge, bridgeWidth, 18, 400, bridgeWidth / 2, loftBottom - 9, 200, 'oak', 'Full-width window loft bottom', 'O');
    box(groups.bridge, bridgeWidth, 18, 400, bridgeWidth / 2, spec.soffit - 9, 200, 'oak', 'Window bridge roof', 'O');
    for (let division = 0; division <= bridgeCount; division++) box(groups.bridge, 18, bridgeHeight - 36, 400, 9 + division * (bridgeWidth - 18) / bridgeCount, (loftTop + loftBottom) / 2, 200, 'oak', 'Bridge vertical panel', 'O');
    for (let leaf = 0; leaf < bridgeCount; leaf++) {
      const pivot = new THREE.Group(); groups.bridge.add(pivot); pivot.position.set(leaf * bridgeWidth / bridgeCount + 2, loftBottom - 16, 405);
      box(pivot, bridgeWidth / bridgeCount - 4, bridgeHeight - 4, 19, (bridgeWidth / bridgeCount - 4) / 2, (bridgeHeight - 4) / 2, 0, 'front', 'Window loft shutter', 'O');
      loftDoors.push({pivot, angle: -Math.PI / 2});
    }
    }
    if (roomNumber === 1) {
      positionGroup(groups.study, [3630, 2780], -Math.PI / 2);
      box(groups.study, 780, 25, 550, 390, 737.5, 275, 'oak', 'Study desk top', 'T');
      box(groups.study, 18, 725, 550, 771, 362.5, 275, 'oak', 'Study desk end support', 'T');
      box(groups.study, 744, 25, 450, 390, 712.5, 225, 'ivory', 'Study shallow rail', 'T');
      footprint(groups.study, 780, 550, 'Study desk');
      const chair = new THREE.Group(); groups.study.add(chair); chair.position.set(390, 0, 640);
      box(chair, 370, 65, 360, 0, 445, 0, 'accent'); box(chair, 370, 380, 45, 0, 680, 165, 'accent');
      for (const legX of [-145, 145]) for (const legZ of [-140, 140]) rod(chair, [legX, 0, legZ], [legX, 415, legZ], 15, 'dark');
      footprint(groups.study, 370, 390, 'Study chair parked', [205, 460]);
      box(groups.study, 260, 12, 190, 400, 756, 160, 'dark');
      const studyTop = loftBottom - 18, studyHeight = studyTop - 1250;
      for (const sideX of [9, 771]) box(groups.study, 18, studyHeight, 400, sideX, (studyTop + 1250) / 2, 200, 'oak', 'Study upper side', 'TG');
      box(groups.study, 744, studyHeight, 8, 390, (studyTop + 1250) / 2, 4, 'oak', 'Study upper back', 'TG');
      for (const shelfY of [1259, 1645, 2030, studyTop - 9]) box(groups.study, 744, 18, 380, 390, shelfY, 200, 'oak', 'Study upper shelf', 'TG');
      for (let leaf = 0; leaf < 2; leaf++) {
        const pivot = new THREE.Group(); groups.study.add(pivot); const direction = leaf ? -1 : 1;
        pivot.position.set(leaf ? 778 : 2, 1252, 405);
        box(pivot, 348, studyHeight - 44, 6, direction * 193, (studyHeight - 4) / 2, 0, 'tint', 'Tinted study glazing envelope', 'TG');
        for (const frameX of [10, 376]) box(pivot, 20, studyHeight - 4, 18, direction * frameX, (studyHeight - 4) / 2, 0, 'dark', 'Study door vertical frame', 'TG');
        for (const frameY of [10, studyHeight - 14]) box(pivot, 386, 20, 18, direction * 193, frameY, 0, 'dark', 'Study door horizontal frame', 'TG');
        studyDoors.push({pivot, angle: direction * -Math.PI / 2});
      }
      box(dresser, 750, loftBottom - 18 - 2310, 19, 375, (loftBottom - 18 + 2310) / 2, 405, 'front', 'Mirror to loft closure', 'F');
      for (const [start, width] of [[750, 130], [2680, 100]]) box(groups.bridge, width, loftBottom - 18, 19, start + width / 2, (loftBottom - 18) / 2, 405, 'front', 'Window wall scribe closure', 'F');
    }
    for (let boundary = 0; boundary < config.outline.length; boundary++) {
      const start = config.outline[boundary], end = config.outline[(boundary + 1) % config.outline.length];
      const length = Math.hypot(end[0] - start[0], end[1] - start[1]);
      const ceiling = box(groups.ceiling, length, spec.ceilingDrop, 180, (start[0] + end[0]) / 2, spec.soffit + spec.ceilingDrop / 2, (start[1] + end[1]) / 2, 'ivory'); ceiling.rotation.y = -Math.atan2(end[1] - start[1], end[0] - start[0]);
    }
    for (const lightX of [config.width * .25, config.width * .75]) box(groups.ceiling, 180, 12, 180, lightX, spec.soffit - 6, 1800, 'glow');
    const ambient = new THREE.HemisphereLight('#ffffff', '#abbba8', 1.5); scene.add(ambient);
    const sun = new THREE.DirectionalLight('#fff5e4', 2); sun.position.set(3000, 7000, 2000); sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048); Object.assign(sun.shadow.camera, {left: -6500, right: 6500, top: 6500, bottom: -6500, near: 100, far: 15000}); sun.shadow.bias = -.0002; scene.add(sun);
    const fill = new THREE.DirectionalLight('#e3f0ed', .8); fill.position.set(-3000, 4000, 5000); scene.add(fill);
    const planDimensions = new THREE.Group(), wardrobeDimensions = new THREE.Group(), bedDimensions = new THREE.Group(), seatDimensions = new THREE.Group();
    const planFixtures = new THREE.Group(); planDimensions.add(planFixtures);
    if (roomNumber === 2) label(planFixtures, 'TOILET / EXISTING', [4280, 20, 1900]);
    label(planFixtures, roomNumber === 1 ? 'WALL BED' : 'BED', localPoint(bed, [bedCenter, 3000, 1150]));
    label(planFixtures, roomNumber === 1 ? 'W1 / 2 DOORS' : 'W1-3', localPoint(wardrobe, [wardrobeWidth / 2, 3000, 305]));
    if (roomNumber === 1) label(planFixtures, 'SEAT', localPoint(seat, [seatWidth / 2, 3000, 250]));
    if (roomNumber === 1) label(planFixtures, 'DESK', localPoint(groups.study, [390, 3000, 275]));
    groups.dimensions.add(planDimensions, wardrobeDimensions, bedDimensions, seatDimensions);
    dimension(planDimensions, [0, 15, 0], [config.width, 15, 0], `${config.width} MAIN`, [0, 0, -280], 110);
    dimension(planDimensions, [roomNumber === 1 ? -160 : 0, 15, 3560], [config.entryWidth - (roomNumber === 1 ? 160 : 0), 15, 3560], `${config.entryWidth} LOWER`, [0, 0, 300], 110);
    dimension(planDimensions, [0, 15, 0], [0, 15, 3560], '3560', [-350, 0, 0], 100);
    if (roomNumber === 2) { dimension(planDimensions, [3300, 15, 2625], [5185, 15, 2625], '1885 RETURN', [0, 0, -200]); dimension(planDimensions, [5185, 15, 2625], [5185, 15, 3560], '935*', [230, 0, 0]); }
    positionGroup(wardrobeDimensions, config.wardrobe.position, config.wardrobe.rotation);
    dimension(wardrobeDimensions, [0, 0, 660], [wardrobeWidth, 0, 660], `${wardrobeWidth}*`, [0, -180, 0]);
    dimension(wardrobeDimensions, [wardrobeWidth, 0, 660], [wardrobeWidth, spec.soffit, 660], '2794 / 9 FT 2 IN', [240, 0, 0]);
    dimension(wardrobeDimensions, [0, loftBottom, 650], [0, loftTop, 650], '304.8 CLEAR', [-260, 0, 0], 80);
    for (let bay = 0; bay < bayCount; bay++) label(wardrobeDimensions, `W${bay + 1}: ${bay === 1 ? 5 : 4}`, [(bay + .5) * wardrobeWidth / bayCount, 2850, 660], 80);
    positionGroup(bedDimensions, [config.bed.x, config.bed.z], config.bed.rotation);
    dimension(bedDimensions, [0, 20, 2100], [bedWidth, 20, 2100], `${bedWidth} FRAME*`, [0, 0, 180]);
    dimension(bedDimensions, [0, 20, 0], [0, 20, 2100], '2100*', [-220, 0, 0]);
    positionGroup(seatDimensions, config.seat.position, config.seat.rotation);
    dimension(seatDimensions, [0, 0, 530], [seatWidth, 0, 530], roomNumber === 1 ? `${seatWidth} SEAT*` : `${seatWidth} WINDOW*`, [0, -150, 0]);
    if (roomNumber === 1) dimension(seatDimensions, [seatWidth, 0, 0], [seatWidth, 450, 0], '450*', [180, 0, 0]);
    const section = groups.section;
    box(section, 18, carcassHeight, 610, 9, carcassCenter, 305, 'ivory');
    for (const shelfY of [110.6, 957.4, 1170, 1390, 1610, loftBottom - 9, spec.soffit - 9]) box(section, 80, 18, 565, 58, shelfY, 290.5, 'ivory');
    for (let index = 0; index < 4; index++) { box(section, 100, 203.2, 18, 50, 223.2 + index * 207.2, 550, 'front'); box(section, 80, 152.2, 508, 50, 227.7 + index * 207.2, 287, 'ivory'); }
    rod(section, [60, 2250, 220], [60, 2250, 340], 12, 'metal');
    dimension(section, [100, 0, 0], [100, 0, 610], '610 DEPTH', [0, -200, 0]);
    dimension(section, [100, 0, 610], [100, spec.soffit, 610], '2794', [0, 0, 240]);
    dimension(section, [100, 119.6, 610], [100, 948.4, 610], '4 x 8 IN', [0, 0, 550], 90);
    dimension(section, [100, loftBottom, 610], [100, loftTop, 610], '304.8 CLEAR', [0, 0, 550], 85);
    const states = Object.fromEntries(['dimensions', 'shell', 'wardrobe-doors', 'drawers', 'bed-storage', 'seat-storage', 'dresser-storage', 'entry-door', 'ceiling', 'pull-down', 'study-glass', 'loft-doors', 'used-clothes'].map(name => [name, document.getElementById(name).checked]));
    let currentView = 'overview', span = 5200, tour = null, lastTime = performance.now();
    let componentCaption = '';
    const roomCenter = [config.width / 2, 1100, 1780];
    function localPoint(group, point) { scene.updateMatrixWorld(true); return group.localToWorld(new THREE.Vector3(...point)).toArray(); }
    function syncVisibility() {
      for (const [name, group] of Object.entries(groups)) group.visible = currentView !== 'component' && currentView !== 'section' && !['component', 'section'].includes(name);
      if (currentView === 'component') groups.component.visible = true;
      else if (currentView === 'section') groups.section.visible = true;
      else {
        groups.ceiling.visible = states.ceiling && !['plan', 'wardrobe', 'bed', 'window'].includes(currentView);
        groups.walls.visible = states.shell && ['overview', 'entry'].includes(currentView);
        groups.dimensions.visible = states.dimensions;
        planDimensions.visible = currentView === 'plan';
        planFixtures.visible = currentView === 'plan';
        if (currentView === 'plan') groups.bridge.visible = false;
        wardrobeDimensions.visible = currentView === 'wardrobe'; bedDimensions.visible = currentView === 'bed'; seatDimensions.visible = currentView === 'window';
        if (currentView === 'wardrobe') for (const name of ['bed', 'bedside', 'headboard', 'seat', 'dresser', 'study', 'bridge', 'openings']) groups[name].visible = false;
        if (currentView === 'side') for (const name of ['bed', 'bedside', 'headboard', 'seat', 'dresser', 'study', 'bridge', 'openings']) groups[name].visible = false;
        if (currentView === 'bed') { for (const name of ['wardrobe', 'seat', 'dresser', 'study', 'bridge', 'openings']) groups[name].visible = false; if (roomNumber === 1) groups.wardrobe.visible = true; }
        if (currentView === 'window') for (const name of ['wardrobe', 'bed', 'headboard', 'bedside', 'openings']) groups[name].visible = false;
        if (currentView === 'window') groups.openings.visible = true;
      }
      for (const mesh of walls) { const direction = new THREE.Vector3().subVectors(activeCamera.position, controls.target); const toward = mesh.position.clone().sub(controls.target).dot(direction); mesh.visible = currentView === 'entry' || toward < 0; }
    }
    function resize() {
      const width = viewport.clientWidth, height = viewport.clientHeight, aspect = width / height;
      renderer.setSize(width, height); perspective.aspect = aspect; perspective.updateProjectionMatrix();
      const vertical = Math.max(span, span / aspect);
      orthographic.left = -vertical * aspect / 2; orthographic.right = vertical * aspect / 2; orthographic.top = vertical / 2; orthographic.bottom = -vertical / 2; orthographic.updateProjectionMatrix();
    }
    function stopTour() { tour = null; document.getElementById('walk').setAttribute('aria-pressed', 'false'); }
    function setView(view) {
      stopTour(); currentView = view;
      document.getElementById('view').value = view;
      const ortho = ['plan', 'wardrobe', 'bed', 'window', 'section'].includes(view);
      activeCamera = ortho ? orthographic : perspective;
      controls.dispose(); controls = new OrbitControls(activeCamera, renderer.domElement); controls.enableDamping = true; controls.enableRotate = !ortho; controls.addEventListener('start', stopTour);
      activeCamera.up.set(0, 1, 0); span = 5200;
      let position = config.overview, target = roomCenter;
      if (view === 'entry') { position = config.entryCamera; target = config.entryTarget; }
      if (view === 'plan') { position = [config.entryWidth / 2, 10000, 1780]; target = [config.entryWidth / 2, 0, 1780]; activeCamera.up.set(0, 0, -1); span = roomNumber === 2 ? 6350 : 4650; }
      if (view === 'wardrobe') { position = localPoint(wardrobe, [wardrobeWidth / 2, 1400, 6500]); target = localPoint(wardrobe, [wardrobeWidth / 2, 1400, 300]); span = 4100; }
      if (view === 'side') { position = localPoint(wardrobe, [-2500, 2100, 2100]); target = localPoint(wardrobe, [350, 1450, 300]); }
      if (view === 'bed') { const center = bedCenter + (roomNumber === 1 ? 430 : 0); position = localPoint(bed, [center, 1350, 6000]); target = localPoint(bed, [center, 1300, 400]); span = 3700; }
      if (view === 'window') { position = localPoint(seat, [seatWidth / 2, 1400, 6000]); target = localPoint(seat, [seatWidth / 2, 1400, 200]); span = 4150; }
      if (view === 'section') { position = [6500, 1350, 500]; target = [0, 1350, 500]; span = 3600; }
      if (view === 'component') { position = [1900, 1500, 2300]; target = [0, 0, 0]; }
      activeCamera.position.set(...position); controls.target.set(...target); activeCamera.lookAt(...target); controls.update(); resize(); syncVisibility();
      const caption = view === 'component' ? componentCaption : `${config.name.toUpperCase()} / ${view.toUpperCase()} / PROPOSED DIMENSIONS`;
      document.getElementById('view-caption').textContent = caption;
      document.getElementById('view-status').textContent = document.getElementById('view').selectedOptions[0].text;
      render();
    }
    function applyStates() {
      for (const name of Object.keys(states)) document.getElementById(name).checked = states[name];
      if (states.drawers) {
        states['wardrobe-doors'] = document.getElementById('wardrobe-doors').checked = true;
        states['pull-down'] = document.getElementById('pull-down').checked = false;
      }
      syncVisibility();
    }
    function pose(factor = 1) {
      const blend = (value, target) => THREE.MathUtils.lerp(value, target, factor);
      for (const door of wardrobeDoors) door.pivot.rotation.y = blend(door.pivot.rotation.y, states['wardrobe-doors'] ? door.angle : 0);
      for (const drawerPart of drawers) drawerPart.group.position.z = blend(drawerPart.group.position.z, states.drawers ? drawerPart.travel : 0);
      for (const drawerPart of seatDrawers) drawerPart.group.position.z = blend(drawerPart.group.position.z, states['seat-storage'] ? drawerPart.travel : 0);
      for (const door of loftDoors) door.pivot.rotation.y = blend(door.pivot.rotation.y, states['loft-doors'] ? door.angle : 0);
      for (const door of studyDoors) door.pivot.rotation.y = blend(door.pivot.rotation.y, states['study-glass'] ? door.angle : 0);
      if (usedClothesPivot) usedClothesPivot.rotation.y = blend(usedClothesPivot.rotation.y, states['used-clothes'] ? -Math.PI / 2 : 0);
      if (pullDownPivot) {
        pullDownPivot.rotation.x = blend(pullDownPivot.rotation.x, states['pull-down'] ? Math.PI * .72 : 0);
        pullDownClothes.position.set(0, 500 * Math.cos(pullDownPivot.rotation.x) - 500, 500 * Math.sin(pullDownPivot.rotation.x));
      }
      mirrorPivot.rotation.y = blend(mirrorPivot.rotation.y, states['dresser-storage'] ? Math.PI * (roomNumber === 1 ? .55 : -.52) : 0);
      if (roomNumber === 1) wallBedFold.rotation.x = blend(wallBedFold.rotation.x, states['bed-storage'] ? -Math.PI / 2 : 0);
      else bedLift.rotation.x = blend(bedLift.rotation.x, states['bed-storage'] ? -Math.PI / 6 : 0);
      doorPivot.rotation.y = blend(doorPivot.rotation.y, -(states['entry-door'] ? config.entrance.open : config.entrance.closed));
    }
    function disposeInspection() {
      const textures = new Set(), geometry = new Set(), materials = new Set();
      groups.component.traverse(object => { if (object.userData.sourceClone) return; if (object.geometry) geometry.add(object.geometry); if (object.material) { for (const entry of Array.isArray(object.material) ? object.material : [object.material]) { materials.add(entry); if (entry.map) textures.add(entry.map); } } });
      groups.component.clear(); for (const resource of [...textures, ...geometry, ...materials]) resource.dispose();
    }
    function inspectComponent(id) {
      const record = records.find(entry => entry.id === id) || records[0];
      disposeInspection(); const clone = record.object.clone(true);
      clone.traverse(object => { object.userData.sourceClone = true; });
      clone.position.set(0, 0, 0); clone.rotation.set(0, 0, 0); groups.component.add(clone);
      clone.updateMatrixWorld(true); const bounds = new THREE.Box3().setFromObject(clone); clone.position.sub(bounds.getCenter(new THREE.Vector3()));
      const half = record.dims.map(value => value / 2);
      dimension(groups.component, [-half[0], -half[1], half[2]], [half[0], -half[1], half[2]], `W ${pretty(record.dims[0])}`, [0, -100, 100], 65);
      dimension(groups.component, [half[0], -half[1], half[2]], [half[0], half[1], half[2]], `H ${pretty(record.dims[1])}`, [140, 0, 100], 65);
      dimension(groups.component, [-half[0], -half[1], -half[2]], [-half[0], -half[1], half[2]], `D ${pretty(record.dims[2])}`, [-130, -100, 0], 65);
      componentCaption = `${record.id} / ${record.name} / ${record.dims.map(pretty).join(' x ')} mm / MODEL ONLY`;
      document.getElementById('part-select').value = record.id; document.getElementById('part-size').textContent = componentCaption;
      setView('component');
      const distance = Math.max(...record.dims, 550) * 2.4;
      activeCamera.position.set(distance, distance * .8, distance * 1.3); controls.target.set(0, 0, 0); activeCamera.lookAt(0, 0, 0); controls.update(); render();
    }
    const select = document.getElementById('part-select');
    select.innerHTML = records.map(record => `<option value="${record.id}">${record.id} / ${record.name} / ${record.dims.map(pretty).join(' x ')}</option>`).join('');
    document.getElementById('part-rows').innerHTML = records.map(record => `<tr><td>${record.id} / ${record.name}</td><td>${record.type} / 1</td><td>${record.dims.map(pretty).join(' x ')}</td><td>${record.finish} / HOLD</td></tr>`).join('');
    function saveBlob(blob, filename) { const url = URL.createObjectURL(blob), anchor = document.createElement('a'); anchor.href = url; anchor.download = filename; anchor.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); }
    document.getElementById('parts-csv').addEventListener('click', () => {
      const rows = [['Room', 'Revision', 'ID', 'Name', 'Type', 'Qty', 'Model W mm', 'Model H mm', 'Model D mm', 'Finish', 'Cutting release'], ...records.map(record => [config.name, '03', record.id, record.name, record.type, 1, ...record.dims.map(value => value.toFixed(1)), record.finish, 'HOLD - model only; joints, edging, pressing and drilling unapproved'])];
      saveBlob(new Blob([rows.map(row => row.map(value => '"' + String(value).replaceAll('"', '""') + '"').join(',')).join('\r\n')], {type: 'text/csv;charset=utf-8'}), `bedroom-${roomNumber}-r03-model-NOT-FOR-CUTTING.csv`);
    });
    document.getElementById('inspect-part').addEventListener('click', () => inspectComponent(select.value));
    select.addEventListener('change', () => { const record = records.find(entry => entry.id === select.value); document.getElementById('part-size').textContent = `${record.id} / ${record.name} / ${record.dims.map(pretty).join(' x ')} mm`; });
    document.getElementById('view').addEventListener('change', event => { if (event.target.value === 'component') inspectComponent(select.value); else setView(event.target.value); });
    for (const name of Object.keys(states)) document.getElementById(name).addEventListener('change', event => {
      stopTour(); states[name] = event.target.checked;
      if (name === 'wardrobe-doors' && !states[name]) { states.drawers = false; states['pull-down'] = false; }
      if (name === 'pull-down' && states[name]) { states.drawers = false; states['wardrobe-doors'] = true; }
      if (name === 'used-clothes' && states[name]) { states.drawers = false; states['wardrobe-doors'] = false; }
      if (['drawers', 'wardrobe-doors'].includes(name) && states[name]) states['used-clothes'] = false;
      if (roomNumber === 1 && name === 'bed-storage' && !states[name]) states.drawers = false;
      applyStates(); pose(); render();
    });
    document.getElementById('reset').addEventListener('click', () => { for (const name of Object.keys(states)) states[name] = ['dimensions', 'entry-door'].includes(name); applyStates(); pose(); setView('overview'); });
    document.getElementById('png').addEventListener('click', () => { render(); renderer.domElement.toBlob(blob => { if (blob) saveBlob(blob, `bedroom-${roomNumber}-${currentView}-r03.png`); }, 'image/png'); });
    document.getElementById('print').addEventListener('click', () => { render(); window.print(); });
    const tourStops = roomNumber === 1 ? [[350, 1650, 3200], [900, 1650, 2800], [2750, 1650, 2750], [2850, 1650, 1600]] : [[4700, 1650, 3100], [3100, 1650, 3100], [2920, 1650, 2630], [2670, 1650, 1500], [2670, 1650, 750]];
    document.getElementById('walk').addEventListener('click', () => {
      if (tour) { stopTour(); return; }
      for (const name of ['drawers', 'wardrobe-doors', 'bed-storage', 'seat-storage', 'dresser-storage', 'pull-down', 'study-glass', 'loft-doors', 'used-clothes']) states[name] = false;
      states['entry-door'] = true; applyStates(); pose(); setView('entry');
      tour = {started: performance.now()}; document.getElementById('walk').setAttribute('aria-pressed', 'true');
    });
    controls.addEventListener('start', stopTour);
    function inside(pointX, pointZ) {
      const epsilon = .5;
      if (roomNumber === 1) return pointX >= (pointZ > 2625 ? -160 : 0) - epsilon && pointX <= 3630 + epsilon && pointZ >= -epsilon && pointZ <= 3560 + epsilon;
      return pointX >= -epsilon && pointX <= (pointZ >= 2625 ? 5185 : 3300) + epsilon && pointZ >= -epsilon && pointZ <= 3560 + epsilon;
    }
    function distanceToBounds(pointX, pointZ, bounds) { return Math.hypot(Math.max(bounds.minX - pointX, 0, pointX - bounds.maxX), Math.max(bounds.minZ - pointZ, 0, pointZ - bounds.maxZ)); }
    const checks = {room: config.name, drawers: drawers.length, doors: wardrobeDoors.length, lofts: loftShelves.length, records: records.length};
    checks.drawerFronts = drawers.every(part => Math.abs(part.frontHeight - 203.2) < .01 && Math.abs(part.width - (clearBay - 40)) < .01);
    checks.equalLofts = loftShelves.every(shelf => Math.abs(loftTop - (shelf.position.y + 9) - 304.8) < .01);
    checks.furnitureInside = furnitureBounds.every(bounds => [[bounds.minX, bounds.minZ], [bounds.maxX, bounds.minZ], [bounds.maxX, bounds.maxZ], [bounds.minX, bounds.maxZ]].every(([coordX, coordZ]) => inside(coordX, coordZ)));
    checks.closedFurnitureSeparated = furnitureBounds.every((bounds, index) => furnitureBounds.slice(index + 1).every(other => (bounds.name === 'Study desk' && other.name === 'Study chair parked') || Math.min(bounds.maxX, other.maxX) - Math.max(bounds.minX, other.minX) < 1 || Math.min(bounds.maxZ, other.maxZ) - Math.max(bounds.minZ, other.minZ) < 1));
    checks.entrySwing = furnitureBounds.every(bounds => distanceToBounds(...config.entrance.hinge, bounds) > config.entrance.width);
    checks.walkthrough = tourStops.every((point, index) => {
      const next = tourStops[index + 1] || point;
      return Array.from({length: 41}, (_, step) => { const coordX = point[0] + (next[0] - point[0]) * step / 40, coordZ = point[2] + (next[2] - point[2]) * step / 40; return [[-150, -150], [150, -150], [-150, 150], [150, 150]].every(([offsetX, offsetZ]) => inside(coordX + offsetX, coordZ + offsetZ)) && furnitureBounds.every(bounds => distanceToBounds(coordX, coordZ, bounds) >= 150); }).every(Boolean);
    });
    checks.uniqueIds = new Set(records.map(record => record.id)).size === records.length;
    checks.wardrobeDoorSweep = wardrobeDoors.every(door => {
      let clear = true;
      for (let step = 0; step <= 24; step++) {
        door.pivot.rotation.y = door.angle * step / 24; scene.updateMatrixWorld(true);
        const bounds = new THREE.Box3().setFromObject(door.pivot);
        clear = clear && [[bounds.min.x, bounds.min.z], [bounds.max.x, bounds.max.z]].every(([coordX, coordZ]) => inside(coordX, coordZ));
        for (const obstacle of [groups.seat, groups.dresser, groups.bed, groups.headboard]) clear = clear && !bounds.intersectsBox(new THREE.Box3().setFromObject(obstacle));
      }
      door.pivot.rotation.y = 0; return clear;
    });
    scene.updateMatrixWorld(true);
    checks.wallBedEnvelope = true;
    checks.hiddenMirrorSweep = true;
    if (roomNumber === 1) {
      for (let step = 0; step <= 24; step++) {
        mirrorPivot.rotation.y = Math.PI * .55 * step / 24; scene.updateMatrixWorld(true);
        const mirrorBounds = new THREE.Box3().setFromObject(mirrorPivot);
        checks.hiddenMirrorSweep = checks.hiddenMirrorSweep && [[mirrorBounds.min.x, mirrorBounds.min.z], [mirrorBounds.max.x, mirrorBounds.max.z]].every(([coordX, coordZ]) => inside(coordX, coordZ));
        for (const obstacle of [groups.bed, groups.seat, groups.study]) checks.hiddenMirrorSweep = checks.hiddenMirrorSweep && !mirrorBounds.intersectsBox(new THREE.Box3().setFromObject(obstacle));
      }
      mirrorPivot.rotation.y = 0;
      wallBedFold.rotation.x = -Math.PI / 2; scene.updateMatrixWorld(true);
      const folded = new THREE.Box3().setFromObject(wallBedFold);
      checks.wallBedEnvelope = folded.max.y < loftBottom - 18 && folded.min.y >= 0 && [[folded.min.x, folded.min.z], [folded.max.x, folded.max.z]].every(([coordX, coordZ]) => inside(coordX, coordZ));
      wallBedFold.rotation.x = 0; scene.updateMatrixWorld(true);
    }
    checks.requestedLayout = roomNumber === 1 ? Math.abs(clearBay - 739.5) < .01 && config.bed.rotation === config.wardrobe.rotation && hiddenMirror.position.z < 0 && studyDoors.length === 2 && loftDoors.length === 7 && !!murphyLoftShelf : groups.seat.children.length === 0 && groups.bridge.children.length === 0 && groups.dresser.children.length === 0 && wardrobeWidth === 2133.6 && !!usedClothesPivot && config.wardrobe.rotation === Math.PI && config.bed.rotation === Math.PI / 2;
    checks.usedClothesSweep = true;
    if (usedClothesPivot) {
      for (let step = 0; step <= 24; step++) {
        usedClothesPivot.rotation.y = -Math.PI / 2 * step / 24; scene.updateMatrixWorld(true);
        const bounds = new THREE.Box3().setFromObject(usedClothesPivot);
        checks.usedClothesSweep = checks.usedClothesSweep && [[bounds.min.x, bounds.min.z], [bounds.max.x, bounds.max.z]].every(([coordX, coordZ]) => inside(coordX, coordZ));
        for (const obstacle of [groups.bed, groups.headboard, groups.bedside, ...groups.openings.children]) checks.usedClothesSweep = checks.usedClothesSweep && !bounds.intersectsBox(new THREE.Box3().setFromObject(obstacle));
      }
      usedClothesPivot.rotation.y = 0; scene.updateMatrixWorld(true);
    }
    checks.fullHeight = spec.soffit === 2794 && records.filter(record => ['Base / roof panel', 'Wall-bed cabinet roof', 'Window bridge roof'].includes(record.name) && record.object.position.y > 2000).every(record => Math.abs(new THREE.Box3().setFromObject(record.object).max.y - 2794) < .01);
    checks.pass = checks.drawers === (roomNumber === 1 ? 4 : 13) && checks.doors === bayCount * 2 && checks.lofts === bayCount && ['drawerFronts', 'equalLofts', 'furnitureInside', 'closedFurnitureSeparated', 'entrySwing', 'walkthrough', 'uniqueIds', 'wardrobeDoorSweep', 'wallBedEnvelope', 'hiddenMirrorSweep', 'requestedLayout', 'usedClothesSweep', 'fullHeight'].every(key => checks[key]);
    document.getElementById('checks').textContent = checks.pass ? `STATIC FIT PASS / ${checks.doors} wardrobe doors, ${checks.drawers} drawers. Requested layout, furniture bounds and sampled entry / wardrobe sweeps pass. Hardware approval required.` : 'CHECK FAILED / ' + Object.entries(checks).filter(([key, value]) => key !== 'pass' && value === false).map(([key]) => key).join(', ');
    function render() {
      syncVisibility();
      scene.traverse(object => {
        if (!object.userData.dimensionLabel) return;
        const position = object.getWorldPosition(new THREE.Vector3());
        const visibleHeight = activeCamera.isOrthographicCamera ? (activeCamera.top - activeCamera.bottom) / activeCamera.zoom : 2 * position.distanceTo(activeCamera.position) * Math.tan(THREE.MathUtils.degToRad(activeCamera.fov / 2));
        const labelHeight = 32 * visibleHeight / viewport.clientHeight;
        object.scale.set(labelHeight * 8, labelHeight, 1);
      });
      renderer.render(scene, activeCamera);
    }
    function pixelCheck() {
      render(); const context = renderer.getContext(), pixels = new Uint8Array(4), colors = new Set();
      for (let row = 1; row < 24; row++) for (let column = 1; column < 32; column++) { context.readPixels(Math.floor(context.drawingBufferWidth * column / 32), Math.floor(context.drawingBufferHeight * row / 24), 1, 1, context.RGBA, context.UNSIGNED_BYTE, pixels); colors.add(`${pixels[0]},${pixels[1]},${pixels[2]}`); }
      document.getElementById('render-status').textContent = `${colors.size > 5 ? '3D rendered' : 'RENDER CHECK NEEDED'} / ${viewport.clientWidth} x ${viewport.clientHeight} / ${colors.size} sampled colours`;
      return colors.size;
    }
    new ResizeObserver(() => { resize(); render(); }).observe(viewport);
    const query = new URLSearchParams(location.search);
    if (query.get('doors') === 'open') states['wardrobe-doors'] = true;
    if (query.get('drawers') === 'open') states.drawers = true;
    if (query.get('bed') === 'open') states['bed-storage'] = true;
    if (query.get('seat') === 'open') states['seat-storage'] = true;
    if (query.get('mirror') === 'open') states['dresser-storage'] = true;
    if (query.get('glass') === 'open') states['study-glass'] = true;
    if (query.get('lofts') === 'open') states['loft-doors'] = true;
    if (query.get('side') === 'open' && roomNumber === 2) { states['used-clothes'] = true; states.drawers = false; states['wardrobe-doors'] = false; }
    if (query.get('rail') === 'down' && roomNumber === 1) { states['pull-down'] = true; states.drawers = false; states['wardrobe-doors'] = true; }
    if (query.get('shell') === 'full') states.shell = true;
    applyStates(); pose();
    const requestedView = query.get('view') || 'overview';
    if (requestedView === 'component') inspectComponent(query.get('part'));
    else setView([...document.getElementById('view').options].some(option => option.value === requestedView) ? requestedView : 'overview');
    loading.hidden = true; pixelCheck();
    renderer.setAnimationLoop(time => {
      const delta = Math.min((time - lastTime) / 1000, .1); lastTime = time;
      if (tour) {
        const progress = (time - tour.started) / 5000, index = Math.floor(progress);
        if (index >= tourStops.length - 1) stopTour();
        else { const position = new THREE.Vector3(...tourStops[index]).lerp(new THREE.Vector3(...tourStops[index + 1]), progress - index); activeCamera.position.copy(position); controls.target.set(config.width / 2, 1200, 1750); }
      }
      pose(1 - Math.exp(-delta * 9)); controls.update(); render();
    });
    window.bedroomModel = {config, spec, checks, records, furnitureBounds, states, groups, renderer, scene, setView, inspectComponent, pixelCheck, tourStops};
  } catch (error) {
    loading.hidden = false; loading.textContent = `3D could not load: ${error.message}. Internet access and WebGL are required.`;
    document.getElementById('checks').textContent = 'MODEL NOT VALIDATED';
    console.error(error);
  }
})();