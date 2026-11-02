import {
  CircleCheck,
  Flag,
  MapPin,
  Users,
  type LucideIcon,
} from "lucide-react";

type Stat = {
  label: string;
  icon: LucideIcon;
  value: string;
  title: string;
  description: string;
  progress: number;
  valueClass: string;
  barClass: string;
  iconClass: string;
};

const stats: Stat[] = [
  {
    label: "Interventions",
    icon: Flag,
    value: "340+",
    title: "Community initiatives",
    description:
      "Successfully organized, funded, and documented across 14 administrative zones.",
    progress: 85,
    valueClass: "text-[#1a4332]",
    barClass: "bg-[#1a4332]",
    iconClass: "text-[#1a4332]",
  },
  {
    label: "Civic Force",
    icon: Users,
    value: "18,500+",
    title: "Volunteers registered",
    description:
      "Active citizens committing direct weekend hours to flood relief, parks, and youth drives.",
    progress: 92,
    valueClass: "text-[#24543f]",
    barClass: "bg-[#24543f]",
    iconClass: "text-[#3f4a43]",
  },
  {
    label: "Reach",
    icon: MapPin,
    value: "42",
    title: "Communities reached",
    description:
      "From dense central Dhaka alleyways to industrial belts along Tongi and Gazipur.",
    progress: 72,
    valueClass: "text-[#8a3b1c]",
    barClass: "bg-[#a8481f]",
    iconClass: "text-[#a8481f]",
  },
];

export function Stats() {
  return (
    <section className="bg-[#e8eee7]">
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 lg:py-20">

        {/* Centered Section Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[0.7rem] font-medium tracking-[0.18em] text-[#c15f3c] uppercase">
            Institutional Purpose &amp; Momentum
          </p>

          <h2 className="mt-4 font-heading text-3xl leading-tight tracking-tight text-[#163a2b] sm:text-4xl">
            Good things happen when people show up.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-[#5c665e] sm:text-[0.95rem] sm:leading-7">
            CIVORA operates on a simple conviction: durable social
            transformation is not born in distant conferences, but through
            transparent, hyper-local participation. We equip civic leaders
            across metropolitan Bangladesh with verifiable coordination
            infrastructure.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.label}
                className="flex flex-col rounded-2xl border border-black/[0.04] bg-white p-6 shadow-[0_10px_30px_-18px_rgba(28,43,35,0.25)]"
              >
                <div className="flex items-start justify-between">
                  <span className="text-[0.7rem] font-medium tracking-[0.16em] text-[#7d857b] uppercase">
                    {stat.label}
                  </span>

                  <Icon
                    aria-hidden="true"
                    className={`size-4 ${stat.iconClass}`}
                  />
                </div>

                <p
                  className={`mt-6 text-5xl leading-none font-bold tracking-tight ${stat.valueClass}`}
                >
                  {stat.value}
                </p>

                <h3 className="mt-3 text-lg font-semibold text-[#1c2b23]">
                  {stat.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#6b746c]">
                  {stat.description}
                </p>

                <div className="mt-auto pt-6">
                  <div
                    role="progressbar"
                    aria-valuenow={stat.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={stat.label}
                    className="h-1.5 w-full overflow-hidden rounded-full bg-black/[0.07]"
                  >
                    <div
                      className={`h-full rounded-full ${stat.barClass}`}
                      style={{ width: `${stat.progress}%` }}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Audited Public Ledger */}
        <div className="mt-10 flex items-start gap-3 rounded-xl border border-[#d0ddcf] bg-[#dce6d9] px-5 py-4">
          <CircleCheck
            aria-hidden="true"
            className="mt-0.5 size-5 shrink-0 text-[#1a4332]"
          />

          <p className="text-sm leading-6 text-[#3f4a43]">
            <span className="font-semibold text-[#1a4332]">
              Audited Public Ledger:
            </span>{" "}
            100% of emergency distribution logistics verified via photo audit
            and open receipt logs.
          </p>
        </div>

      </div>
    </section>
  );
}