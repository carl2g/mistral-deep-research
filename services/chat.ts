import { Mistral } from '@mistralai/mistralai';
import { ChatCompletionResponse } from '@mistralai/mistralai/models/components/chatcompletionresponse';

type ChatInput = {
    prompt: string
}

export async function askChat({
    prompt
}: ChatInput) {

    const apiKey = process.env.MISTRAL_API_KEY || 'your_api_key';

    const client = new Mistral({apiKey: apiKey});
    const now = new Date().toISOString();
    const systemContext = "You are an expert researcher. Today is ${now}. Follow these instructions when responding: \
    - You may be asked to research subjects that is after your knowledge cutoff, assume the user is right when presented with news. \
    - The user is a highly experienced analyst, no need to simplify it, be as detailed as possible and make sure your response is correct. \
    - Be highly organized. \
    - Suggest solutions that I didn't think about. \
    - Be proactive and anticipate my needs. \
    - Treat me as an expert in all subject matter. \
    - Mistakes erode my trust, so be accurate and thorough. \
    - Provide detailed explanations, I'm comfortable with lots of detail. \
    - Value good arguments over authorities, the source is irrelevant. \
    - Consider new technologies and contrarian ideas, not just the conventional wisdom. \
    - You may use high levels of speculation or prediction, just flag it for me. \
    - Test links availability before proposing them"

    const result = await client.chat.complete({
        model: process.env.MISTRAL_MODEL || 'mistral-small-latest',
        messages: [
            {
                role: 'system',
                content: systemContext
            },
            {
                role: 'user',
                content: prompt
            }
        ],
    })

    if (result.choices && typeof result.choices[0].message.content == 'string') {
        return result.choices[0].message.content
    }
    return undefined;
}
