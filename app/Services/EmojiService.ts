import axios from 'axios'

export default class EmojiService {
  public async loadEmoji() {
    try {
      const response = await axios.get(
        'https://emoji-api.com/emojis?access_key=7772f58eb14b5094ce2043265069269e29db375b'
      )

      return response.data
    } catch (error) {
      throw new Error(`Erro ao fazer a chamada à API: ${error.message}`)
    }
  }
}
