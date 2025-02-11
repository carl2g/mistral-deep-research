# Description
This repo is only a playground to test custom deeep-reaserch with Mistral models.
This is inspired by https://github.com/dzhng/deep-research.

What do yo need to make it work ?
- Docker
- API KEYS:
  - Brave API key [subscription PRO](https://api-dashboard.search.brave.com/app/subscriptions/subscribe)
  - Firecrawls API key [subscription free plan](https://www.firecrawl.dev/pricing)
  - Mistral API key

# Variable to set 
- Put the API keys in .env, set mistral model, then change .env.template to .env.local
- Change prompt -> [here](https://github.com/carl2g/mistral-deep-research/blob/master/src/deep-research.ts#L67)
- Set depth / breadth search -> [here](https://github.com/carl2g/mistral-deep-research/blob/master/src/deep-research.ts#L69)
  - Expected number of visited linnks: depth * breadth

# Launch 

```bash
docker compose up --build
```
