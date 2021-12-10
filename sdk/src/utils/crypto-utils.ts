/**
 * Copyright (c) 2021, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import Base64 from "crypto-js/enc-base64";
import utf8 from "crypto-js/enc-utf8";
import WordArray from "crypto-js/lib-typedarrays";
import sha256 from "crypto-js/sha256";
import { AsgardeoAuthException } from "@asgardeo/auth-js/src/exception";
import { DecodedIDTokenPayload, JWKInterface, SUPPORTED_SIGNATURE_ALGORITHMS } from "@asgardeo/auth-js";
const nodeJose = require("node-jose");
// const nodeJose = require("react-native-jose");

export class CryptoUtils {

    /**
     * Get URL encoded string.
     *
     * @param {CryptoJS.WordArray} value.
     * @returns {string} base 64 url encoded value.
     */
    public base64URLEncode(value: CryptoJS.WordArray): string {

        return Base64.stringify(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
    }

    /**
     * Generate code verifier.
     *
     * @returns {string} code verifier.
     */
    public getCodeVerifier(): string {

        return this.base64URLEncode(WordArray.random(32));
    }

    /**
     * Derive code challenge from the code verifier.
     *
     * @param {string} verifier.
     * @returns {string} code challenge.
     */
    public getCodeChallenge(verifier: string): string {

        return this.base64URLEncode(sha256(verifier));
    }

    /**
     * Get JWK used for the id_token
     *
     * @param {string} jwtHeader header of the id_token.
     * @param {JWKInterface[]} keys jwks response.
     * @returns {any} public key.
     */
    /* eslint-disable @typescript-eslint/no-explicit-any */
    public async getJWKForTheIdToken(jwtHeader: string, keys: JWKInterface[]): Promise<any> {

        const headerJSON = JSON.parse(atob(jwtHeader));

        for (const key of keys) {
            if (headerJSON.kid === key.kid) {
                const promise = nodeJose.JWK.asKeyStore({
                    keys: [key]
                })

                return promise.then((keystore) => {
                    console.log(keystore)
                    return Promise.resolve(keystore);
                })
                .catch((error) => {
                    return Promise.reject(error);
                })
                // return parseJwk({
                //     alg: key.alg,
                //     e: key.e,
                //     kty: key.kty,
                //     n: key.n
                // });
            }
        }

        return Promise.reject(
            new AsgardeoAuthException(
                "CRYPTO_UTIL-GTFTIT-IV01",
                "crypto-utils",
                "getJWKForTheIdToken",
                "kid not found.",
                "Failed to find the 'kid' specified in the id_token. 'kid' found in the header : " +
                    headerJSON.kid +
                    ", Expected values: " +
                    keys.map((key) => key.kid).join(", ")
            )
        );
    }

    /**
     * Verify id token.
     *
     * @param idToken id_token received from the IdP.
     * @param jwk public key used for signing.
     * @param {string} clientID app identification.
     * @param {string} issuer id_token issuer.
     * @param {string} username Username.
     * @param {number} clockTolerance - Allowed leeway for id_tokens (in seconds).
     * @returns {Promise<boolean>} whether the id_token is valid.
     */
    public isValidIdToken(
        idToken: string,
        keystore: any,
        clientID: string,
        issuer: string,
        username: string,
        clockTolerance: number
    ): Promise<boolean> {
        return nodeJose.JWS.createVerify(keystore, {
            algorithms: SUPPORTED_SIGNATURE_ALGORITHMS
        })
        .verify(idToken)
        .then(function(decodedIdToken) {
            return Promise.resolve(true);
            // needs id token validation steps
        })
        .catch(function(error) {
            return Promise.reject(error);
            // needs to throw asgardeo error
        })

        // return jwtVerify(idToken, jwk, {
        //         algorithms: this.getSupportedSignatureAlgorithms(),
        //         audience: clientID,
        //         clockTolerance: clockTolerance,
        //         issuer: issuer,
        //         subject: username
        //     })
        //     .then(() => {
        //         return Promise.resolve(true);
        //     })
        //     .catch((error) => {
        //         return Promise.reject(
        //             new AsgardeoAuthException(
        //                 "CRYPTO_UTIL-IVIT-IV02",
        //                 "crypto-utils",
        //                 "isValidIdToken",
        //                 "Validating ID token failed",
        //                 error
        //             )
        //         );
        //     });
    }

    /**
     * This function decodes the payload of an id token and returns it.
     *
     * @param {string} idToken - The id token to be decoded.
     *
     * @return {DecodedIdTokenPayloadInterface} - The decoded payload of the id token.
     */
    public decodeIDToken(idToken: string): DecodedIDTokenPayload {

        try {
            const words = Base64.parse(idToken.split(".")[1]);
            const utf8String = utf8.stringify(words);
            const payload = JSON.parse(utf8String);

            return payload;
        } catch (error) {
            throw new AsgardeoAuthException(
                "CRYPTO_UTIL-DIT-IV01",
                "crypto-utils",
                "decodeIDToken",
                "Decoding ID token failed.",
                error
            );
        }
    }
}
