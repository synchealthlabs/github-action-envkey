# Github Actions for Env KEy

### Usage

1. Add `ENVKEY` on your repository's configs on Settings > Secrets

3. Add a new `step` on your workflow code:

```yaml
# myjob.yml
name: Github Action Example for EnvKey

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: synchealthlabs/github-action-envkey@main
      env:
        ENVKEY: ${{ secrets.ENVKEY }}
    - name: Show environment
      run: env
```
