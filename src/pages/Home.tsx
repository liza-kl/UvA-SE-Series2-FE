import { Page, Tabs, Text, useToasts } from '@geist-ui/core';
import { useEffect, useState } from 'react';
import { CircleViewChart } from '../components/CircleViewChart';
import { DependencyWheelChart } from '../components/DependencyWheelChart';
import { FileHandling } from '../components/FileHandling';
import { NoFileUploaded } from '../components/NoFileUploaded';
import { TableViewChart } from '../components/TableViewChart';
import {
  circledata,
  CloneDependencyWheelSeries,
  getProjectOverviewData,
  parseProjectData,
  prepareDataForDepWheel,
  ProjectData
} from '../components/util';

export const Home = () => {
  const { setToast } = useToasts();
  const [isFilePresent, setIsFilePresent] = useState(false);
  const [circleData, setCircleData] = useState();
  const [depWheelData, setDepWheelData] =
    useState<CloneDependencyWheelSeries | null>(null);
  const [projectData, setProjectData] = useState<ProjectData | null>(null);

  useEffect(() => {
    setIsFilePresent(localStorage.getItem('currentFile') != null);
    setProjectData(parseProjectData(localStorage.getItem('currentFile')));
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
    if (!isFilePresent) {
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

  const isProjectDataSet =
    projectData != undefined && Object.keys(projectData).length > 0;

  return (
    <Page>
      <Text h1>Clone Visualization</Text>
      <Tabs initialValue="1">
        <Tabs.Item label="Upload File To Evaluate" value="1">
          <FileHandling
            onUpload={handleResultUpload}
            onReset={handleResetOfCloneResults}
            resetLabel="Reset Current File"
          />
        </Tabs.Item>
        <Tabs.Item label="Circle Visualization" value="2">
          {/*@ts-ignore */}
          {isFilePresent ? (
            <CircleViewChart data={circledata} />
          ) : (
            <NoFileUploaded />
          )}
        </Tabs.Item>
        <Tabs.Item label="Dependency Wheel Visualization" value="3">
          {isFilePresent ? (
            <DependencyWheelChart data={prepareDataForDepWheel(projectData)} />
          ) : (
            <NoFileUploaded />
          )}
        </Tabs.Item>
        <Tabs.Item label="Table Visualization" value="4">
          {isFilePresent ? (
            <TableViewChart
              data={getProjectOverviewData(projectData, isProjectDataSet)}
            />
          ) : (
            <NoFileUploaded />
          )}
        </Tabs.Item>
      </Tabs>
    </Page>
  );
};
