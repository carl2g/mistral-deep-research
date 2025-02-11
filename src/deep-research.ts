import { BraveSearch } from "../services/brave_search";
import { askChat } from "../services/chat";
import { FirecrawlSearch } from "../services/firecrawl";

export async function deepResearch({prompt, depth, breadth,  all_learnings, visited_url}: {
    prompt: string,
    breadth: number,
    depth: number,
    all_learnings: string[],
    visited_url: string[]
}) {
    console.log(prompt)
    var mistral_gse_query = await askChat({prompt: `- Make the <prompt> ready to past query for Brave search engine.
        - Give only the best proposition
        - Remove unnecessary text, balise, comment and carriage return and apostrophe.
        - <prompt>${prompt}</prompt>"`})

    if (mistral_gse_query) {
        console.log('Brave search: ', mistral_gse_query)
        let search_endpoint = 'https://api.search.brave.com/res/v1/web/search'
        let search_url = `${search_endpoint}?q=${encodeURIComponent(mistral_gse_query)}&count=${breadth}`

        const data = await BraveSearch({search_url})

        if (data.web == undefined) {
            return all_learnings
        }

        for(const result of data.web.results) {
            const url_source = result.url
            console.log('Links visitied: ', url_source)
            const serp_result = await FirecrawlSearch({url: url_source})

            if (serp_result && serp_result.markdown) {
                for (let serp_res of serp_result.markdown.replace(/.{60 000}\S*\s+/g, "$&~").split(/\s+~/)) {
                    const learnings = await askChat({prompt: `
                        - Given the following contents from a SERP search for the query <query>${mistral_gse_query}</query>, generate a list of learnings from the contents. Return a maximum of 20 learnings, but feel free to return less if the contents are clear. Make sure each learning is unique and not similar to each other. The learnings should be concise and to the point, as detailed and information dense as possible. Make sure to include any entities like people, places, companies, products, things, etc in the learnings, as well as any exact metrics, numbers, or dates. The learnings will be used to research the topic further.\n\n<contents>${serp_res}</content>
                        - Previous leanrings <learnings>${all_learnings}</learnings> 
                        `
                    })
                    if (learnings ) {
                        all_learnings.push(learnings)
                    }
                }
            }

            const more_search = await askChat({prompt: `
                - Given the original user prompt <prompt>${prompt}</prompt> and accumulated learnings is there any question that could help you make a better final report ?
                - Give only the most relevant topic / question you want to learn on
                - Make the sentense like it was a search engine query
                - Leanrings <learnings>${all_learnings}</learnings> 
                `
            })

            if (depth > 0 && more_search) {
                const new_depth = depth - 1
                all_learnings.concat(
                    await deepResearch({prompt: more_search, breadth, depth: new_depth, all_learnings, visited_url })
                )
            }
            
        }
    }
    return all_learnings;
}

var prompt = "What is the best french LLM ?"

const all_learnings = await deepResearch({prompt, depth: 2, breadth: 2,  all_learnings: [], visited_url: []})

const finale_report = await askChat({prompt: `
    - Given the original user prompt <user_prompt>${prompt}</user_prompt> and accumulated learnings make a detailed and elaborate final report
    - Leanrings <learnings>${all_learnings}</learnings> 
    `
})

console.log('='.repeat(300))
console.log(finale_report);
