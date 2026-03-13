
/*
 * components/layout/Navbar.jsx
 *
 * What this is:
 *   The sticky top navigation bar rendered on every single page of the app.
 *
 * Where it is used:
 *   App.jsx, rendered outside the Routes block so it persists across navigation.
 *
 * What it should contain:
 *   - Logo mark (five stacked bars SVG) and site title on the left
 *   - Navigation links on the right using React Router <Link> components:
 *       Overview  -> /
 *       Models    -> /models
 *       Forecast  -> /models/lstm  (links to default model)
 *       About     -> /about
 *       FAQ       -> /faq  (styled as a CTA button)
 *   - Active link highlighting based on current route (useLocation hook)
 *   - Sticky positioning so it stays at the top on scroll
 *
 * Development order:
 *   Build this first. Every page test during development depends on
 *   being able to navigate between pages.
 */



//react router will switch pages without reloading the whole browser
//link is the react routers version of the <a> so it means no page reload :)
//useLocation will tell us what url we are on

import { Link, useLocation } from "react-router-dom";


//these are just the nav links and the FAQ is seperate because its a black button
//initially I looked at the pages section in the folder there were 6 pages so just followed that but now I read your comments and followed your comments :)
// So each link there is the name so what the user sees and basically a path where a user can go
//the path is what url it goes to when you click it

const navLinks = [
  { name: "Overview",    path: "/" },
  { name: "Models",      path: "/models" },
  { name: "Forecast",    path: "/models/lstm" },
  { name: "About",       path: "/about" },

  //sorry i was not sure if this was needed as the html does not have it so i removed it
  //{ name: "Evaluations", path: "/evaluations" },

];

// The 5 bar chart bars that are next to the stock prediction website name
// was hard but I just tried matching the logo bars
// In my mind is it that green bars = stock up and red bars mean stock down 

function TheLogoBars() {
  return (
    <div className="flex items-end gap-[2.5px] h-[18px]">
      <span className="w-1 bg-[#1D9E75]" style={{ height: "8px"  }}></span>
      <span className="w-1 bg-[#1D9E75]" style={{ height: "14px" }}></span>
      <span className="w-1 bg-[#e05c5c]" style={{ height: "10px" }}></span>
      <span className="w-1 bg-[#1D9E75]" style={{ height: "18px" }}></span>
      <span className="w-1 bg-[#e05c5c]" style={{ height: "12px" }}></span>

    </div>
  );
}

// Navbar component
export default function Navbar() {

  //location pathname will give us the current url for example "/about"
  const location = useLocation();

  //going to return true if the link matches to the current page on
  function isActive(path) {
    if (path === "/") {
      return location.pathname === "/";
    }

    //I also encountered another issue which I have fixed now. because the models lstm started with models it was making both models and forecast bold when i clicked on forecast but now i fixed it by doing two different if statements
    if (path === "/models") {
      return location.pathname === "/models";
    }

    return location.pathname.startsWith(path);
  }
  return (
    <nav className="flex items-center justify-between px-12 h-16 bg-[#f8f7f4] border-b border-[#e0ddd6] sticky top-0 z-[100]">
      
      {/* the logo and the app name */}
      <div className="flex items-center gap-[10px] font-medium text-[0.95rem] tracking-[0.01em]">
        <TheLogoBars />
        Stock Market Prediction
      </div>

      <ul className="flex gap-9 list-none m-0 p-0">

        {/* Looping through the navLinks and creating an <a> tag for each one */}
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              to={link.path}

              //initally I did face an issue with the boldness but realised that the bold might not have been showing due to tailwind conflicting so i changed to semibold instead of medium and also removed font normal
              className={`no-underline text-sm tracking-[0.02em] transition-colors duration-200 ${
                isActive(link.path)
                ? "text-[#111] font-semibold"
                : "text-[#888] hover:text-[#111]"
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}

        {/* FAQ button cuz it's different from the others. its seperate from the regular links */}
        <li>
            <Link
          
            to="/faq"
            className={`no-underline px-[18px] py-2 rounded-md text-sm font-medium transition-opacity duration-200 ${
              isActive("/faq")
              ? "bg-[#333] text-[#f8f7f4]"
              : "bg-[#111] text-[#f8f7f4] hover:opacity-75"
            }`}
          >
            FAQ
          </Link>
        </li>

      </ul>
    </nav>
  );
}

