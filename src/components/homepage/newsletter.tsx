
export function Newsletter() {
  return (
    <section className="bg-[#ecf1e8] transition-colors dark:bg-[#17251c]">
      <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
        <div className="rounded-2xl bg-[#17402e] px-6 py-9 transition-colors sm:px-10 sm:py-11 dark:bg-[#203a2c]">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-12">
            <div>
              <p className="flex items-center gap-2.5 text-[0.7rem] font-semibold tracking-[0.18em] text-[#e8ece5] uppercase dark:text-[#c2cec4]">
                <span
                  aria-hidden="true"
                  className="size-2 rounded-full bg-[#c15f3c]"
                />
                Civic Dispatch
              </p>

              <h2 className="mt-4 font-heading text-3xl tracking-tight text-white sm:text-4xl">
                Stay Connected. Make an Impact.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#b9c9bd] sm:text-[0.95rem] dark:text-[#c2cec4]">
                Receive weekly community dispatches, urgent volunteer alerts for
                your Dhaka neighborhood, and quarterly impact briefings. No
                spam, ever.
              </p>
            </div>

            <div className="w-full max-w-md lg:justify-self-end">
              <form className="flex gap-2.5">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>

                <input
                  id="newsletter-email"
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email address (e.g. name@civic.bd)"
                  className="h-11 w-full min-w-0 rounded-lg border border-white/10 bg-white px-4 text-sm text-[#1c2b23] outline-none placeholder:text-[#9aa093] focus:ring-2 focus:ring-[#c15f3c]/40 dark:border-white/15 dark:bg-[#17251c] dark:text-[#edf4ed] dark:placeholder:text-[#8fa995]"
                />

                <button
                  type="submit"
                  className="h-11 shrink-0 rounded-lg bg-[#c15f3c] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#a8481f]"
                >
                  Subscribe
                </button>
              </form>

              <p className="mt-3 text-xs leading-5 text-[#9db3a4] dark:text-[#b0beb3]">
                We respect your privacy. Unsubscribe at any time with a single
                click.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
