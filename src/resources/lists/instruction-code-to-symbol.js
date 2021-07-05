// List of instruction code to html symbol based on characters listed on https://dev.w3.org/html5/html-author/charref
const instructionCodeToSymbol = [
  '&lsh;', // Turn left           [0]
  '&rsh;', // Turn right          [1]
  '&cularr;', // Sharp left       [2]
  '&curarr;', // Sharp right      [3]
  '&nwarr;', // Slight left       [4]
  '&nearr;', // Slight right      [5]
  '&uarr;', // Straight           [6]
  '&orarr;', // Enter roundabout  [7]
  '&orarr;', // Exit roundabout   [8]
  '&cularr;', // U-turn           [9]
  '&nwArr;', // Goal              [10]
  '&uArr;', // Depart             [11]
  '&larrb;', // Keep left  [12]
  '&rarrb;', // Keep right          [13]
]

export default instructionCodeToSymbol
