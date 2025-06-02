import AbstractAgent from './AbstractAgent'
import AgentProps from './AgentProps'

export default class SqlAgent extends AbstractAgent {
  name: string = 'agen_sql'

  addData(data: AgentProps) {
    this.data = data
  }

  getData(query: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fetch('https://adbrief-php-dev-336781009919.asia-southeast2.run.app/Ai/sql_agent', {
        method: 'POST',
        body: JSON.stringify({ data: query }),
      })
        .then(v => v.json())
        .then(v => resolve(v))
        .catch(e => reject(e))
    })
  }

  run(params: string): Promise<string[]> {
    const allPromise = []
    for (let i = 0; i < (this.data?.query || []).length; i++) {
      // console.log("[query]", element!.query);
      const element = this.data?.query[i]
      allPromise.push(this.getData(element!.query || ''))
    }
    return Promise.all(allPromise)
  }
}
