import{_ as a,c as n,I as e,a3 as s,o as h,E as t}from"./chunks/framework.DaCD_bki.js";const u=JSON.parse('{"title":"エンティティを追加・削除する","description":"","frontmatter":{},"headers":[],"relativePath":"reverse-reference/v3/drawing/entity.md","filePath":"reverse-reference/v3/drawing/entity.md"}'),p={name:"reverse-reference/v3/drawing/entity.md"},l=s(`<h1 id="エンティティを追加・削除する" tabindex="-1">エンティティを追加・削除する <a class="header-anchor" href="#エンティティを追加・削除する" aria-label="Permalink to &quot;エンティティを追加・削除する&quot;">​</a></h1><p>シーンにエンティティを配置するには、<code>g.Scene#append()</code> または <code>g.E#append()</code> を利用します。削除するには <code>g.Scene#remove()</code> または <code>g.E#remove()</code> を利用します。</p><h2 id="凡例" tabindex="-1">凡例 <a class="header-anchor" href="#凡例" aria-label="Permalink to &quot;凡例&quot;">​</a></h2><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> rect </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> g.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">FilledRect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  scene: scene,</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  ...</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // その他のプロパティ</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">scene.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">append</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(rect); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// シーンに追加する</span></span></code></pre></div><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">scene.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">remove</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(rect); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// シーンから削除する</span></span></code></pre></div><p>エンティティを削除するのではなく非表示にする場合は、<a href="./hidden.html"><code>hide()</code> を利用してください。</a></p><h2 id="利用例" tabindex="-1">利用例 <a class="header-anchor" href="#利用例" aria-label="Permalink to &quot;利用例&quot;">​</a></h2><p>次のコンテンツは、矩形をシーンへ追加した状態で表示し 10 秒後にシーンから矩形を削除します。</p>`,8),k=s(`<h2 id="詳細" tabindex="-1">詳細 <a class="header-anchor" href="#詳細" aria-label="Permalink to &quot;詳細&quot;">​</a></h2><p>エンティティをシーンに追加する操作は、シーンの読み込み後に行う必要があります。このシーンの読み込み完了のタイミングを知るには <code>scene.onLoad</code> トリガーを利用します。</p><p><code>g.Scene#append()</code> でエンティティをシーンに追加することができます。また、シーンだけでなくエンティティ (<code>g.E</code> など) に <code>append()</code> することもできます。<code>append()</code> を呼び出されたエンティティを親エンティティ、 <code>append()</code> に引数として渡されたエンティティを子エンティティと呼びます。</p><p>エンティティは、自分または自分の祖先にあたるエンティティがシーンに追加されている時に表示されます。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> scene </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> g.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Scene</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({ game: g.game, assetPaths: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/image/player.png&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] });</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">scene.onLoad.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // シーンが読み込まれたときに行う処理</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> rect </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> g.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">FilledRect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    scene: scene,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    cssColor: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;red&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    width: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">200</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    height: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">200</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    x: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">50</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    y: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">50</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  scene.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">append</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(rect);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> sprite </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> g.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Sprite</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    scene: scene,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    src: scene.asset.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getImage</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/image/player.png&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    x: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    y: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  scene.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">append</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(sprite);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><h2 id="関連情報" tabindex="-1">関連情報 <a class="header-anchor" href="#関連情報" aria-label="Permalink to &quot;関連情報&quot;">​</a></h2><ul><li><a href="/tutorial/v3/basic.html">チュートリアル</a></li><li><a href="https://akashic-games.github.io/akashic-engine/v3/classes/Scene.html" target="_blank" rel="noreferrer">API リファレンス</a></li></ul>`,7);function r(E,d,c,g,o,y){const i=t("PlaygroundElement");return h(),n("div",null,[l,e(i,{gameJsonUri:"/snippets/reverse-reference/drawing/entity/game.json",width:600,height:400}),k])}const _=a(p,[["render",r]]);export{u as __pageData,_ as default};