/*! fulbarianews.com - pore chalano script (defer). Theme theke soriye ekhane rakha. */
/* ==== PA sections (Layout) JS ==== */
try{

(function(){
  var lead=document.querySelector('section.lead-section'); if(!lead||document.querySelector('.pa-all'))return;
  var cfg=[].map.call(document.querySelectorAll('#pa-sections .pa-cfg'),function(d){return {t:(d.getAttribute('data-title')||'').trim(),k:(d.getAttribute('data-layout')||'').replace(/<[^>]*>/g,'').trim().toLowerCase()};}).filter(function(c){return c.t&&/^(pa|bd|wd|en|ls|col)$/.test(c.k);});
  if(!cfg.length)return;
  var bn=function(n){return String(n).replace(/\d/g,function(d){return '০১২৩৪৫৬৭৮৯'[d];});};
  var ago=function(iso){var s=(Date.now()-new Date(iso).getTime())/1000;if(isNaN(s))return '';if(s<3600)return bn(Math.max(1,Math.floor(s/60)))+' মিনিট আগে';if(s<86400)return bn(Math.floor(s/3600))+' ঘণ্টা আগে';if(s<2592000)return bn(Math.floor(s/86400))+' দিন আগে';var d=new Date(iso);return bn(d.getDate())+' '+['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'][d.getMonth()]+' '+bn(d.getFullYear());};
  var e=function(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');};
  var img=function(u,sz){sz=String(sz).replace(/-h\d+-c$/,'');return u?u.replace(/\/s\d+(-c)?\//,'/'+sz+'/').replace(/=s\d+(-c)?$/,'='+sz):'';};
  var noimg='data:image/svg+xml;charset=utf-8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10"><rect width="16" height="10" fill="#e9edf2"/></svg>');
  var cut=function(s,n){s=String(s||'').replace(/\s+/g,' ').trim();return s.length>n?s.slice(0,n).replace(/\s+\S*$/,'')+'…':s;};
  var I=function(x,sz,lz){return '<img'+(lz===0?'':' loading="lazy"')+' src="'+e(img(x.i,sz)||noimg)+'" alt="'+e(x.t)+'"/>';};
  var V=function(x,big,ex){return x?'<a class="pb-v'+(big?' big':'')+'" href="'+e(x.u)+'">'+I(x,big?'w800-h600-c':'w480-h320-c')+'<h3>'+e(x.t)+'</h3>'+(ex&&x.s?'<p>'+e(cut(x.s,big?150:110))+'</p>':'')+'<span class="pb-tm">'+ago(x.d)+'</span></a>':'';};
  var F=function(x,ex,cls){return x?'<a class="pb-f'+(cls||'')+'" href="'+e(x.u)+'">'+I(x,'w320-h213-c')+'<h3>'+e(x.t)+'</h3>'+(ex&&x.s?'<p>'+e(cut(x.s,130))+'</p>':'')+'<span class="pb-tm">'+ago(x.d)+'</span></a>':'';};
  var pre=function(s){return s.replace(/ড়/g,'ড়').replace(/ঢ়/g,'ঢ়').replace(/য়/g,'য়');};
  var dec=function(s){return s.replace(/ড়/g,'ড়').replace(/ঢ়/g,'ঢ়').replace(/য়/g,'য়');};
  var url=function(l){return '/search/label/'+encodeURIComponent(l);};
  var chev='<svg viewBox="0 0 9 15"><path d="M1.5 1.5l6 6-6 6" stroke="#d0021b" stroke-width="2.2" fill="none"/></svg>';
  var head=function(c){return '<div class="pb-head"><a href="'+url(c.l)+'">'+e(c.t)+chev+'</a></div>';};
  var L={
    bd:function(p){return '<div class="pb-g pb-bd"><div class="pb-c1">'+V(p[0],1,1)+'</div><div class="pb-c2">'+p.slice(1,4).map(function(x){return F(x,1);}).join('')+'</div>'+(p.length>4?'<div class="pb-c3">'+p.slice(4,6).map(function(x){return F(x,0,' sm');}).join('')+'</div>':'')+'</div>';},
    wd:function(p){return '<div class="pb-g pb-wd"><div class="pb-c1">'+V(p[0],1,1)+'</div><div class="pb-q">'+p.slice(1,5).map(function(x){return V(x,0,0);}).join('')+'</div></div>';},
    en:function(p){return '<div class="pb-g pb-en"><div class="pb-c2">'+p.slice(1,4).map(function(x){return F(x,0);}).join('')+'</div><div class="pb-c1">'+V(p[0],1,1)+'</div>'+(p.length>4?'<div class="pb-c2">'+p.slice(4,7).map(function(x){return F(x,0);}).join('')+'</div>':'')+'</div>';},
    ls:function(p){return '<div class="pb-g pb-ls">'+p.slice(0,4).map(function(x){return V(x,0,1);}).join('')+'</div>';}
  };
  var N={pa:6,bd:6,wd:5,en:7,ls:4,col:3};
  var wrap=document.createElement('div'); wrap.className='pa-all'; lead.parentNode.insertBefore(wrap,lead.nextSibling);
  var row=null,adUsed=false;
  var uls=document.querySelectorAll('#PopularPosts1 .latest-news-ul');
  var fromUl=function(ul){return ul?[].map.call(ul.querySelectorAll('li a'),function(a){var h=a.querySelector('h1,h2,h3,h4');return {u:a.href,t:(h||a).textContent.trim()};}).filter(function(x){return x.t;}):[];};
  var fill=function(pane,list){pane.innerHTML=list.slice(0,5).map(function(x,i){return '<li><a href="'+e(x.u)+'"><span class="pa-n">'+bn(i+1)+'</span><span class="pa-t">'+e(x.t)+'</span></a></li>';}).join('');};
  cfg.forEach(function(c){
    c.l=pre(c.t);
    if(c.k==='col'){
      if(!row||row.cnt>=4){var s=document.createElement('section');s.className='pc-sec';s.innerHTML='<div class="container custom-container"><div class="pc-row"></div></div>';wrap.appendChild(s);row={el:s.querySelector('.pc-row'),cnt:0};}
      c.el=document.createElement('div');c.el.className='pc-col';c.el.style.display='none';c.el.innerHTML=head(c)+'<div class="pc-body"></div>';row.el.appendChild(c.el);row.cnt++;return;
    }
    row=null;
    c.el=document.createElement('section');
    if(c.k==='pa'){
      c.el.className='pa-sec';
      c.el.innerHTML='<div class="container custom-container"><div class="pa-grid"><aside class="pa-side"><div class="pa-tabs"><button type="button" class="on" data-p="0">সর্বশেষ</button><button type="button" data-p="1">জনপ্রিয়</button><button type="button" data-p="2">'+e(c.t)+'</button></div><ol class="pa-pane on"></ol><ol class="pa-pane"></ol><ol class="pa-pane"></ol></aside>'+
        '<div class="pa-main"><div class="pa-head"><i></i><a href="'+url(c.l)+'">'+e(c.t)+'</a></div><div class="pa-body"><div class="pa-center"></div><div class="pa-right"><div class="pa-ad"></div><div class="pa-list"></div></div></div></div></div></div>';
      var ad=c.el.querySelector('.pa-ad'),adw=document.querySelector('#pa-ad .widget');
      if(!adUsed&&adw&&(adw.textContent.trim().length+adw.querySelectorAll('img,iframe,ins,script').length)>0){ad.appendChild(document.getElementById('pa-ad'));adUsed=true;}
      else ad.innerHTML='<div class="pa-ad-ph"><b>বিজ্ঞাপন দিন</b><span>৩০০ × ২৫০</span></div>';
      var btns=c.el.querySelectorAll('.pa-tabs button'),panes=c.el.querySelectorAll('.pa-pane');
      [].forEach.call(btns,function(b){b.addEventListener('click',function(){[].forEach.call(btns,function(x){x.classList.remove('on');});[].forEach.call(panes,function(x){x.classList.remove('on');});b.classList.add('on');panes[+b.getAttribute('data-p')].classList.add('on');});});
      c.panes=panes; (function(panes){var nu=function(u){return String(u||'').split('?')[0].split('#')[0].replace(/^https?:/,'');};var popL=fromUl(document.querySelector('#popNews-tab-pane .latest-news-ul')||uls[1]||uls[0]);fill(panes[1],popL);var lx=new XMLHttpRequest();lx.open('GET','/feeds/posts/summary?alt=json&max-results=10');lx.onloadend=function(){var L=[];try{L=(JSON.parse(lx.responseText).feed.entry||[]).map(function(t){var k=(t.link||[]).filter(function(z){return z.rel==='alternate';})[0];return {u:k?k.href:'#',t:t.title.$t};});}catch(err){}if(!L.length)L=fromUl(document.querySelector('#endNews-tab-pane .latest-news-ul')||uls[0]);fill(panes[0],L);var top={};L.slice(0,5).forEach(function(x){top[nu(x.u)]=1;});var P=popL.filter(function(x){return !top[nu(x.u)];});fill(panes[1],P.length>=5?P:popL);};lx.send();})(panes);
    } else {
      c.el.className='pb-sec'; c.el.style.display='none';
      c.el.innerHTML='<div class="container custom-container">'+head(c)+'<div class="pb-body"></div></div>';
    }
    wrap.appendChild(c.el);
  });
  var parse=function(txt){try{return (JSON.parse(txt).feed.entry||[]).map(function(t){var k=(t.link||[]).filter(function(z){return z.rel==='alternate';})[0];return {u:k?k.href:'#',t:t.title.$t,d:t.published.$t,i:t.media$thumbnail&&t.media$thumbnail.url,s:t.summary&&t.summary.$t};});}catch(err){return [];}};
  var get=function(l,n,cb){var x=new XMLHttpRequest();x.open('GET','/feeds/posts/summary/-/'+encodeURIComponent(l)+'?alt=json&max-results='+n);x.onloadend=function(){cb(parse(x.responseText));};x.send();};
  var shown={},got=0;
  var pick=function(all,n){return all.slice(0,n);};
  var render=function(){
    [].forEach.call(document.querySelectorAll('.lead-section a'),function(a){shown[a.href]=1;});
    cfg.forEach(function(c){
      var all=c.posts||[]; if(!all.length){if(c.k==='pa')c.el.style.display='none';return;}
      var p=pick(all,N[c.k]);
      if(c.k==='col'){c.el.querySelector('.pc-body').innerHTML=V(p[0],0,0)+p.slice(1,3).map(function(x){return '<a class="pc-t" href="'+e(x.u)+'"><h3>'+e(x.t)+'</h3></a>';}).join('');c.el.style.display='';return;}
      if(c.k==='pa'){
        c.el.querySelector('.pa-center').innerHTML='<a class="pa-lead" href="'+e(p[0].u)+'">'+I(p[0],'w900-h600-c',0)+'<div class="pa-ov"><h3>'+e(p[0].t)+'</h3><span class="pa-tm">'+ago(p[0].d)+'</span></div></a>'+
          '<div class="pa-cards">'+p.slice(1,3).map(function(x){return '<a class="pa-card" href="'+e(x.u)+'">'+I(x,'w480-h320-c')+'<h3>'+e(x.t)+'</h3><span class="pa-tm">'+ago(x.d)+'</span></a>';}).join('')+'</div>';
        c.el.querySelector('.pa-list').innerHTML=p.slice(3,6).map(function(x){return '<a class="pa-item" href="'+e(x.u)+'"><div class="pa-x"><h3>'+e(x.t)+'</h3><span class="pa-tm">'+ago(x.d)+'</span></div>'+I(x,'w240-h160-c')+'</a>';}).join('');
        var rest=all.filter(function(x){return p.indexOf(x)<0;}); fill(c.panes[2],all);
        return;
      }
      c.el.querySelector('.pb-body').innerHTML=L[c.k](p); c.el.style.display='';
    });
  };
  cfg.forEach(function(c){
    var n=c.k==='pa'?20:14;
    get(c.l,n,function(p){
      var d2=dec(c.t); if(d2===c.l){c.posts=p;if(++got===cfg.length)render();return;}
      get(d2,n,function(q){var seen={},all=p.concat(q).filter(function(x){if(seen[x.u])return false;seen[x.u]=1;return true;});all.sort(function(a,b){return new Date(b.d)-new Date(a.d);});c.posts=all.slice(0,n);if(++got===cfg.length)render();});
    });
  });
})();

}catch(e){console.error("fn-late: PA sections Layout JS",e)}

/* ==== PA post sidebar JS ==== */
try{

if(window.SF&&!SF.on('sidebar')){}else (function(){var tries=0;var run=function(){
  var t=document.querySelector('.detils-right-title'); if(t&&t.parentElement.classList.contains('pa-more'))return;
  if(!t||!t.parentElement.querySelector('.more-news-single')){if(tries++<40)setTimeout(run,300);return;}
  var box=t.parentElement; box.classList.add('pa-more');
  var here=location.href.split(/[?#]/)[0];
  [].forEach.call(box.querySelectorAll('.more-news-single>a'),function(l){if(l.href.split(/[?#]/)[0]===here){var c=l.closest('[class*="col-"]');if(c)c.classList.add('pa-self');}});
};run();})();

}catch(e){console.error("fn-late: PA post sidebar JS",e)}

/* ==== Living Assistance + Brief JS ==== */
try{

(function(){
  var run=function(){
  var lead=document.querySelector('section.lead-section'); if(!lead||document.querySelector('.la-sec'))return;
  var SFo=window.SF||{on:function(){return true;},get:function(f,k,d){return d;}}; var LAon=SFo.on('living'), BRon=SFo.on('brief'); if(!LAon&&!BRon)return;
  var esc=function(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');};
  var LAT=parseFloat(SFo.get('living','lat',''))||24.633, LON=parseFloat(SFo.get('living','lon',''))||90.275, PLACE=SFo.get('living','place','ফুলবাড়ীয়া'), AREA=SFo.get('living','area','ফুলবাড়ীয়া, ময়মনসিংহ');
  var bn=function(x){return String(x).replace(/\d/g,function(d){return '০১২৩৪৫৬৭৮৯'[d];});};
  var en=function(x){return String(x).replace(/[০-৯]/g,function(d){return '০১২৩৪৫৬৭৮৯'.indexOf(d);});};
  var grp=function(n){return bn(Math.round(n).toLocaleString('en-IN'));};
  var ls={get:function(k){try{var v=JSON.parse(localStorage.getItem(k));if(v&&Date.now()-v.t<v.ttl)return v.d;}catch(e){}return null;},set:function(k,d,ttl){try{localStorage.setItem(k,JSON.stringify({t:Date.now(),ttl:ttl,d:d}));}catch(e){}}};
  var getJ=function(u,k,ttl,cb){if(!LAon)return;var c=ls.get(k+'-'+LAT+'-'+LON);k=k+'-'+LAT+'-'+LON;if(c){cb(c);return;}var x=new XMLHttpRequest();x.open('GET',u);x.onload=function(){try{var d=JSON.parse(x.responseText);ls.set(k,d,ttl);cb(d);}catch(e){cb(null);}};x.onerror=function(){cb(null);};x.send();};
  var chev='<svg class="la-ch" viewBox="0 0 8 13"><path d="M1.5 1.5l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';
  var dk=new Date(Date.now()+(new Date().getTimezoneOffset()+360)*60000); // Dhaka time
  var ico={
    mosque:'<svg viewBox="0 0 24 24"><path fill="#2e8b57" d="M12 2c.6 1.6 2.4 2.4 2.4 4.3A2.4 2.4 0 0 1 12 8.7a2.4 2.4 0 0 1-2.4-2.4C9.6 4.4 11.4 3.6 12 2zM5 10h14c0 1.5-.6 2.5-1.6 3H6.6C5.6 12.5 5 11.5 5 10zm1 4h12v8h-4v-4a2 2 0 0 0-4 0v4H6z"/></svg>',
    gold:'<svg viewBox="0 0 24 24"><path fill="#e0a800" d="M7 10h10l3 5H4zM3 16h8l1.5 4h-11zm10 0h8l1.5 4h-11z"/><path fill="#f6c94c" d="M8.5 4h7l1.5 5H7z"/></svg>',
    usd:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#1e9e5a"/><path fill="#fff" d="M12.8 6v1.1c1.3.2 2.3 1 2.5 2.3h-1.6c-.1-.6-.7-1-1.6-1-.9 0-1.6.4-1.6 1.1 0 .6.5.9 1.8 1.2 1.9.4 3.2 1 3.2 2.7 0 1.3-1 2.3-2.7 2.5V18h-1.5v-1.1c-1.5-.2-2.6-1.1-2.7-2.5h1.6c.1.7.8 1.2 1.9 1.2 1 0 1.7-.5 1.7-1.2 0-.6-.5-.9-1.9-1.2-1.8-.4-3.1-1-3.1-2.6 0-1.2 1-2.1 2.5-2.4V6z"/></svg>'
  };
  var wx=function(c,day){
    var sun='<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" fill="#ffb300"/><g stroke="#ffb300" stroke-width="2" stroke-linecap="round"><path d="M12 1.5v2.5M12 20v2.5M1.5 12H4M20 12h2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8"/></g></svg>';
    var moon='<svg viewBox="0 0 24 24"><path fill="#f2c94c" d="M20 15.5A8.5 8.5 0 0 1 8.5 4a8.5 8.5 0 1 0 11.5 11.5z"/></svg>';
    var cloud='<path fill="#8fb3d9" d="M7 19a4.5 4.5 0 0 1-.6-9A6 6 0 0 1 18 11a4 4 0 0 1-.5 8z"/>';
    var cl='<svg viewBox="0 0 24 24">'+cloud+'</svg>';
    var pc='<svg viewBox="0 0 24 24">'+(day?'<circle cx="8" cy="8" r="4" fill="#ffb300"/>':'<path fill="#f2c94c" d="M12 9A5 5 0 0 1 5.5 2.6 5 5 0 1 0 12 9z"/>')+cloud+'</svg>';
    var rain='<svg viewBox="0 0 24 24"><path fill="#7a9cc6" d="M7 15a4.5 4.5 0 0 1-.6-9A6 6 0 0 1 18 7a4 4 0 0 1-.5 8z"/><path stroke="#3b82f6" stroke-width="2" stroke-linecap="round" d="M8 18l-1 3M12 18l-1 3M16 18l-1 3"/></svg>';
    var storm='<svg viewBox="0 0 24 24"><path fill="#6b7f99" d="M7 15a4.5 4.5 0 0 1-.6-9A6 6 0 0 1 18 7a4 4 0 0 1-.5 8z"/><path fill="#ffb300" d="M12 14l-3 5h3l-1 4 4-6h-3l1-3z"/></svg>';
    var fog='<svg viewBox="0 0 24 24"><g stroke="#9aa9b8" stroke-width="2" stroke-linecap="round"><path d="M4 8h16M2 12h18M5 16h15M7 20h10"/></g></svg>';
    if(c===0)return [day?sun:moon,'পরিষ্কার আকাশ'];
    if(c<=2)return [pc,'আংশিক মেঘলা'];
    if(c===3)return [cl,'মেঘলা'];
    if(c===45||c===48)return [fog,'কুয়াশা'];
    if(c>=51&&c<=57)return [rain,'গুঁড়ি গুঁড়ি বৃষ্টি'];
    if((c>=61&&c<=67)||(c>=80&&c<=82))return [rain,'বৃষ্টি'];
    if(c>=95)return [storm,'বজ্রসহ বৃষ্টি'];
    return [cl,'মেঘলা'];
  };
  var aq=function(v){return v<=50?['#00a65a','ভালো']:v<=100?['#d4a900','মাঝারি']:v<=150?['#f58220','সংবেদনশীলদের জন্য অস্বাস্থ্যকর']:v<=200?['#e3242b','অস্বাস্থ্যকর']:v<=300?['#8f3f97','খুব অস্বাস্থ্যকর']:['#7e0023','ঝুঁকিপূর্ণ'];};
  var t12=function(hm){var p=hm.split(':'),h=+p[0],m=p[1].slice(0,2);var h2=h%12||12;return bn(h2+':'+m);};

  var sec=document.createElement('div'); sec.className='container custom-container la-sec';
  sec.innerHTML='<div class="la-box"><div class="la-hd"><span>'+esc(SFo.get('living','title','প্রয়োজনীয় তথ্য'))+'</span><small>'+esc(AREA)+'</small></div>'+
   '<div class="la-rw"><div class="la-row">'+
    '<button type="button" class="la-card la-pray"><span class="la-t">নামাজের সময়'+chev+'</span><span class="la-v">'+ico.mosque+'<b class="la-big">—</b><small></small></span></button>'+
    '<button type="button" class="la-card la-gold"><span class="la-t">স্বর্ণের দাম'+chev+'</span><span class="la-v">'+ico.gold+'<b class="la-big">—</b><small></small></span></button>'+
    '<div class="la-card la-wx"><span class="la-t">'+esc(PLACE)+'র আবহাওয়া</span><span class="la-v"><i class="la-wi"></i><b class="la-big">—</b><small></small></span></div>'+
    '<div class="la-card la-usd"><span class="la-t">ডলার রেট</span><span class="la-v">'+ico.usd+'<b class="la-big">—</b><small></small></span></div>'+
    '<div class="la-card la-aq"><span class="la-t">বায়ুর মান</span><span class="la-v"><i class="la-aqb">—</i><b class="la-big la-aqt">—</b></span></div>'+
   '</div><button type="button" class="la-nx" aria-label="আরও">'+chev+'</button></div>'+
   '<div class="la-pp" hidden></div><div class="la-pp la-gp" hidden></div></div>'+
   '<div class="br-box" hidden><div class="br-hd"><div class="br-ti"><b><svg viewBox="0 0 24 24"><path fill="#7c3aed" d="M10 2l1.8 5.2L17 9l-5.2 1.8L10 16l-1.8-5.2L3 9l5.2-1.8zM18 13l.9 2.6 2.6.9-2.6.9L18 20l-.9-2.6-2.6-.9 2.6-.9z"/></svg>'+esc(SFo.get('brief','title','সংক্ষিপ্ত আপডেট'))+'</b><small>ফুলবাড়ীয়া নিউজ · সর্বশেষ খবরের সারাংশ</small></div>'+
   '<div class="br-nav"><button type="button" class="br-pv" aria-label="আগের">‹</button><span class="br-ix"></span><button type="button" class="br-nx2" aria-label="পরের">›</button><button type="button" class="br-x" aria-label="বন্ধ করুন">×</button></div></div>'+
   '<div class="br-bd"><h3 class="br-h"></h3><p class="br-p"></p></div>'+
   '<div class="br-ft"><a class="br-more" href="#">বিস্তারিত পড়ুন</a><button type="button" class="br-tts"><svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4" height="7" rx="1.5" fill="currentColor"/><rect x="17" y="14" width="4" height="7" rx="1.5" fill="currentColor"/></svg><span>শুনুন</span></button></div></div>';
  lead.appendChild(sec);
  var $=function(s){return sec.querySelector(s);};
  if(!LAon)$('.la-box').style.display='none';
  if(!BRon)$('.br-box').style.display='none';
  if(LAon&&/^(top|upore|উপরে)$/i.test(String(SFo.get('living','position','bottom')).trim())){var tw=document.createElement('div');tw.className='container custom-container la-sec la-top la-compact';tw.appendChild($('.la-box'));var tk=lead.querySelector('.news-ticker-wrapper'),tc=tk&&tk.closest('.container');if(tc&&tc.parentNode===lead)lead.insertBefore(tw,tc.nextSibling);else lead.insertBefore(tw,lead.firstChild);$=function(q){return sec.querySelector(q)||tw.querySelector(q);};[].forEach.call(tw.querySelectorAll('.la-card'),function(c){var t=c.querySelector('.la-t');if(t)c.title=t.textContent.trim();});}
  if(/^(off|no|false|0|বন্ধ|না)$/i.test(String(SFo.get('brief','listen','on')).trim()))sec.classList.add('br-nolisten');
  (function(){var CARDS=String(SFo.get('living','cards','namaz, gold, weather, dollar, aqi')).toLowerCase().split(/[,\s]+/).filter(Boolean),CM={namaz:'.la-pray',gold:'.la-gold',weather:'.la-wx',dollar:'.la-usd',aqi:'.la-aq'},rw=$('.la-row');Object.keys(CM).forEach(function(k){if(CARDS.indexOf(k)<0)$(CM[k]).style.display='none';});CARDS.forEach(function(k){if(CM[k])rw.appendChild($(CM[k]));});})();
  var row=$('.la-row');
  $('.la-nx').onclick=function(){row.scrollBy({left:row.clientWidth*.7,behavior:'smooth'});};

  // Prayer times (Karachi method, Hanafi Asr - as used in Bangladesh)
  var d2=('0'+dk.getDate()).slice(-2)+'-'+('0'+(dk.getMonth()+1)).slice(-2)+'-'+dk.getFullYear();
  getJ('https://api.aladhan.com/v1/timings/'+d2+'?latitude='+LAT+'&longitude='+LON+'&method=1&school=1','la-pr-'+d2,864e5,function(d){
    var T=d&&d.data&&d.data.timings; if(!T){$('.la-pray').style.display='none';return;}
    /*mw-if: namaz page (/p/namaz-sehri-iftar-time.html) er sathe milate Islamic Foundation er moto kichu minute jog*/var OF={Fajr:1,Dhuhr:4,Maghrib:4,Isha:3};T=JSON.parse(JSON.stringify(T));Object.keys(OF).forEach(function(k){if(!T[k])return;var q=T[k].split(':'),m=+q[0]*60+(+q[1].slice(0,2))+OF[k];T[k]=('0'+Math.floor(m/60)).slice(-2)+':'+('0'+m%60).slice(-2);});
    var L=[['ফজর','Fajr'],['সূর্যোদয়','Sunrise'],['যোহর','Dhuhr'],['আসর','Asr'],['মাগরিব','Maghrib'],['এশা','Isha']];
    var tick=function(){
      var now=new Date(Date.now()+(new Date().getTimezoneOffset()+360)*60000), nm=now.getHours()*60+now.getMinutes(), nx=null;
      L.forEach(function(p){ if(p[1]==='Sunrise'||nx)return; var q=T[p[1]].split(':'),m=+q[0]*60+(+q[1].slice(0,2)); if(m>nm)nx=[p,m]; });
      if(!nx){var q=T.Fajr.split(':');nx=[L[0],+q[0]*60+(+q[1].slice(0,2))+1440];}
      var left=nx[1]-nm, h=Math.floor(left/60), mm=left%60;
      $('.la-pray .la-big').textContent=nx[0][0]+' '+t12(T[nx[0][1]]);
      $('.la-pray small').textContent='বাকি '+(h?bn(h)+' ঘ. ':'')+bn(mm)+' মি.';
      $('.la-pp').innerHTML='<div class="la-ppt">আজকের নামাজের সময়সূচি · '+esc(PLACE)+'</div><div class="la-ppg">'+L.map(function(p){return '<div class="'+(p===nx[0]?'on':'')+'"><span>'+p[0]+'</span><b>'+t12(T[p[1]])+'</b></div>';}).join('')+'</div><div class="la-ppn">* সময় স্থানীয়ভাবে ১–২ মিনিট কম-বেশি হতে পারে</div><a class="la-ppl" href="/p/namaz-sehri-iftar-time.html" style="display:inline-block;margin-top:10px;font-weight:700;color:#c8102e;text-decoration:none">সেহরি-ইফতার ও পুরো মাসের সময়সূচি →</a>';
    };
    tick(); setInterval(tick,30000);
  });
  var pnl=function(btn,p,o,ob){p.hidden=!p.hidden;btn.classList.toggle('on',!p.hidden);o.hidden=true;ob.classList.remove('on');};
  $('.la-pray').onclick=function(){pnl(this,$('.la-pp'),$('.la-gp'),$('.la-gold'));};
  $('.la-gold').onclick=function(){pnl(this,$('.la-gp'),$('.la-pp'),$('.la-pray'));};

  // Gold (BAJUS, per-gram price set from Layout)
  var gc=document.querySelector('#la-cfg .la-gcfg'), G=[];
  if(gc){var tx=document.createElement('textarea');tx.innerHTML=gc.innerHTML.replace(/<br\s*\/?>/gi,'\n').replace(/<[^>]+>/g,'\n');
    tx.value.split(/\n|;/).forEach(function(l){var m=en(l.trim()).match(/^(.*?)[:=\-–]?\s*(\d[\d,]*(?:\.\d+)?)\s*(?:টাকা|tk|\/-)?$/i);if(m){var v=parseFloat(m[2].replace(/,/g,''));if(v>0)G.push({l:bn(m[1].replace(/[:=\-–\s]+$/,'').trim())||'২২ ক্যারেট',v:v});}});}
  if(G.length){ $('.la-gold .la-big').textContent='৳'+grp(G[0].v*11.664); $('.la-gold small').textContent='প্রতি ভরি · '+G[0].l;
    $('.la-gp').innerHTML='<div class="la-ppt">আজকের স্বর্ণের দাম · বাজুস</div><div class="la-ppg la-g4">'+G.map(function(g,n){return '<div class="'+(n?'':'on')+'"><span>'+g.l+'</span><b>৳'+grp(g.v*11.664)+'</b><small>প্রতি গ্রাম ৳'+grp(g.v)+'</small></div>';}).join('')+'</div><div class="la-ppn">* দাম প্রতি ভরি (১১.৬৬৪ গ্রাম) · সূত্র: <a href="https://www.bajus.org/gold-price" target="_blank" rel="noopener">বাজুস</a></div>'; }
  else $('.la-gold').style.display='none';

  // Weather + AQI (Open-Meteo)
  getJ('https://api.open-meteo.com/v1/forecast?latitude='+LAT+'&longitude='+LON+'&current=temperature_2m,relative_humidity_2m,weather_code,is_day&timezone=Asia%2FDhaka','la-wx',18e5,function(d){
    var c=d&&d.current; if(!c){$('.la-wx').style.display='none';return;}
    var w=wx(c.weather_code,c.is_day); $('.la-wi').innerHTML=w[0];
    $('.la-wx .la-big').textContent=bn(Math.round(c.temperature_2m))+'°সে';
    $('.la-wx small').textContent=w[1]+' · আর্দ্রতা '+bn(c.relative_humidity_2m)+'%';
  });
  getJ('https://air-quality-api.open-meteo.com/v1/air-quality?latitude='+LAT+'&longitude='+LON+'&current=us_aqi&timezone=Asia%2FDhaka','la-aq',18e5,function(d){
    var v=d&&d.current&&d.current.us_aqi; if(v==null){$('.la-aq').style.display='none';return;}
    var a=aq(v); var b=$('.la-aqb'); b.textContent=bn(Math.round(v)); b.style.background=a[0]; $('.la-aqt').textContent=a[1];
  });
  // USD -> BDT
  getJ('https://open.er-api.com/v6/latest/USD','la-fx',36e5,function(d){
    var r=d&&d.rates; if(!r||!r.BDT){$('.la-usd').style.display='none';return;}
    $('.la-usd .la-big').textContent='৳'+bn(r.BDT.toFixed(2));
    $('.la-usd small').textContent='১ ডলার'+(r.SAR?' · রিয়াল ৳'+bn((r.BDT/r.SAR).toFixed(2)):'');
  });

  // Brief update (latest posts summary)
    if(!BRon)return;
  var box=$('.br-box'), items=[], loc=null, open=false;
  var RE=/^\s*[^|•]{1,45}?\s*[|•]\s+/;
  var ss=null, voice=null, tts=null, au=null, q=[], qi=0;
  var stop=function(){if(ss)ss.cancel();if(au){au.onended=null;au.onerror=null;au.pause();}q=[];qi=0;if(tts){tts.classList.remove('on');tts.querySelector('span').textContent='শুনুন';}};
  var sents=function(s){return String(s||'').replace(/\s+/g,' ').trim().replace(/([।!?])\s+/g,'$1\n').split('\n').filter(Boolean);};
  var clip=function(s,max){var p=sents(s),o='';for(var k=0;k<p.length;k++){if((o+p[k]).length>max&&o)break;o+=(o?' ':'')+p[k];}return o.length>max+40?o.slice(0,max).replace(/\s+\S*$/,'')+'…':o;};
  var pcx=function(t){return t.replace(/\u09a1\u09bc/g,'\u09dc').replace(/\u09a2\u09bc/g,'\u09dd').replace(/\u09af\u09bc/g,'\u09df');};
  var NB=Math.min(10,Math.max(1,parseInt(SFo.get('brief','posts','5'),10)||5));
  var LOC=String(SFo.get('brief','local','ফুলবাড়ীয়া')).trim();
  var ent=function(e){var a=(e.link||[]).filter(function(l){return l.rel==='alternate';})[0];var c=(e.category||[]).map(function(z){return z.term;});return a?{u:a.href,t:e.title.$t.replace(RE,''),s:e.summary?e.summary.$t:'',c:c[0]||''}:null;};
  var feed=function(u,cb){var x=new XMLHttpRequest();x.open('GET',u);x.onloadend=function(){var r=[];try{r=(JSON.parse(x.responseText).feed.entry||[]).map(ent).filter(Boolean);}catch(err){}cb(r);};x.send();};
  var arr='<svg viewBox="0 0 12 12"><path d="M3.5 8.5l5-5M4.5 3.5h4v4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>';
  var chip=function(u){return '<a class="br-chip" href="'+esc(u)+'">পড়ুন'+arr+'</a>';};
  ['.br-pv','.br-ix','.br-nx2'].forEach(function(z){var e=$(z);if(e)e.parentNode.removeChild(e);});
  var mo=$('.br-more'), tg=document.createElement('button'); tg.type='button'; tg.className='br-tg'; mo.parentNode.replaceChild(tg,mo);
  var setOpen=function(v){open=v;box.classList.toggle('open',v);tg.innerHTML=(v?'সংক্ষেপ করুন':'বিস্তারিত দেখুন')+'<svg viewBox="0 0 12 12"><path d="'+(v?'M2.5 7.5l3.5-3.5 3.5 3.5':'M2.5 4.5l3.5 3.5 3.5-3.5')+'" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';};
  setOpen(false); tg.onclick=function(){stop();setOpen(!open);};
  var render=function(){var top=items[0];if(!top)return;
    var h='<div class="br-top"><h3 class="br-h">'+esc(top.t)+'</h3><p class="br-p">'+esc(clip(top.s,340))+'</p>'+chip(top.u)+'</div>';
    var rest=items.slice(1,NB+1);
    if(rest.length)h+='<ul class="br-ul">'+rest.map(function(x){return '<li>'+(x.c?'<b>'+esc(x.c)+'</b> : ':'')+esc(clip(x.s,170)||x.t)+' '+chip(x.u)+'</li>';}).join('')+'</ul>';
    if(loc)h+='<div class="br-dev"><h4>'+esc(LOC)+'</h4><h3 class="br-h">'+esc(loc.t)+'</h3><p>'+esc(clip(loc.s,280))+'</p>'+chip(loc.u)+'</div>';
    $('.br-bd').innerHTML=h;};
  feed('/feeds/posts/summary?alt=json&max-results='+(NB+1),function(r){items=r;if(!items.length)return;box.hidden=false;render();
    if(LOC&&!/^(off|no|বন্ধ|না)$/i.test(LOC))feed('/feeds/posts/summary/-/'+encodeURIComponent(pcx(LOC))+'?alt=json&max-results=6',function(L){var seen={};items.forEach(function(x){seen[x.u]=1;});loc=L.filter(function(x){return !seen[x.u];})[0]||null;render();});});
  $('.br-x').onclick=function(){stop();box.hidden=true;};
  var ttsText=function(){var t=items[0].t+'। '+clip(items[0].s,340);if(open){items.slice(1,NB+1).forEach(function(x){t+=' '+(x.c?x.c+'। ':'')+(clip(x.s,170)||x.t);});if(loc)t+=' '+LOC+'। '+loc.t+'। '+clip(loc.s,280);}return t;};
  // Text to speech: button inside a no-referrer iframe (iPhone Safari needs tap + audio in one document)
  var chunk=function(t){var out=[];sents(t).forEach(function(x){x=x.trim();while(x.length>180){var k=x.lastIndexOf(' ',180);if(k<60)k=180;out.push(x.slice(0,k));x=x.slice(k).trim();}if(x)out.push(x);});return out;};
  var gsrc=function(t){return 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=bn&q='+encodeURIComponent(t);};
  var playG=function(){if(qi>=q.length){stop();return;}au.src=gsrc(q[qi]);var p=au.play();if(p&&p.catch)p.catch(function(){stop();});};
  var old=$('.br-tts'), ifr=document.createElement('iframe'); ifr.className='br-tts-f'; ifr.title='শুনুন'; ifr.setAttribute('referrerpolicy','no-referrer'); ifr.setAttribute('scrolling','no'); ifr.setAttribute('allowtransparency','true');
  ifr.srcdoc='<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="referrer" content="no-referrer"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+Bengali:wght@600&display=swap"><style>html,body{margin:0;padding:0;background:transparent;overflow:hidden}button{display:inline-flex;align-items:center;gap:6px;background:#fff;border:0;border-radius:8px;padding:8px 16px;margin:4px;font:600 15px/1.3 "Noto Serif Bengali",system-ui,sans-serif;color:#111;box-shadow:0 1px 3px rgba(0,0,0,.15);cursor:pointer;-webkit-tap-highlight-color:transparent;white-space:nowrap}button.on{background:#0b5cb8;color:#fff}svg{width:17px;height:17px}</style></head><body>'+old.outerHTML.replace(/\shidden(="")?/,'')+'</body></html>';
  old.parentNode.replaceChild(ifr,old);
  ifr.onload=function(){var w=ifr.contentWindow,d=ifr.contentDocument;tts=d.querySelector('button');if(!tts)return;ss=w.speechSynthesis||null;
    var fit=function(){ifr.style.width=(tts.offsetWidth+8)+'px';ifr.style.height=(tts.offsetHeight+8)+'px';};fit();setTimeout(fit,400);setTimeout(fit,1500);if(d.fonts&&d.fonts.ready)d.fonts.ready.then(fit);
    var pickV=function(){if(!ss)return;voice=ss.getVoices().filter(function(v){return /^bn/i.test(v.lang);})[0]||null;};
    if(ss){pickV();if(ss.addEventListener)ss.addEventListener('voiceschanged',pickV);}
    tts.onclick=function(){if(tts.classList.contains('on')){stop();return;}if(!items[0])return;var chunks=chunk(ttsText());tts.classList.add('on');tts.querySelector('span').textContent='থামান';fit();
      if(voice){ss.cancel();chunks.forEach(function(c,n){var u=new w.SpeechSynthesisUtterance(c);u.voice=voice;u.lang=voice.lang;u.rate=.95;if(n===chunks.length-1)u.onend=stop;ss.speak(u);});return;}
      if(!au){au=new w.Audio();au.setAttribute('playsinline','');au.preload='auto';}au.onended=function(){qi++;playG();};au.onerror=function(){qi++;playG();};q=chunks;qi=0;playG();};
  };
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run); else run();
})();

}catch(e){console.error("fn-late: Living Assistance + Brief JS",e)}

/* ==== Bookmark JS ==== */
try{

if(window.SF&&!SF.on('bookmark')){}else (function(){
  var K='fn_bookmarks', PAGE='/p/bookmarks.html';
  var P='M17 3H7a2 2 0 0 0-2 2v16l7-3 7 3V5a2 2 0 0 0-2-2zm0 15-5-2.18L7 18V5h10v13z', PF='M17 3H7a2 2 0 0 0-2 2v16l7-3 7 3V5a2 2 0 0 0-2-2z';
  var TR='M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9zm-2 3h10v13H7V6zm2 2v9h2V8H9zm4 0v9h2V8h-2z';
  var svg=function(d){return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="'+d+'"/></svg>';};
  var bn=function(n){return String(n).replace(/\d/g,function(d){return '০১২৩৪৫৬৭৮৯'[d];});};
  var esc=function(s){return String(s||'').replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});};
  var norm=function(u){return String(u||'').split(/[?#]/)[0].replace(/^http:/,'https:');};
  var get=function(){try{var a=JSON.parse(localStorage.getItem(K));return Array.isArray(a)?a.filter(function(b){return b&&b.url&&b.url.indexOf(location.hostname.replace(/^www\./,''))>-1&&b.id===norm(b.url);}):[];}catch(e){return [];}};
  var set=function(a){try{localStorage.setItem(K,JSON.stringify(a));}catch(e){}badge();};
  var has=function(id){return get().some(function(b){return b.id===id;});};
  var tt;var toast=function(m){var t=document.querySelector('.fnbm-toast');if(!t){t=document.createElement('div');t.className='fnbm-toast';t.setAttribute('role','status');document.body.appendChild(t);}t.textContent=m;t.classList.add('show');clearTimeout(tt);tt=setTimeout(function(){t.classList.remove('show');},2200);};
  var badge=function(){var n=get().length;[].forEach.call(document.querySelectorAll('.fnbm-count'),function(c){c.textContent=n>99?'৯৯+':bn(n);c.classList.toggle('has',n>0);});};
  var heads=function(){
    var ep=document.querySelector('.aj-actions .aj-live:not(.fnbm-head)');
    if(ep&&!document.querySelector('.fnbm-head')){var h=document.createElement('a');h.className='aj-live fnbm-head';h.href=PAGE;h.title='বুকমার্ক';h.setAttribute('aria-label','বুকমার্ক');h.innerHTML='<b class="fnbm-ico">'+svg(P)+'<i class="fnbm-count"></i></b><span>বুকমার্ক</span>';ep.parentNode.insertBefore(h,ep);try{window.dispatchEvent(new Event('resize'));}catch(e){}setTimeout(function(){try{window.dispatchEvent(new Event('resize'));}catch(e){}},800);}
    var me=document.querySelector('.mm-actions .mm-ep:not(.mm-bm)');
    if(me&&!document.querySelector('.mm-bm')){var b=document.createElement('a');b.className='mm-ep mm-bm';b.href=PAGE;b.innerHTML=svg(P)+'<span>বুকমার্ক</span><i class="fnbm-count"></i>';me.parentNode.insertBefore(b,me);}
  };
  var postImg=function(){var i=document.querySelector('#post-body img,.post-body img');if(i)return i.getAttribute('data-src')||i.src;var m=document.querySelector('meta[property="og:image"]');return m&&m.content?m.content:'';};
  var postBtn=function(){
    var top=document.querySelector('.details-content-top'); if(!top||document.querySelector('.fnbm-btn'))return;
    var r=top.querySelector('.small-right')||document.querySelector('.small-right'); if(!r)return;
    var url=norm(location.origin+location.pathname), id=url;
    var h1=top.querySelector('h1'), title=(h1?h1.textContent:document.title).replace(/\s+/g,' ').trim();
    var btn=document.createElement('button'); btn.type='button'; btn.className='fnbm-btn';
    var paint=function(){var on=has(id);btn.classList.toggle('on',on);btn.innerHTML=svg(on?PF:P)+'<span>'+(on?'সেভ হয়েছে':'বুকমার্ক')+'</span>';btn.title=on?'বুকমার্ক থেকে সরান':'পরে পড়ার জন্য সেভ করুন';btn.setAttribute('aria-pressed',on?'true':'false');};
    btn.addEventListener('click',function(){var l=get();if(has(id)){set(l.filter(function(b){return b.id!==id;}));toast('বুকমার্ক থেকে সরানো হয়েছে');}else{l.unshift({id:id,title:title,url:url,img:postImg(),t:Date.now()});set(l);toast('বুকমার্কে সেভ হয়েছে');}paint();});
    paint(); r.insertBefore(btn,r.firstChild);
    if(!document.querySelector('.fn-gsrc')&&!(window.SF&&/^(off|no|বন্ধ|না)$/i.test(String(SF.get('bookmark','google','on')).trim()))){var gs=document.createElement('a');gs.className='fn-gsrc';gs.href='https://www.google.com/preferences/source?q='+encodeURIComponent(location.hostname.replace(/^www\./,''));gs.target='_blank';gs.rel='noopener';gs.title='Google-এ ফুলবাড়ীয়া নিউজকে পছন্দসই সোর্স হিসেবে যোগ করুন';gs.innerHTML='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M43.6 20.1H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z" fill="#FFC107"/><path d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" fill="#FF3D00"/><path d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" fill="#4CAF50"/><path d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" fill="#1976D2"/></svg><span>পছন্দসই সোর্সে যোগ করুন</span>';r.insertBefore(gs,btn.nextSibling);}
    window.addEventListener('storage',function(e){if(e.key===K)paint();});
  };
  var MO=['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'];
  var page=function(){
    var root=document.getElementById('fn-bookmarks'); if(!root)return; var l=get();
    if(!l.length){root.innerHTML='<div class="fnbm-empty">'+svg(P)+'<b>এখনও কোনো বুকমার্ক নেই</b><span>যেকোনো খবরের পাতায় "বুকমার্ক" বাটনে চাপ দিয়ে পরে পড়ার জন্য সেভ করে রাখুন।</span><a href="/">প্রচ্ছদে যান</a></div>';return;}
    root.innerHTML='<div class="fnbm-top"><span>'+bn(l.length)+'টি সেভ করা খবর</span><button class="fnbm-clear" type="button">সব মুছুন</button></div><div class="fnbm-grid">'+l.map(function(b){var d=new Date(b.t);var ds=isNaN(d)?'':'সেভ করা: '+bn(d.getDate())+' '+MO[d.getMonth()]+' '+bn(d.getFullYear());var im=b.img?String(b.img).replace(/\/s\d+(-c)?\//,'/w600-h400-c/').replace(/=s\d+(-c)?$/,'=w600-h400-c'):'';return '<article class="fnbm-card"><a class="fnbm-img" href="'+esc(b.url)+'">'+(im?'<img loading="lazy" alt="'+esc(b.title)+'" src="'+esc(im)+'"/>':'<span></span>')+'</a><button class="fnbm-del" type="button" data-id="'+esc(b.id)+'" aria-label="মুছুন" title="মুছুন">'+svg(TR)+'</button><h3><a href="'+esc(b.url)+'">'+esc(b.title)+'</a></h3><time>'+ds+'</time></article>';}).join('')+'</div>';
  };
  document.addEventListener('click',function(e){
    var d=e.target.closest&&e.target.closest('.fnbm-del');
    if(d){var id=d.getAttribute('data-id');set(get().filter(function(b){return b.id!==id;}));page();toast('বুকমার্ক থেকে সরানো হয়েছে');return;}
    if(e.target.closest&&e.target.closest('.fnbm-clear')&&confirm('সব বুকমার্ক মুছে ফেলবেন?')){set([]);page();toast('সব বুকমার্ক মুছে ফেলা হয়েছে');}
  });
  window.addEventListener('storage',function(e){if(e.key===K){badge();page();}});
  var init=function(){heads();postBtn();page();badge();};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init); else init();
  setTimeout(function(){heads();postBtn();badge();},1500);
})();

}catch(e){console.error("fn-late: Bookmark JS",e)}

/* ==== Aro Porun (inline related) ==== */
try{

(function(){
  function go(){
    var pb=document.querySelector('.post-body'); if(!pb||!document.querySelector('.details-content-top')||/^\/p\//.test(location.pathname)||pb.querySelector('.fn-more'))return;
    var P=[].filter.call(pb.children,function(e){return e.tagName==='P'&&e.textContent.trim().length>40;});
    var L=P.length, n=L<3?0:L<7?1:L<11?2:L<16?3:4; if(!n)return;
    var bn=function(s){return String(s).replace(/\d/g,function(x){return '০১২৩৪৫৬৭৮৯'[x];});};
    var MO=['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'];
    var ago=function(iso){var d=new Date(iso),m=Math.floor((Date.now()-d)/60000); if(isNaN(m))return ''; if(m<1)return 'এইমাত্র'; if(m<60)return bn(m)+' মিনিট আগে'; var h=Math.floor(m/60); if(h<24)return bn(h)+' ঘণ্টা আগে'; var dd=Math.floor(h/24); if(dd<7)return bn(dd)+' দিন আগে'; return bn(d.getDate())+' '+MO[d.getMonth()]+' '+bn(d.getFullYear());};
    var esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});};
    var here=location.href.split(/[?#]/)[0].replace(/^https?:/,'');
    var cat=document.querySelector('.details-category-title a:last-of-type'), lab='';
    if(cat){var m=(cat.getAttribute('href')||'').match(/\/search\/label\/([^?#]+)/); lab=m?decodeURIComponent(m[1]):cat.textContent.trim();}
    var get=function(url,cb){var x=new XMLHttpRequest(); x.open('GET',url); x.onload=function(){try{cb(JSON.parse(x.responseText).feed.entry||[]);}catch(e){cb([]);}}; x.onerror=function(){cb([]);}; x.send();};
    var parse=function(e){var u='';(e.link||[]).forEach(function(l){if(l.rel==='alternate')u=l.href;}); var im=e.media$thumbnail?e.media$thumbnail.url.replace(/\/s\d+(-c)?\//,'/w240-h160-c/').replace(/=s\d+(-c)?$/,'=w240-h160-c'):''; return {t:e.title.$t,u:u,d:e.published.$t,i:im};};
    var fill=function(list){
      var seen={}; list=list.filter(function(p){var k=p.u.replace(/^https?:/,''); if(!p.u||k===here||seen[k])return false; seen[k]=1; return true;});
      for(var i=1;i<=n&&list.length;i++){
        var p=list.shift(), at=P[Math.max(0,Math.round(L*i/(n+1))-1)];
        var box=document.createElement('div'); box.className='fn-more';
        box.innerHTML='<div class="fn-more-h">আরও পড়ুন</div><a href="'+esc(p.u)+'"><div class="fn-more-tx"><h4>'+esc(p.t)+'</h4><time datetime="'+esc(p.d)+'">'+ago(p.d)+'</time></div>'+(p.i?'<img loading="lazy" src="'+esc(p.i)+'" alt="" loading="lazy">':'')+'</a>';
        at.parentNode.insertBefore(box,at.nextSibling);
      }
    };
    var all='/feeds/posts/summary?alt=json&max-results=15';
    if(lab){get('/feeds/posts/summary/-/'+encodeURIComponent(lab)+'?alt=json&max-results=15',function(a){var l=a.map(parse); if(l.length>n){fill(l);}else{get(all,function(b){fill(l.concat(b.map(parse)));});}});}
    else get(all,function(b){fill(b.map(parse));});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go); else go();
})();

}catch(e){console.error("fn-late: Aro Porun inline related",e)}

/* ==== fn-react ==== */
try{

/*fn-react v2 (Prothom Alo style, protikriya bodlano/batil kora jay): post er niche ❤️ 👏 🙂 ☹️ protikriya (Firebase Realtime DB, project: views-count-cadfd, path: fnReact)*/
(function(){
  if(!/^\/\d{4}\/\d{2}\/.+\.html$/.test(location.pathname))return;
  var pb=document.querySelector('.post-body');if(!pb||document.querySelector('.fnr'))return;
  var el=document.querySelector('[id^="post-body-"]'),pid=el?el.id.replace('post-body-',''):'';
  if(!/^\d{6,}$/.test(pid)){var m=document.documentElement.innerHTML.match(/postId['"]?\s*[:=]\s*['"]?(\d{6,})/);pid=m?m[1]:'';}
  if(!pid){var h=5381,p=location.pathname;for(var i=0;i<p.length;i++)h=((h*33)^p.charCodeAt(i))>>>0;pid='p'+h.toString(36);}
  var DB='https://views-count-cadfd-default-rtdb.firebaseio.com/fnReact/'+pid,LS='fnr_'+pid;
  var S='stroke="#c8102e" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"';
  var HAND='M9.6 21.2c-2.9 0-5.2-2.3-5.2-5.2v-4.3c0-.7.6-1.3 1.3-1.3s1.3.6 1.3 1.3v1.6L10.9 6c.4-.6 1.1-.8 1.7-.4.6.4.8 1.1.4 1.7l-2.5 4.3 4.1-6.9c.4-.6 1.1-.8 1.7-.4.6.4.8 1.1.4 1.7l-3.9 6.7 3.1-5.2c.4-.6 1.1-.8 1.7-.4.6.4.8 1.1.4 1.7l-3.2 5.5 1.9-3.2c.4-.6 1.1-.8 1.7-.4.6.4.8 1.1.4 1.7l-3 5.1c-1.2 2.3-3.4 3.6-5.9 3.6z';
  var face=function(m){return '<svg viewBox="0 0 24 24" '+S+'><circle class="fc" cx="12" cy="12" r="9.5"/><circle class="in" cx="8.9" cy="9.6" r="1.15" fill="#c8102e" stroke="none"/><circle class="in" cx="15.1" cy="9.6" r="1.15" fill="#c8102e" stroke="none"/><path class="in" d="'+m+'"/></svg>';};
  var R=[
    ['love','ভালোবাসা','<svg viewBox="0 0 24 24" '+S+'><path class="bg" d="M12 20s-7.6-4.6-9.2-9.3C1.7 7.4 3.8 4.3 7.1 4.3c2 0 3.6 1.1 4.9 2.9 1.3-1.8 2.9-2.9 4.9-2.9 3.3 0 5.4 3.1 4.3 6.4C19.6 15.4 12 20 12 20z"/></svg>'],
    ['clap','তালি','<svg viewBox="0 0 24 24" '+S+'><g transform="translate(-2.2 -.6) rotate(-14 9 15)"><path class="bg" d="'+HAND+'"/></g><g transform="translate(.9 .5) scale(.93)"><path class="bg hf" d="'+HAND+'"/></g><path d="M16.6 2.4l.3-1.3M19.1 3.5l1-1M20.5 5.9l1.3-.3"/></svg>'],
    ['happy','খুশি',face('M8 14c.9 1.6 2.3 2.5 4 2.5s3.1-.9 4-2.5')],
    ['sad','দুঃখ',face('M8 17c.9-1.6 2.3-2.5 4-2.5s3.1.9 4 2.5')]
  ];
  var bn=function(n){return String(n).replace(/\d/g,function(d){return '০১২৩৪৫৬৭৮৯'[d];});};
  if(!document.getElementById('fnr-css')){var st=document.createElement('style');st.id='fnr-css';st.textContent=
   '.fnr{margin:28px 0 24px;border-top:3px solid #c8102e;background:#fff5f6;padding:20px 14px 16px;text-align:center;clear:both}'+
   '.fnr-q{font-weight:700;font-size:17px;line-height:1.5;margin:0 0 14px;color:#222}'+
   '.fnr-row{display:flex;justify-content:center;gap:40px;flex-wrap:wrap}'+
   '.fnr-b{background:none!important;border:0!important;box-shadow:none!important;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:7px;padding:4px!important;margin:0;font:inherit;color:#555;min-width:52px}'+
   '.fnr-b svg{width:46px;height:46px;display:block;transition:transform .15s}.fnr-b .bg{fill:#ffd6dc}.fnr-b .fc{fill:none}'+
   '.fnr-b:hover svg{transform:scale(1.12)}.fnr-b.on svg{transform:scale(1.1)}.fnr-b.on .bg,.fnr-b.on .fc{fill:#c8102e}.fnr-b.on .hf{stroke:#fff}.fnr-b.on path.in{stroke:#fff}.fnr-b.on circle.in{fill:#fff}'+
   '.fnr-p{font-size:14.5px;color:#555;line-height:1.2}.fnr-b.top .fnr-p{font-weight:700;color:#222}.fnr-b.top .fnr-p:before{content:"\\2605";color:#f5b301;margin-right:3px}.fnr-b.on .fnr-p{color:#c8102e;font-weight:700}'+
   '.fnr-n{font-size:12.5px;color:#888;margin-top:12px;min-height:1em}.fnr.busy .fnr-b{pointer-events:none}'+
   '@media(max-width:575px){.fnr-row{gap:18px}.fnr-b svg{width:38px;height:38px}.fnr-q{font-size:16px}}';
   document.head.appendChild(st);}
  var box=document.createElement('div');box.className='fnr';
  box.innerHTML='<div class="fnr-q">খবরটি পড়ে আপনার প্রতিক্রিয়া কী?</div><div class="fnr-row">'+R.map(function(r){return '<button type="button" class="fnr-b" data-r="'+r[0]+'" aria-label="'+r[1]+'" title="'+r[1]+'">'+r[2]+'<span class="fnr-p">০%</span></button>';}).join('')+'</div><div class="fnr-n"></div>';
  var pc=pb.parentNode.querySelector('.mwpc-btn');
  if(pc&&pc.parentNode)pc.parentNode.insertBefore(box,pc.nextSibling);else pb.parentNode.insertBefore(box,pb.nextSibling);
  var C={love:0,clap:0,happy:0,sad:0},mine=null;try{mine=localStorage.getItem(LS);}catch(e){}
  var pct=function(v,t){if(!t)return '০%';var p=Math.round(v*1000/t)/10;return bn(p%1?p.toFixed(1):p)+'%';};
  var draw=function(){
    var tot=0,mx=0,top=null;R.forEach(function(r){tot+=C[r[0]]||0;});
    R.forEach(function(r){var v=C[r[0]]||0;if(v>mx){mx=v;top=r[0];}});
    [].forEach.call(box.querySelectorAll('.fnr-b'),function(b){var k=b.getAttribute('data-r'),v=C[k]||0;
      b.querySelector('.fnr-p').textContent=pct(v,tot);
      b.classList.toggle('top',!!tot&&k===top);b.classList.toggle('on',k===mine);b.setAttribute('aria-pressed',k===mine?'true':'false');});
    box.querySelector('.fnr-n').textContent=(tot?('মোট '+bn(tot)+' জন প্রতিক্রিয়া জানিয়েছেন'):'প্রথম প্রতিক্রিয়াটি আপনার হোক')+(mine?' · বদলাতে অন্য আইকনে, বাতিল করতে একই আইকনে চাপুন':'');
  };
  draw();
  var load=function(){return fetch(DB+'.json',{cache:'no-store'}).then(function(r){return r.json();}).then(function(d){R.forEach(function(r){C[r[0]]=d&&typeof d==='object'?(+d[r[0]]||0):0;});draw();}).catch(function(){});};
  load();
  var inc=function(k,n){return fetch(DB+'/'+k+'.json',{method:'PUT',body:JSON.stringify({'.sv':{increment:n}})}).then(function(r){if(!r.ok)throw 0;return r.json();}).then(function(v){if(typeof v==='number'){C[k]=v;}});};
  var save=function(v){try{if(v)localStorage.setItem(LS,v);else localStorage.removeItem(LS);}catch(err){}};
  box.addEventListener('click',function(e){
    var b=e.target.closest&&e.target.closest('.fnr-b');if(!b||box.classList.contains('busy'))return;
    var k=b.getAttribute('data-r'),prev=mine,snap={},job;R.forEach(function(r){snap[r[0]]=C[r[0]]||0;});
    box.classList.add('busy');
    if(prev===k){mine=null;C[k]=Math.max(0,(C[k]||0)-1);job=inc(k,-1);}
    else{mine=k;if(prev)C[prev]=Math.max(0,(C[prev]||0)-1);C[k]=(C[k]||0)+1;
      job=(prev?inc(prev,-1).catch(function(){}):Promise.resolve()).then(function(){return inc(k,1);});}
    save(mine);draw();
    job.then(function(){draw();},function(){mine=prev;save(prev);C=snap;draw();load();}).then(function(){box.classList.remove('busy');});
  });
})();

}catch(e){console.error("fn-late: fn-react",e)}

/* ==== fn-poll ==== */
try{

/*fn-poll: Jugantor er moto "অনলাইন ভোট". Proshno Layout > Site Features > "অনলাইন ভোট (Poll)" gadget theke ase. Vote: Firebase fnPoll*/
(function(){
  var cfg=document.querySelector('.fnp-cfg');if(!cfg)return;
  var raw=(cfg.textContent||'').replace(/\r/g,'').replace(/^\s*#.*$/mg,'');
  if(/^\s*status\s*:\s*off/im.test(raw))return;
  var hid=function(s){var h=5381;for(var i=0;i<s.length;i++)h=((h*33)^s.charCodeAt(i))>>>0;return 'q'+h.toString(36);};
  var polls=[];raw.split(/\n\s*-{3,}\s*(?:\n|$)/).forEach(function(b){
    var q=(b.match(/প্রশ্ন\s*[:ঃ]\s*(.+)/)||[])[1],d=(b.match(/তারিখ\s*[:ঃ]\s*(.+)/)||[])[1];
    if(q&&q.trim())polls.push({q:q.trim(),d:(d||'').trim(),id:hid(q.trim())});});
  if(!polls.length)return;
  var DB='https://views-count-cadfd-default-rtdb.firebaseio.com/fnPoll/';
  var OPT=[['yes','হ্যাঁ ভোট'],['no','না ভোট'],['nc','মন্তব্য নেই']];
  var bn=function(n){return String(n).replace(/\d/g,function(d){return '০১২৩৪৫৬৭৮৯'[d];});};
  var esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});};
  var PAGE='/p/poll.html';
  if(!document.getElementById('fnp-css')){var st=document.createElement('style');st.id='fnp-css';st.textContent=
   '#fnp-archive .fnp{max-width:760px;margin:0 auto 26px}.fnp .fnp-q{font-size:18px!important;line-height:1.6!important}.fnp{margin:0 0 26px}.fnp-h{display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #ddd;padding:0 0 10px;margin:0 0 14px}'+
   '.fnp-h b{display:flex;align-items:center;gap:10px;font-size:22px;font-weight:700;color:#111}.fnp-h b:before{content:"";width:10px;height:22px;background:#c8102e}'+
   '.fnp-h a{font-size:13.5px;color:#c8102e!important;text-decoration:none;font-weight:600}'+
   '.fnp-card{border:1px solid #e6e6e6;border-radius:6px;padding:16px;background:#fff}.fnp-card+.fnp-card{margin-top:16px}'+
   '.fnp-d{font-size:13.5px;color:#777;margin:0 0 8px}.fnp-d:before{content:"\\1F552";font-size:12px;margin-right:5px;filter:grayscale(1)}'+
   '.fnp-q{font-size:18px;line-height:1.6;font-weight:600;color:#111;margin:0 0 12px}'+
   '.fnp-o{position:relative;display:flex;align-items:center;justify-content:space-between;width:100%;margin:0 0 9px;padding:8px 12px!important;border:1px solid #dbe7f5!important;border-radius:4px;background:#eaf2fb!important;color:#222;font:inherit;font-size:15.5px;cursor:pointer;overflow:hidden;text-align:left;box-shadow:none!important}'+
   '.fnp-o i{position:absolute;left:0;top:0;bottom:0;width:0;background:#cfe1f6;transition:width .6s}.fnp-o span{position:relative;z-index:1;display:flex;align-items:center;gap:8px}'+
   '.fnp-o .fnp-r{width:14px;height:14px;border:1.5px solid #555;border-radius:50%;background:#fff;flex:none}'+
   '.fnp-o:hover{border-color:#c8102e!important}.fnp-o.on{border-color:#c8102e!important}.fnp-o.on .fnp-r{border-color:#c8102e;background:radial-gradient(#c8102e 45%,#fff 50%)}'+
   '.fnp-card.done .fnp-o{cursor:default}.fnp-card.done .fnp-o:hover{border-color:#dbe7f5!important}.fnp-card.done .fnp-o.on:hover{border-color:#c8102e!important}'+
   '.fnp-tot{text-align:center;color:#555;font-size:15px;margin:12px 0 10px}'+
   '.fnp-sh{display:flex;justify-content:center;gap:8px}.fnp-sh a{width:34px;height:34px;border-radius:4px;background:#f0f0f0;display:flex;align-items:center;justify-content:center;color:#111!important;text-decoration:none}.fnp-sh a:hover{background:#e2e2e2}.fnp-sh svg{width:15px;height:15px}'+
   '.pa-sec .pa-side{display:none!important}.pa-sec .pa-grid{grid-template-columns:minmax(0,1fr) 304px!important}.fnp-side .fnp{position:sticky;top:84px;margin:0}@media(max-width:991px){.pa-sec .pa-grid{grid-template-columns:1fr!important}.fnp-side .fnp{position:static;margin-top:20px}}'+
   '.fnp-strip{margin:16px 0 0!important;border:1px solid #e6e6e6;border-radius:14px;padding:14px 18px 12px;background:#fff}.fnp-strip .fnp-h{margin:0 0 12px;padding:0 0 9px}.fnp-strip .fnp-h b{font-size:19px}.fnp-strip .fnp-h b:before{height:19px;width:8px}.fnp-strip .fnp-card{border:0;padding:0;border-radius:0;display:grid;grid-template-columns:minmax(0,1.5fr) repeat(3,minmax(0,1fr));column-gap:12px;align-items:center}.fnp-strip .fnp-d{grid-column:1;grid-row:1;margin:0 0 4px}.fnp-strip .fnp-q{grid-column:1;grid-row:2/4;margin:0 8px 0 0;font-size:17px!important;align-self:start}.fnp-strip .fnp-o{grid-row:2;margin:0;padding:10px 12px!important}.fnp-strip .fnp-tot{grid-column:2/5;grid-row:3;margin:10px 0 0;text-align:left;font-size:14px}.fnp-strip .fnp-sh{grid-column:2/5;grid-row:3;justify-content:flex-end;margin-top:10px}.fnp-strip .fnp-sh a{width:30px;height:30px}@media(max-width:767px){.fnp-strip{padding:14px}.fnp-strip .fnp-card{display:block}.fnp-strip .fnp-q{margin:0 0 12px}.fnp-strip .fnp-o{margin:0 0 9px}.fnp-strip .fnp-tot{text-align:center;margin:12px 0 10px}.fnp-strip .fnp-sh{justify-content:center;margin:0}}';
   document.head.appendChild(st);}
  var SV={fb:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8V6.5c0-.8.2-1.3 1.4-1.3H17V2.2c-.3 0-1.3-.2-2.5-.2C12 2 10.5 3.5 10.5 6.2V8H8v3.4h2.5V22H14V11.4h2.7l.4-3.4H14z"/></svg>',
   x:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.8 3h3l-6.6 7.6L22 21h-6.1l-4.8-6.3L5.6 21h-3l7.1-8.1L2.2 3h6.2l4.3 5.7L17.8 3zm-1 16.2h1.7L7.3 4.7H5.5l11.3 14.5z"/></svg>',
   wa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1-1.3-.6-2.3-1.4-3-2.6-.2-.3.2-.3.6-1.1.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.2 1.6 2.4 3.9 3.4 1.4.6 2 .7 2.7.6.4-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"/></svg>'};
  var card=function(p,share){
    var u=location.origin+PAGE+'#'+p.id,t=encodeURIComponent(p.q),eu=encodeURIComponent(u);
    return '<div class="fnp-card" id="'+p.id+'">'+(p.d?'<div class="fnp-d">'+esc(p.d)+'</div>':'')+'<div class="fnp-q">'+esc(p.q)+'</div>'+
     OPT.map(function(o){return '<button type="button" class="fnp-o" data-k="'+o[0]+'"><i></i><span><b class="fnp-r"></b>'+o[1]+'</span><span class="fnp-v">০ %</span></button>';}).join('')+
     '<div class="fnp-tot">মোট ভোটদাতাঃ ০ জন</div>'+
     (share?'<div class="fnp-sh"><a href="https://www.facebook.com/sharer/sharer.php?u='+eu+'" target="_blank" rel="noopener" aria-label="Facebook">'+SV.fb+'</a><a href="https://twitter.com/intent/tweet?text='+t+'&url='+eu+'" target="_blank" rel="noopener" aria-label="X">'+SV.x+'</a><a href="https://wa.me/?text='+t+'%20'+eu+'" target="_blank" rel="noopener" aria-label="WhatsApp">'+SV.wa+'</a></div>':'')+'</div>';
  };
  var wire=function(el,p){
    var LS='fnp_'+p.id,mine=null,C={yes:0,no:0,nc:0};try{mine=localStorage.getItem(LS);}catch(e){}
    var draw=function(){var tot=C.yes+C.no+C.nc;
      [].forEach.call(el.querySelectorAll('.fnp-o'),function(b){var k=b.getAttribute('data-k'),pc=tot?Math.round(C[k]*100/tot):0;
        b.querySelector('.fnp-v').textContent=bn(pc)+' %';b.querySelector('i').style.width=pc+'%';b.classList.toggle('on',k===mine);});
      el.querySelector('.fnp-tot').textContent='মোট ভোটদাতাঃ '+bn(tot)+' জন';el.classList.toggle('done',!!mine);};
    fetch(DB+p.id+'.json').then(function(r){return r.json();}).then(function(d){if(d)OPT.forEach(function(o){C[o[0]]=+d[o[0]]||0;});draw();}).catch(function(){});
    el.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.fnp-o');if(!b||mine)return;
      var k=b.getAttribute('data-k');mine=k;C[k]++;draw();try{localStorage.setItem(LS,k);}catch(err){}
      fetch(DB+p.id+'/'+k+'.json',{method:'PUT',body:JSON.stringify({'.sv':{increment:1}})}).then(function(r){if(!r.ok)throw 0;return r.json();}).then(function(v){if(typeof v==='number'){C[k]=v;draw();}}).catch(function(){mine=null;C[k]=Math.max(0,C[k]-1);try{localStorage.removeItem(LS);}catch(err){}draw();});});
    draw();
  };
  var build=function(list,head,share){var w=document.createElement('div');w.className='fnp';
    w.innerHTML=(head?'<div class="fnp-h"><b>অনলাইন ভোট</b>'+(polls.length>1||location.pathname!==PAGE?'<a href="'+PAGE+'">আগের ভোট →</a>':'')+'</div>':'')+list.map(function(p){return card(p,share);}).join('');
    list.forEach(function(p){wire(w.querySelector('#'+p.id),p);});return w;};
  var path=location.pathname;
  if(path===PAGE){
    var host=document.getElementById('fnp-archive')||document.querySelector('.post-body');if(!host)return;
    host.innerHTML='';host.appendChild(build(polls,false,true));
    if(location.hash){var t=document.getElementById(location.hash.slice(1));if(t)setTimeout(function(){t.scrollIntoView({block:'start'});},300);}
    return;
  }
  var box=build([polls[0]],true,true);
  if(/^\/\d{4}\/\d{2}\/.+\.html$/.test(path)){
    var tries=0;(function put(){var pm=document.querySelector('.right-content-area .pa-more');
      if(pm){pm.parentNode.insertBefore(box,pm.nextSibling);return;}
      if(++tries<40){setTimeout(put,250);return;}
      var col=document.querySelector('.right-content-area .theiaStickySidebar > div')||document.querySelector('.right-content-area');if(col)col.appendChild(box);})();
  }else if(path==='/'){
    var tries=0;(function put(){var g=document.querySelector('.pa-sec .pa-grid');
      if(g){var old=g.querySelector('.pa-side');if(old)old.parentNode.removeChild(old);var as=document.createElement('aside');as.className='fnp-side';as.appendChild(box);g.appendChild(as);g.classList.add('fnp-g');return;}
      if(++tries<40){setTimeout(put,250);return;}
      var la=document.querySelector('.la-sec');if(la){box.classList.add('fnp-strip');la.appendChild(box);return;}
      var tr=document.getElementById('top-news-right');if(!tr)return;tr.appendChild(box);box.classList.add('col-12','custom-padding');box.style.marginTop='18px';})();
  }
})();

}catch(e){console.error("fn-late: fn-poll",e)}

/* ==== fn-align ==== */
try{

/*fn-align: homepage e top section er nicher faka jayga bondho kore (dan pasher Sorboshesh/Jonopriyo scroll box er height left column er soman kore)*/
(function(){
  if(location.pathname!=='/')return;
  function fit(){var L=document.querySelector('.top-news-left'),R=document.getElementById('top-news-right');if(!L||!R)return;
    /* Sorboshesh ar Jonopriyo duto tab-er list-i soman uchchotay rakhe */
    var bs=[].slice.call(R.querySelectorAll('.latest-news'));if(!bs.length)return;bs.forEach(function(x){x.style.height='';});if(window.innerWidth<992)return;
    var b=bs.filter(function(x){return x.offsetHeight>0;})[0];if(!b)return;
    var d=R.offsetHeight-L.offsetHeight;if(Math.abs(d)<4)return;
    var h=Math.max(240,b.offsetHeight-d)+'px';bs.forEach(function(x){x.style.height=h;});}
  var n=0,iv=setInterval(function(){fit();if(++n>12)clearInterval(iv);},500);
  window.addEventListener('load',fit);var t;window.addEventListener('resize',function(){clearTimeout(t);t=setTimeout(fit,200);});
})();

}catch(e){console.error("fn-late: fn-align",e)}

/* ==== fn-a11y ==== */
try{

/*fn-a11y: icon button/link e nam (aria-label) deya ar tab er role thik kora - screen reader, AI agent ar PageSpeed "Accessibility tree" er jonno*/
(function(){
  var MAP=[['facebook','Facebook'],['fb.com','Facebook'],['youtube','YouTube'],['youtu.be','YouTube'],['twitter','X (Twitter)'],['x.com','X (Twitter)'],['instagram','Instagram'],['whatsapp','WhatsApp'],['wa.me','WhatsApp'],['linkedin','LinkedIn'],['t.me','Telegram'],['telegram','Telegram'],['tiktok','TikTok'],['pinterest','Pinterest'],['news.google','Google News'],['mailto:','ইমেইল']];
  function named(el){if(el.getAttribute('aria-label')||el.getAttribute('aria-labelledby')||(el.title||'').trim()||(el.textContent||'').trim())return true;var im=el.querySelector('img[alt]');return !!(im&&im.alt.trim());}
  function fix(){
    [].forEach.call(document.querySelectorAll('[role="tab"]'),function(t){var p=t.parentElement;if(!p)return;if(p.closest('[role="tab"]')){t.removeAttribute('role');t.removeAttribute('aria-selected');return;}
      if(p.tagName==='LI'){if(!p.getAttribute('role'))p.setAttribute('role','presentation');var u=p.parentElement;if(u&&!u.getAttribute('role'))u.setAttribute('role','tablist');}
      else if(!p.getAttribute('role'))p.setAttribute('role','tablist');});
    [].forEach.call(document.querySelectorAll('button'),function(b){if(named(b))return;
      var c=((b.getAttribute('aria-controls')||'')+' '+(b.getAttribute('data-bs-target')||'')+' '+b.id+' '+b.className).toLowerCase();
      var l=/search/.test(c)?'সার্চ':/nav|menu|offcanvas/.test(c)?'মেনু':/top/.test(c)?'উপরে যান':/close/.test(c)?'বন্ধ করুন':/share/.test(c)?'শেয়ার':'বাটন';
      b.setAttribute('aria-label',l);});
    [].forEach.call(document.querySelectorAll('a[href]'),function(a){if(named(a))return;
      var h=(a.getAttribute('href')||'').toLowerCase(),l='';
      MAP.some(function(m){if(h.indexOf(m[0])>-1){l=m[1];return true;}});
      if(!l)l=(h==='/'||/^https?:\/\/(www\.)?fulbarianews\.com\/?$/.test(h))?'প্রচ্ছদ':'লিংক';
      a.setAttribute('aria-label',l);});
  }
  fix();window.addEventListener('load',function(){fix();setTimeout(fix,2500);});
})();

}catch(e){console.error("fn-late: fn-a11y",e)}


try{
/* #fn-pstory: "ছবি" label-er post e protita chhobir upore "১/৮" nombor, click korle puro porday (lightbox) — age/pore, swipe, keyboard. */
(function(){
  if(!/^\/\d{4}\/\d{2}\/[^\/]+\.html$/.test(location.pathname))return;
  var LB='ছবি',ok=false;
  document.querySelectorAll('.details-category-title a[href*="/search/label/"], .somoy-tags-wrap a[href*="/search/label/"]').forEach(function(a){var m=a.getAttribute('href').match(/\/search\/label\/([^?#]+)/);if(m){try{if(decodeURIComponent(m[1]).trim()===LB)ok=true;}catch(e){}}});
  if(!ok)return;
  var pb=document.getElementById('post-body');if(!pb)return;
  document.documentElement.classList.add('fn-photo-post');
  var BN='০১২৩৪৫৬৭৮৯',bn=function(s){return String(s).replace(/\d/g,function(d){return BN[d];});};
  var big=function(u){return String(u||'').replace(/\/(s\d+|w\d+-h\d+[^\/]*)(-[a-z0-9-]*)?\//,'/s1600/').replace(/=(s\d+|w\d+-h\d+[^=]*)$/,'=s1600');};
  var imgs=[].slice.call(pb.querySelectorAll('img')).filter(function(im){if(im.closest('.fn-more,.aj-byline,.aj-by,.somoy-tags-wrap,.fn-share'))return false;var w=im.getAttribute('width')||im.naturalWidth||im.getBoundingClientRect().width;return !(w&&w<200);});
  if(!imgs.length)return;
  var N=imgs.length,items=imgs.map(function(im){var tb=im.closest('.tr-caption-container'),cap='';if(tb){var c=tb.querySelector('.tr-caption');if(c)cap=c.textContent.trim();}if(!cap)cap=(im.getAttribute('title')||'').trim();var a=im.closest('a[href]');var src=(a&&/\.(jpe?g|png|webp|gif)|blogger\.googleusercontent|bp\.blogspot/i.test(a.href))?a.href:(im.currentSrc||im.src);return {src:big(src),cap:cap,alt:im.alt||''};});
  var st=document.createElement('style');
  st.textContent='.fn-ps-w{position:relative!important;display:block}.fn-ps-n{position:absolute;top:10px;right:10px;background:rgba(0,0,0,.62);color:#fff!important;font-size:13px!important;line-height:1!important;padding:6px 10px;border-radius:14px;z-index:2;pointer-events:none;font-weight:600}.fn-ps-z{position:absolute;bottom:10px;right:10px;width:34px;height:34px;border-radius:50%;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;z-index:2;pointer-events:none}.fn-ps-z svg{width:18px;height:18px}html.fn-photo-post #post-body img{cursor:zoom-in}'+
  '.fn-lb{position:fixed;inset:0;background:#0b0b0b;z-index:2147483000;display:none;flex-direction:column;color:#fff;font-family:inherit}.fn-lb.on{display:flex}.fn-lb-top{display:flex;justify-content:space-between;align-items:center;padding:12px 16px;font-size:15px}.fn-lb-x{background:none;border:0;color:#fff;font-size:30px;line-height:1;cursor:pointer;padding:4px 8px}.fn-lb-st{flex:1;position:relative;display:flex;align-items:center;justify-content:center;min-height:0;touch-action:pan-y}.fn-lb-st img{max-width:100%;max-height:100%;object-fit:contain;user-select:none;-webkit-user-drag:none}.fn-lb-b{position:absolute;top:50%;transform:translateY(-50%);width:46px;height:46px;border-radius:50%;border:0;background:rgba(255,255,255,.14);color:#fff;font-size:26px;cursor:pointer;display:flex;align-items:center;justify-content:center}.fn-lb-b:hover{background:rgba(255,255,255,.28)}.fn-lb-p{left:14px}.fn-lb-nx{right:14px}.fn-lb-b[disabled]{opacity:.25;cursor:default}.fn-lb-cap{padding:12px 18px 18px;font-size:15px;line-height:1.65;color:#ddd;max-width:900px;margin:0 auto;text-align:center;min-height:24px}@media(max-width:767.98px){.fn-lb-b{width:38px;height:38px;font-size:22px}.fn-lb-p{left:6px}.fn-lb-nx{right:6px}.fn-lb-cap{font-size:14px}}html.fn-lb-open{overflow:hidden}';
  document.head.appendChild(st);
  var ZM='<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>';
  imgs.forEach(function(im,i){var w=im.closest('a')||im.parentElement;w.classList.add('fn-ps-w');if(!w.querySelector('.fn-ps-n')){var n=document.createElement('span');n.className='fn-ps-n';n.textContent=bn(i+1)+'/'+bn(N);w.appendChild(n);var z=document.createElement('span');z.className='fn-ps-z';z.innerHTML=ZM;w.appendChild(z);}
    w.addEventListener('click',function(e){e.preventDefault();open(i);});});
  var lb=document.createElement('div');lb.className='fn-lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');
  lb.innerHTML='<div class="fn-lb-top"><span class="fn-lb-c"></span><button type="button" class="fn-lb-x" aria-label="বন্ধ করুন">×</button></div><div class="fn-lb-st"><button type="button" class="fn-lb-b fn-lb-p" aria-label="আগের ছবি">‹</button><img alt=""><button type="button" class="fn-lb-b fn-lb-nx" aria-label="পরের ছবি">›</button></div><div class="fn-lb-cap"></div>';
  document.body.appendChild(lb);
  var I=lb.querySelector('img'),C=lb.querySelector('.fn-lb-c'),CP=lb.querySelector('.fn-lb-cap'),P=lb.querySelector('.fn-lb-p'),NX=lb.querySelector('.fn-lb-nx'),cur=0;
  var show=function(i){cur=Math.max(0,Math.min(N-1,i));var it=items[cur];I.src=it.src;I.alt=it.alt;C.textContent=bn(cur+1)+'/'+bn(N);CP.textContent=it.cap;P.disabled=cur===0;NX.disabled=cur===N-1;if(cur+1<N){var pre=new Image();pre.src=items[cur+1].src;}};
  var open=function(i){show(i);lb.classList.add('on');document.documentElement.classList.add('fn-lb-open');lb.querySelector('.fn-lb-x').focus();};
  var close=function(){lb.classList.remove('on');document.documentElement.classList.remove('fn-lb-open');I.removeAttribute('src');};
  lb.querySelector('.fn-lb-x').addEventListener('click',close);
  P.addEventListener('click',function(){show(cur-1);});NX.addEventListener('click',function(){show(cur+1);});
  lb.querySelector('.fn-lb-st').addEventListener('click',function(e){if(e.target===this)close();});
  document.addEventListener('keydown',function(e){if(!lb.classList.contains('on'))return;if(e.key==='Escape')close();else if(e.key==='ArrowLeft')show(cur-1);else if(e.key==='ArrowRight')show(cur+1);});
  var sx=null;lb.addEventListener('touchstart',function(e){sx=e.touches[0].clientX;},{passive:true});lb.addEventListener('touchend',function(e){if(sx==null)return;var dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>50)show(cur+(dx<0?1:-1));sx=null;},{passive:true});
})();

}catch(e){console&&console.error&&console.error("fn-late fn-pstory",e)}


try{
/* #fn-photo (fn-late):  "ছবি" label-er post — thumbnail e lal camera icon; ছবি post e shudhu ছবি-r related ("ছবির গল্প নিয়ে আরও দেখুন"), photo story style. */
(function(){
  var LB='ছবি';
  var path=function(u){try{return new URL(u,location.href).pathname;}catch(e){return '';}};
  var esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});};
  var BN='০১২৩৪৫৬৭৮৯',MO=['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'];
  var bn=function(s){return String(s).replace(/\d/g,function(d){return BN[d];});};
  var CAM='<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#fff" d="M9 3 7.2 5H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3.2L15 3H9zm3 5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"/></svg>';
  var st=document.createElement('style');
  st.textContent='.fn-ph-w{position:relative!important}.fn-cam{position:absolute;top:8px;left:8px;width:30px;height:30px;border-radius:50%;background:#c8102e;display:flex;align-items:center;justify-content:center;z-index:3;pointer-events:none;box-shadow:0 1px 4px rgba(0,0,0,.25)}.fn-cam svg{width:16px;height:16px;display:block}.fn-cam.sm{top:5px;left:5px;width:22px;height:22px}.fn-cam.sm svg{width:12px;height:12px}'+
  'html.fn-photo-post #somoy-songshlishto,html.fn-photo-post #somoy-aro,html.fn-photo-post .fn-more,html.fn-photo-post .pa-more{display:none!important}'+
  '.fn-phr{margin:28px 0 10px;clear:both}.fn-phr h3{font-size:20px!important;font-weight:700!important;color:#111!important;margin:0 0 14px!important;line-height:1.4!important}.fn-phr-g{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}.fn-phr a{display:block;text-decoration:none!important;color:#111!important}.fn-phr .fn-phr-i{position:relative;aspect-ratio:3/2;overflow:hidden;background:#eee}.fn-phr img{width:100%;height:100%;object-fit:cover;display:block;margin:0!important}.fn-phr b{display:block;font-size:16px!important;line-height:1.5!important;font-weight:700!important;margin-top:8px;color:#111!important}.fn-phr a:hover b{color:#c8102e!important}.fn-phr small{display:block;font-size:13px!important;color:#777!important;margin-top:4px}@media(max-width:767.98px){.fn-phr-g{grid-template-columns:repeat(2,1fr);gap:12px}.fn-phr b{font-size:15px!important}}'+
  'html.fn-photo-post #post-body .separator{margin:22px 0 6px!important}html.fn-photo-post #post-body .separator img{width:100%!important;height:auto!important}html.fn-photo-post #post-body .tr-caption-container{width:100%!important;margin:22px 0 6px!important}html.fn-photo-post #post-body .tr-caption-container img{width:100%!important;height:auto!important}html.fn-photo-post #post-body .tr-caption{font-size:14.5px!important;line-height:1.6!important;color:#555!important;text-align:left!important;padding:8px 0 0!important}';
  document.head.appendChild(st);
  var SET=null,ENT=[];
  var mark=function(root){if(!SET)return;(root||document).querySelectorAll('a[href] img').forEach(function(im){if(im.closest('#post-body .separator,#post-body .tr-caption-container'))return;var a=im.closest('a[href]');if(!a||!SET[path(a.href)])return;var w=im.parentElement;if(!w)return;if(w.textContent.trim()&&!w.classList.contains('fn-ph-iw')){var cs=getComputedStyle(im),s=document.createElement('span');s.className='fn-ph-iw';s.style.cssText='position:relative;line-height:0;display:'+(cs.display==='inline'?'inline-block':cs.display)+';flex:'+cs.flex+';align-self:'+cs.alignSelf+';order:'+cs.order+';margin:'+cs.margin+';float:'+cs.cssFloat;im.style.margin='0';im.parentNode.insertBefore(s,im);s.appendChild(im);w=s;}if(w.querySelector(':scope > .fn-cam'))return;var r=im.getBoundingClientRect();if(r.width&&r.width<60)return;w.classList.add('fn-ph-w');var c=document.createElement('span');c.className='fn-cam'+(r.width&&r.width<140?' sm':'');c.innerHTML=CAM;w.appendChild(c);});};
  var labels=function(){var L=[];document.querySelectorAll('.details-category-title a[href*="/search/label/"], .somoy-tags-wrap a[href*="/search/label/"]').forEach(function(a){var m=a.getAttribute('href').match(/\/search\/label\/([^?#]+)/);if(m){try{L.push(decodeURIComponent(m[1]).trim());}catch(e){}}});return L;};
  var isPost=/^\/\d{4}\/\d{2}\/[^\/]+\.html$/.test(location.pathname);
  var related=function(){if(!isPost)return;var here=location.pathname;if(!(SET[here]||labels().indexOf(LB)>-1))return;document.documentElement.classList.add('fn-photo-post');if(document.querySelector('.fn-phr'))return;var list=ENT.filter(function(x){return x.p!==here;}).slice(0,8);if(!list.length)return;var box=document.createElement('div');box.className='fn-phr';box.innerHTML='<h3>ছবির গল্প নিয়ে আরও দেখুন</h3><div class="fn-phr-g">'+list.map(function(x){return '<a href="'+esc(x.u)+'"><div class="fn-phr-i">'+(x.img?'<img loading="lazy" src="'+esc(x.img)+'" alt="'+esc(x.t)+'" width="400" height="267">':'')+'<span class="fn-cam">'+CAM+'</span></div><b>'+esc(x.t)+'</b><small>'+x.d+'</small></a>';}).join('')+'</div>';var at=document.getElementById('somoy-aro')||document.getElementById('somoy-songshlishto');if(at&&at.parentNode)at.parentNode.insertBefore(box,at);else{var pb=document.getElementById('post-body');if(pb)pb.parentNode.insertBefore(box,pb.nextSibling);}};
  var obs=false,build=function(data){SET={};ENT=data;data.forEach(function(x){SET[x.p]=1;});related();mark();if(!obs&&window.MutationObserver){obs=true;var t=0;new MutationObserver(function(){clearTimeout(t);t=setTimeout(function(){mark();},250);}).observe(document.body,{childList:true,subtree:true});}};
  var KEY='fnPhotoV1',c=null;try{c=JSON.parse(sessionStorage.getItem(KEY)||'null');}catch(e){}
  if(c&&c.d)build(c.d); /* cache theke sathe sathe, tarpor feed theke notun list */
  fetch('/feeds/posts/summary/-/'+encodeURIComponent(LB)+'?alt=json&max-results=150').then(function(r){return r.json();}).then(function(j){var d=((j.feed&&j.feed.entry)||[]).map(function(e){var u='';(e.link||[]).forEach(function(l){if(l.rel==='alternate')u=l.href;});var img=e['media$thumbnail']?e['media$thumbnail'].url.replace(/\/s72(-[a-z0-9-]*)?\//,'/w400-h267-p-k-no-nu-rw/').replace(/=s72(-[a-z0-9-]*)?$/,'=w400-h267-p-k-no-nu-rw'):'';var dt=new Date(e.published.$t);return {u:u,p:path(u),t:e.title.$t,img:img,d:bn(dt.getDate())+' '+MO[dt.getMonth()]+' '+bn(dt.getFullYear())};});try{sessionStorage.setItem(KEY,JSON.stringify({t:Date.now(),d:d}));}catch(e){}build(d);}).catch(function(){});
})();

}catch(e){console&&console.error&&console.error("fn-late fn-photo",e)}
