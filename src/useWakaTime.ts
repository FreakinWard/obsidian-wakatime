import useRequest from "./useRequest";
// import packageJson from '../../../package.json';
import packageJson from '../package.json';

export default function useWakaTime() {
    const {apiPost} = useRequest();

    const fileSelected = async () => {
        // console.log('test', 'wakatime - fileSelected')
        await sendHeartBeat();
    };

    const fileModified = () => {
        console.log('test', 'wakatime - fileModified')
        sendHeartBeat();
    };

    const fileSaved = () => {
        console.log('test', 'wakatime - fileSaved')
    };

    const sendHeartBeat = async ()=> {
        const url = 'https://wakatime.com/api/v1/heartbeats';
        // const url = 'https://wakapi.dev/api/v1/heartbeat';
        const time = Date.now();
        const project = 'projectValue';
        const filePath = 'filePathValue';
        const isWrite = true;
        const lines = undefined; // lineCount

        const payload = {
                time: time/1000,
                entity: filePath,
                type: 'file',
                project,
                // language: language,
                is_write: isWrite,
                lines: lines,
                plugin: 'obsidian-wakatime/'+packageJson.version,
            };

        await apiPost(url,payload);
    }

    return {fileSelected, fileModified, fileSaved};
}
