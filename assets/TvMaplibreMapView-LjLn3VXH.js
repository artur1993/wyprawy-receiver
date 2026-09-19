const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/TvMapView-fA4SvXtW.js","assets/rolldown-runtime-aKtaBQYM.js","assets/react-vendor-Bj--7bOV.js","assets/TvMapView-DObs_Col.css"])))=>i.map(i=>d[i]);
import{i as e,n as t}from"./rolldown-runtime-aKtaBQYM.js";import{r as n,t as r}from"./react-vendor-Bj--7bOV.js";import{t as i}from"./defineProperty-BbfpZ9Tg.js";import{V as a}from"./index-DirjaMyO.js";import{f as o,l as s,n as c,p as l,r as u,u as d}from"./maplibreHelpers-Bhb7DAQG.js";import{n as f}from"./greatCircle-C2tjicKi.js";var p=n(),m=e(l(),1),h=6,g=.95,_=`
attribute vec2 a_pos;
attribute vec2 a_next;
attribute float a_side;
attribute float a_distance;

uniform mat4 u_matrix;
uniform vec2 u_resolution;
uniform float u_halfWidthPx;

varying float v_distance;

void main() {
  vec4 clipPos = u_matrix * vec4(a_pos, 0.0, 1.0);
  vec4 clipNext = u_matrix * vec4(a_next, 0.0, 1.0);
  // Kierunek segmentu W PRZESTRZENI EKRANU (po podziale przez w) — jedyny poprawny sposób przy
  // mapie pochylonej (rzut perspektywiczny jest nieliniowy, więc kierunku nie da się przenieść
  // z mercatora bez przejścia przez tę samą macierz co pozycja).
  vec2 ndcPos = clipPos.xy / clipPos.w;
  vec2 ndcNext = clipNext.xy / clipNext.w;
  vec2 dirPx = (ndcNext - ndcPos) * u_resolution * 0.5;
  float lenPx = length(dirPx);
  vec2 dirN = lenPx > 1e-6 ? dirPx / lenPx : vec2(1.0, 0.0);
  vec2 normalPx = vec2(-dirN.y, dirN.x) * (u_halfWidthPx * a_side);
  // Offset w pikselach → z powrotem do NDC → do clip space (mnożenie przez w kompensuje
  // perspektywiczny podział, który GPU wykona automatycznie po tym vertex shaderze).
  vec2 offsetNdc = (normalPx / (u_resolution * 0.5)) * clipPos.w;
  gl_Position = clipPos + vec4(offsetNdc, 0.0, 0.0);
  v_distance = a_distance;
}
`,v=`
precision mediump float;
varying float v_distance;
uniform vec4 u_color;
uniform float u_progress;

void main() {
  if (v_distance > u_progress) discard;
  gl_FragColor = u_color;
}
`;function y(e,t,n){let r=e.createShader(t);return r?(e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(console.error(`[transitArcLayer] błąd kompilacji shadera:`,e.getShaderInfoLog(r)),e.deleteShader(r),null)):null}function b(e,t,n){if(!t||!n)return null;let r=e.createProgram();return r?(e.attachShader(r,t),e.attachShader(r,n),e.linkProgram(r),e.getProgramParameter(r,e.LINK_STATUS)?r:(console.error(`[transitArcLayer] błąd linkowania programu:`,e.getProgramInfoLog(r)),e.deleteProgram(r),null)):null}function x(e){let t=/^#?([0-9a-f]{6})$/i.exec(e.trim());if(!t)return[1,1,1];let n=parseInt(t[1],16);return[(n>>16&255)/255,(n>>8&255)/255,(n&255)/255]}function S(e,t,n){let r=t.length>=2?[...t]:[t[0]??[0,0],t[0]??[0,0]],i=r.length,a=f(r),o=a.totalM,s=new Float32Array(i*2*6);for(let e=0;e<i;e++){let t=m.default.MercatorCoordinate.fromLngLat([r[e][1],r[e][0]]),n=e===i-1,c=n?Math.max(0,e-1):e+1,l=n?-1:1,u=m.default.MercatorCoordinate.fromLngLat([r[c][1],r[c][0]]),d=o>0?a.cumulativeM[e]/o:0;for(let n of[-1,1]){let r=(e*2+(n===-1?0:1))*6;s[r+0]=t.x,s[r+1]=t.y,s[r+2]=u.x,s[r+3]=u.y,s[r+4]=n*l,s[r+5]=d}}let[c,l,u]=x(n),d=null,p=null,S=null,C=null,w=null,T=0,E=new Float32Array(16);return{layer:{id:e,type:`custom`,renderingMode:`2d`,onAdd(e,t){C=e,d=t;let n=y(d,d.VERTEX_SHADER,_),r=y(d,d.FRAGMENT_SHADER,v);p=b(d,n,r),n&&d.deleteShader(n),r&&d.deleteShader(r),p&&(S=d.createBuffer(),d.bindBuffer(d.ARRAY_BUFFER,S),d.bufferData(d.ARRAY_BUFFER,s,d.STATIC_DRAW),w={pos:d.getAttribLocation(p,`a_pos`),next:d.getAttribLocation(p,`a_next`),side:d.getAttribLocation(p,`a_side`),dist:d.getAttribLocation(p,`a_distance`),matrix:d.getUniformLocation(p,`u_matrix`),resolution:d.getUniformLocation(p,`u_resolution`),halfWidth:d.getUniformLocation(p,`u_halfWidthPx`),color:d.getUniformLocation(p,`u_color`),progress:d.getUniformLocation(p,`u_progress`)})},onRemove(){d&&(S&&d.deleteBuffer(S),p&&d.deleteProgram(p)),d=null,p=null,S=null,w=null,C=null},render(e,t){var n;if(!d||!p||!S||!w)return;d.useProgram(p),d.bindBuffer(d.ARRAY_BUFFER,S),d.enableVertexAttribArray(w.pos),d.vertexAttribPointer(w.pos,2,d.FLOAT,!1,24,0),d.enableVertexAttribArray(w.next),d.vertexAttribPointer(w.next,2,d.FLOAT,!1,24,8),d.enableVertexAttribArray(w.side),d.vertexAttribPointer(w.side,1,d.FLOAT,!1,24,16),d.enableVertexAttribArray(w.dist),d.vertexAttribPointer(w.dist,1,d.FLOAT,!1,24,20);let r=((n=t.defaultProjectionData)==null?void 0:n.mainMatrix)??t.modelViewProjectionMatrix;E.set(r),d.uniformMatrix4fv(w.matrix,!1,E),d.uniform2f(w.resolution,d.drawingBufferWidth,d.drawingBufferHeight),d.uniform1f(w.halfWidth,h/2),d.uniform4f(w.color,c,l,u,g),d.uniform1f(w.progress,T),d.enable(d.BLEND),d.blendFuncSeparate(d.SRC_ALPHA,d.ONE_MINUS_SRC_ALPHA,d.ONE,d.ONE_MINUS_SRC_ALPHA),d.disable(d.CULL_FACE),d.disable(d.DEPTH_TEST),d.drawArrays(d.TRIANGLE_STRIP,0,i*2),d.disableVertexAttribArray(w.pos),d.disableVertexAttribArray(w.next),d.disableVertexAttribArray(w.side),d.disableVertexAttribArray(w.dist)}},setProgress(e){T=Math.max(0,Math.min(1,e)),C==null||C.triggerRepaint()}}}var C=`transit-arc`;function w(e){e.setMaxPitch(47),m.default.setMaxParallelImageRequests(8)}var T=t({createTransitArc:()=>A,domMarker:()=>k,fitTrack:()=>O,setRouteLine:()=>D,toLngLat:()=>d,wrapMaplibreMap:()=>E});function E(e){w(e);let t=0,n=0;e.on(`data`,e=>{(e==null?void 0:e.dataType)===`source`&&e!=null&&e.tile&&(t+=1)}),e.on(`error`,e=>{e!=null&&e.sourceId&&(n+=1)});let r=!1;return{stats(){let r=e.getCanvas();return{kind:`maplibre`,tilesOk:t,tilesErr:n,zoom:e.getZoom(),w:r.width,h:r.height}},jumpTo({center:t}){e.jumpTo({center:t})},stop(){e.stop()},fitBounds([t,n],{padding:r,duration:i,linear:a}){e.fitBounds([t,n],{padding:r,duration:i,linear:a})},remove(){r||(r=!0,e.remove())},raw:e}}function D(e,t,n,r){s(e.raw,t,n,r)}function O(e,t,n){u(e.raw,t,n)}function k(e,t,n){let r=c(e.raw,t,n);return{setLngLat(e){r.setLngLat(e)},remove(){r.remove()}}}function A(e,t,n){let r=S(C,t,n);return e.raw.addLayer(r.layer),{setProgress(e){r.setProgress(e)},remove(){e.raw.getLayer(`transit-arc`)&&e.raw.removeLayer(C)}}}var j=r(),M=T,N=(0,p.lazy)(()=>a(()=>import(`./TvMapView-fA4SvXtW.js`),__vite__mapDeps([0,1,2,3]))),P=1e4,F=class extends p.Component{constructor(...e){super(...e),i(this,`state`,{padl:!1})}static getDerivedStateFromError(){return{padl:!0}}componentDidCatch(e){this.props.onFail(e.message)}render(){return this.state.padl?null:this.props.children}};function I({className:e,onReady:t,onMapDiag:n,onMapError:r,testId:i}){let a=(0,p.useRef)(t);a.current=t;let s=(0,p.useRef)(n);s.current=n;let c=(0,p.useRef)(r);c.current=r;let[l,u]=(0,p.useState)(!1),d=(0,p.useRef)(!1);(0,p.useEffect)(()=>{if(l)return;let e=window.setTimeout(()=>{var e;d.current||(console.warn(`[TvMaplibreMapView] mapa nie wstała w czasie — degradacja do Leafleta`),(e=c.current)==null||e.call(c,`MapLibre nie wstał — mapa awaryjna (Leaflet)`),u(!0))},P);return()=>window.clearTimeout(e)},[l]);let f=(0,p.useCallback)(e=>{var t;(t=c.current)==null||t.call(c,e),!d.current&&e.includes(`webglcontextlost`)&&u(!0)},[]),m=(0,p.useCallback)(e=>{var t;d.current=!0;let n=E(e),r=window.setInterval(()=>{var e;let t=n.stats();(e=s.current)==null||e.call(s,`${t.kind} ${t.w}x${t.h} · kafle ok=${t.tilesOk} bl=${t.tilesErr} · zoom=${t.zoom}`)},4e3);e.once(`remove`,()=>window.clearInterval(r)),(t=a.current)==null||t.call(a,n,M)},[]);return l?(0,j.jsx)(p.Suspense,{fallback:(0,j.jsx)(`div`,{className:e,"data-testid":i}),children:(0,j.jsx)(N,{className:e,onReady:t,onMapDiag:n,testId:i})}):(0,j.jsx)(F,{onFail:e=>{var t;console.warn(`[TvMaplibreMapView] MapLibre rzucił (${e}) — degradacja do Leafleta`),(t=c.current)==null||t.call(c,`MapLibre nie wstał: ${e} — mapa awaryjna (Leaflet)`),u(!0)},children:(0,j.jsx)(o,{className:e,interactive:!1,maxZoom:17,onReady:m,onMapError:f,testId:i})})}export{I as default};