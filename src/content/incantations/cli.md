---
id: "cli"
title: "The Command-Line Blade"
subtitle: "Forge a fast, beautiful CLI tool"
school: "Enchantment"
rarity: "rare"
difficulty: 2
userLevel: "Apprentice"
icon: "cli"
reagents: ["Go 1.26+", "A terminal you love"]
effect: "A fast, cross-platform Go CLI with subcommands, useful help, typed config, and release binaries."
stack: ["Go", "Cobra", "Viper", "Lip Gloss", "goreleaser"]
summary: "Go gives you boring-good binaries. Cobra gives the command surface structure. Ship a real tool instead of a pile of shell scripts."
---
You are building a command-line tool. Follow these constraints EXACTLY:

# Stack (non-negotiable)
- Go 1.26+ with modules — NOT Node, NOT Python, NOT shell scripts.
- Cobra for command routing and help text — NOT hand-rolled flag parsing.
- Viper only when the CLI has persistent config or env var binding. Do not add it for a one-command utility.
- Charmbracelet Lip Gloss for styled terminal output when styling helps. Keep plain output for pipes and `--json`.
- Standard library `testing` plus focused table tests. Add third-party test helpers only when they earn their keep.

# Supply-chain defaults
- Use Go modules. Commit `go.mod` and `go.sum`.
- Pin release tooling with `go install <module>@<version>` in documented setup steps or a `tools.go` file. Do not rely on whatever happens to be globally installed.
- Run `go mod tidy` after dependency changes and review the diff.

# Bootstrapping
1. Create the project directory.
2. `go mod init github.com/<owner>/<repo>`
3. Add dependencies: `go get github.com/spf13/cobra@latest github.com/charmbracelet/lipgloss@latest`.
4. If config is required, add `go get github.com/spf13/viper@latest` and keep config loading isolated in `internal/config`.
5. Create `cmd/<tool>/main.go`, `internal/cmd/root.go`, and one `internal/cmd/<name>.go` file per subcommand.
6. Add a local build script or Makefile target: `go build -trimpath -ldflags "-s -w -X main.version=$(git describe --tags --always --dirty)" -o dist/<tool> ./cmd/<tool>`.
7. For release setup, choose a goreleaser version, install it with `go install github.com/goreleaser/goreleaser/v2@<version>`, then add `.goreleaser.yaml`.

# Quality gates
- Add `make check` or `just check` that runs: `gofmt -w .`, `go vet ./...`, `go test ./...`, and `go mod tidy`.
- Add `make build` that produces a local binary in `dist/`.
- Add `make snapshot-help` or an equivalent test that verifies the root command and every subcommand has useful `--help`.
- Run `make check`, `make build`, and `./dist/<tool> --help` before saying the work is done.

# Architecture
- `cmd/<tool>/main.go` only calls `cmd.Execute(version)`.
- `internal/cmd/root.go` builds the root Cobra command.
- Each command lives in `internal/cmd/<name>.go` and calls a pure function in `internal/<domain>/`.
- Config lives in `~/.config/<toolname>/config.yaml` only when the tool needs it. Validate into typed structs before use.
- Cache anything network-fetched in `~/.cache/<toolname>/`. Respect `--no-cache`.

# Output conventions
- A consistent output helper: `out.Info`, `out.Warn`, `out.Error`, `out.Success`.
- Long operations use clear status lines. Do not add a spinner unless the command is truly interactive and attached to a TTY.
- Tables use a tiny local helper over `text/tabwriter`, NOT a huge table dependency.
- Respect `NO_COLOR` and detect TTY — pipe to a file should produce clean text.
- `--json` flag on every command that produces data, for scripting.

# Quality
- Every command has `--help` with examples through Cobra's `Example` field or long description.
- Exit codes: 0 success, 1 user error, 2 system error. Always.
- A `--verbose` flag that pipes through to a single debug helper.

# Distribution
- GitHub Actions matrix builds for darwin-arm64, darwin-amd64, linux-amd64, linux-arm64, windows-amd64.
- Release with goreleaser and attach binaries plus checksums to GitHub Releases.
- Optional Homebrew tap for macOS/Linux install.
- A one-liner install script only if you host and checksum-verify release artifacts: `curl -fsSL https://your.site/install.sh | sh`.
- If the CLI needs an update manifest, docs site, telemetry intake, license check, sync API, or hosted install script, default to Cloudflare Workers. Use R2 for downloadable artifacts and Pages only when the hosted surface is static-only.

# First ask me what to build
Before creating files, ask what command-line tool I want to build in plain English.

Also ask:
- The main job the tool should perform and the inputs it should accept.
- The commands, subcommands, and flags I expect.
- The output formats I need: human-readable text, tables, JSON, files, or all of these.
- Whether it needs config files, environment variables, credentials, or persistent state.
- Whether it will be private, distributed as binaries, published through Homebrew, or released on GitHub.

Ask only follow-up questions that unblock you. You are the engineering expert: make reasonable product and implementation decisions when the answer is obvious or low-risk. Once you have enough detail, summarize the command list and flag surface, get me to approve, then implement.

# Finish with next steps
End your response with a concise "Next steps" section that tells the user exactly what to run, what to configure, what to review, what to publish or deploy, and what to build next.
