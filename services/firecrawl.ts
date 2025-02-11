import FirecrawlApp, { CrawlParams, CrawlStatusResponse, ScrapeResponse } from '@mendable/firecrawl-js';



export async function FirecrawlSearch({url}: { url: string }) : Promise<ScrapeResponse<any, never> | undefined> {
    const app = new FirecrawlApp({apiKey: process.env.FIRECRAWL_API_KEY});

    // Scrape a website
    try {

      const scrapeResponse = await app.scrapeUrl(url, {
        formats: ['markdown'],
      });
      
      if (!scrapeResponse.success) {
        throw new Error(`Failed to scrape: ${scrapeResponse.error}`)
      }    
  
      return (scrapeResponse);
    } catch(e) {

    }

    return undefined
}
