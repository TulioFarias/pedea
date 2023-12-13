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

export const CreateToken = async (email, password) => {
  try {
    const privateKey = await generateRsaKey()

    const payload = { email, password }

    const jwt = await new SignJWT(payload)
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
