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
  id: NodeID;
  filePath: string;
  methodName: string;
  startLine: string;
  endLine: string;
};

export type ProjectData = {
  projectName: string | undefined;
  projectLOC: string | number | undefined;
  duplicatedLines: string | number | undefined;
  duplicatedLinePercentage: string | number | undefined;
  numberOfCloneClasses: number | string | undefined;
  biggestCloneLocation: string | undefined;
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
  number,
  number
];

type DependencyWheelNode = {
  nodeWidth: number;
  name: string;
  id: string;
  linesOfCode: number;
};
export type CloneDependencyWheelSeries = {
  nodes?: DependencyWheelNode[] | undefined;
  keys: string[];
  data: DependencyWheelDataPoint[];
};

export const prepareDataForDepWheel = (
  data: ProjectData
): CloneDependencyWheelSeries => {
  if (data == undefined) return;
  const nodeConnections: DependencyWheelDataPoint[] = [];
  if (data.clonePairs == undefined) return;
  data.clonePairs.map((elem) => {
    nodeConnections.push([
      elem[0].filePath,
      `${elem[0].startLine}-${elem[0].endLine}`,
      elem[1].filePath,
      `${elem[1].startLine}-${elem[1].endLine}`,
      Number(elem[0].endLine) - Number(elem[0].startLine),
      Number(elem[0].endLine) - Number(elem[0].startLine)
    ]);
  });

  const preparedData = {
    keys: ['from', 'fromLines', 'to', 'toLines', 'weight', 'linesOfCode'],
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
      property: 'Biggest Clone Location',
      value: !isProjectDataSet ? 'n/a' : projectData.biggestCloneLocation
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
        value: Number(elem.endLine) - Number(elem.startLine),
        startLine: elem.startLine,
        endLine: elem.endLine,
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
