# Agent guidelines

Rules for work in this repo. Prefer these over default habits unless the user says otherwise.

## Prefer little code

When planning or implementing, meet the acceptance criteria in as little code as possible. Avoid speculative abstractions, extra layers, and “just in case” structure.

## Keep code simple

Favor straightforward, readable changes. Do not over-engineer. Match existing patterns in the project you are editing.

## No unit tests by default

Do not add unit tests unless the user asks for them.

## No backwards compatibility by default

Do not preserve backwards compatibility unless the user asks for it. Prefer the cleanest current solution over compatibility shims.

## Prefer terminal for file ops

When interacting with files, prefer terminal commands over editing files directly when possible (saves tokens). Example: use `mv` instead of writing the file in the new location and removing the old one.

## Prefer consolidated files (~500 lines)

Optimize for Cursor performance by consolidating related code into fewer files of up to about 500 lines each. Prefer one well-sized file over many tiny (~100-line) files for the same concern. Split only when a file would meaningfully exceed ~500 lines or when separation of concerns clearly requires it.

## Support light and dark mode

All pages and components must work gracefully in both light and dark mode. Prefer Nuxt UI semantic tokens (e.g., `bg-default`, `text-default`, `border-default`) or pair explicit colors with `dark:` variants (use unscoped `<style>` with `.dark ...` rather than `:global(.dark)` in scoped CSS). Avoid hardcoded `text-white`, `border-white/*`, or dark-only backgrounds without light-mode counterparts, and verify button variants like `UButton` `outline` don't clash with forced text colors.

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/) (`type: short description`, or `type(scope): short description`). Example: `feat: add project showcase section` or `fix(sales-demo-agent): support light and dark mode`
