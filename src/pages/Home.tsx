import { Button, Page, Tabs, Text, useToasts } from '@geist-ui/core';
import { useEffect, useState } from 'react';
import { CircleViewChart } from '../components/CircleViewChart';
import { DependencyWheelChart } from '../components/DependencyWheelChart';
import { FileHandling } from '../components/FileHandling';
import { HowToBlock } from '../components/HowToBlock';
import { NoFileUploaded } from '../components/NoFileUploaded';
import { RawCloneClassTable } from '../components/RawCloneClassTable';
import { TableViewChart } from '../components/TableViewChart';
import {
  getDetailedCloneClasses,
  getPackedBubbleData,
  getProjectOverviewData,
  parseProjectData,
  prepareDataForDepWheel
} from '../components/util';
export const Home = () => {
  const { setToast } = useToasts();
  const [isFilePresent, setIsFilePresent] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('currentFile') != null) {
      setIsFilePresent(true);
    }
    setIsFilePresent(false);
  }, [isFilePresent]);

  const handleResultUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    fileReader.readAsText(event.target.files[0], 'UTF-8');
    fileReader.onload = (event) => {
      /* @ts-ignore */
      localStorage.setItem('currentFile', event.target.result);
    };
    setIsFilePresent(true);

    setToast({
      text: 'Successfully uploaded file ✨',
      delay: 2000
    });
    const formInput = document.querySelector('input[type=file]');
    /* @ts-ignore */
    formInput.value = null;
  };

  const handleResetOfCloneResults = () => {
    if (localStorage.getItem('currentFile') == null) {
      console.warn('No file to reset');
      setToast({ text: 'No File to reset', delay: 2000 });
      return;
    }
    localStorage.removeItem('currentFile');
    setToast({
      text: 'Reset current file, feel free to upload a new one ✨',
      delay: 2000
    });
  };

  const uploadPreset = (presetName: string) => {
    fetch(presetName)
      .then((response) => response.json())
      .then((json) =>
        localStorage.setItem('currentFile', JSON.stringify(json))
      );
    setIsFilePresent(true);
    setToast({
      text: `Set ${presetName} as project ✨`,
      delay: 2000
    });
  };

  const isProjectDataSet = localStorage.getItem('currentFile') != null;
  const projectData =
    isProjectDataSet && parseProjectData(localStorage.getItem('currentFile'));
  const detailedCloneClass = getDetailedCloneClasses(projectData);
  return (
    <Page>
      <Text h1>Clone Visualization</Text>

      <Tabs initialValue="1">
        <Tabs.Item label="Upload File To Evaluate" value="1">
          <>
            <HowToBlock></HowToBlock>
            {isProjectDataSet && (
              <Text>
                Current File you are working with: {projectData.projectName}
              </Text>
            )}
            <FileHandling
              onUpload={handleResultUpload}
              onReset={handleResetOfCloneResults}
              resetLabel="Reset Current File"
            />
            <Text>Or choose one of the sample projects below</Text>
            <Button onClick={() => uploadPreset('sample_encryptor.json')}>
              Test Project (Small Encryptor)
            </Button>
            <Button onClick={() => uploadPreset('sample_smallsql.json')}>
              Small SQL Project
            </Button>
            <Button onClick={() => uploadPreset('sample_hsql.json')}>
              HSQL Project
            </Button>
          </>
        </Tabs.Item>
        <Tabs.Item label="Project Overview" value="2">
          {isProjectDataSet ? (
            <TableViewChart
              data={getProjectOverviewData(projectData, isProjectDataSet)}
            />
          ) : (
            <NoFileUploaded />
          )}
        </Tabs.Item>
        <Tabs.Item label="Clone Class Table" value="3">
          {isProjectDataSet ? (
            <RawCloneClassTable cloneClasses={detailedCloneClass} />
          ) : (
            <NoFileUploaded />
          )}
        </Tabs.Item>

        <Tabs.Item label="Circle Visualization" value="4">
          {isProjectDataSet ? (
            <CircleViewChart data={getPackedBubbleData(projectData)} />
          ) : (
            <NoFileUploaded />
          )}
        </Tabs.Item>
        <Tabs.Item label="Dependency Wheel Visualization" value="5">
          {isProjectDataSet ? (
            <DependencyWheelChart data={prepareDataForDepWheel(projectData)} />
          ) : (
            <NoFileUploaded />
          )}
        </Tabs.Item>
      </Tabs>
    </Page>
  );
};
