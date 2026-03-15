/*
 * components/layout/TickerTape.jsx
 *
 * What this is:
 *   The horizontally scrolling stock ticker strip rendered below the Navbar
 *   on every page.
 *
 * Where it is used:
 *   App.jsx, directly below Navbar, outside the Routes block.
 *
 * What it should contain:
 *   - A continuously scrolling strip of stock symbols, prices, and change
 *     percentages (S&P 500, AAPL, MSFT, AMZN, NVDA, GOOGL, META, TSLA, JPM)
 *   - Items duplicated so the loop is seamless
 *   - Green color for positive change, red for negative
 *   - CSS animation for the scroll (no JavaScript interval needed)
 *
 * Props: none — data is hardcoded for now. Replace the array with an API
 *   call to a live market data source post-demo if desired.
 *
 * Development order:
 *   Build alongside Navbar as part of the shared layout layer.
 *   Both should be done before any page is built.
 */

import { useState, useEffect } from "react";


const FALLBACK_DATA = [
    { symbol: 'S&P 500', price: 4500.25, change: +15.30 },
    { symbol: 'AAPL', price: 150.75, change: -1.20 },
    { symbol: 'MSFT', price: 300.10, change: +2.50 },
    { symbol: 'AMZN', price: 3500.50, change: -10.00 },
    { symbol: 'NVDA', price: 220.40, change: +5.00 },
    { symbol: 'GOOGL', price: 2800.00, change: -20.00 },
    { symbol: 'META', price: 330.25, change: +3.75 },
    { symbol: 'TSLA', price: 700.00, change: -15.00 },
    { symbol: 'JPM', price: 160.50, change: +1.50 },
];

function TickerTape() {
    const [tickerData, setTickerData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // The fetch is defined as a named function 
        // So it can be called immediately on mount and inside the interval for periodic updates

        async function fetchTickerData() {
            try {
                const response = await fetch('http://localhost:5000/api/ticker');

                if (!response.ok) {
                    // Responded with an error status code
                    throw new Error(`Server error: ${response.status}`);
                }

                const data = await response.json();
                setTickerData(data);
                setError(null); // Clear any previous errors
            } catch (err) {
                console.error('Failed to fetch ticker data:', err);
                setError(err.message);

                // Use functional update to read the real current state, not the stale closure value
                setTickerData(current => current.length === 0 ? FALLBACK_DATA : current);

            } finally {
                // Either way, the component is done loading after the first attempt
                setLoading(false);
            }
        }

        fetchTickerData(); // Initial fetch on component mount

        // Re-fetch every 5 minutes to keep data fresh. 
        const interval = setInterval(fetchTickerData, 5*60*1000);

        // Clean up the interval on component unmount to prevent memory leaks
        return () => clearInterval(interval);
    }, []); // Empty dependency array means this effect runs once on mount and sets up the interval

    if (loading) {
        return (
            <div className="border-b border-border bg-ticker-bg py-2 px-12 text-left text-sm text-muted">
                Loading market data...
            </div>
        );
    }

    /* 
    * Concatenate the ticker data with itself to create a seamless loop effect. 
    * The CSS animation will scroll the entire width of the container, and by having 
    * two copies of the data back-to-back, it will appear continuous. 
    * The hover effect allows users to pause the ticker if they want to read the details. 
    */

    return (
        <div className="overflow-hidden bg-ticker-bg border-b border-border py-2">
            <div className="flex animate-ticker w-max hover:[animation-play-state:paused]">
                {tickerData.concat(tickerData).map((item, index) => (
                    <div key={index} className="flex items-center gap-1 px-7 text-sm font-medium tracking-wide border-r border-border whitespace-nowrap">
                        <span className="text-muted font-light">{item.symbol}</span>
                        <span className="text-ink">
                            {item.price !== null ? item.price.toFixed(2) : '--'}
                        </span>

                        <span className={
                            item.change === null
                                ? "text-ink"
                                : item.change >= 0
                                    ? "text-accent-green"
                                    : "text-accent-red"
                        }>
                            {item.change !== null
                                ? (item.change >= 0 ? `+${item.change.toFixed(2)}%` : `${item.change.toFixed(2)}%`)
                                : '--'}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TickerTape;
