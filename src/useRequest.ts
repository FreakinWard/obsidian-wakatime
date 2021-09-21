export default function useRequest() {
    const apiFetch = async (url: string) => {
        const response = await fetch(url);
        const result = await response.json();

        return result;
    };

    return {apiFetch};
}
