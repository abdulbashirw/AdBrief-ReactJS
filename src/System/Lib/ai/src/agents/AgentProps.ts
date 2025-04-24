
export default interface AgentProps {
    agent: string;
    message: string;
    query: [
        {
            query: string;
            table: string;
            note: string;
        }
    ],
    chart_instruction: {
        type: string,
        title: string,
        x_axis: string,
        y_axis: string,
        data: any,
    },
    result: any | undefined;
}
