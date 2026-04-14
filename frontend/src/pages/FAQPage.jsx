/*
 * pages/FAQPage.jsx
 *
 * What this is:
 *   The frequently asked questions page with a filterable accordion.
 *
 * Where it is used:
 *   App.jsx at route /faq
 *
 * What it should contain:
 *   - Two column layout
 *   - Left: sticky sidebar with title, description, category filter buttons
 *   - Right: accordion of questions grouped by category
 *   - Category filter buttons (All / Predictions / Models / Data / Platform)
 *     control which questions are visible
 *   - Accordion items open and close on click, only one open at a time
 *     (or multiple — decide during build)
 *
 * State:
 *   activeCategory   string filter controlling visible questions
 *   openItem         index of the currently open accordion item
 *
 * Data dependencies:
 *   None. All 15 questions and answers are hardcoded as a JS array
 *   at the top of this file.
 *
 * Development order:
 *   Build last. No dependencies on API or other complex components.
 */


//sanity check was done with faq page once it worked i removed it

import { groups } from '../data/FAQData.js'
import '../css/FAQPage.css'
import {useState} from 'react';
import { Link } from "react-router-dom";

export default function FAQPage() {

    const totalQuestions = groups.reduce((acc,group) => acc + group.items.length, 0);

    const [activeCat, setActiveCat] = useState("all");

    const visibleGroups = activeCat === "all" ? groups :  groups.filter(group => group.cat.toLowerCase() === activeCat.toLowerCase()); 

    const [openItem, setOpenItem] = useState(null);

    console.log("Active Category:", activeCat);
    console.log("Visible Groups:", visibleGroups);
    return (
    <div className='page'>
        <div className='faq-left'>
        <div className='faq-left-top'>
            <p className='page-eyebrow'>help & answers</p>
            <h1 className='faq-left h1'>FAQ</h1>
            <p className='faq-left p'>Common questions about the predictions, models, data, and how to use the platform.</p>
            <div className='cat-filters'>
            <div className='cat-label'>FILTER BY TOPIC</div>
            <button className={activeCat === 'all' ? 'cat-btn active' :
                'cat-btn'} onClick={() => setActiveCat("all")}>All questions
                <span className='cat-count'>{totalQuestions}</span>
                </button>
            {groups.map((group) => (
                <button key={group.cat}
                className={activeCat === group.cat ? 'cat-btn active' : 'cat-btn'}
                onClick={() => setActiveCat(group.cat)}>
                    {group.label}
                    <span className='cat-count'>{group.items.length}</span>
                </button>
            ))}
            </div>
            </div>
            <div className='faq-left-bottom'>
            Still have questions?
            View the 
            <Link to="/about"> About page </Link>
            for project background and team information.
            </div>
        </div>
        {/* left section ended */}
        <div className='faq-right'>
            {visibleGroups.map((group) => (
            <div key={group.cat} 
            className='faq-group'>{/*FAQ group begins*/}
            <div className='faq-group-label'>{group.label}
            </div>
            {group.items.map((item, index) => {
                const itemID = `${group.cat}-${index}`;
                const isOpen = openItem == itemID;
                return (
                    <div key={itemID}
                    className={`faq-item ${isOpen?'open':''}`}>
                        <button class="faq-question"
                        onClick={()=>setOpenItem(isOpen?null:itemID)}>{item.q}
                        <span class="faq-icon">
                        {isOpen?'-':'+'}
                        </span>
                        </button>
                        <div className='faq-answer'>
                        <div 
                        className='faq-answer-inner'
                        dangerouslySetInnerHTML={{ __html: item.a }}/>
                        </div>
                    </div>
                );
            })}
            </div> 
            ))}
            {/* outer map ends */}
        </div>
    </div>
    );
}

