import AbstractAgent from "../agents/AbstractAgent";
import DefaultAgent from "../agents/DefaultAgent";
import { SystemPrompts } from "../config/config_agent";
import Engine from "./engine";

export default class Orchestrator {
    engine: Engine;
    agents: AbstractAgent[] = [];
    data: any = [];
    question: string = "";

    constructor() {
        this.engine = new Engine();
        this.engine.setSystemMessage(SystemPrompts.KNOWLEDGE);
    }

    setData(data: any) {
        this.data = data;
    }

    ask(question: string) {
        this.question = question;
        return this.engine.prompt(question);
    }

    addAgent(agent: AbstractAgent) {
        this.agents.push(agent);
    }

    getAgent(name: string): AbstractAgent {
        const agents = this.agents.filter((agent) => agent.name === name);
        return agents.length ? agents[0] : new DefaultAgent();
    }

    async process() {
        let tmpData: any = {};
        for (let i = 0; i < this.data.length; i++) {
            const element = this.data[i];
            const agent = this.getAgent(element.agen);
            agent.addCore(this);
            agent.addData(element);
            console.log(`[[[[[[[[ ${element.agen} ]]]]]]]]`);
            if (element.agen == "agent_chart") {
                element.chart_instruction.data = typeof tmpData == 'string' ? JSON.parse(tmpData) : tmpData;
                agent.addData({ ...element });
            }
            console.log(element);
            console.log("========================================================");
            const result = await agent.run(tmpData);
            console.log(result);
            console.log("========================================================");
            console.log("========================================================");
            this.data[i].result = result;
            tmpData[element.agen] = result;
        }
        return this.data;
    }
}