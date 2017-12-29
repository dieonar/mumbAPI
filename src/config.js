/* ----------------------------------------- */
/* ---------------- REQUIRE ---------------- */
/* ----------------------------------------- */

exports.config = {
    apiPort:                process.env.API_PORT              || 8080,
    murmurAdress:           process.env.MURMUR_ADRESS         || 'localhost',
    murmurIcePort:          process.env.MURMUR_ICE_PORT       || 6502,
    iceWritePassword:       process.env.ICE_WRITE_PASSWORD    || "writepassword"
};