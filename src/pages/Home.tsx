import { Page, Tabs, Text, useToasts } from '@geist-ui/core';
import { CircleViewChart } from '../components/CircleViewChart';
import { DependencyWheelChart } from '../components/DependencyWheelChart';
import { FileHandling } from '../components/FileHandling';
import { TableViewChart } from '../components/TableViewChart';

export const Home = () => {
  const { setToast } = useToasts();

  const projectTableView = [
    {
      property: 'Project Name',
      value: 'smallsql',
      description: 'Content type'
    },
    {
      property: 'Duplicated Lines',
      value: 59
    },
    {
      property: 'Amount of clone clases',
      value: 12
    }
  ];

  type CircleDataPoint = {
    name: string;
    filePath: string;
    endLine: string;
    cloneType: string;
    linesOfCode: number;
  };

  type CircleDataSeries = {
    name: string;
    data: CircleDataPoint[];
  };

  const circledata = [
    {
      name: 'root',
      data: [
        {
          name: 'draw',
          filePath: '/root',
          startLine: '100',
          endLine: '102',
          cloneType: '1',
          value: 2
        },
        {
          name: 'Croatia',
          value: 20.7
        },
        {
          name: 'Belgium',
          value: 97.2
        }
      ]
    },
    {
      linkedTo: ':previous',
      name: 'public',
      data: [
        {
          name: 'draw',
          filePath: '/public',
          startLine: '100',
          endLine: '102',
          cloneType: '1',
          value: 2
        },
        {
          name: 'Cameroon',
          value: 9.2
        },
        {
          name: 'Zimbabwe',
          value: 13.1
        },
        {
          name: 'Ghana',
          value: 14.1
        },
        {
          name: 'Kenya',
          value: 14.1
        },
        {
          name: 'Sudan',
          value: 17.3
        },
        {
          name: 'Tunisia',
          value: 24.3
        },
        {
          name: 'Angola',
          value: 25
        },
        {
          name: 'Libya',
          value: 50.6
        },
        {
          name: 'Ivory Coast',
          value: 7.3
        },
        {
          name: 'Morocco',
          value: 60.7
        },
        {
          name: 'Ethiopia',
          value: 8.9
        },
        {
          name: 'United Republic of Tanzania',
          value: 9.1
        },
        {
          name: 'Nigeria',
          value: 93.9
        },
        {
          name: 'South Africa',
          value: 392.7
        },
        {
          name: 'Egypt',
          value: 225.1
        },
        {
          name: 'Algeria',
          value: 141.5
        }
      ]
    }
  ];

  const handleResultUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    /* @ts-ignore */
    fileReader.readAsText(event.target.files[0], 'UTF-8');
    fileReader.onload = (event) => {
      /* @ts-ignore */
      localStorage.setItem('currentFile', event.target.result);
    };
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
          <CircleViewChart data={circledata} />
        </Tabs.Item>
        <Tabs.Item label="Dependency Wheel Visualization" value="3">
          <DependencyWheelChart />
        </Tabs.Item>
        <Tabs.Item label="Table Visualization" value="4">
          <TableViewChart data={projectTableView} />
        </Tabs.Item>
      </Tabs>
    </Page>
  );
};
