const userId = process.env.BREWFATHER_USER_ID;
const apiKey = process.env.BREWFATHER_API_KEY;
const baseAuth = btoa(`${userId}:${apiKey}`);

const authHeader = {
  Authorization: `Basic ${baseAuth}`,
};

type ApiReturnBatch = {
  _id: string;
  batchNo: number;
  brewDate: number;
  brewer: string;
  name: string;
  recipe: { name: string; style: { type: string }; color: number };
  status: string;
  measuredOg: number;
  measuredFg: number;
  measuredAbv: number;
  estimatedIbu: number;
  bottlingDate: number;
  notes: { status: string; timestamp: number }[];
};

export type Batch = Awaited<ReturnType<typeof getBatches>>[number];

export async function getBatches() {
  const res = await fetch(
    "https://api.brewfather.app/v2/batches?limit=50&order_by=brewDate&order_by_direction=desc&status=Completed&include=recipe,measuredOg,measuredFg,measuredAbv,estimatedIbu,bottlingDate,notes",
    { headers: authHeader }
  );
  const data = res.json() as Promise<ApiReturnBatch[]>;
  return (await data)
    .map((batch) => ({
      id: batch._id,
      batchNo: batch.batchNo,
      brewDate: batch.brewDate,
      brewer: batch.brewer,
      name: batch.recipe.name,
      status: batch.status,
      measuredOg: plato(batch.measuredOg),
      measuredFg: plato(batch.measuredFg),
      abv: batch.measuredAbv,
      ibu: batch.estimatedIbu,
      colorEbc: srmToEbc(batch.recipe.color),
      colorRgb: srmToRgb(batch.recipe.color),
      bottlingDate: batch.bottlingDate,
      conditioningDate: batch.notes.find(
        (note) => note.status === "Conditioning"
      )?.timestamp,
    }))
    .sort((a, b) => b.batchNo - a.batchNo);
}

export async function getBatch(id: string) {
  const res = await fetch(`https://api.brewfather.app/v2/batches/${id}`, {
    headers: authHeader,
  });
  const data = await res.json();
  console.log(data);
  return {
    name: data.recipe.name,
    style: data.recipe.style.type,
    originalGravity: plato(data.measuredOg),
    finalGravity: plato(data.measuredFg),
    abv: data.measuredAbv,
    ibu: data.estimatedIbu,
  };
}

const plato = (sg: number) => Math.round((260.4 - 260.4 / sg) * 10) / 10;

const srmToEbc = (srm: number) => Math.round(srm * 1.97);

const srmToRgb = (srm: number) => {
  const key = String(Math.round(srmToEbc(srm))) as keyof typeof ebcToRgbMap;
  const val = ebcToRgbMap[key];
  return `rgb(${val[0]} ${val[1]} ${val[2]})`;
};

const ebcToRgbMap = {
  "0": [255, 255, 255],
  "1": [255, 250, 198],
  "2": [255, 246, 149],
  "3": [255, 241, 94],
  "4": [255, 225, 74],
  "5": [255, 206, 57],
  "6": [255, 188, 37],
  "7": [255, 168, 16],
  "8": [255, 154, 0],
  "9": [251, 150, 0],
  "10": [247, 147, 0],
  "11": [243, 142, 0],
  "12": [237, 140, 0],
  "13": [233, 136, 0],
  "14": [229, 132, 0],
  "15": [226, 129, 0],
  "16": [221, 126, 0],
  "17": [218, 124, 0],
  "18": [214, 119, 0],
  "19": [211, 111, 0],
  "20": [204, 101, 0],
  "21": [203, 89, 0],
  "22": [199, 79, 0],
  "23": [194, 70, 0],
  "24": [192, 62, 0],
  "25": [186, 49, 0],
  "26": [181, 43, 0],
  "27": [177, 41, 0],
  "28": [171, 39, 0],
  "29": [165, 37, 0],
  "30": [161, 34, 0],
  "31": [155, 32, 0],
  "32": [149, 31, 0],
  "33": [143, 28, 0],
  "34": [140, 26, 0],
  "35": [134, 24, 0],
  "36": [130, 21, 0],
  "37": [124, 18, 0],
  "38": [119, 16, 0],
  "39": [114, 14, 0],
  "40": [107, 11, 0],
  "41": [103, 11, 0],
  "42": [96, 7, 0],
  "43": [92, 4, 0],
  "44": [86, 2, 0],
  "45": [81, 0, 0],
  "46": [78, 0, 0],
  "47": [75, 0, 0],
  "48": [72, 0, 0],
  "49": [70, 0, 0],
  "50": [68, 0, 0],
  "51": [68, 0, 0],
  "52": [66, 0, 0],
  "53": [66, 0, 0],
  "54": [66, 0, 0],
  "55": [65, 0, 0],
  "56": [65, 0, 0],
  "57": [65, 0, 0],
  "58": [64, 0, 0],
  "59": [64, 0, 0],
  "60": [64, 0, 0],
  "61": [63, 0, 0],
  "62": [63, 0, 0],
  "63": [63, 0, 0],
  "64": [62, 0, 0],
  "65": [62, 0, 0],
  "66": [62, 0, 0],
  "67": [61, 0, 0],
  "68": [61, 0, 0],
  "69": [61, 0, 0],
  "70": [61, 0, 0],
  "71": [60, 0, 0],
  "72": [60, 0, 0],
  "73": [59, 0, 0],
  "74": [59, 0, 0],
  "75": [58, 0, 0],
  "76": [58, 0, 0],
  "77": [57, 0, 0],
  "78": [57, 0, 0],
  "79": [56, 0, 0],
  "80": [56, 0, 0],
  "81": [56, 0, 0],
  "82": [56, 0, 0],
  "83": [55, 0, 0],
  "84": [55, 0, 0],
  "85": [55, 0, 0],
  "86": [55, 0, 0],
  "87": [54, 0, 0],
  "88": [54, 0, 0],
  "89": [54, 0, 0],
  "90": [54, 0, 0],
  "91": [53, 0, 0],
  "92": [53, 0, 0],
  "93": [53, 0, 0],
  "94": [52, 0, 0],
  "95": [52, 0, 0],
  "96": [52, 0, 0],
  "97": [51, 0, 0],
  "98": [51, 0, 0],
  "99": [51, 0, 0],
  "100": [50, 0, 0],
  "101": [50, 0, 0],
  "102": [49, 0, 0],
  "103": [49, 0, 0],
  "104": [49, 0, 0],
  "105": [48, 0, 0],
  "106": [48, 0, 0],
  "107": [48, 0, 0],
  "108": [47, 0, 0],
  "109": [47, 0, 0],
  "110": [46, 0, 0],
  "111": [46, 0, 0],
  "112": [45, 0, 0],
};

const srmHexMap = {
  "1": "#FFE699",
  "2": "#FFD878",
  "3": "#FFCA5A",
  "4": "#FFBF42",
  "5": "#FBB123",
  "6": "#F8A600",
  "7": "#F39C00",
  "8": "#EA8F00",
  "9": "#E58500",
  "10": "#DE7C00",
  "11": "#D77200",
  "12": "#CF6900",
  "13": "#CB6200",
  "14": "#C35900",
  "15": "#BB5100",
  "16": "#B54C00",
  "17": "#B04500",
  "18": "#A63E00",
  "19": "#A13700",
  "20": "#9B3200",
  "21": "#952D00",
  "22": "#8E2900",
  "23": "#882300",
  "24": "#821E00",
  "25": "#7B1A00",
  "26": "#771900",
  "27": "#701400",
  "28": "#6A0E00",
  "29": "#660D00",
  "30": "#5E0B00",
  "31": "#5A0A02",
  "32": "#600903",
  "33": "#520907",
  "34": "#4C0505",
  "35": "#470606",
  "36": "#440607",
  "37": "#3F0708",
  "38": "#3B0607",
  "39": "#3A070B",
  "40": "#36080A",
};

// const srmHexMap = {
//   "1": "#FFE699",
//   "2": "#FFD878",
//   "3": "#FFCA5A",
//   "4": "#FFBF42",
//   "5": "#FBB123",
//   "6": "#F8A600",
//   "7": "#F39C00",
//   "8": "#EA8F00",
//   "9": "#E58500",
//   "10": "#DE7C00",
//   "11": "#D77200",
//   "12": "#CF6900",
//   "13": "#CB6200",
//   "14": "#C35900",
//   "15": "#BB5100",
//   "16": "#B54C00",
//   "17": "#B04500",
//   "18": "#A63E00",
//   "19": "#A13700",
//   "20": "#9B3200",
//   "21": "#952D00",
//   "22": "#8E2900",
//   "23": "#882300",
//   "24": "#821E00",
//   "25": "#7B1A00",
//   "26": "#771900",
//   "27": "#701400",
//   "28": "#6A0E00",
//   "29": "#660D00",
//   "30": "#5E0B00",
//   "31": "#5A0A02",
//   "32": "#600903",
//   "33": "#520907",
//   "34": "#4C0505",
//   "35": "#470606",
//   "36": "#440607",
//   "37": "#3F0708",
//   "38": "#3B0607",
//   "39": "#3A070B",
//   "40": "#36080A",
// };
