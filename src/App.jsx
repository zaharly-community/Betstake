import { useMemo, useState } from 'react';
import { Activity, Bell, ChevronDown, ChevronRight, CircleHelp, Flame, Gamepad2, Menu, Search, ShieldCheck, Star, Ticket, Trophy, X, Zap } from 'lucide-react';

const sports = [
  { name: 'Football', icon: '⚽', count: 124 },
  { name: 'Basketball', icon: '🏀', count: 28 },
  { name: 'Tennis', icon: '🎾', count: 36 },
  { name: 'Volleyball', icon: '🏐', count: 18 },
  { name: 'Ice Hockey', icon: '🏒', count: 14 },
  { name: 'Esports', icon: '🎮', count: 22 },
];
const events = [
  { id: 1, sport: 'Football', league: 'ENGLAND · PREMIER LEAGUE', time: 'LIVE 64′', home: 'Arsenal', away: 'Chelsea', score: '2 : 1', live: true, odds: [1.82, 3.55, 4.20] },
  { id: 2, sport: 'Football', league: 'SPAIN · LA LIGA', time: '20:00', home: 'Real Madrid', away: 'Sevilla', score: '', live: false, odds: [1.44, 4.60, 6.75] },
  { id: 3, sport: 'Football', league: 'ITALY · SERIE A', time: '20:45', home: 'Inter Milan', away: 'Juventus', score: '', live: false, odds: [2.12, 3.10, 3.45] },
  { id: 4, sport: 'Basketball', league: 'NBA · REGULAR SEASON', time: '21:30', home: 'Boston Celtics', away: 'New York Knicks', score: '', live: false, odds: [1.68, 2.18] },
  { id: 5, sport: 'Tennis', league: 'ATP · SHANGHAI', time: '22:00', home: 'J. Sinner', away: 'C. Alcaraz', score: '', live: false, odds: [1.91, 1.91] },
  { id: 6, sport: 'Esports', league: 'LEAGUE OF LEGENDS · LCK', time: '22:30', home: 'T1', away: 'Gen.G', score: '', live: false, odds: [1.74, 2.02] },
];
const categories = ['Sports', 'Live', 'Casino', 'Live casino', 'Virtuals', 'Esports'];

export default function App() {
  const [activeCategory, setActiveCategory] = useState('Sports');
  const [activeSport, setActiveSport] = useState('All sports');
  const [filter, setFilter] = useState('Popular');
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [slip, setSlip] = useState([]);
  const [stake, setStake] = useState('10');
  const [slipOpen, setSlipOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const shown = useMemo(() => events.filter(e =>
    (activeSport === 'All sports' || e.sport === activeSport) &&
    (filter === 'Live' ? e.live : filter === 'Upcoming' ? !e.live : true) &&
    (!query.trim() || [e.home, e.away, e.league, e.sport].some(v => v.toLowerCase().includes(query.toLowerCase())))
  ), [activeSport, filter, query]);
  const totalOdds = slip.reduce((total, item) => total * item.odd, 1);
  const amount = Math.max(0, Number(stake) || 0);
  const potentialReturn = amount * totalOdds;

  function toggleSelection(event, outcome, odd) {
    setSlip(old => old.some(item => item.eventId === event.id && item.outcome === outcome)
      ? old.filter(item => !(item.eventId === event.id && item.outcome === outcome))
      : [...old.filter(item => item.eventId !== event.id), { eventId: event.id, home: event.home, away: event.away, outcome, odd }]);
  }

  return <div className="site-shell">
    <header className="topbar">
      <button className="icon-btn mobile-menu" aria-label="Open menu"><Menu size={20}/></button>
      <a className="brand" href="#top" aria-label="Betstake home"><span className="brand-symbol"><Zap size={21} fill="currentColor"/></span><span>BET<span>STAKE</span></span></a>
      <nav className="main-nav" aria-label="Main navigation">{categories.map(category => <button key={category} className={activeCategory === category ? 'nav-item active' : 'nav-item'} onClick={() => { setActiveCategory(category); if (category === 'Live') setFilter('Live'); else setFilter('Popular'); }}>{category === 'Live' && <span className="live-dot"/>}{category}</button>)}</nav>
      <div className="header-actions">
        <button className="icon-btn" aria-label="Search" onClick={() => setSearchOpen(v => !v)}><Search size={18}/></button>
        <button className="icon-btn notification" aria-label="Notifications"><Bell size={18}/></button>
        <button className="btn-login">Log in</button><button className="btn-join">Join now <ChevronRight size={15}/></button>
      </div>
    </header>
    {searchOpen && <div className="search-row"><Search size={17}/><input autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="Search teams, leagues or sports"/><button onClick={() => { setQuery(''); setSearchOpen(false); }} aria-label="Close search"><X size={17}/></button></div>}
    <div className="promo-strip"><span className="promo-live"><i/> LIVE SPORTS</span><span>Follow the action as it happens</span><span className="strip-separator"/><b>DEMO MODE</b><span className="strip-end">Illustrative fixtures and odds only</span></div>
    <div className="page-grid" id="top">
      <aside className="sidebar">
        <div className="side-heading">DISCOVER</div>
        <button className="side-link selected" onClick={() => { setActiveCategory('Sports'); setActiveSport('All sports'); }}><Activity size={17}/> Sports <ChevronRight size={14}/></button>
        <button className="side-link" onClick={() => setActiveCategory('Live')}><Flame size={17}/> Live betting <span className="side-count red">LIVE</span></button>
        <button className="side-link" onClick={() => setActiveCategory('Casino')}><Gamepad2 size={17}/> Casino</button>
        <button className="side-link" onClick={() => setActiveCategory('Live casino')}><CircleHelp size={17}/> Live casino</button>
        <button className="side-link" onClick={() => setActiveCategory('Virtuals')}><Zap size={17}/> Virtual sports</button>
        <div className="side-heading sport-heading">SPORTS</div>
        <button className={activeSport === 'All sports' ? 'sport-link active' : 'sport-link'} onClick={() => setActiveSport('All sports')}><span>✦</span> All sports <small>242</small></button>
        {sports.map(sport => <button key={sport.name} className={activeSport === sport.name ? 'sport-link active' : 'sport-link'} onClick={() => setActiveSport(sport.name)}><span>{sport.icon}</span>{sport.name}<small>{sport.count}</small></button>)}
        <div className="sidebar-promo"><div className="promo-badge"><Trophy size={18}/></div><small>THE ACTION NEVER STOPS</small><strong>Find your<br/>next big match.</strong><p>Explore today's featured events.</p><button onClick={() => { setFilter('Popular'); setActiveSport('All sports'); }}>Explore events <ChevronRight size={14}/></button></div>
        <div className="sidebar-footer"><ShieldCheck size={15}/> Demo experience only</div>
      </aside>
      <main className="main-content">
        <section className="hero-banner">
          <div className="hero-content"><div className="eyebrow"><span/> YOUR GAME. YOUR MOMENT.</div><h1>THE WORLD OF<br/><em>SPORTS & GAMES</em></h1><p>Every match brings a new moment. Find yours.</p><button onClick={() => { setActiveCategory('Sports'); setFilter('Live'); }}>Explore live action <ChevronRight size={16}/></button></div>
          <div className="hero-visual" aria-label="Decorative media placeholder"><div className="hero-ring ring-one"/><div className="hero-ring ring-two"/><div className="hero-ball"><span>BS</span></div><div className="hero-chip chip-one">LIVE <i/></div><div className="hero-chip chip-two">MATCH DAY</div><div className="hero-cross">✳</div></div>
          <div className="hero-count">01 <span/> 03</div>
        </section>
        <section className="quick-stats"><div><span className="quick-icon"><Activity size={17}/></span><span><b>242</b><small>Events today</small></span></div><div><span className="quick-icon fire"><Flame size={17}/></span><span><b>18</b><small>Live now</small></span></div><div><span className="quick-icon trophy"><Trophy size={17}/></span><span><b>32</b><small>Leagues</small></span></div><div className="stats-note"><i/> Demo data</div></section>
        <section className="event-section">
          <div className="section-top"><div><div className="eyebrow muted-eyebrow">DON'T MISS A MOMENT</div><h2>{activeSport === 'All sports' ? 'Top events' : activeSport + ' events'} <span>{shown.length}</span></h2></div><button className="view-control" onClick={() => { setActiveSport('All sports'); setFilter('Popular'); }}>All sports <ChevronDown size={14}/></button></div>
          <div className="event-tabs">{['Popular', 'Live', 'Upcoming'].map(item => <button key={item} className={filter === item ? 'tab-active' : ''} onClick={() => setFilter(item)}>{item}{item === 'Live' && <i/>}</button>)}<div className="tab-spacer"/><span className="odds-format">ODDS: DECIMAL <ChevronDown size={12}/></span></div>
          <div className="league-filter"><button className="league-chip active">All competitions</button><button className="league-chip">Football</button><button className="league-chip">Basketball</button><button className="league-chip">Tennis</button></div>
          <div className="events-list">{shown.length === 0 ? <div className="no-events"><Search size={23}/><b>No events found</b><span>Try a different sport or search term.</span><button onClick={() => { setQuery(''); setFilter('Popular'); setActiveSport('All sports'); }}>Reset filters</button></div> : shown.map(event => <article className="event-card" key={event.id}>
            <div className="event-league"><span className="league-ball">◈</span>{event.league}{event.live && <b className="live-badge">LIVE</b>}<button className={favorites.includes(event.id) ? 'favorite favorited' : 'favorite'} aria-label="Toggle favorite" onClick={() => setFavorites(old => old.includes(event.id) ? old.filter(id => id !== event.id) : [...old, event.id])}><Star size={15} fill={favorites.includes(event.id) ? 'currentColor' : 'none'}/></button></div>
            <div className="event-main"><div className="competitors"><div><span className="team-logo">{event.home.slice(0, 3).toUpperCase()}</span><b>{event.home}</b>{event.score && <strong>{event.score.split(' : ')[0]}</strong>}</div><div><span className="team-logo">{event.away.slice(0, 3).toUpperCase()}</span><b>{event.away}</b>{event.score && <strong>{event.score.split(' : ')[1]}</strong>}</div></div><div className={event.live ? 'event-time live-time' : 'event-time'}>{event.live && <i/>}{event.time}</div><div className={'odds-grid ' + (event.odds.length === 2 ? 'two-odds' : '')}>{event.odds.map((odd, index) => { const outcome = event.odds.length === 2 ? (index === 0 ? event.home : event.away) : ['1', 'X', '2'][index]; const active = slip.some(s => s.eventId === event.id && s.outcome === outcome); return <button key={outcome} className={active ? 'odd-button odd-selected' : 'odd-button'} onClick={() => toggleSelection(event, outcome, odd)}><span>{outcome}</span><b>{odd.toFixed(2)}</b></button>; })}</div><button className="markets-more" onClick={() => toggleSelection(event, event.home, event.odds[0])}>+18 <ChevronRight size={14}/></button></div>
          </article>)}</div>
          <button className="all-events" onClick={() => { setFilter('Popular'); setActiveSport('All sports'); }}>View all events <ChevronRight size={15}/></button>
        </section>
        <footer className="page-footer"><b>BETSTAKE <span>SPORTSBOOK DEMO</span></b><span>All events and odds are fictional examples.</span><span>EN <ChevronDown size={12}/></span></footer>
      </main>
      <aside className={'bet-panel ' + (slipOpen ? 'panel-open' : '')}>
        <div className="bet-header"><div><Ticket size={18}/><h2>Bet slip</h2><b>{slip.length}</b></div><button className="panel-close" aria-label="Close slip" onClick={() => setSlipOpen(false)}><X size={18}/></button><button className="clear-slip" disabled={!slip.length} onClick={() => setSlip([])}>Clear all</button></div>
        <div className="bet-mode"><button className="mode-active">Bet slip</button><button onClick={() => setSlip([])}>My bets <small>DEMO</small></button></div>
        {slip.length === 0 ? <div className="empty-slip"><div><Ticket size={23}/></div><b>Your slip is empty</b><p>Select odds from an event to add a pick here.</p><small><span>1</span> Choose an event <i>›</i> <span>2</span> Select odds</small></div> : <div className="slip-picks">{slip.map(item => <div className="slip-pick" key={item.eventId}><div><span>{item.home} vs {item.away}</span><button aria-label="Remove pick" onClick={() => setSlip(old => old.filter(s => s.eventId !== item.eventId))}><X size={13}/></button></div><section><span><small>Match result</small><b>{item.outcome}</b></span><strong>{item.odd.toFixed(2)}</strong></section></div>)}</div>}
        <div className="bet-calculator"><div className="total-odds"><span>Total odds</span><b>{slip.length ? totalOdds.toFixed(2) : '—'}</b></div><label htmlFor="stake">Stake <small>DEMO AMOUNT</small></label><div className="stake-input"><span>¤</span><input id="stake" type="number" min="0" value={stake} onChange={e => setStake(e.target.value)}/><small>DEMO</small></div><div className="stake-presets">{[10, 25, 50, 100].map(value => <button key={value} className={Number(stake) === value ? 'preset-active' : ''} onClick={() => setStake(String(value))}>{value}</button>)}</div><div className="return-box"><span>Potential return <CircleHelp size={13}/></span><strong>{slip.length ? potentialReturn.toFixed(2) : '0.00'} <small>¤</small></strong><div>Potential profit <b>{slip.length ? Math.max(0, potentialReturn - amount).toFixed(2) : '0.00'} ¤</b></div></div><button className="demo-bet" disabled={!slip.length || amount <= 0} onClick={() => window.alert('Demo only — no bet was placed and no money is involved.')}>Demo bet <ChevronRight size={15}/></button><p className="demo-disclaimer"><ShieldCheck size={13}/> No real bets, accounts or payments.</p></div>
        <div className="bet-panel-foot">Illustrative demo only · No real-money wagering</div>
      </aside>
    </div>
    {slip.length > 0 && <button className="mobile-betbar" onClick={() => setSlipOpen(true)}><span><Ticket size={17}/> Bet slip <b>{slip.length}</b></span><span>{totalOdds.toFixed(2)} odds <ChevronRight size={15}/></span></button>}
  </div>;
}
