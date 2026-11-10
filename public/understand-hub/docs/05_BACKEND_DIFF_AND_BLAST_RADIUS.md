# SCRIPE-Backend — Change Impact & Blast Radius Analysis (/understand-diff)

> **Generated from `SCRIPE-Backend/.ua/diff-overlay.json`**

---

## 1. Active Change Set Summary

- **Commit**: `HEAD`
- **Summary**: Full blast-radius analysis across SCRIPE-Backend.
- **Directly Changed Nodes**: `5`
- **Affected Downstream / Neighbor Nodes**: `7`

## 2. Changed Nodes

- `src/Host/API/Program.cs`
- `src/Host/API/Extensions/ModuleRegistration.cs`
- `src/Host/API/Extensions/MiddlewarePipeline.cs`
- `src/Core/Core.Application/DependencyInjection.cs`
- `src/Core/Core.Infrastructure/DependencyInjection.cs`

## 3. Blast Radius & Affected Nodes

- `module:Host.API`
- `module:Core`
- `concept:astraflow-6-stage-pipeline`
- `concept:5-layer-security-defense-pbac`
- `concept:fail-closed-server-role-di-guards`
- `file:src/Host/API/Extensions/CoreServiceRegistration.cs`
- `file:src/Host/API/Extensions/SeedingExtensions.cs`
