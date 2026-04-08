# Skill Registry — GcellShop (PaginaGcell)
Generated: 2026-04-06

## User Skills (Global — ~/.claude/skills/)

| Skill | Trigger Context |
|-------|----------------|
| ui-ux-pro-max | UI/UX design, component building, design system, mobile-first |
| sdd-init | Initialize SDD in project |
| sdd-explore | Investigate feature/approach before coding |
| sdd-propose | Create change proposal |
| sdd-spec | Write specs for a change |
| sdd-design | Write technical design |
| sdd-tasks | Break change into tasks |
| sdd-apply | Implement tasks |
| sdd-verify | Validate implementation vs specs |
| sdd-archive | Close and archive a change |
| judgment-day | Adversarial review, quality gates |
| branch-pr | Creating pull requests |
| issue-creation | Creating GitHub issues |
| skill-creator | Creating new skills |

## Project Skills (.claude/skills/)

| Skill | Trigger Context |
|-------|----------------|
| ui-design-system | Design tokens, color palette, typography scale, spacing system |
| 3d-web-experience | Any 3D scene, Three.js, React Three Fiber, Spline |

## Project Skills (.agents/skills/)

| Skill | Trigger Context |
|-------|----------------|
| frontend-design | Landing page, UI component, visual design, distinctive aesthetics |
| find-skills | User asks what skills exist or how to do something |

## Compact Rules

### frontend-design
- Pick ONE bold aesthetic direction and execute with precision. No generic AI patterns.
- Use distinctive fonts (NOT Inter, Roboto, Arial). Pair display font + body font.
- Commit to a cohesive color system with dominant + sharp accent colors.
- Use CSS animations for load, hover, and scroll moments. CSS-only first.
- No emojis as icons — use SVG (Heroicons, Lucide). All clickable = cursor-pointer.
- Pre-delivery: contrast 4.5:1, hover states, focus rings, responsive at 375/768/1024/1440px.

### ui-ux-pro-max
- Touch targets: 44x44px minimum.
- Readable font size: 16px minimum on mobile.
- Transitions: 150-300ms. Use transform/opacity, never layout properties.
- Avoid horizontal scroll. Use overscroll-behavior: contain on scroll containers.
- Disable pull-to-refresh where not needed.
- Adjacent touch targets: 8px minimum gap.
- No horizontal swipe carousel as ONLY navigation.

### 3d-web-experience
- 3D must serve a purpose (product visualization = good, decorative = question it).
- ALWAYS provide static fallback for low-end devices / mobile.
- ALWAYS show loading progress — users think it's broken otherwise.
- Test on real mobile: battery, performance, crashes.
- Model pipeline: Blender → GLB → gltf-transform compress → <5MB target.

### ui-design-system
- Generate tokens from brand color: python scripts/design_token_generator.py [color] [style] [format]
- Use 8pt spacing grid.
- Modular type scale.

## Convention Files
- Global CLAUDE.md: C:\Users\LAUREANO\.claude\CLAUDE.md
