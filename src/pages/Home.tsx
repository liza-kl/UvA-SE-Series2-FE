import { Page, Tabs, Text, useToasts } from '@geist-ui/core';
import { CircleViewChart } from '../components/CircleViewChart';
import { FileHandling } from '../components/FileHandling';
import { TableViewChart } from '../components/TableViewChart';

const Home = () => {
const { setToast } = useToasts();

const handleResultUpload = (event) => {
    const fileReader = new FileReader();
    fileReader.readAsText(event.target.files[0], "UTF-8");
    fileReader.onload = event => {
      localStorage.setItem("currentFile", event.target.result);
    };

}

const handleResetOfCloneResults = () => {
    if(localStorage.getItem("currentFile") == null) {
        console.warn("No file to reset");
        setToast({ text: 'No File to reset', delay: 2000 })
        return;
    }
    localStorage.removeItem("currentFile");
    setToast({ text: 'Reset current file, feel free to upload a new one ✨', delay: 2000 })
}


  return (
    <Page>
    <Text h1>Clone Visualization</Text>
    <Tabs initialValue="1">
        <Tabs.Item label="Upload File To Evaluate" value="1">
            <FileHandling onUpload={handleResultUpload} onReset={handleResetOfCloneResults} resetLabel="Reset Current File" />
        </Tabs.Item>
        <Tabs.Item label="Circle Visualization" value="2">
            <CircleViewChart/>
        </Tabs.Item>
        <Tabs.Item label="Table Visualization" value="3">
            <TableViewChart/>
        </Tabs.Item>
        </Tabs>
  </Page>
  )
}

export default Home