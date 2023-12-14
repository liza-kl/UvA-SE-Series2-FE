import { Page, Tabs, Tag, Text, User, useToasts } from '@geist-ui/core';
import { useEffect, useState } from 'react';
import { DependencyWheelChart } from '../components/DependencyWheelChart';
import { FileHandling } from '../components/FileHandling';
import { HowToBlock } from '../components/HowToBlock';
import { NetworkGraph } from '../components/NetworkGraph';
import { NoFileUploaded } from '../components/NoFileUploaded';
import { RawCloneClassTable } from '../components/RawCloneClassTable';
import { SampleProjectButtons } from '../components/SampleProjectButtons';
import { SampleProjectElem } from '../components/SampleProjectButtons.types';
import { TableViewChart } from '../components/TableViewChart';
import {
  getDetailedCloneClasses,
  getPossibleConnections,
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

  const detailedCloneClass =
    isProjectDataSet && getDetailedCloneClasses(projectData);
  const depWheelData = isProjectDataSet && prepareDataForDepWheel(projectData);
  const networkData = isProjectDataSet && getPossibleConnections(projectData);

  const sampleProjectData: SampleProjectElem[] = [
    {
      sampleProjectLabel: 'Test Encyptor Project',
      sampleProjects: [
        {
          btnLabel: '1',
          btnAction: () => uploadPreset('sample_encryptor.json')
        }
      ]
    },
    {
      sampleProjectLabel: 'Small SQL Project',
      sampleProjects: [
        {
          btnLabel: '1',
          btnAction: () => uploadPreset('sample_encryptor.json')
        }
      ]
    },
    {
      sampleProjectLabel: 'HSQL Project',
      sampleProjects: [
        {
          btnLabel: '1',
          btnAction: () => uploadPreset('sample_hsql.json')
        }
      ]
    }
  ];
  return (
    <Page>
      <Text h1 style={{ marginLeft: '1rem', marginBottom: '1rem' }}>
        Clone Visualization
      </Text>
      <div style={{ marginLeft: '1rem', marginBottom: '1rem' }}>
        <Text span>Made with lots of ❤️, sleepless nights and pain by </Text>
        <User
          src="https://avatars.githubusercontent.com/u/61849425?v=4"
          name="Denis"
        >
          <User.Link href="https://github.com/D45Hub/">@D45Hub</User.Link>
        </User>
        <User
          src="https://avatars.githubusercontent.com/u/58568446?v=4"
          name="Lisa"
        >
          <User.Link href="https://github.com/liza-kl/">@liza-kl</User.Link>
        </User>
        <User src="/public/rocky.png" name="Rocky">
          <User.Link href="https://youtu.be/7c3_57CVIu8?si=Wv7aKv6JrbVEHZAP&t=25">
            @rocky
          </User.Link>
        </User>
      </div>
      <Tabs initialValue="1">
        <Tabs.Item label="Upload File To Evaluate" value="1">
          <div style={{ marginLeft: '1rem' }}>
            <HowToBlock></HowToBlock>
            {isProjectDataSet && (
              <Text>
                <Tag type="default" invert>
                  {' '}
                  Current File you are working with: {projectData.projectName}
                </Tag>
              </Text>
            )}
            <FileHandling
              onUpload={handleResultUpload}
              onReset={handleResetOfCloneResults}
              resetLabel="Reset Current File"
            />

            <SampleProjectButtons projects={sampleProjectData} />
          </div>
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
        <Tabs.Item label="Network Graph" value="3">
          {isProjectDataSet ? (
            <NetworkGraph data={networkData} />
          ) : (
            <NoFileUploaded />
          )}
        </Tabs.Item>
        <Tabs.Item label="Clone Class Table" value="4">
          {isProjectDataSet ? (
            <RawCloneClassTable cloneClasses={detailedCloneClass} />
          ) : (
            <NoFileUploaded />
          )}
        </Tabs.Item>

        <Tabs.Item label="Dependency Wheel Visualization" value="5">
          {isProjectDataSet ? (
            <DependencyWheelChart data={depWheelData} />
          ) : (
            <NoFileUploaded />
          )}
        </Tabs.Item>
      </Tabs>
    </Page>
  );
};
