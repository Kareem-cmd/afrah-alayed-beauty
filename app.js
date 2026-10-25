const icons={search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',bag:'<path d="M5 7h14l1 14H4L5 7Z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/>',arrow:'<path d="M20 12H4m6-6-6 6 6 6"/>',right:'<path d="M4 12h16m-6-6 6 6-6 6"/>',close:'<path d="m6 6 12 12M6 18 18 6"/>',plus:'<path d="M12 5v14M5 12h14"/>',trash:'<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7"/>'};
const icon=n=>`<svg viewBox="0 0 24 24" aria-hidden="true">${icons[n]||icons.bag}</svg>`;
document.querySelectorAll('[data-icon]').forEach(e=>e.innerHTML=icon(e.dataset.icon));
const products=[
 {id:1,name:'سيروم الإشراقة اليومي',kind:'عناية بالبشرة',category:'skin',price:89,old:110,image:1,tag:'اختيارنا لكِ',size:'30 مل',description:'خطوة صغيرة في روتين العناية اليومي. منتج افتراضي للتعرف على تجربة المتجر، بصورة توضيحية.'},
 {id:2,name:'كريم الترطيب الناعم',kind:'عناية بالبشرة',category:'skin',price:65,old:0,image:2,tag:'عناية يومية',size:'50 مل',description:'مساحة للترطيب ضمن روتينك الصباحي والمسائي. هذا المنتج ومواصفاته لأغراض العرض التجريبي فقط.'},
 {id:3,name:'زيت العناية بالشعر',kind:'عناية بالشعر',category:'hair',price:79,old:95,image:3,tag:'سعر لطيف',size:'50 مل',description:'اختيار تجريبي لروتين العناية بالشعر. الصورة توضيحية ولا تمثل منتجًا معروضًا للبيع الفعلي.'},
 {id:4,name:'ماسك العناية الأسبوعي',kind:'عناية بالبشرة',category:'skin',price:59,old:0,image:4,tag:'لحظة لكِ',size:'60 مل',description:'لحظة عناية على مهلك ضمن روتينك الأسبوعي. منتج افتراضي لعرض تصميم المتجر وتجربة التسوق.'},
 {id:5,name:'زيت الجسم الدافئ',kind:'عناية بالجسم',category:'body',price:99,old:125,image:1,tag:'ضمن العروض',size:'100 مل',description:'اختيار توضيحي للعناية بالجسم، مع صورة تجريبية. لا يمثل وصفة علاجية أو منتجًا متاحًا للشراء الحقيقي.'},
 {id:6,name:'بلسم العناية بالشفاه',kind:'عناية بالشفاه',category:'lips',price:35,old:0,image:2,tag:'رفيق حقيبتك',size:'15 مل',description:'منتج تجريبي ضمن قسم العناية بالشفاه. استخدميه لتجربة المفضلة والسلة وتفاصيل الطلب.'},
 {id:7,name:'سيروم روتين الشعر',kind:'عناية بالشعر',category:'hair',price:115,old:140,image:3,tag:'ضمن العروض',size:'75 مل',description:'منتج افتراضي ضمن مجموعة العناية بالشعر. جميع الأسعار والمواصفات قابلة للاستبدال ببيانات المتجر الحقيقية.'},
 {id:8,name:'كريم نعومة اليدين',kind:'عناية بالجسم',category:'body',price:45,old:0,image:4,tag:'كل يوم',size:'40 مل',description:'اختيار تجريبي لروتين العناية باليدين. الصور هنا للتوضيح وليست صورًا موثقة لمنتجات فعلية.'}
];
const $=s=>document.querySelector(s);let storageAvailable=true;
function read(key,fallback){try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}}
let cart=read('afrah-cart',{});if(!cart||Array.isArray(cart)||typeof cart!=='object')cart={};
cart=Object.fromEntries(Object.entries(cart).filter(([id,q])=>products.some(p=>p.id===Number(id))&&Number.isInteger(q)&&q>0&&q<=99));
let saved=read('afrah-favorites',[]);if(!Array.isArray(saved))saved=[];
let favorites=new Set(saved.filter(id=>products.some(p=>p.id===id))),filter='all',favoritesOnly=false,query='',sort='featured',slide=0,toastTimer;
const price=n=>`${n.toLocaleString('ar-SA')} <small>ر.س</small>`;
function persist(){try{localStorage.setItem('afrah-cart',JSON.stringify(cart));localStorage.setItem('afrah-favorites',JSON.stringify([...favorites]))}catch{if(storageAvailable){storageAvailable=false;notify('الحفظ غير متاح في هذا المتصفح؛ اختياراتك محفوظة لهذه الجلسة فقط.')}}}
function notify(message){$('#toast').textContent=message;$('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),3000)}
function renderProducts(){document.querySelectorAll('.product-card').forEach(el=>revealObserver?.unobserve(el));let list=products.filter(p=>(filter==='all'||filter==='offers'&&p.old||p.category===filter)&&(!favoritesOnly||favorites.has(p.id))&&(!query||`${p.name} ${p.kind}`.includes(query)));if(sort==='low')list.sort((a,b)=>a.price-b.price);if(sort==='high')list.sort((a,b)=>b.price-a.price);
 $('#result-count').textContent=`${list.length} منتجات${favoritesOnly?' في المفضلة':''}`;
 $('#product-grid').innerHTML=list.length?list.map(p=>`<article class="product-card"><div class="product-image"><a href="#product-${p.id}" data-detail="${p.id}" aria-label="تفاصيل ${p.name}"><img src="assets/product-${p.image}.jpg" width="400" height="500" loading="lazy" alt="صورة توضيحية — ${p.name}"></a><span class="product-tag">${p.tag}</span><button class="favorite" data-favorite="${p.id}" aria-label="${favorites.has(p.id)?'إزالة من':'إضافة إلى'} المفضلة: ${p.name}" aria-pressed="${favorites.has(p.id)}">${icon('heart')}</button></div><div class="product-meta"><span class="product-kind">${p.kind} · ${p.size}</span><h3><a href="#product-${p.id}" data-detail="${p.id}">${p.name}</a></h3><div class="product-bottom"><span class="price">${price(p.price)}${p.old?` <del>${p.old}</del>`:''}</span><button class="add-button" data-add="${p.id}" aria-label="أضيفي ${p.name} للحقيبة">${icon('plus')}</button></div></div></article>`).join(''):`<div class="empty"><h3>${favoritesOnly?'مفضّلتك بانتظارك':'ما لقينا منتجات هنا'}</h3><p>${favoritesOnly?'اضغطي على القلب بجانب أي منتج لحفظه.':'جرّبي كلمة مختلفة أو اعرضي كل المنتجات.'}</p><button class="primary" id="reset-products">تصفّحي جميع المنتجات</button></div>`;
 document.querySelectorAll('[data-filter]').forEach(b=>{const active=b.dataset.filter===filter;b.classList.toggle('selected',active);b.setAttribute('aria-pressed',active)});$('#favorites-toggle').setAttribute('aria-pressed',favoritesOnly);observeProducts();
}
function setFilter(next){filter=next;favoritesOnly=false;query='';$('#search').value='';renderProducts();$('#products').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}
function updateCount(){const count=Object.values(cart).reduce((a,b)=>a+b,0);$('#cart-count').textContent=count;$('#bag-number').textContent=`(${count})`;$('#cart-open').setAttribute('aria-label',`فتح حقيبة التسوق، ${count} منتجات`)}
function add(id,source){if((cart[id]||0)>=99){notify('وصلتِ للحد الأقصى من هذا المنتج');return}cart[id]=Math.min(99,(cart[id]||0)+1);persist();updateCount();if($('#cart-dialog').open)renderCart();notify('إضافة حلوة! المنتج في حقيبتك');animateAddition(id,source)}
function renderCart(){updateCount();const items=products.filter(p=>cart[p.id]);$('#cart-items').innerHTML=items.length?items.map(p=>`<div class="cart-row"><img src="assets/product-${p.image}.jpg" alt="${p.name}"><div><h3>${p.name}</h3><p>${price(p.price)}</p><div class="quantity"><button data-change="${p.id}" data-delta="-1" aria-label="تقليل كمية ${p.name}">−</button><span>${cart[p.id]}</span><button data-change="${p.id}" data-delta="1" aria-label="زيادة كمية ${p.name}" ${cart[p.id]>=99?'disabled':''}>+</button></div></div><button class="remove" data-remove="${p.id}" aria-label="حذف ${p.name}">${icon('trash')}</button></div>`).join(''):`<div class="empty"><h3>حقيبتك لسه فاضية</h3><p>اختاري أول تفصيلة حلوة لروتينك.</p><button class="primary" data-close>ابدئي التسوق</button></div>`;const total=items.reduce((s,p)=>s+p.price*cart[p.id],0);$('#cart-summary').innerHTML=items.length?`<div class="total"><span>الإجمالي التجريبي</span><strong>${price(total)}</strong></div><p class="cart-summary-note">الطلب للتجربة فقط. لا شحن فعلي ولا مدفوعات.</p><button class="primary full" id="checkout">إتمام الطلب التجريبي ${icon('arrow')}</button><button class="text-link" data-close style="margin-top:20px">متابعة التسوق</button>`:''}
function showProduct(id){const p=products.find(p=>p.id===id);if(!p)return;$('#product-detail').innerHTML=`<div class="detail-grid"><img src="assets/product-${p.image}.jpg" alt="صورة توضيحية — ${p.name}"><div class="detail-copy"><span class="product-kind">${p.kind} · ${p.size}</span><h2>${p.name}</h2><span class="price">${price(p.price)}</span><p>${p.description}</p><button class="primary full" data-add="${p.id}">أضيفي لحقيبتك ${icon('bag')}</button><p class="demo-note">صورة توضيحية · منتج تجريبي</p></div></div>`;$('#product-dialog').showModal()}
function checkout(){$('#cart-dialog').close();$('#info-content').innerHTML=`<h2>آخر خطوة… وكلها تجربة</h2><p>اكتبي اسمًا تجريبيًا واختاري المدينة. لا نطلب رقم هاتف أو عنوانًا أو بيانات دفع، ولا نرسل هذه البيانات لأي جهة.</p><form id="checkout-form" class="checkout-form"><label>اسم تجريبي<input name="customer" required maxlength="60" placeholder="مثال: سارة" autocomplete="off"></label><label>المدينة<select name="city" required><option value="">اختاري المدينة</option><option>الرياض</option><option>جدة</option><option>الدمام</option><option>مدينة أخرى</option></select></label><button class="primary full" type="submit">تأكيد الطلب التجريبي</button></form>`;$('#info-dialog').showModal()}
document.addEventListener('click',e=>{const b=e.target.closest('button,a');if(!b)return;
 if(b.hasAttribute('data-close')){b.closest('dialog').close();return}
 if(b.dataset.add){add(Number(b.dataset.add),b);return}
 if(b.dataset.favorite){const id=Number(b.dataset.favorite);favorites.has(id)?favorites.delete(id):favorites.add(id);persist();renderProducts();const replacement=document.querySelector(`[data-favorite="${id}"]`);replacement?.focus({preventScroll:true});return}
 if(b.dataset.detail){e.preventDefault();showProduct(Number(b.dataset.detail));return}
 if(b.dataset.category){setFilter(b.dataset.category);return}
 if(b.dataset.filter){filter=b.dataset.filter;renderProducts();return}
 if(b.dataset.change){const id=b.dataset.change;cart[id]=Math.min(99,(cart[id]||0)+Number(b.dataset.delta));if(cart[id]<=0)delete cart[id];persist();renderCart();document.querySelector(`[data-change="${id}"][data-delta="${b.dataset.delta}"]`)?.focus();return}
 if(b.dataset.remove){delete cart[b.dataset.remove];persist();renderCart();return}
 if(b.id==='reset-products'){setFilter('all');return}
 if(b.id==='checkout'){checkout();return}
 if(b.dataset.info){const texts={shipping:['الشحن والاسترجاع','هذا متجر تجريبي؛ لا تُشحن منتجات ولا تُحصّل مدفوعات. تُضاف سياسة الشحن والاسترجاع الفعلية عند تجهيز المتجر للبيع.'],privacy:['خصوصيتك في التجربة','تُحفظ السلة والمفضلة في متصفحك فقط. بيانات نموذج الطلب لا تُرسل إلى خادم ولا تُحفظ بعد انتهاء التجربة. تُحمّل الخطوط من Google Fonts.'],about:['مرحبًا في أفراح العايد','تجربة متجر للعناية بالبشرة والشعر، مبنية على الهوية والبنرات الأصلية. جميع المنتجات والأسعار وصور المنتجات توضيحية، ولا تشكل عرض بيع حقيقيًا.']};const [title,body]=texts[b.dataset.info];$('#info-content').innerHTML=`<h2>${title}</h2><p>${body}</p><button class="primary" data-close>فهمت، شكرًا</button>`;$('#info-dialog').showModal()}
});
$('#cart-open').addEventListener('click',()=>{renderCart();$('#cart-dialog').showModal()});
$('#favorites-toggle').addEventListener('click',()=>{favoritesOnly=!favoritesOnly;filter='all';query='';$('#search').value='';renderProducts();$('#products').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})});
$('#search-toggle').addEventListener('click',()=>{const open=$('#search-form').hidden;$('#search-form').hidden=!open;$('#search-toggle').setAttribute('aria-expanded',open);if(open)$('#search').focus()});
$('#search-form').addEventListener('submit',e=>{e.preventDefault();query=$('#search').value.trim();filter='all';favoritesOnly=false;renderProducts();$('#products').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})});
$('#search').addEventListener('input',()=>{query=$('#search').value.trim();filter='all';favoritesOnly=false;renderProducts()});
$('#sort').addEventListener('change',e=>{sort=e.target.value;renderProducts()});
document.addEventListener('submit',e=>{if(e.target.id!=='checkout-form')return;e.preventDefault();if(!Object.keys(cart).length)return;const count=Object.values(cart).reduce((a,b)=>a+b,0);cart={};persist();updateCount();$('#info-content').innerHTML=`<h2>اكتملت تجربتك بكل حب!</h2><p>تم تأكيد طلب تجريبي يحتوي على ${count} منتجات. لم يتم تحصيل أي مبلغ، ولن تُشحن منتجات فعلية.</p><button class="primary" data-close>عودة للمتجر</button>`;$('#info-content button').focus()});
document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}}));
let slideRequest=0, bannerOverlay=null;
async function setSlide(n){
 const next=(n+3)%3;if(next===slide)return;
 const request=++slideRequest;slide=next;
 const src=`assets/banner-${next+1}.webp`,incoming=new Image();incoming.src=src;
 try{await incoming.decode()}catch{if(request===slideRequest){slide=Array.from($('#hero-dots').children).findIndex(b=>b.getAttribute('aria-pressed')==='true');notify('تعذّر تحميل البنر، جرّبي مرة أخرى')}return}
 if(request!==slideRequest)return;
 const hero=$('#hero-image');bannerOverlay?.remove();bannerOverlay=null;
 if(!reducedMotion.matches){
  const outgoing=hero.cloneNode();outgoing.removeAttribute('id');outgoing.alt='';outgoing.setAttribute('aria-hidden','true');outgoing.className='banner-outgoing';
  outgoing.style.height=`${hero.getBoundingClientRect().height}px`;hero.after(outgoing);bannerOverlay=outgoing;
  motion(outgoing,[{opacity:1},{opacity:0}],{duration:600}).then(()=>{outgoing.remove();if(bannerOverlay===outgoing)bannerOverlay=null});
 }
 const alts=['منتجاتنا مو هبة — عناية للبشرة من أفراح العايد','تبين نتيجة آمنة وسريعة بدون تعب؟ — بانر العناية بالبشرة','وداعًا للتصبغات — بانر أفراح العايد'];
 hero.src=src;hero.alt=alts[next];
 if(!reducedMotion.matches)motion(hero,[{transform:'scale(1.025)'},{transform:'scale(1)'}],{duration:700});
 $('#hero-dots').querySelectorAll('button').forEach((b,i)=>{b.classList.toggle('selected',i===next);b.setAttribute('aria-pressed',i===next)});
}
$('#previous').addEventListener('click',()=>setSlide(slide-1));$('#next').addEventListener('click',()=>setSlide(slide+1));$('#hero-dots').querySelectorAll('button').forEach((b,i)=>b.addEventListener('click',()=>setSlide(i)));
$('#wholesale-link').addEventListener('click',()=>{setFilter('offers');notify('عروض توضيحية — تسعير الجملة الفعلي غير مفعّل')});
// Content remains visible without animation support or when reduced motion is requested.
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const runningMotion=new Set();
function motion(element,keyframes,options={}){
 if(reducedMotion.matches||!element?.animate)return Promise.resolve();
 const animation=element.animate(keyframes,{duration:500,easing:'cubic-bezier(.16,1,.3,1)',...options});
 runningMotion.add(animation);
 return animation.finished.catch(()=>{}).finally(()=>runningMotion.delete(animation));
}
reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches){runningMotion.forEach(a=>a.cancel());bannerOverlay?.remove();bannerOverlay=null;}});
function animateAddition(id,button){
 if(reducedMotion.matches||!button)return;
 motion(button,[{transform:'scale(1)'},{transform:'scale(.88)',offset:.25},{transform:'scale(1)'}],{duration:320});
 const bag=$('#cart-open');
 const acknowledge=()=>{if(!reducedMotion.matches){motion(bag,[{transform:'translateY(0)'},{transform:'translateY(-4px)',offset:.35},{transform:'translateY(0)'}],{duration:380});motion($('#cart-count'),[{transform:'scale(1)'},{transform:'scale(1.28)',offset:.35},{transform:'scale(1)'}],{duration:380});}};
 // Dialog content sits in the browser top layer; keep feedback inside it.
 if(button.closest('dialog'))return;
 const origin=button.getBoundingClientRect(),target=bag.getBoundingClientRect();
 const product=products.find(p=>p.id===id),thumb=document.createElement('img');
 thumb.src=`assets/product-${product.image}.jpg`;thumb.alt='';thumb.setAttribute('aria-hidden','true');thumb.className='cart-flight';
 const x=origin.left+origin.width/2-24,y=origin.top+origin.height/2-24;
 thumb.style.left=`${x}px`;thumb.style.top=`${y}px`;document.body.append(thumb);
 const dx=target.left+target.width/2-24-x,dy=target.top+target.height/2-24-y;
 motion(thumb,[{transform:'translate(0,0) scale(1)',opacity:.9},{transform:`translate(${dx*.45}px,${dy*.65}px) scale(.7)`,opacity:.8,offset:.5},{transform:`translate(${dx}px,${dy}px) scale(.15)`,opacity:0}],{duration:650,easing:'cubic-bezier(.4,0,.2,1)'}).then(()=>{thumb.remove();acknowledge()});
}
const seenProducts=new Set();
const revealObserver='IntersectionObserver' in window?new IntersectionObserver(entries=>{
 for(const entry of entries){if(!entry.isIntersecting)continue;revealObserver.unobserve(entry.target);
  const element=entry.target,id=element.querySelector('[data-add]')?.dataset.add;
  if(id){if(seenProducts.has(id))continue;seenProducts.add(id)}
  const image=element.matches('.ritual-art,.wholesale');
  motion(element,image?[{opacity:.55,transform:'scale(.98)'},{opacity:1,transform:'scale(1)'}]:[{opacity:.35,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],{duration:image?700:560,delay:element.matches('.product-card')?(Number(id)-1)%4*45:0});
 }
},{threshold:.12,rootMargin:'0px 0px -24px 0px'}):null;
function observeProducts(){
 if(!revealObserver)return;
 // Release discarded cards when filters or favorites rebuild the grid.
 document.querySelectorAll('.product-card').forEach(el=>revealObserver.observe(el));
}
document.querySelectorAll('.section-heading,.category-grid,.ritual-art,.ritual-copy,.wholesale,.closing').forEach(el=>revealObserver?.observe(el));
$('#year').textContent=new Date().getFullYear();renderProducts();updateCount();
