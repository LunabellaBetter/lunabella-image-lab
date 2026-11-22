// Short paper reveal only on navigation/return, never on input, drag or editing.
addEventListener('pageshow',()=>{
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const surface=document.querySelector('main');
 surface?.animate([{opacity:.7,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:260,easing:'ease-out'});
});
