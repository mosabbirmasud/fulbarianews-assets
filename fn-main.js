/* fn-main.js: fulbarianews.com theme scripts (theme theke soriye ana). Source of truth. Minified version served via jsDelivr. */
/* #0 (theme L5709) */
try{

/*!
* Lazy Load Images without jQuery
* http://kaizau.github.com/Lazy-Load-Images-without-jQuery/
*
* Original by Mike Pulaski - http://www.mikepulaski.com
* Modified by Kai Zau - http://kaizau.com
*/(function(){var addEventListener=window.addEventListener||function(n,f){window.attachEvent('on'+n,f);},removeEventListener=window.removeEventListener||function(n,f,b){window.detachEvent('on'+n,f);};var lazyLoader={cache:[],mobileScreenSize:500,addObservers:function(){addEventListener('scroll',lazyLoader.throttledLoad);addEventListener('resize',lazyLoader.throttledLoad);},removeObservers:function(){removeEventListener('scroll',lazyLoader.throttledLoad,false);removeEventListener('resize',lazyLoader.throttledLoad,false);},throttleTimer:new Date().getTime(),throttledLoad:function(){var now=new Date().getTime();if((now-lazyLoader.throttleTimer)>=200){lazyLoader.throttleTimer=now;lazyLoader.loadVisibleImages();}},loadVisibleImages:function(){var scrollY=window.pageYOffset||document.documentElement.scrollTop;var pageHeight=window.innerHeight||document.documentElement.clientHeight;var range={min:scrollY-200,max:scrollY+pageHeight+200};var i=0;while(i<lazyLoader.cache.length){var image=lazyLoader.cache[i];var imagePosition=getOffsetTop(image);var imageHeight=image.height||0;if((imagePosition>=range.min-imageHeight)&&(imagePosition<=range.max)){var mobileSrc=image.getAttribute('data-src-mobile');image.onload=function(){this.className=this.className.replace(/(^|\s+)lazy-load(\s+|$)/,'$1lazy-loaded$2');};if(mobileSrc&&screen.width<=lazyLoader.mobileScreenSize){image.src=mobileSrc;}
else{image.src=image.getAttribute('data-src');}
image.removeAttribute('data-src');image.removeAttribute('data-src-mobile');lazyLoader.cache.splice(i,1);continue;}
i++;}
if(lazyLoader.cache.length===0){lazyLoader.removeObservers();}},init:function(){if(!document.querySelectorAll){document.querySelectorAll=function(selector){var doc=document,head=doc.documentElement.firstChild,styleTag=doc.createElement('STYLE');head.appendChild(styleTag);doc.__qsaels=[];styleTag.styleSheet.cssText=selector+"{x:expression(document.__qsaels.push(this))}";window.scrollBy(0,0);return doc.__qsaels;}}
addEventListener('load',function _lazyLoaderInit(){var imageNodes=document.querySelectorAll('img[data-src]');for(var i=0;i<imageNodes.length;i++){var imageNode=imageNodes[i];lazyLoader.cache.push(imageNode);}
lazyLoader.addObservers();lazyLoader.loadVisibleImages();removeEventListener('load',_lazyLoaderInit,false);});}}
function getOffsetTop(el){var val=0;if(el.offsetParent){do{val+=el.offsetTop;}while(el=el.offsetParent);return val;}}
lazyLoader.init();})();;
  
}catch(e){console&&console.error&&console.error("fn-main #0",e)}

/* #1 (theme L5745) */
try{
if(location.pathname==="/"){

        if ($('#videoFlex').length) {
            (function(o){var sc=document.createElement('script');sc.src='https://cdn.jsdelivr.net/gh/harbyj/assets@main/jquery.flexslider-min.js';sc.onload=function(){$('#videoFlex').flexslider(o)};document.body.appendChild(sc)})({
                animation: "slide",
                controlNav: false,
                animationLoop: true,
                slideshow: true,
                itemWidth: 270,
                slideshowSpeed: 2500,
                move: 1,
                itemMargin: 15
            });
        }
        // For Nav sticky
        const nav = document.querySelector('#nav');
        let navTop = nav.offsetTop;

        function fixedNav() {
            if (window.scrollY >= navTop) {
                nav.classList.add('sticky');
            } else {
                nav.classList.remove('sticky');
            }
        }
        window.addEventListener('scroll', fixedNav);

        // Back to Top
        let backToTopButton = document.getElementById("back_to_top");
        window.onscroll = function() {
            if (window.pageYOffset > 100) {
                backToTopButton.className = "show";
            } else {
                backToTopButton.className = "";
            }
        };
        backToTopButton.onclick = function() {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
        // For DropDown icon Morve Desktop
        const $dropdown = $(".dropdown-new");
        const $dropdownToggle = $(".dropdown-toggle");
        const $dropdownMenu = $(".dropdown-menu-new");
        const showClass = "show";
        $(window).on("load", function() {
            if (this.matchMedia("(min-width: 768px)").matches) {
                $dropdown.hover(
                    function() {
                        const $this = $(this);
                        $this.addClass(showClass);
                        $this.find($dropdownToggle).attr("aria-expanded", "true");
                        $this.find($dropdownMenu).addClass(showClass);
                    },
                    function() {
                        const $this = $(this);
                        $this.removeClass(showClass);
                        $this.find($dropdownToggle).attr("aria-expanded", "false");
                        $this.find($dropdownMenu).removeClass(showClass);
                    }
                );
            } else {
                $dropdown.off("mouseenter mouseleave");
            }
        });
        
//AJAX getDistrictList
function getDistrictList(division_id) {
            console.log('division_id', division_id.value);
            if (division_id.value != "") {
                $.post("getDistrictList.php", {
                    division_id: division_id.value
                }, function(rtm) {
                    var option = '<option value="1">--জেলা--</option>';
                    if (rtm.length > 0) {
                        for (var i = 0; i < rtm.length; i++) {
                            option += '<option value="' + rtm[i]['alias'] + '">' + rtm[i]['name'] + '</option>';
                        };
                        $("#cboDistrict").html(option);
                        $("#cboUpozilla").html('<option value="1">--উপজেলা--</option>');
                    } else {
                        $("#cboDistrict").html('<option value="1">--জেলা--</option>');
                        $("#cboUpozilla").html('<option value="1">--উপজেলা-NULL-</option>');
                    }
                }, 'json');
            } else {
                $("#cboDistrict").html('<option value="1">--জেলা--</option>');
                $("#cboUpozilla").html('<option value="1">--উপজেলা--</option>');
            }
        }

        // AJAX, getUpozillaList
        function getUpozillaList(district_id) {
            console.log('district_id', district_id.value);
            if (district_id.value != "") {
                $.post("getUpozillaList.php", {
                    district_id: district_id.value
                }, function(rtm) {
                    var option = '<option value="1">--উপজেলা--</option>';
                    if (rtm.length > 0) {
                        for (var i = 0; i < rtm.length; i++) {
                            option += '<option value="' + rtm[i]['alias'] + '">' + rtm[i]['name'] + '</option>';
                        };
                        $("#cboUpozilla").html(option);
                    } else {
                        $("#cboUpozilla").html('<option value="1">--উপজেলা--</option>');
                    }
                }, 'json');
            } else {
                $("#cboUpozilla").html('<option value="1">--উপজেলা--</option>');
            }
        }

        // Search form
        $("#search-form").submit(function() {
            var baseURL = "/search"
            var division = $("#division").val();
            var district = $("#cboDistrict").val();
            var upazila = $("#cboUpozilla").val();
            if (division === "") {
                alert('একটি বিভাগ নির্বাচন করুন');
                return false;
            } else {
                if (district != 1 && upazila != 1) {
                    $("#search-form").attr("action", baseURL + 'country/' + division + '/' + district + '/' + upazila);
                } else {
                    if (district != 1) {
                        $("#search-form").attr("action", baseURL + 'country/' + division + '/' + district);
                    } else {
                        $("#search-form").attr("action", baseURL + 'country/' + division);
                    }
                }
            }
            // alert(baseURL+division+'/'+district);
        });

}
}catch(e){console&&console.error&&console.error("fn-main #1",e)}

/* #2 (theme L6321) */
try{

(function(){
var params = new URLSearchParams(location.search);
var qParam = (params.get('q') || '').trim();
var isLabel = /^\/search\/label\//.test(location.pathname);
var isSearchQuery = (location.pathname === '/search' || location.pathname === '/search/') && qParam.length > 0;
var isLatest = (location.pathname === '/search' || location.pathname === '/search/') && !qParam;

if(!isLabel && !isLatest && !isSearchQuery) return;
var page = document.querySelector('.category-page');
if(!page) return;

var fl = document.createElement('link');
fl.rel = 'stylesheet';
fl.href = 'https://fonts.googleapis.com/css2?family=Noto+Serif+Bengali:wght@400;500;600;700&display=swap';
document.head.appendChild(fl);
document.body.classList.add('cn-on');

var label = isLabel ? decodeURIComponent(location.pathname.split('/label/')[1]).replace(/\+/g,' ') : (isSearchQuery ? 'অনুসন্ধানের ফলাফল: "' + qParam + '"' : 'সর্বশেষ সংবাদ');
var start = 1, total = 0, shown = 0, list, btnWrap;
var wrap = document.createElement('div');
wrap.id = 'cn-wrap';

var searchBarHtml = isSearchQuery ? '<div class="cn-search-box-wrap"><form action="/search" method="get" class="cn-search-form"><input type="text" name="q" class="cn-search-input" value="" placeholder="এখানে খুঁজুন..." required><button type="submit" class="cn-search-btn">খুঁজুন</button></form></div>' : '';

wrap.innerHTML = '<div class="row custom-row"><div class="col-md-12 custom-padding"><h1 class="cn-h1"></h1>' + searchBarHtml + '</div></div><div class="cn-shell"><div class="new-category-design-left"><div id="cn-top"></div><div id="cn-list"></div><div class="details-btn"></div></div><div class="new-category-design-right"></div></div>';
wrap.querySelector('.cn-h1').textContent = label;
if(isSearchQuery){
  var inp = wrap.querySelector('.cn-search-input');
  if(inp) inp.value = qParam;
}
page.insertBefore(wrap, page.firstChild);

var top = wrap.querySelector('#cn-top');
list = wrap.querySelector('#cn-list');
btnWrap = wrap.querySelector('.details-btn');

function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function sz(u,w,h){return u?u.replace(/\/(s\d+(-c)?|w\d+-h\d+(-[a-z-]+)?)\//,'/w'+w+'-h'+h+'-c/'):''}
function fdate(dt){try{var o={};new Intl.DateTimeFormat('bn-BD',{timeZone:'Asia/Dhaka',year:'numeric',month:'long',day:'numeric',hour:'2-digit',minute:'2-digit',hour12:true}).formatToParts(dt).forEach(function(p){o[p.type]=p.value});var dp=(o.dayPeriod||'').replace(/AM/i,'এএম').replace(/PM/i,'পিএম');return o.month+' '+o.day+', '+o.year+', '+o.hour+':'+o.minute+' '+dp}catch(e){return ''}}
function cut(t,n){return t.length>n?t.slice(0,n).replace(/\s\S*$/,'')+'...':t}
function parse(e){var link=(e.link.filter(function(l){return l.rel==='alternate'})[0]||{}).href;var html=e.content?e.content.$t:(e.summary?e.summary.$t:'');var m=html.match(/<img[^>]+src=["']([^"']+)["']/i);var img=(m&&m[1])||(e.media$thumbnail&&e.media$thumbnail.url.replace(/\/s72-c\//,'/s800/'))||'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiz3CKlt6tXJxel-Ty4fFk74QBGVKDfqldGfqL72yc8qdR-vynHmo38Grf1VQtHl5esPR83xNT1E16eQBM4JZovghOzWjrXSyXB7LMd5UwBZCWjcs3PWYYIa0XKgQ_pqRJqPOH5hAee6qeUD1Gf4DpjLrDahStFTE6H6A0nt3m55bnC4UDLIj8Slda7RDk/s1672/Fulbariannews%20thumbnail.webp';var d=document.createElement('div');d.innerHTML=html;var txt=(d.textContent||'').replace(/\s+/g,' ').trim();return{t:e.title.$t,u:link,i:img,s:txt,d:fdate(new Date(e.published.$t))}}
function im(p,w,h){return p.i?'<img class="img-fluid" loading="lazy" src="'+esc(sz(p.i,w,h))+'" alt="'+esc(p.t)+'">':''}
function lead(p){return '<div class="lead-news"><a href="'+p.u+'"><div class="lead-news-img">'+im(p,800,450)+'</div><div class="lead-news-text"><h2>'+esc(p.t)+'</h2></div></a></div>'}
function sub(p){return '<div class="sub-lead"><a href="'+p.u+'"><div class="sub-lead-image">'+im(p,600,360)+'</div><div class="sub-lead-text"><h2>'+esc(p.t)+'</h2><p>'+esc(cut(p.s,190))+'</p></div></a></div>'}
function s2(p,full,bt){return '<div class="sub-lead-2'+(bt?' bt':'')+'"><a href="'+p.u+'"><div class="sub-lead-2-img">'+im(p,600,360)+'</div><div class="sub-lead-2-text"><h3>'+esc(p.t)+'</h3>'+(full?'<p>'+esc(cut(p.s,190))+'</p>':'')+'</div></a></div>'}
function row(p){return '<div class="category-news"><a href="'+p.u+'"><div class="category-news-img">'+im(p,400,240)+'</div><div class="category-news-text"><h2>'+esc(p.t)+'</h2><small>'+esc(p.d)+'</small><p>'+esc(cut(p.s,230))+'</p></div></a></div>'}
function feed(u){return fetch(u).then(function(r){return r.json()})}

function renderFirst(ps){
  if(isSearchQuery){
    list.insertAdjacentHTML('beforeend', ps.map(row).join(''));
    return;
  }
  var h='<div class="row custom-row"><div class="col-md-8 col-12 custom-padding br">'+lead(ps[0])+'</div><div class="col-md-4 col-12 custom-padding mobile-category-news-top"><div class="row custom-row">';
  if(ps[1])h+='<div class="col-md-12 col-6 custom-padding sub-lead-wrapper">'+sub(ps[1])+'</div>';
  if(ps[2])h+='<div class="col-6 custom-padding d-md-none">'+s2(ps[2],false,false)+'</div>';
  h+='</div></div></div>';
  if(ps.length>2){h+='<div class="row custom-row other-lead-news-row d-none d-md-flex">';ps.slice(2,5).forEach(function(p){h+='<div class="col-md-4 col-6 custom-padding br">'+s2(p,true,true)+'</div>'});h+='</div>'}
  if(ps.length>3){h+='<div class="col-md-12 col-12 custom-padding other-lead-news-row-mobile d-md-none"><div class="row custom-row">';ps.slice(3,5).forEach(function(p){h+='<div class="col-6 custom-padding">'+s2(p,false,false)+'</div>'});h+='</div></div>'}
  top.innerHTML=h;
  list.insertAdjacentHTML('beforeend',ps.slice(5).map(row).join(''));
}

function more(btn){
  if(btn){btn.disabled=true;btn.textContent='লোড হচ্ছে...'}
  var apiUrl = isLabel
    ? '/feeds/posts/default/-/' + encodeURIComponent(label) + '?alt=json&max-results=20&start-index=' + start
    : (isSearchQuery
        ? '/feeds/posts/default?alt=json&q=' + encodeURIComponent(qParam) + '&max-results=20&start-index=' + start
        : '/feeds/posts/default?alt=json&max-results=20&start-index=' + start);

  feed(apiUrl).then(function(j){
    total = +(j.feed.openSearch$totalResults && j.feed.openSearch$totalResults.$t || 0);
    var es = (j.feed.entry || []).map(parse);
    if(!es.length && start===1){
      top.innerHTML='<div class="cn-empty">কোনো সংবাদ পাওয়া যায়নি।</div>';
      return;
    }
    if(start===1) renderFirst(es);
    else list.insertAdjacentHTML('beforeend', es.map(row).join(''));
    start += es.length;
    shown += es.length;
    btnWrap.innerHTML = shown < total ? '<button type="button" class="show_more">আরও পড়ুন</button>' : '';
    var b = btnWrap.querySelector('.show_more');
    if(b) b.onclick = function(){more(this)};
  }).catch(function(){
    document.body.classList.remove('cn-on');
    wrap.remove();
  });
}
more();

var right = wrap.querySelector('.new-category-design-right');
Promise.all([fetch('/').then(function(r){return r.text()}),feed('/feeds/posts/default?alt=json&max-results=12')]).then(function(r){
  var d=new DOMParser().parseFromString(r[0],'text/html');
  var w=d.querySelector('#PopularPosts1 .tab-content-wrapper');
  if(!w){right.remove();return}
  right.appendChild(document.importNode(w,true));
  var pane=right.querySelector('#endNews-tab-pane');
  if(pane)pane.innerHTML='<div class="latest-news details-latest-news"><ul class="latest-news-ul">'+(r[1].feed.entry||[]).map(parse).map(function(p){return '<li><a href="'+p.u+'"><div class="latest-news-left">'+im(p,200,120)+'</div><div class="latest-news-right"><h3>'+esc(p.t)+'</h3></div></a></li>'}).join('')+'</ul></div>';
}).catch(function(){right.remove()});
})();

}catch(e){console&&console.error&&console.error("fn-main #2",e)}

/* #3 (theme L6427) */
try{

if(window.SF&&!SF.on('photocard')){}else (function(){
  var CFG = {
    site: 'fulbarianews.com',
    logo: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjaeZTi0FRxacv0zKpHGYA6cNZ7A1oLiYEimdhep2N5fD0Ecbvqwg3CAlK55UBQZio8gcISZcXebkdC89v32lebUXJ8iZCmRP7QDGVN2QY8fDy5RbIFieS1hBjdBhJ9k8AcUvCNKS_67NkWfJWOMqO0SYH_9E_F-LZcVz4uSZ5m15fTbWu2g7BNDVQKrPk/s1024/80081206-c350-4cd4-b5b7-7d33a244de5b.png',
    red: '#c8102e', dark: '#7a0b16', ink: '#1a1a1a',
    cta: 'বিস্তারিত কমেন্টে',
    font: '"Hind Siliguri","Noto Serif Bengali",sans-serif'
  };
  var W = 1080, H = 1350;
  var DESIGNS = [
    {id:'red', name:'লাল প্যানেল'},
    {id:'white', name:'সাদা, লোগো মাঝে'},
    {id:'top', name:'শিরোনাম উপরে'},
    {id:'frame', name:'ফ্রেমে ছবি'},
    {id:'purple', name:'বেগুনি গ্রেডিয়েন্ট'},
    {id:'maroon', name:'কালো-মেরুন কার্ড'}
  ];
  (function(){var S=window.SF;if(!S)return;var al=String(S.get('photocard','designs','')).toLowerCase().split(/[,\s]+/).filter(Boolean);if(al.length){var f=DESIGNS.filter(function(d){return al.indexOf(d.id)>-1;});if(f.length)DESIGNS=f;}})();
  var CREDITS = ['সংগৃহীত ছবি','প্রতীকী ছবি','নিজস্ব ছবি','ফাইল ছবি'];
  var st = {design:(function(){var d=window.SF?String(SF.get('photocard','default','')).trim().toLowerCase():'';for(var i=0;i<DESIGNS.length;i++)if(DESIGNS[i].id===d)return d;return DESIGNS[0].id;})(), size:0, credit:'সংগৃহীত ছবি', title:'', url:'', date:null, img:null, logo:null, qr:null};
  var cache = {}, ui = null, cv = null;

  function bn(s){ return String(s).replace(/[0-9]/g, function(d){ return '০১২৩৪৫৬৭৮৯'[d]; }); }
  function bnDate(d){
    var days=['রবিবার','সোমবার','মঙ্গলবার','বুধবার','বৃহস্পতিবার','শুক্রবার','শনিবার'];
    var mo=['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'];
    return days[d.getDay()]+', '+bn(d.getDate())+' '+mo[d.getMonth()]+' '+bn(d.getFullYear())+' ইং';
  }
  function hiRes(u){ return u ? u.replace(/\/s\d+(-[a-z0-9-]+)?\//i,'/s1600/').replace(/=s\d+(-[a-z0-9-]+)?$/i,'=s1600') : u; }
  function loadImg(u){
    if(!u) return Promise.resolve(null);
    if(cache[u]) return cache[u];
    function one(src){ return new Promise(function(res,rej){ var i=new Image(); i.crossOrigin='anonymous'; i.onload=function(){res(i)}; i.onerror=rej; i.src=src; }); }
    return cache[u] = one(u).catch(function(){ return one('https://wsrv.nl/?url='+encodeURIComponent(u)); }).catch(function(){ return null; });
  }
  function loadScript(src){ return new Promise(function(res,rej){ var s=document.createElement('script'); s.src=src; s.onload=res; s.onerror=rej; document.head.appendChild(s); }); }
  function loadFonts(){
    if(!document.getElementById('mwpc-font')){
      var l=document.createElement('link'); l.id='mwpc-font'; l.rel='stylesheet';
      l.href='https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@500;600;700&display=swap';
      document.head.appendChild(l);
    }
    return Promise.all([document.fonts.load('700 60px "Hind Siliguri"','Aa বাংলা'), document.fonts.load('500 30px "Hind Siliguri"','Aa বাংলা')]).catch(function(){});
  }

  function cover(c,img,x,y,w,h){
    if(!img){ c.fillStyle='#ddd'; c.fillRect(x,y,w,h); return; }
    var r=Math.max(w/img.width,h/img.height), iw=img.width*r, ih=img.height*r;
    c.save(); c.beginPath(); c.rect(x,y,w,h); c.clip();
    c.drawImage(img, x+(w-iw)/2, y+(h-ih)/2, iw, ih); c.restore();
  }
  function rr(c,x,y,w,h,r){ c.beginPath(); c.moveTo(x+r,y); c.arcTo(x+w,y,x+w,y+h,r); c.arcTo(x+w,y+h,x,y+h,r); c.arcTo(x,y+h,x,y,r); c.arcTo(x,y,x+w,y,r); c.closePath(); }
  function wrap(c,text,maxW){
    var words=text.split(/\s+/), lines=[], cur='';
    words.forEach(function(w){ var t=cur?cur+' '+w:w; if(c.measureText(t).width>maxW && cur){ lines.push(cur); cur=w; } else cur=t; });
    if(cur) lines.push(cur); return lines;
  }
  function title(c,x,y,w,h,color,base){
    var size=base+st.size*4, lines, lh;
    for(;size>28;size-=2){ c.font='700 '+size+'px '+CFG.font; lines=wrap(c,st.title,w); lh=size*1.28; if(lines.length*lh<=h) break; }
    c.fillStyle=color; c.textAlign='center'; c.textBaseline='middle';
    var top=y+(h-lines.length*lh)/2+lh/2;
    lines.forEach(function(l,i){ c.fillText(l, x+w/2, top+i*lh); });
  }
  function stripes(c,x,y,w,h){
    c.save(); c.beginPath(); c.rect(x,y,w,h); c.clip(); c.strokeStyle='rgba(255,255,255,.06)'; c.lineWidth=3;
    for(var i=-h;i<w;i+=22){ c.beginPath(); c.moveTo(x+i,y+h); c.lineTo(x+i+h,y); c.stroke(); }
    c.restore();
  }
  function logoBadge(c,cx,cy){
    var lw=156, lh=156;
    if(st.logo){ var r=Math.min(lw/st.logo.width,lh/st.logo.height), w=st.logo.width*r, h=st.logo.height*r; c.save(); c.shadowColor='rgba(0,0,0,.3)'; c.shadowBlur=16; c.drawImage(st.logo,cx-w/2,cy-h/2,w,h); c.restore(); }
  }
  function credit(c,x,y){
    if(!st.credit) return;
    c.font='500 24px '+CFG.font; var t='ছবি: '+st.credit, w=c.measureText(t).width+24;
    c.fillStyle='rgba(0,0,0,.6)'; c.fillRect(x,y-36,w,36);
    c.fillStyle='#fff'; c.textAlign='left'; c.textBaseline='middle'; c.fillText(t,x+12,y-17);
  }
  function qr(c,x,y,s){
    if(!st.qr) return;
    var n=st.qr.getModuleCount(), p=10, m=(s-p*2)/n;
    c.fillStyle='#fff'; rr(c,x,y,s,s,8); c.fill(); c.fillStyle='#000';
    for(var r=0;r<n;r++) for(var k=0;k<n;k++) if(st.qr.isDark(r,k)) c.fillRect(Math.floor(x+p+k*m),Math.floor(y+p+r*m),Math.ceil(m),Math.ceil(m));
  }
  function footer(c,y,h,bg,fg){
    var g=c.createLinearGradient(0,y,W,y); g.addColorStop(0,bg[0]); g.addColorStop(1,bg[1]);
    c.fillStyle=g; c.fillRect(0,y,W,h);
    c.fillStyle=fg; c.textBaseline='middle'; c.textAlign='center'; var cy=y+h/2;
    function fit(t,cx,maxW,wt,sz){ c.font=wt+' '+sz+'px '+CFG.font; while(c.measureText(t).width>maxW&&sz>16){ sz--; c.font=wt+' '+sz+'px '+CFG.font; } c.fillText(t,cx,cy); }
    var dd=bnDate(st.date).split(', '); c.textBaseline='middle'; c.font='500 26px '+CFG.font; c.globalAlpha=.85; c.fillText(dd[0],205,cy-20); c.globalAlpha=1; c.font='700 32px '+CFG.font; var ds=32; while(c.measureText(dd[1]).width>330&&ds>18){ ds--; c.font='700 '+ds+'px '+CFG.font; } c.fillText(dd[1],205,cy+18); fit(CFG.cta,560,320,'700',36); fit(CFG.site,900,300,'700',38);
    c.globalAlpha=.4; c.fillRect(390,cy-28,2,56); c.fillRect(730,cy-28,2,56); c.globalAlpha=1;
  }

  function draw(){
    var c=cv.getContext('2d'); c.clearRect(0,0,W,H); var d=st.design;
    if(d==='red'){
      var ih=760; cover(c,st.img,0,0,W,ih);
      var g=c.createLinearGradient(0,ih,0,H); g.addColorStop(0,'#b30e22'); g.addColorStop(1,CFG.dark);
      c.fillStyle=g; c.fillRect(0,ih,W,H-ih); stripes(c,0,ih,W,H-ih);
      credit(c,0,ih); qr(c,W-130,ih-140,120);
      title(c,60,ih+94,W-120,358,'#fff',72);
      footer(c,H-110,110,['#e2192f','#8e0c19'],'#fff');
      logoBadge(c,W/2,ih);
    } else if(d==='white'){
      var ih=740; c.fillStyle='#fff'; c.fillRect(0,0,W,H); cover(c,st.img,0,0,W,ih);
      credit(c,0,ih); qr(c,W-130,ih-140,120);
      c.fillStyle=CFG.red; c.fillRect(0,ih,W,8);
      title(c,60,ih+94,W-120,368,CFG.ink,70);
      footer(c,H-110,110,[CFG.red,CFG.dark],'#fff');
      logoBadge(c,W/2,ih+4);
    } else if(d==='top'){
      c.fillStyle='#fff'; c.fillRect(0,0,W,H);
      c.fillStyle=CFG.red; c.fillRect(0,0,W,14);
      logoBadge(c,W/2,90);
      title(c,60,150,W-120,330,CFG.ink,68);
      var iy=500, ih2=H-110-iy; cover(c,st.img,0,iy,W,ih2);
      credit(c,0,iy+ih2); qr(c,W-130,iy+ih2-140,120);
      footer(c,H-110,110,[CFG.red,CFG.dark],'#fff');
    } else if(d==='purple'||d==='maroon'){
var MO=['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'];
var dd2=st.date?(bn(st.date.getDate())+' '+MO[st.date.getMonth()]+' '+bn(st.date.getFullYear())):'';
var cel=document.querySelector('.details-category-title a:last-of-type'), cat=cel?cel.textContent.trim():'';
var meta=cat;
var pill=function(x,y,w,h){ if(st.logo){ var r=Math.min(w/st.logo.width,h/st.logo.height), lw=st.logo.width*r, lh=st.logo.height*r; c.save(); c.shadowColor='rgba(0,0,0,.25)'; c.shadowBlur=14; c.drawImage(st.logo,x+(w-lw)/2,y+(h-lh)/2,lw,lh); c.restore(); } };
if(d==='purple'){
var P1='#45185b', P2='#4f1c64', ih=960;
c.fillStyle=P1; c.fillRect(0,0,W,H);
cover(c,st.img,0,0,W,ih);
var g=c.createLinearGradient(0,ih-480,0,ih); g.addColorStop(0,'rgba(69,24,91,0)'); g.addColorStop(.45,'rgba(69,24,91,.35)'); g.addColorStop(.8,'rgba(69,24,91,.9)'); g.addColorStop(1,P1);
c.fillStyle=g; c.fillRect(0,ih-480,W,481);
var g2=c.createLinearGradient(0,ih,0,H); g2.addColorStop(0,P1); g2.addColorStop(1,P2); c.fillStyle=g2; c.fillRect(0,ih,W,H-ih);
credit(c,0,ih-500);
pill(W-60-130,40,130,130);
meta=[cat,dd2].filter(Boolean).join('  |  ');
var PF='"Noto Serif Bengali",'+CFG.font; c.font='600 32px '+PF; var ms2=32; while(c.measureText(meta).width>W-200&&ms2>22){ms2--;c.font='600 '+ms2+'px '+PF;} var mw=c.measureText(meta).width+60;
if(meta){ c.fillStyle='rgba(38,30,105,.82)'; rr(c,W/2-mw/2,836,mw,64,4); c.fill();
c.fillStyle='#fff'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(meta,W/2,869); }
title(c,70,918,W-140,250,'#fff',70);
c.font='600 30px '+CFG.font; c.fillStyle='rgba(255,255,255,.92)'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(CFG.cta,W/2,1192);
c.fillStyle='#8a56c7'; c.fillRect(W/2-64,1222,128,5);
c.font='500 32px '+CFG.font; var sw=c.measureText(CFG.site).width; var sx=W/2+18;
c.fillStyle='rgba(255,255,255,.85)'; c.textAlign='center'; c.fillText(CFG.site,sx,1282);
var gx=sx-sw/2-26, gy=1282; c.strokeStyle='rgba(255,255,255,.85)'; c.lineWidth=2.5;
c.beginPath(); c.arc(gx,gy,13,0,Math.PI*2); c.stroke(); c.beginPath(); c.ellipse(gx,gy,6,13,0,0,Math.PI*2); c.stroke();
c.beginPath(); c.moveTo(gx-13,gy); c.lineTo(gx+13,gy); c.stroke();
qr(c,60,H-160,110);
c.fillStyle='#6b36a3'; c.fillRect(0,H-14,W,14);
} else {
/* Kalo-Merun card (title-e *shobdo* dile holud hobe) */
var ih=760, YL='#ffd21f';
cover(c,st.img,0,0,W,ih);
var bg=c.createLinearGradient(0,ih,0,H); bg.addColorStop(0,'#060304'); bg.addColorStop(.45,'#2a0507'); bg.addColorStop(1,'#640c0e'); c.fillStyle=bg; c.fillRect(0,ih,W,H-ih);
var sh=c.createLinearGradient(0,ih-70,0,ih); sh.addColorStop(0,'rgba(6,3,4,0)'); sh.addColorStop(1,'rgba(6,3,4,.55)'); c.fillStyle=sh; c.fillRect(0,ih-70,W,70);
if(st.logo){ var wr=Math.min(460/st.logo.width,460/st.logo.height); c.save(); c.globalAlpha=.06; c.drawImage(st.logo,W/2-st.logo.width*wr/2,ih+(H-ih)/2-st.logo.height*wr/2+10,st.logo.width*wr,st.logo.height*wr); c.restore(); }
credit(c,0,ih);
var PF2='"Noto Serif Bengali",'+CFG.font;
if(dd2){ c.font='700 30px '+PF2; c.fillStyle='#fff'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(dd2,W/2,ih+62); }
var raw=String(st.title||''), toks=[], hasM=raw.indexOf('*')>-1;
if(hasM){ raw.split('*').forEach(function(seg,i){ seg.split(/\s+/).filter(Boolean).forEach(function(w){ toks.push({w:w,h:i%2===1}); }); }); }
else { var ws=raw.split(/\s+/).filter(Boolean), hs=Math.floor(ws.length*.4), he=hs+Math.max(1,Math.round(ws.length*.3)); ws.forEach(function(w,i){ toks.push({w:w,h:ws.length>3&&i>=hs&&i<he}); }); }
var bx=60, bw=W-120, by=ih+110, bh=H-210-(ih+110), fs=72+st.size*4, lines2, lh2;
for(;fs>28;fs-=2){ c.font='700 '+fs+'px '+CFG.font; lh2=fs*1.32; lines2=[]; var cur=[];
  toks.forEach(function(t){ var tryL=cur.concat([t]); if(cur.length&&c.measureText(tryL.map(function(x){return x.w}).join(' ')).width>bw){ lines2.push(cur); cur=[t]; } else cur=tryL; });
  if(cur.length)lines2.push(cur); if(lines2.length*lh2<=bh) break; }
var spc=c.measureText(' ').width, ty=by+(bh-lines2.length*lh2)/2+lh2/2;
c.textAlign='left'; c.textBaseline='middle';
lines2.forEach(function(ln,i){ var tw=ln.reduce(function(a,t){return a+c.measureText(t.w).width},0)+spc*(ln.length-1), x=W/2-tw/2;
  ln.forEach(function(t){ c.fillStyle=t.h?YL:'#fff'; c.fillText(t.w,x,ty+i*lh2); x+=c.measureText(t.w).width+spc; }); });
c.textAlign='left'; c.fillStyle='#fff'; c.font='700 32px '+CFG.font; c.fillText(CFG.cta+' ...',70,H-128);
c.font='500 36px Arial,sans-serif'; if('letterSpacing' in c)c.letterSpacing='5px'; c.fillStyle='rgba(255,255,255,.92)'; c.fillText('www.'+CFG.site,70,H-68); if('letterSpacing' in c)c.letterSpacing='0px';
if(st.logo){ var lr=Math.min(230/st.logo.width,140/st.logo.height), lw2=st.logo.width*lr, lh3=st.logo.height*lr; c.drawImage(st.logo,W-70-lw2,H-98-lh3/2,lw2,lh3); }
}
} else {
      c.fillStyle='#14161b'; c.fillRect(0,0,W,H); stripes(c,0,0,W,H);
      var fx=50, fy=50, fw=W-100, fh=640;
      c.fillStyle='#fff'; c.fillRect(fx-10,fy-10,fw+20,fh+20);
      cover(c,st.img,fx,fy,fw,fh); credit(c,fx,fy+fh); qr(c,fx+fw-130,fy+fh-140,120);
      logoBadge(c,W/2,fy+fh+10);
      title(c,60,fy+fh+100,W-120,360,'#fff',70);
      footer(c,H-110,110,[CFG.red,CFG.dark],'#fff');
    }
  }

  function css(){
    if(document.getElementById('mwpc-css')) return;
    var s=document.createElement('style'); s.id='mwpc-css';
    s.textContent='.mwpc-ov{position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;padding:12px;font-family:"Hind Siliguri","Noto Serif Bengali",sans-serif}'+
    '.mwpc-box{background:#fff;color:#222;border-radius:14px;max-width:1000px;width:100%;max-height:96vh;overflow:auto;display:grid;grid-template-columns:1.25fr 1fr;gap:22px;padding:20px;position:relative}'+
    '.mwpc-box canvas{width:100%;height:auto;display:block;border-radius:8px;box-shadow:0 2px 12px rgba(0,0,0,.15)}'+
    '.mwpc-x{position:fixed!important;top:14px!important;right:14px!important;z-index:100001!important;width:44px!important;height:44px!important;min-width:0!important;padding:0!important;margin:0!important;border:0!important;border-radius:50%!important;background:#fff!important;color:#111!important;font-size:30px!important;line-height:44px!important;text-align:center!important;cursor:pointer;box-shadow:0 2px 12px rgba(0,0,0,.35)!important;display:block!important}.mwpc-x:hover{background:'+CFG.red+'!important;color:#fff!important}'+
    '.mwpc-side h3{margin:0 0 14px;font-size:20px}.mwpc-side h4{margin:16px 0 8px;font-size:16px}.mwpc-side small{color:#777;font-size:12px}'+
    '.mwpc-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}'+
    '.mwpc-o{border:1px solid #ccc;background:#fff;border-radius:6px;padding:7px 12px;cursor:pointer;font:inherit;font-size:14px;color:#222}'+
    '.mwpc-o.on{background:'+CFG.red+';border-color:'+CFG.red+';color:#fff}'+
    '.mwpc-r{width:40px;height:40px;border-radius:50%;border:1px solid #ccc;background:#fff;font-size:22px;cursor:pointer}'+
    '.mwpc-n{min-width:40px;text-align:center;font-weight:700;font-size:18px}'+
    '.mwpc-side input,.mwpc-side textarea{width:100%;box-sizing:border-box;border:1px solid #ccc;border-radius:6px;padding:8px 10px;font:inherit;font-size:14px;margin-top:8px}'+
    '.mwpc-dl{width:100%;margin-top:18px;background:'+CFG.red+';color:#fff;border:0;border-radius:8px;padding:14px;font:inherit;font-size:18px;font-weight:700;cursor:pointer}'+
    '.mwpc-dl:disabled{opacity:.6}'+
    '.mwpc-btn{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;margin:22px 0;padding:13px 18px;border:2px solid '+CFG.red+';border-radius:10px;background:#fff5f6;color:'+CFG.red+';font-family:inherit;font-size:17px;font-weight:700;cursor:pointer;transition:.2s}'+
    '.mwpc-btn:hover{background:'+CFG.red+';color:#fff}'+
    '@media(max-width:760px){.mwpc-box{grid-template-columns:1fr;padding:14px}}';
    document.head.appendChild(s);
  }

  function opts(list,key,el){
    el.innerHTML=''; list.forEach(function(o){
      var b=document.createElement('button'); b.type='button'; b.className='mwpc-o'+(st[key]===o.v?' on':''); b.textContent=o.t;
      b.onclick=function(){ st[key]=(key==='credit'&&st[key]===o.v)?'':o.v; opts(list,key,el); if(key==='credit') ui.querySelector('.mwpc-cin').value=''; draw(); };
      el.appendChild(b);
    });
  }

  function open(btn){
    css();
    st.title=(btn.getAttribute('data-title')||document.title).replace(/^\s*[^|•]{1,45}?\s*[|•]\s+/,'');
    st.url=btn.getAttribute('data-url')||location.href.split('?')[0];
    var dd=new Date(btn.getAttribute('data-date')||''); st.date=isNaN(dd)?new Date():dd;
    var og=document.querySelector('meta[property="og:image"]'), fi=document.querySelector('#post-body img, .post-body img');
    var imgUrl=hiRes(btn.getAttribute('data-img')||(fi&&fi.src)||(og&&og.content)||'');
    ui=document.createElement('div'); ui.className='mwpc-ov';
    ui.innerHTML='<div class="mwpc-box"><button class="mwpc-x" type="button" aria-label="বন্ধ">×</button>'+
      '<div><canvas width="'+W+'" height="'+H+'"></canvas></div>'+
      '<div class="mwpc-side"><h3>ফটোকার্ড ডাউনলোড</h3>'+
      '<h4>শিরোনামের লেখার আকার</h4><div class="mwpc-row"><button class="mwpc-r" data-s="-1" type="button">−</button><span class="mwpc-n"></span><button class="mwpc-r" data-s="1" type="button">+</button></div>'+
      '<small>শিরোনাম জায়গায় না ধরলে লেখা নিজে থেকেই একটু ছোট হয়ে যায়।</small>'+
      '<h4>শিরোনাম সম্পাদনা</h4><textarea class="mwpc-t" rows="2"></textarea>'+
      '<h4>ডিজাইন</h4><div class="mwpc-row mwpc-d"></div>'+
      '<h4>ছবির ক্রেডিট <small>(কার্ডে ছোট করে উপরে দেখাবে)</small></h4><div class="mwpc-row mwpc-c"></div>'+
      '<input class="mwpc-cin" placeholder="অথবা নিজে লিখুন (খালি রাখলে কিছু দেখাবে না)">'+
      '<button class="mwpc-dl" type="button" disabled>লোড হচ্ছে...</button></div></div>';
    document.body.appendChild(ui); document.body.style.overflow='hidden';
    cv=ui.querySelector('canvas');
    function close(){ ui.remove(); document.body.style.overflow=''; }
    ui.querySelector('.mwpc-x').onclick=close;
    ui.onclick=function(e){ if(e.target===ui) close(); };
    var num=ui.querySelector('.mwpc-n'); num.textContent=bn(72+st.size*4);
    ui.querySelectorAll('.mwpc-r').forEach(function(b){ b.onclick=function(){ st.size=Math.max(-8,Math.min(8,st.size+ +b.getAttribute('data-s'))); num.textContent=bn(72+st.size*4); draw(); }; });
    var ta=ui.querySelector('.mwpc-t'); ta.value=st.title; ta.oninput=function(){ st.title=ta.value.trim()||' '; draw(); };
    opts(DESIGNS.map(function(d){return {v:d.id,t:d.name}}),'design',ui.querySelector('.mwpc-d'));
    opts(CREDITS.map(function(c){return {v:c,t:c}}),'credit',ui.querySelector('.mwpc-c'));
    var cin=ui.querySelector('.mwpc-cin'); cin.oninput=function(){ st.credit=cin.value.trim(); opts(CREDITS.map(function(c){return {v:c,t:c}}),'credit',ui.querySelector('.mwpc-c')); draw(); };
    var dl=ui.querySelector('.mwpc-dl');
    dl.onclick=function(){
      cv.toBlob(function(b){
        var a=document.createElement('a'); a.href=URL.createObjectURL(b);
        a.download='photocard-'+(st.url.split('/').pop().replace('.html','')||'news')+'.jpg';
        document.body.appendChild(a); a.click(); a.remove(); setTimeout(function(){URL.revokeObjectURL(a.href)},4000);
      },'image/jpeg',0.92);
    };
    var qrLib=window.qrcode?Promise.resolve():loadScript('https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js').catch(function(){});
    Promise.all([loadFonts(), loadImg(imgUrl), loadImg(CFG.logo), qrLib]).then(function(r){
      st.img=r[1]; st.logo=r[2];
      if(window.qrcode){ try{ var q=qrcode(0,'M'); q.addData(st.url); q.make(); st.qr=q; }catch(e){} }
      draw(); dl.disabled=false; dl.innerHTML='⬇ ডাউনলোড করুন';
    });
    draw();
  }

  document.addEventListener('click',function(e){ var b=e.target.closest&&e.target.closest('.mwpc-btn'); if(b){ e.preventDefault(); open(b); } });
  css();
})();

}catch(e){console&&console.error&&console.error("fn-main #3",e)}

/* #4 (theme L6698) */
try{

(function(){
  var RED='#c8102e';
  var D=[['ঢাকা',23.8103,90.4125],['গাজীপুর',24.0023,90.4264],['নারায়ণগঞ্জ',23.6238,90.5000],['নরসিংদী',23.9322,90.7154],['মানিকগঞ্জ',23.8617,90.0003],['মুন্সিগঞ্জ',23.5422,90.5305],['টাঙ্গাইল',24.2513,89.9167],['কিশোরগঞ্জ',24.4449,90.7766],['ফরিদপুর',23.6070,89.8429],['গোপালগঞ্জ',23.0050,89.8266],['মাদারীপুর',23.1641,90.1897],['শরীয়তপুর',23.2423,90.4348],['রাজবাড়ী',23.7574,89.6445],['চট্টগ্রাম',22.3569,91.7832],['কক্সবাজার',21.4272,92.0058],['কুমিল্লা',23.4607,91.1809],['ফেনী',23.0159,91.3976],['নোয়াখালী',22.8696,91.0995],['লক্ষ্মীপুর',22.9447,90.8282],['চাঁদপুর',23.2333,90.6713],['ব্রাহ্মণবাড়িয়া',23.9571,91.1119],['রাঙ্গামাটি',22.6533,92.1750],['খাগড়াছড়ি',23.1193,91.9847],['বান্দরবান',22.1953,92.2184],['রাজশাহী',24.3745,88.6042],['নাটোর',24.4206,89.0003],['নওগাঁ',24.7936,88.9318],['চাঁপাইনবাবগঞ্জ',24.5965,88.2776],['পাবনা',24.0064,89.2372],['সিরাজগঞ্জ',24.4534,89.7007],['বগুড়া',24.8465,89.3773],['জয়পুরহাট',25.0968,89.0227],['খুলনা',22.8456,89.5403],['যশোর',23.1664,89.2081],['সাতক্ষীরা',22.7185,89.0705],['বাগেরহাট',22.6516,89.7859],['কুষ্টিয়া',23.9013,89.1205],['ঝিনাইদহ',23.5450,89.1726],['মাগুরা',23.4873,89.4199],['নড়াইল',23.1725,89.5126],['চুয়াডাঙ্গা',23.6402,88.8418],['মেহেরপুর',23.7622,88.6318],['বরিশাল',22.7010,90.3535],['পটুয়াখালী',22.3596,90.3299],['ভোলা',22.6859,90.6482],['পিরোজপুর',22.5841,89.9720],['বরগুনা',22.0953,90.1121],['ঝালকাঠি',22.6406,90.1987],['সিলেট',24.8949,91.8687],['মৌলভীবাজার',24.4829,91.7774],['হবিগঞ্জ',24.3749,91.4155],['সুনামগঞ্জ',25.0658,91.3950],['রংপুর',25.7439,89.2752],['দিনাজপুর',25.6217,88.6354],['ঠাকুরগাঁও',26.0336,88.4616],['পঞ্চগড়',26.3411,88.5542],['নীলফামারী',25.9310,88.8560],['লালমনিরহাট',25.9923,89.2847],['কুড়িগ্রাম',25.8054,89.6362],['গাইবান্ধা',25.3288,89.5281],['ময়মনসিংহ',24.7471,90.4203],['জামালপুর',24.9375,89.9378],['শেরপুর',25.0205,90.0153],['নেত্রকোনা',24.8709,90.7279]];
  var HM=['মুহাররম','সফর','রবিউল আউয়াল','রবিউস সানি','জমাদিউল আউয়াল','জমাদিউস সানি','রজব','শাবান','রমজান','শাওয়াল','জিলকদ','জিলহজ'];
  function bn(s){ return String(s).replace(/[0-9]/g,function(d){return '০১২৩৪৫৬৭৮৯'[d];}); }
  function ls(k,v){ try{ if(v===undefined) return JSON.parse(localStorage.getItem(k)||'null'); localStorage.setItem(k,JSON.stringify(v)); }catch(e){ return null; } }
  function j(u){ return fetch(u).then(function(r){ if(!r.ok) throw 0; return r.json(); }); }
  function period(h,m){ var t=h*60+m; return t<240?'রাত':t<360?'ভোর':t<720?'সকাল':t<900?'দুপুর':t<1050?'বিকেল':t<1140?'সন্ধ্যা':'রাত'; }
  function t12(s){ var p=s.split(':'), h=+p[0], m=+p[1]; var hh=h%12||12; return period(h,m)+' '+bn(hh)+':'+bn(('0'+m).slice(-2)); }
  function wx(code,day){
    var M={0:['পরিষ্কার আকাশ','sun'],1:['প্রায় পরিষ্কার','sun'],2:['আংশিক মেঘলা','pc'],3:['মেঘলা আকাশ','cloud'],45:['কুয়াশা','fog'],48:['ঘন কুয়াশা','fog'],51:['গুঁড়ি গুঁড়ি বৃষ্টি','rain'],53:['গুঁড়ি গুঁড়ি বৃষ্টি','rain'],55:['গুঁড়ি গুঁড়ি বৃষ্টি','rain'],61:['হালকা বৃষ্টি','rain'],63:['বৃষ্টি','rain'],65:['ভারী বৃষ্টি','rain'],80:['হালকা বর্ষণ','rain'],81:['বর্ষণ','rain'],82:['প্রবল বর্ষণ','rain'],95:['বজ্রসহ বৃষ্টি','storm'],96:['বজ্রসহ শিলাবৃষ্টি','storm'],99:['বজ্রসহ শিলাবৃষ্টি','storm']};
    var r=M[code]||['মেঘলা আকাশ','cloud']; if(!day&&(r[1]==='sun')) r=[code===0?'পরিষ্কার আকাশ':r[0],'moon']; if(!day&&r[1]==='pc') r=[r[0],'moonc']; return r;
  }
  function icon(k){
    var sun='<circle cx="32" cy="32" r="12" fill="#f9b233"/><g stroke="#f9b233" stroke-width="4" stroke-linecap="round"><path d="M32 6v7M32 51v7M6 32h7M51 32h7M13.6 13.6l5 5M45.4 45.4l5 5M13.6 50.4l5-5M45.4 18.6l5-5"/></g>';
    var cloud='<path d="M20 50h26a10 10 0 0 0 0-20 14 14 0 0 0-27-3A11.5 11.5 0 0 0 20 50z" fill="#b8c4d6"/>';
    var moon='<path d="M40 10a22 22 0 1 0 14 34A18 18 0 0 1 40 10z" fill="#f4d35e"/>';
    var I={sun:sun, moon:moon, cloud:cloud,
      pc:'<g transform="translate(-6 -8) scale(.8)">'+sun+'</g>'+cloud, moonc:'<g transform="translate(-4 -8) scale(.7)">'+moon+'</g>'+cloud,
      rain:cloud+'<g stroke="#3b82f6" stroke-width="3" stroke-linecap="round"><path d="M24 54l-3 6M34 54l-3 6M44 54l-3 6"/></g>',
      storm:cloud+'<path d="M34 50l-6 9h6l-4 8 10-12h-6l4-5z" fill="#f9b233"/>',
      fog:'<g stroke="#9aa6b8" stroke-width="4" stroke-linecap="round"><path d="M12 24h40M8 34h48M14 44h36"/></g>'};
    return '<svg viewBox="0 0 64 64" width="84" height="84">'+(I[k]||cloud)+'</svg>';
  }
  var PIN='<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>';
  var DL='<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>';

  function css(){
    var s=document.createElement('style');
    s.textContent='.mwwp{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin:0 0 24px;font-family:inherit}'+
    '.mwwp *{box-sizing:border-box}.mwwp-c{border:1px solid #ececec;border-radius:12px;padding:18px 20px;display:flex;flex-direction:column;min-height:330px}'+
    '.mwwp-w{background:linear-gradient(180deg,#eaf3ff,#f7fbff)}.mwwp-p{background:linear-gradient(180deg,#eaf8ef,#f7fcf8)}'+
    '.mwwp-h{text-align:center;font-size:20px;font-weight:700;margin:0 0 4px;color:#222}.mwwp-h:after{content:"";display:block;width:56px;height:3px;border-radius:2px;margin:8px auto 0;background:'+RED+'}'+
    '.mwwp-loc{display:flex;justify-content:center;align-items:center;gap:6px;font-size:13px;color:#555;margin:6px 0 10px;flex-wrap:wrap}'+
    '.mwwp-loc button{border:0;background:none;color:'+RED+';cursor:pointer;font:inherit;font-size:13px;text-decoration:underline;padding:0}'+
    '.mwwp-now{display:flex;align-items:center;justify-content:center;gap:12px;margin:6px 0 12px}'+
    '.mwwp-t{font-size:52px;font-weight:700;line-height:1;color:#111}.mwwp-t .mwwp-u{font-size:20px;display:inline-block;vertical-align:top;margin:4px 0 0 3px;line-height:1}.mwwp-d{font-size:14px;color:#555;margin-top:6px}'+
    '.mwwp-g{display:grid;grid-template-columns:1fr 1fr;column-gap:20px;margin-top:auto}'+
    '.mwwp-r{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(0,0,0,.07);font-size:14px;color:#555}.mwwp-r b{color:#111}'+
    '.mwwp-r.on{background:#fff;border-radius:6px;padding:8px 10px;margin:0 -10px;border-color:transparent;box-shadow:0 1px 6px rgba(0,0,0,.06)}.mwwp-r.on span,.mwwp-r.on b{color:#0a7a3b}'+
    '.mwwp-nx{text-align:center;font-size:13px;color:#0a7a3b;margin:0 0 6px;min-height:18px}'+
    '.mwwp-f{display:flex;justify-content:space-between;align-items:center;border-top:1px solid rgba(0,0,0,.08);margin-top:12px;padding-top:10px;font-size:12px;color:#666}'+
    '.mwwp-f button{border:0;background:none;cursor:pointer;display:flex;align-items:center;gap:5px;font:inherit;font-size:13px;color:#333}.mwwp-f button:hover{color:'+RED+'}'+
    '.mwwp-sel{display:none;gap:6px;justify-content:center;margin:0 0 10px;flex-wrap:wrap}.mwwp-sel.on{display:flex}'+
    '.mwwp-sel select{padding:6px 8px;border:1px solid #ccc;border-radius:6px;font:inherit;font-size:13px;max-width:160px}'+
    '.mwwp-sel button{padding:6px 10px;border:1px solid '+RED+';color:'+RED+';background:#fff;border-radius:6px;cursor:pointer;font:inherit;font-size:13px}'+
    '.mwwp-ld{margin:auto;color:#888;font-size:14px}'+
    '@media(max-width:768px){.mwwp{grid-template-columns:1fr;gap:14px}.mwwp-c{min-height:0}}';
    document.head.appendChild(s);
  }

  var box, loc;
  function build(anchor){
    box=document.createElement('div'); box.className='mwwp'; box.id='mw-weather-prayer';
    var opts=D.map(function(d,i){return '<option value="'+i+'">'+d[0]+'</option>';}).join('');
    var sel='<div class="mwwp-sel"><select>'+opts+'</select><button type="button" data-a="set">ঠিক আছে</button><button type="button" data-a="gps">'+PIN+' আমার লোকেশন</button></div>';
    box.innerHTML='<div class="mwwp-c mwwp-w"><div class="mwwp-h"><span class="mwwp-cn">আপনার এলাকার</span> আবহাওয়া</div><div class="mwwp-loc">'+PIN+'<span class="mwwp-cn2">লোকেশন খোঁজা হচ্ছে...</span><button type="button" data-a="chg">পরিবর্তন</button></div>'+sel+'<div class="mwwp-body mwwp-ld">লোড হচ্ছে...</div></div>'+
      '<div class="mwwp-c mwwp-p"><div class="mwwp-h"><span class="mwwp-cn">আপনার এলাকার</span> নামাজের সময়সূচি</div><div class="mwwp-loc">'+PIN+'<span class="mwwp-cn2"></span><button type="button" data-a="chg">পরিবর্তন</button></div>'+sel+'<div class="mwwp-body mwwp-ld">লোড হচ্ছে...</div></div>';
    if(anchor.id==='mw-weather-prayer-slot'){ anchor.appendChild(box); var wd=anchor.closest('.widget'); if(wd&&wd.className.indexOf('mw91-done')<0) wd.className+=' mw91-done'; } else anchor.parentNode.insertBefore(box,anchor);
    box.addEventListener('click',function(e){
      var b=e.target.closest('button'); if(!b) return; var a=b.getAttribute('data-a'), card=b.closest('.mwwp-c');
      if(a==='chg'){ var s=card.querySelector('.mwwp-sel'); s.classList.toggle('on'); }
      else if(a==='set'){ var d=D[+card.querySelector('select').value]; setLoc({name:d[0],lat:d[1],lon:d[2],manual:1}); }
      else if(a==='gps'){ gps(); }
      else if(a==='dl'){ download(card); }
    });
  }
  function setLoc(l){
    loc=l; if(l.manual||l.gps) ls('mwwp_loc',l);
    box.querySelectorAll('.mwwp-sel').forEach(function(s){ s.classList.remove('on'); });
    box.querySelectorAll('.mwwp-cn').forEach(function(e){ e.textContent=l.name+(/[া-ৌঅ-ঔ]$/.test(l.name)?'র':'ের'); });
    box.querySelectorAll('.mwwp-cn2').forEach(function(e){ e.textContent=l.name+(l.region&&l.region!==l.name?', '+l.region:''); });
    weather(); prayer();
  }
  function rev(lat,lon){
    return j('https://api.bigdatacloud.net/data/reverse-geocode-client?localityLanguage=bn'+(lat!=null?'&latitude='+lat+'&longitude='+lon:'')).then(function(g){
      return {name:g.city||g.locality||g.principalSubdivision||'আপনার এলাকা', region:(g.principalSubdivision||'').replace(' বিভাগ',''), lat:lat!=null?lat:g.latitude, lon:lon!=null?lon:g.longitude};
    });
  }
  function gps(){
    if(!navigator.geolocation) return;
    box.querySelectorAll('.mwwp-cn2').forEach(function(e){ e.textContent='লোকেশন খোঁজা হচ্ছে...'; });
    navigator.geolocation.getCurrentPosition(function(p){
      var la=+p.coords.latitude.toFixed(4), lo=+p.coords.longitude.toFixed(4);
      rev(la,lo).then(function(l){ l.gps=1; setLoc(l); }).catch(function(){ setLoc({name:'আপনার এলাকা',lat:la,lon:lo,gps:1}); });
    }, function(){ setLoc(loc||{name:'ঢাকা',lat:23.8103,lon:90.4125}); }, {timeout:10000, maximumAge:600000});
  }
  function weather(){
    var c=box.querySelector('.mwwp-w .mwwp-body');
    j('https://api.open-meteo.com/v1/forecast?latitude='+loc.lat+'&longitude='+loc.lon+'&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,is_day&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto&forecast_days=1').then(function(d){
      var n=d.current, w=wx(n.weather_code,n.is_day), r=function(a,b){return '<div class="mwwp-r"><span>'+a+'</span><b>'+b+'</b></div>';};
      c.className='mwwp-body'; c.style.cssText='display:flex;flex-direction:column;flex:1';
      c.innerHTML='<div class="mwwp-now">'+icon(w[1])+'<div><div class="mwwp-t">'+bn(Math.round(n.temperature_2m))+'<span class="mwwp-u">°সে</span></div><div class="mwwp-d">'+w[0]+'</div></div></div>'+
        '<div class="mwwp-g">'+r('অনুভূত',bn(Math.round(n.apparent_temperature))+'°')+r('আর্দ্রতা',bn(n.relative_humidity_2m)+'%')+r('বাতাস',bn(Math.round(n.wind_speed_10m))+' কিমি/ঘ')+r('সর্বোচ্চ',bn(Math.round(d.daily.temperature_2m_max[0]))+'°')+
        r('সর্বনিম্ন',bn(Math.round(d.daily.temperature_2m_min[0]))+'°')+r('সূর্যোদয়',t12(d.daily.sunrise[0].split('T')[1]))+r('সূর্যাস্ত',t12(d.daily.sunset[0].split('T')[1]))+'</div>'+
        '<div class="mwwp-f"><span>সূত্র: Open-Meteo</span><button type="button" data-a="dl">'+DL+' ডাউনলোড</button></div>';
    }).catch(function(){ c.textContent='আবহাওয়ার তথ্য পাওয়া যায়নি'; });
  }
  var timer;
  function prayer(){
    var c=box.querySelector('.mwwp-p .mwwp-body');
    j('https://api.aladhan.com/v1/timings?latitude='+loc.lat+'&longitude='+loc.lon+'&method=1&school=1&tune=0,0,1,1,0,2,0,0,0').then(function(d){
      var t=d.data.timings, h=d.data.date.hijri;
      var L=[['ফজর','Fajr'],['সূর্যোদয়','Sunrise'],['যোহর','Dhuhr'],['আসর','Asr'],['মাগরিব','Maghrib'],['এশা','Isha']];
      c.className='mwwp-body'; c.style.cssText='display:flex;flex-direction:column;flex:1';
      c.innerHTML='<div class="mwwp-nx"></div><div>'+L.map(function(x){ return '<div class="mwwp-r" data-k="'+x[1]+'"><span>'+x[0]+'</span><b>'+t12(t[x[1]].slice(0,5))+'</b></div>'; }).join('')+'</div>'+
        '<div class="mwwp-f" style="margin-top:auto"><span>'+bn(h.day)+' '+HM[h.month.number-1]+' '+bn(h.year)+' হিজরি • ইসলামিক ফাউন্ডেশন পদ্ধতি</span><button type="button" data-a="dl">'+DL+' ডাউনলোড</button></div>';
      function tick(){
        var now=new Date(), m=now.getHours()*60+now.getMinutes(), nx=null;
        var P=L.filter(function(x){return x[1]!=='Sunrise';});
        for(var i=0;i<P.length;i++){ var p=t[P[i][1]].slice(0,5).split(':'), pm=+p[0]*60+ +p[1]; if(pm>m){ nx=[P[i],pm-m]; break; } }
        if(!nx){ var f=t.Fajr.split(':'); nx=[P[0], 1440-m + (+f[0]*60+ +f[1])]; }
        c.querySelectorAll('.mwwp-r').forEach(function(r){ r.classList.toggle('on', r.getAttribute('data-k')===nx[0][1]); });
        var hh=Math.floor(nx[1]/60), mm=nx[1]%60;
        c.querySelector('.mwwp-nx').textContent='পরবর্তী ওয়াক্ত '+nx[0][0]+' — '+(hh?bn(hh)+' ঘণ্টা ':'')+bn(mm)+' মিনিট বাকি';
      }
      tick(); clearInterval(timer); timer=setInterval(tick,30000);
    }).catch(function(){ c.textContent='নামাজের সময় পাওয়া যায়নি'; });
  }
  function download(card){
    function go(){
      card.querySelectorAll('.mwwp-f button,.mwwp-loc button,.mwwp-sel').forEach(function(e){ e.style.visibility='hidden'; });
      html2canvas(card,{scale:2,backgroundColor:'#ffffff',useCORS:true}).then(function(cv){
        card.querySelectorAll('.mwwp-f button,.mwwp-loc button,.mwwp-sel').forEach(function(e){ e.style.visibility=''; });
        var x=cv.getContext('2d'); x.font='600 22px sans-serif'; x.fillStyle='#999'; x.textAlign='right'; x.fillText('masudwap.com',cv.width-24,cv.height-14);
        var a=document.createElement('a'); a.href=cv.toDataURL('image/png'); a.download=(card.classList.contains('mwwp-w')?'weather':'prayer-time')+'-masudwap.png'; document.body.appendChild(a); a.click(); a.remove();
      });
    }
    if(window.html2canvas) go(); else { var s=document.createElement('script'); s.src='https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'; s.onload=go; document.head.appendChild(s); }
  }

  function init(){
    var anchor=document.getElementById('mw-weather-prayer-slot')||document.getElementById('HTML35'); if(!anchor||document.getElementById('mw-weather-prayer')) return !!anchor;
    css(); build(anchor);
    var saved=ls('mwwp_loc');
    if(saved&&saved.lat) setLoc(saved);
    else rev().then(setLoc).catch(function(){ setLoc({name:'ঢাকা',lat:23.8103,lon:90.4125}); });
    return true;
  }
  var tries=0; (function wait(){ if(init()||++tries>20) return; setTimeout(wait,500); })();
})();

}catch(e){console&&console.error&&console.error("fn-main #4",e)}

/* #5 (theme L6986) */
try{

if(window.SF&&!SF.on('article')){}else (function(){
  var top=document.querySelector('.details-content-top'), pb=document.getElementById('post-body'); if(!top||!pb||pb.getAttribute('data-aj'))return; pb.setAttribute('data-aj','1');
  var cat=document.querySelector('.details-category-title');
  if(cat&&!cat.querySelector('.aj-sep')){var h=document.createElement('a');h.href='/';h.textContent='সংবাদ';var sp=document.createElement('span');sp.className='aj-sep';sp.textContent='|';cat.insertBefore(sp,cat.firstChild);cat.insertBefore(h,sp);}
  var first=null; for(var i=0;i<pb.children.length&&i<3;i++){var c=pb.children[i]; if(c.querySelector&&c.querySelector('img')&&c.textContent.trim().length<5){first=c;break;} if(c.textContent.trim().length>5)break;}
  if(first)first.classList.add('aj-feat');
  var sl=top.querySelector('.small-left'), ps=sl?sl.querySelectorAll('p'):[];
  var au=sl?sl.querySelector('a'):null, dt=ps.length>1?ps[ps.length-1].textContent.replace(/^\s*প্রকাশিত\s*:\s*/,'').trim():'';
  var fav=document.querySelector('link[rel~="icon"]'), logo=document.querySelector('#nav .navbar-brand img');
  var av=logo?logo.src:(fav?fav.href:'');
  var b=document.createElement('div'); b.className='aj-byline';
  b.innerHTML='<div class="aj-by">'+(av?'<img class="aj-av" alt="" src="'+av.replace(/"/g,'&quot;')+'"/>':'')+'<span>লিখেছেন <a></a></span></div>'+(dt?'<div class="aj-date"></div>':'');
  var a=b.querySelector('.aj-by a'); if(au){a.href=au.href;a.textContent=au.textContent.trim();}else{a.textContent=document.title.split('|').pop().trim();}
  if(dt)b.querySelector('.aj-date').textContent=dt;
  if(first)pb.insertBefore(b,first.nextSibling); else pb.insertBefore(b,pb.firstChild);
})();

}catch(e){console&&console.error&&console.error("fn-main #5",e)}

/* #6 (theme L7007) */
try{

if(window.SF&&!SF.on('label')){}else (function(){var tries=0;var run=function(){
  var wrap=document.getElementById('cn-wrap'), shell=wrap&&wrap.querySelector('.cn-shell'), left=shell&&shell.querySelector('.new-category-design-left');
  if(!left){if(tries++<30)setTimeout(run,200);return;}
  if(document.body.classList.contains('ajc-on'))return; document.body.classList.add('ajc-on');
  var q=(new URLSearchParams(location.search).get('q')||'').trim();
  var isLabel=/^\/search\/label\//.test(location.pathname);
  var base=isLabel?'/feeds/posts/summary/-/'+encodeURIComponent(decodeURIComponent(location.pathname.split('/label/')[1]).replace(/\+/g,' ')):'/feeds/posts/summary';
  var extra=(!isLabel&&q)?'&q='+encodeURIComponent(q):'';
  var bn=function(n){return String(n).replace(/\d/g,function(d){return '০১২৩৪৫৬৭৮৯'[d];});};
  var M=['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'];
  var dt=function(iso){var d=new Date(iso);return isNaN(d)?'':bn(d.getDate())+' '+M[d.getMonth()]+' '+bn(d.getFullYear());};
  var e=function(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');};
  var img=function(u,sz){return u?u.replace(/\/s\d+(-c)?\//,'/'+sz+'/').replace(/=s\d+(-c)?$/,'='+sz):'';};
  var noimg='data:image/svg+xml;charset=utf-8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2"><rect width="3" height="2" fill="#e9edf2"/></svg>');
  var cut=function(s,n){s=String(s||'').replace(/\s+/g,' ').trim();return s.length>n?s.slice(0,n).replace(/\s+\S*$/,'')+'…':s;};
  var I=function(x,sz,lz){return '<img'+(lz?' loading="lazy"':'')+' src="'+e(img(x.i,sz)||noimg)+'" alt="'+e(x.t)+'"/>';};
  if(!isLabel&&q){
    document.body.classList.add('ajs-on');
    var page=document.querySelector('.category-page')||wrap;
    var sb=document.createElement('div'); sb.className='ajs-bar'; sb.innerHTML='<div class="container custom-container"><form action="/search" method="get" class="ajs-form"><input type="text" name="q" autocomplete="off" placeholder="অনুসন্ধান করুন"/><button type="submit">খুঁজুন</button></form></div>';
    sb.querySelector('input').value=q; page.parentNode.insertBefore(sb,page);
    var hd=document.createElement('div'); hd.className='ajs-head'; hd.innerHTML='<span class="ajs-count"></span><label>সাজান: <select><option value="">প্রাসঙ্গিকতা</option><option value="published">তারিখ অনুযায়ী</option></select></label>';
    var sl=document.createElement('div'); sl.className='ajc-list'; var sm=document.createElement('div'); sm.className='ajc-more'; sm.innerHTML='<button type="button">আরও দেখুন</button>'; sm.style.display='none';
    left.appendChild(hd); left.appendChild(sl); left.appendChild(sm);
    var sst=1, order='', cnt=hd.querySelector('.ajs-count'), sbtn=sm.querySelector('button');
    var srow=function(x){return '<a class="ajc-row ajs-row" href="'+e(x.u)+'"><div class="ajc-tx"><h3>'+e(x.t)+'</h3><p><span class="ajs-pd">'+dt(x.d)+'</span> … '+e(cut(x.s,170))+'</p><span class="ajc-dt">সর্বশেষ আপডেট '+dt(x.up||x.d)+'</span></div>'+I(x,'w400-h267-c',1)+'</a>';};
    var sget=function(cb){var x=new XMLHttpRequest();x.open('GET','/feeds/posts/summary?alt=json&q='+encodeURIComponent(q)+'&start-index='+sst+'&max-results=10'+(order?'&orderby='+order:''));
      x.onloadend=function(){var p=[],tot=0;try{var fd=JSON.parse(x.responseText).feed;tot=+((fd.openSearch$totalResults||{}).$t||0);p=(fd.entry||[]).map(function(t){var k=(t.link||[]).filter(function(z){return z.rel==='alternate';})[0];return {u:k?k.href:'#',t:t.title.$t,d:t.published.$t,up:t.updated&&t.updated.$t,i:t.media$thumbnail&&t.media$thumbnail.url,s:t.summary&&t.summary.$t};});}catch(err){}sst+=p.length;cb(p,tot);};x.send();};
    var first=function(){sst=1;sl.innerHTML='';sm.style.display='none';sget(function(p,tot){cnt.textContent=p.length?((tot>p.length)?('মোট '+bn(tot)+'টি ফলাফল'):'অনুসন্ধানের ফলাফল'):'কোনো ফলাফল পাওয়া যায়নি';sl.innerHTML=p.map(srow).join('');if(p.length>=10)sm.style.display='';});};
    hd.querySelector('select').addEventListener('change',function(){order=this.value;first();});
    sbtn.addEventListener('click',function(){sbtn.disabled=true;sget(function(p,tot){sl.insertAdjacentHTML('beforeend',p.map(srow).join(''));sbtn.disabled=false;if(p.length<10)sm.style.display='none';});});
    first(); return;
  }
  var top=document.createElement('div'); top.className='ajc-top'; wrap.insertBefore(top,shell);
  var list=document.createElement('div'); list.className='ajc-list'; left.appendChild(list);
  var more=document.createElement('div'); more.className='ajc-more'; more.innerHTML='<button type="button">আরও দেখুন</button>'; left.appendChild(more); more.style.display='none';
  var btn=more.querySelector('button'), start=1;
  var row=function(x){return '<a class="ajc-row" href="'+e(x.u)+'"><div class="ajc-tx"><h3>'+e(x.t)+'</h3>'+(x.s?'<p>'+e(cut(x.s,160))+'</p>':'')+'<span class="ajc-dt">'+dt(x.d)+'</span></div>'+I(x,'w400-h267-c',1)+'</a>';};
  var get=function(n,cb){var x=new XMLHttpRequest();x.open('GET',base+'?alt=json&start-index='+start+'&max-results='+n+extra);
    x.onloadend=function(){var p=[];try{p=(JSON.parse(x.responseText).feed.entry||[]).map(function(t){var k=(t.link||[]).filter(function(z){return z.rel==='alternate';})[0];return {u:k?k.href:'#',t:t.title.$t,d:t.published.$t,i:t.media$thumbnail&&t.media$thumbnail.url,s:t.summary&&t.summary.$t};});}catch(err){}start+=p.length;cb(p,n);};x.send();};
  get(15,function(p,n){
    if(!p.length){document.body.classList.remove('ajc-on');top.remove();list.remove();more.remove();return;}
    var L=p[0];
    top.innerHTML='<a class="ajc-lead" href="'+e(L.u)+'"><div class="ajc-im">'+I(L,'w1140-h760-c',0)+'<i></i></div><div class="ajc-tx"><h3>'+e(L.t)+'</h3>'+(L.s?'<p>'+e(cut(L.s,170))+'</p>':'')+'<span class="ajc-dt">'+dt(L.d)+'</span></div></a>'+
      p.slice(1,5).map(function(x){return '<a class="ajc-card" href="'+e(x.u)+'">'+I(x,'w540-h360-c',0)+'<h3>'+e(x.t)+'</h3><span class="ajc-dt">'+dt(x.d)+'</span></a>';}).join('');
    list.innerHTML=p.slice(5).map(row).join('');
    if(p.length>=n)more.style.display='';
  });
  btn.addEventListener('click',function(){btn.disabled=true;get(10,function(p,n){list.insertAdjacentHTML('beforeend',p.map(row).join(''));btn.disabled=false;if(p.length<n)more.style.display='none';});});
};run();})();

}catch(e){console&&console.error&&console.error("fn-main #6",e)}

/* #7 (theme L7061) */
try{

if(window.SF&&!SF.on('label')){}else (function(){var n=0;var go=function(){
  var R=document.querySelector('.cn-shell > .new-category-design-right'); if(!R){if(n++<30)setTimeout(go,200);return;} if(R.getAttribute('data-sticky'))return; R.setAttribute('data-sticky','1');
  var upd=function(){ if(window.innerWidth<992){R.style.position='';R.style.top='';return;}
    var nav=document.getElementById('nav'), hdr=nav?nav.offsetHeight:64, h=R.offsetHeight, vh=window.innerHeight;
    R.style.position='sticky'; R.style.alignSelf='flex-start'; R.style.top=((h+hdr+16>vh)?(vh-h-16):(hdr+16))+'px'; };
  upd(); window.addEventListener('resize',upd); window.addEventListener('load',upd);
  if(window.ResizeObserver)new ResizeObserver(upd).observe(R);
};go();})();

}catch(e){console&&console.error&&console.error("fn-main #7",e)}

/* #8 (theme L7073) */
try{

if(window.SF&&!SF.on('search')){}else (function(){
  var o=document.getElementById('offcanvasSearch'); if(!o||o.getAttribute('data-aj'))return; o.setAttribute('data-aj','1');
  var inp=o.querySelector('.form-control'); if(inp)inp.setAttribute('placeholder','অনুসন্ধান করুন');
  [].forEach.call(o.querySelectorAll('.input-group-text'),function(x){ if(x.hasAttribute('data-bs-dismiss')||/×|✕|close/i.test(x.textContent+(x.getAttribute('aria-label')||''))) x.classList.add('aj-sclose'); else x.classList.add('aj-sbtn'); });
  var setH=function(){var n=document.getElementById('nav');if(n)document.documentElement.style.setProperty('--aj-nav-h',n.offsetHeight+'px');};
  setH(); window.addEventListener('resize',setH);
  o.addEventListener('shown.bs.offcanvas',function(){if(inp)inp.focus();});
})();

}catch(e){console&&console.error&&console.error("fn-main #8",e)}

/* #9 (theme L7085) */
try{

if(window.SF&&!SF.on('menu')){}else (function(){
  var o=document.getElementById('offcanvasNav'); if(!o||o.getAttribute('data-aj'))return; o.setAttribute('data-aj','1');
  var lg=o.querySelector('.mobile-side-logo'), im=lg&&lg.querySelector('img');
  if(lg){ if(im)lg.style.setProperty('--mm-logo','url("'+im.src+'")'); lg.setAttribute('href','/'); }
  var body=o.querySelector('.offcanvas-body'), ul=o.querySelector('.mobile-nav-ul');
  if(body){ var f=document.createElement('form'); f.className='mm-search'; f.action='/search'; f.method='get';
    f.innerHTML='<input type="text" name="q" placeholder="অনুসন্ধান করুন" autocomplete="off"/><button type="submit">খুঁজুন</button>'; body.insertBefore(f,body.firstChild); }
  var home=ul&&ul.querySelector('li a'); if(home&&!home.textContent.trim()){ home.insertAdjacentHTML('afterbegin','<span>প্রচ্ছদ</span>'); }
  var soc=o.querySelector('.mobile-menu-social');
  var ep=document.querySelector('.e-paper-ul a'), fb=document.querySelector('#top-bar-social a[href*="facebook"], #mobile-menu-social a[href*="facebook"]');
  if(soc&&(ep||fb)){ var a=document.createElement('div'); a.className='mm-actions';
    a.innerHTML=(ep?'<a class="mm-ep" target="_blank" rel="noopener"><i></i>ই-পেপার</a>':'')+(fb?'<a class="mm-fb" target="_blank" rel="noopener">ফলো করুন</a>':'');
    if(ep)a.querySelector('.mm-ep').href=ep.href; if(fb)a.querySelector('.mm-fb').href=fb.href; soc.parentNode.insertBefore(a,soc); }
  var dt=document.getElementById('banglaDate'); if(soc){ var d=document.createElement('div'); d.className='mm-date'; d.textContent=dt?dt.textContent.trim():''; soc.parentNode.insertBefore(d,soc.nextSibling); if(dt&&!d.textContent){setTimeout(function(){d.textContent=dt.textContent.trim();},1500);} }
})();

}catch(e){console&&console.error&&console.error("fn-main #9",e)}

/* #10 (theme L7107) */
try{

(function(){
  var run=function(){
    var top=document.querySelector('.details-content-top'); if(!top||document.querySelector('.fn-pubdate')||/^\/p\//.test(location.pathname))return;
    var iso='',iso2=''; [].some.call(document.querySelectorAll('script[type="application/ld+json"]'),function(sc){var m=sc.textContent.match(/datePublished"\s*:\s*"([^"]+)/);if(m){iso=m[1];var m2=sc.textContent.match(/dateModified"\s*:\s*"([^"]+)/);if(m2)iso2=m2[1];return true;}});
    var d=new Date(iso); if(!iso||isNaN(d))return;
    var bn=function(n){return String(n).replace(/\d/g,function(x){return '০১২৩৪৫৬৭৮৯'[x];});};
    var MO=['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'];
    var dk=new Date(d.getTime()+(d.getTimezoneOffset()+360)*60000);
    var h=dk.getHours(), mi=('0'+dk.getMinutes()).slice(-2), pr=h<4?'রাত':h<6?'ভোর':h<12?'সকাল':h<15?'দুপুর':h<18?'বিকেল':h<20?'সন্ধ্যা':'রাত', h12=h%12||12;
    var ds=bn(dk.getDate())+' '+MO[dk.getMonth()]+' '+bn(dk.getFullYear());
    var fmt=function(x){var k=new Date(x.getTime()+(x.getTimezoneOffset()+360)*60000),H=k.getHours(),M=('0'+k.getMinutes()).slice(-2),P=H<4?'রাত':H<6?'ভোর':H<12?'সকাল':H<15?'দুপুর':H<18?'বিকেল':H<20?'সন্ধ্যা':'রাত';return bn(k.getDate())+' '+MO[k.getMonth()]+' '+bn(k.getFullYear())+', '+P+' '+bn((H%12||12)+':'+M);};
    var d2=new Date(iso2), upd=(iso2&&!isNaN(d2)&&(d2-d)>300000)?'<span class="fn-upd">আপডেট: <time datetime="'+iso2+'">'+fmt(d2)+'</time></span>':'';
    var el=document.createElement('div'); el.className='fn-pubdate';
    el.innerHTML='<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 1.3a5.7 5.7 0 1 1 0 11.4A5.7 5.7 0 0 1 8 2.3zM7.4 4v4.3l3.2 1.9.6-1-2.6-1.6V4z"/></svg><span class="fn-pub">প্রকাশ: <time datetime="'+iso+'">'+ds+'</time>, '+pr+' '+bn(h12+':'+mi)+'</span>'+upd+(upd?'<button type="button" class="fn-tg" aria-label="প্রকাশ ও আপডেটের সময়"><svg viewBox="0 0 10 14"><path d="M5 0l4 5H1zM5 14l-4-5h8z" fill="currentColor"/></svg></button>':''); if(upd){el.classList.add('has-upd'); var lt=0; el.addEventListener('click',function(ev){var now=Date.now(); if(!ev.isTrusted||now-lt<400)return; lt=now; el.classList.toggle('show-pub');});}
    var h1=top.querySelector('h1'); if(h1&&h1.nextSibling)top.insertBefore(el,h1.nextSibling); else top.appendChild(el);
    [].forEach.call(document.querySelectorAll('.aj-byline'),function(b){var w=document.createTreeWalker(b,NodeFilter.SHOW_TEXT),n;while((n=w.nextNode())){if(/\d|[০-৯]/.test(n.nodeValue)&&/২০|20/.test(n.nodeValue)){n.nodeValue=ds;break;}}});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run); else run();
  setTimeout(run,1500);
})();

}catch(e){console&&console.error&&console.error("fn-main #10",e)}

/* #11 (theme L7131) */
try{

if(window.SF&&!SF.on('kicker')){}else (function(){
  var SEL='h1,h2,h3,h4,h5,.pa-t';
  var RE=/^\s*([^|•]{1,45}?)\s*[|•]\s+([\s\S]+)$/;
  var map={}, ready=false;
  var hk=function(u){ var h=String(u||'').split('#')[1]; if(!h)return ''; try{h=decodeURIComponent(h);}catch(e){} return h.replace(/[_+]/g,' ').replace(/\s+/g,' ').trim(); };
  var trimN=function(sp){var n=sp.nextSibling;if(n&&n.nodeType===3&&/^\s/.test(n.nodeValue))n.nodeValue=n.nodeValue.replace(/^\s+/,'');};
  var nat=function(){ [].forEach.call(document.querySelectorAll('.kk-native'),trimN); [].forEach.call(document.querySelectorAll('.kk-native:not([data-kn])'),function(sp){ sp.setAttribute('data-kn','1'); var hasTxt=[].some.call(sp.childNodes,function(c){return c.nodeType===3&&c.nodeValue.trim();}); if(hasTxt)return; var k=hk(sp.getAttribute('data-u')); if(k)sp.insertBefore(document.createTextNode(k),sp.firstChild); else sp.style.display='none'; }); };
  nat(); document.addEventListener('DOMContentLoaded',nat);
  var norm=function(u){ try{ var a=document.createElement('a'); a.href=u; return (a.hostname.replace(/^www\./,'')+a.pathname).replace(/\/$/,''); }catch(e){ return u; } };
  var put=function(el,kk,rest){
    if(!el||el.getAttribute('data-kk')||el.querySelector('.kk')||el.querySelector('.kk-native')||el.closest('.details-content-top')||el.closest('marquee,.ticker,.breaking-news'))return;
    var tw=document.createTreeWalker(el,NodeFilter.SHOW_TEXT), n;
    while((n=tw.nextNode())){ if(n.nodeValue.trim())break; }
    if(!n)return;
    if(/^\s*[a-z]+\/[a-z0-9.+-]+\s*$/i.test(n.nodeValue)){ if(kk){ n.nodeValue=kk; el.setAttribute('data-kk','1'); } return; }
    if(kk&&n.nodeValue.trim().indexOf(kk)===0)return;
    if(!kk){ var m=n.nodeValue.match(RE); if(!m)return; kk=m[1].trim(); n.nodeValue=m[2]; }
    el.setAttribute('data-kk','1');
    var k=document.createElement('span'); k.className='kk'; k.textContent=kk;
    var d=document.createElement('span'); d.className='kk-dot'; d.textContent='\u2022';
    n.parentNode.insertBefore(k,n); n.parentNode.insertBefore(d,n);
  };
  var target=function(a){
    var t=a.querySelector(SEL); if(t)return t;
    var c=a.closest(SEL); if(c)return c;
    if(a.querySelector('img')&&a.textContent.trim().length<8)return null;
    return a.textContent.trim().length>8?a:null;
  };
  var scan=function(r){
    if(!r||r.nodeType!==1||r.classList.contains('kk')||r.classList.contains('kk-dot'))return;
    if(r.classList.contains('kk-native'))trimN(r); [].forEach.call(r.querySelectorAll('.kk-native'),trimN);
    var hs=r.matches&&r.matches(SEL)?[r]:[]; [].push.apply(hs,r.querySelectorAll(SEL)); hs.forEach(function(h){put(h);});
    if(!ready)return;
    var as=r.tagName==='A'?[r]:[]; [].push.apply(as,r.querySelectorAll('a[href]'));
    as.forEach(function(a){ var ha=(a.getAttribute('href')||'').trim(); if(!ha||ha.charAt(0)==='#'||/^javascript:/i.test(ha))return; var kk=map[norm(a.href)]; if(kk){ var t=target(a); if(t)put(t,kk); } });
  };
  var apply=function(){
    ready=true;
    scan(document.body);
  };
  var load=function(start,left){
    var x=new XMLHttpRequest(); x.open('GET','/feeds/posts/summary?alt=json&max-results=150&start-index='+start);
    x.onloadend=function(){ var e=[];
      try{ e=JSON.parse(x.responseText).feed.entry||[]; }catch(err){}
      e.forEach(function(p){ var alt=null, kk='';
        (p.link||[]).forEach(function(l){ if(l.rel==='alternate')alt=l.href; else if(l.rel==='enclosure'&&!kk){ if(l.type&&!/\//.test(l.type))kk=l.type.trim(); else kk=hk(l.href); } });
        if(alt&&kk)map[norm(alt)]=kk; });
      if(e.length===150&&left>1)load(start+150,left-1); else apply(); };
    x.send();
  };
  scan(document.body);
  setTimeout(nat,1500);setTimeout(nat,4000);
  if(window.MutationObserver)new MutationObserver(function(ms){ms.forEach(function(m){[].forEach.call(m.addedNodes,scan);});}).observe(document.body,{childList:true,subtree:true});
  load(1,4);
})();

}catch(e){console&&console.error&&console.error("fn-main #11",e)}

/* #12 (theme L7194) */
try{

(function(){function f(){document.querySelectorAll('.post-body [style]').forEach(function(e){e.style.removeProperty('font-family');e.style.removeProperty('line-height');e.style.removeProperty('--animation-duration');});}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',f);}else{f();}})();

}catch(e){console&&console.error&&console.error("fn-main #12",e)}

/* #13 (theme L7204) */
try{

/*fn-la-wx: "প্রয়োজনীয় তথ্য" box e ক্রম: নামাজ -> আবহাওয়া -> স্বর্ণ..., ar আবহাওয়া card e /p/weather.html link*/
(function(){
  if(location.pathname!=='/')return;
  function apply(){
    var row=document.querySelector('.la-row');if(!row)return false;
    var pray=row.querySelector('.la-pray'),wx=row.querySelector('.la-wx');if(!wx)return false;
    if(pray&&wx.previousElementSibling!==pray)row.insertBefore(wx,pray.nextSibling);
    if(!wx.querySelector('.la-wx-lnk')){var a=document.createElement('a');a.className='la-wx-lnk';a.href='/p/weather.html';a.setAttribute('aria-label','ফুলবাড়ীয়ার বিস্তারিত আবহাওয়া');wx.appendChild(a);}
    var t=wx.querySelector('.la-t'),ps=pray&&pray.querySelector('.la-t svg');
    if(t&&ps&&!t.querySelector('svg')){t.appendChild(ps.cloneNode(true));}
    return true;
  }
  var n=0;(function wait(){if(apply()){var box=document.querySelector('.la-rw')||document.querySelector('.la-row');if(window.MutationObserver&&box){var busy=false;new MutationObserver(function(){if(busy)return;busy=true;apply();setTimeout(function(){busy=false},0);}).observe(box,{childList:true,subtree:true});}return;}if(++n<80)setTimeout(wait,250);})();
})();

}catch(e){console&&console.error&&console.error("fn-main #13",e)}

/* #14 (theme L7240) */
try{

/*fn-share: ShareThis er bodole nijer share bar (Amar Desh style gol icon) (Facebook, WhatsApp, Messenger, X, Telegram, link copy, mobile share). Count Firebase e (path: fnShare), 1 ba beshi hole dekhay.*/
(function(){
  var FNP=/^\/p\/(namaz-sehri-iftar-time|weather)\.html$/.test(location.pathname);
  if(!FNP&&!/^\/\d{4}\/\d{2}\/.+\.html$/.test(location.pathname))return;
  /* Namaz ar Weather page e page er title er niche share bar boshay */
  if(FNP&&!document.querySelector('.fn-share')){var pb=document.getElementById('post-body')||document.querySelector('.post-body');if(pb&&pb.parentNode){var sd=document.createElement('div');sd.className='fn-share fn-share-pg';sd.style.margin='4px 0 18px';pb.parentNode.insertBefore(sd,pb);}}
  var boxes=document.querySelectorAll('.fn-share');if(!boxes.length)return;
  var can=document.querySelector('link[rel="canonical"]');
  var url=(can&&can.href)||(location.origin+location.pathname);
  var og=document.querySelector('meta[property="og:title"]'),h1=document.querySelector('h1');
  var title=((og&&og.content)||(h1&&h1.textContent)||document.title).trim();
  var U=encodeURIComponent(url),T=encodeURIComponent(title);
  var mob=/Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  var el=document.querySelector('[id^="post-body-"]'),pid=el?el.id.replace('post-body-',''):'';
  if(!/^\d{6,}$/.test(pid)){var m=document.documentElement.innerHTML.match(/postId['"]?\s*[:=]\s*['"]?(\d{6,})/);pid=m?m[1]:'';}
  if(!pid&&FNP)pid='pg_'+location.pathname.replace(/^\/p\/|\.html$/g,'').replace(/[^a-z0-9]/gi,'_');
  var DB=pid?'https://views-count-cadfd-default-rtdb.firebaseio.com/fnShare/'+pid+'.json':'',LS='fns_'+pid,MIN=1;
  var BN='০১২৩৪৫৬৭৮৯',bn=function(n){return String(n).replace(/\d/g,function(d){return BN[d];});};
  var I={
    fb:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H7v4h2v8h4v-8h3l1-4h-4V9c0-.6.4-1 1-1z"/></svg>',
    wa:'<svg viewBox="0 0 24 24"><path d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.6 21.4l4.7-1.2A9.5 9.5 0 1 0 12 2.5z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8.6 7.4c.2-.5.5-.5.8-.5h.6c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .6l-.5.7c-.1.2-.2.4 0 .6.5.9 1.2 1.6 2.1 2.1.2.1.4.1.6-.1l.6-.7c.2-.2.4-.2.6-.1l1.9.9c.2.1.4.2.4.5 0 .6-.2 1.3-.8 1.7-.6.4-1.4.6-2.3.4-1.5-.4-2.9-1.3-4-2.5-1-1-1.8-2.3-2.1-3.6-.2-.8 0-1.5.5-2.1z" fill="currentColor"/></svg>',
    ms:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.4 2 2 6.1 2 11.6c0 2.9 1.2 5.4 3.1 7.1V22l2.9-1.6c1.2.3 2.6.5 4 .5 5.6 0 10-4.1 10-9.4S17.6 2 12 2zm1 12.6-2.5-2.7-5 2.7 5.5-5.8 2.6 2.7 4.9-2.7-5.5 5.8z"/></svg>',
    x:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.2-8.3L2 3h6.3l4.4 5.9L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5z"/></svg>',
    tg:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.9 4.3 18.7 19.4c-.2 1-.9 1.3-1.7.8l-4.8-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.9 8.9-8c.4-.3-.1-.5-.6-.2l-11 6.9-4.7-1.5c-1-.3-1-1 .2-1.5L20.5 2.9c.9-.3 1.6.2 1.4 1.4z"/></svg>',
    cp:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></svg>',
    ok:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5l5 5L20 6.5"/></svg>',
    pr:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 14h12v7H6z"/></svg>',
    nt:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>'
  };
  var L={
    fb:'https://www.facebook.com/sharer/sharer.php?u='+U,
    wa:'https://wa.me/?text='+T+'%20'+U,
    ms:'fb-messenger://share/?link='+U,
    x:'https://twitter.com/intent/tweet?url='+U+'&text='+T,
    tg:'https://t.me/share/url?url='+U+'&text='+T
  };
  var A=function(k,cls,href,lbl,blank){return '<a class="fns-b '+cls+'" data-k="'+k+'" href="'+href+'"'+(blank?' target="_blank" rel="noopener nofollow"':' rel="nofollow"')+' aria-label="'+lbl+'" title="'+lbl+'">'+I[k]+'</a>';};
  var Bt=function(k,cls,lbl){return '<button type="button" class="fns-b '+cls+'" data-k="'+k+'" aria-label="'+lbl+'" title="'+lbl+'">'+I[k]+'</button>';};
  var html='<span class="fns-ic">'+
    Bt('cp','fns-cp','লিংক কপি করুন')+
    A('fb','fns-fb',L.fb,'ফেসবুকে শেয়ার করুন',1)+
    A('wa','fns-wa',L.wa,'হোয়াটসঅ্যাপে শেয়ার করুন',1)+
    A('ms','fns-ms',L.ms,'মেসেঞ্জারে শেয়ার করুন',0)+
    A('x','fns-x',L.x,'এক্স-এ শেয়ার করুন',1)+
    A('tg','fns-tg',L.tg,'টেলিগ্রামে শেয়ার করুন',1)+
    Bt('pr','fns-pr','প্রিন্ট করুন')+
    Bt('nt','fns-nt','অন্য অ্যাপে শেয়ার করুন')+
    '</span><span class="fns-cnt" hidden><b></b><small>শেয়ার</small></span>';
  var count=0;
  var show=function(){[].forEach.call(boxes,function(b){var c=b.querySelector('.fns-cnt');if(!c)return;if(count>=MIN){c.querySelector('b').textContent=bn(count);c.hidden=false;}else c.hidden=true;});};
  var bump=function(){
    if(!DB)return;try{if(localStorage.getItem(LS))return;localStorage.setItem(LS,'1');}catch(e){}
    count++;show();
    fetch(DB,{method:'PUT',body:JSON.stringify({'.sv':{increment:1}})}).then(function(r){return r.ok?r.json():null;}).then(function(v){if(typeof v==='number'){count=v;show();}}).catch(function(){});
  };
  var copy=function(btn){
    var done=function(){btn.classList.add('ok');btn.innerHTML=I.ok;setTimeout(function(){btn.classList.remove('ok');btn.innerHTML=I.cp;},1800);};
    if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(url).then(done,function(){fb();});}else fb();
    function fb(){var t=document.createElement('textarea');t.value=url;t.style.cssText='position:fixed;opacity:0';document.body.appendChild(t);t.select();try{document.execCommand('copy');done();}catch(e){}t.remove();}
  };
  [].forEach.call(boxes,function(b){
    b.innerHTML=html;b.setAttribute('role','group');b.setAttribute('aria-label','খবরটি শেয়ার করুন');
    if(mob)b.classList.add('fns-mob');
    if(navigator.share&&mob)b.classList.add('fns-can');
    b.addEventListener('click',function(e){
      var a=e.target.closest('.fns-b');if(!a)return;var k=a.getAttribute('data-k');
      if(k==='pr'){e.preventDefault();window.print();return;}
      if(k==='cp'){e.preventDefault();copy(a);bump();return;}
      if(k==='nt'){e.preventDefault();navigator.share({title:title,url:url}).then(bump).catch(function(){});return;}
      if(k==='fb'||k==='x'||k==='tg'){if(!mob){e.preventDefault();window.open(a.href,'fnshare','width=620,height=560,noopener');}}
      bump();
    });
  });
  if(DB)fetch(DB,{cache:'no-store'}).then(function(r){return r.ok?r.json():0;}).then(function(v){count=+v||0;show();}).catch(function(){});
})();

}catch(e){console&&console.error&&console.error("fn-main #14",e)}


/* #fn-sel: homepage e special khobor carousel (datanews8 TOPIK PILIHAN style). Layout gadget theke on/off, title, label, count, position (top=lead er upore, bottom=lead er niche). Label e post na thakle box dekhay na. */
try{
(function(){
  if(location.pathname!=='/')return;
  /* Setting: Layout > Site Features > "নির্বাচিত খবর (Carousel)" gadget (status/title/label/count) */
  var CFG={};var ce=document.querySelector('.sf-cfg[data-k="selected"]');if(ce)ce.textContent.split('\n').forEach(function(l){var m=l.match(/^\s*([a-z]+)\s*:\s*(.*?)\s*$/i);if(m)CFG[m[1].toLowerCase()]=m[2];});
  if(/^(off|no|0|বন্ধ)$/i.test(CFG.status||''))return;
  var LBL=CFG.label||'নির্বাচিত',MAX=Math.min(20,Math.max(3,parseInt(CFG.count,10)||10)),TTL=CFG.title||'নির্বাচিত খবর',SKIP={'নির্বাচিত':1,'নিউজ':1,'ফুলবাড়ীয়া নিউজ':1};SKIP[LBL]=1;var POS=(CFG.position||'top').toLowerCase();
  var BN='০১২৩৪৫৬৭৮৯',MO=['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'];
  var bn=function(s){return String(s).replace(/\d/g,function(d){return BN[d];});};
  var esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});};
  var css='.fn-sel{margin:18px 0 6px}'+
   '.fn-sel .fsl-in{position:relative;display:flex;align-items:stretch;gap:20px;background:linear-gradient(90deg,#fde7eb 0%,#fbe8f1 45%,#f1e9fb 100%);border-radius:12px;padding:22px 22px 22px 26px;min-height:250px}'+
   '.fn-sel .fsl-h{flex:0 0 230px;display:flex;align-items:flex-end;padding-bottom:14px}'+
   '.fn-sel .fsl-h h2{margin:0!important;font-size:32px!important;line-height:1.25!important;font-weight:800!important;color:#111!important}'+
   '.fn-sel .fsl-h h2 span{display:block;width:44px;height:4px;background:#c8102e;border-radius:2px;margin-bottom:12px}'+
   '.fn-sel .fsl-wrap{position:relative;flex:1;min-width:0}'+
   '.fn-sel .fsl-track{display:flex;gap:12px;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;padding:2px 2px 8px;scrollbar-width:none}'+
   '.fn-sel .fsl-track::-webkit-scrollbar{display:none}'+
   '.fn-sel .fsl-c{flex:0 0 190px;scroll-snap-align:start;background:#fff;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,.08);overflow:hidden;text-decoration:none!important;color:#111!important;display:flex;flex-direction:column;transition:box-shadow .15s,transform .15s}'+
   '.fn-sel .fsl-c:hover{box-shadow:0 6px 16px rgba(0,0,0,.13);transform:translateY(-2px)}'+
   '.fn-sel .fsl-c img{width:100%;height:107px;object-fit:cover;display:block;margin:0!important}'+
   '.fn-sel .fsl-b{padding:9px 11px 11px;display:flex;flex-direction:column;flex:1}'+
   '.fn-sel .fsl-l{font-size:12.5px!important;font-weight:700!important;color:#c8102e!important;margin-bottom:4px;line-height:1.3!important}'+
   '.fn-sel .fsl-t{font-size:15px!important;line-height:1.45!important;font-weight:700!important;color:#111!important;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;margin:0 0 8px!important}'+
   '.fn-sel .fsl-c:hover .fsl-t{color:#c8102e!important}'+
   '.fn-sel .fsl-d{margin-top:auto;font-size:12.5px!important;color:#888!important;line-height:1.3!important}'+
   '.fn-sel .fsl-btn{position:absolute;top:50%;transform:translateY(-50%);width:34px;height:34px;border-radius:50%;border:0;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.18);display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:2;color:#333;padding:0}'+
   '.fn-sel .fsl-btn svg{width:16px;height:16px}'+
   '.fn-sel .fsl-btn:hover{background:#c8102e;color:#fff}'+
   '.fn-sel .fsl-btn[disabled]{opacity:0;pointer-events:none}'+
   '.fn-sel .fsl-p{left:-17px}.fn-sel .fsl-n{right:-17px}'+
   '.fn-sel .fsl-sk{flex:0 0 190px;height:224px;border-radius:8px;background:rgba(255,255,255,.6)}'+
   '@media(max-width:767px){.fn-sel .fsl-in{flex-direction:column;gap:12px;padding:16px 0 16px 14px;min-height:0}.fn-sel .fsl-h{flex:none;padding:0}.fn-sel .fsl-h h2{font-size:24px!important}.fn-sel .fsl-h h2 span{margin-bottom:8px}.fn-sel .fsl-c,.fn-sel .fsl-sk{flex-basis:62%}.fn-sel .fsl-btn{display:none}.fn-sel .fsl-track{padding-right:14px}}';
  function mount(){
    var lead=document.querySelector('.aj-second');var la=document.querySelector('.la-sec');
    var anchor=null;
    if(lead){anchor=lead;while(anchor.parentElement&&!anchor.parentElement.classList.contains('lead-section'))anchor=anchor.parentElement;if(!anchor.parentElement)anchor=null;}
    if(!anchor&&la)anchor=la.previousElementSibling;
    if(!anchor)return false;
    if(document.querySelector('.fn-sel'))return true;
    var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
    var box=document.createElement('div');box.className='container custom-container fn-sel-wrap';
    box.innerHTML='<div class="fn-sel"><div class="fsl-in"><div class="fsl-h"><h2><span></span>'+esc(TTL)+'</h2></div><div class="fsl-wrap"><button type="button" class="fsl-btn fsl-p" aria-label="আগের খবর" disabled><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg></button><div class="fsl-track">'+'<div class="fsl-sk"></div>'.repeat(5)+'</div><button type="button" class="fsl-btn fsl-n" aria-label="পরের খবর"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg></button></div></div></div>';
    anchor.parentNode.insertBefore(box,/^(bottom|niche|নিচে)$/.test(POS)?anchor.nextSibling:anchor);
    var tr=box.querySelector('.fsl-track'),pv=box.querySelector('.fsl-p'),nx=box.querySelector('.fsl-n');
    var upd=function(){pv.disabled=tr.scrollLeft<5;nx.disabled=tr.scrollLeft+tr.clientWidth>=tr.scrollWidth-5;};
    var step=function(d){var c=tr.querySelector('.fsl-c,.fsl-sk');var w=c?c.offsetWidth+12:200;tr.scrollBy({left:d*Math.max(w,Math.floor(tr.clientWidth/w)*w),behavior:'smooth'});};
    pv.addEventListener('click',function(){step(-1);});nx.addEventListener('click',function(){step(1);});
    tr.addEventListener('scroll',function(){upd();},{passive:true});
    var get=function(u){return fetch(u).then(function(r){return r.json();}).then(function(j){return (j.feed&&j.feed.entry)||[];});};
    /* label er বানান (য়/ড়/ঢ় er duto rup) mile na gele site er label list theke thik rup ber kore */
    var nz=function(s){return String(s).replace(/\u09af\u09bc/g,'\u09df').replace(/\u09a1\u09bc/g,'\u09dc').replace(/\u09a2\u09bc/g,'\u09dd').replace(/\s+/g,' ').trim();};
    var resolve=function(){return fetch('/feeds/posts/summary?alt=json&max-results=0').then(function(r){return r.json();}).then(function(j){var c=((j.feed&&j.feed.category)||[]).map(function(x){return x.term;});return c.filter(function(x){return nz(x)===nz(LBL);})[0]||LBL;}).catch(function(){return LBL;});};
    var load=function(){
      resolve().then(function(L){return get('/feeds/posts/summary/-/'+encodeURIComponent(L)+'?alt=json&max-results='+MAX);}).then(function(e){return e;}).then(function(e){
        if(!e.length){box.remove();return;}
        tr.innerHTML=e.map(function(x){
          var u='';(x.link||[]).forEach(function(l){if(l.rel==='alternate')u=l.href;});
          var img=x['media$thumbnail']?x['media$thumbnail'].url.replace(/\/s72(-[a-z0-9-]*)?\//,'/w400-h228-p-k-no-nu-rw/').replace(/=s72(-[a-z0-9-]*)?$/,'=w400-h228-p-k-no-nu-rw'):'';
          var cat='';(x.category||[]).some(function(c){if(!SKIP[c.term]&&nz(c.term)!==nz(LBL)){cat=c.term;return true;}return false;});
          var d=new Date(x.published.$t),hh=d.getHours(),mm=('0'+d.getMinutes()).slice(-2);
          var ds=bn(d.getDate())+' '+MO[d.getMonth()]+' '+bn(d.getFullYear())+' | '+bn((hh%12||12)+':'+mm);
          var t=esc(x.title.$t);
          return '<a class="fsl-c" href="'+esc(u)+'">'+(img?'<img loading="lazy" src="'+esc(img)+'" alt="'+t+'" width="400" height="228">':'<img loading="lazy" alt="'+t+'" width="400" height="228">')+'<div class="fsl-b">'+(cat?'<div class="fsl-l">'+esc(cat)+'</div>':'')+'<div class="fsl-t">'+t+'</div><div class="fsl-d">'+ds+'</div></div></a>';
        }).join('');
        tr.scrollLeft=0;upd();
      }).catch(function(){box.remove();});
    };
    if('IntersectionObserver' in window){var io=new IntersectionObserver(function(en){if(en[0].isIntersecting){io.disconnect();load();}},{rootMargin:'400px'});io.observe(box);}else load();
    return true;
  }
  var n=0;(function wait(){if(mount())return;if(++n<40)setTimeout(wait,250);})();
})();
}catch(e){console&&console.error&&console.error("fn-main fn-sel",e)}
