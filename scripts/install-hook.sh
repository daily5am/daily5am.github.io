#!/usr/bin/env bash
set -euo pipefail
HOOK_DIR=".git/hooks"
mkdir -p "$HOOK_DIR"
cat > "$HOOK_DIR/pre-commit" <<'EOF'
#!/usr/bin/env bash
node scripts/update-frontmatter.mjs
EOF
chmod +x "$HOOK_DIR/pre-commit"
echo "pre-commit hook installed -> $HOOK_DIR/pre-commit"


