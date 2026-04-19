/*
 * pages/AboutPage.jsx
 *
 * What this is:
 *   The about page describing the project, the team, the data sources,
 *   and the technology stack.
 *
 * Where it is used:
 *   App.jsx at route /about
 *
 * What it should contain:
 *   - Two column layout
 *   - Left: intro text, team member chips (color coded by role), StatStrip
 *   - Right: content cards covering what the project does, tech stack chips,
 *     data sources, and an ethics/disclaimer card
 *
 * Data dependencies:
 *   None. All content is static.
 *
 * Development order:
 *   Build near the end. No data dependencies and no complex components.
 *   Straightforward layout work.
 */

//what we used
//looping through this array to create each chip
const theTechnologyStack = [
  'Python',
  'scikit-learn',
  'TensorFlow',
  'yfinance',
  'WRDS',
  'Pandas / NumPy',
  'MySQL',
  'Node.js',
  'React',
  'Chart.js',
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--color-off-white)] px-4 py-8 md:px-12 md:py-10">
      {/* the two column layout for the left and right hand side */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* for the left hand side */}
        {/* the intro text, the team chips the stat will go here */}
        <div className="w-full md:w-64 md:shrink-0 flex flex-col gap-6">
          <div>
            {/* the heading the team number, the module and the uni */}
            <p className="text-xs font-semibold tracking-widest text-[var(--color-muted)] uppercase mb-3">
              TEAM 45 • COMP 208 • UNIVERSITY OF LIVERPOOL
            </p>

            {/* just a nice catchphrase lol */}
            <h1 className="text-2xl font-bold text-[var(--color-ink)] mb-3">
              Built to learn. Designed to predict.
            </h1>

            {/* a little explanation of the website */}
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              This system was developed as part of a second year Group Software Project. It applies
              machine learning to weekly S&P 500 price prediction, not as a trading tool, but as an
              exploration of how historical data can be used to model market behaviour.
            </p>
          </div>

          {/* Here the team member section */}
          <div>
            <p className="text-xs font-semibold tracking-widest text-[var(--color-muted)] uppercase mb-3">
              The team
            </p>

            {/* the members name and their role*/}
            {/* the ML Models and the Web App */}
            <div className="flex flex-col gap-2">
              {/* the ml models who are doing it is here*/}
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[var(--color-ml-models)] text-white text-xs font-semibold flex items-center justify-center shrink-0">
                  T
                </span>
                <span className="text-sm text-[var(--color-ink)]">Tom</span>
                <span className="text-xs text-[var(--color-ml-models)] bg-[var(--color-ml-models-bg)] px-2 py-0.5 rounded-full ml-auto">
                  ML Models
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[var(--color-ml-models)] text-white text-xs font-semibold flex items-center justify-center shrink-0">
                  A
                </span>
                <span className="text-sm text-[var(--color-ink)]">Avin</span>
                <span className="text-xs text-[var(--color-ml-models)] bg-[var(--color-ml-models-bg)] px-2 py-0.5 rounded-full ml-auto">
                  ML Models
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[var(--color-ml-models)] text-white text-xs font-semibold flex items-center justify-center shrink-0">
                  L
                </span>
                <span className="text-sm text-[var(--color-ink)]">Lysandra</span>
                <span className="text-xs text-[var(--color-ml-models)] bg-[var(--color-ml-models-bg)] px-2 py-0.5 rounded-full ml-auto">
                  ML Models
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[var(--color-ml-models)] text-white text-xs font-semibold flex items-center justify-center shrink-0">
                  S
                </span>
                <span className="text-sm text-[var(--color-ink)]">Safiya</span>
                <span className="text-xs text-[var(--color-ml-models)] bg-[var(--color-ml-models-bg)] px-2 py-0.5 rounded-full ml-auto">
                  ML Models
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[var(--color-ml-models)] text-white text-xs font-semibold flex items-center justify-center shrink-0">
                  P
                </span>
                <span className="text-sm text-[var(--color-ink)]">Prisha</span>
                <span className="text-xs text-[var(--color-ml-models)] bg-[var(--color-ml-models-bg)] px-2 py-0.5 rounded-full ml-auto">
                  ML Models
                </span>
                <span className="text-xs text-[var(--color-web-app)] bg-[var(--color-web-app-bg)] px-2 py-0.5 rounded-full ml-auto">
                  Web App
                </span>
              </div>

              {/* this is the web app who is doing the web app*/}

              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[var(--color-web-app)] text-white text-xs font-semibold flex items-center justify-center shrink-0">
                  H
                </span>
                <span className="text-sm text-[var(--color-ink)]">Haps</span>
                <span className="text-xs text-[var(--color-web-app)] bg-[var(--color-web-app-bg)] px-2 py-0.5 rounded-full ml-auto">
                  Web App
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[var(--color-web-app)] text-white text-xs font-semibold flex items-center justify-center shrink-0">
                  B
                </span>
                <span className="text-sm text-[var(--color-ink)]">Billy</span>
                <span className="text-xs text-[var(--color-web-app)] bg-[var(--color-web-app-bg)] px-2 py-0.5 rounded-full ml-auto">
                  Web App
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-1 md:gap-3 border-t border-[var(--color-border)] pt-4">
            <div>
              <p className="text-xl font-bold text-[var(--color-ink)]">13</p>
              <p className="text-xs text-[var(--color-muted)]">ML Models</p>
            </div>
            <div>
              <p className="text-xl font-bold text-[var(--color-ink)]">3yr</p>
              <p className="text-xs text-[var(--color-muted)]">of S&P Data</p>
            </div>
            <div>
              <p className="text-xl font-bold text-[var(--color-ink)]">7</p>
              <p className="text-xs text-[var(--color-muted)]">Members</p>
            </div>
            <div>
              <p className="text-xl font-bold text-[var(--color-ink)]">15wk</p>
              <p className="text-xs text-[var(--color-muted)]">Build Time</p>
            </div>
          </div>
        </div>

        {/* now here the right hand side with the four contents */}
        <div className="flex-1 flex flex-col gap-4">
          {/* this is the first one what the project does */}
          <div className="bg-[var(--color-card-bg)] rounded-2xl border border-[var(--color-border)] p-5 md:p-8">
            <p className="text-xs font-semibold tracking-widest text-[var(--color-muted)] uppercase mb-2">
              What this project does
            </p>
            <h2 className="text-xl font-bold text-[var(--color-ink)] mb-4">
              Weekly S&P 500 Prediction
            </h2>

            {/* this is the short description of what the project is */}
            <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-3">
              The system collects historical S&P 500 index data, trains multiple machine learning
              models on it and presents weekly price predicitons through this interactive interface.
              Users can explore forecasts, compare model accuracy and understand the reasoning
              behind each prediction.
            </p>

            {/* The {' '} I have added just adds a space so the bold text does not squish up against the word before it */}
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              Predictions span from late 2022 to December 2025, covering{' '}
              <strong className="text-[var(--color-ink)]">roughly 150 weeks</strong> depending on
              the model, trained on 3 years of S&amp;P 500 weekly data.
            </p>
          </div>

          {/* this is the second one the technology stack, so we are discussing how its build */}
          <div className="bg-[var(--color-card-bg)] rounded-2xl border border-[var(--color-border)] p-5 md:p-8">
            <p className="text-xs font-semibold tracking-widest text-[var(--color-muted)] uppercase mb-2">
              Technology Stack
            </p>
            <h2 className="text-xl font-bold text-[var(--color-ink)] mb-3">How it's built</h2>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-5">
              The system has three layers that pass data through a shared MySQL database.
            </p>

            <div className="flex flex-wrap gap-2">
              {theTechnologyStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-medium text-[var(--color-ink)] border border-[var(--color-border)] px-3 py-1.5 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* third one is the data sources so we are talking about where the data comes from */}
          <div className="bg-[var(--color-card-bg)] rounded-2xl border border-[var(--color-border)] p-5 md:p-8">
            <p className="text-xs font-semibold tracking-widest text-[var(--color-muted)] uppercase mb-2">
              Data Sources
            </p>
            <h2 className="text-xl font-bold text-[var(--color-ink)] mb-4">
              Where the data comes from
            </h2>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              Weekly S&amp;P 500 data from{' '}
              <strong className="text-[var(--color-ink)]">2022 to 2025</strong> is sourced from
              Wharton Research Data Services (WRDS) and the{' '}
              <strong className="text-[var(--color-ink)]">yfinance</strong> package via the Yahoo
              Finance API. Both sources are publicly accessible and permission has been confirmed
              for academic use.
            </p>
          </div>

          {/* the final one is the ethics and limitations */}
          <div className="bg-[var(--color-ink)] rounded-2xl p-5 md:p-8">
            <p className="text-xs font-semibold tracking-widest text-[var(--color-off-white)] opacity-60 uppercase mb-2">
              Ethics & Limitations
            </p>
            <h2 className="text-xl font-bold text-[var(--color-off-white)] mb-4">
              This is not financial advice.
            </h2>

            {/* Now finally here we thought it would be good to keep reminding the user that this is not 100% certain.*/}
            {/* And we also go over how the market can be affected by lots of things */}
            <p className="text-sm text-[var(--color-off-white)] opacity-75 leading-relaxed">
              All predictions are generated for{' '}
              <strong className="font-bold">academic and educational purposes only</strong>. Markets
              are affected by geopolitical events, policy changes and unforeseen shocks that no
              historical model can anticipate. Do not use this system to make real investment
              decisions. Model limitations are documented transparently throughout the interface.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
