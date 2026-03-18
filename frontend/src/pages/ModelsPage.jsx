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
import { Link } from "react-router-dom";
// disclaimer model is now its own seperate componenet file



// right here are the three steps show on the left side bar the step 1 step 2 step 3
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


/*
* now this part with the const six models lol it was actually kinda fun! but was veryyy long typing
* idk just listing them like this was quite interesting  
* each model has the id, the category, the model name, model description, the model strengths, the model weakness, model best for, and model complexity
*/

const theSixModels = [

    {
        modelId: "ltsm",
        category: "Deep Learning",
        modelName: "LSTM",
        modelFullName: "Long Short-Term Memory",
        modelDescription: "A recurrent neural network designed to learn long-term dependencies in sequential data. It uses gating mechanisms to decide what to remember and what to forget across many time steps.",
        modelStrengths: "Captures long-range temporal patterns in price history",
        modelWeaknesses: "Slow to train and sensitive to hyperparamteter choices",
        modelBestFor: "Trend-following predicitons over longer horizons",
        modelComplexity: 4,
    },

    {
        modelId: "randomforest",
        category: "Ensemble",
        modelName: "Random Forest",
        modelFullName: "Ensemble Decision Trees",
        modelDescription: "Builds hundreds of decision trees on random subsets of training data, then averages their outputs. This reduces overfitting and handles noisy financial data well.",
        modelStrengths: "Robust against outliers and built-in feature importance",
        modelWeaknesses: "Cannot extrapolate beyond the training range",
        modelBestFor: "Stable medium-term predictions with interpretable outputs",
        modelComplexity: 2,
    },

    {
        modelId: "xgboost",
        category: "Ensemble",
        modelName: "XGBoost",
        modelFullName: "Extreme Gradient Boosting",
        modelDescription: "Build trees sequentially, with each new tree correcting the errors of the previous one. Known for high accuracy on tabular data with relatively fast training.",
        modelStrengths: "High accuracy that handles missing values natively",
        modelWeaknesses: "More hyperparamters to tune than simpler models",
        modelBestFor: "Short-term precision where feature engineering is strong",
        modelComplexity: 3,
    },

    {
        modelId: "linearregression",
        category: "Linear",
        modelName: "Linear Regression",
        modelFullName: "Linear Regression (Baseline)",
        modelDescription: "The simplest model fits a straight line through historical price data to predict future values. Serves as a performance baseline that all other models must best.",
        modelStrengths: "Fully interpretable and very fast to train",
        modelWeaknesses: "Cannot capture non-linear relationships in market data",
        modelBestFor: "Establishing a baseline and understanding feature correlations",
        modelComplexity: 1,
    },

    {
        modelId: "svr",
        category: "Kernel Method",
        modelName: "SVR",
        modelFullName: "Support Vector Regression",
        modelDescription: "Uses a kernal function to map data into a higher-dimensional space where non-linear relationships become linear. Effctive when the dataset is clean and well-scaled.",
        modelStrengths: "Strong generalisation on smaller datasets",
        modelWeaknesses: "Sensitive to feature scaling and slow on large datasets",
        modelBestFor: "Situations where data is limited but clean",
        modelComplexity: 3,
    },

    {
        modelId: "ann",
        category: "Deep Learning",
        modelName: "ANN",
        modelFullName: "Artificial Neural Network",
        modelDescription: "A feedforward network that learns on-linear relationships between features and price outputs through multiple hidden layers and backpropagations.",
        modelStrengths: "Flexible and can model complex non-linear relationships",
        modelWeaknesses: "Requires more data and careful regularisaitons to avoid overfitting",
        modelBestFor: "Complex feature interactions across many technical indicators",
        modelComplexity: 3,
    }

];

export default function ModelsPage({disclaimerConfirmed, setDisclaimerConfirmed }) {

    //so false means modal (pop-up) shows and true means modal hidden
    //will start as false so the modal pops up straight away when you click the models page
  
    
    //now this is going to track which model car is showing basically 0 means ltsm 1 means random forest etc
    
    const [userSelectedModel, setUserSelectedModel] = useState(0);
    return (
        <div className="min-h-screen bg-[var(--color-off-white)]">
            {!disclaimerConfirmed && (
                <DisclaimerModal onAgree={() => setDisclaimerConfirmed(true)} />
            )}
  



            {/* the ! means if not confirmed then show the modal */}
            {/* when the use clicks agree the disclaimerConfirmed is now true and the modal disappears */}


            {/* this here the two column layout so the left sidebar and then the right carousel these are side by side */}
            <div className="flex gap-8 px-12 py-10">

                {/* this is just a placeholder right now the white box */}
                {/* here is left sidebar, the S&P, about text and how it works steps */}
                <div className="w-64 shrink-0 flex flex-col gap-6">


                    {/* here is the s&p 500 box just has the name in it right now */}
                    <div className="bg-[var(--color-card-bg)] rounded-2xl p-4 border border-[var(--color-border)]">

                        <div className="flex items-center gap-2">

                            {/* right here is the small green dot */}
                            <span className="w-2 h-2 rounded-full bg-[var(--color-accent-green)]"></span>
                            <p className="text-xs font-semibold tracking-widest text-[var(--color-muted)] uppercase">
                                S&P 500 Index
                            </p>
                        </div>
                    </div>


                {/* again this page seciton right here */}
                {/* contains the 6 models like flipping through them */}

                <div>
                    <p className="text-xs font-semibold tracking-widest text-[var(--color-muted)] uppercase mb-2">
                        About this page
                    </p>
                    <h2 className="text-xl font-bold text-[var(--color-ink)] mb-3">
                        Choose your model
                    </h2>
                    <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                        Each model uses a different approach to learn from historical S&P 500 data.
                        Browse the carousel to understand how each one works, its strengths, and what it's best suited for.
                    </p>
                </div>

                <div>

                    {/* how each of the steps work */}
                    <p className="text-xs font-semibold tracking-widest text-[var(--color-muted)] uppercase mb-4">
                        How it works
                    </p>



                    {/* looping through the steps array to create a row for each one */}
                    <div className="flex flex-col gap-4">
                        {howSelectionWorks.map((step) => (
                            <div key={step.number} className="flex gap-3">
                                

                                {/* here step number on the left */}
                                <span className="text-sm font-medium text-[var(--color-muted)] w-4 shrink-0">
                                    {step.number}
                                </span>

                                <div>

                                    {/* title and description on the right */}
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


            {/* this is the model carousel on the right */}

            <div className="flex-1 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div>

                        {/* right here is the header the 6 models label and the browse heading */}
                        <p className="text-xs font-semibold tracking-widest text-[var(--color-muted)] uppercase mb-1">
                            6 ML Models
                        </p>
                        <h1 className="text-2xl font-bold text-[var(--color-ink)]">
                            Browse & select a model
                        </h1>
                    </div>
                    <Link
                        to="/evaluations"
                        className="text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors"
                    >
                        View all evaluations &rarr;
                    </Link>
                </div>

                {/* the model card which shows whatever model the user has currently selected */}

                <div className="bg-[var(--color-card-bg)] rounded-2xl border border-[var(--color-border)] flex overflow-hidden">
                    
                    
                    {/* the left side of the card should be the chart */} 
                    <div className="w-80 bg-[var(--color-off-white)] flex items-center justify-center p-8 border-r border-[var(--color-border)]">
                    
                    <div className="absolute top-4 left-4">
                        <span className="text-xs font-semibold tracking-widest uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                            {theSixModels[userSelectedModel].category}
                        </span>
                    </div>
                    <p className="text-[var(--color-muted)] text-sm"> Uhh so would charts go here?</p>
                
                </div>

                <div className="flex-1 p-8 flex flex-col gap-4">
                    <div>

                        {/* here is the modal name and the model full name */}
                        <h2 className="text-2xl font-bold text-[var(--color-ink)]">
                            {theSixModels[userSelectedModel].modelName}
                        </h2>
                        <p className="text-sm text-[var(--color-muted)]">
                            {theSixModels[userSelectedModel].modelFullName}
                        </p>
                    </div>
                    
                    {/* the model description */}
                    <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                        {theSixModels[userSelectedModel].modelDescription}
                    </p>

                    {/* model strengths, weaknesses and best for */}
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-3 items-start">
                            <span className="text-xs font-semibold tracking-widest text-[var(--color-muted)] uppercase w-20 shrink-0 pt-0.5">Strength</span>
                            <p className="text-sm text-[var(--color-accent-green)]">{theSixModels[userSelectedModel].modelStrengths}</p>
                        </div>
                        <div className="flex gap-3 items-start">
                            <span className="text-xs font-semibold tracking-widest text-[var(--color-muted)] uppercase w-20 shrink-0 pt-0.5">Weakness</span>
                            <p className="text-sm text-[var(--color-accent-red)]">{theSixModels[userSelectedModel].modelWeaknesses}</p>
                        </div>
                        <div className="flex gap-3 items-start">
                            <span className="text-xs font-semibold tracking-widest text-[var(--color-muted)] uppercase w-20 shrink-0 pt-0.5">Best for</span>
                            <p className="text-sm text-[var(--color-ink)]">{theSixModels[userSelectedModel].modelBestFor}</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                        <div>
                            <p className="text-xs font-semibold tracking-widest text-[var(--color-muted)] uppercase mb-2">
                                Complexity
                            </p>

                            {/* loops through 1-4 and fills dots up to the complexity number */}

                            {/* for example the ltsm has a complexity of 4 so all 4 dots are filled up */}

                            <div className ="flex gap-1">
                                {[1, 2, 3, 4].map((dot) => (
                                    <span
                                    key={dot}
                                    className={`w-3 h-3 rounded-full ${
                                        dot <= theSixModels[userSelectedModel].modelComplexity
                                        ? "bg-[var(--color-ink)]"
                                        : "bg-[var(--color-border)]"
                                    }`}
                                ></span>
                                ))}
                            </div>
                        </div>
                    
                    <Link
                    to={`/models/${theSixModels[userSelectedModel].modelId}`}
                    className="bg-[var(--color-ink)] text-[var(--color-off-white)] px-6 py-3 rounded-xl text-sm font-medium hover:opacity-75 transition-opacity"
                    >

                        {/* the select button uses the model id to go to the right forecast page */}
                        Select &rarr;
                    </Link>
                </div>
            </div>
        </div>

        <div className="flex items-center justify-between">
            <button 
                onClick={() => setUserSelectedModel((prev) => (prev === 0 ? theSixModels.length - 1 : prev - 1))}
                className="w-10 h-10 rounded-full border border-[var(--color-border)] bg-[var(--color-card-bg)] flex items-center justify-center hover:opacity-75 transition-opacity"
            >
                {/* left arrow will go to previous arrow */}

                &larr;
            </button>
                   
            <div className="flex gap-2">
                {theSixModels.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setUserSelectedModel(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                            index === userSelectedModel
                                ? "bg-[var(--color-ink)]"
                                : "bg-[var(--color-border)]"
                        }`}
                    ></button>
                ))}
            </div>
            
            {/* right arrow will go to the next model */}
            <button 
                onClick={() => setUserSelectedModel((prev) => (prev === theSixModels.length - 1 ? 0 : prev + 1))}
                className="w-10 h-10 rounded-full border border-[var(--color-border)] bg-[var(--color-card-bg)] flex items-center justify-center hover:opacity-75 transition-opacity"
            >
                &rarr;
            </button>
        </div>
    </div>
</div>

            {/* this is at the bottom of the screen. like the very bottom of that page. it's not in the two column layout area */}

            <div className="fixed bottom-0 left-0 right-0 bg-[var(--color-card-bg)] border-t border-[var(--color-border)] px-12 py-4 flex items-center justify-between">
        
                <p className="text-sm text-[var(--color-muted)]">
                    Want to compare all models at once? {" "}
                    <strong className="text-[var(--color-ink)]">
                        See accuracy metrics, training time and more.
                    </strong>
                </p>

                <Link
                    to="/evaluations"
                    className="bg-[var(--color-ink)] text-[var(--color-off-white)] px-6 py-3 rounded-xl text-sm font-medium hover:opacity-75 transition-opacity"
                >
                    Go to Models Evaluations &rarr;
                </Link>
            </div>
            </div>
    );
}