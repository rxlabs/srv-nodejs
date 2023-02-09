#!/usr/bin/env node

import landlubber from 'landlubber'

import * as health from './health.js'

// TODO: middlewate for server base url
const commands = [health]

await landlubber(commands).parse()
