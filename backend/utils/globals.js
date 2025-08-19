const CryptoJS = require("crypto-js");

module.exports = {
    encrypt,
    decrypt,
    encodeCredentials
};

function encrypt(cipherText) {
    const encrypted = CryptoJS.AES.encrypt(cipherText, process.env.SECRET_KEY);
    return encrypted.toString().replace(/\+/g, 'p1L2u3S').replace(/\//g, 's1L2a3S4h').replace(/=/g, 'e1Q2u3A4l');

}

function decrypt(encryptedText) {
    const replacedText = encryptedText.replace(/p1L2u3S/g, '+').replace(/s1L2a3S4h/g, '/').replace(/e1Q2u3A4l/g, '=');
    const decrypted = CryptoJS.AES.decrypt(replacedText, process.env.SECRET_KEY);

    return decrypted.toString(CryptoJS.enc.Utf8);
}

function encodeCredentials(email, password) {
    // Combine the email and password with a colon separator
    const credentials = `${email}:${password}`;

    // Convert the credentials string to Base64 format
    const encodedCredentials = Buffer.from(credentials).toString('base64');

    return encodedCredentials;
}