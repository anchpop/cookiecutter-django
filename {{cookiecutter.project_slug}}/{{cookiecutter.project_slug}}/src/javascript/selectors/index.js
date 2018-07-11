import { createSelector } from 'reselect'
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';


const getHashableObjectFromState = (state) => 
        state.nonce + state.random_number

export const getHash = createSelector(
    [ getHashableObjectFromState ],
    (hashableObject) => Base64.stringify(hmacSHA512(hashableObject, "Baby's first private key"))
  )