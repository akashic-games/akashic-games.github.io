import{_ as s,c as a,o as i,a3 as e}from"./chunks/framework.DaCD_bki.js";const o=JSON.parse('{"title":"プレイヤーごとに異なる位置を描画する","description":"","frontmatter":{},"headers":[],"relativePath":"reverse-reference/v3/multiplay/camera.md","filePath":"reverse-reference/v3/multiplay/camera.md"}'),n={name:"reverse-reference/v3/multiplay/camera.md"},t=e(`<h1 id="プレイヤーごとに異なる位置を描画する" tabindex="-1">プレイヤーごとに異なる位置を描画する <a class="header-anchor" href="#プレイヤーごとに異なる位置を描画する" aria-label="Permalink to &quot;プレイヤーごとに異なる位置を描画する&quot;">​</a></h1><p>プレイヤーごとに異なる位置を描画するには、<code>g.game.focusingCamera</code> を利用します。</p><h2 id="凡例" tabindex="-1">凡例 <a class="header-anchor" href="#凡例" aria-label="Permalink to &quot;凡例&quot;">​</a></h2><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> camera</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> g.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Camera2D</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({});</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">g.game.focusingCamera </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> camera;</span></span></code></pre></div><h2 id="詳細" tabindex="-1">詳細 <a class="header-anchor" href="#詳細" aria-label="Permalink to &quot;詳細&quot;">​</a></h2><p>カメラは、インターフェース <code>g.Camera</code> で表現されます。現在の Akashic Engine が実装を提供する唯一のカメラは <code>g.Camera2D</code> です。 生成されたカメラは、そのままでは描画に影響を与えません。カメラを <code>g.game.focusingCamera</code> に設定することで、ゲーム画面の描画に対してカメラの設定を適用することができます。</p><p>カメラを <code>g.game.focusingCamera</code> に設定した状態で <code>camera</code> のプロパティを変更することで、ゲーム画面全体の描画内容を制御することができます。 <code>Camera2D</code> は <code>Object2D</code> を実装しており、<code>x</code>, <code>y</code> によって描画位置のオフセットや、<code>scaleX</code>, <code>scaleY</code> によって描画結果の拡大率を設定できます。たとえば以下のような記述により、画面全体を 30 度傾けることができます。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">camera.angle </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 30</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">camera.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">modified</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span></code></pre></div><p>エンティティなどと同様、カメラの値の変更後には <code>modified()</code> を呼び出す必要があります。 <code>g.game.focusingCamera</code> の既定値は <code>undefined</code> です。</p><p><code>g.game.forcusingCamera</code> は「プレイヤーごとに異なる値」です。そのため後述の <code>g.game.selfId</code> と同じく、条件分岐で参照する時は ローカル処理の制限を受けることに注意してください。詳細は <a href="/tutorial/v3/multiplay/join.html#selfid-and-local"><code>g.game.selfId</code> とローカル処理</a> を参照してください。</p><p>下記のサンプルコードは、ゲーム画面をクリックすると画像が右方向へ移動します。プレイヤーごとに画像の表示位置が異なります。 サンプルコードを実行するには<a href="/tutorial/v3/multiplay/introduction.html#debug">akashic serve が必要です。</a></p><p>サンプルコードを<a href="https://github.com/akashic-contents/website-contents/releases/latest/download/tutorial-samples-v3-multiplay-sample-camera.zip" target="_blank" rel="noreferrer">ダウンロード</a></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> camera</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> g.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Camera2D</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({});</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">g.game.focusingCamera </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> camera;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">scene.onLoad.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> sprite</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> g.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Sprite</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    scene: scene,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    src: scene.asset.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getImage</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./image/player.png&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  scene.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">append</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(sprite);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">scene.onPointDownCapture.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">ev</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (ev.player.id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">===</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> g.game.selfId) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    camera.x </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 画面表示の X 座標位置を -10 移動する</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    camera.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">modified</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    g.game.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">modified</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><h2 id="関連情報" tabindex="-1">関連情報 <a class="header-anchor" href="#関連情報" aria-label="Permalink to &quot;関連情報&quot;">​</a></h2><ul><li><a href="/tutorial/v3/multiplay/camera.html">プレイヤーごとに異なる位置を表示する</a></li></ul>`,15),l=[t];function h(p,k,r,d,c,E){return i(),a("div",null,l)}const y=s(n,[["render",h]]);export{o as __pageData,y as default};