# Description
This repo is only a playground to test custom deeep-reaserch with Mistral models.
This is inspired by https://github.com/dzhng/deep-research.

# What do yo need to make it work ?
- Docker
- API KEYS:
  - Brave API key [subscription free plan](https://api-dashboard.search.brave.com/app/subscriptions/subscribe)
  - Firecrawls API key [subscription free plan](https://www.firecrawl.dev/pricing)
  - Mistral API key

# Config steps 
- In `.env.template`:
  - set the API keys
  - set mistral model
    - Try to aim a model with at least 131k context or mistral may throw to much token error
  - then rename file `.env.template` to `.env.local`
- Change prompt -> [here](https://github.com/carl2g/mistral-deep-research/blob/master/src/deep-research.ts#L67)
- Set depth / breadth search -> [here](https://github.com/carl2g/mistral-deep-research/blob/master/src/deep-research.ts#L69)
  - Expected number of visited linnks: (depth + 1) * breadth

# Launch 

```bash
docker compose up --build
```
