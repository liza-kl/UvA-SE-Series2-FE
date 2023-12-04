enum CloneTypes {
  TYPE_1 = 'Type 1',
  TYPE_2 = 'Type 2',
  TYPE_3 = 'Type 3'
}
export const CloneTypeColor: Map<CloneTypes, string> = new Map([
  [CloneTypes.TYPE_1, 'orange'],
  [CloneTypes.TYPE_2, 'red'],
  [CloneTypes.TYPE_3, 'green']
]);

type NodeID = string;

type NodeItem = {
  [x: string]: any;
  id: NodeID;
  filePath: string;
  methodName: string;
  startLine: string;
  endLine: string;
  methodLOC: string;
  base64Content: string;
};

export type ProjectData = {
  projectName: string | undefined;
  projectLOC: string | number | undefined;
  duplicatedLines: string | number | undefined;
  duplicatedLinePercentage: string | number | undefined;
  numberOfCloneClasses: number | string | undefined;
  biggestCloneLOC: number | string | undefined;
  biggestCloneClass: number | string | undefined;
  massThreshold: string;
  similarityThreshold: string;
  clonePairs: NodeItem[];
};

export const parseProjectData = (jsonFile): ProjectData => {
  let obj = JSON.parse(jsonFile);
  return { ...obj };
};

type DependencyWheelDataPoint = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  number,
  number
];

type DependencyWheelNode = {
  nodeWidth: number;
  name: string;
  id: string;
  linesOfCode: number;
  parent: string;
};
export type CloneDependencyWheelSeries = {
  nodes?: DependencyWheelNode[] | undefined;
  keys: string[];
  data: DependencyWheelDataPoint[];
};

function getAllTwoElementTuples(arr) {
  return arr.flatMap((value, index) =>
    arr.slice(index + 1).map((innerValue) => [value, innerValue])
  );
}

function extractKeyValues(array, key) {
  return array.map((obj) => obj[key]);
}

export const prepareDataForDepWheel = (
  data: ProjectData
): CloneDependencyWheelSeries => {
  if (data == undefined) return;
  const nodeConnections: DependencyWheelDataPoint[] = [];
  if (data.clonePairs == undefined) return;
  data.clonePairs.map((elem) => {
    const keyValues = extractKeyValues(elem, 'id');
    const possiblePairs = getAllTwoElementTuples(keyValues);

    possiblePairs.map((possiblePair) => {
      const firstElem = elem.find((clone) => clone.id == possiblePair[0]);
      const secondElem = elem.find((clone) => clone.id == possiblePair[1]);

      nodeConnections.push([
        firstElem.filePath,
        `${secondElem.startLine}`,
        `${firstElem.startLine}-${firstElem.endLine}`,
        atob(firstElem.base64Content),
        secondElem.filePath,
        `${secondElem.startLine}`,
        `${secondElem.startLine}-${secondElem.endLine}`,
        atob(secondElem.base64Content),
        Number(firstElem.endLine) - Number(firstElem.startLine),
        Number(firstElem.endLine) - Number(firstElem.startLine)
      ]);
    });
  });

  const preparedData = {
    keys: [
      'from',
      'fromLine',
      'fromLines',
      'fromClone',
      'to',
      'toLine',
      'toLines',
      'toClone',
      'weight',
      'linesOfCode'
    ],
    data: nodeConnections
  };
  return preparedData;
};

export const getProjectOverviewData = (
  projectData: ProjectData,
  isProjectDataSet: boolean
) => {
  return [
    {
      property: 'Project Name',
      value: !isProjectDataSet ? 'n/a' : projectData.projectName,
      description: ''
    },
    {
      property: 'Mass Threshold',
      value: !isProjectDataSet ? 'n/a' : projectData.massThreshold
    },
    {
      property: 'Similiraty Threshold',
      value: !isProjectDataSet ? 'n/a' : projectData.similarityThreshold
    },
    {
      property: 'Number of Lines',
      value: !isProjectDataSet ? 'n/a' : projectData.projectLOC
    },
    {
      property: 'Duplicated Lines ',
      value: !isProjectDataSet ? 'n/a' : projectData.duplicatedLines
    },
    {
      property: 'Duplicated Lines (in %)',
      value: !isProjectDataSet ? 'n/a' : projectData.duplicatedLinePercentage
    },
    {
      property: 'Number of clone classes',
      value: !isProjectDataSet ? 'n/a' : projectData.numberOfCloneClasses
    },
    {
      property: 'Biggest Clone (in Lines)',
      value: !isProjectDataSet ? 'n/a' : projectData.biggestCloneLOC
    },
    {
      property: 'Biggest Clone Class (in Members)',
      value: !isProjectDataSet ? 'n/a' : projectData.biggestCloneClass
    }
  ];
};

export const getPackedBubbleData = (data: ProjectData) => {
  if (data == null) return;
  const flattenedNodes = data.clonePairs.flat();

  const locationBuckets: Map<string, any[]> = new Map();
  flattenedNodes.map((elem) => {
    let lastIndex = elem.filePath.lastIndexOf('/');
    let result = elem.filePath;
    let methodName = elem.methodName.split('/');

    if (locationBuckets.has(result)) {
      locationBuckets.get(result).push({
        name: methodName[methodName.length - 1],
        filePath: elem.filePath,
        value: elem.methodLOC,
        startLine: elem.startLine,
        endLine: elem.endLine,
        methodLOC: elem.methodLOC,
        loc: elem.filePath
      });
    } else {
      locationBuckets.set(result, [elem]);
    }
  });

  const directory = [];

  const directoryNodes = () => {
    locationBuckets.forEach((value, key, map) => {
      directory.push({
        name: key,
        data: value
      });
    });
  };

  // Call the function to populate the directory array
  directoryNodes();

  return directory;
};
