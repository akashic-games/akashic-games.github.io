import{_ as n,C as l,o as p,c as e,H as o,Q as s}from"./chunks/framework.f1c0562b.js";const x=JSON.parse('{"title":"2D 物理演算を行う","description":"","frontmatter":{},"headers":[],"relativePath":"reverse-reference/v3/logic/box2d.md","filePath":"reverse-reference/v3/logic/box2d.md"}'),c={name:"reverse-reference/v3/logic/box2d.md"},t=s(`<h1 id="_2d-物理演算を行う" tabindex="-1">2D 物理演算を行う <a class="header-anchor" href="#_2d-物理演算を行う" aria-label="Permalink to &quot;2D 物理演算を行う&quot;">​</a></h1><p>2D 物理演算を行うには <code>akashic-box2d</code> を利用します。</p><h2 id="凡例" tabindex="-1">凡例 <a class="header-anchor" href="#凡例" aria-label="Permalink to &quot;凡例&quot;">​</a></h2><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 物理エンジン世界の生成</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> box2d </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> b2.</span><span style="color:#B392F0;">Box2D</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  gravity: [</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">9.8</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">  scale: </span><span style="color:#79B8FF;">50</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  sleep: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 矩形エンティティの生成</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> rect1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> g.</span><span style="color:#B392F0;">FilledRect</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  scene: scene,</span></span>
<span class="line"><span style="color:#E1E4E8;">  cssColor: </span><span style="color:#9ECBFF;">&quot;red&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  x: </span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  y: </span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  width: </span><span style="color:#79B8FF;">50</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  height: </span><span style="color:#79B8FF;">50</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"><span style="color:#E1E4E8;">scene.</span><span style="color:#B392F0;">append</span><span style="color:#E1E4E8;">(rect1);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// エンティティの物理的性質を定義</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> entityDef </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> box2d.</span><span style="color:#B392F0;">createFixtureDef</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  density: </span><span style="color:#79B8FF;">1.0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  friction: </span><span style="color:#79B8FF;">0.5</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  restitution: </span><span style="color:#79B8FF;">0.3</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 反発係数</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 動的物体化</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> dynamicDef </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> box2d.</span><span style="color:#B392F0;">createBodyDef</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  type: b2.BodyType.Dynamic</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 物理エンジン世界における rect1 エンティティを四角に設定</span></span>
<span class="line"><span style="color:#E1E4E8;">entityDef.shape </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> box2d.</span><span style="color:#B392F0;">createRectShape</span><span style="color:#E1E4E8;">(rect1.width, rect1.height);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// rect1 エンティティを物理エンジン世界に追加</span></span>
<span class="line"><span style="color:#E1E4E8;">box2d.</span><span style="color:#B392F0;">createBody</span><span style="color:#E1E4E8;">(rect1, dynamicDef, entityDef);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">scene.onUpdate.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 物理エンジンの世界の時間をすすめる</span></span>
<span class="line"><span style="color:#E1E4E8;">  box2d.</span><span style="color:#B392F0;">step</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> g.game.fps);</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 物理エンジン世界の生成</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> box2d </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> b2.</span><span style="color:#6F42C1;">Box2D</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  gravity: [</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">9.8</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">  scale: </span><span style="color:#005CC5;">50</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  sleep: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 矩形エンティティの生成</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> rect1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> g.</span><span style="color:#6F42C1;">FilledRect</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  scene: scene,</span></span>
<span class="line"><span style="color:#24292E;">  cssColor: </span><span style="color:#032F62;">&quot;red&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  x: </span><span style="color:#005CC5;">100</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  y: </span><span style="color:#005CC5;">100</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  width: </span><span style="color:#005CC5;">50</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  height: </span><span style="color:#005CC5;">50</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"><span style="color:#24292E;">scene.</span><span style="color:#6F42C1;">append</span><span style="color:#24292E;">(rect1);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// エンティティの物理的性質を定義</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> entityDef </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> box2d.</span><span style="color:#6F42C1;">createFixtureDef</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  density: </span><span style="color:#005CC5;">1.0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  friction: </span><span style="color:#005CC5;">0.5</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  restitution: </span><span style="color:#005CC5;">0.3</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 反発係数</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 動的物体化</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> dynamicDef </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> box2d.</span><span style="color:#6F42C1;">createBodyDef</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  type: b2.BodyType.Dynamic</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 物理エンジン世界における rect1 エンティティを四角に設定</span></span>
<span class="line"><span style="color:#24292E;">entityDef.shape </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> box2d.</span><span style="color:#6F42C1;">createRectShape</span><span style="color:#24292E;">(rect1.width, rect1.height);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// rect1 エンティティを物理エンジン世界に追加</span></span>
<span class="line"><span style="color:#24292E;">box2d.</span><span style="color:#6F42C1;">createBody</span><span style="color:#24292E;">(rect1, dynamicDef, entityDef);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">scene.onUpdate.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">function</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 物理エンジンの世界の時間をすすめる</span></span>
<span class="line"><span style="color:#24292E;">  box2d.</span><span style="color:#6F42C1;">step</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> g.game.fps);</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><h2 id="利用例" tabindex="-1">利用例 <a class="header-anchor" href="#利用例" aria-label="Permalink to &quot;利用例&quot;">​</a></h2><p>次のコンテンツは、固定された床の上に矩形を落下させます。</p>`,6),r=s('<h2 id="詳細" tabindex="-1">詳細 <a class="header-anchor" href="#詳細" aria-label="Permalink to &quot;詳細&quot;">​</a></h2><p><code>akashic-box2d</code> を使うことで 2D 物理演算を利用したコンテンツを作成することができます。</p><p><code>akashic-box2d</code> は、地面などの固定された静体や物理法則に従って動かせる動体、円や矩形・多角形などの物理演算における形状の定義、それらの接触開始・終了イベントの取得、加速度を与えることなどの機能を提供します。</p><p>これらは 2D 物理演算ライブラリである <a href="https://github.com/hecht-software/box2dweb" target="_blank" rel="noreferrer">Box2DWeb</a> が提供する機能であり、<code>akashic-box2d</code> は名前の通り Box2DWeb を Akashic で利用するためのモジュールです。 <code>akashic-box2d</code> は Akashic と Box2DWeb の紐づけと、利用に便利な一部機能を提供しています。そのため、多くの機能は Box2DWeb のインターフェースに従って利用することになります。</p><p><code>akashic-box2d</code> のインストールは game.json が置かれているディレクトリで以下のコマンドを実行してください。</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">akashic</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">@akashic-extension/akashic-box2d</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">akashic</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">@akashic-extension/akashic-box2d</span></span></code></pre></div><p>それぞれの形状や物理性質の利用方法は、 <a href="/demo/?title=box2d-sample">akashic-box2d のサンプル</a> を参照してください。</p><h2 id="関連情報" tabindex="-1">関連情報 <a class="header-anchor" href="#関連情報" aria-label="Permalink to &quot;関連情報&quot;">​</a></h2><ul><li><a href="https://github.com/akashic-games/akashic-box2d" target="_blank" rel="noreferrer">akashic-box2d</a></li><li><a href="https://github.com/akashic-games/akashic-box2d/blob/master/getstarted.md" target="_blank" rel="noreferrer">Box2DWeb モジュールの利用</a></li><li><a href="/akashic-box2d/api/">akashic-box2d の API リファレンス</a></li></ul>',9);function y(E,i,d,h,F,b){const a=l("PlaygroundElement");return p(),e("div",null,[t,o(a,{gameJsonUri:"/snippets/reverse-reference/logic/box2d/game.json",width:600,height:400}),r])}const C=n(c,[["render",y]]);export{x as __pageData,C as default};
