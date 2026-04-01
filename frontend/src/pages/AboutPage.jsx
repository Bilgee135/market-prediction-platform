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



//here is all the tech chips shown in the technology known card
//looping through this array to create each chip
const theTechnologyStack = [ "Python", "scikit-learn", "TensorFlow", "yfinance", "WRDS", "Pandas / NumPy", "MySQL", "Node.js", "React", "Chart.js"]

//sanity check done and removed it now
export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[var(--color-off-white)] px-12 py-10">
            
            {/* the two column layout for the left and right hand side */}
            <div className="flex gap-8">

                {/* for the left hand side */}
                {/* the intro text, the team chips the stat will go here */}
                <div className="w-64 shrink-0 flex flex-col gap-6">

                    <div>
                        <p className="text-xs font-semibold tracking-widest text-[var(--color-muted)] uppercase mb-3">
                            TEAM 45 • COMP 208 • University of Liverpool 
                        </p>
                        <h1 className="text-2xl font-bold text-[var(--color-ink)] mb-3">
                            Built to learn. Designed to predict.
                        </h1>
                        <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                            This system was developed as part of a second year Group Software Project. It applies machine learning to weekly S&P 500 price prediction, not as a trading tools, but as an exploration of how historical data can be used to model market behaviour.
                        </p>
                    </div>

                    {/* Here the team member section */}
                    <div>
                        <p className="text-xs font-semibold tracking-widest text-[var(--color-muted)] uppercase mb-3">
                            The team
                        </p>

                        {/* the members name and their role*/}
                        {/* dark green is data pipeline, blue is ML Models, dark red is Web App */}
                        {/* not 100% can get changed */}

                        <div className="flex flex-col gap-2">

                            {/* data pipeline */}
                            <div className="flex items-center gap-2">
                                <span className="w-7 h-7 rounded-full bg-green-900 text-white text-xs font-semibold flex items-center justify-center shrink-0">A</span>
                                <span className="text-sm text-[var(--color-ink)]">Avin</span>
                                <span className="text-xs text-green-900 bg-green-100 px-2 py-0.5 rounded-full ml-auto">Data Pipeline</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="w-7 h-7 rounded-full bg-green-900 text-white text-xs font-semibold flex items-center justify-center shrink-0">S</span>
                                <span className="text-sm text-[var(--color-ink)]">Safiya</span>
                                <span className="text-xs text-green-900 bg-green-100 px-2 py-0.5 rounded-full ml-auto">Data Pipeline</span>
                            </div>

                            {/* the ml models in blue */}
                            <div className="flex items-center gap-2">
                                <span className="w-7 h-7 rounded-full bg-blue-700 text-white text-xs font-semibold flex items-center justify-center shrink-0">T</span>
                                <span className="text-sm text-[var(--color-ink)]">Tom</span>
                                <span className="text-xs text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full ml-auto">ML Models</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="w-7 h-7 rounded-full bg-blue-700 text-white text-xs font-semibold flex items-center justify-center shrink-0">P</span>
                                <span className="text-sm text-[var(--color-ink)]">Prisha</span>
                                <span className="text-xs text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full ml-auto">ML Models</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="w-7 h-7 rounded-full bg-blue-700 text-white text-xs font-semibold flex items-center justify-center shrink-0">L</span>
                                <span className="text-sm text-[var(--color-ink)]">Lysandra</span>
                                <span className="text-xs text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full ml-auto">ML Models</span>
                            </div>

                            {/* the web app in dark red */}

                            <div className="flex items-center gap-2">
                                <span className="w-7 h-7 rounded-full bg-red-900 text-white text-xs font-semibold flex items-center justify-center shrink-0">H</span>
                                <span className="text-sm text-[var(--color-ink)]">Haps</span>
                                <span className="text-xs text-red-900 bg-red-100 px-2 py-0.5 rounded-full ml-auto">Web App</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="w-7 h-7 rounded-full bg-red-900 text-white text-xs font-semibold flex items-center justify-center shrink-0">B</span>
                                <span className="text-sm text-[var(--color-ink)]">Billy</span>
                                <span className="text-xs text-red-900 bg-red-100 px-2 py-0.5 rounded-full ml-auto">Web App</span>
                            </div>

                        </div>
                    </div>

                    <div className="flex flex-col gap-3 border-t border-[var(--color-border)] pt-4">
                        <div>
                            <p className="text-xl font-bold text-[var(--color-ink)]">6</p>
                            <p className="text-xs text-[var(--color-muted)]">ML Models</p>
                        </div>
                        <div>
                            <p className="text-xl font-bold text-[var(--color-ink)]">100yr</p>
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

                {/* now here the right hand side */}
                <div className="flex-1 flex flex-col gap-4">
                    
                    {/* this is the first one what the project does */}
                    <div className="bg-[var(--color-card-bg)] rounded-2xl border border-[var(--color-border)] p-8">
                        <p className="text-xs font-semibold tracking-widest text-[var(--color-muted)] uppercase mb-2">
                            What this project does
                        </p>
                        <h2 className="text-xl font-bold text-[var(--color-ink)] mb-4">
                            Weekly S&P 500 Prediction
                        </h2>


                        <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-3">
                            The system collects historical S&P 500 index data, trains multiple machine learning models on it and presents weekly pricely predicitons through this interactive interface.
                            Users can explore forecasts, compare model accuracy and understand the reasoning behind each prediction.
                        </p>

                        <p className="text-m text-[var(--color-muted)] leading-relaxed">
                            Predictions cover a {" "}
                            <strong className="text-[var(--color-ink)]">52-week forward horizon</strong>
                            , generated from models trained on data spanning back to 1926.
                        </p>
                    </div>
                    
                    {/* this is the second one the technology stack */}
                    <div className="bg-[var(--color-card-bg)] rounded-2xl border border-[var(--color-border)] p-8">
                        <p className="text-xs font-semibold tracking-widest text-[var(--color-muted)] uppercase mb-2">
                            Technology Stack
                        </p>
                        <h2 className="text-xl font-bold text-[var(--color-ink)] mb-3">
                            How it's built
                        </h2>
                        <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-5">
                            The system has three layers that pass data through a shared MySQl database.
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
                        
                        {/* third one is the data sources */}
                        <div className="bg-[var(--color-card-bg)] rounded-2xl border border-[var(--color-border)] p-8">
                            <p className="text-xs font-semibold tracking-widest text-[var(--color-muted)] uppercase mb-2">
                            Data Sources
                        </p>
                        <h2 className="text-xl font-bold text-[var(--color-ink)] mb-4">
                            Where the data comes from
                        </h2>
                        <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                            Historical S&P 500 data from{" "}
                            <strong className="text-[var(--color-ink)]">1926 to 2024</strong>
                            {" "} is sourced from Wharton Research Data Services (WRDS). Data from 2025 onwards uses the {" "}
                            <strong className="text-[var(--color-ink)]">yfinance</strong>
                            {" "}package via the Yahoo Finance API. Both Sources are publicaly accessible and permission has been confirmed for academic use.
                        </p>
                    </div>
                    

                    {/* the final one is the ethics and limitations */}
                    <div className="bg-[var(--color-ink)] rounded-2xl p-8">
                        <p className="text-xs font-semibold tracking-widest text-[var(--color-off-white)] opacity-60 uppercase mb-2">
                            Ethics & Limitations
                        </p>
                        <h2 className="text-xl font-bold text-[var(--color-off-white)] mb-4">
                            This is not financial advice.
                        </h2>
                        <p className="text-m text-[var(--color-muted)] leading-relaxed">
                            All predictions are generted for{" "}
                            <strong className="text-[var(--color-off-white)] opacity-100">
                            academic and educations purposes only
                            </strong>
                            . Markets are affected by geopolitical events, policy changes and unforeseen shocks that no historical model can anticipate. Do not use this system to make real investment decisions. Model limitations are documented transparently throughout the interface.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

