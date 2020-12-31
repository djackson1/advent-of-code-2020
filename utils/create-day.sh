#!/bin/bash

# https://stackoverflow.com/a/24112741
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path"

# https://unix.stackexchange.com/questions/232384/argument-string-to-integer-in-bash/232386
[[ $1 -lt 10 ]] && day="0$1" || day="$1"

folder_path=../src/day$day

mkdir -p $folder_path;
touch $folder_path/input.txt
touch $folder_path/input.spec.txt

touch $folder_path/main.ts
echo -n > $folder_path/main.ts
echo "const { getInputs } = require('../../utils/files')

export function a (): void {
  const inputs = getInputs($1)
  console.log(\`a = \${'?'}\`)
}

export function b (): void {
  const inputs = getInputs($1)
  console.log(\`b = \${'?'}\`)
}" >> $folder_path/main.ts

echo -n > $folder_path/main.spec.ts
echo "import chai = require('chai')
const { expect } = chai
import { getInputs } from '../../utils/files'
// import { ? } from './main'

describe('day ${day}', () => {
  beforeEach(function () {
    this.inputs = getInputs(${day}, { filepath: 'input.spec.txt', fn: Number })
  })

  describe('part a examples', () => {
    // tests
  })

  describe('part b examples', () => {
    // tests
  })
})" >> $folder_path/main.spec.ts

cd $folder_path

git checkout -b dj/day-$day
