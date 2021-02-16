/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { fetch as envKeyFetch } from 'envkey/loader'

export interface GetEnvVarOptions {
  envKey: string | undefined
  permitted?: string[]
  verbose?: boolean
}

export async function getEnvVars(
  options: Partial<GetEnvVarOptions> = {}
): Promise<{ [key: string]: any }> {
  // Check for envkey file usage
  if (options.envKey !== undefined) {
    return await fetchEnvKey({
      envKey: options.envKey,
      permitted: options.permitted,
      verbose: options.verbose
    })
  }
  return {}
}

export async function fetchEnvKey({
  envKey,
  permitted,
  verbose
}: {
  envKey: string | undefined
  permitted?: string[]
  verbose?: boolean
}): Promise<{ [key: string]: any }> {
  if (envKey === null || envKey === undefined) {
    if (verbose === true) {
      console.info(
        'Failed to find ENVKEY in arguments or environment variables'
      )
    }
    throw new Error(
      'Failed to find ENVKEY in arguments or environment variables'
    )
  } else {
    return await new Promise((resolve, reject) => {
      envKeyFetch(
        envKey,
        { permitted },
        function (err: any, res: { [key: string]: any }) {
          // eslint-disable-next-line
        if (err) {
            if (verbose === true) {
              console.info(err)
            }
            reject(err)
          } else {
            const env = { ...res, ENVKEYS: Object.keys(res).join(',') }
            resolve(env)
          }
        }
      )
    })
  }
}
