import{_ as s}from"./chunks/sample11.579fac98.js";import{_ as n,o as a,c as p,Q as l}from"./chunks/framework.459ab1e9.js";const h=JSON.parse('{"title":"クリックできるようにする","description":"","frontmatter":{},"headers":[],"relativePath":"tutorial/v2/4-click.md","filePath":"tutorial/v2/4-click.md"}'),o={name:"tutorial/v2/4-click.md"},e=l(`<h1 id="クリックできるようにする" tabindex="-1">クリックできるようにする <a class="header-anchor" href="#クリックできるようにする" aria-label="Permalink to &quot;クリックできるようにする&quot;">​</a></h1><p>このページのサンプルコードを<a class="asset--material--download" href="/zip/tutorial/v2/sample-click.zip">ダウンロード</a></p><h2 id="ポイントイベント" tabindex="-1">ポイントイベント <a class="header-anchor" href="#ポイントイベント" aria-label="Permalink to &quot;ポイントイベント {#ポイントイベント}&quot;">​</a></h2><p>エンティティの <code>touchable</code> プロパティを <code>true</code> にすると、ゲーム画面のタップやクリックなどのユーザ操作を検出できるようになります。 Akashic Engine ではユーザがタップやクリックするとポイントイベントが発生します。ポイントイベントには以下の 3 種類があります。</p><table><thead><tr><th style="text-align:center;">トリガー名</th><th style="text-align:left;">内容</th></tr></thead><tbody><tr><td style="text-align:center;"><code>pointDown</code></td><td style="text-align:left;">画面に指が触れた。マウスのボタンが押された</td></tr><tr><td style="text-align:center;"><code>pointMove</code></td><td style="text-align:left;">画面に触れた指が移動した。ボタンが押された状態でマウスが移動した</td></tr><tr><td style="text-align:center;"><code>pointUp</code></td><td style="text-align:left;">画面から指が離れた。マウスのボタンが離された</td></tr></tbody></table><p>それぞれのイベントに対応するトリガーを利用することで、イベント発生時に処理を実行できます。</p><p>以下は矩形エンティティ <code>rect</code> にポイントイベントを設定して自身の色を変える例です。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">rect.touchable </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">rect.pointDown.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  rect.cssColor </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;red&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  rect.</span><span style="color:#B392F0;">modified</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"><span style="color:#E1E4E8;">rect.pointUp.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  rect.cssColor </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;gray&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  rect.</span><span style="color:#B392F0;">modified</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">rect.touchable </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">rect.pointDown.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">function</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  rect.cssColor </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;red&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  rect.</span><span style="color:#6F42C1;">modified</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"><span style="color:#24292E;">rect.pointUp.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">function</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  rect.cssColor </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;gray&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  rect.</span><span style="color:#6F42C1;">modified</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><p>ポイントイベントが発生した座標を取得するには、トリガーに渡す関数に引数を追加します。例えば、矩形エンティティ <code>rect</code> の <code>pointDown</code> トリガーの座標を取得するには、以下のようなコードになります。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">rect.pointDown.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">ev</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> x </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ev.point.x;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> y </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ev.point.y;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">...</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">rect.pointDown.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">ev</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> x </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ev.point.x;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> y </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ev.point.y;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">...</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><p>追加した引数 <code>ev</code> にイベントの情報が格納されています。この変数には以下のプロパティがあります。</p><table><thead><tr><th style="text-align:center;">プロパティ</th><th style="text-align:left;">意味</th></tr></thead><tbody><tr><td style="text-align:center;"><code>ev.point.x</code>,<br><code>ev.point.y</code></td><td style="text-align:left;">最後に<code>pointDown</code>が発生した座標。座標系の原点はエンティティの座標</td></tr><tr><td style="text-align:center;"><code>ev.startDelta.x</code>,<br><code>ev.startDelta.y</code></td><td style="text-align:left;">最後に<code>pointDown</code>が発生した座標から、現在のポイント座標までの移動量。ただし<code>pointDown</code>イベントでは利用できない</td></tr><tr><td style="text-align:center;"><code>ev.prevDelta.x</code>,<br><code>ev.prevDelta.y</code></td><td style="text-align:left;">最後に<code>pointMove</code>が発生した座標から、現在のポイント座標までの移動量。ただし<code>pointDown</code>イベントでは利用できない</td></tr></tbody></table><p>以下は矩形エンティティ <code>rect</code> を指やマウス操作で移動するコード例です。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">rect.pointMove.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">ev</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  rect.x </span><span style="color:#F97583;">+=</span><span style="color:#E1E4E8;"> ev.prevDelta.x;</span></span>
<span class="line"><span style="color:#E1E4E8;">  rect.y </span><span style="color:#F97583;">+=</span><span style="color:#E1E4E8;"> ev.prevDelta.y;</span></span>
<span class="line"><span style="color:#E1E4E8;">  rect.</span><span style="color:#B392F0;">modified</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">rect.pointMove.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">function</span><span style="color:#24292E;">(</span><span style="color:#E36209;">ev</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  rect.x </span><span style="color:#D73A49;">+=</span><span style="color:#24292E;"> ev.prevDelta.x;</span></span>
<span class="line"><span style="color:#24292E;">  rect.y </span><span style="color:#D73A49;">+=</span><span style="color:#24292E;"> ev.prevDelta.y;</span></span>
<span class="line"><span style="color:#24292E;">  rect.</span><span style="color:#6F42C1;">modified</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><p>エンティティに重なりがあり、その両方がポイントイベントを受け取れる状態にある場合は、最前面に表示されているエンティティがポイントイベントを受け取ります。</p><p>シーンオブジェクトの <code>pointDownCapture</code>, <code>pointMoveCapture</code>, <code>pointUpCapture</code> トリガーを利用すると、配置されているエンティティとは無関係に、シーン全体でポイントイベントを取得できます。これらのトリガーはシーン上にイベントを受け取るエンティティが存在していたとしても常に呼び出されます。</p><p>以下は、画面に指が触れた時、もしくはマウスのボタンが押されたときに、その座標に矩形エンティティを配置するコードです。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> scene </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> g.</span><span style="color:#B392F0;">Scene</span><span style="color:#E1E4E8;">({ game: g.game });</span></span>
<span class="line"><span style="color:#E1E4E8;">scene.loaded.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  scene.pointDownCapture.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">ev</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> size </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">20</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> rect </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> g.</span><span style="color:#B392F0;">FilledRect</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      scene: scene,</span></span>
<span class="line"><span style="color:#E1E4E8;">      x: ev.point.x </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> size </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      y: ev.point.y </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> size </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      width: size,</span></span>
<span class="line"><span style="color:#E1E4E8;">      height: size,</span></span>
<span class="line"><span style="color:#E1E4E8;">      cssColor: </span><span style="color:#9ECBFF;">&quot;blue&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">    scene.</span><span style="color:#B392F0;">append</span><span style="color:#E1E4E8;">(rect);</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> scene </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> g.</span><span style="color:#6F42C1;">Scene</span><span style="color:#24292E;">({ game: g.game });</span></span>
<span class="line"><span style="color:#24292E;">scene.loaded.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">function</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  scene.pointDownCapture.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">function</span><span style="color:#24292E;">(</span><span style="color:#E36209;">ev</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> size </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">20</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> rect </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> g.</span><span style="color:#6F42C1;">FilledRect</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      scene: scene,</span></span>
<span class="line"><span style="color:#24292E;">      x: ev.point.x </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> size </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      y: ev.point.y </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> size </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      width: size,</span></span>
<span class="line"><span style="color:#24292E;">      height: size,</span></span>
<span class="line"><span style="color:#24292E;">      cssColor: </span><span style="color:#032F62;">&quot;blue&quot;</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">    scene.</span><span style="color:#6F42C1;">append</span><span style="color:#24292E;">(rect);</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><p><img src="`+s+'" alt="sample11"></p>',19),t=[e];function c(r,E,y,i,d,v){return a(),p("div",null,t)}const g=n(o,[["render",c]]);export{h as __pageData,g as default};