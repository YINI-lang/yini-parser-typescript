const { spawnSync } = require('child_process')
const path = require('path')

const result = spawnSync(
    process.execPath,
    [
        // Use --experimental-vm-modules if your Node version is <18 and you hit issues (sometimes not needed for 18+)
        // '--experimental-vm-modules',
        path.join(__dirname, 'test-esm.mjs'),
    ],
    { stdio: 'inherit' },
)

if (result.status !== 0) {
    throw new Error('ESM smoke test failed!')
} else {
    console.log('ESM smoke test succeeded!')
}
