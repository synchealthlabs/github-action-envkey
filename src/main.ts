import * as core from '@actions/core'
import { getEnvVars } from './get-envkey'

async function run(): Promise<void> {
  try {
    const ENVKEY = process.env.ENVKEY
    const env = await getEnvVars({ envKey: ENVKEY })
    Object.keys(env).forEach((key) => {
      core.setSecret(env[key])
      core.exportVariable(key, env[key])
    })
  } catch (ex) {
    console.error(ex)
    process.exit(1)
  }
}

void run()
