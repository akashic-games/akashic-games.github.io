import{_ as a,C as p,o as l,c as o,H as e,Q as s}from"./chunks/framework.459ab1e9.js";const B=JSON.parse('{"title":"描画順を変える","description":"","frontmatter":{},"headers":[],"relativePath":"reverse-reference/v3/drawing/display-order.md","filePath":"reverse-reference/v3/drawing/display-order.md"}'),c={name:"reverse-reference/v3/drawing/display-order.md"},r=s(`<h1 id="描画順を変える" tabindex="-1">描画順を変える <a class="header-anchor" href="#描画順を変える" aria-label="Permalink to &quot;描画順を変える&quot;">​</a></h1><p>同じ親を持つ複数のエンティティの描画順を変えるには <code>insertBefore()</code> を利用します。</p><h2 id="凡例" tabindex="-1">凡例 <a class="header-anchor" href="#凡例" aria-label="Permalink to &quot;凡例&quot;">​</a></h2><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> entity </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> g.</span><span style="color:#B392F0;">FilledRect</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 必要なプロパティ</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">scene.</span><span style="color:#B392F0;">insertBefore</span><span style="color:#E1E4E8;">(entity, targetEntity); </span><span style="color:#6A737D;">// targetEntity の直前に entity を挿入し、entity は先に(奥側に)描画される</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> entity </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> g.</span><span style="color:#6F42C1;">FilledRect</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">...</span><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 必要なプロパティ</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">scene.</span><span style="color:#6F42C1;">insertBefore</span><span style="color:#24292E;">(entity, targetEntity); </span><span style="color:#6A737D;">// targetEntity の直前に entity を挿入し、entity は先に(奥側に)描画される</span></span></code></pre></div><p><code>insertBefore()</code> は子エンティティの中での挿入位置を指定して追加できます。</p><h2 id="利用例" tabindex="-1">利用例 <a class="header-anchor" href="#利用例" aria-label="Permalink to &quot;利用例&quot;">​</a></h2><p>次のコンテンツは、既に追加されている緑と赤の矩形に青の矩形を赤の直前の子要素として追加しています。</p>`,7),t=s(`<h2 id="詳細" tabindex="-1">詳細 <a class="header-anchor" href="#詳細" aria-label="Permalink to &quot;詳細&quot;">​</a></h2><p>同じ親を持つエンティティは、描画したい順番に追加することで前後関係を制御できます。</p><p>後から順番を変更したい場合は <code>insertBefore()</code> を利用できます。</p><p>既に他エンティティの子供になっているエンティティを <code>insertBefore()</code> すると、親となっていたエンティティの子供から外れ、<code>insertBefore()</code> で指定した親の子供となります。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> scene </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> g.</span><span style="color:#B392F0;">Scene</span><span style="color:#E1E4E8;">({ game: g.game });</span></span>
<span class="line"><span style="color:#E1E4E8;">  scene.onLoad.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> groupA </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> g.</span><span style="color:#B392F0;">E</span><span style="color:#E1E4E8;">({ scene: scene, x: </span><span style="color:#79B8FF;">50</span><span style="color:#E1E4E8;">, y: </span><span style="color:#79B8FF;">50</span><span style="color:#E1E4E8;"> });</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> groupB </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> g.</span><span style="color:#B392F0;">E</span><span style="color:#E1E4E8;">({ scene: scene, x: </span><span style="color:#79B8FF;">150</span><span style="color:#E1E4E8;">, y: </span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;"> });</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> blue </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createRect</span><span style="color:#E1E4E8;">(scene, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;blue&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    groupA.</span><span style="color:#B392F0;">append</span><span style="color:#E1E4E8;">(blue);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> red </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createRect</span><span style="color:#E1E4E8;">(scene, </span><span style="color:#79B8FF;">30</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;red&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    groupA.</span><span style="color:#B392F0;">append</span><span style="color:#E1E4E8;">(red);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> green </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createRect</span><span style="color:#E1E4E8;">(scene, </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;green&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    groupB.</span><span style="color:#B392F0;">append</span><span style="color:#E1E4E8;">(green);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    scene.</span><span style="color:#B392F0;">append</span><span style="color:#E1E4E8;">(groupA);</span></span>
<span class="line"><span style="color:#E1E4E8;">    scene.</span><span style="color:#B392F0;">append</span><span style="color:#E1E4E8;">(groupB);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    groupA.</span><span style="color:#B392F0;">insertBefore</span><span style="color:#E1E4E8;">(green, red); </span><span style="color:#6A737D;">// green は groupB の子供から外れ、groupA の子供となる</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">  g.game.</span><span style="color:#B392F0;">pushScene</span><span style="color:#E1E4E8;">(scene);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createRect</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">scene</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">x</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">y</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">color</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> g.</span><span style="color:#B392F0;">FilledRect</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    scene: scene,</span></span>
<span class="line"><span style="color:#E1E4E8;">    width: </span><span style="color:#79B8FF;">30</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    height: </span><span style="color:#79B8FF;">30</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    x: x,</span></span>
<span class="line"><span style="color:#E1E4E8;">    y: y,</span></span>
<span class="line"><span style="color:#E1E4E8;">    cssColor: color</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> scene </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> g.</span><span style="color:#6F42C1;">Scene</span><span style="color:#24292E;">({ game: g.game });</span></span>
<span class="line"><span style="color:#24292E;">  scene.onLoad.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">function</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> groupA </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> g.</span><span style="color:#6F42C1;">E</span><span style="color:#24292E;">({ scene: scene, x: </span><span style="color:#005CC5;">50</span><span style="color:#24292E;">, y: </span><span style="color:#005CC5;">50</span><span style="color:#24292E;"> });</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> groupB </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> g.</span><span style="color:#6F42C1;">E</span><span style="color:#24292E;">({ scene: scene, x: </span><span style="color:#005CC5;">150</span><span style="color:#24292E;">, y: </span><span style="color:#005CC5;">100</span><span style="color:#24292E;"> });</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> blue </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createRect</span><span style="color:#24292E;">(scene, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;blue&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    groupA.</span><span style="color:#6F42C1;">append</span><span style="color:#24292E;">(blue);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> red </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createRect</span><span style="color:#24292E;">(scene, </span><span style="color:#005CC5;">30</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;red&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    groupA.</span><span style="color:#6F42C1;">append</span><span style="color:#24292E;">(red);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> green </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createRect</span><span style="color:#24292E;">(scene, </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;green&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    groupB.</span><span style="color:#6F42C1;">append</span><span style="color:#24292E;">(green);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    scene.</span><span style="color:#6F42C1;">append</span><span style="color:#24292E;">(groupA);</span></span>
<span class="line"><span style="color:#24292E;">    scene.</span><span style="color:#6F42C1;">append</span><span style="color:#24292E;">(groupB);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    groupA.</span><span style="color:#6F42C1;">insertBefore</span><span style="color:#24292E;">(green, red); </span><span style="color:#6A737D;">// green は groupB の子供から外れ、groupA の子供となる</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">  g.game.</span><span style="color:#6F42C1;">pushScene</span><span style="color:#24292E;">(scene);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createRect</span><span style="color:#24292E;">(</span><span style="color:#E36209;">scene</span><span style="color:#24292E;">, </span><span style="color:#E36209;">x</span><span style="color:#24292E;">, </span><span style="color:#E36209;">y</span><span style="color:#24292E;">, </span><span style="color:#E36209;">color</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> g.</span><span style="color:#6F42C1;">FilledRect</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    scene: scene,</span></span>
<span class="line"><span style="color:#24292E;">    width: </span><span style="color:#005CC5;">30</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    height: </span><span style="color:#005CC5;">30</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    x: x,</span></span>
<span class="line"><span style="color:#24292E;">    y: y,</span></span>
<span class="line"><span style="color:#24292E;">    cssColor: color</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="関連情報" tabindex="-1">関連情報 <a class="header-anchor" href="#関連情報" aria-label="Permalink to &quot;関連情報&quot;">​</a></h2><ul><li><a href="/tutorial/v3/display-order.html#display-order">チュートリアル</a></li><li><a href="/akashic-engine/v3/classes/Scene.html#insertBefore">API リファレンス</a></li></ul>`,7);function E(y,i,d,F,g,u){const n=p("PlaygroundElement");return l(),o("div",null,[r,e(n,{gameJsonUri:"/snippets/reverse-reference/drawing/display-order/game.json",width:600,height:400}),t])}const C=a(c,[["render",E]]);export{B as __pageData,C as default};