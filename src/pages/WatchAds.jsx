import { useState, useEffect } from "react";

const ads = [
  {id:1, reward:38, title:"Shopping Ad", desc:"30 sec"},
  {id:2, reward:20, title:"Gaming Ad", desc:"15 sec"},
  {id:3, reward:15, title:"Finance Ad", desc:"20 sec"},
  {id:4, reward:25, title:"Food Ad", desc:"25 sec"},
  {id:5, reward:30, title:"Travel Ad", desc:"35 sec"},
  {id:6, reward:18, title:"Tech Ad", desc:"10 sec"},
];

export default function WatchAds(){
  const [coin,setCoin]=useState(12450);
  const [today,setToday]=useState(96);
  const [watched,setWatched]=useState([]);
  const [activeAd, setActiveAd]=useState(null);
  const [timer, setTimer]=useState(5);

  // timer logic
  useEffect(()=>{
    if(!activeAd) return;
    if(timer===0){
      // reward do
      setCoin(c=>c+activeAd.reward);
      setToday(t=>t+activeAd.reward);
      setWatched([...watched, activeAd.id]);
      setActiveAd(null);
      setTimer(5);
      return;
    }
    const id = setTimeout(()=>setTimer(t=>t-1), 1000);
    return ()=>clearTimeout(id);
  }, [activeAd, timer]);

  const left = 6 - watched.length;
  const progress = (watched.length/6)*100;

  return(
    <div style={{background:'#0F172A', minHeight:'100vh', color:'white', padding:'20px'}}>
      <div style={{maxWidth:'1000px', margin:'0 auto'}}>
        
        <div style={{background:'#1E293b', border:'1px solid #222', borderRadius:'28px', padding:'28px', marginBottom:'20px'}}>
          <h1 style={{margin:0}}>Watch Ads & Earn</h1>
          
          <div style={{display:'flex', gap:'12px', marginTop:'16px'}}>
            <div style={{background:'#1E293b', padding:'12px 18px', borderRadius:'12px'}}><small style={{color:'#888'}}>Total</small><div style={{color:'#eab308', fontWeight:800}}>{coin} VEs</div></div>
            <div style={{background:'#1E293b', padding:'12px 18px', borderRadius:'12px'}}><small style={{color:'#888'}}>Today</small><div style={{color:'#22c55e', fontWeight:800}}>{today} VEs</div></div>
            <div style={{background:'#1E293b', padding:'12px 18px', borderRadius:'12px'}}><small style={{color:'#888'}}>Left</small><div style={{fontWeight:800}}>{left}/6</div></div>
          </div>
          <div style={{background:'#beb3b3', height:'8px', borderRadius:'10px', marginTop:'14px'}}><div style={{background:'#eab308', height:'100%', width:`${progress}%`, transition:'0.5s', borderRadius:'10px'}}></div></div>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'14px'}}>
          {ads.map(ad=>{
            const done = watched.includes(ad.id);
            return(
              <div key={ad.id} style={{background:'#1E293b', border:`1px solid ${done?'#22c55e':'#232323'}`, borderRadius:'18px', padding:'18px', textAlign:'center'}}>
                <h4 style={{margin:'0 0 6px'}}>{ad.title}</h4>
                <span style={{background:'#eab308', color:'black', fontSize:'11px', padding:'3px 10px', borderRadius:'20px', fontWeight:700}}>+{ad.reward} VEs</span>
                <div style={{fontSize:'11px', color:'#666', margin:'8px 0'}}>{ad.desc}</div>
                <button disabled={done} onClick={()=>{setActiveAd(ad); setTimer(5);}}
                  style={{width:'100%', padding:'10px', borderRadius:'30px', border:'none', fontWeight:700, cursor:'pointer', background:done?'#22c55e':'white', color:done?'white':'black'}}>
                  {done ? '✓ Completed' : 'Watch Ad'}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* MODAL */}
      {activeAd && (
        <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.85)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:100}}>
          <div style={{background:'#181818', border:'1px solid #333', borderRadius:'20px', padding:'30px', textAlign:'center', width:'320px'}}>
            <h3>{activeAd.title} Playing...</h3>
            <div style={{fontSize:'48px', fontWeight:800, color:'#eab308', margin:'14px 0'}}>{timer}s</div>
            <p style={{color:'#888', fontSize:'13px'}}>Please wait, your reward is loading</p>
            <div style={{background:'#222', height:'6px', borderRadius:'10px', marginTop:'12px'}}><div style={{background:'#eab308', height:'100%', width:`${(5-timer)/5*100}%`, borderRadius:'10px'}}></div></div>
          </div>
        </div>
      )}
    </div>
  )
}