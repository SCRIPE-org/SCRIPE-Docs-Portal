"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Copy,
  Check,
  Play,
  Sparkles,
  Code2,
  Database,
  Shield,
} from "lucide-react";

interface TabItem {
  id: string;
  label: string;
  icon: typeof Terminal;
  badge: string;
  command?: string;
  language: string;
  code: string;
  output?: string[];
}

const TABS: TabItem[] = [
  {
    id: "cli",
    label: "SCRIPE CLI Suite",
    icon: Terminal,
    badge: "123 Commands",
    language: "bash",
    command: "scripe dev all",
    code: `# Launch full unified triple-stack development environment
scripe dev all

# Scaffold full-stack feature across 3 projects with DB migrations & UI
scripe new-feature Venue Booking -p "CourtId:guid,StartTime:datetime,EndTime:datetime"

# Run idempotent multi-provider migrations across all 3 databases
scripe db update -m Venue --all-providers

# Universal verification gate: Lint + Format + Build + Unit Tests + RTL Parity
scripe check --quick`,
    output: [
      "[INFO] Resolving environment: development",
      "[BE]   Kestrel (.NET 9) Host listening on https://localhost:5001",
      "[FE]   Next.js 16 Web Portal ready on http://localhost:3000",
      "[DOCS] Next.js Docs Portal ready on http://localhost:3002",
      "[SYS]  Dual-Mode schema isolation: active (venue.*)",
      "[OK]   All 3 services online. Telemetry pipeline attached.",
    ],
  },
  {
    id: "cqrs",
    label: "CQRS & Result<T>",
    icon: Code2,
    badge: "AstraFlow Pipeline",
    language: "csharp",
    code: `public record CreateBookingCommand(
    Guid VenueId,
    Guid CourtId,
    DateTime StartUtc,
    DateTime EndUtc
) : ICommand<Result<Guid>>, IInvalidatesCache
{
    public string[] CachePrefixesToInvalidate => [$"Venue:{VenueId}:Bookings"];
}

public class CreateBookingCommandHandler : ICommandHandler<CreateBookingCommand, Result<Guid>>
{
    private readonly IVenueRepository _repo;
    private readonly IUnitOfWork _uow;

    public async Task<Result<Guid>> Handle(CreateBookingCommand cmd, CancellationToken ct)
    {
        var isAvailable = await _repo.IsCourtAvailableAsync(cmd.CourtId, cmd.StartUtc, cmd.EndUtc, ct);
        if (!isAvailable)
            return Result<Guid>.Fail("Court slot is already reserved.");

        var booking = Booking.Create(cmd.VenueId, cmd.CourtId, cmd.StartUtc, cmd.EndUtc);
        await _repo.AddAsync(booking, ct);
        await _uow.SaveChangesAsync(ct);

        return Result<Guid>.Success(booking.Id);
    }
}`,
  },
  {
    id: "db",
    label: "Multi-DB Schemas",
    icon: Database,
    badge: "Zero-Cross FK",
    language: "csharp",
    code: `// Dedicated module DbContext with strict schema isolation
public class VenueDbContext : BaseDbContext
{
    protected override string? ModuleName => "Venue";
    protected override string? Schema => "venue";

    public DbSet<Venue> Venues => Set<Venue>();
    public DbSet<Court> Courts => Set<Court>();
    public DbSet<Booking> Bookings => Set<Booking>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        // Schema boundary strictly enforced: tables are isolated in venue.*
        // Cross-module physical foreign keys are strictly prohibited.
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(VenueDbContext).Assembly);
    }
}`,
  },
  {
    id: "frontend",
    label: "Frontend MVVM",
    icon: Shield,
    badge: "Clean Architecture",
    language: "typescript",
    code: `// Strict sub-module data flow: View -> ViewModel -> Repository -> Service -> HTTP
export function useVenueBookingsViewModel(venueId: string) {
  const { venueRepository } = venueContainer;

  return useCrudViewModel<BookingEntity, CreateBookingReq, UpdateBookingReq>(
    ["venue", venueId, "bookings"],
    {
      getAll: async (params) => {
        const res = await venueRepository.getBookings(venueId, params);
        return { items: res.items, totalCount: res.totalCount };
      },
      create: async (data) => venueRepository.createBooking(venueId, data),
      update: async (id, data) => venueRepository.updateBooking(id, data),
      delete: async (id) => venueRepository.cancelBooking(id),
    }
  );
}`,
  },
];

export function InteractiveCliPreview() {
  const [activeTab, setActiveTab] = useState<TabItem>(TABS[0]);
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [runLog, setRunLog] = useState<string[] | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeTab.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard fallback
    }
  };

  const handleRunSim = () => {
    if (!activeTab.output) return;
    setIsRunning(true);
    setRunLog([]);

    activeTab.output.forEach((line, index) => {
      setTimeout(
        () => {
          setRunLog((prev) => (prev ? [...prev, line] : [line]));
          if (index === (activeTab.output?.length ?? 1) - 1) {
            setIsRunning(false);
          }
        },
        (index + 1) * 280,
      );
    });
  };

  return (
    <div className="w-full rounded-2xl border border-border bg-card shadow-xl overflow-hidden transition-all">
      {/* Chrome Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-border bg-muted/30 px-4 py-2.5 gap-2">
        {/* macOS style buttons + Active Label */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-amber-500/80" />
            <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs font-mono text-muted-foreground font-medium hidden sm:inline-block">
            scripe-platform-os ~ preview
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 overflow-x-auto py-1 relative">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab.id === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab);
                  setRunLog(null);
                }}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCliTab"
                    className="absolute inset-0 rounded-md bg-primary shadow-xs"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon size={13} />
                  <span>{tab.label}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {activeTab.output && (
            <button
              onClick={handleRunSim}
              disabled={isRunning}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-muted/50 text-foreground hover:border-primary/50 hover:bg-muted transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Play
                size={12}
                className={
                  isRunning ? "animate-spin text-primary" : "text-primary"
                }
              />
              <span>{isRunning ? "Executing..." : "Simulate Run"}</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            aria-label="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check size={12} className="text-emerald-500" />
                <span className="text-emerald-500">Copied</span>
              </>
            ) : (
              <>
                <Copy size={12} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Area */}
      <div className="relative p-4 sm:p-6 bg-muted/10 font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed min-h-[220px]">
        <AnimatePresence mode="wait">
          <motion.pre
            key={activeTab.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.16 }}
            className="text-foreground/90 font-mono"
          >
            <code>{activeTab.code}</code>
          </motion.pre>
        </AnimatePresence>

        {/* Simulation Output Stream */}
        {runLog && runLog.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border/80 font-mono text-xs">
            <div className="flex items-center gap-2 text-primary font-semibold mb-2">
              <Sparkles size={13} />
              <span>Live Console Stream</span>
            </div>
            <div className="space-y-1 bg-black/60 dark:bg-black/80 rounded-lg p-3 text-emerald-400 border border-border/50">
              {runLog.map((line, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-muted-foreground select-none">›</span>
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Meta Strip */}
      <div className="flex flex-wrap items-center justify-between border-t border-border bg-muted/20 px-4 py-2 text-[11px] font-mono text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
          <span>Pattern Guarantee: 100% Invariant Compliance</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Lang: {activeTab.language.toUpperCase()}</span>
          <span>•</span>
          <span className="text-primary font-semibold">{activeTab.badge}</span>
        </div>
      </div>
    </div>
  );
}
