# Proactive Tasks and Multimedia Delivery

AstrBot introduces a Proactive Agent system, enabling the bot to not only respond passively but also manage scheduled tasks and send multimedia content proactively.

## Scheduled Tasks (FutureTask)

The Main Agent can now manage a global **Cron Job List**, assigning tasks to its future self.

### Features
- **Self-Wakeup**: AstrBot automatically wakes up at the scheduled time to execute tasks.
- **Task Feedback**: After execution, AstrBot reports the results back to the task creator.
- **WebUI Management**: You can view, edit, or delete scheduled tasks in the "Cron Jobs" page of the WebUI.

### How to Use
The Main Agent has the ability to manage scheduled tasks. You can tell it:
- "Remind me to have a meeting at 8 AM tomorrow."
- "Summarize this week's work log every Friday at 5 PM."
- "Set a timer for 10 minutes."

The Main Agent will call built-in scheduling tools to arrange these plans.

### Supported Platforms
Scheduled tasks are currently supported on:
- Telegram
- OneBot (QQ)
- Slack
- Feishu (Lark)
- Discord
- Misskey
- Satori

## Multimedia Message Delivery

To facilitate the direct delivery of images, audio, video, and other files to users, AstrBot provides a default `send_message_to_user` tool.

### Features
- **Direct Delivery**: Agents can send generated or retrieved multimedia files directly to users without complex text conversions.
- **Multiple Formats**: Supports images, files, audio, video, etc.

### Use Cases
When an Agent needs to show you a chart, send a PDF report, or play an audio clip, it will automatically call this tool.

## Notes
- **Platform Limitations**: Multimedia delivery and proactive notifications are subject to the API limits of each messaging platform.
- **ChatUI Support**: ChatUI currently does not support proactive wakeup feedback; this feature will be added in a future version.
