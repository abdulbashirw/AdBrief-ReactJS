import { HfInference } from "@huggingface/inference";
import ResponseEngine from "./response";
const client = new HfInference("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");

interface ChatCompletionRequest {
    model: string;
    messages: { role: string; content: string }[];
    max_tokens: number;
    temperature: number;
    seed: number;
}

class DefaultChatConfig implements ChatCompletionRequest {
    // model: string = "meta-llama/Llama-3.3-70B-Instruct";
	model: string = "Qwen/Qwen2.5-Coder-32B-Instruct";
    messages: { role: string; content: string }[] = [];
    max_tokens: number = 32768 / 2;
    temperature: number = 0.5;
    seed: number = 0;
}

class Engine {
    messages: { role: string; content: string }[] = [];
    max_tokens: number = 32000;
    temperature: number = 0.5;
    seed: number = 0;
    defaultConfig: ChatCompletionRequest = new DefaultChatConfig();

    constructor() {
        this.messages = [];
    }

    setMessages(messages: { role: string; content: string }[]) {
        this.messages = messages;
    }

    addMessage(role: string, content: string) {
        this.messages.push({ role, content });
    }

    setSystemMessage(content: string) {
        this.addMessage("system", content)
    }

    setUserMessage(content: string) {
        this.addMessage("user", content)
    }

    setAssistantMessage(content: string) {
        this.addMessage("assistant", content)
    }

    setMaxTokens(max_tokens: number) {
        this.max_tokens = max_tokens;
    }

    setTemperature(temperature: number) {
        this.temperature = temperature;
    }

    setSeed(seed: number) {
        this.seed = seed;
    }

    buildMessages(): { role: string; content: string }[] {
        return this.messages;
    }

    clearMessage() {
        this.messages = this.messages.filter((message) => message.role === "system");
    }

    async prompt(ask: string): Promise<ResponseEngine> {
        this.setUserMessage(ask);
        const finalConfig = this.defaultConfig;
        const result = await client.chatCompletion({
            model: finalConfig.model,
            messages: this.messages,
            max_tokens: finalConfig.max_tokens,
            temperature: finalConfig.temperature,
            seed: finalConfig.seed
        });
        return new ResponseEngine(this, result);
    }
}

export { Engine };
export default Engine;
