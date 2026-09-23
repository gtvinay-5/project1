import { useMemo, useRef, useState } from "react";
import {
  Check,
  ChevronRight,
  Clock3,
  Disc3,
  Gauge,
  Heart,
  Headphones,
  ListMusic,
  MapPin,
  Menu,
  Mic2,
  MoreHorizontal,
  Music2,
  Pause,
  Play,
  Plus,
  Radio,
  Repeat2,
  Route,
  Search,
  Shuffle,
  SkipBack,
  SkipForward,
  SlidersHorizontal,
  Sparkles,
  Truck,
  Volume2,
  X,
} from "lucide-react";
import { toast } from "sonner";

type Song = {
  id: number;
  title: string;
  artist: string;
  genre: string;
  duration: string;
  tone: string;
  audioUrl?: string;
};

const songSeeds: [string, string, string, string][] = [
  ["Kash Koi Ladka Mujhe Pyaar Karta", "Alka Yagnik", "Bollywood", "4:41"],
  ["Pehla Nasha", "Udit Narayan · Sadhana Sargam", "Bollywood", "4:47"],
  ["Aankhon Se Tune Kya Keh Diya", "Kumar Sanu · Alka Yagnik", "Bollywood", "5:07"],
  ["Gulabi Aankhen", "Mohammed Rafi", "Evergreen", "3:18"],
  ["Yeh Shaam Mastani", "Kishore Kumar", "Evergreen", "4:39"],
  ["Pal Pal Dil Ke Paas", "Kishore Kumar", "Evergreen", "5:27"],
  ["Mere Sapno Ki Rani", "Kishore Kumar", "Evergreen", "4:51"],
  ["Roop Tera Mastana", "Kishore Kumar", "Evergreen", "3:43"],
  ["Chura Liya Hai Tumne", "Asha Bhosle · Mohammed Rafi", "Evergreen", "4:50"],
  ["Kya Mujhe Pyaar Hai", "K.K.", "Bollywood", "4:27"],
  ["Tum Se Hi", "Mohit Chauhan", "Bollywood", "5:21"],
  ["Iktara", "Kavita Seth", "Bollywood", "4:13"],
  ["Ilahi", "Arijit Singh", "Roadtrip", "3:45"],
  ["Safarnama", "Lucky Ali", "Roadtrip", "4:13"],
  ["Yun Hi Chala Chal", "Udit Narayan · Hariharan", "Roadtrip", "6:28"],
  ["Aao Milo Chalo", "Shaan · Ustad Sultan Khan", "Roadtrip", "5:25"],
  ["Khaabon Ke Parinday", "Mohit Chauhan · Alyssa Mendonsa", "Roadtrip", "4:14"],
  ["Phir Se Ud Chala", "Mohit Chauhan", "Roadtrip", "4:29"],
  ["Patakha Guddi", "Nooran Sisters", "Roadtrip", "4:45"],
  ["Zindagi Ek Safar Hai Suhana", "Kishore Kumar", "Roadtrip", "4:22"],
  ["Mann Mera", "Gajendra Verma", "Chill", "3:19"],
  ["Kabira", "Tochi Raina · Rekha Bhardwaj", "Chill", "3:43"],
  ["Shaam", "Amit Trivedi · Neuman Pinto", "Chill", "4:45"],
  ["Kho Gaye Hum Kahan", "Jasleen Royal · Prateek Kuhad", "Chill", "3:33"],
  ["Kasoor", "Prateek Kuhad", "Chill", "3:17"],
  ["Baarishein", "Anuv Jain", "Chill", "3:27"],
  ["Alag Aasmaan", "Anuv Jain", "Chill", "3:32"],
  ["Mishri", "Anuv Jain", "Chill", "3:12"],
  ["Tu Aake Dekhle", "King", "Chill", "4:30"],
  ["Husn", "Anuv Jain", "Chill", "3:37"],
  ["Brown Rang", "Yo Yo Honey Singh", "Punjabi", "3:44"],
  ["Lahore", "Guru Randhawa", "Punjabi", "3:22"],
  ["Naah", "Harrdy Sandhu", "Punjabi", "3:10"],
  ["Do You Know", "Diljit Dosanjh", "Punjabi", "3:41"],
  ["Proper Patola", "Diljit Dosanjh · Badshah", "Punjabi", "2:58"],
  ["Born To Shine", "Diljit Dosanjh", "Punjabi", "3:33"],
  ["Amplifier", "Imran Khan", "Punjabi", "3:52"],
  ["Mundian To Bach Ke", "Panjabi MC", "Punjabi", "4:04"],
  ["3 Peg", "Sharry Mann", "Punjabi", "3:41"],
  ["Insane", "AP Dhillon", "Punjabi", "3:25"],
  ["Brown Munde", "AP Dhillon · Gurinder Gill", "Punjabi", "4:14"],
  ["Shape of You", "Ed Sheeran", "English", "3:53"],
  ["Perfect", "Ed Sheeran", "English", "4:23"],
  ["Blinding Lights", "The Weeknd", "English", "3:20"],
  ["As It Was", "Harry Styles", "English", "2:47"],
  ["Take Me Home, Country Roads", "John Denver", "English", "3:10"],
  ["Hotel California", "Eagles", "English", "6:30"],
  ["Dreams", "Fleetwood Mac", "English", "4:18"],
  ["Africa", "Toto", "English", "4:55"],
  ["Everybody Wants To Rule The World", "Tears for Fears", "English", "4:11"],
  ["Sweet Child O' Mine", "Guns N' Roses", "English", "5:56"],
  ["Aaj Jaane Ki Zid Na Karo", "Farida Khanum", "Sufi & Ghazal", "7:12"],
  ["Afreen Afreen", "Nusrat Fateh Ali Khan", "Sufi & Ghazal", "6:44"],
  ["Tajdar-E-Haram", "Atif Aslam", "Sufi & Ghazal", "10:17"],
  ["Kun Faya Kun", "A.R. Rahman · Javed Ali", "Sufi & Ghazal", "7:50"],
  ["Arziyan", "Javed Ali · Kailash Kher", "Sufi & Ghazal", "8:39"],
  ["Chaap Tilak", "Abida Parveen", "Sufi & Ghazal", "6:01"],
  ["Allah Hoo", "Saieen Zahoor", "Sufi & Ghazal", "5:43"],
  ["Mere Rashke Qamar", "Nusrat Fateh Ali Khan", "Sufi & Ghazal", "5:43"],
  ["Bhar Do Jholi Meri", "Adnan Sami", "Sufi & Ghazal", "6:37"],
  ["Tere Bin Nahi Lagda", "Nusrat Fateh Ali Khan", "Sufi & Ghazal", "5:19"],
  ["Apna Bana Le", "Arijit Singh", "Bollywood", "4:21"],
  ["Kesariya", "Arijit Singh", "Bollywood", "4:28"],
  ["O Maahi", "Arijit Singh", "Bollywood", "3:53"],
  ["Chaleya", "Arijit Singh · Shilpa Rao", "Bollywood", "3:20"],
  ["Tere Vaaste", "Varun Jain · Shadab Faridi", "Bollywood", "3:09"],
  ["Ranjha", "B Praak", "Bollywood", "3:48"],
  ["Satranga", "Arijit Singh", "Bollywood", "4:12"],
  ["Tujh Mein Rab Dikhta Hai", "Roop Kumar Rathod", "Bollywood", "4:41"],
  ["Tum Hi Ho", "Arijit Singh", "Bollywood", "4:22"],
  ["Agar Tum Saath Ho", "Alka Yagnik · Arijit Singh", "Bollywood", "5:41"],
  ["Lukka Chuppi", "A.R. Rahman · Lata Mangeshkar", "Bollywood", "6:37"],
  ["Kun Faya Kun (Live)", "A.R. Rahman", "Sufi & Ghazal", "8:04"],
  ["Tera Ban Jaunga", "Akhil Sachdeva", "Bollywood", "3:56"],
  ["Hawayein", "Arijit Singh", "Bollywood", "4:49"],
  ["Raabta", "Arijit Singh", "Bollywood", "4:03"],
  ["Jeena Jeena", "Atif Aslam", "Bollywood", "3:48"],
  ["Aaj Din Chadheya", "Rahat Fateh Ali Khan", "Bollywood", "5:16"],
  ["Tera Yaar Hoon Main", "Arijit Singh", "Bollywood", "4:24"],
  ["Main Rang Sharbaton Ka", "Atif Aslam", "Bollywood", "4:25"],
  ["Pani Da Rang", "Ayushmann Khurrana", "Bollywood", "4:02"],
  ["Mitti Di Khushboo", "Ayushmann Khurrana", "Bollywood", "3:13"],
  ["Khaike Paan Banaraswala", "Kishore Kumar", "Evergreen", "4:00"],
  ["Neele Neele Ambar Par", "Kalyanji-Anandji", "Evergreen", "5:19"],
  ["Aap Ki Aankhon Mein Kuch", "Kishore Kumar · Lata Mangeshkar", "Evergreen", "4:08"],
  ["Humein Tumse Pyaar Kitna", "Kishore Kumar", "Evergreen", "4:19"],
  ["O Mere Dil Ke Chain", "Kishore Kumar", "Evergreen", "4:35"],
  ["Zindagi Ke Safar Mein", "Kishore Kumar", "Evergreen", "4:10"],
  ["Aane Wala Pal", "Kishore Kumar", "Evergreen", "4:38"],
  ["Ek Ajnabee Haseena Se", "Kishore Kumar", "Evergreen", "4:26"],
  ["Rimjhim Gire Saawan", "Kishore Kumar", "Evergreen", "3:16"],
  ["Musafir Hoon Yaaron", "Kishore Kumar", "Evergreen", "3:11"],
  ["Bade Achhe Lagte Hain", "Amit Kumar", "Evergreen", "5:10"],
  ["Mera Saaya Saath Hoga", "Lata Mangeshkar", "Evergreen", "6:03"],
  ["Lag Ja Gale", "Lata Mangeshkar", "Evergreen", "4:18"],
  ["Ajeeb Dastan Hai Yeh", "Lata Mangeshkar", "Evergreen", "5:16"],
  ["Yeh Mera Prem Patra", "Mohammed Rafi", "Evergreen", "4:59"],
  ["Likhe Jo Khat Tujhe", "Mohammed Rafi", "Evergreen", "4:20"],
  ["Mere Mehboob Qayamat Hogi", "Kishore Kumar", "Evergreen", "3:50"],
  ["Pukarta Chala Hoon Main", "Mohammed Rafi", "Evergreen", "4:15"],
  ["Aaj Mausam Bada Beimaan Hai", "Mohammed Rafi", "Evergreen", "4:20"],
  ["Bahon Mein Chale Aao", "Lata Mangeshkar", "Evergreen", "4:00"],
  ["Do Lafzon Ki Hai Dil Ki Kahani", "Asha Bhosle", "Evergreen", "5:43"],
  ["Mere Samne Wali Khidki Mein", "Kishore Kumar", "Evergreen", "3:29"],
];

const tones = ["coral", "amber", "violet", "teal", "blue", "rose"];
const songs: Song[] = songSeeds.slice(0, 100).map(([title, artist, genre, duration], index) => ({
  id: index + 1,
  title,
  artist,
  genre,
  duration,
  tone: tones[index % tones.length],
}));

const moods = ["All tracks", "Roadtrip", "Evergreen", "Bollywood", "Punjabi", "Chill", "Sufi & Ghazal", "English"];
const featured = songs.slice(0, 4);

function CoverArt({ song, size = "small" }: { song: Song; size?: "small" | "large" }) {
  return (
    <div className={`cover-art cover-${song.tone} ${size === "large" ? "cover-large" : ""}`} aria-hidden="true">
      <span className="cover-number">{String(song.id).padStart(2, "0")}</span>
      <span className="cover-road" />
      <span className="cover-sun" />
      <span className="cover-label">RW</span>
    </div>
  );
}

function Home() {
  const [activeSong, setActiveSong] = useState<Song>(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [query, setQuery] = useState("");
  const [activeMood, setActiveMood] = useState("All tracks");
  const [liked, setLiked] = useState<number[]>([]);
  const [showMenu, setShowMenu] = useState(false);
  const [queueOpen, setQueueOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const filteredSongs = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();
    return songs.filter((song) => {
      const matchesMood = activeMood === "All tracks" || song.genre === activeMood;
      const matchesQuery = !cleanQuery || `${song.title} ${song.artist} ${song.genre}`.toLowerCase().includes(cleanQuery);
      return matchesMood && matchesQuery;
    });
  }, [activeMood, query]);

  const playSong = (song: Song) => {
    setActiveSong(song);
    if (!song.audioUrl) {
      setIsPlaying(false);
      toast.info("Audio source not connected yet", {
        description: "This catalog has the song names ready. Add licensed MP3 URLs to start playback.",
      });
      return;
    }
    setIsPlaying(true);
    window.setTimeout(() => void audioRef.current?.play(), 0);
  };

  const togglePlayback = () => {
    if (!activeSong.audioUrl) {
      toast.info("Audio source not connected yet", {
        description: "The player UI is ready, but these tracks still need licensed audio files or URLs.",
      });
      return;
    }
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      void audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  const toggleLike = (id: number) => {
    setLiked((current) => current.includes(id) ? current.filter((songId) => songId !== id) : [...current, id]);
  };

  const nextSong = () => {
    const nextIndex = (songs.findIndex((song) => song.id === activeSong.id) + 1) % songs.length;
    playSong(songs[nextIndex]);
  };

  return (
    <div className="roadwave-app">
      <aside className={`sidebar ${showMenu ? "sidebar-open" : ""}`}>
        <div className="brand-lockup">
          <div className="brand-mark"><Music2 size={18} strokeWidth={2.5} /></div>
          <div>
            <div className="brand-name">ROADWAVE</div>
            <div className="brand-tagline">for the long haul</div>
          </div>
          <button className="mobile-close" onClick={() => setShowMenu(false)} aria-label="Close menu"><X size={18} /></button>
        </div>

        <div className="route-status">
          <div className="status-dot" />
          <div><span className="status-label">DRIVE MODE</span><strong>Active & ready</strong></div>
          <Gauge size={16} className="status-gauge" />
        </div>

        <nav className="main-nav" aria-label="Main navigation">
          <span className="nav-label">YOUR CABIN</span>
          <button className="nav-item active"><Radio size={18} /> <span>Now playing</span><span className="nav-pulse" /></button>
          <button className="nav-item" onClick={() => setQueueOpen(true)}><ListMusic size={18} /> <span>Route queue</span><span className="nav-count">{songs.length}</span></button>
          <button className="nav-item" onClick={() => setActiveMood("All tracks")}><Disc3 size={18} /> <span>All music</span></button>
          <button className="nav-item" onClick={() => setActiveMood("Chill")}><Heart size={18} /> <span>Saved for later</span></button>
        </nav>

        <nav className="main-nav secondary-nav" aria-label="Library navigation">
          <span className="nav-label">KEEP ROLLING</span>
          <button className="nav-item" onClick={() => setActiveMood("Roadtrip")}><Route size={18} /> <span>Roadtrip mix</span></button>
          <button className="nav-item" onClick={() => setActiveMood("Evergreen")}><Headphones size={18} /> <span>Old but gold</span></button>
          <button className="nav-item" onClick={() => setActiveMood("Sufi & Ghazal")}><Mic2 size={18} /> <span>Sufi nights</span></button>
        </nav>

        <div className="sidebar-bottom">
          <div className="creator-credit"><span className="creator-spark"><Sparkles size={13} /></span><span>Created by <strong>vinayafex</strong><small>Roadwave driver music</small></span></div>
          <div className="safe-note"><span className="safe-icon"><Check size={14} /></span><span>Curated for the road<br /><small>Keep eyes up. Keep music easy.</small></span></div>
          <div className="mini-profile"><div className="avatar">DM</div><div><strong>Driver mode</strong><small>Volume-friendly mix</small></div><MoreHorizontal size={17} /></div>
        </div>
      </aside>

      {showMenu && <button className="sidebar-scrim" onClick={() => setShowMenu(false)} aria-label="Close navigation" />}

      <main className="main-content">
        <header className="topbar">
          <button className="menu-trigger" onClick={() => setShowMenu(true)} aria-label="Open menu"><Menu size={21} /></button>
          <div className="breadcrumb"><span>ROADWAVE</span><ChevronRight size={14} /><strong>NOW PLAYING</strong></div>
          <div className="topbar-actions">
            <div className="signal-chip"><span className="signal-bars"><i /><i /><i /><i /></span> Offline-friendly</div>
            <button className="icon-button" onClick={() => setQueueOpen(true)} aria-label="Open queue"><ListMusic size={19} /></button>
            <button className="profile-button" aria-label="Profile"><span>DM</span></button>
          </div>
        </header>

        <div className="page-scroll">
          <section className="hero-panel">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-line" /> BUILT FOR THE MILES AHEAD</div>
              <h1>Good songs.<br /><em>Long roads.</em></h1>
              <p>Your cabin soundtrack for bus routes, night shifts and every open stretch between here and home.</p>
              <div className="hero-actions">
                <button className="primary-cta" onClick={() => playSong(songs[0])}><Play size={16} fill="currentColor" /> Start the drive</button>
                <button className="ghost-cta" onClick={() => setActiveMood("Roadtrip")}><Sparkles size={16} /> Make me a mix</button>
              </div>
            </div>
            <div className="hero-visual" aria-hidden="true">
              <div className="road-grid" />
              <div className="hero-orbit orbit-one" />
              <div className="hero-orbit orbit-two" />
              <div className="dashboard-rim" />
              <div className="hero-route-card"><MapPin size={15} /><span>DELHI → JAIPUR</span><strong>276 km to go</strong></div>
              <div className="hero-mileage">04<span>:</span>17<small> left on this mix</small></div>
            </div>
            <div className="hero-meta"><span><span className="live-dot" /> 100 SONGS READY</span><span>Vol. 03 / Night route</span></div>
          </section>

          <section className="now-strip">
            <div className="now-intro"><span className="live-eq"><i /><i /><i /><i /></span><div><span className="section-kicker">YOUR CURRENT PICK</span><strong>{activeSong.title}</strong></div></div>
            <div className="now-meta"><span>{activeSong.artist}</span><span className="dot-separator">•</span><span>{activeSong.genre}</span></div>
            <button className="strip-play" onClick={togglePlayback} aria-label={isPlaying ? "Pause current song" : "Play current song"}>{isPlaying ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}</button>
          </section>

          <section className="content-section featured-section">
            <div className="section-heading"><div><span className="section-kicker">HANDPICKED FOR YOUR ROUTE</span><h2>Start with a favorite</h2></div><button className="text-button" onClick={() => setActiveMood("All tracks")}>See all <ChevronRight size={16} /></button></div>
            <div className="featured-grid">
              {featured.map((song, index) => <button key={song.id} className={`featured-card ${activeSong.id === song.id ? "selected" : ""}`} onClick={() => playSong(song)}>
                <CoverArt song={song} size="large" />
                <div className="featured-info"><span className="card-index">0{index + 1}</span><div><strong>{song.title}</strong><span>{song.artist}</span></div><span className="card-duration">{song.duration}</span></div>
              </button>)}
            </div>
          </section>

          <section className="content-section library-section">
            <div className="section-heading library-heading"><div><span className="section-kicker">THE FULL CABIN LIBRARY</span><h2>All 100 songs</h2></div><div className="library-tools"><div className="search-box"><Search size={17} /><input aria-label="Search songs" placeholder="Search title, artist or mood" value={query} onChange={(event) => setQuery(event.target.value)} />{query && <button onClick={() => setQuery("")} aria-label="Clear search"><X size={15} /></button>}</div><button className="filter-button"><SlidersHorizontal size={16} /> Filter</button></div></div>
            <div className="mood-row" aria-label="Filter by mood">{moods.map((mood) => <button key={mood} className={`mood-chip ${activeMood === mood ? "active" : ""}`} onClick={() => setActiveMood(mood)}>{mood}</button>)}</div>
            <div className="list-header"><span>TRACK</span><span>MOOD</span><span className="duration-heading"><Clock3 size={13} /> TIME</span></div>
            <div className="song-list">
              {filteredSongs.map((song) => <div key={song.id} className={`song-row ${activeSong.id === song.id ? "current" : ""}`}>
                <button className="song-main" onClick={() => playSong(song)}><span className="row-number">{activeSong.id === song.id && isPlaying ? <span className="playing-bars"><i /><i /><i /></span> : String(song.id).padStart(2, "0")}</span><CoverArt song={song} /><span className="song-copy"><strong>{song.title}</strong><small>{song.artist}</small></span></button>
                <span className="song-genre">{song.genre}</span>
                <span className="song-end"><span className="song-duration">{song.duration}</span><button className={`heart-button ${liked.includes(song.id) ? "liked" : ""}`} onClick={() => toggleLike(song.id)} aria-label={liked.includes(song.id) ? `Remove ${song.title} from saved` : `Save ${song.title}`}><Heart size={17} fill={liked.includes(song.id) ? "currentColor" : "none"} /></button><button className="more-button" aria-label={`More options for ${song.title}`}><MoreHorizontal size={17} /></button></span>
              </div>)}
              {filteredSongs.length === 0 && <div className="empty-state"><Search size={24} /><strong>No tracks found</strong><span>Try a different title, artist or mood.</span></div>}
            </div>
            <div className="library-footer"><span>Showing {filteredSongs.length} of {songs.length} songs</span><span><span className="footer-dot" /> Built for the open road</span></div>
          </section>
        </div>
      </main>

      <div className="player-dock">
        <div className="player-now"><CoverArt song={activeSong} /><div><span className="player-label">{isPlaying ? "NOW PLAYING" : "READY WHEN YOU ARE"}</span><strong>{activeSong.title}</strong><small>{activeSong.artist}</small></div></div>
        <div className="player-controls"><div className="control-row"><button aria-label="Shuffle"><Shuffle size={17} /></button><button aria-label="Previous"><SkipBack size={18} fill="currentColor" /></button><button className="dock-play" onClick={togglePlayback} aria-label={isPlaying ? "Pause" : "Play"}>{isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}</button><button aria-label="Next" onClick={nextSong}><SkipForward size={18} fill="currentColor" /></button><button aria-label="Repeat"><Repeat2 size={17} /></button></div><div className="progress-wrap"><span>1:18</span><div className="progress-track"><span style={{ width: isPlaying ? "33%" : "22%" }} /></div><span>{activeSong.duration}</span></div></div>
        <div className="player-actions"><button aria-label="Volume"><Volume2 size={18} /></button><div className="volume-track"><span /></div><button aria-label="Open queue" onClick={() => setQueueOpen(true)}><ListMusic size={18} /></button></div>
      </div>

      <audio ref={audioRef} src={activeSong.audioUrl} onEnded={nextSong} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />

      {queueOpen && <div className="queue-modal-shell" role="dialog" aria-modal="true" aria-label="Route queue"><button className="modal-backdrop" onClick={() => setQueueOpen(false)} aria-label="Close queue" /><aside className="queue-modal"><div className="queue-header"><div><span className="section-kicker">UP NEXT ON YOUR ROUTE</span><h2>Route queue</h2></div><button className="icon-button" onClick={() => setQueueOpen(false)} aria-label="Close queue"><X size={19} /></button></div><div className="queue-route"><div className="route-icon"><Truck size={21} /></div><div><strong>Night shift mix</strong><span>100 songs · about 6 hr 18 min</span></div><button className="small-icon-button"><Plus size={16} /></button></div><div className="queue-list">{songs.slice(0, 8).map((song, index) => <button key={song.id} className={`queue-item ${activeSong.id === song.id ? "active" : ""}`} onClick={() => { playSong(song); setQueueOpen(false); }}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{song.title}</strong><small>{song.artist}</small></div>{activeSong.id === song.id ? <span className="queue-playing"><i /><i /><i /></span> : <span className="queue-time">{song.duration}</span>}</button>)}</div></aside></div>}
    </div>
  );
}

export default Home;
