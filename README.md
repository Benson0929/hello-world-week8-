## Week 8 | Moiré Time redesign — Hourly Generation Study

### 1. Design Intent

In the original Moiré Time, the lines changed shape with time. I found it hard to tell how much of the hour had passed just by looking at those changes. I wanted the lines to gradually build from sparse to dense so viewers could see time passing as the pattern formed.

I chose a one-hour cycle because a full day felt too long for a single viewing. An hour also has familiar milestones. At 15, 30, and 45 minutes past the hour, the generation progress is 25%, 50%, and 75%, respectively.

### 2. What Changed and What I Kept

I kept the original geometry and motion of the four modes: Fold, Capsule, Cross, and Wave. In the updated version, the time elapsed within the current hour determines how far the pattern has formed. If you open or refresh the site at 2:30 p.m., the pattern appears at 50% progress. At the top of the hour, a new cycle begins at 0% while the previous pattern fades out over two seconds.

The main site runs in real time. I also created a sped-up preview so viewers can watch a full cycle in about a minute or scrub through the timeline to see what happens around the hourly reset.

[View the sped-up preview](PREVIEW_URL)

### 3. My Design Decisions, Credits, and AI Contribution

I asked AI to review the original site with me and help me understand whether the changes in the four modes could be explained through a clear cycle. My first idea was to have the patterns start from zero at midnight, build over 24 hours, and reset the next midnight. After discussing both options, I chose a one-hour cycle so the lines would gradually build and start over at the top of the next hour.

- **Credits** — This revision builds on Moiré Time, my original Week 6 project. The visuals are drawn with p5.js.
- **AI contribution** — AI helped me review the original timing rules and compare the daily and hourly cycles. After I chose the hourly cycle, AI helped modify the website code so the lines build gradually and reset at the top of each hour. ChatGPT also helped organize this README.

### 4. Open Question

If I hide the Generation percentage, can someone seeing the piece for the first time tell which image is closer to the next hour, 2:15 p.m. or 2:45 p.m., based on line density alone?
