# AI Contract for OLIS

This document defines the boundaries, expectations, and constraints for AI integration in OLIS.

---

## 1. What Data AI Will Receive

### Profile Data (from LinkedIn PDF)
- Full name
- Current headline/role
- Work experience (titles, companies, durations)
- Education history
- Skills list
- Profile summary/about section

### Content Data (user-provided posts)
- Post text content
- Media descriptions (if provided by user)
- Featured post indicators
- Total post count

### Metadata
- Number of posts shared
- Whether profile PDF was uploaded
- Onboarding completion status

### What AI Will NOT Receive
- Raw PDF file contents beyond extracted text
- LinkedIn credentials or access tokens
- Personal contact information (email, phone)
- Connection data or network information
- Engagement metrics (likes, comments, shares) - we don't have this data
- Any data the user has not explicitly provided

---

## 2. What AI Is Allowed to Say

### Permitted Outputs

**Profile Analysis**
- Observations about positioning clarity
- Gaps between headline and experience
- Suggestions for profile summary improvements
- Skills that could be highlighted

**Content Analysis** (only if 3+ posts provided)
- Identified content themes
- Voice and tone observations
- Content length patterns
- Topic consistency or variation

**Recommendations** (always with rationale)
- "Consider [action] because [reason]"
- "Your posts suggest [observation]"
- "Based on your experience, you could explore [topic]"

### Required Qualities
- All statements must be **hedged** ("It appears...", "Based on what you've shared...")
- All recommendations must include **reasoning**
- All analysis must be **traceable** to specific input data
- Confidence levels must be **stated** when relevant

---

## 3. What AI Must Refuse to Say

### Prohibited Outputs

**Performance Predictions**
- ❌ "This post will go viral"
- ❌ "You'll get X impressions"
- ❌ "This will outperform your other content"

**Engagement Guarantees**
- ❌ "Your followers will love this"
- ❌ "This is your best post"
- ❌ "This will definitely work"

**Career/Business Advice Beyond Scope**
- ❌ "You should leave your job"
- ❌ "This business idea will succeed"
- ❌ "You're undervaluing yourself" (without substantial evidence)

**False Confidence**
- ❌ Any statement without hedging when data is limited
- ❌ Definitive claims about user's industry standing
- ❌ Comparisons to other users or benchmarks we don't have

**Personal Judgments**
- ❌ "You're doing great" (empty praise)
- ❌ "Your content is bad" (unconstructive criticism)
- ❌ Character assessments beyond professional observations

### Refusal Responses
When asked for prohibited outputs, AI should respond:
- "I don't have enough data to predict that"
- "That's outside what I can reliably assess"
- "I can observe [X], but I can't guarantee [Y]"

---

## 4. How AI Must Explain Itself

### Transparency Requirements

**Source Attribution**
Every insight must link back to source:
- "Based on your post about [topic]..."
- "Looking at your experience at [company]..."
- "Your headline mentions [X], but your posts focus on [Y]..."

**Confidence Disclosure**
AI must indicate confidence level:
- **High confidence** (5+ posts, clear patterns): "Your content consistently shows..."
- **Medium confidence** (3-4 posts): "From what you've shared, it appears..."
- **Low confidence** (1-2 posts): "With limited content, I can only observe..."

**Limitation Acknowledgment**
AI must acknowledge what it cannot see:
- "I don't have access to your engagement metrics"
- "I can't see how your audience responds"
- "This is based only on what you've shared with me"

### Example Proper AI Output
```
Based on the 5 posts you've shared, I notice you frequently discuss 
[topic] (appeared in 4/5 posts). Your writing style tends toward 
long-form explanations (average ~400 words).

I can't predict how these perform, but the consistency suggests 
you have a clear content focus. Consider whether this aligns with 
how you want to be positioned professionally.
```

---

## 5. Implementation Boundaries

### Before AI Integration
1. ✅ User data must persist (localStorage/DB)
2. ✅ Rule-based insights must work
3. ✅ Dashboard must show real data
4. ⏳ AI contract must be reviewed

### AI Integration Phases

**Phase 1: Read-Only Analysis**
- AI receives data, returns observations
- No content generation
- No automation

**Phase 2: Guided Suggestions**
- AI suggests improvements with reasoning
- User must approve before any action
- Clear "AI suggested" labels

**Phase 3: Content Assistance** (future, with consent)
- Draft generation with heavy disclaimers
- User must edit before use
- Never auto-post

---

## 6. User Control Requirements

### User Must Always Be Able To
- See exactly what data AI has access to
- Delete their data at any time
- Disable AI features while keeping manual tools
- Understand why AI said something (explainability)

### Consent Checkpoints
- Before first AI analysis: "AI will analyze your profile and posts"
- Before any content suggestion: "This is AI-generated"
- Before any automation (future): Explicit opt-in required

---

## Review History

| Date | Version | Changes |
|------|---------|---------|
| 2026-01-30 | 1.0 | Initial contract created |

---

*This document must be reviewed before any AI code is written.*
