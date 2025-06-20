/* src/components/PixelCanvas.js
   Registers the <pixel-canvas> custom element once per app run */
   export function registerPixelCanvas() {
    if (customElements.get('pixel-canvas')) return; // already defined
  
    /* ---------- Pixel helper ---------- */
    class Pixel {
      constructor(canvas, ctx, x, y, color, speed, delay) {
        this.w = canvas.width;
        this.h = canvas.height;
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.color = color;
        this.speed = (Math.random() * 0.8 + 0.1) * speed;
        this.size = 0;
        this.minSize = 0.5;
        this.maxSize = Math.random() * 1.5 + 0.5;
        this.sizeStep = Math.random() * 0.4;
        this.delay = delay;
        this.counter = 0;
        this.counterStep = Math.random() * 4 + (this.w + this.h) * 0.01;
        this.idle = false;
        this.rev = false;
        this.shimmer = false;
      }
      draw() {
        const off = this.maxSize * 0.5 - this.size * 0.5;
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x + off, this.y + off, this.size, this.size);
      }
      appear() {
        if (this.counter <= this.delay) {
          this.counter += this.counterStep;
          return;
        }
        if (this.size >= this.maxSize) this.shimmer = true;
        if (this.shimmer) this.tween(); else this.size += this.sizeStep;
        this.draw();
      }
      disappear() {
        this.shimmer = false;
        this.counter = 0;
        if (this.size <= 0) { this.idle = true; return; }
        this.size -= 0.1;
        this.draw();
      }
      tween() {
        if (this.size >= this.maxSize) this.rev = true;
        if (this.size <= this.minSize) this.rev = false;
        this.size += this.rev ? -this.speed : this.speed;
      }
    }
  
    /* ---------- Custom element ---------- */
    class PixelCanvas extends HTMLElement {
      static tag = 'pixel-canvas';
      static css = `
        :host{display:block;inline-size:100%;block-size:100%;overflow:hidden;opacity:0;transition:opacity .5s ease}
        canvas{width:100%;height:100%}
      `;
      get colors() { return (this.dataset.colors || '').split(',').filter(Boolean)
        || ['#f8fafc','#f1f5f9','#cbd5e1']; }
      get gap()    { return Math.min(50, Math.max(4, +this.dataset.gap || 5)); }
      get speed()  { return (this.reduced ? 0 : Math.min(100, +this.dataset.speed || 35))*0.001; }
      connectedCallback() {
        const sheet = new CSSStyleSheet(); sheet.replaceSync(PixelCanvas.css);
        this.attachShadow({mode:'open'}).adoptedStyleSheets=[sheet];
        this.canvas=document.createElement('canvas');
        this.shadowRoot.append(this.canvas);
        this.ctx=this.canvas.getContext('2d');
        this.reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.parent=this.parentNode;
        this.init(); this.observer=new ResizeObserver(()=>this.init());
        this.observer.observe(this);
        ['mouseenter','mouseleave','focusin','focusout']
          .forEach(ev=>this.parent.addEventListener(ev,this));
      }
      disconnectedCallback(){
        this.observer.disconnect();
        ['mouseenter','mouseleave','focusin','focusout']
          .forEach(ev=>this.parent?.removeEventListener(ev,this));
        cancelAnimationFrame(this.anim);
      }
      handleEvent(e){ this['on'+e.type](e); }
      onmouseenter(){ this.style.opacity='1'; this.start('appear'); }
      onmouseleave(){ this.style.opacity='0'; this.start('disappear'); }
      onfocusin(e){ if(e.currentTarget.contains(e.relatedTarget))return;
        this.style.opacity='1'; this.start('appear'); }
      onfocusout(e){ if(e.currentTarget.contains(e.relatedTarget))return;
        this.style.opacity='0'; this.start('disappear'); }
      init(){
        const {width:w,height:h}=this.getBoundingClientRect();
        this.canvas.width=w; this.canvas.height=h;
        this.px=[]; const dist=(x,y)=>Math.hypot(x-w/2,y-h/2);
        for(let x=0;x<w;x+=this.gap) for(let y=0;y<h;y+=this.gap){
          const col=this.colors[Math.floor(Math.random()*this.colors.length)];
          const d=this.reduced?0:dist(x,y); this.px.push(new Pixel(this.canvas,this.ctx,x,y,col,this.speed,d));
        }
      }
      start(fn){ cancelAnimationFrame(this.anim); this.anim=this.loop(fn); }
      loop(fn){ return requestAnimationFrame(()=>this.loop(fn)); }
      loop(fn){ this.anim=requestAnimationFrame(()=>this.loop(fn));
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        let done=true; for(const p of this.px){ p[fn](); done&=p.idle; }
        if(done) cancelAnimationFrame(this.anim);
      }
    }
  
    customElements.define(PixelCanvas.tag, PixelCanvas);
  }
  
  registerPixelCanvas(); // auto‑register on import
  