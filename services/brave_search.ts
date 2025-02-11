
type BraveSearchResult = {
    web: {
        results: {
            url: string
            description: string
            title: string
        }[]
    }
}

type BraveSearchParams = {
    search_url : string
}

export async function BraveSearch({
    search_url
} : BraveSearchParams) : Promise<BraveSearchResult> {
    const response = await fetch(search_url, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip',
            'X-Subscription-Token': (process.env.BRAVE_SEARCH_ENGINE_API_KEY || "")
        }
    });

    const data: BraveSearchResult = (await response.json()) as BraveSearchResult;
    return (data);
}
