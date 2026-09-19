import{t as e}from"./pyRound-B80p7n5z.js";function t(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&apos;`)}function n(t){return e(t,6)}function r(r){let{name:i,track:a,times:o,eleM:s,desc:c}=r,l=a.map(([r,i],a)=>{let c=(o==null?void 0:o[a])??null,l=(s==null?void 0:s[a])??null,u=l==null?``:`<ele>${e(l,1)}</ele>`,d=c==null?``:`<time>${t(c)}</time>`;return`      <trkpt lat="${n(r)}" lon="${n(i)}">${u}${d}</trkpt>`}).join(`
`),u=c?`\n    <desc>${t(c)}</desc>`:``;return`<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Wyprawy Mobile" xmlns="http://www.topografix.com/GPX/1/1">
  <trk>
    <name>${t(i)}</name>${u}
    <trkseg>
${l}
    </trkseg>
  </trk>
</gpx>
`}function i(t){let{name:r,track:i,eleM:a,desc:o}=t,s={type:`FeatureCollection`,features:[{type:`Feature`,properties:o?{name:r,desc:o}:{name:r},geometry:{type:`LineString`,coordinates:i.map(([t,r],i)=>{let o=(a==null?void 0:a[i])??null;return o==null?[n(r),n(t)]:[n(r),n(t),e(o,1)]})}}]};return JSON.stringify(s,null,2)}export{i as buildGeoJson,r as buildGpx};