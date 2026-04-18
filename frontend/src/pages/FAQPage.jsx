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

import { groups } from '../data/FAQData.js';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function FAQPage() {
  const totalQuestions = groups.reduce((acc, group) => acc + group.items.length, 0);

  const [activeCat, setActiveCat] = useState('all');

  const visibleGroups =
    activeCat === 'all'
      ? groups
      : groups.filter((group) => group.cat.toLowerCase() === activeCat.toLowerCase());

  const [openItem, setOpenItem] = useState(null);

  return (
    <div className="flex flex-col px-4 md:grid md:grid-cols-[320px_1fr] md:px-0 md:pl-12 items-start">
      {/* Left sidebar */}
      <div className="relative w-full py-6 border-b border-[var(--color-border)] flex flex-col justify-start items-start gap-4 bg-[var(--color-off-white)] md:sticky md:top-[104px] md:h-[calc(100vh-104px)] md:py-10 md:pr-12 md:border-b-0 md:border-r md:justify-between md:gap-0 md:overflow-y-auto">
        <div className="w-full pt-4 md:pt-6">
          {/* Eyebrow */}
          <p
            className="text-[0.72rem] font-medium tracking-[0.12em] uppercase mb-0 leading-none"
            style={{ color: 'var(--color-muted)' }}
          >
            help &amp; answers
          </p>

          {/* Title */}
          <h1
            className="font-serif text-[2.5rem] leading-none mt-0 mb-5"
            style={{ color: 'var(--color-ink)' }}
          >
            FAQ
          </h1>

          {/* Description */}
          <p
            className="text-[0.85rem] leading-relaxed font-light mb-5 max-w-[280px]"
            style={{ color: 'var(--color-muted)' }}
          >
            Common questions about the predictions, models, data, and how to use the platform.
          </p>

          {/* Category filters */}
          <div className="flex flex-col gap-1.5 w-full md:mb-12">
            <div
              className="text-[0.68rem] font-medium tracking-[0.1em] uppercase mb-3"
              style={{ color: 'var(--color-muted)' }}
            >
              FILTER BY TOPIC
            </div>

            <button
              className={`bg-transparent border-none text-left text-[0.85rem] font-normal cursor-pointer py-2 px-3 rounded-md transition-colors duration-150 flex items-center gap-2 ${
                activeCat === 'all'
                  ? 'bg-[var(--color-ink)] text-[var(--color-off-white)]'
                  : 'text-[var(--color-muted)] hover:bg-[var(--color-border)] hover:text-[var(--color-ink)]'
              }`}
              onClick={() => setActiveCat('all')}
            >
              All questions
              <span
                className={`ml-auto text-[0.7rem] px-1.5 py-0.5 rounded-full ${
                  activeCat === 'all'
                    ? 'bg-white/15 opacity-50'
                    : 'bg-[var(--color-border)] text-[var(--color-muted)]'
                }`}
              >
                {totalQuestions}
              </span>
            </button>

            {groups.map((group) => (
              <button
                key={group.cat}
                className={`bg-transparent border-none text-left text-[0.85rem] font-normal cursor-pointer py-2 px-3 rounded-md transition-colors duration-150 flex items-center gap-2 ${
                  activeCat === group.cat
                    ? 'bg-[var(--color-ink)] text-[var(--color-off-white)]'
                    : 'text-[var(--color-muted)] hover:bg-[var(--color-border)] hover:text-[var(--color-ink)]'
                }`}
                onClick={() => setActiveCat(group.cat)}
              >
                {group.label}
                <span
                  className={`ml-auto text-[0.7rem] px-1.5 py-0.5 rounded-full ${
                    activeCat === group.cat
                      ? 'bg-white/15 opacity-50'
                      : 'bg-[var(--color-border)] text-[var(--color-muted)]'
                  }`}
                >
                  {group.items.length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom link */}
        <div
          className="text-[0.78rem] font-light leading-relaxed mt-4"
          style={{ color: 'var(--color-muted)' }}
        >
          Still have questions? View the
          <Link
            to="/about"
            className="underline underline-offset-[3px]"
            style={{ color: 'var(--color-ink)' }}
          >
            {' '}
            About page{' '}
          </Link>
          for project background and team information.
        </div>
      </div>

      {/* Right content - FAQ accordion */}
      <div className="py-6 w-full md:py-12 md:px-14 flex-grow">
        {visibleGroups.map((group) => (
          <div key={group.cat} className="mb-10">
            {/* Group label */}
            <div
              className="text-[0.68rem] font-medium tracking-[0.12em] uppercase mb-3 pb-2.5 border-b border-[var(--color-border)]"
              style={{ color: 'var(--color-muted)' }}
            >
              {group.label}
            </div>

            {group.items.map((item, index) => {
              const itemID = `${group.cat}-${index}`;
              const isOpen = openItem === itemID;
              return (
                <div
                  key={itemID}
                  className={`border-b border-[var(--color-border)] overflow-hidden last:border-b-0`}
                >
                  <button
                    className="w-full bg-transparent border-none text-[0.92rem] font-normal text-left cursor-pointer py-4 flex items-center justify-between gap-4 transition-colors duration-200 hover:text-[var(--color-muted)]"
                    style={{ color: 'var(--color-ink)' }}
                    onClick={() => setOpenItem(isOpen ? null : itemID)}
                  >
                    {item.q}
                    <span
                      className={`w-5 h-5 rounded-full border flex items-center justify-center text-[0.9rem] flex-shrink-0 transition-all duration-200 ${
                        isOpen
                          ? 'bg-[var(--color-ink)] border-[var(--color-ink)] text-[var(--color-off-white)]'
                          : 'border-[var(--color-border)] text-[var(--color-muted)]'
                      }`}
                    >
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-[400px]' : 'max-h-0'
                    }`}
                  >
                    <div
                      className="pb-5 text-[0.87rem] leading-relaxed font-light [&_strong]:text-[var(--color-ink)] [&_strong]:font-medium [&_a]:text-[var(--color-ink)] [&_a]:underline-offset-[3px]"
                      style={{ color: 'var(--color-muted)' }}
                      dangerouslySetInnerHTML={{ __html: item.a }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
