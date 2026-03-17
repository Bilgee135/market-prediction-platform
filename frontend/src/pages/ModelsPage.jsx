/*
 * pages/ModelsPage.jsx
 *
 * What this is:
 *   The model selection page where users browse all six ML models
 *   before choosing one to explore.
 *
 * Where it is used:
 *   App.jsx at route /models
 *
 * What it should contain:
 *   - DisclaimerModal fired on mount, blocks content until confirmed
 *   - Two column layout after confirmation
 *   - Left: live S&P index pill, about text, three-step how-it-works
 *   - Right: ModelCarousel with all six model cards
 *   - Bottom CTA linking to /evaluations
 *
 * State:
 *   disclaimerConfirmed   boolean, controls whether modal shows
 *
 * Development order:
 *   Build after HomePage. Depends on DisclaimerModal, ModelCarousel,
 *   ModelCard, and Sparkline all being ready first.
 */


import { useState } from "react";

//i'm going up folders
import DisclaimerModal from "../components/ui/DisclaimerModal";
// disclaimer model is now its own seperate componenet file


const howSelectionWorks = [
    {
        number: 1,
        title: "Select a model",
        description: "Browse the carousel and click Select on any model to view its full predictions."
    },

    {
        number: 2,
        title: "View predictions",
        description: "Explore interactive charts with weekly forecasts, actual vs predicted trends, and key statistics."
    },

    {
        number: 3,
        title: "Compare models",
        description: "Visit the evaluations page to see all models ranked side by side on accuray metrics."
    },
];

export default function ModelsPage() {

    //so false means modal (pop-up) shows and true means modal hidden
    //will start as false so the modal pops up straight away when you click the models page
    const [disclaimerConfirmed, setDisclaimerConfirmed] = useState(false);

    return (    
        <div className="min-h-screen bg-[var(--color-off-white)]">



            {/* the ! means if not confirmed then show the modal */}
            {/* when the use clicks agree the disclaimerConfirmed is now true and the modal disappears */}
            {!disclaimerConfirmed && ( 
                <DisclaimerModal onAgree={() => setDisclaimerConfirmed(true)} />
            )}

            {/* this here is going to be a two column layout */}
            <div className="flex gap-8 px-12 py-10">

                {/* this is just a placeholder right now the white box */}
                {/* here should go the S&P, about text and how it works steps */}
                <div className="w-64 shrink-0 flex flex-col gap-6">

                    <div className="bg-[var(--color-card-bg)] rounded-2xl p-4 border border-[var(--color-border)]">

                        <div className="flex items-center gap-2">

                            <span className="w-2 h-2 rounded-full bg-[var(--color-accent-green)]"></span>
                            <p className="text-xs font-semibold tracking-widest text-[var(--color-muted)] uppercase">
                                S&P 500 Index
                            </p>
                        </div>
                    </div>


                {/* again just a placehold right now */}
                {/* this is going to contain the 6 models like flipping through them */}

                <div>
                    <p className="text-xs font-semibold tracking-widest text-[var(--color-muted)] uppercase mb-2">
                        About this page
                    </p>
                    <h2 className="text-x1 font-bold text-[var(--color-ink)] mb-3">
                        Choose your model
                    </h2>
                    <p className="text-sm text-[var(--color-muted)] leadong-relaxed">
                        Each model uses a different approach to learn from historical S&P 500 data.
                        Browse the carousel to understand how each one works, its strengths, and what it's best suited for.
                    </p>
                </div>

                <div>
                    <p className="text-xs font-semibold tracking-widest text-[var(--color-muted)] uppercase mb-4">
                        How it works
                    </p>

                    <div className="flex flex-col gap-4">
                        {howSelectionWorks.map((step) => (
                            <div key={step.number} className="flex gap-3">

                                <span className="text-sm font-medium text-[var(--color-muted)] w-4 shrink-0">
                                    {step.number}
                                </span>

                                <div>
                                    <p className="text-sm font-semibold text-[var(--color-ink)] mb-1">
                                        {step.title}
                                    </p>
                                    <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                                        {step.description}                      
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-[var(--color-card-bg] rounded-2xl p-6 min-h-[400px]">
            </div>

            </div>
    
        </div>
    );
}