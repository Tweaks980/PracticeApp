// data.js (authoritative clubs + drills)\nexport const DEFAULT_CLUBS = [
  {
    "id": "LW",
    "name": "LW",
    "loft": 58,
    "carryAvg": 80,
    "carryMin": 76,
    "carryMax": 84
  },
  {
    "id": "SW",
    "name": "SW",
    "loft": 54,
    "carryAvg": 91,
    "carryMin": 87,
    "carryMax": 95
  },
  {
    "id": "GW",
    "name": "GW",
    "loft": 48,
    "carryAvg": 103,
    "carryMin": 98,
    "carryMax": 108
  },
  {
    "id": "AW",
    "name": "AW",
    "loft": 46,
    "carryAvg": 113,
    "carryMin": 108,
    "carryMax": 118
  },
  {
    "id": "PW",
    "name": "PW",
    "loft": 43,
    "carryAvg": 122,
    "carryMin": 116,
    "carryMax": 127
  },
  {
    "id": "9i",
    "name": "9i",
    "loft": 37,
    "carryAvg": 137,
    "carryMin": 131,
    "carryMax": 143
  },
  {
    "id": "8i",
    "name": "8i",
    "loft": 32,
    "carryAvg": 152,
    "carryMin": 145,
    "carryMax": 158
  },
  {
    "id": "7i",
    "name": "7i",
    "loft": 28,
    "carryAvg": 164,
    "carryMin": 157,
    "carryMax": 171
  },
  {
    "id": "6i",
    "name": "6i",
    "loft": 24,
    "carryAvg": 173,
    "carryMin": 165,
    "carryMax": 181
  },
  {
    "id": "7W",
    "name": "7W",
    "loft": 21,
    "carryAvg": 185,
    "carryMin": 177,
    "carryMax": 193
  },
  {
    "id": "3W",
    "name": "3W",
    "loft": 15,
    "carryAvg": 200,
    "carryMin": 192,
    "carryMax": 209
  },
  {
    "id": "D",
    "name": "Driver",
    "loft": 10.5,
    "carryAvg": 250,
    "carryMin": 235,
    "carryMax": 280
  }
];

export const DEFAULT_DRILLS = [
  {
    "id": "arc-depth-woods",
    "name": "Arc Depth Woods",
    "constraints": [
      "Alternate off-deck and 4 tee heights",
      "Sequence: Mat → Tiny tee → Mat → Small tee → Mat → Mid tee → Mat → High tee",
      "Focus on center strike",
      "Goal: 70% center strike"
    ]
  },
  {
    "id": "arc-depth-tee-ball",
    "name": "Arc Depth Tee w/ Ball",
    "constraints": [
      "With ball",
      "5 reps with ball on tees at different heights",
      "If you miss one, start that club over"
    ]
  },
  {
    "id": "arc-depth-tee-no-ball",
    "name": "Arc Depth Tee without Ball",
    "constraints": [
      "No ball",
      "Rubber tees drill with 3 different tee heights",
      "If you miss one, start that club over"
    ]
  },
  {
    "id": "ball-flight-control",
    "name": "Ball Flight Control",
    "constraints": [
      "Alternate high & low shots (ball position/tee height)"
    ]
  },
  {
    "id": "block-practice",
    "name": "Block Practice",
    "constraints": [
      "Controlled & centered strike",
      "No more than 10 yards offline",
      "Spray the face and work on center contact",
      "Consistent flight windows and yardages"
    ]
  },
  {
    "id": "blue-brick-fade-draw",
    "name": "Blue Brick Fade/Draw Drill",
    "constraints": [
      "Make sure you get 7/10",
      "Don’t hit a draw until you’ve successfully hit a fade and so on"
    ]
  },
  {
    "id": "blue-brick-gate",
    "name": "Blue Brick Gate Drill",
    "constraints": [
      "Blue Brick alignment rods",
      "Restarts build discipline & face awareness",
      "Start the club over if rods are hit",
      "No more than 9 yards offline (redo if exceeded)",
      "Club path: −2 to +2",
      "HLA: −2 to +2"
    ]
  },
  {
    "id": "blue-brick-path",
    "name": "Blue Brick Path Drill",
    "constraints": [
      "Path between −3 and 0 (in-to-out)",
      "2 reps with aid, 2 reps without aid (16 swings)",
      "HLA 0 to 2R",
      "Focus order: path → start line → face to path (calculate HLA − path)"
    ]
  },
  {
    "id": "blue-brick-shaft-lean",
    "name": "Blue Brick Wedge Shaft Lean Aid",
    "constraints": [
      "Remember to lean shaft at impact, not only at address"
    ]
  },
  {
    "id": "driver-block-practice",
    "name": "Driver Block Practice",
    "constraints": [
      "High focus on accuracy and consistent flight windows/yardages",
      "Goal: 12/15 fairways over 235+ yards"
    ]
  },
  {
    "id": "knocked-down-wedges",
    "name": "Knocked Down Wedges",
    "constraints": [
      "80, 100, 120 yard carries",
      "3 shots each distance"
    ]
  },
  {
    "id": "ladder-carry",
    "name": "Ladder Carry",
    "constraints": [
      "Focus on accuracy for each club",
      "Goal: hit exact carry yardages 3/5 times"
    ]
  },
  {
    "id": "ladder-wedge",
    "name": "Ladder Wedge",
    "constraints": [
      "Use spray",
      "Launch angle between 28–32",
      "Goal: carry as close to your numbers as possible"
    ]
  },
  {
    "id": "random-ball-position",
    "name": "Random Ball Position",
    "constraints": [
      "Random ball position in the stance with each club"
    ]
  },
  {
    "id": "random-sim-carry",
    "name": "Random Sim Carry Yardages",
    "constraints": [
      "No more than 9 yards offline",
      "+4 long and −4 short carry"
    ]
  },
  {
    "id": "speed-training",
    "name": "Speed Training",
    "constraints": [
      "Big turn",
      "Shallow path",
      "Snap at impact",
      "I/O",
      "Only input best 3W number and Driver number"
    ]
  },
  {
    "id": "start-line-face-gate",
    "name": "Start Line Face Gate Drill",
    "constraints": [
      "Gate 9’ ahead",
      "Send 10 shots through a 2”–4” window",
      "Put tape on screen"
    ]
  },
  {
    "id": "target-sim-practice",
    "name": "Target Sim Practice",
    "constraints": [
      "Goal: 70% within 8-yard window (width & length)"
    ]
  },
  {
    "id": "towel-drill",
    "name": "Towel Drill",
    "constraints": [
      "Towel 2” behind ball",
      "Clip ball without towel",
      "Promotes ball-first contact & forward shaft lean",
      "Use spray",
      "Work on center strikes"
    ]
  },
  {
    "id": "putting-gate",
    "name": "Putting – Gate Drill",
    "constraints": [
      "2 sets of making 10 putts",
      "Focus on start line & tempo"
    ]
  },
  {
    "id": "putting-50-row",
    "name": "Putting – Make 50 Putts in a Row",
    "constraints": [
      "9’ (no gate)"
    ]
  },
  {
    "id": "putting-randomizer",
    "name": "Putting – Randomizer",
    "constraints": [
      "25 putts (1–9 ft)"
    ]
  },
  {
    "id": "under-over-contact",
    "name": "Under / Over Contact",
    "constraints": [
      "Miss low, miss high, then strike center",
      "Find center of the face on all reps",
      "Use spray"
    ]
  },
  {
    "id": "variability",
    "name": "Variability",
    "constraints": [
      "Address toe/heel but still strike center",
      "Toe → center, heel → center, center → center",
      "Priority: center contact and staying under 9 yards off"
    ]
  },
  {
    "id": "traj-low",
    "name": "Trajectory Low Windows",
    "constraints": [
      "(3) Low 60’ (55’–70’)"
    ]
  },
  {
    "id": "traj-mid",
    "name": "Trajectory Mid Windows",
    "constraints": [
      "(3) Mid 75’ (70’–85’)"
    ]
  },
  {
    "id": "traj-high",
    "name": "Trajectory High Windows",
    "constraints": [
      "(3) High 90’+"
    ]
  },
  {
    "id": "ladder-lw-distance",
    "name": "Ladder LW Distance",
    "constraints": [
      "LW only",
      "10/20/30/40/50/60/70/80 carry yards",
      "5 shots per distance",
      "Input carry yardage goal for each distance in app"
    ]
  }
];

export const CONTACT_TYPES = ["solid","thin","fat","toe","heel"];\nexport const OUTCOME_TYPES = ["success","miss"];\nexport const MISS_DIRECTIONS = ["short","long","left","right"];\n\nexport function isPuttingDrill(drillId){ return (drillId||"").startsWith("putting-"); }\n