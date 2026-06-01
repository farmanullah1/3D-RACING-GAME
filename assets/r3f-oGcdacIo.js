import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{A as t,B as n,C as r,F as i,H as a,I as o,L as s,M as c,N as l,O as u,R as d,T as f,V as p,W as m,_ as h,b as g,c as _,d as v,f as y,g as b,j as x,k as S,l as C,p as w,u as T,v as E,w as ee,y as D,z as O}from"./fx-C5kH3jxs.js";var k=e(m());function A(){return A=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},A.apply(null,arguments)}var te=parseInt(`184`.replace(/\D+/g,``)),ne=Object.defineProperty,re=(e,t,n)=>t in e?ne(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,j=(e,t,n)=>(re(e,typeof t==`symbol`?t:t+``,n),n),ie=(()=>{let e={uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new p},up:{value:new p(0,1,0)}},vertexShader:`
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
      #include <${te>=154?`colorspace_fragment`:`encodings_fragment`}>

      }
    `},n=new i({name:`SkyShader`,fragmentShader:e.fragmentShader,vertexShader:e.vertexShader,uniforms:O.clone(e.uniforms),side:1,depthWrite:!1});class r extends t{constructor(){super(new E(1,1,1),n)}}return j(r,`SkyShader`,e),j(r,`material`,n),r})(),M=e=>e===Object(e)&&!Array.isArray(e)&&typeof e!=`function`;function N(e,t){let n=w(e=>e.gl),r=y(d,M(e)?Object.values(e):e);return(0,k.useLayoutEffect)(()=>{t?.(r)},[t]),(0,k.useEffect)(()=>{if(`initTexture`in n){let e=[];Array.isArray(r)?e=r:r instanceof s?e=[r]:M(r)&&(e=Object.values(r)),e.forEach(e=>{e instanceof s&&n.initTexture(e)})}},[n,r]),(0,k.useMemo)(()=>{if(M(e)){let t={},n=0;for(let i in e)t[i]=r[n++];return t}else return r},[e,r])}N.preload=e=>y.preload(d,e),N.clear=e=>y.clear(d,e);var P=parseInt(`184`.replace(/\D+/g,``)),ae=Object.defineProperty,oe=(e,t,n)=>t in e?ae(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,F=(e,t,n)=>(oe(e,typeof t==`symbol`?t:t+``,n),n);function I(e,t,n,r,i){let a;if(e=e.subarray||e.slice?e:e.buffer,n=n.subarray||n.slice?n:n.buffer,e=t?e.subarray?e.subarray(t,i&&t+i):e.slice(t,i&&t+i):e,n.set)n.set(e,r);else for(a=0;a<e.length;a++)n[a+r]=e[a];return n}function se(e){return e instanceof Float32Array?e:e instanceof g?e.getAttribute(`position`).array:e.map(e=>{let t=Array.isArray(e);return e instanceof p?[e.x,e.y,e.z]:e instanceof n?[e.x,e.y,0]:t&&e.length===3?[e[0],e[1],e[2]]:t&&e.length===2?[e[0],e[1],0]:e}).flat()}var ce=class extends g{constructor(){super(),F(this,`type`,`MeshLine`),F(this,`isMeshLine`,!0),F(this,`positions`,[]),F(this,`previous`,[]),F(this,`next`,[]),F(this,`side`,[]),F(this,`width`,[]),F(this,`indices_array`,[]),F(this,`uvs`,[]),F(this,`counters`,[]),F(this,`widthCallback`,null),F(this,`_attributes`),F(this,`_points`,[]),F(this,`points`),F(this,`matrixWorld`,new S),Object.defineProperties(this,{points:{enumerable:!0,get(){return this._points},set(e){this.setPoints(e,this.widthCallback)}}})}setMatrixWorld(e){this.matrixWorld=e}setPoints(e,t){if(e=se(e),this._points=e,this.widthCallback=t??null,this.positions=[],this.counters=[],e.length&&e[0]instanceof p)for(let t=0;t<e.length;t++){let n=e[t],r=t/(e.length-1);this.positions.push(n.x,n.y,n.z),this.positions.push(n.x,n.y,n.z),this.counters.push(r),this.counters.push(r)}else for(let t=0;t<e.length;t+=3){let n=t/(e.length-1);this.positions.push(e[t],e[t+1],e[t+2]),this.positions.push(e[t],e[t+1],e[t+2]),this.counters.push(n),this.counters.push(n)}this.process()}compareV3(e,t){let n=e*6,r=t*6;return this.positions[n]===this.positions[r]&&this.positions[n+1]===this.positions[r+1]&&this.positions[n+2]===this.positions[r+2]}copyV3(e){let t=e*6;return[this.positions[t],this.positions[t+1],this.positions[t+2]]}process(){let e=this.positions.length/6;this.previous=[],this.next=[],this.side=[],this.width=[],this.indices_array=[],this.uvs=[];let t,n;n=this.compareV3(0,e-1)?this.copyV3(e-2):this.copyV3(0),this.previous.push(n[0],n[1],n[2]),this.previous.push(n[0],n[1],n[2]);for(let r=0;r<e;r++){if(this.side.push(1),this.side.push(-1),t=this.widthCallback?this.widthCallback(r/(e-1)):1,this.width.push(t),this.width.push(t),this.uvs.push(r/(e-1),0),this.uvs.push(r/(e-1),1),r<e-1){n=this.copyV3(r),this.previous.push(n[0],n[1],n[2]),this.previous.push(n[0],n[1],n[2]);let e=r*2;this.indices_array.push(e,e+1,e+2),this.indices_array.push(e+2,e+1,e+3)}r>0&&(n=this.copyV3(r),this.next.push(n[0],n[1],n[2]),this.next.push(n[0],n[1],n[2]))}n=this.compareV3(e-1,0)?this.copyV3(1):this.copyV3(e-1),this.next.push(n[0],n[1],n[2]),this.next.push(n[0],n[1],n[2]),!this._attributes||this._attributes.position.count!==this.counters.length?this._attributes={position:new D(new Float32Array(this.positions),3),previous:new D(new Float32Array(this.previous),3),next:new D(new Float32Array(this.next),3),side:new D(new Float32Array(this.side),1),width:new D(new Float32Array(this.width),1),uv:new D(new Float32Array(this.uvs),2),index:new D(new Uint16Array(this.indices_array),1),counters:new D(new Float32Array(this.counters),1)}:(this._attributes.position.copyArray(new Float32Array(this.positions)),this._attributes.position.needsUpdate=!0,this._attributes.previous.copyArray(new Float32Array(this.previous)),this._attributes.previous.needsUpdate=!0,this._attributes.next.copyArray(new Float32Array(this.next)),this._attributes.next.needsUpdate=!0,this._attributes.side.copyArray(new Float32Array(this.side)),this._attributes.side.needsUpdate=!0,this._attributes.width.copyArray(new Float32Array(this.width)),this._attributes.width.needsUpdate=!0,this._attributes.uv.copyArray(new Float32Array(this.uvs)),this._attributes.uv.needsUpdate=!0,this._attributes.index.copyArray(new Uint16Array(this.indices_array)),this._attributes.index.needsUpdate=!0),this.setAttribute(`position`,this._attributes.position),this.setAttribute(`previous`,this._attributes.previous),this.setAttribute(`next`,this._attributes.next),this.setAttribute(`side`,this._attributes.side),this.setAttribute(`width`,this._attributes.width),this.setAttribute(`uv`,this._attributes.uv),this.setAttribute(`counters`,this._attributes.counters),this.setAttribute(`position`,this._attributes.position),this.setAttribute(`previous`,this._attributes.previous),this.setAttribute(`next`,this._attributes.next),this.setAttribute(`side`,this._attributes.side),this.setAttribute(`width`,this._attributes.width),this.setAttribute(`uv`,this._attributes.uv),this.setAttribute(`counters`,this._attributes.counters),this.setIndex(this._attributes.index),this.computeBoundingSphere(),this.computeBoundingBox()}advance({x:e,y:t,z:n}){let r=this._attributes.position.array,i=this._attributes.previous.array,a=this._attributes.next.array,o=r.length;I(r,0,i,0,o),I(r,6,r,0,o-6),r[o-6]=e,r[o-5]=t,r[o-4]=n,r[o-3]=e,r[o-2]=t,r[o-1]=n,I(r,6,a,0,o-6),a[o-6]=e,a[o-5]=t,a[o-4]=n,a[o-3]=e,a[o-2]=t,a[o-1]=n,this._attributes.position.needsUpdate=!0,this._attributes.previous.needsUpdate=!0,this._attributes.next.needsUpdate=!0}},le=`
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
`,ue=`
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
`,de=class extends i{constructor(e){super({uniforms:{...b.fog,lineWidth:{value:1},map:{value:null},useMap:{value:0},alphaMap:{value:null},useAlphaMap:{value:0},color:{value:new r(16777215)},gradient:{value:[new r(16711680),new r(65280)]},opacity:{value:1},resolution:{value:new n(1,1)},sizeAttenuation:{value:1},dashArray:{value:0},dashOffset:{value:0},dashRatio:{value:.5},useDash:{value:0},useGradient:{value:0},visibility:{value:1},alphaTest:{value:0},repeat:{value:new n(1,1)}},vertexShader:le,fragmentShader:ue}),F(this,`lineWidth`),F(this,`map`),F(this,`useMap`),F(this,`alphaMap`),F(this,`useAlphaMap`),F(this,`color`),F(this,`gradient`),F(this,`resolution`),F(this,`sizeAttenuation`),F(this,`dashArray`),F(this,`dashOffset`),F(this,`dashRatio`),F(this,`useDash`),F(this,`useGradient`),F(this,`visibility`),F(this,`repeat`),this.type=`MeshLineMaterial`,Object.defineProperties(this,{lineWidth:{enumerable:!0,get(){return this.uniforms.lineWidth.value},set(e){this.uniforms.lineWidth.value=e}},map:{enumerable:!0,get(){return this.uniforms.map.value},set(e){this.uniforms.map.value=e}},useMap:{enumerable:!0,get(){return this.uniforms.useMap.value},set(e){this.uniforms.useMap.value=e}},alphaMap:{enumerable:!0,get(){return this.uniforms.alphaMap.value},set(e){this.uniforms.alphaMap.value=e}},useAlphaMap:{enumerable:!0,get(){return this.uniforms.useAlphaMap.value},set(e){this.uniforms.useAlphaMap.value=e}},color:{enumerable:!0,get(){return this.uniforms.color.value},set(e){this.uniforms.color.value=e}},gradient:{enumerable:!0,get(){return this.uniforms.gradient.value},set(e){this.uniforms.gradient.value=e}},opacity:{enumerable:!0,get(){return this.uniforms.opacity.value},set(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get(){return this.uniforms.resolution.value},set(e){this.uniforms.resolution.value.copy(e)}},sizeAttenuation:{enumerable:!0,get(){return this.uniforms.sizeAttenuation.value},set(e){this.uniforms.sizeAttenuation.value=e}},dashArray:{enumerable:!0,get(){return this.uniforms.dashArray.value},set(e){this.uniforms.dashArray.value=e,this.useDash=e===0?0:1}},dashOffset:{enumerable:!0,get(){return this.uniforms.dashOffset.value},set(e){this.uniforms.dashOffset.value=e}},dashRatio:{enumerable:!0,get(){return this.uniforms.dashRatio.value},set(e){this.uniforms.dashRatio.value=e}},useDash:{enumerable:!0,get(){return this.uniforms.useDash.value},set(e){this.uniforms.useDash.value=e}},useGradient:{enumerable:!0,get(){return this.uniforms.useGradient.value},set(e){this.uniforms.useGradient.value=e}},visibility:{enumerable:!0,get(){return this.uniforms.visibility.value},set(e){this.uniforms.visibility.value=e}},alphaTest:{enumerable:!0,get(){return this.uniforms.alphaTest.value},set(e){this.uniforms.alphaTest.value=e}},repeat:{enumerable:!0,get(){return this.uniforms.repeat.value},set(e){this.uniforms.repeat.value.copy(e)}}}),this.setValues(e)}copy(e){return super.copy(e),this.lineWidth=e.lineWidth,this.map=e.map,this.useMap=e.useMap,this.alphaMap=e.alphaMap,this.useAlphaMap=e.useAlphaMap,this.color.copy(e.color),this.gradient=e.gradient,this.opacity=e.opacity,this.resolution.copy(e.resolution),this.sizeAttenuation=e.sizeAttenuation,this.dashArray=e.dashArray,this.dashOffset=e.dashOffset,this.dashRatio=e.dashRatio,this.useDash=e.useDash,this.useGradient=e.useGradient,this.visibility=e.visibility,this.alphaTest=e.alphaTest,this.repeat.copy(e.repeat),this}},L={width:.2,length:1,decay:1,local:!1,stride:0,interval:1},fe=(e,t=1)=>(e.set(e.subarray(t)),e.fill(-1/0,-t),e);function R(e,t){let{length:n,local:r,decay:i,interval:a,stride:o}={...L,...t},s=k.useRef(null),[c]=k.useState(()=>new p);k.useLayoutEffect(()=>{e&&(s.current=Float32Array.from({length:n*10*3},(t,n)=>e.position.getComponent(n%3)))},[n,e]);let l=k.useRef(new p),u=k.useRef(0);return v(()=>{if(e&&s.current){if(u.current===0){let t;r?t=e.position:(e.getWorldPosition(c),t=c);let n=1*i;for(let e=0;e<n;e++)t.distanceTo(l.current)<o||(fe(s.current,3),s.current.set(t.toArray(),s.current.length-3));l.current.copy(t)}u.current++,u.current%=a}}),s}var z=k.forwardRef((e,t)=>{let{children:r}=e,{width:i,length:a,decay:o,local:s,stride:l,interval:u}={...L,...e},{color:d=`hotpink`,attenuation:f,target:p}=e,m=w(e=>e.size),h=w(e=>e.scene),g=k.useRef(null),[_,y]=k.useState(null),b=R(_,{length:a,decay:o,local:s,stride:l,interval:u});k.useEffect(()=>{let e=p?.current||g.current.children.find(e=>e instanceof c);e&&y(e)},[b,p]);let x=k.useMemo(()=>new ce,[]),S=k.useMemo(()=>{let e=new de({lineWidth:.1*i,color:d,sizeAttenuation:1,resolution:new n(m.width,m.height)}),t;if(r)if(Array.isArray(r))t=r.find(e=>{let t=e;return typeof t.type==`string`&&t.type===`meshLineMaterial`});else{let e=r;typeof e.type==`string`&&e.type===`meshLineMaterial`&&(t=e)}return typeof t?.props==`object`&&t?.props!==null&&e.setValues(t.props),e},[i,d,m,r]);return k.useEffect(()=>{S.uniforms.resolution.value.set(m.width,m.height)},[m]),v(()=>{b.current&&x.setPoints(b.current,f)}),k.createElement(`group`,null,C(k.createElement(`mesh`,{ref:t,geometry:x,material:S}),h),k.createElement(`group`,{ref:g},r))}),B=(e,t)=>{e.updateRanges[0]=t};function pe(e,t,n=new p){let r=Math.PI*(e-.5),i=2*Math.PI*(t-.5);return n.x=Math.cos(i),n.y=Math.sin(r),n.z=Math.sin(i),n}var me=k.forwardRef(({inclination:e=.6,azimuth:t=.1,distance:n=1e3,mieCoefficient:r=.005,mieDirectionalG:i=.8,rayleigh:a=.5,turbidity:o=10,sunPosition:s=pe(e,t),...c},l)=>{let u=k.useMemo(()=>new p().setScalar(n),[n]),[d]=k.useState(()=>new ie);return k.createElement(`primitive`,A({object:d,ref:l,"material-uniforms-mieCoefficient-value":r,"material-uniforms-mieDirectionalG-value":i,"material-uniforms-rayleigh-value":a,"material-uniforms-sunPosition-value":s,"material-uniforms-turbidity-value":o,scale:u},c))}),he=class extends i{constructor(){super({uniforms:{time:{value:0},fade:{value:1}},vertexShader:`
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
	      #include <${P>=154?`colorspace_fragment`:`encodings_fragment`}>
      }`})}},ge=e=>new p().setFromSpherical(new o(e,Math.acos(1-Math.random()*2),Math.random()*2*Math.PI)),_e=k.forwardRef(({radius:e=100,depth:t=50,count:n=5e3,saturation:i=0,factor:a=4,fade:o=!1,speed:s=1},c)=>{let l=k.useRef(null),[u,d,f]=k.useMemo(()=>{let o=[],s=[],c=Array.from({length:n},()=>(.5+.5*Math.random())*a),l=new r,u=e+t,d=t/n;for(let e=0;e<n;e++)u-=d*Math.random(),o.push(...ge(u).toArray()),l.setHSL(e/n,i,.9),s.push(l.r,l.g,l.b);return[new Float32Array(o),new Float32Array(s),new Float32Array(c)]},[n,t,a,e,i]);v(e=>l.current&&(l.current.uniforms.time.value=e.clock.elapsedTime*s));let[p]=k.useState(()=>new he);return k.createElement(`points`,{ref:c},k.createElement(`bufferGeometry`,null,k.createElement(`bufferAttribute`,{attach:`attributes-position`,args:[u,3]}),k.createElement(`bufferAttribute`,{attach:`attributes-color`,args:[d,3]}),k.createElement(`bufferAttribute`,{attach:`attributes-size`,args:[f,1]})),k.createElement(`primitive`,{ref:l,object:p,attach:`material`,blending:2,"uniforms-fade-value":o,depthWrite:!1,transparent:!0,vertexColors:!0}))}),ve=`https://rawcdn.githack.com/pmndrs/drei-assets/9225a9f1fbd449d9411125c2f419b843d0308c9f/cloud.png`,V=new S,H=new p,U=new l,W=new p,G=new l,K=new p,q=k.createContext(null),ye=k.forwardRef(({children:e,material:t=x,texture:n=ve,range:r,limit:i=200,frustumCulled:a,...o},s)=>{T({CloudMaterial:k.useMemo(()=>class extends t{constructor(){super();let e=parseInt(`184`.replace(/\D+/g,``))>=154?`opaque_fragment`:`output_fragment`;this.onBeforeCompile=t=>{t.vertexShader=`attribute float cloudOpacity;
               varying float vOpacity;
              `+t.vertexShader.replace(`#include <fog_vertex>`,`#include <fog_vertex>
                 vOpacity = cloudOpacity;
                `),t.fragmentShader=`varying float vOpacity;
              `+t.fragmentShader.replace(`#include <${e}>`,`#include <${e}>
                 gl_FragColor = vec4(outgoingLight, diffuseColor.a * vOpacity);
                `)}}},[t])});let c=k.useRef(null),u=k.useRef([]),d=k.useMemo(()=>new Float32Array(Array.from({length:i},()=>1)),[i]),m=k.useMemo(()=>new Float32Array(Array.from({length:i},()=>[1,1,1]).flat()),[i]),h=N(n),g=0,_=0,y,b=new l,S=new p(0,0,1),C=new p;v((e,t)=>{for(g=e.clock.elapsedTime,V.copy(c.current.matrixWorld).invert(),e.camera.matrixWorld.decompose(W,G,K),_=0;_<u.current.length;_++)y=u.current[_],y.ref.current.matrixWorld.decompose(H,U,K),H.add(C.copy(y.position).applyQuaternion(U).multiply(K)),U.copy(G).multiply(b.setFromAxisAngle(S,y.rotation+=t*y.rotationFactor)),K.multiplyScalar(y.volume+(1+Math.sin(g*y.density*y.speed))/2*y.growth),y.matrix.compose(H,U,K).premultiply(V),y.dist=H.distanceTo(W);for(u.current.sort((e,t)=>t.dist-e.dist),_=0;_<u.current.length;_++)y=u.current[_],d[_]=y.opacity*(y.dist<y.fade-1?y.dist/y.fade:1),c.current.setMatrixAt(_,y.matrix),c.current.setColorAt(_,y.color);c.current.geometry.attributes.cloudOpacity.needsUpdate=!0,c.current.instanceMatrix.needsUpdate=!0,c.current.instanceColor&&(c.current.instanceColor.needsUpdate=!0)}),k.useLayoutEffect(()=>{let e=Math.min(i,r===void 0?i:r,u.current.length);c.current.count=e,B(c.current.instanceMatrix,{start:0,count:e*16}),c.current.instanceColor&&B(c.current.instanceColor,{start:0,count:e*3}),B(c.current.geometry.attributes.cloudOpacity,{start:0,count:e})});let w=[h.image.width??1,h.image.height??1],E=Math.max(w[0],w[1]);return w=[w[0]/E,w[1]/E],k.createElement(`group`,A({ref:s},o),k.createElement(q.Provider,{value:u},e,k.createElement(`instancedMesh`,{matrixAutoUpdate:!1,ref:c,args:[null,null,i],frustumCulled:a},k.createElement(`instancedBufferAttribute`,{usage:f,attach:`instanceColor`,args:[m,3]}),k.createElement(`planeGeometry`,{args:[...w]},k.createElement(`instancedBufferAttribute`,{usage:f,attach:`attributes-cloudOpacity`,args:[d,1]})),k.createElement(`cloudMaterial`,{key:t.name,map:h,transparent:!0,depthWrite:!1}))))}),J=k.forwardRef(({opacity:e=1,speed:t=0,bounds:n=[5,1,1],segments:i=20,color:a=`#ffffff`,fade:o=10,volume:s=6,smallestVolume:c=.25,distribute:l=null,growth:u=4,concentrate:d=`inside`,seed:f=Math.random(),...m},h)=>{function g(){let e=Math.sin(f++)*1e4;return e-Math.floor(e)}let v=k.useContext(q),y=k.useRef(null),b=k.useId(),x=k.useMemo(()=>[...Array(i)].map((e,t)=>({segments:i,bounds:new p(1,1,1),position:new p,uuid:b,index:t,ref:y,dist:0,matrix:new S,color:new r,rotation:Math.PI/i*t})),[i,b]);return k.useLayoutEffect(()=>{x.forEach((r,f)=>{_(r,{volume:s,color:a,speed:t,growth:u,opacity:e,fade:o,bounds:n,density:Math.max(.5,g()),rotationFactor:Math.max(.2,.5*g())*t});let p=l?.(r,f);(p||i>1)&&r.position.copy(r.bounds).multiply(p?.point??{x:g()*2-1,y:g()*2-1,z:g()*2-1});let m=Math.abs(r.position.x),h=Math.abs(r.position.y),v=Math.abs(r.position.z),y=Math.max(m,h,v);r.length=1,m===y&&(r.length-=m/r.bounds.x),h===y&&(r.length-=h/r.bounds.y),v===y&&(r.length-=v/r.bounds.z),r.volume=(p?.volume===void 0?Math.max(Math.max(0,c),d===`random`?g():d===`inside`?r.length:1-r.length):p.volume)*s})},[d,n,o,a,e,u,s,f,i,t]),k.useLayoutEffect(()=>{let e=x;return v.current=[...v.current,...e],()=>{v.current=v.current.filter(e=>e.uuid!==b)}},[x]),k.useImperativeHandle(h,()=>y.current,[]),k.createElement(`group`,A({ref:y},m))}),be=k.forwardRef((e,t)=>k.useContext(q)?k.createElement(J,A({ref:t},e)):k.createElement(ye,null,k.createElement(J,A({ref:t},e)))),xe=class extends i{constructor(){super({uniforms:{time:{value:0},pixelRatio:{value:1}},vertexShader:`
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
          #include <${P>=154?`colorspace_fragment`:`encodings_fragment`}>
        }
      `})}get time(){return this.uniforms.time.value}set time(e){this.uniforms.time.value=e}get pixelRatio(){return this.uniforms.pixelRatio.value}set pixelRatio(e){this.uniforms.pixelRatio.value=e}},Y=e=>e&&e.constructor===Float32Array,Se=e=>[e.r,e.g,e.b],X=e=>e instanceof n||e instanceof p||e instanceof a,Z=e=>Array.isArray(e)?e:X(e)?e.toArray():[e,e,e];function Q(e,t,n){return k.useMemo(()=>{if(t!==void 0){if(Y(t))return t;if(t instanceof r){let n=Array.from({length:e*3},()=>Se(t)).flat();return Float32Array.from(n)}else if(X(t)||Array.isArray(t)){let n=Array.from({length:e*3},()=>Z(t)).flat();return Float32Array.from(n)}return Float32Array.from({length:e},()=>t)}return Float32Array.from({length:e},n)},[t])}var Ce=k.forwardRef(({noise:e=1,count:t=100,speed:n=1,opacity:i=1,scale:a=1,size:o,color:s,children:c,...l},d)=>{k.useMemo(()=>T({SparklesImplMaterial:xe}),[]);let f=k.useRef(null),p=w(e=>e.viewport.dpr),m=Z(a),h=k.useMemo(()=>Float32Array.from(Array.from({length:t},()=>m.map(u.randFloatSpread)).flat()),[t,...m]),g=Q(t,o,Math.random),_=Q(t,i),y=Q(t,n),b=Q(t*3,e),x=Q(s===void 0?t*3:t,Y(s)?s:new r(s),()=>1);return v(e=>{f.current&&f.current.material&&(f.current.material.time=e.clock.elapsedTime)}),k.useImperativeHandle(d,()=>f.current,[]),k.createElement(`points`,A({key:`particle-${t}-${JSON.stringify(a)}`},l,{ref:f}),k.createElement(`bufferGeometry`,null,k.createElement(`bufferAttribute`,{attach:`attributes-position`,args:[h,3]}),k.createElement(`bufferAttribute`,{attach:`attributes-size`,args:[g,1]}),k.createElement(`bufferAttribute`,{attach:`attributes-opacity`,args:[_,1]}),k.createElement(`bufferAttribute`,{attach:`attributes-speed`,args:[y,1]}),k.createElement(`bufferAttribute`,{attach:`attributes-color`,args:[x,3]}),k.createElement(`bufferAttribute`,{attach:`attributes-noise`,args:[b,3]})),c||k.createElement(`sparklesImplMaterial`,{transparent:!0,pixelRatio:p,depthWrite:!1}))});function $({all:e,scene:t,camera:n}){let r=w(({gl:e})=>e),i=w(({camera:e})=>e),a=w(({scene:e})=>e);return k.useLayoutEffect(()=>{let o=[];e&&(t||a).traverse(e=>{e.visible===!1&&(o.push(e),e.visible=!0)}),r.compile(t||a,n||i);let s=new h(128);new ee(.01,1e5,s).update(r,t||a),s.dispose(),o.forEach(e=>e.visible=!1)},[]),null}function we({pixelated:e}){let t=w(e=>e.gl),n=w(e=>e.internal.active),r=w(e=>e.performance.current),i=w(e=>e.viewport.initialDpr),a=w(e=>e.setDpr);return k.useEffect(()=>{let r=t.domElement;return()=>{n&&a(i),e&&r&&(r.style.imageRendering=`auto`)}},[]),k.useEffect(()=>{a(r*i),e&&t.domElement&&(t.domElement.style.imageRendering=r===1?`auto`:`pixelated`)},[r]),null}function Te(){let e=w(e=>e.get),t=w(e=>e.setEvents),n=w(e=>e.performance.current);return k.useEffect(()=>{let n=e().events.enabled;return()=>t({enabled:n})},[]),k.useEffect(()=>t({enabled:n===1}),[n]),null}export{be as a,z as c,Ce as i,we as n,_e as o,$ as r,me as s,Te as t};