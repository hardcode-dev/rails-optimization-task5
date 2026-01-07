### Step 1. Configure certificate for local HTTPS

Configured the certificate for mkcert

### Step 2. Configure NGinx as reverse-proxy

Installed nginx via docker, everything worked

### Step 3. Configure HTTP/2 and server-push

Did everything as indicated in the readme

### Step 4. Experiment with HTTP/2 server-push

Added the header and removed inline images, images started loading first

### Step 5. Measuring the effect of changes made

HAR comparison [link to comparison](https://compare.sitespeed.io/?har1=https://gist.githubusercontent.com/SynthesisOne/9003fe36aa4a8269322b6c618896d574/raw/1ad67def1aec25601e988d208aa2111519a18681/har&har2=https://gist.githubusercontent.com/SynthesisOne/67eb76d0f09b5e8ab8cd83d8c70bab5c/raw/8d82bb6dbcea293e8fb071163e3593598e1459e3/without_server_push.har).
