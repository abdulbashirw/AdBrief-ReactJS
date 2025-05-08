import type { ChatCompletionOutput } from '@huggingface/tasks'
import Engine from './engine'

class ResponseEngine {
  output: ChatCompletionOutput | undefined
  context: Engine
  constructor(context: Engine, output: ChatCompletionOutput | undefined) {
    this.output = output
    this.context = context
    this.context.setAssistantMessage(this.getResponse() || '')
  }

  toJson(): string {
    return JSON.stringify(this.getResponse())
  }

  parseTextOutputToJson(): any {
    const content = this.getResponse()
    if (!content) return null

    // Find JSON content between ```json and ``` markers
    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/)

    if (jsonMatch && jsonMatch[1]) {
      try {
        // Parse the extracted JSON string
        return JSON.parse(jsonMatch[1].trim())
      } catch (e) {
        return null
      }
    }

    try {
      return JSON.parse(content)
    } catch (e) {
      return null
    }
  }

  parseTextOutputToPython(): string | null {
    const content = this.getResponse()
    if (!content) return null
    const pythonMatch = content.match(/```python\n([\s\S]*?)\n```/)

    if (pythonMatch && pythonMatch[1]) {
      return pythonMatch[1].trim()
    }

    return null
  }

  parseTextOutputToJavaScript(): string | null {
    const content = this.getResponse()
    if (!content) return null
    const jsMatch = content.match(/```(javascript|js)\n([\s\S]*?)\n```/)

    if (jsMatch && jsMatch[2]) {
      return jsMatch[2].trim()
    }

    return null
  }

  parseTextOutputToCode(): string | null {
    const content = this.getResponse()
    if (!content) return null
    const codeMatch = content.match(/```([^\n]*)([\s\S]*?)```/)

    if (codeMatch && codeMatch[2]) {
      return codeMatch[2].trim()
    }

    return null
  }

  getResponse(): string | undefined {
    return this.output?.choices[0].message?.content
  }
}

export default ResponseEngine
