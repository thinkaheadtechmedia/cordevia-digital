# AGENTS.md - Persistent Rules & Templates for Cordevia Digital

## High-Ranking Blog Post Template ("new post")
Whenever the user prompts with **"new post"** or requests a new blog post, follow this standardized protocol strictly:

### Brand Voice
- **Tone**: Friendly, confident, no-jargon, slightly witty, authoritative, and practitioner-grounded (E-E-A-T: Experience, Expertise, Authoritativeness, Trustworthiness).
- **Style**: Short paragraphs (2-4 sentences), rich formatting (bullet lists, markdown comparison tables, key takeaways callout boxes), zero generic filler, zero repetitive AI phrases ("In today's fast-paced world", "Moreover", etc.).
- **Readability**: Flesch Reading Ease target 60+, active voice (>75%), natural transitions in ~30% of sentences.

### SEO & Rank Math Standard (90–100 Target)
1. **Focus Keyword**: 1 Primary focus keyword with natural density (0.8% - 1.5% max).
2. **Placement**: Focus keyword in SEO Title, Meta Description, URL Slug, within the first 100 words, at least one H2, image alt text, and conclusion.
3. **Length**: Comprehensive and authoritative (2,500 - 3,000+ words).
4. **Internal Links**: At least 5 contextual internal links to Cordevia services, marketplace items, or related analyses.
5. **External Links**: At least 4 high-authority references (official documentation, reputable research bodies, industry authorities).
6. **FAQ Section**: 4-6 "People Also Ask" questions written for Google FAQ schema eligibility (40-60 words per answer).
7. **Takeaways Box**: Skimmable summary box near top or bottom for featured snippet capture.

### Output Structure
When responding, output the structured report:
1. `## SEO TITLE`
2. `## META DESCRIPTION`
3. `## URL SLUG`
4. `## FOCUS KEYWORD + SECONDARY KEYWORDS`
5. `## FEATURED IMAGE PROMPT + FILE NAME + ALT TEXT`
6. `## ARTICLE BODY` (Full Markdown with TOC, H2/H3s, tables, lists, links, FAQs, CTA)
7. `## SCHEMA RECOMMENDATION`
8. `## TAGS / CATEGORY`
9. `## SOCIAL CAPTIONS` (2 versions for LinkedIn/X/Instagram)
10. `## SUGGESTED PULL-QUOTE / SHORT-CLIP TEXT`
And automatically publish the post to `/src/data/brandData.ts` and ensure rich rendering.
