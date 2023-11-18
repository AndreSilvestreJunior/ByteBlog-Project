import axios from 'axios'

export default class ChatGPTService {
  public async generateSubtitle(text) {
    const apiKey = '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'

    const chatGPTResponse = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt: text,
        max_tokens: 50,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    )

    const subtitle = chatGPTResponse.data.choices[0].text.trim()

    return subtitle
  }
}
