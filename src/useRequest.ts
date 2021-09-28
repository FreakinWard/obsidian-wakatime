import * as packageJson from '../'

type Payload = {
    time: number,
    entity: string,
    type: string,
    project: string,
    is_write: boolean,
    lines: number,
    plugin: string,
}

export default function useRequest() {
    const apiFetch = async (url: string) => {
        const response = await fetch(url);
        const result = await response.json();

        return result;
    };

    const apiPost = async (url: string, payload: Payload) => {
        // const apiKey = '82bbc63a-9c48-417d-a17a-f179f8476bef' // wakatime
        const apiKey = 'c72569d9-a205-4c34-90a4-371b94f5c61d' // wakapi

        const encodedUrl = encodeURIComponent(url);
        const corsedUrl = `https://api.allorigins.win/post?url=${encodedUrl}`;
        // const response = await fetch(corsedUrl, {
        console.log('test', 'btoa', btoa(apiKey));
        console.log('test','stringify', JSON.stringify(payload))
        const response = await fetch(url, {
            method: 'POST',
            mode: "no-cors",
            // referrerPolicy: "origin-when-cross-origin",
            referrerPolicy: 'no-referrer',
            headers: {
                // 'Content-Type': 'application/json',
                // 'Authorization': 'Basic '+btoa(apiKey),
                'Authorization': 'Basic ODJiYmM2M2EtOWM0OC00MTdkLWExN2EtZjE3OWY4NDc2YmVm',
            },
            credentials: 'include', // include, *same-origin, omit
            body: JSON.stringify(payload) // body data type must match "Content-Type" header
            // mode: 'cors', // no-cors, *cors, same-origin
            // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'include', // include, *same-origin, omit
            // headers: {
            //     'Content-Type': 'application/json'
            //     // 'Content-Type': 'application/x-www-form-urlencoded',
            // },
            // redirect: 'follow', // manual, *follow, error
            // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        });
        console.log('test',{response})
        const responseJson = await response.json();

        return responseJson;
    };

    return {apiFetch, apiPost};
}
