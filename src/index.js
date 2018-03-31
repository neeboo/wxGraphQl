import wx from './wx.js'

export class GraphQLClient {
  constructor(url, options) {
    this.url = url
    this.options = options || {}
  }
  async rawRequest(query, variables) {
    const { headers, ...others } = this.options
    const body = JSON.stringify({
      query,
      variables: variables || undefined
    })

    const response = await wx.request({
      url: this.url,
      method: 'POST',
      data: body,
      header: Object.assign({ 'Content-Type': 'application/json' }, headers),
      dataType: 'json',
      ...others
    })
    const result = await getResult(response)

    if (
      (response.statusCode >= 200 || response.statusCode < 300) &&
      !result.errors &&
      result.data
    ) {
      const { data } = result
      return data.data
    } else {
      const errorResult =
        typeof result === 'string' ? { error: result } : result
      throw new ClientError(
        { ...errorResult, status: response.statusCode },
        { query, variables }
      )
    }
  }
  async request(query, variables) {
    const { headers, ...others } = this.options

    const body = JSON.stringify({
      query,
      variables: variables || undefined
    })

    const response = await wx.request({
      url: this.url,
      method: 'POST',
      data: body,
      header: Object.assign({ 'Content-Type': 'application/json' }, headers),
      dataType: 'json',
      ...others
    })

    const result = await getResult(response)
    if (
      (response.statusCode >= 200 || response.statusCode < 300) &&
      !result.data.errors &&
      result.data
    ) {
      const { data } = result
      return data.data
    } else {
      const errorResult =
        typeof result === 'string' ? { error: result } : result
      throw new ClientError(
        { ...errorResult, status: response.statusCode },
        { query, variables }
      )
    }
  }
  setHeaders(headers) {
    this.options.headers = headers

    return this
  }

  setHeader(key, value) {
    const { headers } = this.options

    if (headers) {
      headers[key] = value
    } else {
      this.options.headers = { [key]: value }
    }
    return this
  }
}

export async function rawRequest(url, query, variables) {
  const client = new GraphQLClient(url)

  return client.rawRequest(query, variables)
}

export async function request(url, query, variables) {
  const client = new GraphQLClient(url)

  return client.request(query, variables)
}

export default request

async function getResult(response) {
  const { header } = response
  const contentType = header['Content-Type']

  if (contentType && contentType.startsWith('application/json')) {
    return response
  } else {
    return JSON.stringify(response)
  }
}

export class ClientError extends Error {
  constructor(response, request) {
    const message = `${ClientError.extractMessage(response)}: ${JSON.stringify({
      response,
      request
    })}`
    super(message)
    this.response = response
    this.request = request

    // this is needed as Safari doesn't support .captureStackTrace
    /* tslint:disable-next-line */
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, ClientError)
    }
  }

  static extractMessage(response) {
    try {
      const { errors } = response.data
      if (errors.length) return response.data.errors[0].message
    } catch (e) {
      return `GraphQL Error (Code: ${response.status})`
    }
  }
}
