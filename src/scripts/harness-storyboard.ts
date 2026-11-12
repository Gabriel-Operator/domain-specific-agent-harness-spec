export const space = { width: 720, height: 560, perspective: 1200 };

type Piece = {
  title?: string;
  shape: 'frame' | 'strip' | 'module' | 'label' | 'cube' | 'vault' | 'app' | 'expert';
  tone?: 'domain' | 'contract' | 'warning' | 'runtime';
  origin?: string;
};

const catalog = {
  skill: { title: 'Agent skill', shape: 'frame', tone: 'runtime', origin: 'core' },
  skillInstructions: { title: 'Instructions', shape: 'strip' },
  skillReferences: { title: 'Reference files', shape: 'strip' },
  skillScripts: { title: 'Optional scripts', shape: 'strip' },
  skillB: { title: 'Skill B', shape: 'module', tone: 'runtime', origin: 'skill' },
  skillC: { title: 'Skill C', shape: 'module', tone: 'runtime', origin: 'skill' },
  toolAccess: { title: 'Tool access', shape: 'strip', tone: 'runtime' },
  appRecords: { title: 'App data', shape: 'strip', tone: 'runtime' },
  core: { title: 'Playbook', shape: 'frame', tone: 'contract', origin: 'package' },
  inputs: { title: 'Inputs', shape: 'strip' },
  instructions: { title: 'Instructions', shape: 'strip' },
  steps: { title: 'Steps + skills', shape: 'strip' },
  requirements: { title: 'Connector requirements', shape: 'strip', tone: 'domain', origin: 'steps' },
  checkpoints: { title: 'Approval rules', shape: 'strip', tone: 'warning', origin: 'steps' },
  outputs: { title: 'Outputs', shape: 'strip' },
  playbookB: { title: 'Playbook B', shape: 'module', tone: 'contract', origin: 'core' },
  playbookC: { title: 'Playbook C', shape: 'module', tone: 'contract', origin: 'core' },
  missing: { title: 'New capability', shape: 'frame', tone: 'warning', origin: 'goal' },
  draft: { title: 'New playbook', shape: 'module', tone: 'contract', origin: 'missing' },
  mismatch: { title: 'Unclear handoffs', shape: 'label', tone: 'warning' },
  duplicated: { title: 'Repeated setup', shape: 'label', tone: 'warning' },
  forgotten: { title: 'Feedback lost', shape: 'label', tone: 'warning' },
  package: { title: 'Playbook package', shape: 'cube', tone: 'contract', origin: 'core' },
  playbookRegistry: { title: 'Playbook registry', shape: 'frame', tone: 'contract', origin: 'core' },
  marketplace: { title: 'Marketplace', shape: 'frame', tone: 'contract', origin: 'persona' },
  playbookListings: { title: 'Playbook packages', shape: 'frame', tone: 'contract', origin: 'core' },
  verifyPackage: { title: 'Verify', shape: 'cube', tone: 'contract', origin: 'playbookB' },
  researchPackage: { title: 'Research', shape: 'cube', tone: 'contract', origin: 'core' },
  draftPackage: { title: 'Draft', shape: 'cube', tone: 'contract', origin: 'playbookC' },
  researchPersona: { title: 'Research analyst persona', shape: 'frame', tone: 'domain', origin: 'persona' },
  briefingPersona: { title: 'Briefing writer persona', shape: 'frame', tone: 'domain', origin: 'persona' },
  verifyReference: { title: 'Verify', shape: 'strip', origin: 'verifyPackage' },
  researchReferenceA: { title: 'Research', shape: 'strip', origin: 'researchPackage' },
  researchReferenceB: { title: 'Research', shape: 'strip', origin: 'researchPackage' },
  draftReference: { title: 'Draft', shape: 'strip', origin: 'draftPackage' },
  personaListings: { title: 'Optional persona listings', shape: 'label', tone: 'contract' },
  persona: { title: 'Persona', shape: 'frame', tone: 'domain', origin: 'package' },
  ontology: { title: 'Domain ontology', shape: 'strip', tone: 'domain', origin: 'persona' },
  team: { title: 'Team', shape: 'frame', tone: 'domain' },
  teamB: { title: 'Team B', shape: 'frame', tone: 'domain', origin: 'team' },
  goal: { title: 'Goal', shape: 'strip', tone: 'runtime', origin: 'team' },
  planning: { title: 'Select · order · invoke', shape: 'label', tone: 'runtime', origin: 'goal' },
  creation: { title: 'Draft the missing playbook', shape: 'label', tone: 'contract', origin: 'goal' },
  agents: { title: 'Agents execute the selected playbooks', shape: 'label', tone: 'contract' },
  harness: { title: 'Harness', shape: 'frame', tone: 'runtime' },
  connectors: { title: 'Connectors', shape: 'strip', tone: 'domain' },
  operations: { title: 'Read · write · share', shape: 'label', tone: 'domain' },
  services: { title: 'External services', shape: 'frame', tone: 'domain' },
  records: { title: 'Source data', shape: 'strip', tone: 'domain', origin: 'services' },
  vault: { title: 'Vault', shape: 'vault', tone: 'contract' },
  credentials: { title: 'Credentials', shape: 'label', tone: 'contract', origin: 'vault' },
  app: { title: 'Custom app', shape: 'app', tone: 'domain', origin: 'connectors' },
  appData: { title: 'Data + agent results', shape: 'label', tone: 'domain', origin: 'app' },
  proposal: { title: 'Draft plan', shape: 'strip', tone: 'contract', origin: 'core' },
  rehearsal: { title: 'Sandbox test', shape: 'strip', tone: 'domain', origin: 'proposal' },
  expert: { title: 'Domain specialist', shape: 'expert', tone: 'warning' },
  decision: { title: 'Approve the exact action', shape: 'label', tone: 'warning', origin: 'expert' },
  approvedEffect: { title: 'Execute live', shape: 'strip', tone: 'domain', origin: 'connectors' },
  receipt: { title: 'Live receipt', shape: 'strip', tone: 'runtime', origin: 'approvedEffect' },
  learning: { title: 'Improve playbook', shape: 'strip', tone: 'contract', origin: 'receipt' },
  workspace: { title: 'Workspace A', shape: 'frame', tone: 'runtime' },
  workspaceB: { title: 'Workspace B', shape: 'frame', tone: 'runtime', origin: 'workspace' },
  personaB: { title: 'Persona B', shape: 'frame', tone: 'domain', origin: 'persona' },
  teamC: { title: 'Team', shape: 'frame', tone: 'domain', origin: 'team' },
  referenceA: { shape: 'cube', tone: 'contract', origin: 'package' },
  referenceB: { shape: 'cube', tone: 'contract', origin: 'package' },
  connectorB: { title: 'Connectors', shape: 'strip', tone: 'domain', origin: 'connectors' },
  vaultB: { title: 'Vault', shape: 'vault', tone: 'contract', origin: 'vault' },
  local: { title: 'Own accounts + data', shape: 'label', tone: 'runtime' },
  localB: { title: 'Own accounts + data', shape: 'label', tone: 'runtime', origin: 'local' },
} as const satisfies Record<string, Piece>;

export type PieceId = keyof typeof catalog;
export const pieces: Record<PieceId, Piece> = catalog;

export type Pose = { x: number; y: number; width: number; height: number; depth: number; angle: number };
export type Wire = { from: PieceId; to: PieceId; kind: 'invoke' | 'data' | 'auth' | 'review' | 'broken' };
export type Frame = { poses: Partial<Record<PieceId, Pose>>; wires?: Wire[]; caption: string };
const at = (x: number, y: number, width: number, height: number, depth = 0, angle = 0): Pose =>
  ({ x, y, width, height, depth, angle });
const wire = (from: PieceId, to: PieceId, kind: Wire['kind'] = 'invoke'): Wire => ({ from, to, kind });

const personaComposition: Frame['poses'] = {
  persona: at(360, 292, 648, 418, -8),
  ontology: at(360, 151, 580, 36),
  team: at(208, 319, 274, 238, -4),
  teamB: at(512, 319, 274, 238, -4),
  core: at(142, 336, 112, 130),
  playbookB: at(273, 336, 112, 130),
  playbookC: at(446, 336, 112, 130),
  draft: at(577, 336, 112, 130),
  agents: at(360, 472, 520, 24),
};

const activeTeam: Frame['poses'] = {
  harness: at(360, 280, 650, 500, -14),
  persona: at(360, 315, 606, 388, -8),
  team: at(360, 338, 560, 314, -4),
  goal: at(360, 240, 218, 40, 4),
  core: at(183, 375, 130, 136),
  playbookB: at(360, 375, 130, 136),
  playbookC: at(537, 375, 130, 136),
  planning: at(360, 285, 300, 24, 5),
  agents: at(360, 467, 430, 24, 3),
};

const connected: Frame['poses'] = {
  harness: at(253, 289, 452, 470, -14),
  persona: at(163, 294, 238, 306, -8),
  team: at(163, 320, 206, 240, -4),
  goal: at(163, 254, 170, 36, 4),
  core: at(163, 355, 166, 106, 2),
  connectors: at(383, 355, 156, 46, 4),
  operations: at(383, 402, 177, 24, 4),
  services: at(597, 355, 190, 194, -2),
  records: at(597, 372, 156, 42, 4),
};

const dataWires: Wire[] = [wire('goal', 'core'), wire('core', 'connectors', 'data'), wire('connectors', 'records', 'data')];

const withApps: Frame['poses'] = {
  ...connected,
  services: at(597, 175, 190, 154, -2),
  records: at(597, 195, 156, 40, 4),
  vault: at(383, 461, 125, 80, 6),
  app: at(597, 420, 190, 148, 6),
  appData: at(597, 518, 210, 22, 4),
};

export const storyboard = {
  basics: {
    caption: 'A skill gives an agent reusable instructions and may include supporting files.',
    poses: {
      skill: at(360, 271, 370, 294),
      skillInstructions: at(360, 226, 316, 42, 8),
      skillReferences: at(360, 284, 316, 42, 8),
      skillScripts: at(360, 342, 316, 42, 8),
    },
  },
  tangled: {
    caption: 'Custom scripts and tool setup tie skill handoffs to one environment.',
    poses: {
      skill: at(140, 136, 170, 135, 0, -6),
      skillB: at(362, 160, 170, 135, 0, 4),
      skillC: at(580, 127, 170, 135, 0, -3),
      toolAccess: at(155, 394, 178, 44, 4, 4),
      appRecords: at(565, 398, 170, 44, 4, -3),
      mismatch: at(360, 290, 230, 36, 8),
      duplicated: at(165, 468, 220, 28, 8),
      forgotten: at(560, 468, 220, 28, 8),
    },
    wires: [wire('skill', 'appRecords', 'broken'), wire('skillB', 'toolAccess', 'broken'), wire('skillC', 'toolAccess', 'broken'), wire('skill', 'skillC', 'broken'), wire('skillB', 'appRecords', 'broken')],
  },
  contract: {
    caption: 'A standard playbook adds a contract for how the work runs and fits with other playbooks.',
    poses: {
      core: at(360, 270, 430, 440),
      inputs: at(360, 139, 374, 38, 8),
      instructions: at(360, 191, 374, 38, 8),
      steps: at(360, 243, 374, 38, 8),
      requirements: at(360, 295, 374, 38, 8),
      checkpoints: at(360, 347, 374, 38, 8),
      outputs: at(360, 412, 374, 38, 8),
    },
  },
  persona: {
    caption: 'A persona packages teams and their playbooks with a shared domain model.',
    poses: personaComposition,
  },
  goals: {
    caption: 'A goal selects and invokes playbooks in the team. Their dependencies determine the order.',
    poses: activeTeam,
    wires: [wire('goal', 'core'), wire('goal', 'playbookB'), wire('goal', 'playbookC')],
  },
  missing: {
    caption: 'A goal can reveal a missing capability. The team can draft, review, and register a playbook for it.',
    poses: {
      ...activeTeam,
      playbookC: at(544, 441, 132, 60),
      core: at(176, 380, 130, 128),
      playbookB: at(355, 380, 130, 128),
      missing: at(544, 375, 166, 214, -2),
      draft: at(544, 340, 132, 100, 8),
      planning: at(248, 285, 285, 24, 5),
      agents: undefined,
      creation: at(360, 506, 440, 24, 6),
    },
    wires: [wire('goal', 'core'), wire('core', 'playbookB'), wire('playbookB', 'draft'), wire('goal', 'draft'), wire('draft', 'playbookC')],
  },
  connectors: {
    caption: 'The playbook calls declared connector operations to read, write, and share data.',
    poses: connected,
    wires: dataWires,
  },
  vault: {
    caption: 'The vault supplies credentials to the authorized connection used by the connector.',
    poses: {
      ...connected,
      vault: at(383, 165, 142, 96, 10),
      credentials: at(383, 239, 180, 24, 6),
    },
    wires: [...dataWires, wire('vault', 'connectors', 'auth')],
  },
  apps: {
    caption: 'Custom apps use connector data and agent outputs. Agents can write changes back through those connections.',
    poses: withApps,
    wires: [...dataWires, wire('vault', 'connectors', 'auth'), wire('connectors', 'app', 'data')],
  },
  review: {
    caption: 'Rehearsal informs human approval. The authorized action produces a live receipt that can inform the next revision.',
    poses: {
      harness: at(360, 285, 650, 424, -14),
      proposal: at(143, 200, 158, 52, 5),
      rehearsal: at(345, 200, 172, 52, 7),
      expert: at(564, 200, 178, 84, 9),
      decision: at(564, 297, 208, 26, 6),
      approvedEffect: at(564, 386, 180, 52, 5),
      receipt: at(345, 386, 150, 52, 5),
      learning: at(143, 386, 174, 52, 5),
    },
    wires: [
      wire('proposal', 'rehearsal'), wire('rehearsal', 'expert', 'review'),
      wire('expert', 'decision', 'review'), wire('decision', 'approvedEffect', 'review'),
      wire('approvedEffect', 'receipt'), wire('receipt', 'learning', 'review'),
    ],
  },
  reuse: {
    caption: 'Reuse a playbook across teams and personas. Each workspace supplies its own accounts, data, and approvals.',
    poses: {
      playbookRegistry: at(360, 86, 460, 134, -8),
      package: at(360, 88, 55, 60, 8),
      workspace: at(186, 361, 322, 360, -14),
      workspaceB: at(534, 361, 322, 360, -14),
      persona: at(133, 333, 184, 210, -8),
      personaB: at(481, 333, 184, 210, -8),
      team: at(133, 349, 154, 142, -4),
      teamC: at(481, 349, 154, 142, -4),
      referenceA: at(133, 355, 52, 57, 5),
      referenceB: at(481, 355, 52, 57, 5),
      connectors: at(282, 345, 104, 34, 3),
      connectorB: at(630, 345, 104, 34, 3),
      vault: at(282, 454, 100, 60, 6),
      vaultB: at(630, 454, 100, 60, 6),
      local: at(186, 513, 270, 24, 3),
      localB: at(534, 513, 270, 24, 3),
    },
    wires: [wire('package', 'referenceA'), wire('package', 'referenceB'), wire('referenceA', 'connectors', 'data'), wire('referenceB', 'connectorB', 'data'), wire('vault', 'connectors', 'auth'), wire('vaultB', 'connectorB', 'auth')],
  },
  complete: {
    caption: 'Team goals invoke playbooks. The harness coordinates execution, data access, apps, and expert review.',
    poses: {
      harness: at(252, 280, 448, 446, -14),
      persona: at(158, 236, 224, 280, -8),
      ontology: at(158, 145, 190, 26, 2),
      team: at(158, 266, 194, 190, -4),
      core: at(158, 308, 153, 66, 3),
      goal: at(158, 226, 153, 28, 6),
      connectors: at(378, 308, 154, 38, 5),
      vault: at(378, 426, 112, 70, 6),
      expert: at(158, 426, 184, 68, 5),
      services: at(597, 195, 186, 150, -2),
      records: at(597, 214, 154, 38, 4),
      app: at(597, 398, 186, 142, 6),
    },
    wires: [wire('goal', 'core'), wire('core', 'connectors', 'data'), wire('connectors', 'records', 'data'), wire('connectors', 'app', 'data'), wire('vault', 'connectors', 'auth'), wire('expert', 'core', 'review')],
  },
  marketplace: {
    caption: 'The same Research playbook serves two personas. Both personas can also be listed in the marketplace.',
    poses: {
      marketplace: at(360, 280, 680, 510, -16),
      playbookListings: at(360, 136, 622, 140, -8),
      verifyPackage: at(155, 137, 62, 66, 6),
      researchPackage: at(360, 137, 62, 66, 6),
      draftPackage: at(565, 137, 62, 66, 6),
      researchPersona: at(192, 376, 280, 154, -8),
      briefingPersona: at(528, 376, 280, 154, -8),
      team: at(192, 392, 246, 92, -4),
      teamC: at(528, 392, 246, 92, -4),
      verifyReference: at(135, 404, 101, 34, 3),
      researchReferenceA: at(249, 404, 101, 34, 3),
      researchReferenceB: at(471, 404, 101, 34, 3),
      draftReference: at(585, 404, 101, 34, 3),
      personaListings: at(360, 487, 360, 24, 3),
    },
    wires: [
      wire('verifyPackage', 'researchPersona'),
      wire('researchPackage', 'researchPersona'),
      wire('researchPackage', 'briefingPersona'),
      wire('draftPackage', 'briefingPersona'),
    ],
  },
} satisfies Record<string, Frame>;

export type Scene = keyof typeof storyboard;

export const phaseFor = (scene: Scene) =>
  scene === 'basics' || scene === 'tangled' ? 'Current practice' : 'Proposed standard';
