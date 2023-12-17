import { Code, Text } from '@geist-ui/core';

export const HowToBlock = () => {
  return (
    <>
      <Text h2>Custom File</Text>
      <Text my={0} mb={1}>
        1. Please upload a <Code>*.json</Code> which follows stritcly the format
        below. Everything else will break the application and you will have to
        clear your local storage
      </Text>
      <Code block my={0} name="Required type of json" mb={1}>
        type NodeItem = &#123; &#10; id: NodeID; &#10; filePath: string; &#10;
        methodName: string; &#10; startLine: string; &#10; endLine: string;
        &#10; methodLOC: string; &#10; &#125; &#10; ProjectData = &#123;&#10;
        projectName: string | undefined;&#10; projectLOC: string | number |
        undefined;&#10; duplicatedLines: string | number | undefined;&#10;
        cloneType: string | number | undefined; &#10; duplicatedLinePercentage:
        string | number | undefined;&#10; numberOfCloneClasses: number | string
        | undefined;&#10; biggestCloneLOC: number | string | undefined;&#10;
        biggestCloneClass: number | string | undefined;&#10; massThreshold:
        string;&#10; similarityThreshold: string;&#10; clonePairs:
        NodeItem[];&#10; &#125;
      </Code>
      <Text mb={1}>
        2. Wait until the <i>Current File you are working with:</i>...appears.
      </Text>
    </>
  );
};
