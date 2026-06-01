import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{A as t,B as n,C as r,E as i,H as a,I as o,K as s,M as c,N as l,P as u,R as d,T as f,U as p,V as m,W as h,_ as g,b as _,c as v,d as y,f as b,g as x,h as S,j as C,k as w,l as T,p as E,u as D,v as ee,w as te,y as O,z as k}from"./fx-BATDfmZD.js";var A=e(s(),1);function j(){return j=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},j.apply(null,arguments)}var ne=e=>e;function re(e,t=ne){let n=A.useSyncExternalStore(e.subscribe,A.useCallback(()=>t(e.getState()),[e,t]),A.useCallback(()=>t(e.getInitialState()),[e,t]));return A.useDebugValue(n),n}var M=e=>{let t=S(e),n=e=>re(t,e);return Object.assign(n,t),n},N=(e=>e?M(e):M),P=0,ie=N(e=>(f.onStart=(t,n,r)=>{e({active:!0,item:t,loaded:n,total:r,progress:(n-P)/(r-P)*100})},f.onLoad=()=>{e({active:!1})},f.onError=t=>e(e=>({errors:[...e.errors,t]})),f.onProgress=(t,n,r)=>{n===r&&(P=r),e({active:!0,item:t,loaded:n,total:r,progress:(n-P)/(r-P)*100||100})},{errors:[],active:!1,progress:0,item:``,loaded:0,total:0})),ae=parseInt(`184`.replace(/\D+/g,``)),oe=Object.defineProperty,se=(e,t,n)=>t in e?oe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,ce=(e,t,n)=>(se(e,typeof t==`symbol`?t:t+``,n),n),le=(()=>{let e={uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new p},up:{value:new p(0,1,0)}},vertexShader:`
      uniform vec3 sunPosition;
      uniform float rayleigh;
      uniform float turbidity;
      uniform float mieCoefficient;
      uniform vec3 up;

      varying vec3 vWorldPosition;
      varying vec3 vSunDirection;
      varying float vSunfade;
      varying vec3 vBetaR;
      varying vec3 vBetaM;
      varying float vSunE;

      // constants for atmospheric scattering
      const float e = 2.71828182845904523536028747135266249775724709369995957;
      const float pi = 3.141592653589793238462643383279502884197169;

      // wavelength of used primaries, according to preetham
      const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );
      // this pre-calcuation replaces older TotalRayleigh(vec3 lambda) function:
      // (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn))
      const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );

      // mie stuff
      // K coefficient for the primaries
      const float v = 4.0;
      const vec3 K = vec3( 0.686, 0.678, 0.666 );
      // MieConst = pi * pow( ( 2.0 * pi ) / lambda, vec3( v - 2.0 ) ) * K
      const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );

      // earth shadow hack
      // cutoffAngle = pi / 1.95;
      const float cutoffAngle = 1.6110731556870734;
      const float steepness = 1.5;
      const float EE = 1000.0;

      float sunIntensity( float zenithAngleCos ) {
        zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );
        return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );
      }

      vec3 totalMie( float T ) {
        float c = ( 0.2 * T ) * 10E-18;
        return 0.434 * c * MieConst;
      }

      void main() {

        vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
        vWorldPosition = worldPosition.xyz;

        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        gl_Position.z = gl_Position.w; // set z to camera.far

        vSunDirection = normalize( sunPosition );

        vSunE = sunIntensity( dot( vSunDirection, up ) );

        vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );

        float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );

      // extinction (absorbtion + out scattering)
      // rayleigh coefficients
        vBetaR = totalRayleigh * rayleighCoefficient;

      // mie coefficients
        vBetaM = totalMie( turbidity ) * mieCoefficient;

      }
    `,fragmentShader:`
      varying vec3 vWorldPosition;
      varying vec3 vSunDirection;
      varying float vSunfade;
      varying vec3 vBetaR;
      varying vec3 vBetaM;
      varying float vSunE;

      uniform float mieDirectionalG;
      uniform vec3 up;

      const vec3 cameraPos = vec3( 0.0, 0.0, 0.0 );

      // constants for atmospheric scattering
      const float pi = 3.141592653589793238462643383279502884197169;

      const float n = 1.0003; // refractive index of air
      const float N = 2.545E25; // number of molecules per unit volume for air at 288.15K and 1013mb (sea level -45 celsius)

      // optical length at zenith for molecules
      const float rayleighZenithLength = 8.4E3;
      const float mieZenithLength = 1.25E3;
      // 66 arc seconds -> degrees, and the cosine of that
      const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;

      // 3.0 / ( 16.0 * pi )
      const float THREE_OVER_SIXTEENPI = 0.05968310365946075;
      // 1.0 / ( 4.0 * pi )
      const float ONE_OVER_FOURPI = 0.07957747154594767;

      float rayleighPhase( float cosTheta ) {
        return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );
      }

      float hgPhase( float cosTheta, float g ) {
        float g2 = pow( g, 2.0 );
        float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );
        return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );
      }

      void main() {

        vec3 direction = normalize( vWorldPosition - cameraPos );

      // optical length
      // cutoff angle at 90 to avoid singularity in next formula.
        float zenithAngle = acos( max( 0.0, dot( up, direction ) ) );
        float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );
        float sR = rayleighZenithLength * inverse;
        float sM = mieZenithLength * inverse;

      // combined extinction factor
        vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );

      // in scattering
        float cosTheta = dot( direction, vSunDirection );

        float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );
        vec3 betaRTheta = vBetaR * rPhase;

        float mPhase = hgPhase( cosTheta, mieDirectionalG );
        vec3 betaMTheta = vBetaM * mPhase;

        vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );
        Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - dot( up, vSunDirection ), 5.0 ), 0.0, 1.0 ) );

      // nightsky
        float theta = acos( direction.y ); // elevation --> y-axis, [-pi/2, pi/2]
        float phi = atan( direction.z, direction.x ); // azimuth --> x-axis [-pi/2, pi/2]
        vec2 uv = vec2( phi, theta ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );
        vec3 L0 = vec3( 0.1 ) * Fex;

      // composition + solar disc
        float sundisk = smoothstep( sunAngularDiameterCos, sunAngularDiameterCos + 0.00002, cosTheta );
        L0 += ( vSunE * 19000.0 * Fex ) * sundisk;

        vec3 texColor = ( Lin + L0 ) * 0.04 + vec3( 0.0, 0.0003, 0.00075 );

        vec3 retColor = pow( texColor, vec3( 1.0 / ( 1.2 + ( 1.2 * vSunfade ) ) ) );

        gl_FragColor = vec4( retColor, 1.0 );

      #include <tonemapping_fragment>
      #include <${ae>=154?`colorspace_fragment`:`encodings_fragment`}>

      }
    `},t=new o({name:`SkyShader`,fragmentShader:e.fragmentShader,vertexShader:e.vertexShader,uniforms:m.clone(e.uniforms),side:1,depthWrite:!1});class n extends C{constructor(){super(new ee(1,1,1),t)}}return ce(n,`SkyShader`,e),ce(n,`material`,t),n})(),F=e=>e===Object(e)&&!Array.isArray(e)&&typeof e!=`function`;function I(e,t){let r=E(e=>e.gl),i=b(n,F(e)?Object.values(e):e);return(0,A.useLayoutEffect)(()=>{t?.(i)},[t]),(0,A.useEffect)(()=>{if(`initTexture`in r){let e=[];Array.isArray(i)?e=i:i instanceof k?e=[i]:F(i)&&(e=Object.values(i)),e.forEach(e=>{e instanceof k&&r.initTexture(e)})}},[r,i]),(0,A.useMemo)(()=>{if(F(e)){let t={},n=0;for(let r in e)t[r]=i[n++];return t}else return i},[e,i])}I.preload=e=>b.preload(n,e),I.clear=e=>b.clear(n,e);var L=parseInt(`184`.replace(/\D+/g,``)),ue=Object.defineProperty,de=(e,t,n)=>t in e?ue(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,R=(e,t,n)=>(de(e,typeof t==`symbol`?t:t+``,n),n);function z(e,t,n,r,i){let a;if(e=e.subarray||e.slice?e:e.buffer,n=n.subarray||n.slice?n:n.buffer,e=t?e.subarray?e.subarray(t,i&&t+i):e.slice(t,i&&t+i):e,n.set)n.set(e,r);else for(a=0;a<e.length;a++)n[a+r]=e[a];return n}function fe(e){return e instanceof Float32Array?e:e instanceof _?e.getAttribute(`position`).array:e.map(e=>{let t=Array.isArray(e);return e instanceof p?[e.x,e.y,e.z]:e instanceof a?[e.x,e.y,0]:t&&e.length===3?[e[0],e[1],e[2]]:t&&e.length===2?[e[0],e[1],0]:e}).flat()}var pe=class extends _{constructor(){super(),R(this,`type`,`MeshLine`),R(this,`isMeshLine`,!0),R(this,`positions`,[]),R(this,`previous`,[]),R(this,`next`,[]),R(this,`side`,[]),R(this,`width`,[]),R(this,`indices_array`,[]),R(this,`uvs`,[]),R(this,`counters`,[]),R(this,`widthCallback`,null),R(this,`_attributes`),R(this,`_points`,[]),R(this,`points`),R(this,`matrixWorld`,new t),Object.defineProperties(this,{points:{enumerable:!0,get(){return this._points},set(e){this.setPoints(e,this.widthCallback)}}})}setMatrixWorld(e){this.matrixWorld=e}setPoints(e,t){if(e=fe(e),this._points=e,this.widthCallback=t??null,this.positions=[],this.counters=[],e.length&&e[0]instanceof p)for(let t=0;t<e.length;t++){let n=e[t],r=t/(e.length-1);this.positions.push(n.x,n.y,n.z),this.positions.push(n.x,n.y,n.z),this.counters.push(r),this.counters.push(r)}else for(let t=0;t<e.length;t+=3){let n=t/(e.length-1);this.positions.push(e[t],e[t+1],e[t+2]),this.positions.push(e[t],e[t+1],e[t+2]),this.counters.push(n),this.counters.push(n)}this.process()}compareV3(e,t){let n=e*6,r=t*6;return this.positions[n]===this.positions[r]&&this.positions[n+1]===this.positions[r+1]&&this.positions[n+2]===this.positions[r+2]}copyV3(e){let t=e*6;return[this.positions[t],this.positions[t+1],this.positions[t+2]]}process(){let e=this.positions.length/6;this.previous=[],this.next=[],this.side=[],this.width=[],this.indices_array=[],this.uvs=[];let t,n;n=this.compareV3(0,e-1)?this.copyV3(e-2):this.copyV3(0),this.previous.push(n[0],n[1],n[2]),this.previous.push(n[0],n[1],n[2]);for(let r=0;r<e;r++){if(this.side.push(1),this.side.push(-1),t=this.widthCallback?this.widthCallback(r/(e-1)):1,this.width.push(t),this.width.push(t),this.uvs.push(r/(e-1),0),this.uvs.push(r/(e-1),1),r<e-1){n=this.copyV3(r),this.previous.push(n[0],n[1],n[2]),this.previous.push(n[0],n[1],n[2]);let e=r*2;this.indices_array.push(e,e+1,e+2),this.indices_array.push(e+2,e+1,e+3)}r>0&&(n=this.copyV3(r),this.next.push(n[0],n[1],n[2]),this.next.push(n[0],n[1],n[2]))}n=this.compareV3(e-1,0)?this.copyV3(1):this.copyV3(e-1),this.next.push(n[0],n[1],n[2]),this.next.push(n[0],n[1],n[2]),!this._attributes||this._attributes.position.count!==this.counters.length?this._attributes={position:new O(new Float32Array(this.positions),3),previous:new O(new Float32Array(this.previous),3),next:new O(new Float32Array(this.next),3),side:new O(new Float32Array(this.side),1),width:new O(new Float32Array(this.width),1),uv:new O(new Float32Array(this.uvs),2),index:new O(new Uint16Array(this.indices_array),1),counters:new O(new Float32Array(this.counters),1)}:(this._attributes.position.copyArray(new Float32Array(this.positions)),this._attributes.position.needsUpdate=!0,this._attributes.previous.copyArray(new Float32Array(this.previous)),this._attributes.previous.needsUpdate=!0,this._attributes.next.copyArray(new Float32Array(this.next)),this._attributes.next.needsUpdate=!0,this._attributes.side.copyArray(new Float32Array(this.side)),this._attributes.side.needsUpdate=!0,this._attributes.width.copyArray(new Float32Array(this.width)),this._attributes.width.needsUpdate=!0,this._attributes.uv.copyArray(new Float32Array(this.uvs)),this._attributes.uv.needsUpdate=!0,this._attributes.index.copyArray(new Uint16Array(this.indices_array)),this._attributes.index.needsUpdate=!0),this.setAttribute(`position`,this._attributes.position),this.setAttribute(`previous`,this._attributes.previous),this.setAttribute(`next`,this._attributes.next),this.setAttribute(`side`,this._attributes.side),this.setAttribute(`width`,this._attributes.width),this.setAttribute(`uv`,this._attributes.uv),this.setAttribute(`counters`,this._attributes.counters),this.setAttribute(`position`,this._attributes.position),this.setAttribute(`previous`,this._attributes.previous),this.setAttribute(`next`,this._attributes.next),this.setAttribute(`side`,this._attributes.side),this.setAttribute(`width`,this._attributes.width),this.setAttribute(`uv`,this._attributes.uv),this.setAttribute(`counters`,this._attributes.counters),this.setIndex(this._attributes.index),this.computeBoundingSphere(),this.computeBoundingBox()}advance({x:e,y:t,z:n}){let r=this._attributes.position.array,i=this._attributes.previous.array,a=this._attributes.next.array,o=r.length;z(r,0,i,0,o),z(r,6,r,0,o-6),r[o-6]=e,r[o-5]=t,r[o-4]=n,r[o-3]=e,r[o-2]=t,r[o-1]=n,z(r,6,a,0,o-6),a[o-6]=e,a[o-5]=t,a[o-4]=n,a[o-3]=e,a[o-2]=t,a[o-1]=n,this._attributes.position.needsUpdate=!0,this._attributes.previous.needsUpdate=!0,this._attributes.next.needsUpdate=!0}},me=`
  #include <common>
  #include <logdepthbuf_pars_vertex>
  #include <fog_pars_vertex>
  #include <clipping_planes_pars_vertex>

  attribute vec3 previous;
  attribute vec3 next;
  attribute float side;
  attribute float width;
  attribute float counters;
  
  uniform vec2 resolution;
  uniform float lineWidth;
  uniform vec3 color;
  uniform float opacity;
  uniform float sizeAttenuation;
  
  varying vec2 vUV;
  varying vec4 vColor;
  varying float vCounters;
  
  vec2 fix(vec4 i, float aspect) {
    vec2 res = i.xy / i.w;
    res.x *= aspect;
    return res;
  }
  
  void main() {
    float aspect = resolution.x / resolution.y;
    vColor = vec4(color, opacity);
    vUV = uv;
    vCounters = counters;
  
    mat4 m = projectionMatrix * modelViewMatrix;
    vec4 finalPosition = m * vec4(position, 1.0) * aspect;
    vec4 prevPos = m * vec4(previous, 1.0);
    vec4 nextPos = m * vec4(next, 1.0);
  
    vec2 currentP = fix(finalPosition, aspect);
    vec2 prevP = fix(prevPos, aspect);
    vec2 nextP = fix(nextPos, aspect);
  
    float w = lineWidth * width;
  
    vec2 dir;
    if (nextP == currentP) dir = normalize(currentP - prevP);
    else if (prevP == currentP) dir = normalize(nextP - currentP);
    else {
      vec2 dir1 = normalize(currentP - prevP);
      vec2 dir2 = normalize(nextP - currentP);
      dir = normalize(dir1 + dir2);
  
      vec2 perp = vec2(-dir1.y, dir1.x);
      vec2 miter = vec2(-dir.y, dir.x);
      //w = clamp(w / dot(miter, perp), 0., 4. * lineWidth * width);
    }
  
    //vec2 normal = (cross(vec3(dir, 0.), vec3(0., 0., 1.))).xy;
    vec4 normal = vec4(-dir.y, dir.x, 0., 1.);
    normal.xy *= .5 * w;
    //normal *= projectionMatrix;
    if (sizeAttenuation == 0.) {
      normal.xy *= finalPosition.w;
      normal.xy /= (vec4(resolution, 0., 1.) * projectionMatrix).xy * aspect;
    }
  
    finalPosition.xy += normal.xy * side;
    gl_Position = finalPosition;
    #include <logdepthbuf_vertex>
    #include <fog_vertex>
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    #include <clipping_planes_vertex>
    #include <fog_vertex>
  }
`,he=`
  #include <fog_pars_fragment>
  #include <logdepthbuf_pars_fragment>
  #include <clipping_planes_pars_fragment>
  
  uniform sampler2D map;
  uniform sampler2D alphaMap;
  uniform float useGradient;
  uniform float useMap;
  uniform float useAlphaMap;
  uniform float useDash;
  uniform float dashArray;
  uniform float dashOffset;
  uniform float dashRatio;
  uniform float visibility;
  uniform float alphaTest;
  uniform vec2 repeat;
  uniform vec3 gradient[2];
  
  varying vec2 vUV;
  varying vec4 vColor;
  varying float vCounters;
  
  void main() {
    #include <logdepthbuf_fragment>
    vec4 diffuseColor = vColor;
    if (useGradient == 1.) diffuseColor = vec4(mix(gradient[0], gradient[1], vCounters), 1.0);
    if (useMap == 1.) diffuseColor *= texture2D(map, vUV * repeat);
    if (useAlphaMap == 1.) diffuseColor.a *= texture2D(alphaMap, vUV * repeat).a;
    if (diffuseColor.a < alphaTest) discard;
    if (useDash == 1.) diffuseColor.a *= ceil(mod(vCounters + dashOffset, dashArray) - (dashArray * dashRatio));
    diffuseColor.a *= step(vCounters, visibility);
    #include <clipping_planes_fragment>
    gl_FragColor = diffuseColor;     
    #include <fog_fragment>
    #include <tonemapping_fragment>
    #include <${parseInt(`184`.replace(/\D+/g,``))>=154?`colorspace_fragment`:`encodings_fragment`}>
  }
`,ge=class extends o{constructor(e){super({uniforms:{...x.fog,lineWidth:{value:1},map:{value:null},useMap:{value:0},alphaMap:{value:null},useAlphaMap:{value:0},color:{value:new r(16777215)},gradient:{value:[new r(16711680),new r(65280)]},opacity:{value:1},resolution:{value:new a(1,1)},sizeAttenuation:{value:1},dashArray:{value:0},dashOffset:{value:0},dashRatio:{value:.5},useDash:{value:0},useGradient:{value:0},visibility:{value:1},alphaTest:{value:0},repeat:{value:new a(1,1)}},vertexShader:me,fragmentShader:he}),R(this,`lineWidth`),R(this,`map`),R(this,`useMap`),R(this,`alphaMap`),R(this,`useAlphaMap`),R(this,`color`),R(this,`gradient`),R(this,`resolution`),R(this,`sizeAttenuation`),R(this,`dashArray`),R(this,`dashOffset`),R(this,`dashRatio`),R(this,`useDash`),R(this,`useGradient`),R(this,`visibility`),R(this,`repeat`),this.type=`MeshLineMaterial`,Object.defineProperties(this,{lineWidth:{enumerable:!0,get(){return this.uniforms.lineWidth.value},set(e){this.uniforms.lineWidth.value=e}},map:{enumerable:!0,get(){return this.uniforms.map.value},set(e){this.uniforms.map.value=e}},useMap:{enumerable:!0,get(){return this.uniforms.useMap.value},set(e){this.uniforms.useMap.value=e}},alphaMap:{enumerable:!0,get(){return this.uniforms.alphaMap.value},set(e){this.uniforms.alphaMap.value=e}},useAlphaMap:{enumerable:!0,get(){return this.uniforms.useAlphaMap.value},set(e){this.uniforms.useAlphaMap.value=e}},color:{enumerable:!0,get(){return this.uniforms.color.value},set(e){this.uniforms.color.value=e}},gradient:{enumerable:!0,get(){return this.uniforms.gradient.value},set(e){this.uniforms.gradient.value=e}},opacity:{enumerable:!0,get(){return this.uniforms.opacity.value},set(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get(){return this.uniforms.resolution.value},set(e){this.uniforms.resolution.value.copy(e)}},sizeAttenuation:{enumerable:!0,get(){return this.uniforms.sizeAttenuation.value},set(e){this.uniforms.sizeAttenuation.value=e}},dashArray:{enumerable:!0,get(){return this.uniforms.dashArray.value},set(e){this.uniforms.dashArray.value=e,this.useDash=e===0?0:1}},dashOffset:{enumerable:!0,get(){return this.uniforms.dashOffset.value},set(e){this.uniforms.dashOffset.value=e}},dashRatio:{enumerable:!0,get(){return this.uniforms.dashRatio.value},set(e){this.uniforms.dashRatio.value=e}},useDash:{enumerable:!0,get(){return this.uniforms.useDash.value},set(e){this.uniforms.useDash.value=e}},useGradient:{enumerable:!0,get(){return this.uniforms.useGradient.value},set(e){this.uniforms.useGradient.value=e}},visibility:{enumerable:!0,get(){return this.uniforms.visibility.value},set(e){this.uniforms.visibility.value=e}},alphaTest:{enumerable:!0,get(){return this.uniforms.alphaTest.value},set(e){this.uniforms.alphaTest.value=e}},repeat:{enumerable:!0,get(){return this.uniforms.repeat.value},set(e){this.uniforms.repeat.value.copy(e)}}}),this.setValues(e)}copy(e){return super.copy(e),this.lineWidth=e.lineWidth,this.map=e.map,this.useMap=e.useMap,this.alphaMap=e.alphaMap,this.useAlphaMap=e.useAlphaMap,this.color.copy(e.color),this.gradient=e.gradient,this.opacity=e.opacity,this.resolution.copy(e.resolution),this.sizeAttenuation=e.sizeAttenuation,this.dashArray=e.dashArray,this.dashOffset=e.dashOffset,this.dashRatio=e.dashRatio,this.useDash=e.useDash,this.useGradient=e.useGradient,this.visibility=e.visibility,this.alphaTest=e.alphaTest,this.repeat.copy(e.repeat),this}},B={width:.2,length:1,decay:1,local:!1,stride:0,interval:1},_e=(e,t=1)=>(e.set(e.subarray(t)),e.fill(-1/0,-t),e);function ve(e,t){let{length:n,local:r,decay:i,interval:a,stride:o}={...B,...t},s=A.useRef(null),[c]=A.useState(()=>new p);A.useLayoutEffect(()=>{e&&(s.current=Float32Array.from({length:n*10*3},(t,n)=>e.position.getComponent(n%3)))},[n,e]);let l=A.useRef(new p),u=A.useRef(0);return y(()=>{if(e&&s.current){if(u.current===0){let t;r?t=e.position:(e.getWorldPosition(c),t=c);let n=1*i;for(let e=0;e<n;e++)t.distanceTo(l.current)<o||(_e(s.current,3),s.current.set(t.toArray(),s.current.length-3));l.current.copy(t)}u.current++,u.current%=a}}),s}var ye=A.forwardRef((e,t)=>{let{children:n}=e,{width:r,length:i,decay:o,local:s,stride:c,interval:u}={...B,...e},{color:d=`hotpink`,attenuation:f,target:p}=e,m=E(e=>e.size),h=E(e=>e.scene),g=A.useRef(null),[_,v]=A.useState(null),b=ve(_,{length:i,decay:o,local:s,stride:c,interval:u});A.useEffect(()=>{let e=p?.current||g.current.children.find(e=>e instanceof l);e&&v(e)},[b,p]);let x=A.useMemo(()=>new pe,[]),S=A.useMemo(()=>{let e=new ge({lineWidth:.1*r,color:d,sizeAttenuation:1,resolution:new a(m.width,m.height)}),t;if(n)if(Array.isArray(n))t=n.find(e=>{let t=e;return typeof t.type==`string`&&t.type===`meshLineMaterial`});else{let e=n;typeof e.type==`string`&&e.type===`meshLineMaterial`&&(t=e)}return typeof t?.props==`object`&&t?.props!==null&&e.setValues(t.props),e},[r,d,m,n]);return A.useEffect(()=>{S.uniforms.resolution.value.set(m.width,m.height)},[m]),y(()=>{b.current&&x.setPoints(b.current,f)}),A.createElement(`group`,null,T(A.createElement(`mesh`,{ref:t,geometry:x,material:S}),h),A.createElement(`group`,{ref:g},n))}),V=(e,t)=>{e.updateRanges[0]=t};function be(e,t,n=new p){let r=Math.PI*(e-.5),i=2*Math.PI*(t-.5);return n.x=Math.cos(i),n.y=Math.sin(r),n.z=Math.sin(i),n}var xe=A.forwardRef(({inclination:e=.6,azimuth:t=.1,distance:n=1e3,mieCoefficient:r=.005,mieDirectionalG:i=.8,rayleigh:a=.5,turbidity:o=10,sunPosition:s=be(e,t),...c},l)=>{let u=A.useMemo(()=>new p().setScalar(n),[n]),[d]=A.useState(()=>new le);return A.createElement(`primitive`,j({object:d,ref:l,"material-uniforms-mieCoefficient-value":r,"material-uniforms-mieDirectionalG-value":i,"material-uniforms-rayleigh-value":a,"material-uniforms-sunPosition-value":s,"material-uniforms-turbidity-value":o,scale:u},c))}),Se=class extends o{constructor(){super({uniforms:{time:{value:0},fade:{value:1}},vertexShader:`
      uniform float time;
      attribute float size;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 0.5);
        gl_PointSize = size * (30.0 / -mvPosition.z) * (3.0 + sin(time + 100.0));
        gl_Position = projectionMatrix * mvPosition;
      }`,fragmentShader:`
      uniform sampler2D pointTexture;
      uniform float fade;
      varying vec3 vColor;
      void main() {
        float opacity = 1.0;
        if (fade == 1.0) {
          float d = distance(gl_PointCoord, vec2(0.5, 0.5));
          opacity = 1.0 / (1.0 + exp(16.0 * (d - 0.25)));
        }
        gl_FragColor = vec4(vColor, opacity);

        #include <tonemapping_fragment>
	      #include <${L>=154?`colorspace_fragment`:`encodings_fragment`}>
      }`})}},Ce=e=>new p().setFromSpherical(new d(e,Math.acos(1-Math.random()*2),Math.random()*2*Math.PI)),we=A.forwardRef(({radius:e=100,depth:t=50,count:n=5e3,saturation:i=0,factor:a=4,fade:o=!1,speed:s=1},c)=>{let l=A.useRef(null),[u,d,f]=A.useMemo(()=>{let o=[],s=[],c=Array.from({length:n},()=>(.5+.5*Math.random())*a),l=new r,u=e+t,d=t/n;for(let e=0;e<n;e++)u-=d*Math.random(),o.push(...Ce(u).toArray()),l.setHSL(e/n,i,.9),s.push(l.r,l.g,l.b);return[new Float32Array(o),new Float32Array(s),new Float32Array(c)]},[n,t,a,e,i]);y(e=>l.current&&(l.current.uniforms.time.value=e.clock.elapsedTime*s));let[p]=A.useState(()=>new Se);return A.createElement(`points`,{ref:c},A.createElement(`bufferGeometry`,null,A.createElement(`bufferAttribute`,{attach:`attributes-position`,args:[u,3]}),A.createElement(`bufferAttribute`,{attach:`attributes-color`,args:[d,3]}),A.createElement(`bufferAttribute`,{attach:`attributes-size`,args:[f,1]})),A.createElement(`primitive`,{ref:l,object:p,attach:`material`,blending:2,"uniforms-fade-value":o,depthWrite:!1,transparent:!0,vertexColors:!0}))}),Te=`https://rawcdn.githack.com/pmndrs/drei-assets/9225a9f1fbd449d9411125c2f419b843d0308c9f/cloud.png`,H=new t,U=new p,W=new u,G=new p,K=new u,q=new p,J=A.createContext(null),Ee=A.forwardRef(({children:e,material:t=c,texture:n=Te,range:r,limit:a=200,frustumCulled:o,...s},l)=>{D({CloudMaterial:A.useMemo(()=>class extends t{constructor(){super();let e=parseInt(`184`.replace(/\D+/g,``))>=154?`opaque_fragment`:`output_fragment`;this.onBeforeCompile=t=>{t.vertexShader=`attribute float cloudOpacity;
               varying float vOpacity;
              `+t.vertexShader.replace(`#include <fog_vertex>`,`#include <fog_vertex>
                 vOpacity = cloudOpacity;
                `),t.fragmentShader=`varying float vOpacity;
              `+t.fragmentShader.replace(`#include <${e}>`,`#include <${e}>
                 gl_FragColor = vec4(outgoingLight, diffuseColor.a * vOpacity);
                `)}}},[t])});let d=A.useRef(null),f=A.useRef([]),m=A.useMemo(()=>new Float32Array(Array.from({length:a},()=>1)),[a]),h=A.useMemo(()=>new Float32Array(Array.from({length:a},()=>[1,1,1]).flat()),[a]),g=I(n),_=0,v=0,b,x=new u,S=new p(0,0,1),C=new p;y((e,t)=>{for(_=e.clock.elapsedTime,H.copy(d.current.matrixWorld).invert(),e.camera.matrixWorld.decompose(G,K,q),v=0;v<f.current.length;v++)b=f.current[v],b.ref.current.matrixWorld.decompose(U,W,q),U.add(C.copy(b.position).applyQuaternion(W).multiply(q)),W.copy(K).multiply(x.setFromAxisAngle(S,b.rotation+=t*b.rotationFactor)),q.multiplyScalar(b.volume+(1+Math.sin(_*b.density*b.speed))/2*b.growth),b.matrix.compose(U,W,q).premultiply(H),b.dist=U.distanceTo(G);for(f.current.sort((e,t)=>t.dist-e.dist),v=0;v<f.current.length;v++)b=f.current[v],m[v]=b.opacity*(b.dist<b.fade-1?b.dist/b.fade:1),d.current.setMatrixAt(v,b.matrix),d.current.setColorAt(v,b.color);d.current.geometry.attributes.cloudOpacity.needsUpdate=!0,d.current.instanceMatrix.needsUpdate=!0,d.current.instanceColor&&(d.current.instanceColor.needsUpdate=!0)}),A.useLayoutEffect(()=>{let e=Math.min(a,r===void 0?a:r,f.current.length);d.current.count=e,V(d.current.instanceMatrix,{start:0,count:e*16}),d.current.instanceColor&&V(d.current.instanceColor,{start:0,count:e*3}),V(d.current.geometry.attributes.cloudOpacity,{start:0,count:e})});let w=[g.image.width??1,g.image.height??1],T=Math.max(w[0],w[1]);return w=[w[0]/T,w[1]/T],A.createElement(`group`,j({ref:l},s),A.createElement(J.Provider,{value:f},e,A.createElement(`instancedMesh`,{matrixAutoUpdate:!1,ref:d,args:[null,null,a],frustumCulled:o},A.createElement(`instancedBufferAttribute`,{usage:i,attach:`instanceColor`,args:[h,3]}),A.createElement(`planeGeometry`,{args:[...w]},A.createElement(`instancedBufferAttribute`,{usage:i,attach:`attributes-cloudOpacity`,args:[m,1]})),A.createElement(`cloudMaterial`,{key:t.name,map:g,transparent:!0,depthWrite:!1}))))}),Y=A.forwardRef(({opacity:e=1,speed:n=0,bounds:i=[5,1,1],segments:a=20,color:o=`#ffffff`,fade:s=10,volume:c=6,smallestVolume:l=.25,distribute:u=null,growth:d=4,concentrate:f=`inside`,seed:m=Math.random(),...h},g)=>{function _(){let e=Math.sin(m++)*1e4;return e-Math.floor(e)}let y=A.useContext(J),b=A.useRef(null),x=A.useId(),S=A.useMemo(()=>[...Array(a)].map((e,n)=>({segments:a,bounds:new p(1,1,1),position:new p,uuid:x,index:n,ref:b,dist:0,matrix:new t,color:new r,rotation:Math.PI/a*n})),[a,x]);return A.useLayoutEffect(()=>{S.forEach((t,r)=>{v(t,{volume:c,color:o,speed:n,growth:d,opacity:e,fade:s,bounds:i,density:Math.max(.5,_()),rotationFactor:Math.max(.2,.5*_())*n});let p=u?.(t,r);(p||a>1)&&t.position.copy(t.bounds).multiply(p?.point??{x:_()*2-1,y:_()*2-1,z:_()*2-1});let m=Math.abs(t.position.x),h=Math.abs(t.position.y),g=Math.abs(t.position.z),y=Math.max(m,h,g);t.length=1,m===y&&(t.length-=m/t.bounds.x),h===y&&(t.length-=h/t.bounds.y),g===y&&(t.length-=g/t.bounds.z),t.volume=(p?.volume===void 0?Math.max(Math.max(0,l),f===`random`?_():f===`inside`?t.length:1-t.length):p.volume)*c})},[f,i,s,o,e,d,c,m,a,n]),A.useLayoutEffect(()=>{let e=S;return y.current=[...y.current,...e],()=>{y.current=y.current.filter(e=>e.uuid!==x)}},[S]),A.useImperativeHandle(g,()=>b.current,[]),A.createElement(`group`,j({ref:b},h))}),De=A.forwardRef((e,t)=>A.useContext(J)?A.createElement(Y,j({ref:t},e)):A.createElement(Ee,null,A.createElement(Y,j({ref:t},e)))),Oe=class extends o{constructor(){super({uniforms:{time:{value:0},pixelRatio:{value:1}},vertexShader:`
        uniform float pixelRatio;
        uniform float time;
        attribute float size;  
        attribute float speed;  
        attribute float opacity;
        attribute vec3 noise;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vOpacity;

        void main() {
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          modelPosition.y += sin(time * speed + modelPosition.x * noise.x * 100.0) * 0.2;
          modelPosition.z += cos(time * speed + modelPosition.x * noise.y * 100.0) * 0.2;
          modelPosition.x += cos(time * speed + modelPosition.x * noise.z * 100.0) * 0.2;
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectionPostion = projectionMatrix * viewPosition;
          gl_Position = projectionPostion;
          gl_PointSize = size * 25. * pixelRatio;
          gl_PointSize *= (1.0 / - viewPosition.z);
          vColor = color;
          vOpacity = opacity;
        }
      `,fragmentShader:`
        varying vec3 vColor;
        varying float vOpacity;
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float strength = 0.05 / distanceToCenter - 0.1;
          gl_FragColor = vec4(vColor, strength * vOpacity);
          #include <tonemapping_fragment>
          #include <${L>=154?`colorspace_fragment`:`encodings_fragment`}>
        }
      `})}get time(){return this.uniforms.time.value}set time(e){this.uniforms.time.value=e}get pixelRatio(){return this.uniforms.pixelRatio.value}set pixelRatio(e){this.uniforms.pixelRatio.value=e}},X=e=>e&&e.constructor===Float32Array,ke=e=>[e.r,e.g,e.b],Z=e=>e instanceof a||e instanceof p||e instanceof h,Q=e=>Array.isArray(e)?e:Z(e)?e.toArray():[e,e,e];function $(e,t,n){return A.useMemo(()=>{if(t!==void 0){if(X(t))return t;if(t instanceof r){let n=Array.from({length:e*3},()=>ke(t)).flat();return Float32Array.from(n)}else if(Z(t)||Array.isArray(t)){let n=Array.from({length:e*3},()=>Q(t)).flat();return Float32Array.from(n)}return Float32Array.from({length:e},()=>t)}return Float32Array.from({length:e},n)},[t])}var Ae=A.forwardRef(({noise:e=1,count:t=100,speed:n=1,opacity:i=1,scale:a=1,size:o,color:s,children:c,...l},u)=>{A.useMemo(()=>D({SparklesImplMaterial:Oe}),[]);let d=A.useRef(null),f=E(e=>e.viewport.dpr),p=Q(a),m=A.useMemo(()=>Float32Array.from(Array.from({length:t},()=>p.map(w.randFloatSpread)).flat()),[t,...p]),h=$(t,o,Math.random),g=$(t,i),_=$(t,n),v=$(t*3,e),b=$(s===void 0?t*3:t,X(s)?s:new r(s),()=>1);return y(e=>{d.current&&d.current.material&&(d.current.material.time=e.clock.elapsedTime)}),A.useImperativeHandle(u,()=>d.current,[]),A.createElement(`points`,j({key:`particle-${t}-${JSON.stringify(a)}`},l,{ref:d}),A.createElement(`bufferGeometry`,null,A.createElement(`bufferAttribute`,{attach:`attributes-position`,args:[m,3]}),A.createElement(`bufferAttribute`,{attach:`attributes-size`,args:[h,1]}),A.createElement(`bufferAttribute`,{attach:`attributes-opacity`,args:[g,1]}),A.createElement(`bufferAttribute`,{attach:`attributes-speed`,args:[_,1]}),A.createElement(`bufferAttribute`,{attach:`attributes-color`,args:[b,3]}),A.createElement(`bufferAttribute`,{attach:`attributes-noise`,args:[v,3]})),c||A.createElement(`sparklesImplMaterial`,{transparent:!0,pixelRatio:f,depthWrite:!1}))});function je({all:e,scene:t,camera:n}){let r=E(({gl:e})=>e),i=E(({camera:e})=>e),a=E(({scene:e})=>e);return A.useLayoutEffect(()=>{let o=[];e&&(t||a).traverse(e=>{e.visible===!1&&(o.push(e),e.visible=!0)}),r.compile(t||a,n||i);let s=new g(128);new te(.01,1e5,s).update(r,t||a),s.dispose(),o.forEach(e=>e.visible=!1)},[]),null}function Me({pixelated:e}){let t=E(e=>e.gl),n=E(e=>e.internal.active),r=E(e=>e.performance.current),i=E(e=>e.viewport.initialDpr),a=E(e=>e.setDpr);return A.useEffect(()=>{let r=t.domElement;return()=>{n&&a(i),e&&r&&(r.style.imageRendering=`auto`)}},[]),A.useEffect(()=>{a(r*i),e&&t.domElement&&(t.domElement.style.imageRendering=r===1?`auto`:`pixelated`)},[r]),null}function Ne(){let e=E(e=>e.get),t=E(e=>e.setEvents),n=E(e=>e.performance.current);return A.useEffect(()=>{let n=e().events.enabled;return()=>t({enabled:n})},[]),A.useEffect(()=>t({enabled:n===1}),[n]),null}export{De as a,ye as c,Ae as i,ie as l,Me as n,we as o,je as r,xe as s,Ne as t,N as u};