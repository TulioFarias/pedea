// import axios from 'axios'

import { SignJWT } from 'jose'

const { subtle } = globalThis.crypto

async function generateRsaKey() {
  try {
    const { privateKey } = await subtle.generateKey(
      {
        name: 'RSASSA-PKCS1-v1_5',
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: {
          name: 'SHA-256'
        }
      },
      true,
      ['sign', 'verify']
    )
    return privateKey
  } catch (error) {
    console.log('deu error na criacao')
  }
}

export const CreateToken = async () => {
  try {
    const privateKey = await generateRsaKey()

    const jwt = await new SignJWT({ 'urn:example:claim': true })
      .setProtectedHeader({ alg: 'RS256' })
      .setIssuedAt()
      .setIssuer('urn:example:issuer')
      .setAudience('urn:example:audience')
      .setExpirationTime('2h')
      .sign(privateKey)

    return jwt
  } catch (error) {
    console.log(error)
  }
}

export const setData = async userInfo => {
  try {
    await localStorage.setItem('PEDEA-AdminSystem', JSON.stringify(userInfo))

    return userInfo
  } catch (error) {
    console.log(error)
    throw error
  }
}
