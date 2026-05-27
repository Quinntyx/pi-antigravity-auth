<claude-mem-context>
# Memory Context

# [pi-antigravity-auth] recent context, 2026-05-22 1:22pm EDT

Legend: 🎯session 🔴bugfix 🟣feature 🔄refactor ✅change 🔵discovery ⚖️decision 🚨security_alert 🔐security_note
Format: ID TIME TYPE TITLE
Fetch details: get_observations([IDs]) | Search: mem-search skill

Stats: 50 obs (15,621t read) | 405,469t work | 96% savings

### May 22, 2026
S104 Update pi-antigravity-auth plugin with Antigravity 2.0 models while maintaining backward compatibility with Gemini 3.5 naming (May 22 at 8:11 AM)
S103 Update pi-antigravity-auth plugin with latest Antigravity 2.0 models (Gemini 3.1 Pro, Gemini 3 Flash variants, Claude Sonnet/Opus 4.6 with thinking support, and proper thinking configuration) (May 22 at 8:11 AM)
S105 Update pi-antigravity-auth plugin to support latest models (gemini-3.1-pro, claude-sonnet/opus 4.6 variants) and fix broken model variant handling (May 22 at 8:19 AM)
755 8:22a 🔵 Live smoke test reveals model unavailability and account issues across quota system
756 " 🔵 Claude Sonnet 4.6 now working; Gemini 3.1 Pro High still fails with 400 INVALID_ARGUMENT
757 " 🔵 Gemini 3.1 Pro High 400 error persists regardless of thinking config
758 8:23a 🔵 Root cause identified: gemini-3.1-pro-high model name rejected by antigravity API
759 " 🔵 Antigravity documentation does not reference gemini-3.1-pro-high model variant
760 " 🟣 Implement account failure tracking and exponential backoff cooldowns
761 " 🔄 Apply account failure tracking to proxy.ts for consistency
762 " ✅ Update smoke test to use gemini-3.1-pro-low instead of gemini-3.5-flash-preview
763 8:24a 🔴 Fixed pi-antigravity-auth plugin quota fallback routing
764 8:25a 🔵 Antigravity 2.0 model compatibility testing results across 14 variants
765 " 🔵 Antigravity accounts in active cooldown with recent failures
766 " 🔴 Improved account failure detection with pattern matching on error messages
767 " 🔴 Applied error pattern matching fix to antigravity-auth proxy module
768 8:26a 🔵 Antigravity 2.0 models now functioning after account cooldown reset
769 " 🔵 Gemini variant model support gaps in antigravity 2.0
770 8:28a 🔴 Fixed Antigravity model request body transforms for 3.5 Flash tiers and 3.1 Pro thinking
771 " 🔴 Fixed Sonnet model ID routing from display name to backend identifier
772 " 🔴 Corrected quota fallback order to prioritize Antigravity before Gemini CLI
773 " 🔴 Narrowed account rotation cooldown logic to prevent over-aggressive backoff
774 " 🔵 Smoke tested Antigravity model coverage: 11 models verified working, 3 identified as rollout-gated
775 " ✅ Updated Pi plugin model registry to match Antigravity 2.0 spec with tiered variants
776 8:29a 🔴 Fixed Gemini thinking tier collapse in request body transformation
777 " 🔴 Fixed Sonnet model backend name mapping in request routing
778 " 🔴 Fixed 3.5 Flash high/medium tier preservation through upstream request transformation
779 " 🔴 Fixed quota fallback ordering to prioritize Antigravity before Gemini CLI
780 " 🔴 Fixed account cooldown logic preventing reuse of healthy accounts
781 " 🔵 Comprehensive smoke test confirms 11 Antigravity models functional across account rotation
782 " ✅ Updated model registry with Antigravity 2.0 picker variants and backend mappings
783 " ✅ Updated package.json and README with current Antigravity model documentation
785 8:30a 🔵 gemini-3.1-pro-high now works; 3.5 Flash models confirmed rollout-gated
787 8:32a 🔵 11 of 12 models working; gemini-3.1-pro-high shows account-specific 400 error
788 8:33a 🔴 Fixed activeIndexByFamily persistence in account storage
789 " 🔴 Added fallback handling for model unavailability 400 errors
790 8:35a 🔵 Model retry across accounts times out instead of completing
791 " 🔴 Fixed endpoint retry logic for model unavailability errors
792 8:37a 🔵 Model retry hang persists despite endpoint retry fix
794 8:49a 🔴 Fixed gemini-3.5-flash tier selectors collapsing to bare model ID
795 " 🔴 Fixed buildRequestBody forcing thinkingLevel LOW on all Gemini models
796 " ✅ Corrected quota fallback order for Antigravity standard Gemini models
797 " 🔴 Narrowed account cooldown logic to only real auth/account failures
798 " 🟣 Updated Antigravity model registry for 2.0 spec with new tier variants
799 " 🔵 Validated model support across account rotation and identified rollout-gated models
800 " 🔵 Gemini 3.5 Flash 404 errors traced to Antigravity 2.0 architectural split
801 " 🔵 Upstream opencode-antigravity-auth plugin does not yet support Gemini 3.5 Flash
802 8:50a 🔵 Gemini 3.5 Flash model ID format uses thinking levels as request parameters, not model ID suffixes
803 " 🔵 Confirmed: Gemini 3.5 Flash model ID is gemini-3.5-flash (no antigravity- prefix or tier suffixes)
804 " 🔵 Gemini 3.5 Flash support not yet in opencode or opencode-antigravity-auth as of latest releases
805 " 🔵 Upstream PR #574 adds Gemini 3.5 Flash support with backend model remapping
806 8:51a 🔵 Upstream PR #574 detailed implementation: 3.5 Flash backend remapping and resolver logic
807 " 🔵 PR #574 model-resolver.ts implementation reveals 3.5 Flash backend ID constants and routing logic

Access 405k tokens of past work via get_observations([IDs]) or mem-search skill.
</claude-mem-context>