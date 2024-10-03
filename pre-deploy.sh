#!/usr/bin/env bash

# Use sed to replace src="/ with src="https://accessmicro.github.io/ui-publishing-event/
sed -i 's|crossorigin src="/|crossorigin src="https://accessmicro.github.io/ui-publishing-event/|g' dist/index.html

# Use sed to replace href="/ with href="https://accessmicro.github.io/ui-publishing-event/
sed -i 's|crossorigin href="/|crossorigin href="https://accessmicro.github.io/ui-publishing-event/|g' dist/index.html