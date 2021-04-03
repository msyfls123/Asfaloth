import { spawn } from 'child_process'
import * as rollup from 'rollup'
import config from './rollup.config.mjs'

process.on('uncaughtException', (error) => {
  console.error('[rollup watch error] \n ================================== \n', error)
})

const watcher = rollup.watch(config)

let running

watcher.on('event', event => {
  if (/error/i.test(event.code)) {
    console.error(event)
  }
  if (event.code === 'END') {
    if (running) {
      running.kill()
    }
    running = spawn('yarn', ['debug'], {
      stdio: 'inherit',
      shell: true,
    })
  }
})
