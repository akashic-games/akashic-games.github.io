import{_ as a,c as n,I as t,a3 as s,o as e,E as l}from"./chunks/framework.DaCD_bki.js";const u=JSON.parse('{"title":"クリック・タップできるようにする","description":"","frontmatter":{},"headers":[],"relativePath":"reverse-reference/v3/operation/click.md","filePath":"reverse-reference/v3/operation/click.md"}'),h={name:"reverse-reference/v3/operation/click.md"},p=s(`<h1 id="クリック・タップできるようにする" tabindex="-1">クリック・タップできるようにする <a class="header-anchor" href="#クリック・タップできるようにする" aria-label="Permalink to &quot;クリック・タップできるようにする&quot;">​</a></h1><p>エンティティをクリック・タップできるようにするには、<code>onPointDown</code> トリガーを利用します。</p><h2 id="凡例" tabindex="-1">凡例 <a class="header-anchor" href="#凡例" aria-label="Permalink to &quot;凡例&quot;">​</a></h2><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> rect </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> g.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">FilledRect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  ...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,      </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// その他のプロパティ</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  touchable: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 触れられるオブジェクトにする</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">rect.onPointDown.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">e</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  ...</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // エンティティがクリック・タップされた時の処理</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><p>エンティティは <code>touchable</code> プロパティを <code>true</code> にすることにより、タップやクリックなどのユーザ操作を検出できるようになります。いわゆる「クリック」はマウスを離したタイミングで判定されますが、ここでは単純にマウスを押したタイミングで処理を行います。</p><p>エンティティをドラッグ・スワイプで動かすには<a href="./drag.html"><code>g.E#onPointMove</code> を利用してください。</a></p><p>画面全体をクリック・タップするには<a href="./click-scene.html"><code>g.Scene#onPointDownCapture</code> を利用してください。</a></p><h2 id="利用例" tabindex="-1">利用例 <a class="header-anchor" href="#利用例" aria-label="Permalink to &quot;利用例&quot;">​</a></h2><p>次のコンテンツは、矩形をクリックすると矩形の色が変わります。</p>`,9),k=s(`<h2 id="詳細" tabindex="-1">詳細 <a class="header-anchor" href="#詳細" aria-label="Permalink to &quot;詳細&quot;">​</a></h2><p>Akashic Engine ではユーザがタップやクリックするとポイントイベントが発生します。ポイントイベントを受け取るトリガーには以下の 3 種類があります。</p><table tabindex="0"><thead><tr><th style="text-align:center;">トリガー名</th><th style="text-align:left;">内容</th></tr></thead><tbody><tr><td style="text-align:center;"><code>onPointDown</code></td><td style="text-align:left;">画面に指が触れた。マウスのボタンが押された</td></tr><tr><td style="text-align:center;"><code>onPointMove</code></td><td style="text-align:left;">画面に触れた指が移動した。ボタンが押された状態でマウスが移動した</td></tr><tr><td style="text-align:center;"><code>onPointUp</code></td><td style="text-align:left;">画面から指が離れた。マウスのボタンが離された</td></tr></tbody></table><p>それぞれのイベントに対応するトリガーを利用することで、イベント発生時に処理を実行できます。</p><p>下記のコードでは、クリック・タップ時に矩形が青色になり、クリック・タップが矩形から離れた時に矩形が赤色に変わります。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> scene </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> g.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Scene</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({ game: g.game });</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">scene.onLoad.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // シーンが読み込まれたときに行う処理</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> rect </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> g.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">FilledRect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    scene: scene,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    cssColor: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;red&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    width: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">200</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    height: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">200</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    x: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">50</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    y: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">50</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    touchable: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  scene.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">append</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(rect);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  rect.onPointDown.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    rect.cssColor </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;blue&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    rect.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">modified</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  rect.onPointUp.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    rect.cssColor </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;red&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    rect.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">modified</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><h2 id="関連情報" tabindex="-1">関連情報 <a class="header-anchor" href="#関連情報" aria-label="Permalink to &quot;関連情報&quot;">​</a></h2><ul><li><a href="/tutorial/v3/click.html">チュートリアル</a></li><li><a href="https://akashic-games.github.io/akashic-engine/v3/classes/E.html#onPointDown" target="_blank" rel="noreferrer">API リファレンス</a></li></ul>`,8);function E(r,d,c,o,g,y){const i=l("PlaygroundElement");return e(),n("div",null,[p,t(i,{gameJsonUri:"/snippets/reverse-reference/operation/click/game.json",width:600,height:400}),k])}const _=a(h,[["render",E]]);export{u as __pageData,_ as default};